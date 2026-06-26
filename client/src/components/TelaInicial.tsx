import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Questao, Filtros } from '@/types/quiz';

interface TelaInicialProps {
  questoes: Questao[];
  filtros: Filtros;
  onAtualizarFiltro: (tipo: keyof Filtros, valores: string[]) => void;
  onLimparFiltros: () => void;
  onIniciarSimulado: (quantidade: number) => void;
}

export default function TelaInicial({
  questoes,
  filtros,
  onAtualizarFiltro,
  onLimparFiltros,
  onIniciarSimulado,
}: TelaInicialProps) {
  const [quantidade, setQuantidade] = useState<number | 'todas'>(10);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [gersonFoto, setGersonFoto] = useState<string | null>(null);

  // Carregar foto do Gerson se existir
  const carregarFotoGerson = () => {
    const img = new Image();
    img.onload = () => setGersonFoto('/gerson.jpg');
    img.onerror = () => setGersonFoto(null);
    img.src = '/gerson.jpg';
  };

  // Carregar foto ao montar
  import.meta.hot?.on('vite:beforeUpdate', () => {
    carregarFotoGerson();
  });

  if (!gersonFoto) {
    carregarFotoGerson();
  }

  const opcoesFiltro = {
    assuntos: Array.from(new Set(questoes.map(q => q.assunto))).sort(),
    bancas: Array.from(new Set(questoes.map(q => q.banca))).sort(),
    cargos: Array.from(new Set(questoes.map(q => q.cargo))).sort(),
    niveis: Array.from(new Set(questoes.map(q => q.nivel))).sort(),
    anos: Array.from(new Set(questoes.map(q => q.ano))).sort((a, b) => b.localeCompare(a)),
  };

  const questoesFiltradas = questoes.filter(questao => {
    if (filtros.assunto.length > 0 && !filtros.assunto.includes(questao.assunto)) return false;
    if (filtros.banca.length > 0 && !filtros.banca.includes(questao.banca)) return false;
    if (filtros.cargo.length > 0 && !filtros.cargo.includes(questao.cargo)) return false;
    if (filtros.nivel.length > 0 && !filtros.nivel.includes(questao.nivel)) return false;
    if (filtros.ano.length > 0 && !filtros.ano.includes(questao.ano)) return false;
    return true;
  });

  const handleIniciar = () => {
    const qtd = quantidade === 'todas' ? questoesFiltradas.length : Math.min(quantidade, questoesFiltradas.length);
    if (qtd > 0) {
      onIniciarSimulado(qtd);
    }
  };

  const toggleFiltro = (tipo: keyof Filtros, valor: string) => {
    const novosFiltros = filtros[tipo].includes(valor)
      ? filtros[tipo].filter(v => v !== valor)
      : [...filtros[tipo], valor];
    onAtualizarFiltro(tipo, novosFiltros);
  };

  const temFiltrosAtivos = Object.values(filtros).some(arr => arr.length > 0);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Card Principal */}
        <div className="card-brutal p-12">
          <div className="mb-12">
            <div className="text-6xl md:text-7xl font-black mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {questoesFiltradas.length}
            </div>
            <p className="text-2xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              QUESTÕES DISPONÍVEIS
            </p>
          </div>

          {/* Foto do Gerson */}
          {gersonFoto && (
            <div className="mb-12 border-4 border-foreground">
              <img 
                src={gersonFoto} 
                alt="Gerson" 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Quantidade de Questões */}
          <div className="mb-12">
            <Label className="text-2xl font-bold mb-6 block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              QUANTAS QUESTÕES?
            </Label>
            <div className="flex gap-3 flex-wrap mb-6">
              {[5, 10, 20, 30].map(num => (
                <Button
                  key={num}
                  onClick={() => setQuantidade(num)}
                  className={`btn-brutal text-lg py-6 ${
                    quantidade === num
                      ? 'bg-foreground text-background'
                      : 'bg-background text-foreground'
                  }`}
                >
                  {num}
                </Button>
              ))}
              <Button
                onClick={() => setQuantidade('todas')}
                className={`btn-brutal text-lg py-6 ${
                  quantidade === 'todas'
                    ? 'bg-foreground text-background'
                    : 'bg-background text-foreground'
                }`}
              >
                TODAS
              </Button>
            </div>
            {quantidade !== 'todas' && (
              <Input
                type="number"
                min="1"
                max={questoesFiltradas.length}
                value={quantidade}
                onChange={e => setQuantidade(parseInt(e.target.value) || 1)}
                className="border-4 border-foreground text-lg p-4 font-bold"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              />
            )}
          </div>

          {/* Botão Iniciar */}
          <Button
            onClick={handleIniciar}
            disabled={questoesFiltradas.length === 0}
            className="w-full btn-brutal bg-foreground text-background text-2xl py-8 font-black"
          >
            <Play className="w-8 h-8 mr-3" />
            INICIAR SIMULADO
          </Button>
        </div>

        {/* Filtros */}
        <div className="space-y-6">
          <Button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="w-full btn-brutal bg-background text-foreground text-lg py-6"
          >
            {mostrarFiltros ? '✕ FECHAR FILTROS' : '⊞ FILTROS'}
            {temFiltrosAtivos && ` (${Object.values(filtros).flat().length})`}
          </Button>

          {mostrarFiltros && (
            <div className="card-brutal p-12 space-y-12">
              {/* Assunto */}
              <div>
                <Label className="text-2xl font-bold mb-6 block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  ASSUNTO
                </Label>
                <div className="flex flex-wrap gap-3">
                  {opcoesFiltro.assuntos.map(assunto => (
                    <Button
                      key={assunto}
                      onClick={() => toggleFiltro('assunto', assunto)}
                      className={`btn-brutal text-sm py-3 ${
                        filtros.assunto.includes(assunto)
                          ? 'bg-foreground text-background'
                          : 'bg-background text-foreground'
                      }`}
                    >
                      {assunto}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Banca */}
              <div>
                <Label className="text-2xl font-bold mb-6 block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  BANCA
                </Label>
                <div className="flex flex-wrap gap-3">
                  {opcoesFiltro.bancas.map(banca => (
                    <Button
                      key={banca}
                      onClick={() => toggleFiltro('banca', banca)}
                      className={`btn-brutal text-sm py-3 ${
                        filtros.banca.includes(banca)
                          ? 'bg-foreground text-background'
                          : 'bg-background text-foreground'
                      }`}
                    >
                      {banca}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Cargo */}
              <div>
                <Label className="text-2xl font-bold mb-6 block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  CARGO
                </Label>
                <div className="flex flex-wrap gap-3">
                  {opcoesFiltro.cargos.map(cargo => (
                    <Button
                      key={cargo}
                      onClick={() => toggleFiltro('cargo', cargo)}
                      className={`btn-brutal text-sm py-3 ${
                        filtros.cargo.includes(cargo)
                          ? 'bg-foreground text-background'
                          : 'bg-background text-foreground'
                      }`}
                    >
                      {cargo}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Nível */}
              <div>
                <Label className="text-2xl font-bold mb-6 block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  NÍVEL
                </Label>
                <div className="flex flex-wrap gap-3">
                  {opcoesFiltro.niveis.map(nivel => (
                    <Button
                      key={nivel}
                      onClick={() => toggleFiltro('nivel', nivel)}
                      className={`btn-brutal text-sm py-3 ${
                        filtros.nivel.includes(nivel)
                          ? 'bg-foreground text-background'
                          : 'bg-background text-foreground'
                      }`}
                    >
                      {nivel}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Ano */}
              <div>
                <Label className="text-2xl font-bold mb-6 block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  ANO
                </Label>
                <div className="flex flex-wrap gap-3">
                  {opcoesFiltro.anos.map(ano => (
                    <Button
                      key={ano}
                      onClick={() => toggleFiltro('ano', ano)}
                      className={`btn-brutal text-sm py-3 ${
                        filtros.ano.includes(ano)
                          ? 'bg-foreground text-background'
                          : 'bg-background text-foreground'
                      }`}
                    >
                      {ano}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Limpar Filtros */}
              {temFiltrosAtivos && (
                <Button
                  onClick={onLimparFiltros}
                  className="w-full btn-brutal bg-background text-foreground text-lg py-6"
                >
                  <X className="w-6 h-6 mr-2" />
                  LIMPAR FILTROS
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
