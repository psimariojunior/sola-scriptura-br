"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { apiBiblia, apiExegese, apiTeologia, apiHermeneutica, apiLinguistica, apiReferencias, apiGrafo, apiCronologia, apiRAG } from "@/lib/api";

export default function EstudoPage() {
  const searchParams = useSearchParams();
  const [livro, setLivro] = useState("");
  const [capitulo, setCapitulo] = useState(1);
  const [versiculo, setVersiculo] = useState(1);
  const [dados, setDados] = useState<any>(null);
  const [exegese, setExegese] = useState<any>(null);
  const [teologia, setTeologia] = useState<any>(null);
  const [hermeneutica, setHermeneutica] = useState<any>(null);
  const [referencias, setReferencias] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);
  const [tradicao, setTradicao] = useState("");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      const match = q.match(/(\D+)\s*(\d+):(\d+)/);
      if (match) {
        setLivro(match[1].trim());
        setCapitulo(parseInt(match[2]));
        setVersiculo(parseInt(match[3]));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (livro && capitulo && versiculo) {
      carregarTudo();
    }
  }, [livro, capitulo, versiculo, tradicao]);

  async function carregarTudo() {
    setCarregando(true);
    try {
      const [resVersiculo, resExegese, resTeologia, resHermeneutica, resRefs] = await Promise.all([
        apiBiblia.buscarVersiculo({ livro, capitulo, versiculo }),
        apiExegese.analisar(livro, capitulo, versiculo),
        apiTeologia.analisar(livro, capitulo, versiculo, tradicao || undefined),
        apiHermeneutica.analisar(livro, capitulo, versiculo),
        apiReferencias.buscar(livro, capitulo, versiculo),
      ]);
      setDados(resVersiculo.data);
      setExegese(resExegese.data);
      setTeologia(resTeologia.data);
      setHermeneutica(resHermeneutica.data);
      setReferencias(resRefs.data);
    } catch (err) {
      console.error("Erro ao carregar estudos:", err);
    }
    setCarregando(false);
  }

  async function buscarNoRAG(pergunta: string) {
    try {
      const res = await apiRAG.contexto(pergunta);
      return res.data;
    } catch {
      return null;
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Central de Estudos</h1>

      <div className="flex gap-4 items-end">
        <div>
          <label className="text-sm font-medium">Livro</label>
          <input
            value={livro}
            onChange={(e) => setLivro(e.target.value)}
            className="border rounded px-3 py-2 w-48"
            placeholder="Ex: Romanos"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Capítulo</label>
          <input
            type="number"
            value={capitulo}
            onChange={(e) => setCapitulo(parseInt(e.target.value) || 1)}
            className="border rounded px-3 py-2 w-24"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Versículo</label>
          <input
            type="number"
            value={versiculo}
            onChange={(e) => setVersiculo(parseInt(e.target.value) || 1)}
            className="border rounded px-3 py-2 w-24"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Tradição</label>
          <select
            value={tradicao}
            onChange={(e) => setTradicao(e.target.value)}
            className="border rounded px-3 py-2 w-40"
          >
            <option value="">Todas as tradições</option>
            <option value="arminiana">Arminiana</option>
            <option value="reformada">Reformada</option>
            <option value="batista">Batista</option>
            <option value="pentecostal">Pentecostal</option>
            <option value="wesleyana">Wesleyana</option>
          </select>
        </div>
        <Button onClick={carregarTudo} disabled={!livro || carregando}>
          {carregando ? "Carregando..." : "Analisar"}
        </Button>
      </div>

      {dados && (
        <Tabs defaultValue="texto" className="space-y-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="texto">Texto</TabsTrigger>
            <TabsTrigger value="exegese">Exegese</TabsTrigger>
            <TabsTrigger value="teologia">Teologia</TabsTrigger>
            <TabsTrigger value="hermeneutica">Hermenêutica</TabsTrigger>
            <TabsTrigger value="referencias">Referências</TabsTrigger>
            <TabsTrigger value="ia">IA Especialista</TabsTrigger>
          </TabsList>

          <TabsContent value="texto" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">
                {livro} {capitulo}:{versiculo}
              </h2>
              <p className="text-lg leading-relaxed">{dados.texto}</p>
              {dados.textoOriginal && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Texto Original</h3>
                  <p className="font-mono text-lg">{dados.textoOriginal}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="exegese">
            {exegese && (
              <div className="space-y-4">
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Contexto Imediato</h3>
                  <div className="space-y-2">
                    {exegese.contextoImediato?.antes?.map((v: any) => (
                      <p key={v.numero} className="text-sm text-muted-foreground">
                        <span className="font-mono">{v.numero}</span> {v.texto}
                      </p>
                    ))}
                    <p className="font-semibold border-l-4 border-primary pl-2">{dados.texto}</p>
                    {exegese.contextoImediato?.depois?.map((v: any) => (
                      <p key={v.numero} className="text-sm text-muted-foreground">
                        <span className="font-mono">{v.numero}</span> {v.texto}
                      </p>
                    ))}
                  </div>
                </div>

                {exegese.contextoLiterario && (
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Contexto Literário</h3>
                    <p>Livro: {exegese.contextoLiterario.livro?.nome}</p>
                    <p>Testamento: {exegese.contextoLiterario.livro?.testamento}</p>
                    <p>Gênero: {exegese.contextoLiterario.livro?.genero}</p>
                  </div>
                )}

                {exegese.analiseTeologica && (
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Doutrinas Identificadas</h3>
                    <div className="flex flex-wrap gap-2">
                      {exegese.analiseTeologica.doutrinasRelacionadas?.map((d: string) => (
                        <span key={d} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="teologia">
            {teologia && (
              <div className="space-y-4">
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Categorias Teológicas</h3>
                  <div className="space-y-2">
                    {Object.entries(teologia.categoriasTeologicas || {}).map(([cat, palavras]) => (
                      <div key={cat}>
                        <span className="font-medium">{cat}:</span>{" "}
                        <span className="text-muted-foreground">
                          {(palavras as string[]).join(", ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {teologia.tradicoes && (
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Tradições Teológicas</h3>
                    <div className="space-y-2">
                      {Object.entries(teologia.tradicoes).map(([trad, desc]) => (
                        <details key={trad} className="border rounded p-3">
                          <summary className="cursor-pointer font-medium capitalize">{trad}</summary>
                          <p className="mt-2 text-sm text-muted-foreground">{desc as string}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hermeneutica">
            {hermeneutica && (
              <div className="space-y-4">
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Gênero Literário</h3>
                  <p className="text-lg">{hermeneutica.generoLiterario}</p>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Princípios de Interpretação</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {hermeneutica.principiosInterpretacao?.map((p: string, i: number) => (
                      <li key={i} className="text-sm">{p}</li>
                    ))}
                  </ul>
                </div>

                {hermeneutica.contextoHistorico && (
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Contexto Histórico</h3>
                    <p className="text-sm">{hermeneutica.contextoHistorico.data}</p>
                    <p className="text-sm">{hermeneutica.contextoHistorico.autor}</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="referencias">
            {referencias && (
              <div className="space-y-4">
                {referencias.paralelos?.length > 0 && (
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Paralelos</h3>
                    {referencias.paralelos.map((r: any, i: number) => (
                      <p key={i} className="text-sm">{r.referencia} - {r.descricao}</p>
                    ))}
                  </div>
                )}

                {referencias.profecias?.length > 0 && (
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Profecias / Cumprimentos</h3>
                    {referencias.profecias.map((r: any, i: number) => (
                      <p key={i} className="text-sm">{r.referencia} ({r.tipo}) - {r.descricao}</p>
                    ))}
                  </div>
                )}

                {referencias.tematicas?.length > 0 && (
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Referências Temáticas</h3>
                    {referencias.tematicas.map((r: any, i: number) => (
                      <p key={i} className="text-sm">{r.referencia} - {r.descricao}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ia">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Assistente Teológico IA</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Faça perguntas aprofundadas sobre {livro} {capitulo}:{versiculo}
              </p>
              <div className="flex gap-2">
                <input
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="Ex: Explique o grego, contexto histórico..."
                />
                <Button>Perguntar</Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  `Explique o contexto histórico`,
                  `Analise o grego`,
                  `Quais doutrinas estão envolvidas?`,
                  `Mostre referências no AT`,
                ].map((s) => (
                  <button
                    key={s}
                    className="text-xs rounded-full border px-3 py-1 hover:bg-accent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
