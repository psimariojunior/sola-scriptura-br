'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Search, X, Filter, Navigation, BookOpen, ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

interface LocalBiblico {
  nome: string;
  descricao: string;
  referencia: string;
  localizacaoAtual: string;
  lat: number;
  lng: number;
  categoria: 'AT' | 'NT' | 'AT & NT';
  tipo: 'cidade' | 'montanha' | 'rio' | 'deserto' | 'mar' | 'regiao';
  eventos: string[];
}

const LOCAIS: LocalBiblico[] = [
  { nome: 'Jerusalém', descricao: 'Cidade sagrada, centro do culto no Templo. Capital de Israel e palco central da história bíblica.', referencia: '1 Reis 8:1', localizacaoAtual: 'Jerusalém, Israel', lat: 31.7683, lng: 35.2137, categoria: 'AT & NT', tipo: 'cidade', eventos: ['Construção do Templo', 'Paixão de Jesus', 'Pentecostes'] },
  { nome: 'Belém', descricao: 'Cidade natal de Davi e de Jesus Cristo.', referencia: 'Miquéias 5:2', localizacaoAtual: 'Belém, Palestina', lat: 31.7054, lng: 35.2076, categoria: 'AT & NT', tipo: 'cidade', eventos: ['Nascimento de Davi', 'Nascimento de Jesus'] },
  { nome: 'Nazaré', descricao: 'Cidade onde Jesus cresceu e foi criado.', referencia: 'Lucas 2:39', localizacaoAtual: 'Nazaré, Israel', lat: 32.7021, lng: 35.2979, categoria: 'NT', tipo: 'cidade', eventos: ['Anunciação a Maria', 'Infância de Jesus'] },
  { nome: 'Cafarnaum', descricao: 'Centro do ministério de Jesus na Galileia.', referencia: 'Mateus 4:13', localizacaoAtual: 'Cafarnaum, Israel', lat: 32.8804, lng: 35.5748, categoria: 'NT', tipo: 'cidade', eventos: ['Chamada dos apóstolos', 'Multiplicação dos pães'] },
  { nome: 'Sinai', descricao: 'Montanha onde Deus entregou a Lei a Moisés.', referencia: 'Êxodo 19:1', localizacaoAtual: 'Península do Sinai, Egito', lat: 28.5395, lng: 33.9753, categoria: 'AT', tipo: 'montanha', eventos: ['Entrega da Lei', 'Os 10 Mandamentos'] },
  { nome: 'Gilgal', descricao: 'Primeiro acampamento de Israel após cruzar o Jordão.', referencia: 'Josué 4:19', localizacaoAtual: 'Tell el-Sultan, Jericó', lat: 31.8767, lng: 35.4444, categoria: 'AT', tipo: 'cidade', eventos: ['Cruzamento do Jordão', 'Circuncisão'] },
  { nome: 'Jericó', descricao: 'Uma das cidades mais antigas do mundo. Derrotada por Josué.', referencia: 'Josué 6:1', localizacaoAtual: 'Jericó, Palestina', lat: 31.8716, lng: 35.4461, categoria: 'AT', tipo: 'cidade', eventos: ['Derrubada dos muros', 'Cego Bartimeu'] },
  { nome: 'Ninive', descricao: 'Capital do Império Assírio. Jonas foi enviado para pregar.', referencia: 'Jonas 3:2', localizacaoAtual: 'Nimrud, Iraque', lat: 36.3633, lng: 43.1436, categoria: 'AT', tipo: 'cidade', eventos: ['Pregação de Jonas', 'Arrependimento da cidade'] },
  { nome: 'Babilônia', descricao: 'Império que destruiu Jerusalém e exilou Israel.', referencia: '2 Reis 25:8', localizacaoAtual: 'Babil, Iraque', lat: 32.5363, lng: 44.4209, categoria: 'AT', tipo: 'cidade', eventos: ['Exílio babilônico', 'Escreva no muro'] },
  { nome: 'Egito', descricao: 'Terra onde Israel foi escravizado e de onde Deus os libertou.', referencia: 'Êxodo 3:8', localizacaoAtual: 'Egito', lat: 26.8206, lng: 30.8025, categoria: 'AT', tipo: 'regiao', eventos: ['Escavidão', 'Êxodo', 'Profecias'] },
  { nome: 'Roma', descricao: 'Capital do Império Romano. Paulo escreveu suas epístolas e foi martirizado.', referencia: 'Atos 28:14', localizacaoAtual: 'Roma, Itália', lat: 41.9028, lng: 12.4964, categoria: 'NT', tipo: 'cidade', eventos: ['Viagem de Paulo', 'Cartas aos Romanos', 'Martírio de Pedro e Paulo'] },
  { nome: 'Efeso', descricao: 'Grande cidade do Império Romano. Destino da 3ª viagem missionária de Paulo.', referencia: 'Atos 18:19', localizacaoAtual: 'Selçuk, Turquia', lat: 37.9411, lng: 27.3417, categoria: 'NT', tipo: 'cidade', eventos: ['Carta aos Efésios', 'Templo de Ártemis'] },
  { nome: 'Corinto', descricao: 'Importante cidade comercial. Paulo fundou igreja e escreveu 2 cartas.', referencia: 'Atos 18:1', localizacaoAtual: 'Corinto, Grécia', lat: 37.9085, lng: 22.8764, categoria: 'NT', tipo: 'cidade', eventos: ['Carta aos Coríntios', 'Conselho de Jerusalém'] },
  { nome: 'Antioquia', descricao: 'Base das missões cristãs primitivas. Primeira cidade onde cristãos foram chamados assim.', referencia: 'Atos 11:26', localizacaoAtual: 'Antakya, Turquia', lat: 36.2000, lng: 36.1600, categoria: 'NT', tipo: 'cidade', eventos: ['Primeira igreja gentílica', 'Saída de Paulo e Barnabé'] },
  { nome: 'Damasco', descricao: 'Cidade onde Saulo teve seu encontro com Jesus e se converteu.', referencia: 'Atos 9:3', localizacaoAtual: 'Damasco, Síria', lat: 33.5138, lng: 36.2765, categoria: 'NT', tipo: 'cidade', eventos: ['Conversão de Paulo', 'Cura de Ananias'] },
  { nome: 'Rio Jordão', descricao: 'Rio onde Israel cruzou para entrar na Terra Prometida e onde Jesus foi batizado.', referencia: 'Josué 3:17', localizacaoAtual: 'Rio Jordão', lat: 31.8360, lng: 35.5410, categoria: 'AT & NT', tipo: 'rio', eventos: ['Cruzamento de Israel', 'Batismo de Jesus'] },
  { nome: 'Mar Morto', descricao: 'Rio mais baixo do mundo.onde Sodoma e Gomorra foram destruídas.', referencia: 'Gênesis 14:3', localizacaoAtual: 'Mar Morto, Israel/Palestina', lat: 31.5000, lng: 35.5000, categoria: 'AT', tipo: 'mar', eventos: ['Destruição de Sodoma', 'Refúgio de Davi'] },
  { nome: 'Mar da Galileia', descricao: 'Lago onde Jesus calmou a tempestade e andou sobre as águas.', referencia: 'Mateus 14:25', localizacaoAtual: 'Lago de Tiberíades, Israel', lat: 32.8333, lng: 35.5833, categoria: 'NT', tipo: 'mar', eventos: ['Caminhada sobre as águas', 'Pesca milagrosa'] },
  { nome: 'Monte Sinai', descricao: 'Montanha sagrada. Moisés recebeu os mandamentos.', referencia: 'Êxodo 19:20', localizacaoAtual: 'Jebel Musa, Egito', lat: 28.5395, lng: 33.9753, categoria: 'AT', tipo: 'montanha', eventos: ['Entrega da Lei', 'Visão da sarça ardente'] },
  { nome: 'Monte das Oliveiras', descricao: 'Local da ascensão de Jesus e profecia escatológica.', referencia: 'Atos 1:9', localizacaoAtual: 'Jerusalém, Israel', lat: 31.7780, lng: 35.2423, categoria: 'NT', tipo: 'montanha', eventos: ['Ascensão de Jesus', 'Getsêmani'] },
];

const CATEGORIA_CORES: Record<string, string> = {
  'AT': 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  'NT': 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  'AT & NT': 'bg-purple-500/10 text-purple-600 border-purple-500/30',
};

const TIPO_ICONS: Record<string, string> = {
  cidade: '🏙️', montanha: '⛰️', rio: '🌊', deserto: '🏜️', mar: '🌊', regiao: '🌍',
};

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function MapasPage() {
  const [busca, setBusca] = useState('');
  const [filtroCat, setFiltroCat] = useState<string>('all');
  const [filtroTipo, setFiltroTipo] = useState<string>('all');
  const [selectedLocal, setSelectedLocal] = useState<LocalBiblico | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([31.5, 35.0]);
  const [mapZoom, setMapZoom] = useState(6);

  const filtrados = useMemo(() => {
    return LOCAIS.filter(l => {
      if (busca && !l.nome.toLowerCase().includes(busca.toLowerCase()) && !l.descricao.toLowerCase().includes(busca.toLowerCase())) return false;
      if (filtroCat !== 'all' && l.categoria !== filtroCat) return false;
      if (filtroTipo !== 'all' && l.tipo !== filtroTipo) return false;
      return true;
    });
  }, [busca, filtroCat, filtroTipo]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-0 h-screen flex flex-col">
        <div className="px-4 py-3 border-b border-border/40 bg-background/95 backdrop-blur z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Map className="w-4 h-4 text-emerald-500" />
              </div>
              <h1 className="font-display text-xl font-light">Atlas <span className="text-primary italic">Bíblico</span></h1>
              <span className="text-xs text-muted-foreground">{filtrados.length} locais</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                  placeholder="Buscar local..."
                  className="w-full pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                {busca && <button onClick={() => setBusca('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted/50">
                  <X className="w-3 h-3" /></button>}
              </div>
              <select value={filtroCat} onChange={e => setFiltroCat(e.target.value)}
                className="px-3 py-2 text-sm border border-border rounded-lg bg-background">
                <option value="all">Todos</option>
                <option value="AT">Antigo Testamento</option>
                <option value="NT">Novo Testamento</option>
                <option value="AT & NT">Ambos</option>
              </select>
              <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}
                className="px-3 py-2 text-sm border border-border rounded-lg bg-background">
                <option value="all">Todos os tipos</option>
                <option value="cidade">Cidades</option>
                <option value="montanha">Montanhas</option>
                <option value="rio">Rios</option>
                <option value="mar">Mares</option>
                <option value="regiao">Regiões</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 flex relative">
          {/* Map */}
          <div className="flex-1 relative">
            <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full z-0" zoomControl={false}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ChangeView center={mapCenter} zoom={mapZoom} />
              {filtrados.map((local, i) => (
                <Marker key={i} position={[local.lat, local.lng]}
                  icon={icon({
                    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${local.categoria === 'AT' ? 'gold' : local.categoria === 'NT' ? 'blue' : 'violet'}.png`,
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [25, 41], iconAnchor: [12, 41],
                  })}
                  eventHandlers={{ click: () => { setSelectedLocal(local); setMapCenter([local.lat, local.lng]); setMapZoom(10); } }}>
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="font-bold text-sm">{local.nome}</h3>
                      <p className="text-xs text-gray-600 mt-1">{local.descricao}</p>
                      <p className="text-xs text-blue-600 mt-1">{local.referencia}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-border/40 bg-background/95 backdrop-blur overflow-y-auto hidden md:block">
            <div className="p-3 space-y-2">
              {filtrados.map((local, i) => (
                <button key={i} onClick={() => { setSelectedLocal(local); setMapCenter([local.lat, local.lng]); setMapZoom(10); }}
                  className={cn('w-full text-left p-3 rounded-xl border transition-all',
                    selectedLocal?.nome === local.nome ? 'border-primary/50 bg-primary/5' : 'border-border/50 hover:border-primary/30')}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{TIPO_ICONS[local.tipo]}</span>
                    <span className="font-medium text-sm flex-1">{local.nome}</span>
                    <span className={cn('text-[10px] px-2 py-0.5 rounded-full border', CATEGORIA_CORES[local.categoria])}>{local.categoria}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{local.descricao}</p>
                  <p className="text-[10px] text-primary mt-1">{local.referencia}</p>
                  {selectedLocal?.nome === local.nome && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="text-[10px] text-muted-foreground mb-1">Eventos:</p>
                      <div className="flex flex-wrap gap-1">
                        {local.eventos.map((e, j) => (
                          <span key={j} className="text-[9px] px-1.5 py-0.5 rounded bg-muted">{e}</span>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">📍 {local.localizacaoAtual}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
