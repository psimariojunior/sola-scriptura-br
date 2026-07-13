import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface RAGContext {
  table: string;
  id: string;
  title: string;
  content: string;
  similarity: number;
}

const SYSTEM_PROMPT = `Voce e o assistente de estudo biblico da plataforma Sola Scriptura BR.
Seu papel e ajudar usuarios a estudar a Biblia de forma academica e teologicamente fundamentada.

Diretrizes:
- Responda em portugues brasileiro
- Cite sempre as fontes biblicas (livro, capitulo, versiculo)
- Quando relevante, inclua informacoes em grego/hebraico com transliteracao
- Seja preciso teologicamente e apresente diferentes perspectivas quando houver divergencia
- Use linguagem acessivel mas academicamente rigorosa
- Quando nao souber a resposta, seja honesto e sugira fontes para estudo adicional
- Formate suas respostas usando Markdown para melhor legibilidade`;

async function fetchEmbedding(
  text: string,
  apiKey: string,
): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text.substring(0, 8000),
      dimensions: 1536,
    }),
  });

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data?.[0]?.embedding;
}

async function searchRAGContext(
  supabase: ReturnType<typeof createClient>,
  query: string,
  embedding: number[],
): Promise<RAGContext[]> {
  const context: RAGContext[] = [];
  const matchCount = 5;

  // Search across multiple tables for relevant context
  const searches = [
    {
      table: "versiculos",
      fn: "match_versiculos",
      titleCol: "texto",
    },
    {
      table: "palavras_gregas",
      fn: "match_palavras_gregas",
      titleCol: "palavra_original",
    },
    {
      table: "palavras_hebraicas",
      fn: "match_palavras_hebraicas",
      titleCol: "palavra_original",
    },
    {
      table: "personagens",
      fn: "match_personagens",
      titleCol: "nome_portugues",
    },
    {
      table: "localizacoes",
      fn: "match_localizacoes",
      titleCol: "nome_portugues",
    },
  ];

  for (const search of searches) {
    try {
      const { data, error } = await supabase.rpc(search.fn, {
        query_embedding: embedding,
        match_count: matchCount,
        match_threshold: 0.5,
      });

      if (error || !data || data.length === 0) continue;

      for (const row of data) {
        context.push({
          table: search.table,
          id: row.id,
          title: row[search.titleCol] || "Untitled",
          content:
            row.texto || row.definicao_curta || row.biografia || row.descricao || "",
          similarity: row.similarity,
        });
      }
    } catch (err) {
      console.error(`RAG search error for ${search.table}:`, err);
    }
  }

  // Sort by similarity and take top results
  context.sort((a, b) => b.similarity - a.similarity);
  return context.slice(0, 10);
}

function buildRAGPrompt(userQuery: string, context: RAGContext[]): string {
  if (context.length === 0) return userQuery;

  const contextBlock = context
    .map((c, i) => {
      let source = "";
      switch (c.table) {
        case "versiculos":
          source = "Versiculo Biblico";
          break;
        case "palavras_gregas":
          source = "Dicionario Grego";
          break;
        case "palavras_hebraicas":
          source = "Dicionario Hebraico";
          break;
        case "personagens":
          source = "Personagem Biblico";
          break;
        case "localizacoes":
          source = "Localizacao Biblica";
          break;
      }
      return `[${source} #${i + 1}] (similaridade: ${(c.similarity * 100).toFixed(0)}%)\n${c.content.substring(0, 500)}`;
    })
    .join("\n\n");

  return `Contexto relevante do banco de dados biblico:

${contextBlock}

---

Pergunta do usuario: ${userQuery}

Responda usando o contexto acima quando relevante. Cite as fontes biblicas sempre que possivel.`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages, useRAG = true, model = "gpt-4o" } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing or empty 'messages' array" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Supabase credentials not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the last user message for RAG search
    const lastUserMessage = messages
      .filter((m: ChatMessage) => m.role === "user")
      .pop();

    let augmentedQuery = lastUserMessage?.content || "";
    let ragContext: RAGContext[] = [];

    // Perform RAG search if enabled
    if (useRAG && augmentedQuery) {
      try {
        const embedding = await fetchEmbedding(augmentedQuery, apiKey);
        ragContext = await searchRAGContext(
          supabase,
          augmentedQuery,
          embedding,
        );
        augmentedQuery = buildRAGPrompt(augmentedQuery, ragContext);
      } catch (err) {
        console.error("RAG search failed, proceeding without context:", err);
        augmentedQuery = lastUserMessage?.content || "";
      }
    }

    // Build the messages array for OpenAI
    const openaiMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(0, -1),
      { role: "user", content: augmentedQuery },
    ];

    // Stream the response from OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: openaiMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", response.status, errorData);
      return new Response(
        JSON.stringify({
          error: `OpenAI API error: ${response.status}`,
          details: errorData,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Transform the OpenAI SSE stream into a readable stream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        // Send RAG context metadata as the first chunk
        if (ragContext.length > 0) {
          const metadata = JSON.stringify({
            type: "metadata",
            rag_context: ragContext.map((c) => ({
              table: c.table,
              title: c.title,
              similarity: c.similarity,
            })),
          });
          controller.enqueue(
            encoder.encode(`data: ${metadata}\n\n`),
          );
        }

        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ")) {
                const data = trimmed.slice(6);
                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content =
                    parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    const chunk = JSON.stringify({
                      type: "content",
                      content,
                    });
                    controller.enqueue(
                      encoder.encode(`data: ${chunk}\n\n`),
                    );
                  }
                } catch {
                  // Skip unparseable chunks
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream processing error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
