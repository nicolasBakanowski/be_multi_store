export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  stock: number;
  price: number;
  imageUrl: string;
  categoryId: number;
  available: boolean;
}
export interface ProductData {
  name: string;
  description: string;
  shortDescription: string;
  stock: number;
  price: number;
  imageUrl: string;
  categoryId: number;
  available: boolean;
}
export interface ProductEdit{
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
}