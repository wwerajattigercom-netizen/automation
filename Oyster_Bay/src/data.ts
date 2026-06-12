/**
 * Static content and structured information for Oyster Bay landing page.
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "Starters" | "Mains" | "Coastal Specialties" | "Desserts" | "Mocktails";
  tags?: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  origin: string;
}

export const RESTAURANT_INFO = {
  name: "Oyster Bay",
  category: "Fine Dining Restaurant",
  rating: 4.1,
  reviewsCount: 3698,
  phone: "099000 37368",
  phoneDisplay: "+91 99000 37368",
  address: "Kannada Parishath Road, Vijayanagar, 2nd Stage, near Water tank, Mysuru, Karnataka 570017",
  city: "Mysuru",
  state: "Karnataka",
  pincode: "570017",
  landmark: "Near Water Tank, Vijayanagar 2nd Stage",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay",
  foundViaQuery: "restaurant in Mysuru",
  tagline: "Where coastal luxury meets historical heritage in the heart of Mysuru.",
  description: "Experience the ultimate fine dining escape in Mysuru. Known for our coastal masterworks, premium seafood selections, global continental menu, and impeccable hospitality, Oyster Bay brings together rich culinary traditions and a breathtaking ambient environment that captures the soul of exquisite gastronomy.",
  workingHours: [
    { days: "Monday - Thursday", hours: "11:30 AM - 11:30 PM" },
    { days: "Friday - Sunday", hours: "11:30 AM - Midnight" }
  ]
};

export const MENU_CATEGORIES = ["Starters", "Coastal Specialties", "Mains", "Desserts", "Mocktails"] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Classic Butter Garlic Oysters",
    description: "Plump, fresh coastal oysters gently poached in rich herb-infused clarified butter, crispy garlic flakes, and micro greens.",
    price: "₹720",
    category: "Coastal Specialties",
    tags: ["Signature", "Seafood"]
  },
  {
    id: "m2",
    name: "Tandoori Pomfret Imperial",
    description: "Whole silver pomfret marinated in royal Mysuru spices and home-churned yogurt, cooked to tender perfection in our clay oven.",
    price: "₹895",
    category: "Coastal Specialties",
    tags: ["Must Try", "Spicy"]
  },
  {
    id: "m3",
    name: "Mangalorean Ghee Roast Prawns",
    description: "Succulent tiger prawns tossed in deep, aromatic Kundapur spice paste and generous spoonfuls of local pure cow ghee.",
    price: "₹650",
    category: "Coastal Specialties",
    tags: ["Locally Sourced", "Spicy"]
  },
  {
    id: "m4",
    name: "Golden Calamari Rings",
    description: "Crispy hand-battered squid rings dusted with crushed black pepper, sea salt, and served alongside zesty lemon-herb aioli.",
    price: "₹450",
    category: "Starters",
    tags: ["Popular"]
  },
  {
    id: "m5",
    name: "Water-Tank Herb Bruschetta",
    description: "Toasted artisan sourdough rubbed with garlic cloves, layered with sun-ripened tomatoes, fresh buffalo mozzarella, and sweet basil drizzle.",
    price: "₹380",
    category: "Starters",
    tags: ["Vegetarian"]
  },
  {
    id: "m6",
    name: "Stuffed Mushroom Duxelles",
    description: "Plump white button mushrooms stuffed with creamed spinach, aged parmesan, and fine French herbs, baked golden brown.",
    price: "₹395",
    category: "Starters",
    tags: ["Vegetarian"]
  },
  {
    id: "m7",
    name: "Pan-Seared Atlantic Salmon",
    description: "Premium cold-water salmon fillet served over creamy saffron risotto, charred asparagus, and velvety lemon burré blanc sauce.",
    price: "₹1,250",
    category: "Mains",
    tags: ["Gourmet"]
  },
  {
    id: "m8",
    name: "Rosemary Roasted Lamb Chops",
    description: "Tender double-rib lamb chops crusted with fresh rosemary and garlic, served with truffle mash, glazed baby carrots, and red wine jus.",
    price: "₹1,150",
    category: "Mains",
    tags: ["Premium"]
  },
  {
    id: "m9",
    name: "Royal Mughlai Veg Korma",
    description: "Assorted fresh seasonal vegetables simmered in a rich, creamy cashew-almond paste gravy accentuating royal Indian aromatics.",
    price: "₹480",
    category: "Mains",
    tags: ["Vegetarian", "Classic"]
  },
  {
    id: "m10",
    name: "Belgian Chocolate Decadence",
    description: "A triple-layered warm chocolate fudge cake resting on bittersweet dark cocoa soil, served with high-end Madagascan vanilla gelato.",
    price: "₹390",
    category: "Desserts",
    tags: ["Sweet", "Chef's Special"]
  },
  {
    id: "m11",
    name: "Tender Coconut Elaneer Payasam",
    description: "An authentic coastal Karnataka dessert crafted with fresh tender coconut shavings, condensed cream, and hints of green cardamom.",
    price: "₹320",
    category: "Desserts",
    tags: ["Local Favorite", "Vegetarian"]
  },
  {
    id: "m12",
    name: "Oyster Bay Blue Lagoon",
    description: "A signature refreshing mocktail blending premium blue curaçao, fresh kaffir lime leaves, sparkling tonic, and crushed ice.",
    price: "₹280",
    category: "Mocktails",
    tags: ["Refreshing", "Best Seller"]
  },
  {
    id: "m13",
    name: "Mysuru Cardamom Cold Brew",
    description: "House-filtered premium Arabica cold brew sweetened with organic palm jaggery and a subtle undertone of warm local cardamoms.",
    price: "₹290",
    category: "Mocktails",
    tags: ["Signature", "Caffeine"]
  }
];

export const CLIENT_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Aditi Rao",
    rating: 5,
    date: "2 weeks ago",
    comment: "The seafood options at Oyster Bay are absolutely brilliant! The butter garlic oysters are fresh and seasoned meticulously. The ambiance has an upscale, luxurious coastal vibe. Excellent service throughout. Best fine dining in Mysuru!",
    origin: "Google Maps"
  },
  {
    id: "r2",
    author: "Rohan deshmukh",
    rating: 4,
    date: "1 month ago",
    comment: "Excellent food and a very classy environment in Vijayanagar 2nd stage. It's spacious and quiet—ideal for family dinners or a date. Ghee roast prawns are amazing. Docked one star only because booking on weekends is absolutely packed, so reserve early!",
    origin: "Google Maps"
  },
  {
    id: "r3",
    author: "Ananya Hegde",
    rating: 5,
    date: "3 days ago",
    comment: "Highly recommended if you are visiting Mysuru. Near Vijayanagar water tank, very easy to locate. Beautifully done fine-dining interior, polite staff, and incredible tandoori pomfret. The pricing is completely justified by the premium quality.",
    origin: "Google Maps"
  },
  {
    id: "r4",
    author: "Johnathan M.",
    rating: 4,
    date: "3 weeks ago",
    comment: "Truly elegant seafood diner in the historic city of Mysuru. The culinary consistency has remained fantastic over the years (almost 3700+ reviews which is mind-boggling). Friendly hosts and fresh local produce.",
    origin: "Google Maps"
  }
];

export const FAQS = [
  {
    question: "Do you offer pure vegetarian choices?",
    answer: "Yes, absolutely. While we are highly celebrated for our coastal seafood selections, Oyster Bay hosts a comprehensive menu of exquisite vegetarian appetizers, premium Indian paneer/subzi preparations, and fine continental pastas."
  },
  {
    question: "Do I need an advanced table reservation?",
    answer: "While we welcome walk-ins, we highly recommend booking a table in advance—especially for weekend dinners and national holidays—due to the very high volume of patrons visiting our Vijayanagar establishment."
  },
  {
    question: "Is valet parking available?",
    answer: "Yes, we offer complimentary secure valet parking for all our guests at our Kannada Parishath Road site. Our attendants will be delighted to park your vehicle on arrival."
  },
  {
    question: "Can we host private events, birthdays, or corporate gatherings?",
    answer: "Oyster Bay provides custom curated banquet options and private dining sections. Please contact our main desk directly at +91 99000 37368 to plan custom menus and block special zones."
  }
];
