"use client";

import { useEffect } from "react";

interface TallyEmbedProps {
  formId: string;
}

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

export default function TallyEmbed({ formId }: TallyEmbedProps) {
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => window.Tally?.loadEmbeds();
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [formId]);

  return (
    <iframe
      data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
      loading="lazy"
      width="100%"
      height="500"
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Registro — Grupo de Estudio DMBOK"
    />
  );
}
