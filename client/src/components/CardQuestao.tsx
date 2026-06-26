import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Questao, RespostaUsuario } from '@/types/quiz';

interface CardQuestaoProps {
  questao: Questao;
  resposta: RespostaUsuario;
  onResponder: (alternativa: 'A' | 'B' | 'C' | 'D') => void;
  onProxima: () => void;
  onAnterior: () => void;
  temProxima: boolean;
  temAnterior: boolean;
  questaoIndex: number;
  totalQuestoes: number;
}

export default function CardQuestao({
  questao,
  resposta,
  onResponder,
  onProxima,
  onAnterior,
  temProxima,
  temAnterior,
  questaoIndex,
  totalQuestoes,
}: CardQuestaoProps) {
  const respondida = resposta.resposta !== null;
  const acertou = respondida && resposta.resposta === questao.resposta_correta;

  const alternativas: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-8">
      {/* Metadados */}
      <div className="card-brutal p-8 border-4 border-foreground">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              ASSUNTO
            </span>
            <p className="text-lg font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {questao.assunto}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              BANCA
            </span>
            <p className="text-lg font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {questao.banca}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              ANO
            </span>
            <p className="text-lg font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {questao.ano}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              CARGO
            </span>
            <p className="text-sm font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {questao.cargo}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              NÍVEL
            </span>
            <Badge className="border-2 border-foreground bg-foreground text-background font-black">
              {questao.nivel}
            </Badge>
          </div>
        </div>
      </div>

      {/* Enunciado */}
      <div className="card-brutal p-8 border-4 border-foreground">
        <h3 className="text-2xl md:text-3xl font-black mb-8 whitespace-pre-wrap" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {questao.enunciado}
        </h3>

        {/* Alternativas */}
        <div className="space-y-4">
          {alternativas.map(alt => {
            const isSelected = resposta.resposta === alt;
            const isCorreta = alt === questao.resposta_correta;
            const isErrada = respondida && isSelected && !isCorreta;

            let bgClass = 'bg-background';
            let borderClass = 'border-4 border-foreground';
            let textClass = 'text-foreground';

            if (respondida) {
              if (isCorreta) {
                bgClass = 'bg-background';
                borderClass = 'border-4 border-green-600';
                textClass = 'text-foreground font-black';
              } else if (isErrada) {
                bgClass = 'bg-background';
                borderClass = 'border-4 border-red-600';
                textClass = 'text-foreground font-black';
              } else {
                bgClass = 'bg-background opacity-50';
                borderClass = 'border-4 border-foreground';
                textClass = 'text-foreground';
              }
            }

            return (
              <Button
                key={alt}
                onClick={() => !respondida && onResponder(alt)}
                disabled={respondida}
                className={`w-full h-auto p-6 text-left justify-start btn-brutal text-lg ${bgClass} ${borderClass} ${textClass}`}
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                <span className="flex-1">
                  <span className="font-black mr-4 text-2xl">{alt}.</span>
                  {questao.alternativas[alt]}
                </span>
                {respondida && isCorreta && <CheckCircle className="w-6 h-6 ml-2 flex-shrink-0 text-green-600" />}
                {respondida && isErrada && <XCircle className="w-6 h-6 ml-2 flex-shrink-0 text-red-600" />}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Comentário */}
      {respondida && (
        <div className={`card-brutal p-8 border-4 ${acertou ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'}`}>
          <div className="flex gap-4 mb-6">
            {acertou ? (
              <>
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <h4 className="font-black text-2xl text-green-600" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  ACERTOU!
                </h4>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <h4 className="font-black text-2xl text-red-600" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  ERROU!
                </h4>
              </>
            )}
          </div>
          <p className="text-foreground whitespace-pre-wrap leading-relaxed font-mono">
            {questao.comentario}
          </p>
        </div>
      )}

      {/* Botões de Navegação */}
      {respondida && (
        <div className="flex gap-4">
          <Button
            onClick={onAnterior}
            disabled={!temAnterior}
            className="flex-1 btn-brutal bg-background text-foreground text-lg py-6 font-black"
          >
            ← ANTERIOR
          </Button>
          {temProxima ? (
            <Button
              onClick={onProxima}
              className="flex-1 btn-brutal bg-foreground text-background text-lg py-6 font-black"
            >
              PRÓXIMA →
            </Button>
          ) : (
            <Button
              onClick={onProxima}
              className="flex-1 btn-brutal bg-foreground text-background text-lg py-6 font-black"
            >
              FINALIZAR
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
