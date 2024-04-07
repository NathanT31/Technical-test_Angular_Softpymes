export interface Product extends ProductForm {
  id: string;
}

export interface ProductForm {
  name: string;
  brand: string;
  weight: string;
  price: string;
  description?: string;
}
