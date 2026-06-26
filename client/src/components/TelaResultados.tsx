import { RotateCcw, Shuffle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Simulado } from '@/types/quiz';

interface TelaResultadosProps {
  simulado: Simulado;
  onRefazer: () => void;
  onNovoSimulado: () => void;
  onVoltar: () => void;
}

export default function TelaResultados({
  simulado,
  onRefazer,
  onNovoSimulado,
  onVoltar,
}: TelaResultadosProps) {
  const tempoTotal = simulado.tempoTotal || 0;
  const formatarTempo = (segundos: number) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    
    if (horas > 0) {
      return `${horas}h ${minutos}m ${segs}s`;
    }
    return `${minutos}m ${segs}s`;
  };

  const getMensagem = (percentual: number) => {
    if (percentual >= 90) return 'EXCELENTE! VOCÊ PASSOU!';
    if (percentual >= 70) return 'MUITO BOM! CONTINUE ASSIM!';
    if (percentual >= 50) return 'BOM PROGRESSO! REVISE OS ASSUNTOS!';
    return 'CONTINUE PRATICANDO!';
  };

  const disciplinas = Object.entries(simulado.questoes.reduce((acc, questao) => {
    if (!acc[questao.disciplina]) {
      acc[questao.disciplina] = { acertos: 0, total: 0 };
    }
    acc[questao.disciplina].total++;
    
    const resposta = simulado.respostas.find(r => r.questaoId === questao.id);
    if (resposta?.resposta === questao.resposta_correta) {
      acc[questao.disciplina].acertos++;
    }
    
    return acc;
  }, {} as Record<string, { acertos: number; total: number }>));

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Card Principal - Pontuação */}
        <div className="card-brutal p-12 border-4 border-foreground">
          <div className="mb-12 text-center">
            <div className="text-8xl md:text-9xl font-black mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {simulado.percentual}%
            </div>
            <p className="text-4xl md:text-5xl font-black mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {getMensagem(simulado.percentual)}
            </p>
            <Progress value={simulado.percentual} className="h-6 border-4 border-foreground" />
          </div>

          {/* Estatísticas Principais */}
          <div className="grid grid-cols-3 gap-6 mb-12 border-t-4 border-foreground pt-12">
            <div className="card-brutal p-8 text-center border-4 border-foreground">
              <div className="text-5xl font-black text-green-600" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {simulado.acertos}
              </div>
              <div className="text-lg font-black mt-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                ACERTOS
              </div>
            </div>
            <div className="card-brutal p-8 text-center border-4 border-foreground">
              <div className="text-5xl font-black text-red-600" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {simulado.erros}
              </div>
              <div className="text-lg font-black mt-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                ERROS
              </div>
            </div>
            <div className="card-brutal p-8 text-center border-4 border-foreground">
              <div className="text-5xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {simulado.questoes.length}
              </div>
              <div className="text-lg font-black mt-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                TOTAL
              </div>
            </div>
          </div>

          {/* Tempo */}
          <div className="card-brutal p-8 bg-foreground text-background border-4 border-foreground text-center">
            <p className="text-sm font-bold mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              TEMPO TOTAL
            </p>
            <p className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {formatarTempo(tempoTotal)}
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 border-t-4 border-foreground pt-12">
            <Button
              onClick={onRefazer}
              className="btn-brutal bg-background text-foreground text-lg py-8 font-black"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              REFAZER
            </Button>
            <Button
              onClick={onNovoSimulado}
              className="btn-brutal bg-foreground text-background text-lg py-8 font-black"
            >
              <Shuffle className="w-6 h-6 mr-2" />
              NOVO
            </Button>
            <Button
              onClick={onVoltar}
              className="btn-brutal bg-background text-foreground text-lg py-8 font-black"
            >
              <Home className="w-6 h-6 mr-2" />
              INÍCIO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
