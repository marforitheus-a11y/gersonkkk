import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import TelaInicial from '@/components/TelaInicial';
import CardQuestao from '@/components/CardQuestao';
import BarraProgresso from '@/components/BarraProgresso';
import SidebarProgresso from '@/components/SidebarProgresso';
import TelaResultados from '@/components/TelaResultados';
import TelaEstatisticas from '@/components/TelaEstatisticas';
import { useQuestoes } from '@/hooks/useQuestoes';
import { useQuizState } from '@/hooks/useQuizState';
import { useCronometro } from '@/hooks/useCronometro';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

type Tela = 'inicial' | 'quiz' | 'resultados' | 'estatisticas';

export default function Home() {
  const [telaAtual, setTelaAtual] = useState<Tela>('inicial');

  const {
    questoes,
    questoesFiltradas,
    loading,
    filtros,
    selecionarQuestoes,
    atualizarFiltro,
    limparFiltros,
  } = useQuestoes();

  const {
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
  } = useQuizState();

  // Cronômetro
  const tempoAtual = useCronometro(telaAtual === 'quiz', tempoInicio);

  // Aplicar tema ao montar e quando mudar
  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [temaEscuro]);

  // Restaurar tela anterior se houver simulado em andamento
  useEffect(() => {
    if (simuladoAtual && telaAtual === 'inicial') {
      setTelaAtual('quiz');
    }
  }, [simuladoAtual, telaAtual]);

  const handleIniciarSimulado = (quantidade: number) => {
    const questoesSelecionadas = selecionarQuestoes(quantidade);
    iniciarSimulado(questoesSelecionadas);
    setTelaAtual('quiz');
  };

  const handleResponder = (alternativa: 'A' | 'B' | 'C' | 'D') => {
    responderQuestao(alternativa);
  };

  const handleProxima = () => {
    if (!simuladoAtual) return;

    if (questaoAtualIndex >= simuladoAtual.questoes.length - 1) {
      // Finalizar simulado
      const simuladoFinalizado = finalizarSimulado();
      if (simuladoFinalizado) {
        setTelaAtual('resultados');
      }
    } else {
      proximaQuestao();
    }
  };

  const handleRefazer = () => {
    if (!simuladoAtual) return;
    
    // Refazer o mesmo simulado
    const questoes = simuladoAtual.questoes;
    limparSimulado();
    iniciarSimulado(questoes);
    setTelaAtual('quiz');
  };

  const handleNovoSimulado = () => {
    limparSimulado();
    setTelaAtual('inicial');
  };

  const handleVoltar = () => {
    limparSimulado();
    setTelaAtual('inicial');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando questões...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Header temaEscuro={temaEscuro} onAlternarTema={alternarTema} />

      {/* Botão de Estatísticas */}
      {telaAtual !== 'estatisticas' && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={() => setTelaAtual('estatisticas')}
            size="lg"
            className="rounded-full shadow-lg btn-press"
            title="Ver estatísticas"
          >
            <BarChart3 className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Conteúdo Principal */}
      {telaAtual === 'inicial' && (
        <TelaInicial
          questoes={questoesFiltradas}
          filtros={filtros}
          onAtualizarFiltro={atualizarFiltro}
          onLimparFiltros={limparFiltros}
          onIniciarSimulado={handleIniciarSimulado}
        />
      )}

      {telaAtual === 'quiz' && simuladoAtual && (
        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <SidebarProgresso
              questoes={simuladoAtual.questoes}
              respostas={simuladoAtual.respostas}
              questaoAtualIndex={questaoAtualIndex}
              onIrParaQuestao={irParaQuestao}
            />

            {/* Conteúdo Principal */}
            <div className="lg:col-span-3 space-y-6">
              {/* Barra de Progresso */}
              <BarraProgresso
                questaoAtual={questaoAtualIndex}
                totalQuestoes={simuladoAtual.questoes.length}
                acertos={simuladoAtual.acertos}
                erros={simuladoAtual.erros}
                tempo={tempoAtual}
              />

              {/* Questão */}
              <CardQuestao
                questao={simuladoAtual.questoes[questaoAtualIndex]}
                resposta={simuladoAtual.respostas[questaoAtualIndex]}
                onResponder={handleResponder}
                onProxima={handleProxima}
                onAnterior={questaoAnterior}
                temProxima={questaoAtualIndex < simuladoAtual.questoes.length - 1}
                temAnterior={questaoAtualIndex > 0}
                questaoIndex={questaoAtualIndex}
                totalQuestoes={simuladoAtual.questoes.length}
              />
            </div>
          </div>
        </div>
      )}

      {telaAtual === 'resultados' && simuladoAtual && simuladoAtual.dataFim && (
        <TelaResultados
          simulado={simuladoAtual}
          onRefazer={handleRefazer}
          onNovoSimulado={handleNovoSimulado}
          onVoltar={handleVoltar}
        />
      )}

      {telaAtual === 'estatisticas' && (
        <TelaEstatisticas
          historico={historico}
          onVoltar={() => setTelaAtual('inicial')}
        />
      )}
    </div>
  );
}
