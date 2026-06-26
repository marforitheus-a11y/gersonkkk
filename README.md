# Quiz para Concursos

Aplicação web moderna e elegante para simulados de concursos públicos, desenvolvida com React, Vite, TailwindCSS e Lucide Icons.

## 🎯 Características

### Tela Inicial
- **Card central** com título, quantidade de questões e disciplinas disponíveis
- **Seletor de quantidade** de questões (5, 10, 20, 30 ou todas)
- **Sistema de filtros avançados** por disciplina, assunto, banca, cargo, nível e ano
- **Design elegante** com tipografia refinada (Merriweather + Poppins)

### Tela de Resolução
- **Barra de progresso** visual com percentual de conclusão
- **Estatísticas em tempo real**: acertos, erros, questões restantes, percentual de aproveitamento
- **Cronômetro** contínuo mostrando tempo decorrido
- **Sidebar com grid de progresso** (desktop) indicando questões respondidas, acertadas e erradas
- **Card de questão** com:
  - Metadados (disciplina, assunto, banca, ano, cargo, nível)
  - Enunciado completo
  - 4 alternativas em botões grandes
  - Feedback imediato (verde para acerto, vermelho para erro)
  - Comentário detalhado da resposta correta
- **Navegação** entre questões (anterior/próxima)
- **Responsivo** para desktop, tablet e celular

### Tela de Resultados
- **Pontuação final** em grande destaque
- **Mensagem motivacional** baseada no percentual de acertos
- **Estatísticas principais**: acertos, erros, total, tempo total
- **Desempenho por disciplina** com gráficos e percentuais
- **Botões de ação**:
  - Refazer o mesmo simulado
  - Gerar novo simulado aleatório
  - Voltar ao início

### Tela de Estatísticas
- **Resumo geral**: total de simulados, acertos, erros, média de aproveitamento
- **Gráfico de evolução** (linha) mostrando progresso ao longo dos simulados
- **Gráfico de acertos vs erros** (barras) por simulado
- **Desempenho por disciplina** com gráfico de pizza e tabela detalhada
- **Histórico completo** de simulados com data, quantidade, acertos, erros, percentual e tempo

### Recursos Avançados
- **Modo claro/escuro** com preferência salva no LocalStorage
- **Persistência no LocalStorage**:
  - Questão atual
  - Respostas do usuário
  - Tempo decorrido
  - Pontuação
  - Simulado em andamento
  - Histórico de simulados
  - Preferência de tema
- **Restauração automática** ao recarregar a página
- **Embaralhamento** de questões a cada novo simulado
- **Sem repetição de IDs** dentro do mesmo simulado
- **Animações fluidas** e transições suaves
- **Design premium** com sombras suaves, cartões arredondados e espaçamento generoso

## 🛠️ Stack Tecnológico

- **React 19** - Framework UI
- **Vite** - Build tool rápido
- **TailwindCSS 4** - Utility-first CSS
- **TypeScript** - Type safety
- **Lucide Icons** - Ícones modernos
- **Recharts** - Gráficos e visualizações
- **shadcn/ui** - Componentes reutilizáveis

## 📁 Estrutura do Projeto

```
client/
├── public/
│   └── questoes.json          # Arquivo de questões (carregado automaticamente)
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Cabeçalho com logo e tema
│   │   ├── TelaInicial.tsx    # Tela inicial com filtros
│   │   ├── CardQuestao.tsx    # Card de questão com alternativas
│   │   ├── BarraProgresso.tsx # Barra de progresso e estatísticas
│   │   ├── SidebarProgresso.tsx # Grid de progresso das questões
│   │   ├── TelaResultados.tsx # Tela de resultados finais
│   │   └── TelaEstatisticas.tsx # Tela de estatísticas e gráficos
│   ├── hooks/
│   │   ├── useQuestoes.ts     # Hook para carregar e filtrar questões
│   │   ├── useQuizState.ts    # Hook para gerenciar estado do quiz
│   │   └── useCronometro.ts   # Hook para cronômetro
│   ├── types/
│   │   └── quiz.ts            # Tipos TypeScript
│   ├── pages/
│   │   ├── Home.tsx           # Página principal
│   │   └── NotFound.tsx       # Página 404
│   ├── App.tsx                # Componente raiz
│   ├── main.tsx               # Entry point
│   └── index.css              # Estilos globais
└── index.html                 # HTML template
```

## 📊 Formato do JSON de Questões

```json
[
  {
    "id": "900601",
    "disciplina": "Português",
    "assunto": "Interpretação de Texto",
    "banca": "CESPE",
    "instituicao": "TJ-DF",
    "ano": "2024",
    "cargo": "Analista Judiciário",
    "nivel": "Superior",
    "enunciado": "...",
    "alternativas": {
      "A": "...",
      "B": "...",
      "C": "...",
      "D": "..."
    },
    "resposta_correta": "B",
    "comentario": "..."
  }
]
```

## 🚀 Como Usar

### Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev

# Verificar tipos TypeScript
pnpm run check

# Build para produção
pnpm run build
```

### Adicionar Novas Questões

1. Edite o arquivo `client/public/questoes.json`
2. Adicione novos objetos de questão seguindo o formato acima
3. As questões serão carregadas automaticamente na aplicação

### Customizar Temas

Edite `client/src/index.css` para alterar as cores:

```css
:root {
  --primary: oklch(0.35 0.12 250);        /* Azul profundo */
  --accent: oklch(0.55 0.18 120);         /* Verde suave */
  --destructive: oklch(0.60 0.20 15);     /* Vermelho quente */
  /* ... outras cores ... */
}
```

## 🎨 Design Philosophy

A aplicação segue um design **Premium Elegante** com:

- **Tipografia refinada**: Merriweather (serif) para títulos, Poppins (sans-serif) para corpo
- **Paleta sofisticada**: Azul profundo, branco quente, verde suave
- **Espaçamento generoso**: Whitespace como elemento ativo de design
- **Animações fluidas**: Transições suaves (200-300ms) com easing customizado
- **Sombras suaves**: Elevação visual sem agressividade
- **Cartões arredondados**: Bordas de 10px para suavidade

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Desktop**: Layout com sidebar de progresso
- **Tablet**: Grid adaptativo com sidebar colapsável
- **Celular**: Layout em coluna única, otimizado para toque

## 🔒 Privacidade

Todos os dados são armazenados **localmente** no navegador do usuário usando LocalStorage:
- Nenhuma informação é enviada a servidores externos
- Histórico de simulados fica apenas no dispositivo
- Preferências de tema são salvas localmente

## 🐛 Troubleshooting

### Questões não aparecem
- Verifique se `questoes.json` está em `client/public/`
- Certifique-se de que o JSON está válido (sem erros de sintaxe)
- Abra o console do navegador (F12) para ver mensagens de erro

### Dados não persistem
- Verifique se o LocalStorage está habilitado no navegador
- Limpe o cache e tente novamente
- Verifique se há espaço disponível no LocalStorage

### Tema não muda
- Recarregue a página após clicar no botão de tema
- Verifique se JavaScript está habilitado

## 📝 Licença

MIT

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ para estudantes de concursos públicos.

Para adicionar novas funcionalidades ou reportar bugs, consulte a documentação do projeto.
