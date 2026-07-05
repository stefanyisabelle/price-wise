export interface StorePrice {
  store: string;
  price: number;
}

export interface PriceHistory {
  month: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  category: "Higiene" | "Eletrônico";
  currentPrice: number;
  averagePrice: number;
  targetPrice: number;
  stores: StorePrice[];
  history: PriceHistory[];
}
