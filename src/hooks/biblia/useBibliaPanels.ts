'use client';

import { useState } from 'react';
import type { SidePanelWidth } from '@/components/Biblia/SidePanel';

export interface UseBibliaPanelsReturn {
  sidePanelWidth: SidePanelWidth;
  setSidePanelWidth: React.Dispatch<React.SetStateAction<SidePanelWidth>>;
  sidePanelTab: 'comentarios' | 'strong' | 'notas' | 'estudos' | 'contexto' | null;
  setSidePanelTab: React.Dispatch<React.SetStateAction<'comentarios' | 'strong' | 'notas' | 'estudos' | 'contexto' | null>>;
  studyPanel: 'notas' | 'strong' | 'comentarios' | null;
  setStudyPanel: React.Dispatch<React.SetStateAction<'notas' | 'strong' | 'comentarios' | null>>;
  paywallAprofundarAberto: boolean;
  setPaywallAprofundarAberto: React.Dispatch<React.SetStateAction<boolean>>;
  sidePanelOpen: boolean;
}

export function UseBibliaPanels(): UseBibliaPanelsReturn {
  const [sidePanelWidth, setSidePanelWidth] = useState<SidePanelWidth>('collapsed');
  const [sidePanelTab, setSidePanelTab] = useState<'comentarios' | 'strong' | 'notas' | 'estudos' | 'contexto' | null>(null);
  const [studyPanel, setStudyPanel] = useState<'notas' | 'strong' | 'comentarios' | null>(null);
  const [paywallAprofundarAberto, setPaywallAprofundarAberto] = useState(false);

  const sidePanelOpen = sidePanelWidth !== 'collapsed' && sidePanelTab !== null;

  return {
    sidePanelWidth,
    setSidePanelWidth,
    sidePanelTab,
    setSidePanelTab,
    studyPanel,
    setStudyPanel,
    paywallAprofundarAberto,
    setPaywallAprofundarAberto,
    sidePanelOpen,
  };
}
