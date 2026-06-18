import { Cabeçalho } from '@/components/layout/cabecalho';
import { Rodapé } from '@/components/layout/rodape';
import { HeroEditorial } from '@/components/home/hero-editorial';
import { ColecaoModulos } from '@/components/home/colecao-modulos';
import { SecaoDestaque } from '@/components/home/secao-destaque';
import { Lantejoulas } from '@/components/home/lantejoulas';

export default function PaginaInicial() {
  return (
    <div className="min-h-screen bg-background">
      <Cabeçalho />
      <main>
        <HeroEditorial />
        <Lantejoulas />
        <ColecaoModulos />
        <SecaoDestaque />
      </main>
      <Rodapé />
    </div>
  );
}
