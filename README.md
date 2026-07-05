# PriceWise

PriceWise é um MVP desenvolvido com React, Vite, TypeScript e Material UI para auxiliar usuários no monitoramento de preços de produtos. A aplicação permite comparar valores entre diferentes lojas e consultar um histórico simplificado de preços para apoiar a decisão de compra.

## Funcionalidades

- Dashboard com produtos monitorados
- Visualização dos detalhes de um produto
- Comparação de preços entre lojas
- Histórico de preços por período
- Identificação de boas oportunidades de compra
- Página de monitoramento (MVP)
- Página 404 para rotas inexistentes

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Material UI
- React Router

## Estrutura do projeto

```text
src/
├── components/
├── helpers/
├── mocks/
├── models/
├── pages/
├── repositories/
├── router/
└── theme/
```

## Como executar o projeto

1. Clone o repositório.
2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto:

```bash
npm run dev
```

4. Abra o navegador no endereço informado pelo Vite (geralmente `http://localhost:5173`).

## Arquitetura

O projeto foi desenvolvido seguindo princípios de componentização e separação de responsabilidades:

- Componentes reutilizáveis
- Repository com dados simulados (mock)
- Navegação utilizando React Router
- Responsividade com Material UI
- Organização por páginas, componentes e modelos

## Objetivo

Este projeto foi desenvolvido como MVP (Minimum Viable Product) para validar a ideia de um organizador inteligente de compras, permitindo acompanhar preços de produtos em diferentes lojas e identificar oportunidades de economia.
