import { useState, useEffect } from 'react';

export function useCronometro(ativo: boolean, tempoInicio: number) {
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    if (!ativo || tempoInicio === 0) return;

    const interval = setInterval(() => {
      setTempo(Math.floor((Date.now() - tempoInicio) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [ativo, tempoInicio]);

  return tempo;
}
