import { ExegeseClient } from './client';

export const metadata = {
  title: 'Exegese Bíblica | Sola Scriptura BR',
  description: 'Ferramenta de exegese automática com análise contextual, gramatical e teológica das Escrituras.',
};

export default function ExegesePage() {
  return <ExegeseClient />;
}
