export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coastal' | 'grill' | 'mains' | 'desserts';
  isVeg: boolean;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  relativeTime: string;
  comment: string;
  tags: string[];
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: 'garden' | 'gold_room' | 'lounge' | 'any';
  specialRequests?: string;
}
