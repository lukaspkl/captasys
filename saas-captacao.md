# Plano de Projeto: SaaS de Prospecção Inteligente (Uso Interno)

Este documento descreve o plano de desenvolvimento passo a passo para o SaaS de prospecção, focando em uma arquitetura de baixo custo e alta eficiência (Extensão do Chrome + Next.js + Supabase).

## Visão Geral

- **Objetivo**: Ferramenta de CRM e varredura de leads (nicho/região) no Google Maps.
- **Usuário**: Uso pessoal ("single-player").
- **Stack**: Next.js (Dashboard frontend), Supabase (Bando de Dados/Auth), Extensão Chrome (Motor de Varredura e Scraping).

---

## Fases de Implementação

### ⏳ Fase 1: Fundação do CRM (Dashboard & Banco de Dados)

**Objetivo**: Criar a interface principal de gestão e configurar as tabelas do banco de dados.

- [ ] **Configuração do Supabase**:
  - Criar projeto e configurar autenticação.
  - Modelar tabelas: `campanhas`, `leads`, `mensagens`.
- [ ] **Setup do Next.js**:
  - Iniciar projeto (React + Tailwind CSS).
  - Configurar Shadcn/UI (ou biblioteca semelhante) para componentes com design moderno.
- [ ] **Telas Iniciais**:
  - Nova Campanha (Modal de seleção de Nicho, Estado, Cidade).
  - Tabela de Leads (CRM) com filtros por temperatura, nicho e status.
  - Tela de Detalhes do Lead (com Score circular interativo gerado por CSS/SVG).

### ⏳ Fase 2: Motor de Varredura usando Google Dorks (Extensão do Navegador)

**Objetivo**: Criar o "robô" invisível que varre os dados usando o próprio IP local e os "Google Search Operators" para buscas mais assertivas, evitando banimento e custos de APIs.

- [ ] **Estrutura Base (Manifest V3)**:
  - Criação da extensão base para o Chrome.
  - Scripts de background para ouvir eventos do Next.js.
- [ ] **Injetor na Página de Busca do Google**:
  - Lógica para pesquisar no Google usando _Dorks_ (ex: `"nutricionista" "Curitiba" site:instagram.com` ou `+"mecanico" +"sao jose dos campos"`).
  - Paginação automática dos resultados do Google, extraindo o Título da empresa, o Link principal e o telefone (se visível na descrição do resultado).
- [ ] **Comunicação Web/Extensão**:
  - Quando o usuário clica em "Criar Campanha" no Painel, a aba do Next.js engatilha a extensão enviando a string de busca gerada baseada no Nicho e Local escolhidos.
  - A extensão envia os leads capturados em lotes ("batch") diretamente para a API do Next/Supabase, rodando o processo de forma silenciosa (entre 2 a 10 min por campanha).

### ⏳ Fase 3: Analista de Leads (Enriquecimento)

**Objetivo**: Automatizar a visita à página do lead e gerar o "Score".

- [ ] **Web Scraper Básico (na Extensão)**:
  - Ao encontrar um site válido, a extensão baixa o HTML rapidamente em background.
  - Busca regex para: link `wa.me/`, links do Instagram/Facebook.
  - Busca tags: Google Tag Manager (`GTM-`), Pixel do Facebook, etc.
- [ ] **Cálculo de Score / Temperatura**:
  - Algoritmo lógico (pontuação customizada).
  - Exemplo: Não tem site = Score 0. Tem site sem versão mobile = Score 30. Tem Ads = Score +20, etc.

### ⏳ Fase 4: IA Estática de Vendas (Mensagens Modulares)

**Objetivo**: Gerar textos persuasivos baseados no Score de forma estática, sem custo de API (OpenAI).

- [ ] **Sistema de Variaveis**:
  - Ferramenta para interporlar variáveis do banco com a mensagem (`[Variáveis: {{nome_empresa}}, {{score}}]`).
- [ ] **Templates Base (Copywriting)**:
  - Criar lista predefinida (ex: `Site Fraco - Upgrade Direto`, `Sem Site - Impacto Visual`).
  - Lógica no front-end para exibir a mensagem final interpolada baseada na opção do select e no lead específico.
- [ ] **Ações Expressas (Click-to-action)**:
  - Botões de "Copiar", "WhatsApp" (abre `wa.me/telefone?text=mensagem`), e "Email".
  - Atualização automática de status (`Novo` -> `Contatado`) após cliques.

### ⏳ Fase 5: Gestão de Projetos Ativos & Pós-Venda (Recorrência)

**Objetivo**: Transformar visualizações temporárias em ativos digitais permanentes e monetizáveis.

- [ ] **Integração Supabase (Persistência)**:
  - Migrar armazenamento de `localStorage` para a tabela `projects`.
  - Criar sistema de backup automático (Local + Cloud).
- [ ] **Dashboard de Sites Ativos**:
  - Nova aba para controle de status (Ativo/Suspenso).
  - Gestão financeira (Data de vencimento e pagamentos).
- [ ] **Sistema de Subdomínios & Hosting**:
  - Configurar subdomínios dinâmicos via Vercel (ex: `cliente.captasites.com.br`).
- [ ] **Entregáveis (Bundle Profissional)**:
  - Exportação de `.zip` com código limpo e SEO configurado para quem compra o projeto avulso.

---

_Plano gerado pelo agente Project Planner e atualizado com a estratégia de Recorrência._
