export type ThemeName = 'light' | 'dark' | 'sepia' | 'noturno';

export interface DesignTokens {
  surface: {
    base: string;
    raised: string;
    overlay: string;
    sunken: string;
    inverted: string;
  };
  content: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    link: string;
  };
  brand: {
    default: string;
    hover: string;
    emphasis: string;
    subtle: string;
    contrast: string;
  };
  accent: {
    warm: string;
    cool: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
  };
  effects: {
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
    shadowGlow: string;
  };
  geometry: {
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusXl: string;
    radiusFull: string;
  };
  gradients: {
    hero: string;
    divine: string;
    warm: string;
    sunset: string;
  };
}

export const designTokens: Record<ThemeName, DesignTokens> = {
  light: {
    surface: {
      base: '#FAFAF7',
      raised: '#FFFFFF',
      overlay: 'rgba(255, 255, 255, 0.96)',
      sunken: '#F4F1EA',
      inverted: '#1C1917',
    },
    content: {
      primary: '#1C1917',
      secondary: '#57534E',
      muted: '#A8A29E',
      inverse: '#FAFAF7',
      link: '#A17A2C',
    },
    brand: {
      default: '#A17A2C',
      hover: '#8A6923',
      emphasis: '#C49A4D',
      subtle: 'rgba(161, 122, 44, 0.12)',
      contrast: '#FFFFFF',
    },
    accent: {
      warm: '#B45309',
      cool: '#1E3A8A',
      success: '#15803D',
      danger: '#B91C1C',
      warning: '#CA8A04',
      info: '#0369A1',
    },
    effects: {
      shadowSm: '0 1px 2px rgba(28, 25, 23, 0.06), 0 1px 3px rgba(28, 25, 23, 0.04)',
      shadowMd: '0 4px 12px rgba(28, 25, 23, 0.08), 0 2px 4px rgba(28, 25, 23, 0.04)',
      shadowLg: '0 12px 32px rgba(28, 25, 23, 0.12), 0 4px 12px rgba(28, 25, 23, 0.06)',
      shadowGlow: '0 0 24px rgba(161, 122, 44, 0.20)',
    },
    geometry: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.75rem',
      radiusXl: '1.25rem',
      radiusFull: '9999px',
    },
    gradients: {
      hero: 'linear-gradient(135deg, #A17A2C 0%, #C49A4D 50%, #E07A30 100%)',
      divine: 'linear-gradient(135deg, #A17A2C 0%, #B45309 100%)',
      warm: 'linear-gradient(135deg, #B45309 0%, #E07A30 100%)',
      sunset: 'linear-gradient(180deg, #FAFAF7 0%, #F4EBD8 50%, #E8C19A 100%)',
    },
  },

  dark: {
    surface: {
      base: '#0A0908',
      raised: '#161412',
      overlay: 'rgba(22, 20, 18, 0.96)',
      sunken: '#0F0D0B',
      inverted: '#F5F1E8',
    },
    content: {
      primary: '#F5F1E8',
      secondary: '#B8B0A4',
      muted: '#7A7368',
      inverse: '#0A0908',
      link: '#D4A843',
    },
    brand: {
      default: '#D4A843',
      hover: '#E0B558',
      emphasis: '#E8C56B',
      subtle: 'rgba(212, 168, 67, 0.14)',
      contrast: '#0A0908',
    },
    accent: {
      warm: '#E07A30',
      cool: '#3B5BA5',
      success: '#22C55E',
      danger: '#EF4444',
      warning: '#EAB308',
      info: '#38BDF8',
    },
    effects: {
      shadowSm: '0 1px 2px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)',
      shadowMd: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
      shadowLg: '0 12px 32px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)',
      shadowGlow: '0 0 24px rgba(212, 168, 67, 0.25)',
    },
    geometry: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.75rem',
      radiusXl: '1.25rem',
      radiusFull: '9999px',
    },
    gradients: {
      hero: 'linear-gradient(135deg, #D4A843 0%, #E0B558 50%, #E07A30 100%)',
      divine: 'linear-gradient(135deg, #D4A843 0%, #E07A30 100%)',
      warm: 'linear-gradient(135deg, #E07A30 0%, #F59E0B 100%)',
      sunset: 'linear-gradient(180deg, #0A0908 0%, #1A1612 50%, #2A1810 100%)',
    },
  },

  sepia: {
    surface: {
      base: '#ECE5D3',
      raised: '#F4EBD8',
      overlay: 'rgba(244, 235, 216, 0.96)',
      sunken: '#E0D6BD',
      inverted: '#3A2E1C',
    },
    content: {
      primary: '#3A2E1C',
      secondary: '#6B5A42',
      muted: '#9A8A6E',
      inverse: '#ECE5D3',
      link: '#7A5418',
    },
    brand: {
      default: '#7A5418',
      hover: '#6A4612',
      emphasis: '#A07420',
      subtle: 'rgba(122, 84, 24, 0.14)',
      contrast: '#F4EBD8',
    },
    accent: {
      warm: '#A04020',
      cool: '#2C3E70',
      success: '#2F6B3F',
      danger: '#9B2C2C',
      warning: '#B8860B',
      info: '#1F6A8A',
    },
    effects: {
      shadowSm: '0 1px 2px rgba(58, 46, 28, 0.08), 0 1px 3px rgba(58, 46, 28, 0.05)',
      shadowMd: '0 4px 12px rgba(58, 46, 28, 0.10), 0 2px 4px rgba(58, 46, 28, 0.05)',
      shadowLg: '0 12px 32px rgba(58, 46, 28, 0.15), 0 4px 12px rgba(58, 46, 28, 0.08)',
      shadowGlow: '0 0 24px rgba(160, 64, 32, 0.22)',
    },
    geometry: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.75rem',
      radiusXl: '1.25rem',
      radiusFull: '9999px',
    },
    gradients: {
      hero: 'linear-gradient(135deg, #7A5418 0%, #A04020 50%, #B45309 100%)',
      divine: 'linear-gradient(135deg, #7A5418 0%, #A04020 100%)',
      warm: 'linear-gradient(135deg, #A04020 0%, #B45309 100%)',
      sunset: 'linear-gradient(180deg, #ECE5D3 0%, #E0C9A0 50%, #C49858 100%)',
    },
  },

  noturno: {
    surface: {
      base: '#000000',
      raised: '#0A0A0A',
      overlay: 'rgba(10, 10, 10, 0.96)',
      sunken: '#050505',
      inverted: '#C4B5A0',
    },
    content: {
      primary: '#C4B5A0',
      secondary: '#8A7D6B',
      muted: '#5A5044',
      inverse: '#000000',
      link: '#C8A668',
    },
    brand: {
      default: '#C8A668',
      hover: '#D4B47A',
      emphasis: '#DCC089',
      subtle: 'rgba(200, 166, 104, 0.14)',
      contrast: '#000000',
    },
    accent: {
      warm: '#A06030',
      cool: '#3A4A7A',
      success: '#3A7A4A',
      danger: '#8A3030',
      warning: '#A08020',
      info: '#3A6A8A',
    },
    effects: {
      shadowSm: '0 1px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.4)',
      shadowMd: '0 4px 12px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
      shadowLg: '0 12px 32px rgba(0, 0, 0, 0.7), 0 4px 12px rgba(0, 0, 0, 0.5)',
      shadowGlow: '0 0 24px rgba(200, 166, 104, 0.18)',
    },
    geometry: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.75rem',
      radiusXl: '1.25rem',
      radiusFull: '9999px',
    },
    gradients: {
      hero: 'linear-gradient(135deg, #C8A668 0%, #D4B47A 50%, #A06030 100%)',
      divine: 'linear-gradient(135deg, #C8A668 0%, #A06030 100%)',
      warm: 'linear-gradient(135deg, #A06030 0%, #B87038 100%)',
      sunset: 'linear-gradient(180deg, #000000 0%, #0A0805 50%, #1A0F08 100%)',
    },
  },
};

export const themeList: ThemeName[] = ['light', 'dark', 'sepia', 'noturno'];

export const themeLabels: Record<ThemeName, { pt: string; en: string }> = {
  light: { pt: 'Manhã', en: 'Morning' },
  dark: { pt: 'Noite', en: 'Night' },
  sepia: { pt: 'Leitura', en: 'Reading' },
  noturno: { pt: 'OLED', en: 'OLED' },
};
