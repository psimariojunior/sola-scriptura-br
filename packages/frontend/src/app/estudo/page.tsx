"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiBiblia, apiExegese, apiTeologia, apiHermeneutica, apiReferencias } from "@/lib/api";

export default function EstudoPage() {
  const searchParams = useSearchParams();
  const [livroSlug, setLivroSlug] = useState("");
  const [capitulo, setCapitulo] = useState(1);
  const [versiculo, setVersiculo] = useState(1);
  const [livro, setLivro] = useState<any>(null);
  const [versiculoDados, setVersiculoDados] = useState<any>(null);
  const [exegese, setExegese] = useState<any>(null);
  const [teologia, setTeologia] = useState<any>(null);
  const [hermeneutica, setHermeneutica] = useState<any>(null);
  const [referencias, setReferencias] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      const match = q.match(/(\D+)\s*(\d+):(\d+)/);
      if (match) {
        setLivroSlug(match[1].trim().toLowerCase().replace(/\s+/g, "-"));
        setCapitulo(parseInt(match[2]));
        setVersiculo(parseInt(match[3]));
      }
    }
  }, [searchParams]);

  async function carregarTudo() {
    if (!livroSlug) return;
    setCarregando(true);
    try {
      const resLivro = await apiBiblia.buscarLivro(livroSlug);
      const livroData = resLivro.data;
      setLivro(livroData);

      if (livroData) {
        const versiculoId = `${livroData.id}-c${capitulo}-v${versiculo}`;
        const [resVersiculo, resExegese, resTeologia, resHermeneutica, resRefs] = await Promise.allSettled([
          apiBiblia.buscarVersiculo(livroData.id, capitulo, versiculo, livroData.traducaoId || ""),
          apiExegese.analisar(versiculoId),
          apiTeologia.relacionarTexto(versiculoId),
          apiHermeneutica.analisar(versiculoId),
          apiReferencias.porVersiculo(versiculoId),
        ]);

        if (resVersiculo.status === "fulfilled") setVersiculoDados(resVersiculo.value.data);
        if (resExegese.status === "fulfilled") setExegese(resExegese.value.data);
        if (resTeologia.status === "fulfilled") setTeologia(resTeologia.value.data);
        if (resHermeneutica.status === "fulfilled") setHermeneutica(resHermeneutica.value.data);
        if (resRefs.status === "fulfilled") setReferencias(resRefs.value.data);
      }
    } catch (err) {
      console.error("Erro ao carregar estudos:", err);
    }
    setCarregando(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Central de Estudos</h1>

      <div className="flex gap-4 items-end">
        <div>
          <label className="text-sm font-medium">Livro (slug)</label>
          <input
            value={livroSlug}
            onChange={(e) => setLivroSlug(e.target.value)}
            className="border rounded px-3 py-2 w-48"
            placeholder="Ex: romanos"
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
        <button
          onClick={carregarTudo}
          disabled={!livroSlug || carregando}
          className="bg-primary text-primary-foreground px-4 py-2 rounded disabled:opacity-50"
        >
          {carregando ? "Carregando..." : "Analisar"}
        </button>
      </div>

      {versiculoDados && (
        <Tabs defaultValue="texto" className="space-y-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="texto">Texto</TabsTrigger>
            <TabsTrigger value="exegese">Exegese</TabsTrigger>
            <TabsTrigger value="teologia">Teologia</TabsTrigger>
            <TabsTrigger value="hermeneutica">Hermenêutica</TabsTrigger>
            <TabsTrigger value="referencias">Referências</TabsTrigger>
          </TabsList>

          <TabsContent value="texto" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">
                {livro?.nome} {capitulo}:{versiculo}
              </h2>
              <p className="text-lg leading-relaxed">{versiculoDados.texto}</p>
            </div>
          </TabsContent>

          <TabsContent value="exegese">
            {exegese && (
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Análise Exegética</h3>
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(exegese, null, 2)}</pre>
              </div>
            )}
          </TabsContent>

          <TabsContent value="teologia">
            {teologia && (
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Teologia Sistemática</h3>
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(teologia, null, 2)}</pre>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hermeneutica">
            {hermeneutica && (
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Hermenêutica</h3>
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(hermeneutica, null, 2)}</pre>
              </div>
            )}
          </TabsContent>

          <TabsContent value="referencias">
            {referencias && (
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Referências Cruzadas</h3>
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(referencias, null, 2)}</pre>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
