export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  stock: number;
  price: number;
  imageUrl: string;
  categoryId: number;
  brandId?: number;
  available: boolean;
  costPrice: number;
}
export interface ProductData {
  name: string;
  description: string;
  shortDescription: string;
  stock: number;
  price: number;
  imageUrl: string;
  categoryId: number;
  brandId?: number;
  costPrice: number;
  available: boolean;
}
export interface ProductEdit{
  name?: string;
  description?: string;
  shortDescription?: string;
  stock?: number;
  costPrice?: number;
  price?: number;
  categoryId?: number;
  imageUrl?: string;
  brandId?: number;
}