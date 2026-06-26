import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RespostaUsuario, Questao } from '@/types/quiz';

interface SidebarProgressoProps {
  questoes: Questao[];
  respostas: RespostaUsuario[];
  questaoAtualIndex: number;
  onIrParaQuestao: (index: number) => void;
}

export default function SidebarProgresso({
  questoes,
  respostas,
  questaoAtualIndex,
  onIrParaQuestao,
}: SidebarProgressoProps) {
  const getStatusQuestao = (index: number) => {
    const resposta = respostas[index];
    if (!resposta.resposta) return 'nao-respondida';
    if (resposta.resposta === questoes[index].resposta_correta) return 'correta';
    return 'incorreta';
  };

  const getCorQuestao = (status: string) => {
    switch (status) {
      case 'correta':
        return 'bg-green-600 text-white border-4 border-green-600';
      case 'incorreta':
        return 'bg-red-600 text-white border-4 border-red-600';
      default:
        return 'bg-background text-foreground border-4 border-foreground';
    }
  };

  return (
    <div className="hidden lg:block sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="card-brutal p-8 border-4 border-foreground">
        <h3 className="font-black text-2xl mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          PROGRESSO
        </h3>
        
        <div className="grid grid-cols-5 gap-3 mb-12">
          {questoes.map((_, index) => {
            const status = getStatusQuestao(index);
            const isAtual = index === questaoAtualIndex;
            const corClass = getCorQuestao(status);

            return (
              <Button
                key={index}
                onClick={() => onIrParaQuestao(index)}
                className={`h-12 w-12 p-0 text-sm font-black btn-brutal ${corClass} ${
                  isAtual ? 'ring-4 ring-foreground ring-offset-2' : ''
                }`}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="space-y-4 text-sm border-t-4 border-foreground pt-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-600 border-2 border-foreground" />
            <span className="font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ACERTADA</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-600 border-2 border-foreground" />
            <span className="font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ERRADA</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-background border-4 border-foreground" />
            <span className="font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>NÃO RESPONDIDA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
