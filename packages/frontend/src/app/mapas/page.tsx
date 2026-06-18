"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiMapas } from "@/lib/api";
import { MapPin, Navigation } from "lucide-react";

export default function MapasPage() {
  const [locais, setLocais] = useState<any[]>([]);
  const [rotas, setRotas] = useState<any[]>([]);
  const [rotaSelecionada, setRotaSelecionada] = useState<string>("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [resLocais, resRotas] = await Promise.all([
        apiMapas.locais(),
        apiMapas.rotas(),
      ]);
      setLocais(resLocais.data || []);
      setRotas(resRotas.data || []);
    } catch {
      console.error("Erro ao carregar mapas");
    }
  }

  const rotasDisponiveis = [
    { id: "paulo", nome: "Viagens Missionárias de Paulo" },
    { id: "exodo", nome: "Rota do Êxodo" },
    { id: "abraao", nome: "Caminhada de Abraão" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mapas Bíblicos Interativos</h1>

      <Tabs defaultValue="mapa" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mapa">Mapa</TabsTrigger>
          <TabsTrigger value="locais">Locais</TabsTrigger>
          <TabsTrigger value="rotas">Rotas</TabsTrigger>
        </TabsList>

        <TabsContent value="mapa">
          <div className="border rounded-lg h-[600px] bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Mapa Interativo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure as chaves do Leaflet/Mapbox no arquivo .env
              </p>
              <div className="space-y-2">
                {rotasDisponiveis.map((rota) => (
                  <button
                    key={rota.id}
                    onClick={() => setRotaSelecionada(rota.id)}
                    className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                      rotaSelecionada === rota.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    {rota.nome}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="locais">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locais.map((local: any) => (
              <div key={local.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                <h3 className="font-semibold">{local.nome}</h3>
                <p className="text-sm text-muted-foreground">{local.tipo}</p>
                {local.latitude && local.longitude && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {local.latitude.toFixed(4)}, {local.longitude.toFixed(4)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rotas">
          <div className="space-y-6">
            {rotasDisponiveis.map((rota) => (
              <div key={rota.id} className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Navigation className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">{rota.nome}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {rota.id === "paulo" && [
                    "Antioquia", "Chipre", "Perge", "Filipos", "Tessalônica",
                    "Atenas", "Corinto", "Éfeso", "Jerusalém", "Roma",
                  ].map((local) => (
                    <span key={local} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                      {local}
                    </span>
                  ))}
                  {rota.id === "exodo" && [
                    "Ramessés", "Sucote", "Mar Vermelho", "Sinai", "Cades-Barneia",
                  ].map((local) => (
                    <span key={local} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                      {local}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
