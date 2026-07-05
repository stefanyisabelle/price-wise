# PriceWise

PriceWise é um MVP desenvolvido com React, Vite, TypeScript e Material UI para monitoramento de preços. A aplicação ajuda a comparar preços entre lojas, acompanhar histórico simplificado e identificar boas oportunidades de compra.

## Principais funcionalidades

- Dashboard com produtos monitorados e filtros responsivos
- Cards com indicadores (produtos monitorados, boas ofertas, economia média)
- Página de detalhes do produto (preço atual, média, histórico e comparação por loja)
- Repositório simulado (mocks) para desenvolvimento sem backend
- Rotas com tratamento de 404 e navegação com `react-router`

## Tecnologias

- React + TypeScript
- Vite
- Material UI (MUI)
- React Router

## Estrutura do projeto (resumo)

```text
src/
├── components/       # UI reutilizável (Header, ProductCard, EmptyState, ...)
├── models/           # Tipagens (Product, PriceHistory, ...)
├── pages/            # Páginas (Dashboard, ProductDetails, Monitoring, NotFound)
├── repositories/     # Repositório com dados simulados
├── mocks/            # Dados mockados usados pelo repo
├── router/           # Definição de rotas
└── theme/            # Tema MUI
```

## Como executar

1. Instale dependências:

```bash
npm install
```

2. Rodar em modo de desenvolvimento:

```bash
npm run dev
```

3. Build de produção:

```bash
npm run build
```

4. Preview do build:

```bash
npm run preview
```
