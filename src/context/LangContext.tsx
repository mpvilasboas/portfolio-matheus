import { createContext, useContext, useState } from 'react';
import { translations, type Lang, type Translations } from '../i18n/translations';

interface LangContextType {
  lang: Lang;
  t: Translations;
  toggle: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'pt',
  t: translations.pt,
  toggle: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'pt' || saved === 'en') return saved;
    // Detecta idioma do navegador
    return navigator.language.startsWith('pt') ? 'pt' : 'en';
  });

  function toggle() {
    setLang(l => {
      const next: Lang = l === 'pt' ? 'en' : 'pt';
      localStorage.setItem('lang', next);
      return next;
    });
  }

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
