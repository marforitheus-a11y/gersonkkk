import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { EstatisticasSimulado } from '@/types/quiz';
import { Home } from 'lucide-react';

interface TelaEstatisticasProps {
  historico: EstatisticasSimulado[];
  onVoltar: () => void;
}

export default function TelaEstatisticas({ historico, onVoltar }: TelaEstatisticasProps) {
  if (historico.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="card-brutal p-12 text-center border-4 border-foreground">
            <h2 className="text-4xl font-black mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              SEM HISTÓRICO
            </h2>
            <p className="text-xl mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Você ainda não fez nenhum simulado
            </p>
            <Button
              onClick={onVoltar}
              className="btn-brutal bg-foreground text-background text-lg py-6 font-black"
            >
              <Home className="w-6 h-6 mr-2" />
              VOLTAR
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Estatísticas gerais
  const totalSimulados = historico.length;
  const totalQuestoes = historico.reduce((acc, s) => acc + s.quantidadeQuestoes, 0);
  const totalAcertos = historico.reduce((acc, s) => acc + s.acertos, 0);
  const totalErros = historico.reduce((acc, s) => acc + s.erros, 0);
  const mediaAproveitamento = Math.round(historico.reduce((acc, s) => acc + s.percentual, 0) / totalSimulados);

  // Dados para gráfico de evolução
  const dadosEvolucao = historico.map((s, i) => ({
    simulado: `#${i + 1}`,
    percentual: s.percentual,
    acertos: s.acertos,
  }));

  // Dados para gráfico de acertos vs erros
  const dadosAcertosErros = historico.map((s, i) => ({
    simulado: `#${i + 1}`,
    acertos: s.acertos,
    erros: s.erros,
  }));

  // Desempenho por disciplina
  const desempenhoDisciplina = Object.entries(
    historico.reduce((acc, simulado) => {
      Object.entries(simulado.disciplinas).forEach(([disciplina, dados]) => {
        if (!acc[disciplina]) {
          acc[disciplina] = { acertos: 0, total: 0 };
        }
        acc[disciplina].acertos += dados.acertos;
        acc[disciplina].total += dados.acertos + dados.erros;
      });
      return acc;
    }, {} as Record<string, { acertos: number; total: number }>)
  ).map(([disciplina, dados]) => ({
    name: disciplina,
    value: Math.round((dados.acertos / dados.total) * 100),
    acertos: dados.acertos,
    total: dados.total,
  }));

  const COLORS = ['#000000', '#333333', '#666666', '#999999', '#cccccc'];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="card-brutal p-12 border-4 border-foreground">
          <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ESTATÍSTICAS
          </h1>
          <p className="text-xl" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Acompanhe seu progresso e evolução
          </p>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="card-brutal p-8 text-center border-4 border-foreground">
            <div className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {totalSimulados}
            </div>
            <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              SIMULADOS
            </div>
          </div>
          <div className="card-brutal p-8 text-center border-4 border-foreground">
            <div className="text-4xl font-black text-green-600" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {totalAcertos}
            </div>
            <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              ACERTOS
            </div>
          </div>
          <div className="card-brutal p-8 text-center border-4 border-foreground">
            <div className="text-4xl font-black text-red-600" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {totalErros}
            </div>
            <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              ERROS
            </div>
          </div>
          <div className="card-brutal p-8 text-center border-4 border-foreground">
            <div className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {totalQuestoes}
            </div>
            <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              QUESTÕES
            </div>
          </div>
          <div className="card-brutal p-8 text-center border-4 border-foreground bg-foreground text-background">
            <div className="text-4xl font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {mediaAproveitamento}%
            </div>
            <div className="text-sm font-bold mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              MÉDIA
            </div>
          </div>
        </div>

        {/* Gráfico de Evolução */}
        <div className="card-brutal p-8 border-4 border-foreground">
          <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            EVOLUÇÃO
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosEvolucao}>
              <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
              <XAxis dataKey="simulado" stroke="#000000" />
              <YAxis stroke="#000000" />
              <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', border: '2px solid #000000' }} />
              <Line type="monotone" dataKey="percentual" stroke="#000000" strokeWidth={3} dot={{ fill: '#000000', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Acertos vs Erros */}
        <div className="card-brutal p-8 border-4 border-foreground">
          <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ACERTOS vs ERROS
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosAcertosErros}>
              <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
              <XAxis dataKey="simulado" stroke="#000000" />
              <YAxis stroke="#000000" />
              <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', border: '2px solid #000000' }} />
              <Legend />
              <Bar dataKey="acertos" fill="#22c55e" stroke="#000000" strokeWidth={2} />
              <Bar dataKey="erros" fill="#ef4444" stroke="#000000" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Desempenho por Disciplina */}
        {desempenhoDisciplina.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico Pizza */}
            <div className="card-brutal p-8 border-4 border-foreground">
              <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                DESEMPENHO POR DISCIPLINA
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={desempenhoDisciplina}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#000000"
                    dataKey="value"
                  >
                    {desempenhoDisciplina.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tabela */}
            <div className="card-brutal p-8 border-4 border-foreground">
              <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                DETALHES
              </h3>
              <div className="space-y-4 overflow-y-auto max-h-80">
                {desempenhoDisciplina.map((d, i) => (
                  <div key={i} className="border-b-2 border-foreground pb-4">
                    <div className="font-black mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {d.name}
                    </div>
                    <div className="text-sm mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {d.acertos} / {d.total} acertos
                    </div>
                    <div className="w-full h-4 border-2 border-foreground bg-background">
                      <div
                        className="h-full bg-foreground"
                        style={{ width: `${d.value}%` }}
                      />
                    </div>
                    <div className="text-lg font-black mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {d.value}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Histórico */}
        <div className="card-brutal p-8 border-4 border-foreground">
          <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            HISTÓRICO
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-4 border-foreground">
                  <th className="text-left p-4 font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    #
                  </th>
                  <th className="text-left p-4 font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    QUESTÕES
                  </th>
                  <th className="text-left p-4 font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    ACERTOS
                  </th>
                  <th className="text-left p-4 font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    ERROS
                  </th>
                  <th className="text-left p-4 font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    %
                  </th>
                  <th className="text-left p-4 font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    TEMPO
                  </th>
                </tr>
              </thead>
              <tbody>
                {historico.map((s, i) => {
                  const tempo = s.tempoTotal || 0;
                  const horas = Math.floor(tempo / 3600);
                  const minutos = Math.floor((tempo % 3600) / 60);
                  const segs = tempo % 60;
                  const tempoStr = horas > 0 ? `${horas}h ${minutos}m` : `${minutos}m ${segs}s`;

                  return (
                    <tr key={i} className="border-b-2 border-foreground">
                      <td className="p-4 font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        #{i + 1}
                      </td>
                      <td className="p-4 font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {s.quantidadeQuestoes}
                      </td>
                      <td className="p-4 font-bold text-green-600" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {s.acertos}
                      </td>
                      <td className="p-4 font-bold text-red-600" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {s.erros}
                      </td>
                      <td className="p-4 font-black" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {s.percentual}%
                      </td>
                      <td className="p-4 font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {tempoStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botão Voltar */}
        <Button
          onClick={onVoltar}
          className="w-full btn-brutal bg-foreground text-background text-lg py-8 font-black"
        >
          <Home className="w-6 h-6 mr-2" />
          VOLTAR AO INÍCIO
        </Button>
      </div>
    </div>
  );
}
