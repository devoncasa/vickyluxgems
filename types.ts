
export interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  targetUsers: string;
  usp: string;
  market: string;
  price: number;
  isQuote: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}