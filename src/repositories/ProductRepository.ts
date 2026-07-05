import { products } from "../mocks/products";
import type { Product } from "../models/Product";

export class ProductRepository {
  async getProducts(): Promise<Product[]> {
    return new Promise<typeof products>((resolve, reject) => {
      setTimeout(() => {
        const hasError = false;

        if (hasError) {
          reject("Erro ao carregar produtos");

          return;
        }

        resolve(products);
      }, 800);
    });
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find((p) => p.id === id));
      }, 500);
    });
  }
}
