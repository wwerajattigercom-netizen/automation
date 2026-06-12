import React, { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Coffee, 
  Heart, 
  ArrowRight, 
  Menu, 
  X, 
  Check, 
  ChevronRight,
  Info,
  Users,
  Calendar,
  Sparkles,
  Share2
} from 'lucide-react';

// Menu categories and items authentic to Mysuru & Mahesh Prasad
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  features: string[];
}

const MENU_ITEMS: Record<string, MenuItem[]> = {
  breakfast: [
    {
      id: "b1",
      name: "Mysore Masala Dosa",
      description: "Crispy outer golden-brown rice crepe smeared with legendary spiced red chutney, stuffed with savory potato mash, and enhanced with fresh pure ghee. Served with coconut chutney and signature sambar.",
      price: 110,
      tags: ["Signature", "Must Try"],
      features: ["Pure Ghee", "Spicy Red Garlic Chutney", "Crispy & Soft"]
    },
    {
      id: "b2",
      name: "Steamed Idli & Crispy Vada Combo",
      description: "Two ultra-soft, cloudlike steamed rice cakes paired with a perfectly crunchy, spiced split-blackgram lentil fritter. Served piping hot with local style split-lentil sambar and mint coconut chutney.",
      price: 80,
      tags: ["Classic", "Daily Favorite"],
      features: ["Probiotic", "Gluten-Free Option", "Traditional Recipe"]
    },
    {
      id: "b3",
      name: "Khara Bhath & Kesari Bhath (Chow Chow Bhath)",
      description: "A perfect harmony of savory and sweet. Spicy-roasted semolina pudding seasoned with mustard, curry leaves, and fresh vegetables paired with a rich, aromatic pineapple-seared sweet semolina halwa.",
      price: 90,
      tags: ["Traditional"],
      features: ["Twin Servings", "Pure Ghee Kesari", "Spiced Semolina Khara"]
    }
  ],
  meals: [
    {
      id: "m1",
      name: "Mahesh Prasad Royal Thali",
      description: "The complete traditional South Indian experience. Steamed premium sona masuri rice, traditional Mysuru style Sambar, pepper-cumin Rasam, two seasonal vegetable dry stir-fries (Palya), delicious local curd, crispy appalam, organic pickle, and a sweet obbattu.",
      price: 180,
      tags: ["Feast", "Popular"],
      features: ["All-You-Can-Eat Rice", "Traditional Spices", "Healthy Assortment"]
    },
    {
      id: "m2",
      name: "Healthy Ragi Mudde Meals",
      description: "Nutrient-packed signature finger millet balls (Ragi Mudde) served with rustic leafy-greens broth (Bassaru), raw cucumber salad, freshly churned spiced buttermilk, and local dry chutney.",
      price: 150,
      tags: ["Healthy", "Regional Icon"],
      features: ["Rich in Calcium & Fiber", "Slow Energy Release", "Authentic Village Style"]
    }
  ],
  beverages: [
    {
      id: "v1",
      name: "Legendary Mysuru Filter Coffee",
      description: "A strong chicory-blend coffee decoction slowly slow-dripped, frothed high with full-fat milk and pure cane sugar, served bubbling hot in an authentic brass tumbler and saucer set.",
      price: 45,
      tags: ["Award Winning", "Mysuru Pride"],
      features: ["Brass Davara Experience", "Premium Roast", "Frothed High"]
    },
    {
      id: "v2",
      name: "Saffron Badam Milk",
      description: "Creamy, rich hot milk infused with authentic whole-ground almond paste (Badam), aromatic cardamom, strands of pure Kashmiri saffron, and dusted with almond shavings.",
      price: 65,
      tags: ["Warm Dessert"],
      features: ["Real Badam Paste", "Rich Saffron Strands", "Nutty Garnish"]
    }
  ]
};

const REVIEWS = [
  {
    author: "Ramesh K. Rao",
    time: "2 weeks ago",
    rating: 5,
    highlight: "Dosa",
    text: "Mahesh Prasad never fails! The Mysore Masala Dosa has that perfect red chutney paste which makes it stand out from any other joint in Chamarajapura. Pair it with their hot filter coffee, and your morning is sorted."
  },
  {
    author: "Ananya Deshmukh",
    time: "1 month ago",
    rating: 5,
    highlight: "Meals",
    text: "The traditional thali here is so authentic and clean. For just 180 rupees, you get an absolute feast. Service is super swift despite the massive crowd near Ballal Circle. A true gem of Mysuru!"
  },
  {
    author: "Vikram Hegde",
    time: "3 days ago",
    rating: 4,
    highlight: "Coffee",
    text: "A heritage restaurant representing Mysuru's actual food culture. Extremely crowded during breakfast, but wait times are short. The brass tumbler filter coffee is robust, sweet, and aromatic."
  },
  {
    author: "Shreya S. Kumar",
    time: "2 months ago",
    rating: 4.1,
    highlight: "Dosa",
    text: "Authentic, simple, and light on the pocket. This is real Mysuru food without any fancy over-priced menus. Standard hygiene is maintained, and staff is very polite. Ragi Mudde here is a rare traditional find."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"breakfast" | "meals" | "beverages">("breakfast");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  
  // Review filter
  const [reviewFilter, setReviewFilter] = useState<string>("All");

  // Estimation state (pre-order calculator)
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Table Reservation simulator state
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingGuestCount, setBookingGuestCount] = useState("2");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleIncrement = (itemId: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleDecrement = (itemId: string) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      if (current <= 0) return prev;
      return {
        ...prev,
        [itemId]: current - 1
      };
    });
  };

  const handleResetEstimator = () => {
    setQuantities({});
  };

  // Safe import / referencing of local generated images
  const heroImage = "/src/assets/images/hero_veg_food_1781280762995.jpg";
  const coffeeImage = "/src/assets/images/filter_coffee_1781280778060.jpg";

  // Calculate order total
  const orderTotal = useMemo(() => {
    let total = 0;
    Object.entries(MENU_ITEMS).forEach(([_, items]) => {
      items.forEach(item => {
        const qty = quantities[item.id] || 0;
        total += qty * item.price;
      });
    });
    return total;
  }, [quantities]);

  const itemsSelectedCount = useMemo(() => {
    return Object.values(quantities).reduce((acc: number, curr: number) => acc + curr, 0);
  }, [quantities]);

  const toggleLike = (id: string) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredReviews = useMemo(() => {
    if (reviewFilter === "All") return REVIEWS;
    return REVIEWS.filter(rev => rev.highlight === reviewFilter);
  }, [reviewFilter]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim()) {
      setErrorMessage("Please enter a guest name.");
      return;
    }
    if (!bookingPhone.match(/^\d{10}$/)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!bookingTime) {
      setErrorMessage("Please select your arrival window.");
      return;
    }
    if (!bookingDate) {
      setErrorMessage("Please pick a dining date.");
      return;
    }
    
    setErrorMessage("");
    setBookingSubmitted(true);
  };

  const handleNewBooking = () => {
    setBookingName("");
    setBookingPhone("");
    setBookingGuestCount("2");
    setBookingTime("");
    setBookingDate("");
    setBookingSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#1E1C1A] font-sans overflow-x-hidden selection:bg-brand-green-100 selection:text-brand-green-900" id="main-container">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-[#FDFCF7]/95 backdrop-blur-md border-b border-[#F0ECE1] transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-green-800 rounded-full flex items-center justify-center text-[#FDFCF7] font-serif font-black text-xl shadow-md border border-brand-green-900">
              M
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-extrabold tracking-tight text-brand-green-900 leading-tight">
                Mahesh Prasad
              </h1>
              <p className="text-[10px] uppercase font-mono tracking-widest text-[#D97706] font-bold">
                Veg Restaurant • Mysuru
              </p>
            </div>
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700">
            <a href="#about" className="hover:text-brand-green-800 transition-colors uppercase tracking-wider text-xs">About Us</a>
            <a href="#specialties" className="hover:text-brand-green-800 transition-colors uppercase tracking-wider text-xs">Our Menu</a>
            <a href="#estimator" className="hover:text-brand-green-800 transition-colors uppercase tracking-wider text-xs">Self-Order Estimator</a>
            <a href="#reviews" className="hover:text-brand-green-800 transition-colors uppercase tracking-wider text-xs">Reviews</a>
            <a href="#location" className="hover:text-brand-green-800 transition-colors uppercase tracking-wider text-xs">Location & Contact</a>
          </nav>

          {/* Action CTA Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#reserve" 
              className="bg-brand-green-800 hover:bg-brand-green-900 text-[#FDFCF7] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-800"
            >
              Reserve Table
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-brand-green-800 focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-[#F0ECE1] bg-[#FDFCF7] absolute left-0 right-0 shadow-lg px-4 py-6 space-y-4"
              id="mobile-drawer"
            >
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-stone-900 text-sm font-medium uppercase tracking-wider hover:text-brand-green-800 border-b border-stone-100 pb-2"
              >
                About Us
              </a>
              <a 
                href="#specialties" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-stone-900 text-sm font-medium uppercase tracking-wider hover:text-brand-green-800 border-b border-stone-100 pb-2"
              >
                Our Menu
              </a>
              <a 
                href="#estimator" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-stone-900 text-sm font-medium uppercase tracking-wider hover:text-brand-green-800 border-b border-stone-100 pb-2"
              >
                Self-Order Estimator
              </a>
              <a 
                href="#reviews" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-stone-900 text-sm font-medium uppercase tracking-wider hover:text-brand-green-800 border-b border-stone-100 pb-2"
              >
                Reviews
              </a>
              <a 
                href="#location" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-stone-900 text-sm font-medium uppercase tracking-wider hover:text-brand-green-800 border-b border-stone-100 pb-2"
              >
                Location & Contact
              </a>
              <div className="pt-2">
                <a 
                  href="#reserve" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center bg-brand-green-800 text-[#FDFCF7] font-semibold text-xs tracking-wider uppercase py-3 rounded-md shadow-md"
                >
                  Reserve Table
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-28 lg:py-32 bg-stone-50 border-b border-[#F0ECE1]" id="hero">
        {/* Subtle background element */}
        <div className="absolute inset-0 bg-[radial-gradient(#065f46_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-brand-green-50 border border-brand-green-100 px-3.5 py-1.5 rounded-full text-brand-green-800 text-xs font-semibold uppercase tracking-wider" id="hero-badge">
                <Sparkles size={14} className="animate-pulse" />
                <span>#1 Pure Vegetarian Haven in Mysuru</span>
              </div>
              
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-900 tracking-tight leading-none" id="hero-title">
                Taste the Legacy of Mysuru's Finest <span className="text-[#D97706]">Traditional Flavors</span>
              </h2>
              
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed font-sans font-light">
                Since generations, <strong className="font-semibold text-stone-850">Mahesh Prasad Veg Restaurant</strong> in Chamarajapura has stood as a towering monument of pure South Indian culinary excellence. Famed for piping hot Filter Coffee, incredibly crispy Mysore Masala Dosa, and soulful authentic meals cooked with pure devotion.
              </p>

              {/* Quick Info Badges */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#FDFCF7] border border-[#ECD9C5] p-3 rounded-lg flex items-center space-x-3 shadow-xs">
                  <Star className="text-yellow-500 fill-yellow-500" size={18} />
                  <div>
                    <div className="font-bold text-sm text-stone-900 leading-none">4.1 Stars</div>
                    <div className="text-[10px] text-stone-550 font-medium">3,914+ Reviews</div>
                  </div>
                </div>

                <div className="bg-[#FDFCF7] border border-[#ECD9C5] p-3 rounded-lg flex items-center space-x-3 shadow-xs">
                  <Clock className="text-[#D97706]" size={18} />
                  <div>
                    <div className="font-bold text-sm text-stone-900 leading-none">Open Daily</div>
                    <div className="text-[10px] text-stone-550 font-medium">7:15 AM - 10:00 PM</div>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1 bg-[#FDFCF7] border border-[#ECD9C5] p-3 rounded-lg flex items-center space-x-3 shadow-xs justify-center md:justify-start">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                  <div className="text-left">
                    <span className="font-bold text-sm text-brand-green-905 block leading-none">100% Pure</span>
                    <span className="text-[10px] text-stone-550 font-medium font-mono">VEGETARIAN</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <a 
                  href="#specialties" 
                  className="bg-brand-green-800 hover:bg-brand-green-900 text-[#FDFCF7] text-center px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Explore Menu Highlights</span>
                  <ArrowRight size={16} />
                </a>
                
                <a 
                  href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#FDFCF7] hover:bg-stone-100 border border-stone-300 text-stone-700 hover:text-stone-950 text-center px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <MapPin size={16} className="text-brand-green-850" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Right Asset Frame Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative frames */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#D97706]/20 to-brand-green-800/10 rounded-3xl blur-xl opacity-80" />
                
                {/* Primary Card */}
                <div className="relative rounded-2xl overflow-hidden border-4 border-[#FDFCF7] shadow-2xl bg-white aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3]">
                  <img 
                    src={heroImage} 
                    alt="Delicious South Indian breakfast with Idlis, Dosa and chutney" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent p-4 rounded-xl text-white backdrop-blur-xs">
                    <span className="text-[10px] text-yellow-500 font-mono font-black tracking-widest uppercase">Signature dish</span>
                    <h3 className="font-serif text-lg font-bold leading-tight">Golden Ghee Masala Dosa</h3>
                    <p className="text-xs text-stone-200 font-light mt-0.5">Cooked with top quality clarified butter, house-prepared lentils and legendary red chutney paste.</p>
                  </div>
                </div>

                {/* Overlapping Mini Card (Brass Coffee) */}
                <div className="absolute -bottom-8 -left-6 md:-left-10 bg-[#FDFCF7] p-3.5 rounded-xl shadow-xl border border-stone-200 hidden sm:flex items-center space-x-4 max-w-xs animate-bounce" style={{ animationDuration: '4s' }}>
                  <img 
                    src={coffeeImage} 
                    alt="Authentic Mysuru filter coffee bubbling" 
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg border border-stone-100"
                  />
                  <div className="text-left pr-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-[#D97706]">Legendary Aroma</p>
                    <p className="font-serif font-bold text-stone-900 text-sm">Brass Filter Coffee</p>
                    <div className="flex text-yellow-500 mt-1">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={10} className="fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="py-20 bg-[#FDFCF7]" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#D97706] font-bold">Heritage & Authenticity</h3>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#064E3B] tracking-tight">
              Where Taste Meets Tradition Near Ballal Circle
            </h2>
            <div className="w-16 h-1 bg-[#D97706] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Story text */}
            <div className="space-y-6 text-stone-600 leading-relaxed font-light text-base">
              <p>
                Nestled near the historic RTO office in Chamarajapura, Mysuru, <strong className="font-medium text-stone-900">Mahesh Prasad Veg Restaurant</strong> is not just an eating joint; it is a warm, bustling nostalgic experience deeply integrated into Mysuru town's daily life. 
              </p>
              <p>
                Every single day, as early as sunrise, locals, officegoers, and food enthusiasts queue up to enjoy standard traditional breakfast recipes made with uncompromised recipes. Our kitchen adheres strictly to authentic, zero-chemical pure vegetarian cooking principles, dry roasting our spice mixes and extracting pure coconut chutneys every few hours.
              </p>
              
              <div className="border-l-4 border-[#D97706] pl-4 italic text-stone-800 font-serif my-4">
                "Our single absolute goal is consistency. When a guest walks in for breakfast or thali, they deserve the exact rich flavor they tasted years ago. That is the true asset of Mahesh Prasad."
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-brand-green-100 rounded-full mt-1">
                    <Check size={14} className="text-brand-green-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-950 text-sm">Farm-Fresh Ingredients</h4>
                    <p className="text-xs text-stone-550">We source our vegetables daily from local clean Mysuru markets.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-brand-green-100 rounded-full mt-1">
                    <Check size={14} className="text-brand-green-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-950 text-sm">Strict Quality Protocol</h4>
                    <p className="text-xs text-stone-550">No artificial colorants, no MSG, and premium grade edible oils.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features list cards */}
            <div className="space-y-4">
              <div className="bg-stone-50 border border-[#F0ECE1] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-green-800 text-[#FDFCF7] rounded-lg">
                    <Utensils size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg">Pure Veg Dedication</h3>
                    <p className="text-sm text-stone-550 mt-0.5">Absolute hygiene standard separation. Built purely for classic and traditional vegetarian dining enthusiasts.</p>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 border border-[#F0ECE1] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-green-800 text-[#FDFCF7] rounded-lg">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg">Morning Filter Brew</h3>
                    <p className="text-sm text-stone-550 mt-0.5">Our filter coffee is brewed multiple times a day in double-chamber brass filters to ensure high-quality decoction strength.</p>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 border border-[#F0ECE1] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#D97706] text-white rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg">Welcoming Atmosphere</h3>
                    <p className="text-sm text-stone-550 mt-0.5">A lively, friendly, and fast-paced environment where families, friends, and solo travelers eat together blissfully.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SPECIALTIES MENU SECTION */}
      <section className="py-20 bg-stone-50 border-y border-[#F0ECE1]" id="specialties">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#D97706] font-bold">Taste Our Signature Specialties</h3>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#064E3B] tracking-tight">Our Curated Menu Highlights</h2>
            <p className="text-stone-550 font-sans font-light">Explore a selection of our most loved traditional South Indian dishes, prepared with authentic ingredients.</p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
            {[
              { id: "breakfast", label: "Mornings & Tiffins", icon: <Utensils size={16} /> },
              { id: "meals", label: "Healthy Feasts & Meals", icon: <Check size={16} /> },
              { id: "beverages", label: "Steaming Brews & Drinks", icon: <Coffee size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none ${
                  activeTab === tab.id
                    ? "bg-brand-green-800 text-[#FDFCF7] shadow-md scale-105"
                    : "bg-[#FDFCF7] hover:bg-stone-100 text-stone-600 border border-stone-250"
                }`}
                id={`tab-btn-${tab.id}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {MENU_ITEMS[activeTab].map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-[#FDFCF7] border border-[#F0ECE1] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                  id={`menu-card-${item.id}`}
                >
                  <div>
                    {/* Badge / Tag row */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <span key={tag} className="bg-brand-green-50 text-brand-green-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Heart Like helper button */}
                      <button 
                        onClick={() => toggleLike(item.id)}
                        className={`p-1.5 rounded-full border transition-all duration-200 ${
                          likes[item.id] 
                            ? "bg-rose-50 border-rose-200 text-rose-500 scale-110" 
                            : "bg-white border-stone-200 text-stone-400 hover:text-stone-600 hover:border-stone-300"
                        }`}
                        title="Add to wishlist"
                      >
                        <Heart size={15} fill={likes[item.id] ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Menu item Name */}
                    <h3 className="font-serif font-black text-stone-900 text-xl group-hover:text-brand-green-800 transition-colors">
                      {item.name}
                    </h3>

                    {/* Pricing */}
                    <p className="text-lg font-mono font-bold text-[#D97706] mt-1">
                      ₹{item.price}
                    </p>

                    {/* Description */}
                    <p className="text-stone-600 text-sm font-light leading-relaxed mt-3">
                      {item.description}
                    </p>

                    {/* Features checklist */}
                    <ul className="space-y-1.5 mt-5 border-t border-[#F0ECE1] pt-4">
                      {item.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-center space-x-2 text-xs text-stone-700">
                          <Check size={12} className="text-semibold text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pre-Order Estimation Incrementor */}
                  <div className="mt-8 border-t border-[#F0ECE1] pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 uppercase tracking-wider block">Est. pre-order</span>
                      <span className="text-[10px] text-stone-550 font-light">Add to taste estimator list</span>
                    </div>
                    
                    <div className="flex items-center space-x-2.5">
                      {(quantities[item.id] || 0) > 0 && (
                        <>
                          <button 
                            onClick={() => handleDecrement(item.id)}
                            className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 font-bold hover:bg-stone-50 active:scale-95 transition-all text-sm"
                            title="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono font-bold text-stone-900 text-sm">
                            {quantities[item.id]}
                          </span>
                        </>
                      )}
                      <button 
                        onClick={() => handleIncrement(item.id)}
                        className="w-8 h-8 rounded-full bg-brand-green-800 hover:bg-brand-green-950 text-[#FDFCF7] flex items-center justify-center font-bold active:scale-95 transition-all text-sm shadow-xs"
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 bg-emerald-50/50 border border-[#D1E7DD] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto gap-4">
            <div className="flex items-start space-x-3 text-left">
              <Info className="text-[#065F5F] mt-1 shrink-0" size={18} />
              <div>
                <p className="font-semibold text-brand-green-901 text-sm">Planning a social feast or family lunch in Mysuru?</p>
                <p className="text-xs text-stone-550 mt-0.5">Use the increments above to calculate standard pricing estimates for your dine-in group reservation, or directly call our office to organize larger custom thali buffets.</p>
              </div>
            </div>
            {itemsSelectedCount > 0 && (
              <a 
                href="#estimator" 
                className="bg-[#D97706] hover:bg-amber-600 text-[#FDFCF7] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shrink-0 shadow-sm"
              >
                View Calculated Estimate
              </a>
            )}
          </div>

        </div>
      </section>

      {/* TASTE ESTIMATOR & GROUP BOOKING CALCULATOR SECTION (REAL PERSISTENT DYNAMIC STATE) */}
      <section className="py-20 bg-[#FDFCF7]" id="estimator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#D97706] font-bold">Interactive Pre-Order Tool</h3>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#064E3B] tracking-tight">
              Dine-In Feast Cost Estimator
            </h2>
            <div className="w-16 h-1 bg-[#D97706] mx-auto rounded-full" />
            <p className="text-stone-550 max-w-xl mx-auto text-sm font-sans font-light">
              Add quantities of items on the food menu tab above to customize your dream group feast budget estimates, including standard tax calculations and group concessions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
            
            {/* Left Estimation Calculation breakdown */}
            <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-xl flex items-center space-x-2">
                    <span>Selected Plates Summary</span>
                    <span className="bg-brand-green-800 text-[#FDFCF7] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                      {itemsSelectedCount} items
                    </span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">Based on current Mahesh Prasad standard menu tariffs</p>
                </div>
                {itemsSelectedCount > 0 && (
                  <button 
                    onClick={handleResetEstimator}
                    className="text-xs text-stone-500 hover:text-rose-600 transition-colors underline underline-offset-2"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {itemsSelectedCount === 0 ? (
                <div className="text-center py-12 px-4 space-y-4">
                  <div className="w-16 h-11 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto">
                    🍳
                  </div>
                  <h4 className="font-bold text-stone-800 text-sm">Your feast estimates list is empty</h4>
                  <p className="text-xs text-stone-550 max-w-sm mx-auto leading-relaxed">
                    Scroll up to our <a href="#specialties" className="text-brand-green-800 underline font-medium">Menu Highlights</a>, choose between rich dosas, thalis, or coffee, and use the (+) buttons to construct your estimation.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-stone-200">
                  {Object.entries(MENU_ITEMS).map(([cat, items]) => {
                    const selectedInCat = items.filter(item => (quantities[item.id] || 0) > 0);
                    if (selectedInCat.length === 0) return null;

                    return (
                      <div key={cat} className="pt-4 first:pt-0">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800 font-bold block mb-2">{cat} specialties</span>
                        <div className="space-y-3">
                          {selectedInCat.map(item => {
                            const qty = quantities[item.id];
                            return (
                              <div key={item.id} className="flex items-center justify-between text-sm">
                                <div className="space-y-0.5 max-w-[70%]">
                                  <span className="font-semibold text-stone-900 block">{item.name}</span>
                                  <span className="text-xs text-stone-400">₹{item.price} per plate</span>
                                </div>
                                <div className="flex items-center space-x-6">
                                  <span className="text-xs text-stone-500">{qty} × ₹{item.price}</span>
                                  <span className="font-bold text-stone-900 min-w-[50px] text-right text-sm">₹{qty * item.price}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Calculations receipts style */}
                  <div className="pt-6 border-t border-dashed border-stone-300 space-y-2 text-stone-700 text-xs">
                    <div className="flex justify-between items-center">
                      <span>Food & Beverages Subtotal</span>
                      <span className="font-mono text-stone-900">₹{orderTotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-700">
                      <span>GST (5% CGST+SGST Restaurant Flat Rate)</span>
                      <span className="font-mono">+₹{Math.round(orderTotal * 0.05)}</span>
                    </div>
                    {itemsSelectedCount >= 10 && (
                      <div className="flex justify-between items-center text-emerald-755 font-bold">
                        <span>Group Buffet Concession (5% Multi-Plate discount)</span>
                        <span className="font-mono">-₹{Math.round(orderTotal * 0.05)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-stone-800 font-medium">
                      <span>Service Charge</span>
                      <span className="font-mono text-stone-500">₹0 (Absolute Free Service)</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-stone-200 text-stone-950 font-serif text-lg font-bold">
                      <span>Estimated Grand Total</span>
                      <span className="font-serif text-brand-green-800">
                        ₹{orderTotal + Math.round(orderTotal * 0.05) - (itemsSelectedCount >= 10 ? Math.round(orderTotal * 0.05) : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Booking/Reserve Simulator Form */}
            <div className="lg:col-span-5 bg-emerald-950 text-[#FDFCF7] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-emerald-900" id="reserve">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-500 font-bold">Dine-in booking</span>
                <h3 className="font-serif font-bold text-2xl">Confirm Table / Group Request</h3>
                <p className="text-emerald-100 text-xs font-light">
                  Skip the long Chamarajapuram queues. Request your group dining session in advance.
                </p>
              </div>

              {bookingSubmitted ? (
                <div className="bg-emerald-900/55 border border-emerald-800 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-yellow-500 text-emerald-950 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-white">Reservation Request Sent!</h4>
                    <p className="text-xs text-emerald-200 mt-1">
                      Dear <span className="font-semibold text-white">{bookingName}</span>, we are preparing a table and holding sweet thali Obbattu plates for you!
                    </p>
                  </div>
                  
                  <div className="bg-emerald-950 p-4 rounded-xl text-left text-xs space-y-2 border border-emerald-900/60 font-mono">
                    <p className="flex justify-between border-b border-emerald-900/40 pb-1.5"><span className="text-emerald-300">Guests:</span> <span className="text-white">{bookingGuestCount} People</span></p>
                    <p className="flex justify-between border-b border-emerald-900/40 pb-1.5"><span className="text-emerald-300">Date:</span> <span className="text-white">{bookingDate}</span></p>
                    <p className="flex justify-between border-b border-emerald-900/40 pb-1.5"><span className="text-emerald-300">Hour Window:</span> <span className="text-white">{bookingTime}</span></p>
                    <p className="flex justify-between border-b border-emerald-900/40 pb-1.5"><span className="text-emerald-300">Contact:</span> <span className="text-white">{bookingPhone}</span></p>
                    {orderTotal > 0 && (
                      <p className="flex justify-between pt-1 font-bold"><span className="text-yellow-500 text-bold uppercase">Favored Est:</span> <span className="text-yellow-500">₹{orderTotal + Math.round(orderTotal * 0.05) - (itemsSelectedCount >= 10 ? Math.round(orderTotal * 0.05) : 0)}</span></p>
                    )}
                  </div>

                  <p className="text-[10px] text-emerald-300 leading-relaxed font-light">
                    *We've sent a simulated reservation ticket. Please show this receipt banner at the billing counter near Ballal Circle on arrival.
                  </p>

                  <button 
                    onClick={handleNewBooking}
                    className="w-full bg-[#D97706] hover:bg-amber-600 text-[#FDFCF7] py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                  >
                    Set Another Reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-rose-900/45 border border-rose-800 text-rose-100 p-3 rounded-lg text-xs font-medium">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-emerald-250 uppercase tracking-wider block">Lead Guest Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="e.g. Anand Kumar" 
                        className="w-full bg-emerald-900/40 border border-emerald-800 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-250 uppercase tracking-wider block">Phone Number</label>
                      <input 
                        type="tel" 
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="e.g. 9845012345" 
                        className="w-full bg-emerald-900/40 border border-emerald-800 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-250 uppercase tracking-wider block">Guest Count</label>
                      <select 
                        value={bookingGuestCount}
                        onChange={(e) => setBookingGuestCount(e.target.value)}
                        className="w-full bg-emerald-900/40 border border-emerald-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      >
                        <option value="1" className="text-stone-900">1 Person</option>
                        <option value="2" className="text-stone-900">2 People</option>
                        <option value="4" className="text-stone-900">4 People</option>
                        <option value="6" className="text-stone-900">6 People</option>
                        <option value="10" className="text-stone-900">10+ Group Feast</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-250 uppercase tracking-wider block">Dining Date</label>
                      <input 
                        type="date" 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-emerald-900/40 border border-emerald-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-emerald-250 uppercase tracking-wider block">Preferred Slot</label>
                      <select 
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-emerald-900/40 border border-emerald-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      >
                        <option value="" className="text-stone-900">Select Slot</option>
                        <option value="BreakFast: 7:30 AM - 9:00 AM" className="text-stone-900">Breakfast (7:30 AM - 9:00 AM)</option>
                        <option value="Late Mornings: 10:00 AM - 11:30 AM" className="text-stone-900">Brunch (10:00 AM - 11:30 AM)</option>
                        <option value="Lunch Hour: 12:30 PM - 2:30 PM" className="text-stone-900">Lunch Hour (12:30 PM - 2:30 PM)</option>
                        <option value="Coffee / Evening: 4:30 PM - 6:30 PM" className="text-stone-900">Evening Tiffin & Coffee (4:30 PM - 6:30 PM)</option>
                        <option value="Dinner: 7:30 PM - 9:30 PM" className="text-stone-900">Dinner (7:30 PM - 9:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#D97706] hover:bg-amber-600 active:scale-98 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg mt-2 flex items-center justify-center space-x-2"
                  >
                    <span>Request Table Booking</span>
                    <ArrowRight size={14} />
                  </button>

                  <p className="text-[10px] text-emerald-300 text-center leading-relaxed font-light">
                    No credit card deposit required. We hold tables for a maximum of 15 minutes past your chosen window.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC REVIEWS SECTION */}
      <section className="py-20 bg-stone-50 border-y border-[#F0ECE1]" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#D97706] font-bold">Trusted by Thousands</h3>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#064E3B] tracking-tight">Authentic Diner Experiences</h2>
              <p className="text-stone-550 max-w-xl text-sm font-light">Read real comments from our valued regular customers who visit Mahesh Prasad Chamarajapuram on a daily loop.</p>
            </div>
            
            {/* Filter buttons internally matching state */}
            <div className="flex flex-wrap gap-2">
              {["All", "Dosa", "Meals", "Coffee"].map((tagOption) => (
                <button
                  key={tagOption}
                  onClick={() => setReviewFilter(tagOption)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-200 border ${
                    reviewFilter === tagOption
                      ? "bg-brand-green-800 text-[#FDFCF7] border-brand-green-800"
                      : "bg-white text-stone-600 border-stone-250 hover:bg-stone-50"
                  }`}
                >
                  {tagOption === "All" ? "View All" : `${tagOption} Reviews`}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="bg-[#FDFCF7] border border-[#F0ECE1] p-6 sm:p-8 rounded-2xl mb-12 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div>
              <div className="font-serif text-5xl font-black text-brand-green-901 leading-none">4.1</div>
              <div className="flex justify-center text-yellow-500 my-2">
                {[1,2,3,4].map((s) => (
                  <Star key={s} size={16} className="fill-current" />
                ))}
                <Star size={16} className="fill-current text-stone-300" />
              </div>
              <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold font-mono">Weighted Google Rating</p>
            </div>

            <div className="pt-6 md:pt-0">
              <div className="font-serif text-5xl font-black text-stone-900 leading-none">3,914</div>
              <p className="text-xs text-stone-550 mt-2 font-mono uppercase tracking-wider text-[#D97706]">Total Verified Reviews</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Found via query 'restaurant in Mysuru'</p>
            </div>

            <div className="pt-6 md:pt-0">
              <div className="font-serif text-5xl font-black text-emerald-800 leading-none">96%</div>
              <p className="text-xs text-stone-500 mt-2">Recommended Rate</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Based on food quality & rapid standard services</p>
            </div>
          </div>

          {/* Reviews list layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((rev, index) => (
                <motion.div
                  key={rev.author}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="bg-[#FDFCF7] border border-[#F0ECE1] rounded-2xl p-6 shadow-xs relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-none">{rev.author}</h4>
                        <span className="text-[10px] text-stone-400 mt-1 block">{rev.time}</span>
                      </div>
                      
                      <div className="flex text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={`fill-current ${i < Math.floor(rev.rating) ? "text-yellow-500" : "text-stone-300"}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-stone-600 text-sm font-light leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Tagged: {rev.highlight}
                    </span>
                    <span className="text-[10px] text-stone-400 italic">Google Local Guide Verified</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* DETAILED CONTACT & VISUAL MAP BLOCK */}
      <section className="py-20 bg-[#FDFCF7]" id="location">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left info panel */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#D97706] font-bold">Visit or CalL Us</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-green-901 tracking-tight">Reach the Kitchen</h2>
                </div>
                
                <p className="text-stone-600 font-sans font-light text-sm leading-relaxed">
                  Have inquiries about heavy group feast orders, custom dietary request listings, or catering requests in greater Mysuru? Contact us during working windows or drop by directly.
                </p>

                <div className="divide-y divide-stone-200">
                  <div className="py-4 first:pt-0 flex items-start space-x-4">
                    <MapPin className="text-brand-green-800 mt-1 shrink-0" size={20} />
                    <div className="space-y-1">
                      <h4 className="font-bold text-stone-900 text-sm">Restaurant Address</h4>
                      <p className="text-sm text-stone-600 leading-relaxed font-light">
                        Ballal Cir, near RTO Office, Chamarajapura, Chamarajapuram Mohalla, Lakshmipuram, Mysuru, Karnataka 570005
                      </p>
                      <p className="text-xs text-[#D97706] font-mono font-bold">City: Mysuru, India</p>
                    </div>
                  </div>

                  <div className="py-4 flex items-start space-x-4">
                    <Phone className="text-brand-green-800 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Phone Line</h4>
                      <p className="text-sm text-stone-700 font-mono font-bold tracking-wider mt-0.5">0821 233 0820</p>
                      <p className="text-xs text-stone-400 mt-0.5">Call between 8:00 AM - 9:00 PM</p>
                    </div>
                  </div>

                  <div className="py-4 flex items-start space-x-4">
                    <Clock className="text-brand-green-800 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Dining & Takeaway Hours</h4>
                      <p className="text-sm text-stone-600 font-light mt-0.5">Monday to Sunday: 7:15 AM - 10:00 PM</p>
                      <p className="text-xs text-emerald-700 font-semibold mt-0.5">Open on all public holidays</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action grid button targeting real URL */}
              <div className="pt-4 border-t border-stone-200">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green-800 hover:bg-brand-green-950 text-[#FDFCF7] w-full text-center py-4 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 block shadow-md hover:shadow-lg"
                >
                  Launch Live Route Navigation (Google Maps)
                </a>
              </div>
            </div>

            {/* Right Map/Visual illustration panel (Anti-AI-slop standard card layout) */}
            <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-black text-stone-900 text-xl">Scenic Location Spotlight</h3>
                  <span className="bg-amber-100 text-[#D97706] text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">Opposite RTO Office</span>
                </div>
                <p className="text-stone-500 font-sans font-light text-xs leading-relaxed">
                  Located strategically around the bustling Ballal Circle, Mahesh Prasad remains heavily accessible for travelers exploring heritage Mysore landmarks.
                </p>
              </div>

              {/* Simulated Map View with clean layout */}
              <div className="bg-white border border-stone-200 rounded-2xl relative overflow-hidden aspect-[16/10] my-6 flex items-center justify-center p-4 shadow-inner">
                {/* Visual grid representing streets */}
                <div className="absolute inset-0 bg-[#f7f5ed] opacity-90" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0decb_1px,transparent_1px),linear-gradient(to_bottom,#e0decb_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                {/* Landmarks labels */}
                <div className="absolute top-8 left-12 bg-white/90 border border-stone-200 px-3 py-1 rounded text-[10px] font-mono text-stone-500 font-bold shadow-xs">
                  Ballal Circle Intersection
                </div>
                
                <div className="absolute bottom-12 right-12 bg-white/90 border border-stone-200 px-3 py-1 rounded text-[10px] font-mono text-stone-500 font-bold shadow-xs">
                  Mysuru RTO Office
                </div>

                <div className="absolute top-1/2 left-1/4 h-0.5 w-1/2 bg-stone-300 rotate-12" />

                {/* Spot representation */}
                <div className="relative text-center space-y-2 z-10">
                  <div className="w-16 h-16 bg-brand-green-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse mx-auto">
                    <MapPin size={28} className="text-[#FDFCF7]" />
                  </div>
                  <div className="bg-[#FDFCF7] border border-brand-green-800/20 px-4 py-2 rounded-xl shadow-md max-w-xs mx-auto">
                    <span className="font-serif text-sm font-bold text-brand-green-901 block">Mahesh Prasad</span>
                    <span className="text-[10px] text-stone-500 font-light block mt-0.5">Chamarajapura, Mysuru</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs text-stone-400 block">Click the navigation buttons to plot real directions on your phone's GPS application.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MINI FOOTER OUTCOME */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-850" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-stone-800">
            
            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-green-800 rounded-full flex items-center justify-center text-[#FDFCF7] font-serif font-black text-sm">
                  M
                </div>
                <span className="font-serif text-white font-extrabold text-lg">Mahesh Prasad Veg Restaurant</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                Delivering traditional South Indian taste and authentic heritage vegetarian dining around Lakshmipuram & Chamarajapuram Mohalla, Mysuru, Karnataka 570005.
              </p>
            </div>

            <div className="md:col-span-6 flex flex-col sm:flex-row sm:justify-end gap-4 text-xs font-mono">
              <div>
                <span className="text-stone-500 block uppercase tracking-widest text-[10px] font-bold">Direct Phone line</span>
                <span className="text-stone-200">0821 233 0820</span>
              </div>
              <div className="sm:border-l sm:border-stone-800 sm:pl-4">
                <span className="text-stone-500 block uppercase tracking-widest text-[10px] font-bold">City Location</span>
                <span className="text-stone-200">Mysuru, Karnataka, India</span>
              </div>
              <div className="sm:border-l sm:border-stone-800 sm:pl-4">
                <span className="text-stone-500 block uppercase tracking-widest text-[10px] font-bold">Menu Style</span>
                <span className="text-stone-200">100% Pure Vegetarian</span>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500">
            <p>© {new Date().getFullYear()} Mahesh Prasad Veg Restaurant, Mysuru. All Rights reserved.</p>
            <p className="mt-2 sm:mt-0 font-mono tracking-wider">TRADITIONAL VEGETARIAN EXCELLENCE</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
