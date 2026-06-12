import { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Check,
  ChevronRight,
  Sparkles,
  Utensils,
  Calendar,
  Users,
  Award,
  MessageSquare,
  Map,
  Anchor,
  X,
  Menu,
  FileText
} from "lucide-react";

// Curated menus for Oyster Bay Fine Dining
const MENU_CATEGORIES = {
  starters: [
    {
      name: "Classic Chilled Oysters",
      description: "Pristine, freshly-shucked oysters served raw on crushed ice with our house mignonette sauce, tabasco, and hand-pressed coastal lemons.",
      price: "₹1,250",
      tag: "Signature",
      isOyster: true
    },
    {
      name: "Oysters Rockefeller",
      description: "Fresh oysters baked on half shells padded with spinach chiffonade, compound herbed butter, and finished with golden-broiled Parmesan crust.",
      price: "₹1,450",
      tag: "Chef Special",
      isOyster: true
    },
    {
      name: "Butter Garlic Tiger Prawns",
      description: "Pan-roasted jumbo prawns tossed in unsalted butter, slivered Malabar garlic, fresh coriander, and micro greens.",
      price: "₹950"
    },
    {
      name: "Crisp Coastal Calamari",
      description: "Golden semolina-crusted squid rings deep fried with green peppercorns, served with a tangy lime-chili aioli.",
      price: "₹780"
    }
  ],
  mains: [
    {
      name: "Mysuru Coastal Spiced Lobster",
      description: "Sustainably caught lobster tails poached in raw local cold-pressed coconut oil, infused with Mysuru local spices, fresh curry leaves, and green chilies. Served with warm appam.",
      price: "₹2,850",
      tag: "Sought-After"
    },
    {
      name: "Seared Atlantic Salmon",
      description: "Center-cut Atlantic salmon fillet crisp-skinned, served over saffron-whipped Yukon potatoes, blanched asparagus spears, and a citrus-dill reduction.",
      price: "₹1,850"
    },
    {
      name: "Mangalorean Pomfret Curry",
      description: "Traditional local catch cooked slowly in a rich, spicy, tang-forward tamarind and roasted coconut gravy, paired with jasmine rice.",
      price: "₹1,450",
      tag: "Classic"
    },
    {
      name: "Ocean-Bay Signature Seafood Platter",
      description: "A decadent sharing board featuring whole grilled sea bass, skewered grilled tiger prawns, calamari, baked oysters, and house dips.",
      price: "₹3,900",
      tag: "For Two"
    }
  ],
  beverages: [
    {
      name: "Oyster Bay Sea-Salt Breeze",
      description: "A cold-pressed mocktail of blue curacao, raw ocean-salt rim, sweet lime infusion, elderflower tonic, and dry ice presentation.",
      price: "₹380",
      tag: "Popular"
    },
    {
      name: "Nandi Hills Chardonnay Vintage",
      description: "Curated local white wine with exceptional crispness, bright green apple and vanilla undertones, serving as a pristine companion to fresh oysters.",
      price: "₹850 / Glass"
    },
    {
      name: "Sparkling Mint & Elderberry Cooler",
      description: "A light aerated fusion of fresh mint sprigs, wild elderberry reduction, muddled lime, and botanical sparkling water.",
      price: "₹340"
    }
  ]
};

// Exceptional guest reviews curated representing the 3,698 reviews (4.1/5 rating)
const GUEST_REVIEWS = [
  {
    author: "Rohan Gowda",
    date: "May 2026",
    rating: 5,
    text: "Setting up a premium dining venue like Oyster Bay in Mysuru was genius. Extremely fresh coastal seafood and stellar, formal service. The signature raw oysters on ice were exceptionally cold and clean!"
  },
  {
    author: "Priyamvada Sharma",
    date: "April 2026",
    rating: 5,
    text: "Beautiful ambient lighting and luxury seafood. We ordered the Spiced Lobster and baked Oyster Rockefeller. An incredible fine-dining experience nestled right in Vijayanagar near the water tank."
  },
  {
    author: "Marc Henderson",
    date: "June 2026",
    rating: 4,
    text: "Exceptional plating and rich traditional coastal recipes with an international perspective. The ambiance is unmatched in Mysuru. A true culinary landmark."
  }
];

export default function App() {
  const [activeMenuCategory, setActiveMenuCategory] = useState<"starters" | "mains" | "beverages">("starters");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reservation State
  const [reserveForm, setReserveForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "19:30",
    guests: "2",
    section: "Main Dining Hall",
    notes: ""
  });
  const [bookedTicket, setBookedTicket] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockReserve = (e: FormEvent) => {
    e.preventDefault();
    if (!reserveForm.name || !reserveForm.phone || !reserveForm.date) {
      alert("Please complete the required details.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API Delay
    setTimeout(() => {
      const code = "OB-" + Math.floor(1000 + Math.random() * 9000);
      setBookedTicket({
        ...reserveForm,
        code,
        bookedAt: new Date().toLocaleString()
      });
      setIsSubmitting(false);
    }, 900);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReserveForm((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060B11] text-[#E5E9EE] font-sans selection:bg-[#C29B47] selection:text-black antialiased">
      {/* NAVIGATION BAR */}
      <nav id="nav-header" className="sticky top-0 z-50 bg-[#060B11]/90 backdrop-blur-md border-b border-[#1A2633] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
              <div className="h-10 w-10 bg-gradient-to-tr from-[#A68032] to-[#D4AF37] rounded-full flex items-center justify-center border border-[#E5C16C] shadow-lg">
                <Anchor className="h-5 w-5 text-[#060B11]" />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-widest text-[#E5C16C] font-semibold block leading-tight">
                  OYSTER BAY
                </span>
                <span className="text-[9px] tracking-widest uppercase text-slate-400 block -mt-[2px]">
                  Fine Dining Gastronomy
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("about")} className="text-slate-300 hover:text-[#E5C16C] tracking-wide text-xs uppercase font-semibold transition-colors duration-200">
                Our Story
              </button>
              <button onClick={() => scrollToSection("menu")} className="text-slate-300 hover:text-[#E5C16C] tracking-wide text-xs uppercase font-semibold transition-colors duration-200">
                Menu & Pairings
              </button>
              <button onClick={() => scrollToSection("reviews")} className="text-slate-300 hover:text-[#E5C16C] tracking-wide text-xs uppercase font-semibold transition-colors duration-200">
                Reviews
              </button>
              <button onClick={() => scrollToSection("directions")} className="text-slate-300 hover:text-[#E5C16C] tracking-wide text-xs uppercase font-semibold transition-colors duration-200">
                Location
              </button>
              <button 
                onClick={() => scrollToSection("reservation-hub")}
                className="bg-transparent hover:bg-[#E5C16C] border border-[#E5C16C]/60 hover:border-[#E5C16C] text-[#E5C16C] hover:text-black py-2.5 px-6 rounded-md text-xs font-bold tracking-widest uppercase transition-all duration-300 transform"
              >
                Book a Table
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-[#E5C16C] focus:outline-none"
                id="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a111a] border-b border-[#1A2633]"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-[#E5C16C] text-sm font-semibold tracking-wider uppercase"
                >
                  Our Story
                </button>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-[#E5C16C] text-sm font-semibold tracking-wider uppercase"
                >
                  Menu & Pairings
                </button>
                <button
                  onClick={() => scrollToSection("reviews")}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-[#E5C16C] text-sm font-semibold tracking-wider uppercase"
                >
                  Reviews
                </button>
                <button
                  onClick={() => scrollToSection("directions")}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-[#E5C16C] text-sm font-semibold tracking-wider uppercase"
                >
                  Location
                </button>
                <div className="pt-2 px-3">
                  <button
                    onClick={() => scrollToSection("reservation-hub")}
                    className="w-full text-center bg-[#E5C16C] hover:bg-[#cdaf55] text-[#060B11] py-3 rounded-md text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Background Image with elegant gradient cover */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/oyster_bay_hero_1781293984821.jpg"
            alt="Oyster Bay luxury restaurant interior"
            className="w-full h-full object-cover scale-105 motion-safe:animate-[pulse_12s_infinite]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B11] via-[#060B11]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B11] via-transparent to-[#060B11]/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col justify-center">
          <div className="max-w-3xl">
            {/* Award Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-[#E5C16C]/10 border border-[#E5C16C]/40 px-3 py-1.5 rounded-full text-[#E5C16C] text-xs font-medium tracking-wider uppercase mb-6"
            >
              <Award className="h-4 w-4" />
              <span>Mysuru's Premier Seafood Fine Dining Choice</span>
            </motion.div>

            {/* Typography Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-none mb-6"
            >
              Exquisite Coastal <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2D183] via-[#E5C16C] to-[#A68032]">
                Sophistication
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 font-sans leading-relaxed tracking-wide"
            >
              Immerse yourself in spectacular coastal culinary art. Savor stellar oysters, 
              buttery tiger prawns, and ocean delicacies meticulously prepared in Vijayanagar, Mysuru. 
              Highly celebrated and proudly holding a <span className="text-[#E5C16C] font-semibold">4.1★ rating</span> with <span className="text-[#E5C16C] font-semibold">3,698 guest recommendations</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5"
            >
              <button
                onClick={() => scrollToSection("menu")}
                className="bg-gradient-to-r from-[#A68032] to-[#E5C16C] hover:from-[#E5C16C] hover:to-[#A68032] text-[#060B11] px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-yellow-500/10 flex items-center justify-center space-x-2"
              >
                <Utensils className="h-4 w-4" />
                <span>Explore The Menu</span>
              </button>
              <button
                onClick={() => scrollToSection("reservation-hub")}
                className="border border-slate-300/40 hover:border-[#E5C16C] text-slate-200 hover:text-white px-8 py-4 rounded-md text-sm font-bold tracking-widest uppercase transition-colors duration-300 backdrop-blur-sm bg-slate-900/40"
              >
                Reserve Your Table
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats band */}
        <div className="absolute bottom-0 inset-x-0 bg-[#04080D]/80 border-t border-[#1A2633]/65 py-6 backdrop-blur-md hidden md:block">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
            <div className="flex items-center space-x-3.5">
              <Star className="h-5 w-5 text-[#E5C16C] fill-[#E5C16C]" />
              <div>
                <div className="text-sm font-semibold text-white">4.1 Google Rating</div>
                <div className="text-xs text-slate-400">3,698 Certified Reviews</div>
              </div>
            </div>
            <div className="flex items-center space-x-3.5 border-l border-[#1A2633]/65 pl-8">
              <Sparkles className="h-5 w-5 text-[#E5C16C]" />
              <div>
                <div className="text-sm font-semibold text-white">Fine Dining Category</div>
                <div className="text-xs text-slate-400">Gourmet Seafood & Coastal Curries</div>
              </div>
            </div>
            <div className="flex items-center space-x-3.5 border-l border-[#1A2633]/65 pl-8">
              <MapPin className="h-5 w-5 text-[#E5C16C]" />
              <div>
                <div className="text-sm font-semibold text-white">Vijayanagar, Mysuru</div>
                <div className="text-xs text-slate-400">Kannada Parishath Road</div>
              </div>
            </div>
            <div className="flex items-center space-x-3.5 border-l border-[#1A2633]/65 pl-8">
              <Phone className="h-5 w-5 text-[#E5C16C]" />
              <div>
                <div className="text-sm font-semibold text-white">099000 37368</div>
                <div className="text-xs text-slate-400">Call for Immediate Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY & HERITAGE SECTION */}
      <section id="about" className="py-24 bg-[#091018] relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#E5C16C]/3 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: text */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-[#E5C16C] tracking-widest text-xs font-bold uppercase block">
                  Symphony of the Tides
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                  Maritime Grandeur in the Heart of Royal Mysuru
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[#A68032] to-[#E5C16C]"></div>
              </div>

              <div className="text-slate-300 space-y-6 text-base font-normal leading-relaxed tracking-wide">
                <p>
                  Oyster Bay stands as Mysuru’s premier seafood address. By fusing pristine, sustainably sourced 
                  oceanside shellfish with the warm, deep-rooted heritage of southern coastal culinary ingredients, we present a dining 
                  experience that is both luxurious and authentically comfortable. 
                </p>
                <p>
                  Our kitchen selectively works with daily catches delivered under immaculate temperature controls, 
                  ensuring that every raw oyster on half-shell, baked lobster tail, and spiced curry bursts with unmatched 
                  freshness. 
                </p>
                <p>
                  Each meal is served under warm premium lighting, ambient oceanic sounds, and personalized white-glove table assistance to honor 
                  your celebratory milestones.
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#1A2633]">
                <div className="space-y-1">
                  <div className="text-3xl font-serif font-bold text-[#E5C16C]">3,600+</div>
                  <div className="text-xs tracking-wider uppercase text-slate-400">Enthusiastic Guest Reviews</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-serif font-bold text-[#E5C16C]">4.1★</div>
                  <div className="text-xs tracking-wider uppercase text-slate-400">Consolidated Google Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column: Imagery / Card Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-lg overflow-hidden border border-[#1A2633] bg-[#0A121D] p-4 shadow-2xl">
                <div className="aspect-[4/3] rounded-md overflow-hidden relative">
                  <img
                    src="/src/assets/images/oyster_dish_1781294000922.jpg"
                    alt="Plated Oysters on Ice"
                    className="w-full h-full object-cover relative z-0 transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded text-xs text-[#E5C16C] font-semibold tracking-wider uppercase border border-[#E5C16C]/20 flex items-center space-x-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Plated Perfection</span>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  <h4 className="font-serif text-lg text-white font-medium">Signature Oysters on Shell</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Arriving chilled from pristine bays. Served atop crystal ice shavings with microgreen garnishes, signature lemon wedges, and our hand-prepared peppery mignonette.
                  </p>
                </div>
              </div>

              {/* Decorative background border */}
              <div className="absolute -inset-3 rounded-lg border border-[#E5C16C]/20 -z-0 pointer-events-none transform translate-x-4 translate-y-4"></div>
            </div>

          </div>
        </div>
      </section>

      {/* CURATED GASTRONOMY MENU */}
      <section id="menu" className="py-24 bg-[#060B11] relative border-t border-[#1A2633]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Menu Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#E5C16C] tracking-widest text-xs font-bold uppercase block">
              Curated Gastronomy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              A Selection of Exquisite Flavours
            </h2>
            <p className="text-sm text-slate-400 font-sans max-w-xl mx-auto">
              Sustainably gathered ocean catches cooked to refined traditional coastal styles paired with fine vintage reserves.
            </p>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#E5C16C] to-transparent mx-auto"></div>
          </div>

          {/* Menu Category Switcher Tabs */}
          <div className="flex justify-center mb-16">
            <div className="bg-[#0A121D]/90 p-1.5 rounded-full border border-[#1A2633] flex items-center space-x-2">
              <button
                onClick={() => setActiveMenuCategory("starters")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeMenuCategory === "starters"
                    ? "bg-[#E5C16C] text-[#060B11]"
                    : "text-slate-300 hover:text-[#E5C16C]"
                }`}
              >
                Oysters & Starters
              </button>
              <button
                onClick={() => setActiveMenuCategory("mains")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeMenuCategory === "mains"
                    ? "bg-[#E5C16C] text-[#060B11]"
                    : "text-slate-300 hover:text-[#E5C16C]"
                }`}
              >
                Signature Mains
              </button>
              <button
                onClick={() => setActiveMenuCategory("beverages")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeMenuCategory === "beverages"
                    ? "bg-[#E5C16C] text-[#060B11]"
                    : "text-slate-300 hover:text-[#E5C16C]"
                }`}
              >
                Drinks & Cellar
              </button>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {MENU_CATEGORIES[activeMenuCategory].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="bg-[#0A121D]/40 hover:bg-[#0A121D]/70 p-6 rounded-lg border border-[#1A2633]/60 hover:border-[#E5C16C]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-serif text-lg text-white font-medium hover:text-[#E5C16C] transition-colors cursor-pointer">
                            {item.name}
                          </h3>
                          {item.tag && (
                            <span className="scale-[0.8] origin-left bg-[#E5C16C]/10 text-[#E5C16C] border border-[#E5C16C]/30 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        {item.isOyster && (
                          <div className="flex items-center text-sky-400 text-[10px] uppercase font-bold tracking-widest">
                            <Anchor className="h-3 w-3 mr-1" />
                            Pre-Shucked Coastal Harvest
                          </div>
                        )}
                      </div>
                      <span className="font-serif text-lg text-[#E5C16C] font-semibold whitespace-nowrap pl-4">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom Note */}
          <div className="mt-16 text-center text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            * Consuming raw shellfish is our specialty and highly safe thanks to our flash-temperature cold system. Please notify our service staff regarding any seafood allergies before ordering.
          </div>

        </div>
      </section>

      {/* RESERVATION HUB */}
      <section id="reservation-hub" className="py-24 bg-[#091018] relative border-t border-[#1A2633]/60">
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#E5C16C]/2 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#0A121D] border border-[#1A2633] rounded-xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!bookedTicket ? (
                  // The Reservation Form
                  <motion.form
                    key="reservation-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={mockReserve}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="text-[#E5C16C] tracking-widest text-[10px] font-bold uppercase flex items-center space-x-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Interactive Planner</span>
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                        Book Your Fine Dining Table
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        Enjoy curated service at Oyster Bay. Place your real-time simulated request below to instantly secure seating credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-300">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Lord/Lady Somashekar"
                          value={reserveForm.name}
                          onChange={handleInputChange}
                          className="w-full bg-[#060B11] border border-[#1A2633] focus:border-[#E5C16C] rounded px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-300">
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="e.g. 099000 37368"
                          value={reserveForm.phone}
                          onChange={handleInputChange}
                          className="w-full bg-[#060B11] border border-[#1A2633] focus:border-[#E5C16C] rounded px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="guest@domain.com"
                          value={reserveForm.email}
                          onChange={handleInputChange}
                          className="w-full bg-[#060B11] border border-[#1A2633] focus:border-[#E5C16C] rounded px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Preferred Seating Zone */}
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-300">
                          Seating Preference
                        </label>
                        <select
                          name="section"
                          value={reserveForm.section}
                          onChange={handleInputChange}
                          className="w-full bg-[#060B11] border border-[#1A2633] focus:border-[#E5C16C] rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="Main Dining Hall">Main Captain's Dining Hall (Lively Marina Style)</option>
                          <option value="Vintage Oyster Bar">Vintage Oyster Bar (Warm Wood & Live Shucking)</option>
                          <option value="Atrium Gazebo">Atrium Gazebo (Quiet, Intimate with Fountain View)</option>
                          <option value="Cozy Mezzanine">Cozy Mezzanine (Balcony Vista, Private and Calm)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Date */}
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-300">
                          Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={reserveForm.date}
                          onChange={handleInputChange}
                          className="w-full bg-[#060B11] border border-[#1A2633] focus:border-[#E5C16C] rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                        />
                      </div>

                      {/* Time Slot */}
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-300">
                          Preferred Hour
                        </label>
                        <select
                          name="time"
                          value={reserveForm.time}
                          onChange={handleInputChange}
                          className="w-full bg-[#060B11] border border-[#1A2633] focus:border-[#E5C16C] rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="12:30">12:30 PM (Lunch)</option>
                          <option value="13:30">01:30 PM (Lunch)</option>
                          <option value="19:00">07:00 PM (Sunset Dinner)</option>
                          <option value="19:30">07:30 PM (Peak Dinner)</option>
                          <option value="20:30">08:30 PM (Night Dinner)</option>
                          <option value="21:30">09:30 PM (Late Night Seafood)</option>
                        </select>
                      </div>

                      {/* Guest Count */}
                      <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-300">
                          Guest Volume
                        </label>
                        <select
                          name="guests"
                          value={reserveForm.guests}
                          onChange={handleInputChange}
                          className="w-full bg-[#060B11] border border-[#1A2633] focus:border-[#E5C16C] rounded px-4 py-3 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="1">1 Captain</option>
                          <option value="2">2 Guests (Standard Couple)</option>
                          <option value="4">4 Guests (Family Cluster)</option>
                          <option value="6">6 Guests (Large Sovereign Party)</option>
                          <option value="8">8+ Guests (Celebratory Feast)</option>
                        </select>
                      </div>
                    </div>

                    {/* Special Notes */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-bold text-slate-300">
                        Special Requests & Preferences
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="e.g. Birthday anniversary toast, seafood allergies we should record, quiet corner requested."
                        value={reserveForm.notes}
                        onChange={handleInputChange}
                        className="w-full bg-[#060B11] border border-[#1A2633] focus:border-[#E5C16C] rounded px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#E5C16C] hover:bg-[#D4AF37] text-[#060B11] py-4 rounded font-bold uppercase text-xs tracking-widest leading-none transition-colors duration-200 shadow-lg"
                    >
                      {isSubmitting ? "Generating Confirmation Ticket..." : "Instant Desk Reservation & Access Pass"}
                    </button>
                  </motion.form>
                ) : (
                  // Reservation Ticket (Success state)
                  <motion.div
                    key="reservation-ticket"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center py-6"
                  >
                    <div className="w-16 h-16 bg-[#E5C16C]/10 rounded-full border border-[#E5C16C]/30 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-[#E5C16C]" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-2xl text-white font-medium">Table Reserved Successfully!</h4>
                      <p className="text-xs text-slate-400">Save your digital boarding pass below. We look forward to hosting you.</p>
                    </div>

                    {/* Highly aesthetic Restaurant Boarding Pass */}
                    <div className="bg-[#050C14] border border-[#E5C16C]/30 rounded-lg overflow-hidden text-left shadow-2xl relative max-w-md mx-auto">
                      {/* Ticket header */}
                      <div className="bg-gradient-to-r from-[#A68032] to-[#E5C16C] px-5 py-3 flex justify-between items-center text-black">
                        <div>
                          <div className="font-serif text-xs font-bold uppercase tracking-wider">Oyster Bay Gastronomy</div>
                          <div className="text-[9px] tracking-widest uppercase">Mysuru, Vijayanagar</div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-sm font-bold tracking-widest bg-black/10 px-2.5 py-1 rounded">
                            {bookedTicket.code}
                          </span>
                        </div>
                      </div>

                      {/* Ticket body */}
                      <div className="p-5 space-y-4">
                        <div className="grid grid-cols-2 gap-4 border-b border-[#1A2633] pb-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Lead Guest</span>
                            <span className="text-sm font-semibold text-[#E5C16C] font-serif pr-2">{bookedTicket.name}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Contact Phone</span>
                            <span className="text-xs text-slate-300 font-mono">{bookedTicket.phone}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b border-[#1A2633] pb-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Proposed Date</span>
                            <span className="text-xs font-semibold text-slate-300 flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1 text-[#E5C16C]" />
                              {bookedTicket.date}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Designated Hour</span>
                            <span className="text-xs font-semibold text-slate-300 flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1 text-[#E5C16C]" />
                              {bookedTicket.time} PM
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-b border-[#1A2633] pb-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Seating Zone</span>
                            <span className="text-xs text-slate-300 font-medium">{bookedTicket.section}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Guest Count</span>
                            <span className="text-xs text-[#E5C16C] font-medium flex items-center mt-1">
                              <Users className="h-3 w-3 mr-1" />
                              {bookedTicket.guests} Guests
                            </span>
                          </div>
                        </div>

                        {bookedTicket.notes && (
                          <div className="bg-[#0A121D] p-3 rounded border border-[#1A2633]">
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 block mb-1">Kitchen Advisory Notes</span>
                            <p className="text-xs text-slate-400 italic">"{bookedTicket.notes}"</p>
                          </div>
                        )}

                        <div className="text-[9px] text-slate-500 text-center uppercase tracking-widest pt-1">
                          Show this credential block on arrival and enjoy 4.1★ hospitality
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setBookedTicket(null)}
                      className="text-slate-400 hover:text-white text-xs underline font-semibold focus:outline-none transition-colors"
                    >
                      Book Another Seating Plan
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[#E5C16C] tracking-widest text-xs font-bold uppercase block">
                  Reservation Guidelines
                </span>
                <h3 className="font-serif text-3xl font-semibold text-white leading-tight">
                  Uncompromised Hospitality Awaits
                </h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-[#A68032] to-[#E5C16C]"></div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed tracking-wide">
                We strongly advise booking your seating cards in advance, particularly for peak weekend dinners and major holidays, to ensure our chefs can prepare exclusive cuts of lobsters and oysters matching your arrivals.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#E5C16C]/10 p-2.5 rounded border border-[#E5C16C]/20 text-[#E5C16C] shrink-0 mt-1">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">Seating Grace Period</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Reserved tables are held for a maximum of 15 minutes past the scheduled hour before release. Please call 099000 37368 if running late.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#E5C16C]/10 p-2.5 rounded border border-[#E5C16C]/20 text-[#E5C16C] shrink-0 mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">Dress Attire Code</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      To preserve our fine-dining atmosphere, we recommend smart casual or traditional formal wear. Sportswear and open beach sandals are discouraged.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#E5C16C]/10 p-2.5 rounded border border-[#E5C16C]/20 text-[#E5C16C] shrink-0 mt-1">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">Private Celebrations</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      For parties exceeding 10 delegates or customized culinary banqueting, please coordinate directly with our Maitre D’ at 099000 37368.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REVIEWS SEGMENT */}
      <section id="reviews" className="py-24 bg-[#060B11] relative border-t border-[#1A2633]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#E5C16C] tracking-widest text-xs font-bold uppercase block">
              3,698 Stories of Dining Perfection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              Honored by our Guests
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#E5C16C] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {GUEST_REVIEWS.map((rev) => (
              <div 
                key={rev.author}
                className="bg-[#0A121D]/60 p-8 rounded-lg border border-[#1A2633]/60 shadow-xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < rev.rating ? "text-[#E5C16C] fill-[#E5C16C]" : "text-slate-700"}`} 
                      />
                    ))}
                  </div>

                  <p className="text-sm text-slate-350 tracking-wide font-sans leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#1A2633] pt-4">
                  <div>
                    <h5 className="text-white text-sm font-semibold">{rev.author}</h5>
                    <span className="text-[10px] text-slate-500">Verified Dinner Guest</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Review */}
          <div className="mt-14 text-center">
            <a 
              href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-[#E5C16C] hover:text-[#d3a339] text-xs uppercase tracking-widest font-bold transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Read All 3,698 Google Reviews</span>
              <ChevronRight className="h-3 w-3" />
            </a>
          </div>

        </div>
      </section>

      {/* DIRECTIONS & LOCATION SECTION */}
      <section id="directions" className="py-24 bg-[#091018] relative border-t border-[#1A2633]/60 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#E5C16C]/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Info panel */}
            <div className="lg:col-span-5 space-y-8 relative z-10">
              <div className="space-y-3">
                <span className="text-[#E5C16C] tracking-widest text-xs font-bold uppercase block">
                  Find Our Haven
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">
                  We look forward to welcoming you
                </h3>
                <div className="h-0.5 w-20 bg-gradient-to-r from-[#A68032] to-[#E5C16C]"></div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed tracking-wide">
                Nestled near the historic Vijayanagar Water Tank in Mysuru, Oyster Bay offers secure, private valet parking space for our fine-dining guests in a peaceful, garden-rich neighborhood atmosphere.
              </p>

              {/* Detailed specification list */}
              <div className="space-y-6">
                {/* Physical address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#E5C16C]/10 p-3 rounded border border-[#E5C16C]/20 text-[#E5C16C] shrink-0 mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-white text-xs uppercase tracking-widest font-bold mb-1">Our Address</h5>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      Kannada Parishath Road, Vijayanagar, 2nd Stage,<br />
                      near Water tank, Mysuru, Karnataka 570017
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#E5C16C]/10 p-3 rounded border border-[#E5C16C]/20 text-[#E5C16C] shrink-0 mt-1">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-white text-xs uppercase tracking-widest font-bold mb-1">Restaurant Hours</h5>
                    <div className="space-y-1 text-slate-300 text-sm">
                      <p className="flex justify-between">
                        <span className="font-medium">Lunch:</span>
                        <span className="pl-4 font-mono text-xs">12:00 PM — 04:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium">Dinner:</span>
                        <span className="pl-4 font-mono text-xs">06:30 PM — 11:30 PM</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#E5C16C]/10 p-3 rounded border border-[#E5C16C]/20 text-[#E5C16C] shrink-0 mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-white text-xs uppercase tracking-widest font-bold mb-1">Direct Hotline</h5>
                    <a 
                      href="tel:09900037368"
                      className="text-[#E5C16C] hover:text-[#d4af37] text-lg font-mono font-bold block transition-colors duration-200"
                    >
                      099000 37368
                    </a>
                    <span className="text-[10px] text-slate-500">Tap to call our booking desk directly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Map Preview & Actions Column */}
            <div className="lg:col-span-7 relative">
              <div className="bg-[#0A121D] border border-[#1A2633] rounded-xl p-8 shadow-2xl relative overflow-hidden space-y-6">
                
                {/* Visual Map Representation (Elegant design alternative to iframe map block) */}
                <div className="aspect-[16/10] bg-[#06111B] rounded-lg border border-[#1A2633] flex flex-col items-center justify-center relative overflow-hidden group">
                  {/* Stylized background lines mimicking road grid */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#112233_1px,transparent_1px),linear-gradient(to_bottom,#112233_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                  
                  {/* Glowing core location pinpoint */}
                  <div className="relative z-10 flex flex-col items-center space-y-3.5">
                    <div className="relative animate-bounce">
                      <div className="absolute h-9 w-9 bg-[#E5C16C]/30 rounded-full animate-ping pointer-events-none -left-1.5 -top-1.5"></div>
                      <div className="h-6 w-6 bg-gradient-to-tr from-[#A68032] to-[#E5C16C] rounded-full flex items-center justify-center border-2 border-white shadow-lg relative">
                        <Anchor className="h-3.5 w-3.5 text-[#060B11]" />
                      </div>
                    </div>
                    <div className="text-center space-y-1">
                      <h4 className="font-serif text-white font-bold tracking-wide text-sm">Oyster Bay — Mysuru</h4>
                      <p className="text-[11px] text-slate-400">Kannada Parishath Road, 2nd Stage, Vijayanagar</p>
                      <p className="text-[10px] text-[#E5C16C] font-semibold italic">📍 Near the Water Tank Landmark</p>
                    </div>
                  </div>

                  {/* Aesthetic visual HUD indicators */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md border border-[#1A2633] text-[10px] text-slate-400 px-3 py-1.5 rounded uppercase tracking-widest font-mono">
                    Lat 12.3381 / Lon 76.6083
                  </div>

                  <div className="absolute top-4 right-4 bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest font-semibold flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                    <span>Verified Spot</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs text-slate-400 leading-relaxed font-sans">
                    Tap below to launch Google Maps and get instant navigation routes from anywhere in Mysuru directly to our private parking facility.
                  </div>

                  {/* Primary Google Maps Navigation Link Button */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#0E1B29] hover:bg-[#15273C] text-white border border-[#E5C16C]/40 hover:border-[#E5C16C] py-4 rounded font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-3 transition-all duration-300 shadow-md group"
                  >
                    <Map className="h-4 w-4 text-[#E5C16C] group-hover:scale-110 transition-transform" />
                    <span>Launch Google Maps Route Finder</span>
                  </a>
                </div>

              </div>

              {/* Styled background border alignment */}
              <div className="absolute -inset-2.5 rounded-xl border border-[#E5C16C]/15 -z-10 pointer-events-none transform -translate-x-3 translate-y-3"></div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#04080D] border-t border-[#1A2633]/60 pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#1A2633]/50">
            
            {/* Logo and Intro branding */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 bg-gradient-to-tr from-[#A68032] to-[#E5C16C] rounded-full flex items-center justify-center">
                  <Anchor className="h-4 w-4 text-[#060B11]" />
                </div>
                <div>
                  <span className="font-serif text-xl tracking-widest text-[#E5C16C] font-semibold block">
                    OYSTER BAY
                  </span>
                  <span className="text-[9px] tracking-widest uppercase text-slate-500 block">
                    Fine Dining Seafood Restaurant
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-sans max-w-sm leading-relaxed tracking-wide">
                Proudly serving magnificent ocean shellfish delicacies and premium coastal fusions right inside beautiful Vijayanagar, Mysuru. Certified fine-dining landmark.
              </p>
            </div>

            {/* Quick Jumps */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="text-[#E5C16C] text-xs font-bold uppercase tracking-widest">Navigation</h5>
              <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-[#E5C16C] transition-colors">Our Story</button></li>
                <li><button onClick={() => scrollToSection("menu")} className="hover:text-[#E5C16C] transition-colors">Curated Food Menu</button></li>
                <li><button onClick={() => scrollToSection("reservation-hub")} className="hover:text-[#E5C16C] transition-colors">Seat Bookings</button></li>
                <li><button onClick={() => scrollToSection("reviews")} className="hover:text-[#E5C16C] transition-colors">Guest Feedbacks</button></li>
                <li><button onClick={() => scrollToSection("directions")} className="hover:text-[#E5C16C] transition-colors">Location Directions</button></li>
              </ul>
            </div>

            {/* Landmarks details */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="text-[#E5C16C] text-xs font-bold uppercase tracking-widest">Heritage Location</h5>
              <div className="text-xs text-slate-400 font-sans space-y-2.5">
                <p className="leading-relaxed">
                  Kannada Parishath Road, Vijayanagar, 2nd Stage,<br />
                  near Water tank, Mysuru,<br />
                  Karnataka, India 570017
                </p>
                <p className="pt-1.5 flex items-center text-[#E5C16C] font-medium">
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  <span>Call: 099000 37368</span>
                </p>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[10px] font-sans uppercase tracking-widest gap-4">
            <div>
              &copy; {new Date().getFullYear()} Oyster Bay Restaurant. All rights Reserved.
            </div>
            <div>
              Fine Dining Seafood • Vijayanagar, Mysuru, Karnataka
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}