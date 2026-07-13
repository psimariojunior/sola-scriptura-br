import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BATCH_SIZE = 20;
const DELAY_MS = 1000;

interface EmbeddingJob {
  id: string;
  text: string;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateEmbedding(
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
      input: text,
      dimensions: 1536,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `OpenAI API error ${response.status}: ${JSON.stringify(errorData)}`,
    );
  }

  const data = await response.json();
  const embedding = data.data?.[0]?.embedding;

  if (!embedding || !Array.isArray(embedding)) {
    throw new Error("Invalid embedding response from OpenAI");
  }

  return embedding;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      table,
      start = 0,
      limit = 100,
      dry_run = false,
    } = await req.json();

    const validTables = [
      "versiculos",
      "palavras_gregas",
      "palavras_hebraicas",
      "personagens",
      "localizacoes",
    ];

    if (!table || !validTables.includes(table)) {
      return new Response(
        JSON.stringify({
          error: `Invalid table. Must be one of: ${validTables.join(", ")}`,
        }),
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

    // Determine columns based on table
    let textColumn: string;
    let embeddingColumn: string;

    switch (table) {
      case "versiculos":
        textColumn = "texto";
        embeddingColumn = "vetor_embedding";
        break;
      case "palavras_gregas":
        textColumn = "definicao_curta";
        embeddingColumn = "vetor_embedding";
        break;
      case "palavras_hebraicas":
        textColumn = "definicao_curta";
        embeddingColumn = "vetor_embedding";
        break;
      case "personagens":
        textColumn = "biografia";
        embeddingColumn = "vetor_embedding";
        break;
      case "localizacoes":
        textColumn = "descricao";
        embeddingColumn = "vetor_embedding";
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Unsupported table configuration" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
    }

    // Fetch rows without embeddings
    const { data: rows, error: fetchError } = await supabase
      .from(table)
      .select("id")
      .is(embeddingColumn, null)
      .not(textColumn, "is", null)
      .range(start, start + limit - 1);

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: `Database error: ${fetchError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!rows || rows.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No rows without embeddings found",
          processed: 0,
          table,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (dry_run) {
      return new Response(
        JSON.stringify({
          message: "Dry run - would process",
          count: rows.length,
          table,
          start,
          limit,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Process in batches
    let processed = 0;
    let errors = 0;
    const errorIds: string[] = [];

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);

      for (const row of batch) {
        try {
          // Fetch the text content
          const { data: fullRow, error: rowError } = await supabase
            .from(table)
            .select(`id, ${textColumn}`)
            .eq("id", row.id)
            .single();

          if (rowError || !fullRow) {
            errors++;
            errorIds.push(row.id);
            continue;
          }

          const textContent = fullRow[textColumn];
          if (!textContent || typeof textContent !== "string") {
            errors++;
            errorIds.push(row.id);
            continue;
          }

          const embedding = await generateEmbedding(
            textContent.substring(0, 8000),
            apiKey,
          );

          // Update the row with the embedding
          const { error: updateError } = await supabase
            .from(table)
            .update({ [embeddingColumn]: embedding })
            .eq("id", row.id);

          if (updateError) {
            console.error(`Update error for ${row.id}:`, updateError);
            errors++;
            errorIds.push(row.id);
          } else {
            processed++;
          }
        } catch (err) {
          console.error(`Error processing ${row.id}:`, err);
          errors++;
          errorIds.push(row.id);
        }
      }

      // Rate limit: wait between batches
      if (i + BATCH_SIZE < rows.length) {
        await sleep(DELAY_MS);
      }
    }

    return new Response(
      JSON.stringify({
        message: "Batch processing complete",
        table,
        processed,
        errors,
        total: rows.length,
        errorIds: errorIds.length > 0 ? errorIds : undefined,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
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
