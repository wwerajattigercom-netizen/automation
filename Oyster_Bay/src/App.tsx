/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { 
  Phone, 
  MapPin, 
  Star, 
  Award, 
  Clock, 
  Utensils, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  Users, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronLeft, 
  Heart, 
  Compass,
  ArrowRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import generated quality images
// @ts-ignore
import heroImg from "./assets/images/oyster_bay_hero_1781299062428.jpg";
// @ts-ignore
import seafoodImg from "./assets/images/oyster_bay_seafood_1781299079355.jpg";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: "Signature" | "Popular" | "Spicy" | "Chef Special";
  isVeg: boolean;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  coastal: [
    {
      id: "c1",
      name: "Oyster Bay Tandoori Pomfret",
      description: "Whole fresh pomfret marinated in coastal spices, char-grilled to golden perfection in the tandoor.",
      price: "₹640",
      badge: "Chef Special",
      isVeg: false
    },
    {
      id: "c2",
      name: "Mangalorean Anjal Ghee Roast",
      description: "Kingfish steaks slow-cooked in a rich spice masala paste caramelized with pure coastal ghee.",
      price: "₹590",
      badge: "Signature",
      isVeg: false
    },
    {
      id: "c3",
      name: "Malabar Prawn Curry",
      description: "Juicy prawns simmered in a mildly spiced coconut milk gravy infused with raw mangoes and curry leaves.",
      price: "₹520",
      badge: "Popular",
      isVeg: false
    },
    {
      id: "c4",
      name: "Coastal Crab Butter Garlic",
      description: "Fresh mud crab tossed in silky garlic butter, crushed black pepper, and toasted curry herbs.",
      price: "₹720",
      badge: "Signature",
      isVeg: false
    }
  ],
  mains: [
    {
      id: "m1",
      name: "Slow-Cooked Rosemary Lamb Racks",
      description: "Tender lamb racks wood-roasted with baby potatoes, dark vintage sauce, and glazed root vegetables.",
      price: "₹680",
      badge: "Chef Special",
      isVeg: false
    },
    {
      id: "m2",
      name: "Murg Dum Biryani, Oyster Style",
      description: "Aged long-grain basmati rice layered with spiced chicken, mint-coriander greens, and high-altitude saffron.",
      price: "₹450",
      badge: "Popular",
      isVeg: false
    },
    {
      id: "m3",
      name: "Paneer Tikka Laziz",
      description: "Cottage cheese skewers stuffed with fresh mint chutney, roasted over coal and simmered in makhani cream gravy.",
      price: "₹390",
      isVeg: true
    },
    {
      id: "m4",
      name: "Wild Mushroom & Truffle Risotto",
      description: "Creamy arborio rice with porcini mushrooms, parmesan white wine emulsion, and premium white truffle oil drizzle.",
      price: "₹485",
      isVeg: true
    }
  ],
  beverages: [
    {
      id: "b1",
      name: "Oyster Bay Elixir",
      description: "A majestic mocktail blend of fresh blue curacao, tender coconut water, pineapple juice, and dynamic mint syrup.",
      price: "₹245",
      badge: "Signature",
      isVeg: true
    },
    {
      id: "b2",
      name: "Saffron Phirni Parfait",
      description: "Traditional sub-continental ground rice pudding sweetened with condensed milk, cardamom, almonds, and pure saffron filaments.",
      price: "₹280",
      isVeg: true
    },
    {
      id: "b3",
      name: "Sizzling Chocolate Walnut Brownie",
      description: "Warm homemade fudge brownie baked with walnuts, topped with gourmet vanilla bean ice cream and premium dark fudge sauce.",
      price: "₹310",
      isVeg: true
    }
  ]
};

const REVIEWS = [
  {
    name: "Rohan Despande",
    rating: 5,
    date: "2 days ago",
    content: "Absolutely phenomenal! Hand-down the best coastal fine dining in Mysuru. The Ghee Roast was extremely authentic and had rich aromas. Courteous staff and beautiful decor."
  },
  {
    name: "Dr. Ananya Rao",
    rating: 5,
    date: "1 week ago",
    content: "Oyster Bay stands out as our family's favorite weekend spot in Vijayanagar. Rating is 100% deserved. Great ambiance, quick serving times, and consistent five-star taste."
  },
  {
    name: "Marcus Aurelius",
    rating: 4,
    date: "3 weeks ago",
    content: "Excellent seafood. The Tandoori Pomfret was incredibly juicy and perfectly cooked. The mocktails are refreshing. Booking a table in advance is highly recommended on weekends!"
  }
];

const FAQS = [
  {
    q: "Is prior booking or reservation mandatory?",
    a: "While walk-ins are welcome, we highly advocate making prior reservations—especially for dinner service and on weekends—to secure the perfect seating arrangement for your party."
  },
  {
    q: "Do you have dedicated vegetarian choices?",
    a: "Absolutely! Although we are highly celebrated for our coastal seafood craft, we host a separate premium kitchen segment specializing in gourmet vegetarian north-Indian and continental masterpieces."
  },
  {
    q: "Do you provide valet parking facilities?",
    a: "Yes, we offer complimentary, secure valet parking services for all our guests right at our prominent entrance on Kannada Parishath Road."
  },
  {
    q: "Can I customize the spiciness level of coastal fish items?",
    a: "Yes, our veteran chefs are more than happy to tailor the hotness or spice blend to fit your dietary preferences perfectly."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("coastal");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [discountClaimed, setDiscountClaimed] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Reservation form states
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingGuests, setBookingGuests] = useState("2 Guests");
  const [bookingTime, setBookingTime] = useState("19:30");
  const [bookingSection, setBookingSection] = useState("Intimate Dining");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const handleReservation = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) {
      alert("Please fill out all required reservation fields.");
      return;
    }
    const code = "OB-" + Math.floor(1000 + Math.random() * 9000);
    setBookingCode(code);
    setIsBooked(true);
  };

  const handleDiscount = () => {
    setDiscountClaimed(true);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans selection:bg-slate-800 selection:text-white relative overflow-x-hidden">
      
      {/* Dynamic Floating Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            id="notification-toast"
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 borderWidth border border-amber-400 max-w-sm"
          >
            <Sparkles className="text-amber-400 shrink-0 w-5 h-5 animate-pulse" />
            <div>
              <p className="font-semibold text-xs text-amber-300 tracking-wider">OFFER UNLOCKED</p>
              <p className="text-xs text-slate-100">Welcome cocktail and 10% discount dynamic code reserved!</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-white ml-2 text-sm font-semibold">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Luxe Banner */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 text-center tracking-wider flex items-center justify-center gap-3 flex-wrap border-b border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-medium">
          <Award className="w-3.5 h-3.5" /> Rank #2 Fine Dining in Mysuru
        </span>
        <span className="hidden sm:inline opacity-40">|</span>
        <span>Google Rating: <strong>4.1 ★</strong> (3,698 reviews)</span>
        <span className="hidden sm:inline opacity-40">|</span>
        <button 
          onClick={handleDiscount} 
          disabled={discountClaimed}
          className="text-amber-300 font-medium hover:underline focus:outline-none transition-all disabled:opacity-50 inline-flex items-center gap-1 cursor-pointer"
        >
          {discountClaimed ? "✓ Discount Applied" : "✨ Unlock 10% Welcome Offer"}
        </button>
      </div>

      {/* Styled Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <a href="#hero" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-serif text-lg font-bold group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors duration-300">
              OB
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-slate-900">Oyster Bay</span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">Fine Dining & Coastal Crafters</span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium uppercase tracking-wider text-slate-600">
            <a href="#hero" className="hover:text-slate-900 transition-colors">Home</a>
            <a href="#philosophy" className="hover:text-slate-900 transition-colors">Philosophy</a>
            <a href="#menu" className="hover:text-slate-900 transition-colors">Menu</a>
            <a href="#experience" className="hover:text-slate-900 transition-colors">Reviews</a>
            <a href="#location" className="hover:text-slate-900 transition-colors">Location</a>
          </nav>

          {/* Desktop Right PhoneCTA / Booking */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:09900037368" 
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-4 py-2 rounded-full border border-slate-200/80 hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-4.5 h-4.5 text-slate-500" />
              <span>099000 37368</span>
            </a>
            <a 
              href="#reserve-table" 
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Book Table
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-slate-800 hover:text-slate-950 p-1"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/40 z-50 lg:hidden backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl p-6 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <span className="font-serif text-lg font-bold text-slate-900">Oyster Bay Menu</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-5 py-8 text-neutral-700 text-sm font-medium tracking-wide uppercase">
                  <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Home</a>
                  <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Philosophy</a>
                  <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Our Menu</a>
                  <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Reviews</a>
                  <a href="#location" onClick={() => setMobileMenuOpen(false)} className="hover:text-black">Find Us</a>
                </nav>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <a 
                  href="tel:09900037368" 
                  className="flex items-center justify-center gap-2.5 w-full py-3 bg-slate-100 rounded-xl font-medium text-slate-800 hover:bg-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Call 099000 37368</span>
                </a>
                <a 
                  href="#reserve-table" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full py-3.5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl font-medium shadow-md"
                >
                  Book Table
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        
        {/* Luxury Hero Section */}
        <section id="hero" className="relative min-h-[90vh] bg-slate-950 flex flex-col justify-center overflow-hidden py-16">
          <div className="absolute inset-0">
            <img 
              src={heroImg} 
              alt="Oyster Bay Restaurant Atmosphere" 
              className="w-full h-full object-cover opacity-35 object-center scale-105 transform animate-[subtle-zoom_20s_infinite_alternate]"
              referrerPolicy="no-referrer"
            />
            {/* Linear gradients to control contrast and layout focus */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 w-full h-full grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy block */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs tracking-widest uppercase font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Exotic Coastal Culinary Art
                </div>
                
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[1.12] tracking-tight">
                  Maritime Heritage <br/>
                  <span className="text-amber-300 italic font-normal font-serif">Meets Fine Dining</span>
                </h1>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Welcome to <strong className="text-white">Oyster Bay</strong>, highly ranked as primary fine dining restaurant landmark inside Vijayanagar, Mysuru. Immerse in premium coastal curries, fresh ocean catches, customized sizzlers, and handcrafted signature spirits.
                </p>
              </motion.div>

              {/* Stats Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 max-w-md border-t border-white/10"
              >
                <div>
                  <div className="flex items-center gap-1 text-white font-serif text-2xl font-semibold">
                    <span>4.1</span>
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Google Score</span>
                </div>
                <div>
                  <div className="text-white font-serif text-2xl font-semibold">3,698+</div>
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Guest Reviews</span>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="text-amber-300 font-serif text-2xl font-semibold">#2</div>
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">Top Rated in Mysuru</span>
                </div>
              </motion.div>

              {/* Call to Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <a 
                  href="#reserve-table" 
                  className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-amber-400/10 hover:shadow-amber-400/25 transition-all text-center"
                >
                  Reserve Your Table
                </a>
                <a 
                  href="#menu" 
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider rounded-full border border-white/20 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* Right Card / Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-2.5 bg-slate-900/60 backdrop-blur-md">
                <img 
                  src={seafoodImg} 
                  alt="Oyster Bay Signature Lobster Dish" 
                  className="w-full aspect-[4/3] object-cover rounded-xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="flex items-center justify-between mt-4 px-3.5 pb-2">
                  <div>
                    <h3 className="font-serif text-white font-semibold text-sm">Gourmet Seafood Platter</h3>
                    <p className="text-xs text-neutral-400">Marinated with premium home-crafted coastal marinades</p>
                  </div>
                  <div className="bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs px-2.5 py-1 rounded">
                    ★ Premium Selection
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Philosophy & History Section */}
        <section id="philosophy" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              <div className="lg:col-span-5 space-y-6">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block">Culinary Ethos</span>
                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">
                  Where Spice Alchemy <br />
                  <span className="italic font-normal text-slate-500 font-serif">Meets Coastal Heritage</span>
                </h2>
                <div className="h-0.5 w-16 bg-amber-400 rounded" />
                <p className="text-slate-600 font-serif text-lg leading-relaxed italic">
                  &ldquo;A culinary haven nestled in the historical landscapes of Mysuru, offering an curated mosaic of traditional southern coastal delights matching world-class luxury standards.&rdquo;
                </p>
              </div>

              <div className="lg:col-span-7 space-y-6 text-slate-600 text-sm leading-relaxed">
                <p>
                  At Oyster Bay Vijayanagar, we believe that dining serves as a canvas of memory. Our culinary philosophy begins with the finest raw ocean components sourced right from coastal harbors. We translate traditional heirloom recipes directly into plate art, elevating iconic dishes like the Mangalorean Kingfish Ghee Roast or butter-glazed crab curries with modern culinary balance.
                </p>
                <p>
                  Spaciously crafted on Kannada Parishath Road, Vijayanagar 2nd Stage, the restaurant is divided into gorgeous ambient micro-zones: an elegant primary indoor dining hall with soft, intimate candle lighting, sleek premium counter spots, and comfortable semi-private booth setups ideal for celebrated family milestones.
                </p>

                {/* USP list */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4 text-slate-900 font-medium">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Traditional Mangalorean Masala Crafts</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Vegetarian & Non-Vegetarian Segregated Kitchens</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Complimentary Valet Parking Available</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Pre-Book Private VIP Dining Zones</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Tabbed Interactive Digital Menu Section */}
        <section id="menu" className="py-24 bg-[#f8f7f4] border-t border-b border-slate-200/40">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Block */}
            <div className="text-center space-y-4 max-w-xl mx-auto mb-16">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block">Signature Masterpieces</span>
              <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Our Curated Culinary Chapters</h2>
              <div className="h-0.5 w-16 bg-amber-400 mx-auto rounded" />
              <p className="text-xs text-slate-500">Explore premium chapters made with fresh, handpicked local ingredients and premium marinades in Mysuru.</p>
            </div>

            {/* Modern Tab Selector */}
            <div className="flex justify-center mb-12">
              <div className="bg-white p-1.5 rounded-full shadow-md inline-flex flex-wrap gap-1 border border-slate-200/50">
                <button
                  onClick={() => setActiveTab("coastal")}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "coastal" 
                      ? "bg-slate-950 text-white shadow-sm" 
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  ⚓ Coastal Specialty
                </button>
                <button
                  onClick={() => setActiveTab("mains")}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "mains" 
                      ? "bg-slate-950 text-white shadow-sm" 
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  🍲 Heritage Main Course
                </button>
                <button
                  onClick={() => setActiveTab("beverages")}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "beverages" 
                      ? "bg-slate-950 text-white shadow-sm" 
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  🍹 Mocktails & Dessert
                </button>
              </div>
            </div>

            {/* Menu Cards Display */}
            <motion.div 
              layout 
              className="grid md:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {MENU_DATA[activeTab].map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-slate-100/85 relative"
                  >
                    <div>
                      {/* Top metadata */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          {/* Vegetarian Indicator square */}
                          <div className={`w-4 h-4 border-2 flex items-center justify-center p-0.5 rounded-xs shrink-0 ${item.isVeg ? 'border-emerald-600' : 'border-rose-600'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          </div>
                          
                          <h3 className="font-serif font-bold text-slate-900 text-sm hover:text-slate-700 transition-colors">
                            {item.name}
                          </h3>
                        </div>

                        <span className="font-mono text-slate-950 font-bold text-sm bg-slate-50 px-3 py-1 rounded border border-slate-100">
                          {item.price}
                        </span>
                      </div>

                      <p className="text-slate-500 text-xs leading-relaxed pr-8">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom badging */}
                    {item.badge && (
                      <div className="mt-4 flex">
                        <span className="text-[10px] font-mono tracking-wider font-semibold py-0.5 px-2.5 rounded bg-amber-400/10 text-amber-700 border border-amber-400/20 uppercase">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

        {/* Interactive Reviews / Social Highlights */}
        <section id="experience" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Score Card */}
              <div className="lg:col-span-4 bg-slate-900 text-white p-8 rounded-2xl space-y-6 shadow-xl border border-slate-800 text-center lg:text-left relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                  <Star className="w-64 h-64 text-amber-400" />
                </div>
                
                <span className="text-amber-400 font-mono text-[10px] tracking-widest uppercase block">Celebrated Heritage</span>
                
                <h2 className="font-serif text-3xl font-bold tracking-tight">Loved by over 3,600+ Gastronomers</h2>
                
                <div className="flex flex-col items-center lg:items-start space-y-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                    <Star className="w-6 h-6 fill-slate-700 text-slate-700" />
                    <span className="font-mono text-xl font-bold ml-2">4.1</span>
                  </div>
                  <span className="text-xs text-neutral-400 tracking-wider">AGGREGATED GOOGLE BUSINESS RATING</span>
                </div>

                <p className="text-neutral-400 text-xs leading-relaxed">
                  Oyster Bay has served as Mysuru's premier fine-dining milestone, offering unmatched consistency, beautiful oceanic decor, and family-friendly space setups.
                </p>

                <div className="pt-2">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-colors"
                  >
                    <span>Read All 3,698 Reviews</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Reviews Grid */}
              <div className="lg:col-span-8 space-y-6">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block">Guest Testimonials</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight">Conversations from our dining hall</h3>
                
                <div className="grid sm:grid-cols-3 gap-6">
                  {REVIEWS.map((rev, index) => (
                    <div 
                      key={index}
                      className="bg-[#fcfbf9] p-6 rounded-2xl border border-slate-200/50 space-y-4 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{rev.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating 
                                ? "fill-amber-400 text-amber-400" 
                                : "text-slate-300"
                            }`} 
                          />
                        ))}
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed italic">
                        &ldquo;{rev.content}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-amber-400/5 rounded-xl border border-amber-400/10 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Found via Search query:</strong> Oyster Bay Vijayanagar is highly listed under the primary search keyword <em>&ldquo;restaurant in Mysuru&rdquo;</em> due to its legacy rating and highly praised seafood selection.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Live Reservation Experience Section */}
        <section id="reserve-table" className="py-24 bg-[#101820] text-white relative">
          
          <div className="max-w-4xl mx-auto px-6">
            
            <AnimatePresence mode="wait">
              {!isBooked ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-12"
                >
                  <div className="text-center space-y-4">
                    <span className="font-mono text-xs text-amber-300 uppercase tracking-widest block">Online Request Portal</span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">Reserve A Cozy Dining Slot</h2>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                      Lock your fine-dining experience. Fill below to request instant confirmation details.
                    </p>
                  </div>

                  <form onSubmit={handleReservation} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      
                      {/* Name field */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="Lord Marcus" 
                          className="w-full bg-slate-950 text-white rounded-lg px-4 py-3 border border-slate-800 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none placeholder:text-slate-600"
                        />
                      </div>

                      {/* Phone field */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">Contact Phone *</label>
                        <input 
                          type="tel" 
                          required
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder="e.g., 099000 37368" 
                          className="w-full bg-slate-950 text-white rounded-lg px-4 py-3 border border-slate-800 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none placeholder:text-slate-600"
                        />
                      </div>

                      {/* Date selection */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">Select Date *</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-slate-950 text-white rounded-lg px-4 py-3 border border-slate-800 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Guests number */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">Guests Volume</label>
                        <select 
                          value={bookingGuests}
                          onChange={(e) => setBookingGuests(e.target.value)}
                          className="w-full bg-slate-950 text-white rounded-lg px-4 py-3 border border-slate-800 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none"
                        >
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                          <option>5-6 Guests</option>
                          <option>7+ Guests (Extended Group)</option>
                        </select>
                      </div>

                      {/* Time Slot */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">Preferred Time</label>
                        <select 
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-slate-950 text-white rounded-lg px-4 py-3 border border-slate-800 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none"
                        >
                          <option value="12:00">12:00 PM (Lunch)</option>
                          <option value="13:00">01:00 PM (Lunch)</option>
                          <option value="14:00">02:00 PM (Lunch)</option>
                          <option value="19:00">07:00 PM (Dinner)</option>
                          <option value="19:30">07:30 PM (Dinner)</option>
                          <option value="20:30">08:30 PM (Dinner)</option>
                          <option value="21:30">09:30 PM (Dinner)</option>
                        </select>
                      </div>

                      {/* Ambient Seating */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono tracking-wider uppercase text-slate-400 block">Dining Atmosphere</label>
                        <select 
                          value={bookingSection}
                          onChange={(e) => setBookingSection(e.target.value)}
                          className="w-full bg-slate-950 text-white rounded-lg px-4 py-3 border border-slate-800 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none"
                        >
                          <option>Main Grand Dining Room</option>
                          <option>Intimate Candlelight Booth</option>
                          <option>Open-Air Garden Terrace</option>
                          <option>Lounge / Sizzler counter</option>
                        </select>
                      </div>

                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
                      <p className="text-[11px] text-slate-400">
                        * Immediate digital token code issued upon submission
                      </p>
                      <button 
                        type="submit" 
                        className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
                      >
                        Confirm Booking request
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 border border-amber-400/20 p-8 sm:p-12 rounded-3xl shadow-2xl text-center space-y-6 max-w-md mx-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto mb-4 scale-110">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <span className="font-mono text-xs text-amber-300 uppercase tracking-widest block">Reservation Active</span>
                  
                  <h3 className="font-serif text-2xl font-bold">Your Table is Reserved!</h3>
                  
                  <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                    Pleasure serving you, <strong className="text-white">{bookingName}</strong>. A premium dining slot is locked under your name in our records.
                  </p>

                  {/* Booking Details Ticket */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-left space-y-4 relative">
                    <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-amber-400 rounded-b" />
                    
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase text-neutral-400 font-mono">TOKEN ID</span>
                      <span className="text-xs font-mono font-bold text-amber-300">{bookingCode}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">Guests</span>
                        <strong className="text-slate-200">{bookingGuests}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">Atmosphere</span>
                        <strong className="text-slate-200">{bookingSection}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">Date</span>
                        <strong className="text-slate-200">{bookingDate}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">Time Ticket</span>
                        <strong className="text-slate-200">{bookingTime}</strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500 italic max-w-xs mx-auto">
                    Please present this dynamic confirmation token or phone contact <strong>{bookingPhone}</strong> on arrival at Vijayanagar.
                  </p>

                  <button 
                    onClick={() => {
                      setIsBooked(false);
                      setBookingName("");
                      setBookingPhone("");
                    }}
                    className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-medium text-xs uppercase tracking-wider rounded-lg transition-all"
                  >
                    Modify Card / Reserve New
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* Location & Map Links Section */}
        <section id="location" className="py-24 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid lg:grid-cols-12 gap-16 items-stretch">
              
              {/* Detailed Contact card panel */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block">Connect With Us</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Oyster Bay Mysuru</h2>
                  <div className="h-0.5 w-16 bg-amber-400 rounded" />
                  
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    We are strategically based adjacent to the scenic water storage tank on Kannada Parishath Road in Vijayanagar 2nd Stage—uniquely accessible with continuous parking space available.
                  </p>
                </div>

                <div className="space-y-6 text-xs text-slate-800">
                  
                  {/* Address block */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5 uppercase tracking-wide font-mono text-[10px]">ADDRESS DETAILS</h4>
                      <p className="text-slate-600 leading-relaxed font-sans">
                        Kannada Parishath Road, Vijayanagar, 2nd Stage, <br />
                        near Water tank, Mysuru, Karnataka 570017
                      </p>
                    </div>
                  </div>

                  {/* Phone block */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5 uppercase tracking-wide font-mono text-[10px]">RESERVATION PHONE</h4>
                      <p className="text-slate-600 mb-2 leading-relaxed">
                        099000 37368 (Tap below to dial directly)
                      </p>
                      <a 
                        href="tel:09900037368"
                        className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-semibold"
                      >
                        <span>Dial +91 99000 37368</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Timings */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5 uppercase tracking-wide font-mono text-[10px]">OPERATIONAL HOURS</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Monday &ndash; Sunday: 11:30 AM &ndash; 11:30 PM <br />
                        <span className="text-[10.5px] text-amber-600 font-semibold">Continuous coastal kitchen service open.</span>
                      </p>
                    </div>
                  </div>

                </div>

                <div className="pt-4">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md transition-all w-full sm:w-auto"
                  >
                    <Compass className="w-4 h-4 text-amber-300" />
                    <span>Launch Google Maps Routing</span>
                  </a>
                </div>

              </div>

              {/* Map Canvas Frame */}
              <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/60 shadow-inner flex flex-col justify-between p-6 md:p-8 min-h-[350px]">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 text-amber-700 font-mono text-[10px] font-semibold rounded-full">
                    📍 Verified Google Coordinates
                  </div>
                  <h3 className="font-serif text-slate-900 font-bold text-xl">Scenic Location in Vijayanagar</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                    We host a strategic, easy-to-spot layout on Kannada Parishath Road in Vijayanagar 2nd stage, extremely near to the Water Tank monument which acts as a prominent regional milestone in Mysuru.
                  </p>
                </div>

                {/* Styled Interactive Directions Prompt Card */}
                <div className="bg-white/95 p-6 rounded-2xl border border-slate-200 shadow-lg mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center md:text-left">
                    <p className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">GOOGLE PLACES ID</p>
                    <h4 className="font-serif font-bold text-slate-900 text-xs">ChIJrWuzVfV6rzsRDvpOdcbn81A</h4>
                    <p className="text-[11px] text-slate-500">Quickly locate on standard map clients with accurate routing guidelines.</p>
                  </div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg shrink-0 transition-colors text-center cursor-pointer block"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Elegant Accordion FAQs */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            
            <div className="text-center space-y-4 mb-16">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block">Common Inquiries</span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
              <div className="h-0.5 w-16 bg-amber-400 mx-auto rounded" />
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-[#FAF9F6] rounded-2xl border border-slate-200/50 overflow-hidden"
                >
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 text-slate-900 font-serif font-bold text-sm cursor-pointer select-none">
                      <span>{faq.q}</span>
                      <span className="transition-transform group-open:rotate-180 text-amber-500">
                        ▼
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 border-t border-slate-200/40 mt-1">
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{faq.a}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Styled Footer */}
      <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-tight">Oyster Bay</h4>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
              Exotic coastal cuisine, succulent kebabs, and continental masterpieces presented matching signature Indian fine dining norms inside Mysuru.
            </p>
            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Ranked #2 restaurant landmark in Vijayanagar</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-wider text-amber-300 uppercase mb-4">Navigations</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Home Landing</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Culinary Chapters</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Guest Experiences</a></li>
              <li><a href="#reserve-table" className="hover:text-white transition-colors">Book A Table</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-wider text-amber-300 uppercase mb-4">Contact Details</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>Phone: <strong className="text-white hover:underline"><a href="tel:09900037368">099000 37368</a></strong></li>
              <li>Near water tank, Vijayanagar 2nd stage, Mysuru</li>
              <li>Karnataka, 570017</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-wider text-amber-300 uppercase mb-4">Fine Dining Accents</h4>
            <p className="text-neutral-400 leading-relaxed mb-3">
              Celebrate your pre-eminent corporate meets, birthday highlights, or anniversary courses under special VIP accommodations.
            </p>
            <a 
              href="#reserve-table" 
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors inline-flex items-center gap-1 group"
            >
              <span>Instant Digital Reservation</span>
              <span className="transform group-hover:translate-x-1 transition-transform inline-block">→</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© 2026 Oyster Bay Fine Dining. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>MySQL Place: ChIJrWuzVfV6rzsRDvpOdcbn81A</span>
            <span className="text-neutral-600">|</span>
            <a 
              href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Verify on Google Maps
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
