import { useState, useEffect, useCallback } from 'react';
import { Simulado, RespostaUsuario, EstatisticasSimulado, Questao } from '@/types/quiz';

const STORAGE_KEY_SIMULADO = 'quiz_simulado_atual';
const STORAGE_KEY_HISTORICO = 'quiz_historico';
const STORAGE_KEY_TEMA = 'quiz_tema_escuro';

export function useQuizState() {
  const [simuladoAtual, setSimuladoAtual] = useState<Simulado | null>(null);
  const [questaoAtualIndex, setQuestaoAtualIndex] = useState(0);
  const [tempoInicio, setTempoInicio] = useState<number>(0);
  const [historico, setHistorico] = useState<EstatisticasSimulado[]>([]);
  const [temaEscuro, setTemaEscuro] = useState(false);

  // Carregar estado do localStorage ao montar
  useEffect(() => {
    const simuladoSalvo = localStorage.getItem(STORAGE_KEY_SIMULADO);
    const historicoSalvo = localStorage.getItem(STORAGE_KEY_HISTORICO);
    const temaSalvo = localStorage.getItem(STORAGE_KEY_TEMA);

    if (simuladoSalvo) {
      try {
        const simulado = JSON.parse(simuladoSalvo);
        setSimuladoAtual(simulado);
        setQuestaoAtualIndex(0);
        setTempoInicio(Date.now());
      } catch (e) {
        console.error('Erro ao carregar simulado:', e);
      }
    }

    if (historicoSalvo) {
      try {
        setHistorico(JSON.parse(historicoSalvo));
      } catch (e) {
        console.error('Erro ao carregar histórico:', e);
      }
    }

    if (temaSalvo) {
      setTemaEscuro(JSON.parse(temaSalvo));
    }
  }, []);

  // Salvar simulado no localStorage
  const salvarSimulado = useCallback((simulado: Simulado) => {
    localStorage.setItem(STORAGE_KEY_SIMULADO, JSON.stringify(simulado));
    setSimuladoAtual(simulado);
  }, []);

  // Iniciar novo simulado
  const iniciarSimulado = useCallback((questoes: Questao[]) => {
    const novoSimulado: Simulado = {
      id: `simulado_${Date.now()}`,
      questoes,
      respostas: questoes.map(q => ({
        questaoId: q.id,
        resposta: null,
        tempo: 0,
      })),
      dataInicio: Date.now(),
      acertos: 0,
      erros: 0,
      percentual: 0,
    };
    salvarSimulado(novoSimulado);
    setQuestaoAtualIndex(0);
    setTempoInicio(Date.now());
  }, [salvarSimulado]);

  // Responder questão
  const responderQuestao = useCallback((resposta: 'A' | 'B' | 'C' | 'D') => {
    if (!simuladoAtual) return;

    const novoSimulado = { ...simuladoAtual };
    const respostaIndex = questaoAtualIndex;
    const questaoAtual = novoSimulado.questoes[respostaIndex];

    novoSimulado.respostas[respostaIndex] = {
      questaoId: questaoAtual.id,
      resposta,
      tempo: Math.floor((Date.now() - tempoInicio) / 1000),
    };

    // Recalcular acertos/erros
    let acertos = 0;
    let erros = 0;
    novoSimulado.respostas.forEach((r, idx) => {
      if (r.resposta) {
        if (r.resposta === novoSimulado.questoes[idx].resposta_correta) {
          acertos++;
        } else {
          erros++;
        }
      }
    });

    novoSimulado.acertos = acertos;
    novoSimulado.erros = erros;
    novoSimulado.percentual = Math.round((acertos / novoSimulado.questoes.length) * 100);

    salvarSimulado(novoSimulado);
  }, [simuladoAtual, questaoAtualIndex, tempoInicio, salvarSimulado]);

  // Navegar para próxima questão
  const proximaQuestao = useCallback(() => {
    if (simuladoAtual && questaoAtualIndex < simuladoAtual.questoes.length - 1) {
      setQuestaoAtualIndex(questaoAtualIndex + 1);
    }
  }, [simuladoAtual, questaoAtualIndex]);

  // Navegar para questão anterior
  const questaoAnterior = useCallback(() => {
    if (questaoAtualIndex > 0) {
      setQuestaoAtualIndex(questaoAtualIndex - 1);
    }
  }, [questaoAtualIndex]);

  // Pular para questão específica
  const irParaQuestao = useCallback((index: number) => {
    if (simuladoAtual && index >= 0 && index < simuladoAtual.questoes.length) {
      setQuestaoAtualIndex(index);
    }
  }, [simuladoAtual]);

  // Finalizar simulado
  const finalizarSimulado = useCallback(() => {
    if (!simuladoAtual) return;

    const simuladoFinalizado = {
      ...simuladoAtual,
      dataFim: Date.now(),
      tempoTotal: Math.floor((Date.now() - simuladoAtual.dataInicio) / 1000),
    };

    // Adicionar ao histórico
    const novoHistorico = [...historico];
    const estatisticas: EstatisticasSimulado = {
      id: simuladoFinalizado.id,
      dataSimulado: simuladoFinalizado.dataInicio,
      quantidadeQuestoes: simuladoFinalizado.questoes.length,
      acertos: simuladoFinalizado.acertos,
      erros: simuladoFinalizado.erros,
      percentual: simuladoFinalizado.percentual,
      tempoTotal: simuladoFinalizado.tempoTotal || 0,
      disciplinas: {},
    };

    // Calcular estatísticas por disciplina
    simuladoFinalizado.questoes.forEach((questao, idx) => {
      const resposta = simuladoFinalizado.respostas[idx];
      if (!estatisticas.disciplinas[questao.disciplina]) {
        estatisticas.disciplinas[questao.disciplina] = {
          acertos: 0,
          erros: 0,
          percentual: 0,
        };
      }
      if (resposta.resposta === questao.resposta_correta) {
        estatisticas.disciplinas[questao.disciplina].acertos++;
      } else if (resposta.resposta !== null) {
        estatisticas.disciplinas[questao.disciplina].erros++;
      }
    });

    // Calcular percentual por disciplina
    Object.keys(estatisticas.disciplinas).forEach(disciplina => {
      const total = estatisticas.disciplinas[disciplina].acertos + estatisticas.disciplinas[disciplina].erros;
      if (total > 0) {
        estatisticas.disciplinas[disciplina].percentual = Math.round(
          (estatisticas.disciplinas[disciplina].acertos / total) * 100
        );
      }
    });

    novoHistorico.push(estatisticas);
    localStorage.setItem(STORAGE_KEY_HISTORICO, JSON.stringify(novoHistorico));
    setHistorico(novoHistorico);

    // Limpar simulado atual
    localStorage.removeItem(STORAGE_KEY_SIMULADO);
    setSimuladoAtual(null);
    setQuestaoAtualIndex(0);

    return simuladoFinalizado;
  }, [simuladoAtual, historico]);

  // Limpar simulado
  const limparSimulado = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_SIMULADO);
    setSimuladoAtual(null);
    setQuestaoAtualIndex(0);
  }, []);

  // Alternar tema
  const alternarTema = useCallback(() => {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);
    localStorage.setItem(STORAGE_KEY_TEMA, JSON.stringify(novoTema));
    
    // Aplicar tema ao documento
    if (novoTema) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [temaEscuro]);

  return {
    simuladoAtual,
    questaoAtualIndex,
    tempoInicio,
    historico,
    temaEscuro,
    iniciarSimulado,
    responderQuestao,
    proximaQuestao,
    questaoAnterior,
    irParaQuestao,
    finalizarSimulado,
    limparSimulado,
    alternarTema,
    salvarSimulado,
  };
}
