'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapPin, BookOpen, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

interface LocalBiblico {
  nome: string;
  descricao: string;
  referencia: string;
  localizacaoAtual: string;
  lat: number;
  lng: number;
  categoria: string;
}

const locais: LocalBiblico[] = [
  {
    nome: 'Jerusalém',
    descricao: 'Cidade sagrada, centro do culto no Templo. Local da Paixão, Morte e Ressurreição de Jesus.',
    referencia: '1 Reis 6:1 · Mateus 21:1 · Atos 1:8',
    localizacaoAtual: 'Jerusalém, Israel',
    lat: 31.7683,
    lng: 35.2137,
    categoria: 'AT & NT',
  },
  {
    nome: 'Nazaré',
    descricao: 'Cidade onde Jesus cresceu. Local da Anunciação a Maria e da rejeição de Jesus na sinagoga.',
    referencia: 'Lucas 1:26-38 · Lucas 4:16-30',
    localizacaoAtual: 'Nazaré, Israel',
    lat: 32.6996,
    lng: 35.3035,
    categoria: 'NT',
  },
  {
    nome: 'Belém',
    descricao: 'Cidade natal de Jesus Cristo. Local do nascimento e adoração dos pastores e magos.',
    referencia: 'Miquéias 5:2 · Mateus 2:1 · Lucas 2:4-7',
    localizacaoAtual: 'Belém, Palestina',
    lat: 31.7054,
    lng: 35.2024,
    categoria: 'AT & NT',
  },
  {
    nome: 'Roma',
    descricao: 'Capital do Império Romano. Local onde Paulo foi martirizado e onde a igreja primitiva se firmou.',
    referencia: 'Atos 28:14-31 · Romanos 1:7',
    localizacaoAtual: 'Roma, Itália',
    lat: 41.9028,
    lng: 12.4964,
    categoria: 'NT',
  },
  {
    nome: 'Éfeso',
    descricao: 'Grande cidade comercial da Ásia Menor. Paulo pregou lá por 3 anos; João escreveu o Apocalipse.',
    referencia: 'Atos 19:1-41 · Efésios 1:1 · Apocalipse 1:11',
    localizacaoAtual: 'Selçuk, Turquia',
    lat: 37.9411,
    lng: 27.3414,
    categoria: 'NT',
  },
  {
    nome: 'Corinto',
    descricao: 'Centro mercantil romano. Paulo fundou a igreja e escreveu duas epístolas aos Coríntios.',
    referencia: 'Atos 18:1-18 · 1 Coríntios 1:2',
    localizacaoAtual: 'Corinto, Grécia',
    lat: 37.9088,
    lng: 22.8758,
    categoria: 'NT',
  },
  {
    nome: 'Antioquia',
    descricao: 'Primeiro centro de missões cristãs. Paulo e Barnabé partiram daqui para as missões.',
    referencia: 'Atos 11:19-26 · Atos 13:1-3',
    localizacaoAtual: 'Antakya, Turquia',
    lat: 36.2319,
    lng: 36.1611,
    categoria: 'NT',
  },
  {
    nome: 'Damasco',
    descricao: 'Local da conversão de Saulo (Paulo) na estrada. Fugiu por uma cesta pelas muralhas.',
    referencia: 'Atos 9:1-25 · 2 Coríntios 11:32-33',
    localizacaoAtual: 'Damasco, Síria',
    lat: 33.5138,
    lng: 36.2765,
    categoria: 'NT',
  },
  {
    nome: 'Alexandria',
    descricao: 'Grande centro intelectual. Biblioteca de Alexandria. Lugar onde Apolos ensinava.',
    referencia: 'Atos 18:24-25',
    localizacaoAtual: 'Alexandria, Egito',
    lat: 31.2001,
    lng: 29.9187,
    categoria: 'NT',
  },
  {
    nome: 'Cesaréia',
    descricao: 'Porto romano. Pedro batizou Cornélio aqui. Paulo foi preso e apelou a César.',
    referencia: 'Atos 10:1-48 · Atos 23:33-25:1',
    localizacaoAtual: 'Caesarea, Israel',
    lat: 32.4982,
    lng: 34.8904,
    categoria: 'NT',
  },
  {
    nome: 'Samaria',
    descricao: 'Região entre Galileia e Judeia. Jesus falou com a mulher samaritana no poço.',
    referencia: 'João 4:1-42 · Atos 1:8',
    localizacaoAtual: 'Nablus, Palestina',
    lat: 32.2213,
    lng: 35.2544,
    categoria: 'AT & NT',
  },
  {
    nome: 'Galileia',
    descricao: 'Região onde Jesus cresceu e realizou a maioria de seus milagres e ensinos.',
    referencia: 'Mateus 4:12-17 · Marcos 1:14-15',
    localizacaoAtual: 'Norte de Israel',
    lat: 32.8550,
    lng: 35.4780,
    categoria: 'NT',
  },
  {
    nome: 'Judeia',
    descricao: 'Região ao sul da Galileia. Local da vida pública de Jesus e do ministério em Jerusalém.',
    referencia: 'Lucas 1:5 · Mateus 2:1 · João 3:22',
    localizacaoAtual: 'Sul de Israel / Palestina',
    lat: 31.5000,
    lng: 35.1000,
    categoria: 'AT & NT',
  },
  {
    nome: 'Deserto do Sinai',
    descricao: 'Peregrinação de Israel por 40 anos. Local de provações e mana do céu.',
    referencia: 'Êxodo 16:1-35 · Números 14:33-34',
    localizacaoAtual: 'Península do Sinai, Egito',
    lat: 29.5000,
    lng: 33.8000,
    categoria: 'AT',
  },
  {
    nome: 'Monte Sinai',
    descricao: 'Local onde Moisés recebeu os Dez Mandamentos e a Lei de Deus.',
    referencia: 'Êxodo 19:1-25 · Êxodo 20:1-17',
    localizacaoAtual: 'Península do Sinai, Egito',
    lat: 28.5392,
    lng: 33.9753,
    categoria: 'AT',
  },
  {
    nome: 'Monte das Oliveiras',
    descricao: 'Local do ensino escatológico de Jesus, sua ascensão e futuro local da segunda vinda.',
    referencia: 'Mateus 24:3 · Lucas 24:50-51 · Atos 1:9-12',
    localizacaoAtual: 'Jerusalém, Israel',
    lat: 31.7785,
    lng: 35.2436,
    categoria: 'AT & NT',
  },
  {
    nome: 'Vale de Elom',
    descricao: 'Local do confronto entre Davi e Golias, um dos episódios mais icônicos do AT.',
    referencia: '1 Samuel 17:1-54',
    localizacaoAtual: 'Socó, Israel',
    lat: 31.6700,
    lng: 34.9300,
    categoria: 'AT',
  },
  {
    nome: 'Rio Jordão',
    descricao: 'Local do batismo de Jesus por João Batista. Os israelitas cruzaram na Conquista.',
    referencia: 'Josué 3:14-17 · Mateus 3:13-17',
    localizacaoAtual: 'Vale do Jordão, Israel/Jordânia',
    lat: 31.8500,
    lng: 35.5500,
    categoria: 'AT & NT',
  },
  {
    nome: 'Mar Morto',
    descricao: 'Lago salgado mais baixo do mundo. Local de Sodoma e Gomorra. Descobertas do Pergaminho do Mar Morto.',
    referencia: 'Gênesis 14:3 · Êxodo 14:27 · 2 Crônicas 20:2',
    localizacaoAtual: 'Israel / Jordânia',
    lat: 31.5000,
    lng: 35.5000,
    categoria: 'AT',
  },
  {
    nome: 'Mar da Galileia',
    descricao: 'Lago onde Jesus andou sobre as águas, acalmou a tempestade e chamou os pescadores.',
    referencia: 'Mateus 14:22-33 · Lucas 5:1-11',
    localizacaoAtual: 'Lago Tiberíades, Israel',
    lat: 32.8333,
    lng: 35.5833,
    categoria: 'NT',
  },
];

const categorias = ['Todos', 'AT', 'NT', 'AT & NT'];

export default function AtlasPage() {
  const [filtro, setFiltro] = useState('Todos');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const locaisFiltrados = filtro === 'Todos' ? locais : locais.filter((l) => l.categoria === filtro);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 70% 50%, hsl(var(--primary)) 0%, transparent 50%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Atlas Bíblico Interativo
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Locais Sagrados da{' '}
              <span className="text-primary">Escritura</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Explore os lugares que moldaram a história bíblica — desde as cidades do Antigo Testamento
              até as igrejas do Novo Testamento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filtro === cat
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-card/80 border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de Locais */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {locaisFiltrados.map((local, idx) => (
            <ScrollReveal key={local.nome} delay={idx * 0.05}>
              <motion.div
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg">{local.nome}</h3>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                        {local.categoria}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {local.descricao}
                </p>

                <div className="flex items-center gap-2 mb-3 text-xs text-primary/80">
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{local.referencia}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-3">
                  <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{local.localizacaoAtual}</span>
                </div>

                <a
                  href={`https://www.google.com/maps?q=${local.lat},${local.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Ver no Google Maps
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Mapa Embedado (Leaflet/OpenStreetMap) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <ScrollReveal>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Mapa dos Locais Bíblicos
              </h2>
            </div>
            <div className="relative w-full" style={{ height: '500px' }}>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=10%2C25%2C45%2C40&amp;layer=mapnik"
                className="w-full h-full border-0"
                title="Mapa de Locais Bíblicos"
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
