/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Star, 
  Coffee, 
  Clock, 
  UtensilsCrossed, 
  Award, 
  CheckCircle, 
  MessageSquare, 
  ExternalLink, 
  Copy, 
  Share2, 
  Trash2, 
  Plus, 
  Minus,
  Heart,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types & Interfaces ---
interface Dish {
  id: string;
  name: string;
  kannadaName: string;
  category: "dosas" | "meals" | "beverages" | "sweets";
  price: number;
  description: string;
  badge?: string;
  ingredients: string[];
  spiceRating?: number; // 1 to 3
  isPopular?: boolean;
}

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  content: string;
  tag: string;
}

// --- Mock Data representing actual Mahesh Prasad offerings & locale ---
const DISH_DATABASE: Dish[] = [
  {
    id: "m-masala-dosa",
    name: "Classic Mysore Masala Dosa",
    kannadaName: "ಮೈಸೂರ್ ಮಸಾಲ ದೋಸೆ",
    category: "dosas",
    price: 85,
    description: "Crispy golden rice-lentil crepe smeared with our secret spiced red chili-garlic chutney, stuffed with butter-kissed potato mash, and served with deep flavorful sambar and coconut chutney.",
    badge: "Legendary",
    ingredients: ["Spicy Red Chutney", "Potato Pallaya", "Pure Ghee", "Crispy Batter"],
    spiceRating: 2,
    isPopular: true
  },
  {
    id: "m-idli-vada",
    name: "Kushboo Idli & Crispy Vada",
    kannadaName: "ಇಡ್ಲಿ ವಡೆ ಜೋಡಿ",
    category: "meals",
    price: 55,
    description: "Two pillow-soft steamed rice-lentil cakes paired with one crispy, golden-fried split black gram fritter. Fused with local spices, curry leaves, and black peppers.",
    ingredients: ["Steamed Idli", "Udupi Sambar", "Coconut Chutney", "Medu Vada"],
    spiceRating: 1,
    isPopular: true
  },
  {
    id: "m-filter-coffee",
    name: "Mysore Brass Filter Coffee",
    kannadaName: "ಫಿಲ್ಟರ್ ಕಾಫಿ",
    category: "beverages",
    price: 30,
    description: "Our signature blend of fresh dark roasted chicory coffee powder brewed in a traditional brass filter, frothed high with bubbling rich milk. Served piping hot in an authentic brass Davarah.",
    badge: "Must-Have",
    ingredients: ["Fresh Decoction", "Foamed Whole Milk", "Traditional Brass Set"],
    isPopular: true
  },
  {
    id: "m-full-meals",
    name: "Heritage South Indian Meals (Thali)",
    kannadaName: "ಸಂಪೂರ್ಣ ದಕ್ಷಿಣ ಭಾರತದ ಊಟ",
    category: "meals",
    price: 130,
    description: "A rich feast showcasing genuine Karnataka palates. Includes hot Sona Masuri rice, rich Neyyi gheel, authentic Mysuru Sambar, peppery Rasam, daily dry vegetable Palya, fresh buttermilk, papadum, and sweet payasam.",
    badge: "Grand Feast",
    ingredients: ["Rice & Ghee", "Traditional Sambar", "Daily Special Palya", "Payasam", "Buttermilk"],
    spiceRating: 2,
    isPopular: true
  },
  {
    id: "m-rava-dosa",
    name: "Onion Rava Masala Dosa",
    kannadaName: "ಈರುಳ್ಳಿ ರವೆ ಮಸಾಲ ದೋಸೆ",
    category: "dosas",
    price: 95,
    description: "Incredibly lacy, wafer-thin crepe crafted from spiced semolina and rice batter. Embedded with roasted cashew chunks, chopped green chilies, whole black peppers, and crusted with sweet diced onions.",
    ingredients: ["Crispy Semolina", "Diced Red Onions", "Black Peppercorns", "Roasted Cashews"],
    spiceRating: 1
  },
  {
    id: "m-kesari-bath",
    name: "Saffron Pineapple Kesari Bath",
    kannadaName: "ಕೇಸರಿ ಬಾತ್",
    category: "sweets",
    price: 45,
    description: "Rich, aromatic divine dessert made from roasted fine semolina, loaded with pure ghee, real saffron strands, roasted cashews, plump golden raisins, and subtle chunks of caramelized pineapples.",
    ingredients: ["Simmered Semolina", "Pure Desi Ghee", "Saffron", "Caramelized Pineapple"],
    spiceRating: 0
  }
];

const REVIEWS_DATABASE: Review[] = [
  {
    id: "r-1",
    author: "Nithin Mysuru",
    role: "Local Guide • 146 Reviews",
    rating: 5,
    date: "2 weeks ago",
    content: "If you want to taste pure, authentic Mysuru style Dosa, Mahesh Prasad is the exact correct spot! The red chutney on the Masala Dosa has that perfectly balanced hint of sweetness and heat. Service is fast despite the heavy crowd near Ballal Circle. Absolutely legendary.",
    tag: "Dosas"
  },
  {
    id: "r-2",
    author: "Sneha Ramakrishna",
    role: "Regular Guest",
    rating: 4,
    date: "1 month ago",
    content: "We visiting regularly whenever we are near the RTO office. The South Indian Thali is incredibly satisfying, very traditional and feels like a home cooked meal. Extremely hygienic, and prices are highly affordable. The filtered coffee here is unbeatable!",
    tag: "Meals"
  },
  {
    id: "r-3",
    author: "Ravi Shankar",
    role: "Food Blogger",
    rating: 5,
    date: "3 days ago",
    content: "This place sets the benchmark for vegetarian dining in Mysuru. Crispy vadas, soft idlis, and that magical aroma of cardamom from the Kesari Bath. Standard hygiene is top tier. 5 stars easily for the pure heritage they preserve.",
    tag: "Overall Quality"
  }
];

export default function App() {
  // Navigation & filtering state
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  
  // Local Plate (Catering simulator) state
  const [userPlate, setUserPlate] = useState<{ dish: Dish; count: number }[]>([]);
  
  // Review filtering state
  const [reviewSearch, setReviewSearch] = useState<string>("");
  const [likedDishes, setLikedDishes] = useState<Record<string, boolean>>({});
  
  // UI helper feedback states
  const [addressCopied, setAddressCopied] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Address for the copy feature
  const addressText = "Ballal Cir, near RTO Office, Chamarajapura, Chamarajapuram Mohalla, Lakshmipuram, Mysuru, Karnataka 570005";

  // Phone number for dialer
  const phoneNumber = "0821 233 0820";

  // Google Maps coordinate directions link
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant";

  // Plate actions
  const addToPlate = (dish: Dish) => {
    setUserPlate(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item => item.dish.id === dish.id ? { ...item, count: item.count + 1 } : item);
      }
      return [...prev, { dish, count: 1 }];
    });
  };

  const removeFromPlate = (dishId: string) => {
    setUserPlate(prev => {
      const existing = prev.find(item => item.dish.id === dishId);
      if (existing && existing.count > 1) {
        return prev.map(item => item.dish.id === dishId ? { ...item, count: item.count - 1 } : item);
      }
      return prev.filter(item => item.dish.id !== dishId);
    });
  };

  const clearPlate = () => {
    setUserPlate([]);
  };

  const toggleLike = (dishId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setLikedDishes(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(addressText);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2500);
  };

  const triggerMockShare = () => {
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 3000);
  };

  const totalPlatePrice = userPlate.reduce((acc, current) => acc + (current.dish.price * current.count), 0);
  const totalPlateItems = userPlate.reduce((acc, current) => acc + current.count, 0);

  // Filtered dishes
  const filteredDishes = activeCategory === "all" 
    ? DISH_DATABASE 
    : DISH_DATABASE.filter(dish => dish.category === activeCategory);

  // Filtered reviews
  const filteredReviews = REVIEWS_DATABASE.filter(review => {
    const matchText = review.author.toLowerCase().includes(reviewSearch.toLowerCase()) || 
                      review.content.toLowerCase().includes(reviewSearch.toLowerCase()) || 
                      review.tag.toLowerCase().includes(reviewSearch.toLowerCase());
    return matchText;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-gray-800 font-sans selection:bg-[#15462D]/10 selection:text-[#15462D]" id="main-container">
      
      {/* Top Banner (Pure Veg Badge & Notice) */}
      <div className="bg-[#15462D] text-white py-2 px-4 text-xs font-semibold tracking-wider flex justify-between items-center z-50 relative" id="top-veg-banner">
        <div className="flex items-center gap-2">
          {/* Green dot standard Symbol */}
          <div className="w-4 h-4 bg-white border border-white flex items-center justify-center rounded-sm">
            <div className="w-2.5 h-2.5 bg-green-700 rounded-full"></div>
          </div>
          <span>100% PURE VEGETARIAN HERITAGE • MYSURU</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] opacity-90">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 7:00 AM – 10:30 PM Everyday</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Near RTO Office, Mysuru</span>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-[#E6DEC9] z-40 transition-all duration-300" id="headerbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo / Monogram */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#15462D] flex items-center justify-center font-bold text-[#D97706] text-xl border-2 border-[#D97706]/30 shadow-sm">
              MP
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-serif text-[#15462D] tracking-tight leading-none">
                Mahesh Prasad
              </h1>
              <span className="text-[11px] font-semibold text-[#D97706] uppercase tracking-widest block mt-0.5">
                Veg Restaurant
              </span>
            </div>
          </div>

          {/* Quick Info & CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#15462D]/20 text-[#15462D] hover:bg-[#15462D]/5 transition-colors font-medium text-sm"
              title="Call us now"
              id="cta-header-call"
            >
              <Phone className="w-4 h-4 text-[#D97706]" />
              <span className="hidden sm:inline">{phoneNumber}</span>
            </a>
            
            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#15462D] text-white hover:bg-[#0e2f1e] transition-all font-medium text-sm shadow-sm"
              id="cta-header-maps"
            >
              <MapPin className="w-4 h-4 text-[#D97706]" />
              <span>Find Us</span>
              <ExternalLink className="w-3 h-3 text-white/70" />
            </a>
          </div>

        </div>
      </header>

      {/* Sharing notification toast */}
      <AnimatePresence>
        {showShareNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2.5 text-sm font-medium"
            id="share-toast"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Restaurant details copied for sharing!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-24">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E6DEC9]" id="hero-section">
          {/* Subtle background decoration representing warm Indian architecture/motifs */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#D97706]/10 to-[#15462D]/15 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            
            {/* Rank highlight */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D97706]/10 border border-[#D97706]/30 text-[#B45309] text-xs font-semibold mb-6 uppercase tracking-wider"
              id="hero-rank-badge"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Ranked #1 Pure Veg Spot in Mysuru Search Results</span>
            </motion.div>

            {/* Main Title heading (Refined Playfair serif font) */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-serif text-[#15462D] font-bold tracking-tight leading-tight mb-6"
              id="hero-heading"
            >
              Pure Vegetarian <br />
              <span className="text-[#D97706] italic">Heritage of Mysuru</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10"
              id="hero-text"
            >
              Welcome to <strong>Mahesh Prasad Veg Restaurant</strong>, a legendary culinary destination near Ballal Circle. Celebrating genuine South Indian flavors, golden Ghee Dosas, and freshly frothed Mysore Filter Coffee.
            </motion.p>

            {/* Quick Stats overview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10 bg-[#FAF7F0] border border-[#E6DEC9] rounded-2xl p-6 shadow-sm"
              id="quick-stats-row"
            >
              <div className="text-center p-2 border-r border-[#E6DEC9]/60 last:border-b-0 md:last:border-r-0">
                <div className="flex justify-center items-center gap-1 text-[#D97706] font-bold text-2xl sm:text-3xl">
                  <span>4.1</span>
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Google Rating</div>
              </div>
              
              <div className="text-center p-2 border-none md:border-r border-[#E6DEC9]/60">
                <div className="text-[#15462D] font-bold text-2xl sm:text-3xl">3,914</div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Verified Reviews</div>
              </div>

              <div className="text-center p-2 border-r border-[#E6DEC9]/60">
                <div className="text-[#15462D] font-bold text-2xl sm:text-3xl">7:00 AM</div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1 font-mono">Breakfast starts</div>
              </div>

              <div className="text-center p-2">
                <div className="text-[#D97706] font-bold text-2xl sm:text-3xl">100%</div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Veg Culinary</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
              id="hero-ctas"
            >
              <a 
                href="#menu-section" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#15462D] text-white hover:bg-[#0c2f1d] transition-all font-semibold shadow-md flex items-center justify-center gap-2 text-base group"
              >
                <span>Explore the Heritage Menu</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button 
                onClick={triggerMockShare}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#15462D]/20 text-[#15462D] hover:bg-[#15462D]/5 transition-all font-semibold flex items-center justify-center gap-2 bg-white/50 text-base"
                id="btn-share-hero"
              >
                <Share2 className="w-4.5 h-4.5 text-[#D97706]" />
                <span>Share Details</span>
              </button>
            </motion.div>

          </div>
        </section>

        {/* DETAILS BENTO & TRUST SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="bento-details">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Bento Block 1: Authentic Locale (6 Cols) */}
            <div className="lg:col-span-7 bg-[#FFFDF9] rounded-2xl border border-[#E6DEC9] p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute right-0 top-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-[#D97706]/5 group-hover:scale-110 transition-transform duration-500"></div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 flex items-center justify-center text-[#D97706] mb-6">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#15462D] mb-4">
                  Where to Find Us 
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We are situated at **Ballal Circle**, Mysuru’s major transit junction. Perfect and highly convenient for travellers, employees heading to nearby **RTO Office**, and families staying in **Chamarajapura**, **Lakshmipuram**, or neighboring regions of Southern Mysuru.
                </p>
                
                {/* Visual Address Container */}
                <div className="bg-[#FAF7F0] border border-[#E6DEC9]/60 p-4.5 rounded-xl mb-6 text-sm flex gap-3 items-start relative select-all">
                  <MapPin className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                  <div className="text-gray-700">
                    <span className="font-bold text-gray-900 block mb-0.5">Physical Address</span>
                    {addressText}
                  </div>
                </div>
              </div>

              {/* Interaction Buttons */}
              <div className="flex flex-wrap gap-3 mt-auto">
                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#15462D] text-white rounded-full font-medium text-sm flex items-center gap-1.5 hover:bg-[#0c2f1d] transition-all shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open G-Maps Directions</span>
                </a>
                
                <button 
                  onClick={copyAddressToClipboard}
                  className="px-5 py-2.5 bg-white border border-gray-250 text-gray-700 rounded-full font-medium text-sm flex items-center gap-1.5 hover:bg-gray-50 transition-all shadow-xs"
                  id="btn-copy-address"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                  <span>{addressCopied ? "Address Copied!" : "Copy Address"}</span>
                </button>
              </div>
            </div>

            {/* Bento Block 2: Quick Information Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-[#15462D] text-white rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
              {/* Pattern detail */}
              <div className="absolute left-0 bottom-0 -ml-10 -mb-10 w-44 h-44 rounded-full bg-white/5"></div>
              
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#D97706] mb-6">
                  Dining Details
                </h3>

                <ul className="space-y-5">
                  <li className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">Operating Timings</span>
                      <span className="text-sm opacity-90">Daily: 7:00 AM – 10:30 PM</span>
                      <span className="text-xs text-[#D97706] block mt-0.5">Breakfast, Lunch, Snacks & Dinner served hot.</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">Direct Contact</span>
                      <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="text-sm border-b border-white/30 hover:border-[#D97706] hover:text-[#D97706] transition-all font-mono font-medium block">
                        {phoneNumber}
                      </a>
                      <span className="text-xs opacity-75 mt-0.5 block">Call for catering requests, group dining, or parcel takeaways.</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <UtensilsCrossed className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">Service Formats</span>
                      <span className="text-sm opacity-90">Casual dine-in, Quick Stand-and-eat counters, and fully packed parcels (takeaways).</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs opacity-85">
                <span>City: <strong className="text-white text-sm">Mysuru, Karnataka</strong></span>
                <span className="flex items-center gap-1 text-[#D97706]">
                  <CheckCircle className="w-4 h-4 fill-current text-[#D97706] bg-white rounded-full text-white" />
                  <span>Licensed Pure Veg</span>
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* HERO SPEC/MENU SECTION */}
        <section className="bg-[#FAF2DF] py-16 border-y border-[#E6DEC9]" id="menu-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header portion */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest font-bold text-[#D97706]">Aromatic & Authentic</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#15462D] font-bold mt-2 mb-3">
                Heritage Specialties Menu
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Taste the centuries-old recipes originating from classical royal royal Mysuru kitchens. Click any item on our menu to view description, or click the <strong className="text-[#15462D] font-bold">Add to Plate (+)</strong> to price out a breakfast or feast!
              </p>

              {/* Active Category tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {[
                  { key: "all", label: "Full Menu" },
                  { key: "dosas", label: "Famous Dosas" },
                  { key: "meals", label: "Meals & Mains" },
                  { key: "beverages", label: "Beverages" },
                  { key: "sweets", label: "Heritage Sweets" }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`px-4.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeCategory === tab.key 
                        ? "bg-[#15462D] text-white shadow-xs" 
                        : "bg-white text-gray-700 hover:bg-[#FAF7F0] border border-[#E6DEC9]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Menu Grid / Plate Simulator Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Dishes List (8 Cols on Desktop) */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6" id="dishes-grid">
                {filteredDishes.map((dish) => {
                  const isDishPopular = dish.isPopular;
                  const isLiked = !!likedDishes[dish.id];
                  
                  return (
                    <motion.div
                      layout
                      key={dish.id}
                      onClick={() => setSelectedDish(dish)}
                      className="bg-white rounded-2xl border border-[#E6DEC9]/75 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer relative flex flex-col justify-between group h-full"
                    >
                      {/* Popular / Promo badges */}
                      <div className="flex justify-between items-start gap-2 mb-4">
                        {dish.badge ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-[#D97706]/10 text-[#D97706] text-[10px] font-extrabold tracking-wider uppercase">
                            {dish.badge}
                          </span>
                        ) : isDishPopular ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-[#15462D]/10 text-[#15462D] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#D97706]" />
                            <span>Popular Choice</span>
                          </span>
                        ) : (
                          <div />
                        )}

                        {/* Favorite button */}
                        <button 
                          onClick={(e) => toggleLike(dish.id, e)}
                          className="w-8 h-8 rounded-full bg-[#FAF7F0] flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          aria-label="Like specialty"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                        </button>
                      </div>

                      {/* Names & details */}
                      <div>
                        <div className="flex justify-between items-baseline gap-2 mb-1">
                          <h4 className="font-serif font-bold text-[#15462D] text-lg leading-tight group-hover:text-[#D97706] transition-colors">
                            {dish.name}
                          </h4>
                        </div>
                        <span className="text-xs text-amber-800 font-medium block mb-2 opacity-95">
                          {dish.kannadaName}
                        </span>
                        
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                          {dish.description}
                        </p>
                      </div>

                      {/* Bottom row: Price & Simulator Action */}
                      <div className="flex justify-between items-center pt-3 border-t border-[#E6DEC9]/40 mt-auto">
                        <div className="text-lg font-extrabold text-gray-900 font-mono">
                          ₹{dish.price}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToPlate(dish);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#15462D]/10 text-[#15462D] group-hover:bg-[#15462D] group-hover:text-white transition-colors duration-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          title="Add to plate simulator"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Plate</span>
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </div>

              {/* Plate / Order Calculator Sidebar (4 Cols on Desktop) */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 bg-white rounded-2xl border border-[#E6DEC9] p-6 shadow-sm" id="plate-sidebar">
                
                <div className="flex items-center justify-between border-b border-[#E6DEC9] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-[#15462D]" />
                    <h3 className="font-serif font-extrabold text-lg text-[#15462D]">
                      My Tasting Plate
                    </h3>
                  </div>
                  {totalPlateItems > 0 && (
                    <button 
                      onClick={clearPlate}
                      className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {userPlate.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 flex flex-col justify-center items-center">
                    <div className="w-12 h-12 rounded-full border border-dashed border-gray-300 flex items-center justify-center mb-3">
                      <Plus className="w-6 h-6 text-gray-300 animate-pulse" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Your plate is currently empty</p>
                    <p className="text-xs leading-normal max-w-[200px] mx-auto text-gray-400">Click &quot;Add to Plate&quot; on dishes to try out our local billing simulator!</p>
                  </div>
                ) : (
                  <div>
                    {/* Plate lists */}
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                      {userPlate.map((item) => (
                        <div key={item.dish.id} className="flex justify-between items-center text-sm">
                          <div className="max-w-[150px]">
                            <span className="font-semibold block text-gray-800 truncate">{item.dish.name}</span>
                            <span className="text-[11px] text-gray-500 font-mono">₹{item.dish.price} each</span>
                          </div>
                          
                          <div className="flex items-center gap-2.5">
                            <button 
                              onClick={() => removeFromPlate(item.dish.id)}
                              className="w-6.5 h-6.5 bg-[#FAF7F0] hover:bg-[#FAF2DF] text-gray-600 rounded-md flex items-center justify-center font-bold text-xs cursor-pointer border border-[#E6DEC9]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center font-bold font-mono text-gray-800 text-sm">
                              {item.count}
                            </span>
                            <button 
                              onClick={() => addToPlate(item.dish)}
                              className="w-6.5 h-6.5 bg-[#FAF7F0] hover:bg-[#FAF2DF] text-gray-600 rounded-md flex items-center justify-center font-bold text-xs cursor-pointer border border-[#E6DEC9]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="w-16 text-right font-bold text-gray-800 font-mono">
                            ₹{item.dish.price * item.count}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Calculations */}
                    <div className="border-t border-[#E6DEC9] pt-4 mt-5 space-y-2">
                      <div className="flex justify-between text-xs text-gray-500 font-mono">
                        <span>Simulated Subtotal ({totalPlateItems} item{totalPlateItems > 1 ? "s" : ""})</span>
                        <span>₹{totalPlatePrice}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 font-mono">
                        <span>GST / Local Tax (Est. 5%)</span>
                        <span>₹{Math.round(totalPlatePrice * 0.05)}</span>
                      </div>
                      <div className="flex justify-between text-[#15462D] font-extrabold text-base pt-2 border-t border-dashed border-[#E6DEC9] mt-2">
                        <span>Estimated Bill Total</span>
                        <span className="font-mono text-lg text-gray-900">₹{totalPlatePrice + Math.round(totalPlatePrice * 0.05)}</span>
                      </div>
                    </div>

                    <div className="bg-[#15462D]/5 rounded-xl p-3.5 mt-5 text-[11px] text-gray-650 leading-normal border border-[#15462D]/10">
                      <strong>Canteen Note:</strong> This is a local pricing estimation simulator tool based on genuine Mahesh Prasad menu pricing. To place real group catering orders, please call us directly at <strong>{phoneNumber}</strong>!
                    </div>

                    <a
                      href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                      className="w-full mt-4 py-3 bg-[#15462D] text-white rounded-xl font-bold text-sm block text-center shadow-xs hover:bg-[#0c2f1d] transition-all"
                    >
                      Call Restaurant to Order
                    </a>
                  </div>
                )}

              </div>

            </div>

          </div>
        </section>

        {/* DETAILED RATINGS BREAKDOWN */}
        <section className="bg-white py-16 px-4" id="ratings-section">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs tracking-widest font-bold text-[#D97706] uppercase">Reputation Spotlight</span>
              <h2 className="text-3xl font-serif text-[#15462D] font-bold mt-1">
                Outstanding 4.1 Star Rating
              </h2>
              <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2">
                Evaluated honestly by **3,914 individual customers** on Google Search & Maps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FAF7F0] border border-[#E6DEC9] rounded-2xl p-6 sm:p-10 shadow-xs">
              
              {/* Score Left Column (4 cols) */}
              <div className="md:col-span-4 text-center md:border-r border-[#E6DEC9]/60 md:pr-8">
                <div className="text-6xl font-extrabold text-gray-900 leading-none font-sans mb-3">4.1</div>
                
                {/* 4.1 Stars display */}
                <div className="flex justify-center text-[#D97706] gap-1 mb-2">
                  <Star className="w-5.5 h-5.5 fill-current" />
                  <Star className="w-5.5 h-5.5 fill-current" />
                  <Star className="w-5.5 h-5.5 fill-current" />
                  <Star className="w-5.5 h-5.5 fill-current" />
                  <Star className="w-5.5 h-5.5 fill-current opacity-30" />
                </div>
                
                <span className="text-sm text-gray-500 font-semibold block uppercase tracking-wider">
                  3,914 Total Reviews
                </span>
                <span className="text-[11px] text-gray-400 block mt-1">
                  Updated June 2026
                </span>
              </div>

              {/* Progress bars (8 cols) */}
              <div className="md:col-span-8 space-y-3.5">
                {[
                  { star: 5, pct: 67 },
                  { star: 4, pct: 19 },
                  { star: 3, pct: 8 },
                  { star: 2, pct: 3 },
                  { star: 1, pct: 3 }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3 text-sm">
                    <span className="w-3 text-gray-600 font-semibold font-mono text-right">{row.star}</span>
                    <Star className="w-3.5 h-3.5 text-[#D97706] fill-current" />
                    
                    {/* Bar */}
                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#15462D] rounded-full" 
                        style={{ width: `${row.pct}%` }} 
                      />
                    </div>

                    <span className="w-8 text-gray-500 font-mono text-right text-xs">{row.pct}%</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* CUSTOMER GUEST REVIEWS */}
        <section className="bg-white pb-16 px-4" id="reviews-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-gray-200 pb-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#15462D]">
                  What Guests Say About Us
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Honest diner feedback captured from Google search records.
                </p>
              </div>

              {/* Search bar inside Reviews */}
              <div className="w-full md:w-80 relative">
                <input 
                  type="text"
                  placeholder="Search reviews (e.g. 'Dosa', 'Coffee')"
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-300 focus:outline-[#15462D] bg-[#FAF7F0]/50"
                  id="review-search-input"
                />
                <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Reviews display */}
            {filteredReviews.length === 0 ? (
              <div className="text-center py-10 text-gray-450 border border-dashed rounded-2xl">
                No matching guest reviews found. Try looking for &quot;Dosa&quot; or &quot;Meals&quot;.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="bg-[#FAF7F0]/60 rounded-2xl border border-[#E6DEC9]/60 p-6 flex flex-col justify-between">
                    <div>
                      {/* Rating Stars row */}
                      <div className="flex text-[#D97706] mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? "fill-current text-[#D97706]" : "opacity-20 text-gray-300"}`} 
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-xs text-gray-600 leading-relaxed italic mb-4">
                        &quot;{review.content}&quot;
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="flex justify-between items-end pt-4 border-t border-[#E6DEC9]/35 mt-4">
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">{review.author}</span>
                        <span className="text-[10px] text-gray-400 block">{review.role}</span>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 roundedbg-amber-100 text-[#B45309] bg-amber-50 font-bold text-[9px] tracking-wider uppercase block mb-1">
                          {review.tag}
                        </span>
                        <span className="text-[9px] text-gray-400 font-mono block">{review.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* CUSTOM SVG STREET MAP SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="street-map-section">
          <div className="bg-white rounded-2xl border border-[#E6DEC9] p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text info left (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#D97706]">Locale Neighborhood Map</span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#15462D] font-bold mt-1.5 mb-3">
                    Street & Landmark Guide
                  </h3>
                  <p className="text-sm text-gray-650 leading-relaxed">
                    Mahesh Prasad is ideally situated in **Lakshmipuram / Chamarajapuram** area. Our direct proximity to the local **RTO Office** and the busy **Ballal Circle** intersection makes us an excellent visual pivot point.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3.5 text-xs text-gray-600 bg-[#FAF7F0] p-3 rounded-lg border border-[#E6DEC9]/30">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#15462D] flex items-center justify-center font-bold text-white text-[8px] font-mono shrink-0">1</div>
                    <span><strong>Ballal Circle:</strong> Directly visible to the round intersection. Just 60 meters walk.</span>
                  </div>
                  
                  <div className="flex items-center gap-3.5 text-xs text-gray-600 bg-[#FAF7F0] p-3 rounded-lg border border-[#E6DEC9]/30">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#D97706] flex items-center justify-center font-bold text-white text-[8px] font-mono shrink-0">2</div>
                    <span><strong>RTO Office Compound:</strong> Located just across the southern block corner parallel lane.</span>
                  </div>

                  <div className="flex items-center gap-3.5 text-xs text-gray-600 bg-[#FAF7F0] p-3 rounded-lg border border-[#E6DEC9]/30">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-[8px] font-mono shrink-0">3</div>
                    <span><strong>Chamarajapuram Railway Station:</strong> Just 5 minutes transit northward.</span>
                  </div>
                </div>

                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center gap-2 px-6 py-3 bg-[#15462D] text-white rounded-lg hover:bg-[#0c2f1d] transition-all font-semibold text-xs shadow-md"
                >
                  <MapPin className="w-4 h-4 text-[#D97706]" />
                  <span>View Full Interactive Google Maps Route</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>
              </div>

              {/* Responsive Elegant SVG map on right (7 cols) */}
              <div className="lg:col-span-7 bg-[#FAF7F0] border border-[#E6DEC9] rounded-2xl p-4 overflow-hidden relative shadow-inner">
                
                {/* SVG Compass rose and legends */}
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-[#E6DEC9] text-[9px] font-bold text-[#15462D] shadow-xs select-none">
                  COMPASS: MYSURU (NORTH ▲)
                </div>

                <div className="w-full aspect-[4/3] flex items-center justify-center">
                  <svg 
                    viewBox="0 0 500 375" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-full h-full text-xs font-semibold select-none"
                    id="mysuru-neighborhood-svg"
                  >
                    {/* Background Grids / Grass park representations */}
                    <rect width="500" height="375" fill="#FAF6EC" />
                    <rect x="20" y="30" width="130" height="90" rx="12" fill="#E2ECE2" stroke="#D1DDD1" strokeWidth="1.5" />
                    <text x="35" y="55" fill="#15462D" className="font-serif italic font-bold text-[10px]">Lakshmipuram Park</text>

                    {/* Residential grid blocks */}
                    <rect x="210" y="30" width="100" height="90" rx="8" fill="#ECE9DF" stroke="#E0DACF" strokeWidth="1" />
                    <text x="218" y="55" fill="#716D64" className="text-[9px]">Chamarajapura</text>
                    <text x="218" y="70" fill="#716D64" className="text-[9px]">Residential St Block</text>

                    <rect x="340" y="30" width="140" height="130" rx="8" fill="#ECE9DF" stroke="#E0DACF" strokeWidth="1" />
                    <text x="352" y="55" fill="#716D64" className="text-[9px]">Mohalla Commercial Sector</text>

                    <rect x="210" y="250" width="270" height="100" rx="8" fill="#ECE9DF" stroke="#E0DACF" strokeWidth="1" />
                    <text x="220" y="275" fill="#716D64" className="text-[9px]">RTO Office Complex Block</text>
                    <text x="220" y="290" fill="#B45309" className="text-[9px] font-bold">★ Govt RTO Office</text>

                    {/* Road Network Paths */}
                    {/* Road 1: Chamarajapura Main road (North to South) */}
                    <path d="M 170 0 L 170 375" stroke="#EFECE4" strokeWidth="45" strokeLinecap="square" />
                    <path d="M 170 0 L 170 375" stroke="#E2DEC9" strokeWidth="2" strokeDasharray="6 8" />
                    
                    {/* Road 2: Ballal Road crossing East-West */}
                    <path d="M 0 170 L 500 170" stroke="#EFECE4" strokeWidth="45" strokeLinecap="square" />
                    <path d="M 0 170 L 500 170" stroke="#E2DEC9" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round" />

                    {/* Road Titles */}
                    <text x="4" y="160" fill="#7C725C" className="text-[8px] uppercase tracking-widest font-mono">◄ Ballal Road (to Ring Rd)</text>
                    <text x="325" y="160" fill="#7C725C" className="text-[8px] uppercase tracking-widest font-mono">Ballal Road (to Palace) ►</text>
                    
                    <g transform="rotate(90 185 80)">
                      <text x="110" y="200" fill="#7C725C" className="text-[8px] uppercase tracking-widest font-mono">Chamarajapura Avenue ▲</text>
                    </g>
                    
                    {/* Intersection Circle (Ballal Circle) */}
                    <circle cx="170" cy="170" r="32" fill="#E2DEC9" stroke="#CCD5CC" strokeWidth="2" />
                    <circle cx="170" cy="170" r="16" fill="#15462D" />
                    <text x="170" y="173" fill="#D97706" textAnchor="middle" className="text-[8px] font-bold leading-none">CIRCLE</text>

                    {/* Label for Ballal Circle */}
                    <rect x="110" y="215" width="120" height="24" rx="12" fill="white" stroke="#15462D" strokeWidth="1.5" />
                    <text x="170" y="229" fill="#15462D" textAnchor="middle" className="text-[9px] font-black">📍 BALLAL CIRCLE</text>

                    {/* Mahesh Prasad Restaurant Pinpoint Placement */}
                    <g transform="translate(85, 215)">
                      {/* Pulse circle */}
                      <circle cx="30" cy="30" r="28" fill="#D97706" fillOpacity="0.12" className="animate-pulse" />
                      <rect x="0" y="10" width="85" height="36" rx="8" fill="#15462D" stroke="#D97706" strokeWidth="1.5" />
                      <text x="42.5" y="26" fill="#FAF6EC" textAnchor="middle" className="text-[9px] font-serif font-black select-none">MAHESH PRASAD</text>
                      <text x="42.5" y="38" fill="#D97706" textAnchor="middle" className="text-[7px] font-extrabold uppercase tracking-wide">VEG RESTAURANT</text>
                      {/* Anchor arrow pointing to the road intersection corner */}
                      <path d="M 68 46 L 79 55 L 85 40 Z" fill="#15462D" stroke="#D97706" strokeWidth="1" />
                    </g>

                    {/* Government RTO Office Placement Pin */}
                    <g transform="translate(230, 210)">
                      <line x1="0" y1="0" x2="0" y2="40" stroke="#716D64" strokeWidth="1" strokeDasharray="3 3" />
                      <polygon points="0,0 20,-10 20,10" fill="#B45309" />
                      {/* Pointer */}
                    </g>

                  </svg>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-16 pb-12 px-4 shadow-inner border-t-4 border-[#D97706]" id="footer-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Quick Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#15462D] text-base border-2 border-[#D97706]/40">
                  MP
                </div>
                <div>
                  <h4 className="text-base font-bold font-serif text-white tracking-tight">
                    Mahesh Prasad
                  </h4>
                  <span className="text-[10px] text-[#D97706] uppercase tracking-widest block font-bold leading-none">
                    Veg Restaurant
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Priding our services on traditional food safety, rich Karnataka legacy, cozy family hospitality, and premium South Indian vegetarian recipes.
              </p>
            </div>

            {/* Direct Information */}
            <div className="space-y-3">
              <h5 className="text-[#D97706] text-xs uppercase tracking-widest font-black">Physical Address</h5>
              <p className="text-xs text-gray-300 leading-normal">
                Ballal Cir, near RTO Office,<br />
                Chamarajapura, Chamarajapuram Mohalla,<br />
                Lakshmipuram, Mysuru, Karnataka 570005
              </p>
            </div>

            {/* Digital actions */}
            <div className="space-y-3">
              <h5 className="text-[#D97706] text-xs uppercase tracking-widest font-black">Direct Contacts</h5>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                  <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="hover:text-white font-mono">{phoneNumber}</a>
                </li>
                <li>
                  <span className="opacity-70">Support Email:</span>
                  <span className="block italic text-[11px]">No official email required</span>
                </li>
              </ul>
            </div>

            {/* Timings summary */}
            <div className="space-y-3">
              <h5 className="text-[#D97706] text-xs uppercase tracking-widest font-black">Service Schedule</h5>
              <div className="text-xs text-gray-300 space-y-1">
                <span className="block font-bold text-white">Open 7 days a week</span>
                <span className="block text-gray-400">Monday to Sunday</span>
                <span className="block text-[#D97706] font-mono font-medium">7:00 AM – 10:30 PM (IST)</span>
              </div>
            </div>

          </div>

          {/* SubFooter Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <div className="flex items-center gap-3">
              {/* Green veg code symbol */}
              <div className="w-3.5 h-3.5 bg-transparent border border-green-600 flex items-center justify-center rounded-sm">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <span>Registered FSSAI Pure-Vegetarian Class 1 Outlet</span>
            </div>
            <span>© 2026 Mahesh Prasad Veg Restaurant, Mysuru. Crafted with care.</span>
          </div>

        </div>
      </footer>

      {/* DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDish(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            id="dish-detail-modal"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-[#E6DEC9] shadow-2xl relative"
            >
              <div className="bg-[#15462D] text-white p-6 relative">
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedDish(null)}
                  className="absolute right-4 top-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2.5 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  ✕
                </button>
                
                <span className="text-[10px] uppercase font-bold text-[#D97706] tracking-widest block mb-1">
                  SPECIALTY COMPOSITION
                </span>
                <h3 className="text-2xl font-serif font-black">
                  {selectedDish.name}
                </h3>
                <span className="text-xs text-amber-200 font-bold block mt-0.5">
                  {selectedDish.kannadaName}
                </span>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-sans">
                    Heritage Description
                  </h5>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedDish.description}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 font-sans">
                    Ingredients Code & Allergen Info
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedDish.ingredients.map((ing, i) => (
                      <span key={i} className="px-3 py-1 bg-[#FAF7F0] border border-[#E6DEC9] rounded-lg text-xs font-medium text-gray-700">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedDish.spiceRating !== undefined && selectedDish.spiceRating > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-sans">
                      Spice Level Indicator
                    </h5>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-5 h-2 rounded-full ${
                            idx < (selectedDish.spiceRating || 0) 
                              ? "bg-red-500" 
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-2 font-medium">
                        {selectedDish.spiceRating === 1 ? "Mild Traditional" : selectedDish.spiceRating === 2 ? "Moderately Zesty" : "High Sambar Spice Blend"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-5 border-t border-[#E6DEC9]/50 mt-6">
                  <div>
                    <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider leading-none mb-1">Price</span>
                    <span className="text-2xl font-black text-gray-900 font-mono">₹{selectedDish.price}</span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        addToPlate(selectedDish);
                        setSelectedDish(null);
                      }}
                      className="px-5 py-3 rounded-xl bg-[#15462D] text-white hover:bg-[#0c2f1d] text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Tasting Plate</span>
                    </button>
                    
                    <button 
                      onClick={() => setSelectedDish(null)}
                      className="px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold cursor-pointer"
                    >
                      Close Details
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
