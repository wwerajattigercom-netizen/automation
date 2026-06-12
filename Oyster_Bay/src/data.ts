import { MenuItem, Review } from './types';

export const BUSINESS_INFO = {
  name: 'Oyster Bay',
  category: 'Coastal & Multi-Cuisine Fine Dining',
  rating: 4.1,
  reviewsCount: 3698,
  phone: '099000 37368',
  address: 'Kannada Parishath Road, Vijayanagar, 2nd Stage, Near Water Tank, Mysuru, Karnataka 570017',
  city: 'Mysuru',
  landmark: 'Near Vijayanagar Water Tank',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay'
};

export const MENU_ITEMS: MenuItem[] = [
  // Coastal & Seafood
  {
    id: 'c1',
    name: 'Claypot Mangalorean Fish Curry',
    description: 'Fresh surmai simmered in an exquisite coastal coconut and roasted red chili gravy, infused with raw mango and souring star-tamarind.',
    price: 645,
    category: 'coastal',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'c2',
    name: 'Kundapur Ghee Roast Prawns',
    description: 'Plump seawater prawns sautéed in real country-ghee with hand-pounded red Byadgi dry chillies and whole spices.',
    price: 695,
    category: 'coastal',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'c3',
    name: 'Kerala Karimeen Pollichathu',
    description: 'Fresh local pearl spot fish slathered in a fiery, hot-and-sour ginger garlic dry paste, wrapped in soft banana leaf, and flame-grilled.',
    price: 595,
    category: 'coastal',
    isVeg: false
  },
  {
    id: 'c4',
    name: 'Pan-Seared Oyster Bay Medley',
    description: 'Gently pan-roasted premium fresh oysters seasoned with cold-pressed coconut oil, fresh black pepper, and curry leaf garnish.',
    price: 745,
    category: 'coastal',
    isVeg: false,
    isPopular: true
  },

  // Indian Tandoor & Grills
  {
    id: 'g1',
    name: 'Noorani Pistachio Paneer Tikka',
    description: 'Artisanal malai paneer blocks filled with a rich center of minced roasted pistachios, khoya, and raisins, clay-charred to a golden blister.',
    price: 445,
    category: 'grill',
    isVeg: true
  },
  {
    id: 'g2',
    name: 'Spiced Malabar Lamb Chops',
    description: 'Vandiperiyar cardamom and black pepper rubbed baby lamb ribs, grilled slow with curry leaf oil.',
    price: 795,
    category: 'grill',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'g3',
    name: 'Saffron Zaffrani Chicken Malai Kabab',
    description: 'Succulent chicken breast chunks marinated in premium saffron strands, cream cheese, and green cardamom, glazed over charcoals.',
    price: 525,
    category: 'grill',
    isVeg: false
  },
  {
    id: 'g4',
    name: 'Claypot Tandoori Bhatti Gobi',
    description: 'Cauliflower hand-florets steeped in sour yogurt and a traditional mustard-oil based tandoori paste, roasted crisp.',
    price: 395,
    category: 'grill',
    isVeg: true
  },

  // Main Course
  {
    id: 'm1',
    name: 'Rich Coastal Cashew Curry',
    description: 'Tender tender whole green cashews harvested from coastal orchards, simmered in an aromatic white-poppy, coconut, and brown onion curry.',
    price: 495,
    category: 'mains',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'm2',
    name: 'Kundapur Ghee Roast Jackfruit',
    description: 'Exquisite young raw jackfruit cubes tossed in deep Kundapur masalas and generous spoons of pure cow ghee.',
    price: 465,
    category: 'mains',
    isVeg: true
  },
  {
    id: 'm3',
    name: 'Signature Seafood Dum Biryani',
    description: 'Aged long-grain basmati rice and premium catch of prawns and fish sealed in a heavy degh and cooked on gentle charcoal dum.',
    price: 685,
    category: 'mains',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'm4',
    name: 'Home-style Malnad Rasguri Dal',
    description: 'Hearty local lentils cooked with hand-sliced baby garlic, mountain peppercorns, and freshly squeezed wild lime juice.',
    price: 365,
    category: 'mains',
    isVeg: true
  },

  // Desserts
  {
    id: 'd1',
    name: 'Elaneer Payasam',
    description: 'A legendary sweet cold pudding made with thick milk reductions, tender coconut pulp pearls, and cardamoms.',
    price: 295,
    category: 'desserts',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'd2',
    name: 'Flambéed Gulab Jamun with Rum',
    description: 'Warm golden milk pastries flambéed tableside with old-oak dark rum, crowned with fresh vanilla bean gelato.',
    price: 345,
    category: 'desserts',
    isVeg: true
  },
  {
    id: 'd3',
    name: 'Salted Coastal Caramel Tart',
    description: 'Crisp pastry crust filled with buttery rich home-cooked salted caramel, drizzled with premium dark cocoa ganache.',
    price: 325,
    category: 'desserts',
    isVeg: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Rohan Deshmukh',
    rating: 5,
    relativeTime: '2 weeks ago',
    comment: 'Absolutely hands down the best coastal seafood restaurant in Mysuru. The Mangalorean Fish Curry and ghee roast are outstanding. Ambiance is so cozy and makes for a fantastic family dinner.',
    tags: ['Coastal Food', 'Ambiance']
  },
  {
    id: 'r2',
    author: 'Priya N. Rao',
    rating: 4,
    relativeTime: '1 month ago',
    comment: 'Oyster Bay has been a favorite for years! Their Elaneer Payasam is magnificent. Table service is professional and quick. The location near the Vijayanagar Water Tank is very convenient.',
    tags: ['Staff', 'Coastal Food']
  },
  {
    id: 'r3',
    author: 'Vikram Gowda',
    rating: 5,
    relativeTime: '3 days ago',
    comment: 'Brilliant fine dining atmosphere. The claypot tandoori and coastal spreads are highly authentic. They have beautiful outdoor garden tables as well as private cozy sections.',
    tags: ['Ambiance', 'Seafood']
  },
  {
    id: 'r4',
    author: 'Ananya Sharma',
    rating: 4,
    relativeTime: '3 weeks ago',
    comment: 'Visited Oyster Bay during our trip to Mysuru. The seafood is of extreme premium quality! Authentic spicy flavors and very courteous staff. Love the modern aqua-themed styling.',
    tags: ['Seafood', 'Staff']
  },
  {
    id: 'r5',
    author: 'Satish Kumar',
    rating: 5,
    relativeTime: '2 months ago',
    comment: 'A true culinary landmark in Vijayanagar! The 4.1 rating is well deserved; truth be told, they deserve a 5. I highly recommend making reservations during dinner hours as it gets fully packed.',
    tags: ['Staff', 'Ambiance']
  }
];
