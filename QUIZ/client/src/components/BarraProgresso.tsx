import { Clock, CheckCircle, XCircle, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface BarraProgressoProps {
  questaoAtual: number;
  totalQuestoes: number;
  acertos: number;
  erros: number;
  tempo: number;
}

export default function BarraProgresso({
  questaoAtual,
  totalQuestoes,
  acertos,
  erros,
  tempo,
}: BarraProgressoProps) {
  const percentualProgresso = ((questaoAtual + 1) / totalQuestoes) * 100;
  const percentualAcertos = totalQuestoes > 0 ? Math.round(((acertos) / totalQuestoes) * 100) : 0;
  
  const formatarTempo = (segundos: number) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    
    if (horas > 0) {
      return `${horas}h ${minutos}m`;
    }
    return `${minutos}m ${segs}s`;
  };

  const questoesRestantes = totalQuestoes - (acertos + erros);

  return (
    <div className="space-y-6">
      {/* Barra de Progresso Principal */}
      <div className="card-brutal p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {questaoAtual + 1} / {totalQuestoes}
          </span>
          <span className="text-2xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {Math.round(percentualProgresso)}%
          </span>
        </div>
        <Progress value={percentualProgresso} className="h-4 border-2 border-foreground" />
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Acertos */}
        <div className="card-brutal p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {acertos}
          </div>
          <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ACERTOS
          </div>
        </div>

        {/* Erros */}
        <div className="card-brutal p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <XCircle className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {erros}
          </div>
          <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ERROS
          </div>
        </div>

        {/* Restantes */}
        <div className="card-brutal p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {questoesRestantes}
          </div>
          <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            RESTANTES
          </div>
        </div>

        {/* Percentual */}
        <div className="card-brutal p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {percentualAcertos}%
          </div>
          <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            APROVEITAMENTO
          </div>
        </div>
      </div>

      {/* Cronômetro */}
      <div className="card-brutal p-8 bg-foreground text-background">
        <div className="flex items-center justify-center gap-4">
          <Clock className="w-8 h-8" />
          <span className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {formatarTempo(tempo)}
          </span>
        </div>
      </div>
    </div>
  );
}
