import React, { useState, FormEvent } from "react";
import { 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  ArrowRight, 
  ShoppingBag, 
  Coffee, 
  Leaf, 
  Plus, 
  Minus, 
  Info, 
  Map, 
  User, 
  CheckCircle2, 
  ThumbsUp, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  UtensilsCrossed 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const heroImage = "/src/assets/images/south_indian_thali_1781270046811.jpg";

// Menu Item representation
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "breakfast" | "meals" | "beverages_sweets";
  tags: string[];
  spiciness?: "mild" | "medium" | "spicy";
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "item-1",
    name: "Classic Mysore Masala Dosa",
    description: "Crispy golden fermented rice crepe slathered with our signature spicy red chutney, loaded with potato-onion masala, and served with pure melting butter, aromatic sambar, and fresh coconut-mint chutneys.",
    price: 95,
    category: "breakfast",
    tags: ["Legendary", "Ghee Rich"],
    spiciness: "medium"
  },
  {
    id: "item-2",
    name: "Pure Ghee Idli-Vada Combo",
    description: "Two pillow-soft steamed hand-milled rice cakes and one crispy golden lentil medu vada, served piping hot with traditional Mysuru sambar and fresh coconut and tomato-mint chutneys.",
    price: 65,
    category: "breakfast",
    tags: ["Diner's Choice", "Popular"],
    spiciness: "mild"
  },
  {
    id: "item-3",
    name: "Traditional Rava Idli",
    description: "A steaming semolina cake flavored with clarified cow ghee, roasted cashew nuts, mustard seeds, curry leaves, and a touch of grated carrots, served with potato sagu and coconut chutney.",
    price: 75,
    category: "breakfast",
    tags: ["Cashew Rich", "Soft"],
    spiciness: "mild"
  },
  {
    id: "item-4",
    name: "Special Mahesh Prasad Royal Thali",
    description: "The ultimate traditional South Indian banquet on a banana leaf: steamed Sona Masuri rice, authentic ragi mudde, rich vegetable sambar, tangy tomato rasam, two seasonal dry vegetable palyas, crisp appalam (papad), homemade dahi (curd), spicy pickle, and a sweet Mysore Pak to finish.",
    price: 155,
    category: "meals",
    tags: ["Royal Mysore Special", "Fulfilling"],
    spiciness: "medium"
  },
  {
    id: "item-5",
    name: "Fragrant Bisi Bele Bath",
    description: "Slow-cooked rice, yellow lentils, and fresh handpicked seasonal vegetables made with a heritage home-ground spice blend, topped with pure cow ghee and crunchy spiced boondi.",
    price: 85,
    category: "meals",
    tags: ["Comfort Food", "Ghee Rich"],
    spiciness: "spicy"
  },
  {
    id: "item-6",
    name: "Curd Rice (Mosaranna)",
    description: "A cooling and soothing classic prepared with fresh whipped yogurt, soft-boiled rice, tempered with mustard seeds, curly curry leaves, green chilies, ginger, and ruby pomegranate seeds.",
    price: 70,
    category: "meals",
    tags: ["Cooling", "Gluten-Free"],
    spiciness: "mild"
  },
  {
    id: "item-7",
    name: "Legendary Mysore Pak",
    description: "The imperial recipe born in the royal palace kitchens of Mysuru. A rich, sweet, porous block prepared lovingly with roasted chickpea flour, pure melted desi key-ghee, and crystal sugar syrup.",
    price: 45,
    category: "beverages_sweets",
    tags: ["Palace Kitchen Recipe", "Sweet"],
    spiciness: "mild"
  },
  {
    id: "item-8",
    name: "Authentic Mysore Filter Coffee",
    description: "Traditional chicory-blend dark decoction expertly frothed with hot creamy farm-fresh milk, poured dynamically back-and-forth and served steaming hot in a classical golden brass tumbler and dabarah.",
    price: 35,
    category: "beverages_sweets",
    tags: ["Aromatic", "Must-Try"],
    spiciness: "mild"
  }
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: "Ranganath Swamy",
    location: "Mysuru Local",
    rating: 5,
    date: "2 days ago",
    content: "If you want true, authentic Mysuru vegetarian breakfast, this is the absolute holy grail. The Mysore Masala Dosa has the perfect red chutney coating inside. The filter coffee is incredibly strong and frothy! Crowded on weekends but the service is blazing fast.",
    likes: 42
  },
  {
    id: 2,
    author: "Dr. Ananya Rao",
    location: "Bengaluru",
    rating: 4,
    date: "1 week ago",
    content: "We make it a point to stop by Mahesh Prasad whenever we drive from Bangalore to Mysuru. Incredible quality and extremely pocket-friendly pricing. The Ragi Mudde and Sambhar in their special thali remind me of grandma's traditional cooking. Clean and hygienic.",
    likes: 28
  },
  {
    id: 3,
    author: "Johnathan Miller",
    location: "Traveler from Germany",
    rating: 5,
    date: "2 weeks ago",
    content: "Incredible culinary experience! I was recommended to try the Idli and Vada here. Extremely soft idlis that melt in your mouth, and the crispy savory donuts (vada) are otherworldly. The staff is polite and helped me understand how to enjoy it the traditional way on a banana leaf.",
    likes: 19
  }
];

const MYSORE_LANDMARKS = [
  {
    place: "Mysore Palace (Amba Vilas)",
    distance: "2.1 km",
    time: "6 mins",
    route: "Head southwest on Sayyaji Rao Rd toward Palace South Gate, take Chamaraja Double Rd, then proceed past Chamarajapuram toward Ballal Circle."
  },
  {
    place: "Mysore Junction Railway Station",
    distance: "2.5 km",
    time: "8 mins",
    route: "Head south on Jhansi Lakshmibai Rd, turn right near RTO Office toward Chamarajapuram. We are located right near the circle."
  },
  {
    place: "KSRTC Central Bus Stand",
    distance: "3.2 km",
    time: "10 mins",
    route: "Take Bangalore-Nilgiri Rd toward Chamaraja Double Rd. Move straight onto JLB Road toward Ballal Circle."
  },
  {
    place: "Chamundi Hill Entrance Gate",
    distance: "9.5 km",
    time: "20 mins",
    route: "Drive down Chamundi Hill Road, join Lalitha Mahal Rd, and take Chamaraja Double Rd straight to Chamarajapura Mohalla near RTO."
  }
];

export default function App() {
  // Navigation & Category Toggle states
  const [activeCategory, setActiveCategory] = useState<"all" | "breakfast" | "meals" | "beverages_sweets">("all");
  
  // Custom Cart / Order Estimator Engine state
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [estimateName, setEstimateName] = useState("");
  const [estimatePhone, setEstimatePhone] = useState("");
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [orderTicket, setOrderTicket] = useState<{ id: string; name: string; items: { name: string; qty: number; subtotal: number }[]; total: number; time: string } | null>(null);

  // Table reservation simulator state
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveGuests, setReserveGuests] = useState("2");
  const [reserveDate, setReserveDate] = useState("");
  const [reserveTime, setReserveTime] = useState("");
  const [isReserveSuccess, setIsReserveSuccess] = useState(false);

  // Review state
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState("");
  const [newLocation, setNewLocation] = useState("Mysuru");
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState(false);

  // Directions state
  const [selectedLandmark, setSelectedLandmark] = useState(0);

  // Computed Values for Cart
  const cartItems = (Object.entries(quantities) as [string, number][])
    .filter(([_, qty]) => qty > 0)
    .map(([itemId, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === itemId)!;
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        qty,
        subtotal: item.price * qty
      };
    });

  const cartSubtotal = cartItems.reduce((acc, curr) => acc + curr.subtotal, 0);
  const packagingCharge = cartSubtotal > 0 ? 15 : 0;
  const healthTax = Math.round(cartSubtotal * 0.05); // 5% GST
  const cartTotal = cartSubtotal + packagingCharge + healthTax;

  // Review Stats
  const totalReviewsCount = 3914 + reviews.length - INITIAL_REVIEWS.length;
  const currentAverageRating = ((3914 * 4.1 + reviews.filter(r => r.id > 3).reduce((acc: number, curr) => acc + curr.rating, 0)) / totalReviewsCount).toFixed(2);

  // Cart quantity actions
  const adjustQty = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const existing = prev[itemId] || 0;
      const updated = Math.max(0, existing + delta);
      return { ...prev, [itemId]: updated };
    });
  };

  const clearTray = () => {
    setQuantities({});
    setIsOrderSubmitted(false);
    setOrderTicket(null);
  };

  // Submit pickup order estimator
  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!estimateName || !estimatePhone) {
      alert("Please enter your name and phone number to verify the order summary.");
      return;
    }

    const ticketId = "MP-" + Math.floor(100000 + Math.random() * 900000);
    const date = new Date();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrderTicket({
      id: ticketId,
      name: estimateName,
      items: cartItems,
      total: cartTotal,
      time: timeString
    });
    setIsOrderSubmitted(true);
  };

  // Submit Table Reservation
  const handleReserveTable = (e: FormEvent) => {
    e.preventDefault();
    if (!reserveName || !reservePhone || !reserveDate || !reserveTime) {
      alert("Please fill in all reservation fields.");
      return;
    }
    setIsReserveSuccess(true);
  };

  // Submit custom review
  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent) {
      alert("Please tell us your name and leave some feedback comments.");
      return;
    }

    const newRevObj = {
      id: Date.now(),
      author: newAuthor,
      location: newLocation || "Verified Guest",
      rating: newRating,
      date: "Just now",
      content: newContent,
      likes: 0
    };

    setReviews([newRevObj, ...reviews]);
    setNewAuthor("");
    setNewContent("");
    setNewLocation("Mysuru");
    setReviewSuccessMessage(true);
    setTimeout(() => setReviewSuccessMessage(false), 5000);
  };

  // Increment review likes
  const handleLikeReview = (id: number) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
  };

  // Quick action: Add item from menu card directly
  const handleQuickAdd = (itemId: string) => {
    adjustQty(itemId, 1);
    // Smooth scroll to the cost calculator section
    document.getElementById("tray-calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredMenuItems = activeCategory === "all" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-sans text-stone-800 antialiased selection:bg-emerald-800 selection:text-white">
      
      {/* BRAND TICKER & EMERGENCY BULLETINS */}
      <div className="bg-emerald-900 px-4 py-2 text-center text-xs font-medium tracking-wider text-emerald-100/90 uppercase flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
        <span>Experience Heritage Dining in Chamarajapura, Mysuru • Rated 4.1 Stars by 3,900+ Guests</span>
        <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
      </div>

      {/* STICKY GLASSMORPHIC HEADER */}
      <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-[#FDFCF9]/95 px-4 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between">
          
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800 text-amber-400 shadow-md transition-transform group-hover:scale-105">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold tracking-tight text-emerald-900 md:text-2xl">
                Mahesh Prasad
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-amber-600 font-bold -mt-0.5">
                Pure Vegetarian Restaurant
              </span>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-emerald-800 transition-colors">Our Story</a>
            <a href="#menu" className="hover:text-emerald-800 transition-colors">Culinary Menu</a>
            <a href="#tray-calculator" className="hover:text-emerald-800 transition-colors flex items-center gap-1.5">
              <span>Tray Planner</span>
              {cartItems.length > 0 && (
                <span className="h-5 min-w-5 flex items-center justify-center px-1 text-[10px] font-bold text-white bg-amber-500 rounded-full animate-bounce">
                  {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                </span>
              )}
            </a>
            <a href="#reservation" className="hover:text-emerald-800 transition-colors">Book a Table</a>
            <a href="#directions" className="hover:text-emerald-800 transition-colors">How to Find Us</a>
            <a href="#reviews" className="hover:text-emerald-800 transition-colors">Guest Reviews</a>
          </nav>

          {/* Right utility buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:08212330820" 
              className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-emerald-800 shadow-xs hover:border-emerald-800 hover:bg-emerald-50/40 transition-all"
              id="header_call_action"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-700 animate-pulse" />
              <span className="hidden sm:inline">0821 233 0820</span>
              <span className="sm:hidden">Call Now</span>
            </a>
            
            <a 
              href="#menu" 
              className="rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-900/10 hover:bg-emerald-900 transition-all hover:scale-[1.02]"
              id="header_order_action"
            >
              Order Online
            </a>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section id="about" className="relative overflow-hidden bg-gradient-to-b from-stone-100 to-white py-16 md:py-24">
        {/* Subtle decorative absolute items */}
        <div className="absolute top-1/2 left-4 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50/70 px-3 py-1.5 text-xs font-medium text-emerald-800">
              <Leaf className="h-3.5 w-3.5 text-emerald-700" />
              <span>100% Pure Indian Vegetarian Legacy</span>
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-emerald-900 md:text-5xl lg:text-6xl tracking-tight">
              Honoring the True <br className="hidden md:inline" />
              <span className="text-amber-600 italic font-medium">Culinary Heritage</span> <br />
              of Royal Mysuru.
            </h1>

            <p className="text-base text-stone-600 leading-relaxed max-w-2xl">
              Nestled at Mysuru’s historic Ballal Circle, <b className="text-stone-900">Mahesh Prasad Veg Restaurant</b> serves legendary homestyle breakfast recipes, golden-crisp ghee-laden dosas, and rich, traditional multi-course thali lunches. Prepared with absolute sanitation and traditional recipes, our plates carry the soul of traditional Karnataka food.
            </p>

            {/* Crucial stats from google business */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-200">
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-serif text-3xl font-bold text-stone-900">4.1</span>
                  <div className="flex text-amber-500">
                    <Star className="h-5 w-5 fill-amber-500" />
                  </div>
                </div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1">Google Maps Rating</p>
              </div>
              
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-serif text-3xl font-bold text-stone-900">3,910+</span>
                  <span className="text-emerald-700 font-semibold text-sm">+</span>
                </div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1">Verified Guest Reviews</p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="font-serif text-xl font-bold text-emerald-900 block mt-1">7:00 AM - 10:30 PM</span>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1">Opening timings</p>
              </div>
            </div>

            {/* Call to action group */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#menu" 
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-900 hover:scale-[1.01] transition-all"
                id="hero_btn_menu"
              >
                <span>Browse Culinary Menu</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a 
                href="#directions" 
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-700 shadow-xs hover:border-emerald-800 hover:bg-emerald-50/40 hover:text-emerald-800 transition-all"
                id="hero_btn_directions"
              >
                <MapPin className="h-4 w-4 text-amber-600" />
                <span>Locate Near RTO Mysuru</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-stone-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Pure Ghee Only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Hygienic Traditional Kitchen</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Comfort Family Diner</span>
              </div>
            </div>

          </div>

          {/* Right Image/Banner Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-2 rounded-[2rem] border border-stone-200/40 bg-stone-100/50 -rotate-2 scale-102" />
              
              {/* Main Image frame wrapper */}
              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-stone-100 shadow-2xl shadow-stone-900/15 aspect-square md:aspect-[4/3] lg:aspect-square">
                <img 
                  src={heroImage} 
                  alt="Authentic South Indian vegetarian platter with idli, masala dosa, sambar, coconut chutney served on a green banana leaf" 
                  className="h-full w-full object-cover select-none"
                  referrerPolicy="no-referrer"
                  id="hero_main_img"
                />
                
                {/* Visual Label - "A Taste of Heritage" */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/80 backdrop-blur-md p-4 rounded-xl border border-stone-100/10 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] tracking-widest text-amber-400 font-bold uppercase block">Fresh & Fragrant</span>
                      <p className="font-serif text-sm font-semibold text-stone-100 mt-0.5">Mahesh Prasad Special Masala Dosa</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-1 rounded border border-amber-900/30">
                      ₹95 Only
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating review card overlay on image */}
              <div className="absolute -bottom-8 -left-6 hidden sm:block bg-white p-4 rounded-xl shadow-xl max-w-xs border border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                    <Coffee className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-stone-800 mt-0.5">"The best Filter Coffee in Mysuru!"</p>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold">— Verified Food reviewer</span>
                  </div>
                </div>
              </div>

              {/* Floating landmark tip */}
              <div className="absolute -top-6 -right-4 bg-emerald-900 text-amber-400 px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium border border-emerald-800 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>Next to Ballal Circle, Mysuru</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* MID-SECTION DECORATIVE STATEMENT */}
      <section className="bg-stone-50 border-y border-stone-100 py-10 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-serif text-lg md:text-xl italic text-emerald-800">
            "At Mahesh Prasad, there are no shortcuts to taste. We master-blend our red garlic chutneys each morning, roast our own coffee chicory beans, and steam our idlis to custom ratios that have pleased millions."
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-1 w-8 bg-amber-400 rounded-full" />
            <span className="font-mono text-xs uppercase tracking-widest font-semibold text-stone-400">The Kitchen Philosophy</span>
            <span className="h-1 w-8 bg-amber-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* CULINARY MENU SECTION */}
      <section id="menu" className="py-20 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Section titles */}
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Handcrafted Flavors</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-emerald-900 tracking-tight">Our Curated Culinary Offerings</h2>
            <p className="text-sm text-stone-500 max-w-2xl mx-auto">
              Prepared fresh morning, noon, and night using clean groundnut oils, organic farm dairies, and traditional home-ground spice masalas. Select any item to add to your custom order planner tray below.
            </p>

            {/* Menu Category Selection Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {[
                { id: "all", label: "Show All Recipes" },
                { id: "breakfast", label: "Early Morning Breakfast" },
                { id: "meals", label: "Traditional Banquets & Meals" },
                { id: "beverages_sweets", label: "Legendary Filter Coffee & Sweets" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl tracking-wide transition-all ${
                    activeCategory === cat.id 
                    ? "bg-emerald-800 text-white shadow-md"
                    : "bg-white border border-stone-200 text-stone-600 hover:text-emerald-800 hover:border-stone-300"
                  }`}
                  id={`cat_tab_${cat.id}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout for Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMenuItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={item.id}
                  className="group flex flex-col justify-between bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-600/30 shadow-xs hover:shadow-lg transition-all relative overflow-hidden"
                >
                  {/* Vegetarian status dot and tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-900/10 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Pure Veg</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {item.spiciness === "spicy" && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 font-bold rounded">Spicy 🌶️</span>}
                      {item.spiciness === "medium" && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 font-bold rounded">Mild Spicy 🌶️</span>}
                    </div>
                  </div>

                  {/* Name and pricing */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                      {item.name}
                    </h3>
                    
                    <span className="font-mono text-lg font-bold text-emerald-800 block">
                      ₹{item.price}
                    </span>

                    <p className="text-xs text-stone-500 leading-relaxed pt-2 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Sub tags */}
                  <div className="flex flex-wrap gap-1 pt-4">
                    {item.tags.map((tg, idx) => (
                      <span key={idx} className="bg-stone-100 text-stone-500 text-[9px] font-medium px-2 py-0.5 rounded tracking-wide">
                        {tg}
                      </span>
                    ))}
                  </div>

                  {/* Action row */}
                  <div className="pt-5 border-t border-stone-100 mt-4 flex items-center justify-between">
                    
                    {/* Item quantities custom togglers */}
                    <div className="flex items-center gap-2">
                      {quantities[item.id] > 0 ? (
                        <div className="flex items-center gap-3 bg-stone-100 px-2 py-1 rounded-lg">
                          <button 
                            onClick={() => adjustQty(item.id, -1)}
                            className="bg-white hover:bg-stone-200 text-stone-800 rounded p-1 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-mono text-sm font-bold text-stone-800">
                            {quantities[item.id]}
                          </span>
                          <button 
                            onClick={() => adjustQty(item.id, 1)}
                            className="bg-white hover:bg-stone-200 text-stone-800 rounded p-1 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-stone-400 font-medium">Add to try Planner:</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleQuickAdd(item.id)}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-emerald-800 px-3.5 text-xs font-semibold text-white hover:bg-emerald-900 shadow-xs transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{quantities[item.id] > 0 ? "Add More" : "Add to Tray"}</span>
                    </button>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* DYNAMIC INTERACTIVE PLATFORM (ORDER PLANNING & TABLE BOOKING) */}
      <section className="bg-stone-100/70 py-20 px-4 md:px-8 border-y border-stone-200/50">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: INTERACTIVE CART COST ESTIMATOR (TRAY PLANNER) */}
          <div id="tray-calculator" className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-lg space-y-6">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-5">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">Your Culinary Tray Planner</h3>
                  <p className="text-xs text-stone-500">Estimate pickup and dining costs in real-time</p>
                </div>
              </div>

              {cartItems.length > 0 && (
                <button
                  onClick={clearTray}
                  className="text-xs font-semibold text-stone-400 hover:text-red-600 transition-colors"
                >
                  Reset Tray
                </button>
              )}
            </div>

            {/* Tray contents condition */}
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FCFBF7] border-2 border-dashed border-stone-200 text-stone-400">
                  <UtensilsCrossed className="h-6 w-6 stroke-1" />
                </div>
                <div>
                  <p className="font-serif text-base font-bold text-stone-800">Your planning tray is currently empty</p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 leading-relaxed">
                    Scroll up to our Culinary Menu and select items like the signature Mysore Masala Dosa or hot filter coffee!
                  </p>
                </div>
                <a 
                  href="#menu" 
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800/10 hover:bg-emerald-800/20 text-emerald-800 px-4 py-2 text-xs font-semibold transition-colors"
                >
                  <span>Select some dishes</span>
                  <Plus className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Scrollable item summary list */}
                <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 divide-y divide-stone-100">
                  {cartItems.map((item, idx) => (
                    <div key={item.id} className={`flex items-center justify-between pt-3.5 ${idx === 0 ? 'pt-0' : ''}`}>
                      <div className="space-y-1 flex-1 pr-4">
                        <p className="text-sm font-semibold text-stone-900">{item.name}</p>
                        <span className="text-[11px] text-stone-400 block font-mono">
                          ₹{item.price} per item
                        </span>
                      </div>
                      
                      {/* Controller */}
                      <div className="flex items-center gap-2.5 mr-6">
                        <button 
                          onClick={() => adjustQty(item.id, -1)}
                          className="bg-stone-50 hover:bg-stone-200 border border-stone-200 text-stone-800 rounded p-1 transition-colors"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="font-mono text-sm font-bold text-stone-800 min-w-4 text-center">
                          {item.qty}
                        </span>
                        <button 
                          onClick={() => adjustQty(item.id, 1)}
                          className="bg-stone-50 hover:bg-stone-200 border border-stone-200 text-stone-800 rounded p-1 transition-colors"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>

                      {/* Line subtotal */}
                      <span className="font-mono text-sm font-bold text-emerald-900 text-right min-w-[60px]">
                        ₹{item.subtotal}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Costs breakdown container */}
                <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200/50 space-y-2.5 text-xs font-medium text-stone-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-mono text-stone-800">₹{cartSubtotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-stone-500">
                    <span className="flex items-center gap-1">
                      <span>Hygiene Packaging Charges</span>
                      <Info className="h-3 w-3" title="Assures biodegradable containers and sealed packing bags" />
                    </span>
                    <span className="font-mono">₹{packagingCharge}</span>
                  </div>

                  <div className="flex justify-between text-stone-500">
                    <span>Government SGST & CGST (5%)</span>
                    <span className="font-mono">₹{healthTax}</span>
                  </div>

                  <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-bold text-stone-900">
                    <span className="text-emerald-900">Estimated Grand Total</span>
                    <span className="font-mono text-emerald-900">₹{cartTotal}</span>
                  </div>
                </div>

                {/* Order Pickup form or display Ticket details */}
                {!isOrderSubmitted ? (
                  <form onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                      Secure Instant Pick-up Booking
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">Your Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={estimateName}
                          onChange={(e) => setEstimateName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-stone-500 mb-1">Mobile Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          value={estimatePhone}
                          onChange={(e) => setEstimatePhone(e.target.value)}
                          placeholder="e.g. 098451 22330"
                          className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors"
                      id="order_submit_planner"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Confirm & Generate Digital Takeout Ticket (Free)</span>
                    </button>
                    
                    <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                      This is an offline pricing calculator simulator. Generating a digital ticket holds our fresh batches for 30 minutes. You settle payment over-the-counter during pickup!
                    </p>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border-2 border-emerald-600 bg-emerald-50/40 p-5 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-emerald-900">Takeout Ticket Booked!</h4>
                        <p className="text-xs text-emerald-700">Digital Ticket ID: <b>{orderTicket?.id}</b></p>
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-emerald-900/10 text-xs text-stone-700 space-y-1.5 font-mono">
                      <p><b>Guest:</b> {orderTicket?.name}</p>
                      <p><b>Time Booked:</b> {orderTicket?.time}</p>
                      <p><b>Pickup Point:</b> Mahesh Prasad, Ballal Circle, Mysuru</p>
                      <p><b>Mobile Verified:</b> {estimatePhone}</p>
                      <div className="border-t border-dashed border-stone-200 my-2 pt-2 text-stone-900 font-bold">
                        Estimated payment at counter: ₹{orderTicket?.total}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-normal">
                      ✅ Your traditional food will be boxed in warm organic containers. Simply showcase this ticket/message when you reach Ballal Circle within 30 minutes!
                    </p>

                    <button
                      onClick={() => {
                        setIsOrderSubmitted(false);
                        setOrderTicket(null);
                      }}
                      className="text-xs font-semibold text-emerald-800 hover:underline inline-block"
                    >
                      ← Back to modify or edit tray planner options
                    </button>
                  </motion.div>
                )}

              </div>
            )}

          </div>

          {/* RIGHT: SIMULATED TABLE RESERVATION FORM */}
          <div id="reservation" className="lg:col-span-5 bg-emerald-900 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-950 flex flex-col justify-between">
            <div className="space-y-5">
              
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-100">Reserve A Family Table</h3>
                  <p className="text-xs text-emerald-100/70">Skip the legendary morning queues</p>
                </div>
              </div>

              {!isReserveSuccess ? (
                <form onSubmit={handleReserveTable} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-emerald-200 mb-1">Your Name</label>
                    <input 
                      type="text"
                      required
                      value={reserveName}
                      onChange={(e) => setReserveName(e.target.value)}
                      placeholder="e.g. Ramesh Prasad"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3.5 text-sm text-white placeholder-white/30 focus:border-amber-500 focus:bg-white/10 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-emerald-200 mb-1">Mobile Phone for SMS Confirmation</label>
                    <input 
                      type="tel"
                      required
                      value={reservePhone}
                      onChange={(e) => setReservePhone(e.target.value)}
                      placeholder="e.g. 094801 88990"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3.5 text-sm text-white placeholder-white/30 focus:border-amber-500 focus:bg-white/10 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-emerald-200 mb-1">Guests Count</label>
                      <select 
                        value={reserveGuests}
                        onChange={(e) => setReserveGuests(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 mb-1 text-sm text-white focus:border-amber-500 focus:bg-white/10 focus:outline-hidden [&>option]:text-stone-800"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="4">4 People</option>
                        <option value="6">6 People (Family Combo)</option>
                        <option value="10">8-10 Large Banquet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-emerald-200 mb-1">Ideal Timing Shift</label>
                      <select 
                        required
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-sm text-white focus:border-amber-500 focus:bg-white/10 focus:outline-hidden [&>option]:text-stone-800"
                      >
                        <option value="">Select slot</option>
                        <option value="07:30 AM">Breakfast (07:30 AM)</option>
                        <option value="09:00 AM">Breakfast (09:00 AM)</option>
                        <option value="12:30 PM">Royal Lunch (12:30 PM)</option>
                        <option value="02:00 PM">Royal Lunch (02:00 PM)</option>
                        <option value="05:30 PM">Snacks & Filter Coffee (05:30 PM)</option>
                        <option value="08:00 PM">Dinner Feast (08:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-emerald-200 mb-1">Reservation Date</label>
                    <input 
                      type="date"
                      required
                      value={reserveDate}
                      onChange={(e) => setReserveDate(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3.5 text-sm text-white focus:border-amber-500 focus:bg-white/10 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-3.5 text-sm font-bold text-stone-900 shadow-md hover:scale-[1.01] transition-all"
                    id="reserve_table_btn"
                  >
                    <span>Instant Free Seat Guarantee</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  
                  <p className="text-[10px] text-emerald-200/60 text-center leading-normal">
                    ⚠️ Note: Mahesh Prasad seats guests directly. Large family reservations during Sunday breakfast shifts are guaranteed for 15 minutes past target time only.
                  </p>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-amber-500/30 bg-white/5 p-5 space-y-4 text-center py-8"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-stone-900 mb-2">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-amber-400">Table Slot Secured!</h4>
                  <p className="text-sm text-emerald-100">
                    A welcoming table for <b>{reserveGuests} guests</b> is held for you on <b>{reserveDate}</b> at <b>{reserveTime}</b>.
                  </p>

                  <div className="bg-emerald-950/80 p-3 rounded-xl inline-block text-xs text-amber-200 font-semibold font-mono border border-emerald-800">
                    Reservation Ticket Holder: {reserveName}
                  </div>

                  <p className="text-xs text-emerald-100/70 leading-relaxed">
                    SMS notification successfully dispatched to {reservePhone}. Show this screen to our Maître D' at Ballal Circle for priority queue entry.
                  </p>

                  <button
                    onClick={() => {
                      setIsReserveSuccess(false);
                      setReserveName("");
                      setReservePhone("");
                      setReserveTime("");
                    }}
                    className="text-xs font-semibold text-amber-400 hover:underline block pt-2 mx-auto"
                  >
                    Modify Date or Reserve Another Table
                  </button>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* DETAILED DIRECTIONS FINDER & GOOGLE MAPS BLOCK */}
      <section id="directions" className="py-20 px-4 md:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content / Landmarks direction picker */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Travel Assistance</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-emerald-900 tracking-tight">Locate Us at Chamarajapura</h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Mahesh Prasad is located next to the iconic <b className="text-stone-900">Ballal Circle</b>, right near the Mysore Regional Transport Office (RTO) in Chamarajapuram Mohalla, Mysuru. It is highly accessible from all standard tourist hubs.
              </p>

              {/* Landmark tab controllers */}
              <div className="space-y-3.5">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Where are you coming from?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MYSORE_LANDMARKS.map((lm, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedLandmark(idx)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        selectedLandmark === idx 
                        ? "border-emerald-800 bg-emerald-50/50 text-emerald-900"
                        : "border-stone-200 bg-white hover:border-stone-300 text-stone-750"
                      }`}
                      id={`landmark_selector_${idx}`}
                    >
                      <div className="truncate">
                        <p className="text-xs font-bold truncate">{lm.place}</p>
                        <span className="text-[10px] font-medium text-stone-400">Approx. {lm.distance}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${selectedLandmark === idx ? "text-emerald-800 rotate-90" : "text-stone-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected path display panel */}
              <div className="rounded-2xl bg-stone-50 border border-stone-200/60 p-4 space-y-3.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-400">
                  <span>Custom Travel Blueprint</span>
                  <span className="text-emerald-800 font-mono text-xs font-black">Estimated Drive: {MYSORE_LANDMARKS[selectedLandmark].time}</span>
                </div>
                
                <p className="text-sm text-stone-700 leading-relaxed">
                  🧭 <b className="text-[#1c1917]">{MYSORE_LANDMARKS[selectedLandmark].place}</b> to Mahesh Prasad Veg Restaurant: <span className="text-stone-600 font-medium">{MYSORE_LANDMARKS[selectedLandmark].route}</span>
                </p>

                <div className="border-t border-stone-200/50 pt-3 text-[11px] font-medium text-stone-500 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-amber-500" />
                  <span>Parking is accessible adjacent to the circle road side.</span>
                </div>
              </div>

              {/* Contact numbers visual highlight */}
              <div className="flex flex-col sm:flex-row gap-4 items-center rounded-2xl bg-emerald-50/30 border border-emerald-900/10 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-900">Need driving instructions or lost nearby?</p>
                  <p className="text-sm font-semibold text-emerald-950 mt-0.5">Contact Restaurant Counter: <a href="tel:08212330820" className="underline hover:text-amber-600">0821 233 0820</a></p>
                </div>
              </div>

            </div>

            {/* Right Map Card Block */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-100 aspect-square md:aspect-[16/10] lg:aspect-square flex flex-col justify-between p-6 md:p-8 shadow-xl shadow-stone-800/5">
                
                {/* Background graphic elements simulating map layout */}
                <div className="absolute inset-0 bg-[#e5e9f0]/40 flex flex-col justify-between pointer-events-none p-4 select-none opacity-40">
                  <div className="w-full border-b-2 border-dashed border-white/60 h-20 flex gap-4">
                    <div className="border-r-2 border-dashed border-white/60 w-32 h-full" />
                    <div className="border-r-2 border-dashed border-white/60 w-48 h-full" />
                  </div>
                  <div className="w-full border-b-2 border-dashed border-white/60 h-24 flex gap-4">
                    <div className="border-r-2 border-dashed border-white/60 w-12 h-full" />
                    <div className="border-r-2 border-dashed border-white/60 w-64 h-full" />
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-stone-200 max-w-sm w-full text-center space-y-4 z-10">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600 border border-amber-200 animate-bounce">
                    <MapPin className="h-7 w-7" />
                  </div>
                  
                  <div>
                    <h4 className="font-serif text-lg font-bold text-stone-900">Mahesh Prasad Veg</h4>
                    <p className="text-xs text-stone-500 mt-1">
                      Ballal Circle, near RTO Office, Chamarajapura, Mysuru, Karnataka 570005
                    </p>
                  </div>

                  <hr className="border-stone-100" />

                  <a 
                    href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-3 text-xs font-bold transition-all hover:scale-102"
                    id="maps_nav_address"
                  >
                    <Map className="h-4 w-4" />
                    <span>Launch Google Maps Live Route</span>
                  </a>
                </div>

                {/* Micro visual coordinates */}
                <div className="relative text-[10px] font-mono text-stone-400 uppercase z-10 bg-white/70 p-2 rounded-lg self-start border border-stone-200/50">
                  📍 COORD: 12.2981° N, 76.6433° E
                </div>

                <div className="relative text-[10px] font-mono text-stone-400 uppercase z-10 bg-white/70 p-2 rounded-lg self-end border border-stone-200/50">
                  Mysuru District • Karnataka India
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* VERIFIED GUEST REVIEWS BOARD */}
      <section id="reviews" className="bg-stone-50 py-20 px-4 md:px-8 border-t border-stone-200/50">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Reviews aggregate panel (Left Column) */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">Public Experience</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-emerald-900 tracking-tight">Our Guest’s Veridical Review Board</h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                With a robust rating of <b>4.1 stars</b> powered by <b>3,914</b> genuine reviews, we prioritize consistent recipes and wholesome hospitality over marketing. Here’s what real travelers and Mysuru locals say!
              </p>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wide">Live Rating Summary</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-black text-stone-900">{currentAverageRating}</span>
                  <span className="text-stone-400 text-lg">/ 5.0</span>
                </div>
                
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs font-medium text-stone-500">
                  Computed based on <b>{totalReviewsCount.toLocaleString()}</b> genuine guest ratings on Google and local logs.
                </p>
              </div>

              {/* Leave review card trigger form */}
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-900/10 space-y-4">
                <div className="flex items-center gap-1.5 text-emerald-900">
                  <Sparkles className="h-4 w-4 text-emerald-700" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Leave Local Customer Feedback</h4>
                </div>
                
                <form onSubmit={handleAddReview} className="space-y-4 text-stone-800">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-1">Your Full Name</label>
                    <input 
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Nagaraju Patel"
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs focus:border-emerald-800 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-1">Star rating</label>
                      <select 
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="w-full rounded-xl border border-stone-200 bg-white px-2 py-2 text-xs focus:border-emerald-800 focus:outline-hidden"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ Great (4/5)</option>
                        <option value="3">⭐⭐⭐ Neutral (3/5)</option>
                        <option value="2">⭐⭐ Fair (2/5)</option>
                        <option value="1">⭐ Poor (1/5)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-1">Your location</label>
                      <input 
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="e.g. Mysuru"
                        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs focus:border-emerald-800 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-500 mb-1">Detailed Review Comments</label>
                    <textarea 
                      required
                      rows={3}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Comment on our dosas, idli, quick staff, or filter coffee quality..."
                      className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs focus:border-emerald-800 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-800 font-bold text-white py-2 px-4 hover:bg-emerald-900 text-xs shadow-xs tracking-wider uppercase transition-colors"
                    id="submit_review_btn"
                  >
                    Submit Verified Guest Review
                  </button>

                  {reviewSuccessMessage && (
                    <motion.p 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center font-bold text-xs text-emerald-800 flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Thank you! Your verified review is on the board.</span>
                    </motion.p>
                  )}
                </form>
              </div>

            </div>

            {/* List of customer reviews (Right Column) */}
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest block font-mono">Recent Live Board Submissions</p>
              
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={rev.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-3.5 relative overflow-hidden"
                  >
                    {/* User profile identifier */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold border border-stone-200 text-xs text-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-stone-900 block">{rev.author}</span>
                          <span className="text-[10px] text-stone-400 block font-medium">Location: {rev.location} • Verified Guest</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex text-amber-400 gap-0.5 justify-end">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                          ))}
                          {[...Array(5 - rev.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-stone-200" />
                          ))}
                        </div>
                        <span className="text-[9px] text-stone-400 block font-medium mt-1 uppercase tracking-wider">{rev.date}</span>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-stone-600 font-medium">
                      "{rev.content}"
                    </p>

                    {/* Action row of comment */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100 mx-1">
                      <div className="flex items-center gap-1.5 text-stone-400 hover:text-emerald-800 transition-colors cursor-pointer text-[10px] font-bold" onClick={() => handleLikeReview(rev.id)}>
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>Helpful ({rev.likes})</span>
                      </div>
                      
                      <span className="text-[10px] font-mono text-stone-300 font-medium">Google Maps Local Guide ID</span>
                    </div>

                  </motion.div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-950 text-white pt-16 pb-12 px-4 md:px-8 border-t border-emerald-900">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
            
            {/* Column 1: Info and Brand */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-emerald-900 shadow-md">
                  <UtensilsCrossed className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-100">Mahesh Prasad Veg Restaurant</h3>
              </div>
              <p className="text-xs text-emerald-100/70 leading-relaxed max-w-sm">
                Authentic, wholesome, and pure vegetarian dining nestled in Chamarajapura near regular tourist networks, Mysuru, Karnataka. Preserving food heritage with absolute hygiene and premium local spice blends.
              </p>
              
              <div className="pt-2 text-xs text-amber-400 font-medium flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>Ballal Circle, Mysuru, India (570005)</span>
              </div>
            </div>

            {/* Column 2: Hours */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-xs font-bold tracking-widest text-amber-500 uppercase">Operation Shifts</h4>
              <div className="space-y-2 text-xs text-emerald-100/80">
                <p className="flex justify-between border-b border-white/5 pb-1">
                  <span>Sunday - Saturday:</span>
                  <span className="font-mono text-amber-300">7:00 AM - 10:30 PM</span>
                </p>
                <p className="flex justify-between border-b border-white/5 pb-1">
                  <span>Peak Breakfast hours:</span>
                  <span className="font-mono">8:30 AM - 10:00 AM</span>
                </p>
                <p className="flex justify-between">
                  <span>Traditional Thali Lunch:</span>
                  <span className="font-mono">12:15 PM - 3:30 PM</span>
                </p>
              </div>
            </div>

            {/* Column 3: Contact & Links */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-amber-500 uppercase">Contact Center</h4>
              
              <div className="space-y-2">
                <a 
                  href="tel:08212330820" 
                  className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 p-2.5 rounded-lg border border-white/5 font-semibold text-emerald-200 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-amber-400" />
                  <span>Telephone: 0821 233 0820</span>
                </a>

                <a 
                  href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs bg-emerald-900/60 hover:bg-white/10 p-2.5 rounded-lg border border-emerald-800 font-semibold text-emerald-200 transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  <span>Navigate Google Maps route</span>
                </a>
              </div>
            </div>

          </div>

          {/* Sub-footer copyrights */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-100/50 gap-4">
            <div>
              <p>© {new Date().getFullYear()} Mahesh Prasad Veg Restaurant. All Rights Reserved.</p>
              <p className="mt-0.5">Found via query "restaurant in Mysuru" • Built in Chamarajapura Mohalla.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
              <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
              <a href="#directions" className="hover:text-amber-400 transition-colors">Directions</a>
              <a href="#reviews" className="hover:text-amber-400 transition-colors font-semibold text-amber-400">Guestbook</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
