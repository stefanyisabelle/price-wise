import { type Product } from "../models/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Desodorante Rexona Clinical",
    category: "Higiene",
    currentPrice: 17.9,
    averagePrice: 22.4,
    targetPrice: 18,
    stores: [
      { store: "Araújo", price: 18.9 },
      { store: "Drogasil", price: 19.5 },
      { store: "Lojas Rede", price: 17.9 }
    ],
    history: [
      { month: "Jan", price: 22.9 },
      { month: "Fev", price: 21.5 },
      { month: "Mar", price: 20.4 },
      { month: "Abr", price: 17.9 }
    ]
  },
  {
    id: 2,
    name: "Absorvente Always",
    category: "Higiene",
    currentPrice: 18.9,
    averagePrice: 20.8,
    targetPrice: 18,
    stores: [
      { store: "Araújo", price: 19.5 },
      { store: "Drogasil", price: 20.2 },
      { store: "Lojas Rede", price: 18.9 }
    ],
    history: [
      { month: "Jan", price: 21.5 },
      { month: "Fev", price: 20.9 },
      { month: "Mar", price: 19.8 },
      { month: "Abr", price: 18.9 }
    ]
  },
  {
    id: 3,
    name: "Kindle 11ª Geração",
    category: "Eletrônico",
    currentPrice: 499,
    averagePrice: 559,
    targetPrice: 480,
    stores: [
      { store: "Amazon", price: 499 },
      { store: "Magazine Luiza", price: 529 },
      { store: "Mercado Livre", price: 519 }
    ],
    history: [
      { month: "Jan", price: 599 },
      { month: "Fev", price: 579 },
      { month: "Mar", price: 549 },
      { month: "Abr", price: 499 }
    ]
  }
];