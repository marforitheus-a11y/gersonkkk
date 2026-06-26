export interface Questao {
  id: string;
  disciplina: string;
  assunto: string;
  banca: string;
  instituicao: string;
  ano: string;
  cargo: string;
  nivel: string;
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  resposta_correta: "A" | "B" | "C" | "D";
  comentario: string;
}

export interface RespostaUsuario {
  questaoId: string;
  resposta: "A" | "B" | "C" | "D" | null;
  tempo: number; // em segundos
}

export interface Simulado {
  id: string;
  questoes: Questao[];
  respostas: RespostaUsuario[];
  dataInicio: number;
  dataFim?: number;
  tempoTotal?: number;
  acertos: number;
  erros: number;
  percentual: number;
}

export interface Filtros {
  disciplina: string[];
  assunto: string[];
  banca: string[];
  cargo: string[];
  nivel: string[];
  ano: string[];
}

export interface EstatisticasSimulado {
  id: string;
  dataSimulado: number;
  quantidadeQuestoes: number;
  acertos: number;
  erros: number;
  percentual: number;
  tempoTotal: number;
  disciplinas: {
    [key: string]: {
      acertos: number;
      erros: number;
      percentual: number;
    };
  };
}

export interface EstadoGlobal {
  simuladoAtual: Simulado | null;
  questaoAtualIndex: number;
  tempoInicio: number;
  tempoAtual: number;
  historico: EstatisticasSimulado[];
  temaEscuro: boolean;
}
