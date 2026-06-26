# Quiz para Concursos - Design & Brand Strategy

## Referência de Inspiração
Inspirado na experiência do QConcursos, mas com identidade visual própria e moderna. Foco em clareza, foco e performance para estudantes de concursos públicos.

---

## Três Abordagens de Design

### 1. **Minimalista Corporativo** (Probability: 0.08)
Aesthetic limpo, tons de azul profissional, tipografia sans-serif geométrica, muitos espaços em branco. Foco em legibilidade e eficiência. Parece "banco de dados educacional".

### 2. **Dinâmico Energético** (Probability: 0.07)
Cores vibrantes (gradientes azul→roxo), tipografia moderna com contraste, cartões com elevação sutil, micro-interações snappy. Sente-se como "plataforma de aprendizado contemporânea".

### 3. **Premium Elegante** ✅ **ESCOLHIDO**
Tons sofisticados (azul profundo, branco, cinza quente), tipografia refinada (serif + sans-serif), cartões com sombras suaves e bordas arredondadas, animações fluidas. Transmite "confiança e excelência".

---

## Design Philosophy Escolhido: Premium Elegante

### Design Movement
**Modern Minimalism com Influências de Luxury Design** — inspirado em plataformas educacionais premium como MasterClass e Skillshare, mas adaptado para o contexto de concursos públicos brasileiros.

### Core Principles
1. **Clareza Hierárquica**: Cada elemento tem propósito claro; nada é decorativo por ser decorativo
2. **Espaço Respirável**: Whitespace generoso cria sensação de luxo e foco
3. **Transições Fluidas**: Animações suaves (200-300ms) reforçam a sensação de qualidade
4. **Contraste Inteligente**: Tipografia e cores criam hierarquia visual sem gritar

### Color Philosophy
- **Primária**: `oklch(0.35 0.12 250)` — Azul profundo, confiança e foco
- **Secundária**: `oklch(0.95 0.01 250)` — Branco quente, legibilidade
- **Accent**: `oklch(0.55 0.18 120)` — Verde suave, acertos e feedback positivo
- **Destructive**: `oklch(0.60 0.20 15)` — Vermelho quente, erros
- **Neutro**: `oklch(0.50 0.02 250)` — Cinza azulado, metadados

**Intenção Emocional**: Transmitir profissionalismo, confiança e suporte ao estudante. Cores quentes evitam frieza corporativa.

### Layout Paradigm
- **Tela Inicial**: Card central com sombra elegante, cercado por espaço em branco. Filtros em grid responsivo abaixo.
- **Tela de Quiz**: Sidebar esquerda com progresso visual (barra + grid de questões), conteúdo principal à direita com questão em destaque.
- **Tela de Resultados**: Composição simétrica com pontuação em grande, gráficos minimalistas, botões de ação em grid.

### Signature Elements
1. **Cartões com Elevação**: Sombra suave `0 4px 12px rgba(0,0,0,0.08)`, bordas `0.65rem`, sem bordas visíveis
2. **Barra de Progresso Animada**: Transição suave, cor muda com status (azul → verde → vermelho)
3. **Tipografia em Dois Níveis**: Display (serif bold para títulos) + Body (sans-serif regular para conteúdo)

### Interaction Philosophy
- **Hover**: Elevação sutil (sombra aumenta), cor primária ativa
- **Click**: Escala 0.98 com transição 120ms ease-out
- **Feedback**: Toast discreto no canto, animação slide-in suave
- **Navegação**: Transições entre telas com fade suave (150ms)

### Animation
- **Entrance**: Fade + slide-up 200ms ease-out (stagger 30ms para listas)
- **Hover**: Elevação 150ms ease-out, cor 100ms ease-out
- **Click**: Scale 0.97 → 1.0 em 120ms ease-out
- **Progresso**: Barra preenche com animação linear 300ms
- **Transições de Tela**: Fade 150ms ease-in-out

### Typography System
- **Display**: Serif (Georgia ou Merriweather) 32-48px, bold, para títulos principais
- **Heading**: Sans-serif (Poppins ou Outfit) 20-28px, 600, para seções
- **Body**: Sans-serif (Inter) 14-16px, 400, para conteúdo
- **Label**: Sans-serif 12px, 500, para metadados
- **Linha de Base**: 1.6 para body, 1.3 para headings

### Brand Essence
**Posicionamento**: Plataforma de simulados premium para concurseiros que buscam excelência, com interface que transmite confiança e suporte.

**Personalidade**: Profissional, Confiável, Motivador

### Brand Voice
- **Headlines**: "Domine cada disciplina", "Simulado inteligente para concursos", "Seu caminho para aprovação"
- **CTAs**: "Iniciar Simulado", "Próxima Questão", "Ver Desempenho"
- **Microcopy**: "Você acertou! Continue assim.", "Errou dessa vez. Veja o comentário."
- **Tom**: Formal mas acessível, motivador sem ser piegas

### Wordmark & Logo
**Conceito**: Ícone de um "check" estilizado dentro de um círculo, com tipografia Poppins Bold ao lado. Cores: azul profundo + verde accent.

**Uso**: 32px no header, 64px em telas de loading/splash

### Signature Brand Color
**Azul Profundo** `oklch(0.35 0.12 250)` — Imediatamente reconhecível como "Quiz para Concursos"

---

## Style Decisions (Aplicadas Durante Desenvolvimento)

### Fontes Google
- Display: Merriweather (serif, 400/700)
- Body: Poppins (sans-serif, 400/500/600)

### Spacing System
- xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px | 2xl: 48px

### Shadows
- sm: `0 1px 2px rgba(0,0,0,0.05)`
- md: `0 4px 12px rgba(0,0,0,0.08)`
- lg: `0 12px 24px rgba(0,0,0,0.12)`

### Border Radius
- sm: 4px | md: 8px | lg: 12px | xl: 16px (padrão: 10px)

### Transitions
- Quick: 100ms | Normal: 200ms | Slow: 300ms
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` para ease-out

---

## Componentes Principais

1. **Header**: Logo, modo escuro/claro, navegação
2. **Card Central**: Título, quantidade de questões, filtros, botão iniciar
3. **Quiz Container**: Sidebar progresso + Main conteúdo
4. **Question Card**: Enunciado + Alternativas
5. **Results Screen**: Pontuação + Gráficos + Botões ação
6. **Statistics Dashboard**: Histórico + Gráficos de evolução
7. **Progress Sidebar**: Grid de questões + Indicadores status
