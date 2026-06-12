export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'breakfast' | 'meals' | 'beverages';
  isPopular?: boolean;
  spicyLevel?: 1 | 2 | 3;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    value: string;
  }[];
}
