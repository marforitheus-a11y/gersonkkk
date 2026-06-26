import { useState, useEffect } from 'react';
import { Questao, Filtros } from '@/types/quiz';

export function useQuestoes() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<Filtros>({
    disciplina: [],
    assunto: [],
    banca: [],
    cargo: [],
    nivel: [],
    ano: [],
  });

  // Carregar questões do JSON
  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/questoes.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar questões');
        }
        const data = await response.json();
        setQuestoes(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setQuestoes([]);
      } finally {
        setLoading(false);
      }
    };

    carregarQuestoes();
  }, []);

  // Obter valores únicos para filtros
  const obterOpcoesFiltro = () => {
    const opcoes = {
      disciplinas: Array.from(new Set(questoes.map(q => q.disciplina))).sort(),
      assuntos: Array.from(new Set(questoes.map(q => q.assunto))).sort(),
      bancas: Array.from(new Set(questoes.map(q => q.banca))).sort(),
      cargos: Array.from(new Set(questoes.map(q => q.cargo))).sort(),
      niveis: Array.from(new Set(questoes.map(q => q.nivel))).sort(),
      anos: Array.from(new Set(questoes.map(q => q.ano))).sort((a, b) => b.localeCompare(a)),
    };
    return opcoes;
  };

  // Filtrar questões
  const questoesFiltradas = questoes.filter(questao => {
    if (filtros.disciplina.length > 0 && !filtros.disciplina.includes(questao.disciplina)) {
      return false;
    }
    if (filtros.assunto.length > 0 && !filtros.assunto.includes(questao.assunto)) {
      return false;
    }
    if (filtros.banca.length > 0 && !filtros.banca.includes(questao.banca)) {
      return false;
    }
    if (filtros.cargo.length > 0 && !filtros.cargo.includes(questao.cargo)) {
      return false;
    }
    if (filtros.nivel.length > 0 && !filtros.nivel.includes(questao.nivel)) {
      return false;
    }
    if (filtros.ano.length > 0 && !filtros.ano.includes(questao.ano)) {
      return false;
    }
    return true;
  });

  // Embaralhar questões
  const embaralharQuestoes = (questoes: Questao[]): Questao[] => {
    const shuffled = [...questoes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Selecionar questões aleatórias
  const selecionarQuestoes = (quantidade: number): Questao[] => {
    if (quantidade >= questoesFiltradas.length) {
      return embaralharQuestoes(questoesFiltradas);
    }

    const shuffled = embaralharQuestoes(questoesFiltradas);
    return shuffled.slice(0, quantidade);
  };

  // Atualizar filtro
  const atualizarFiltro = (tipo: keyof Filtros, valores: string[]) => {
    setFiltros(prev => ({
      ...prev,
      [tipo]: valores,
    }));
  };

  // Limpar filtros
  const limparFiltros = () => {
    setFiltros({
      disciplina: [],
      assunto: [],
      banca: [],
      cargo: [],
      nivel: [],
      ano: [],
    });
  };

  return {
    questoes,
    questoesFiltradas,
    loading,
    error,
    filtros,
    obterOpcoesFiltro,
    selecionarQuestoes,
    atualizarFiltro,
    limparFiltros,
  };
}
