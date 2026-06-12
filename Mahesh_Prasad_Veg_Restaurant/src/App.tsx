import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  Heart, 
  Share2, 
  Utensils, 
  Plus, 
  Minus, 
  Sparkles, 
  ThumbsUp, 
  Check, 
  Calendar, 
  Users, 
  ChevronRight, 
  Coffee,
  Leaf,
  Copy,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Paths to the generated high-quality images
const heroImage = "/src/assets/images/mahesh_prasad_hero_1781294769057.jpg";
const ambianceImage = "/src/assets/images/mahesh_prasad_ambiance_1781294786165.jpg";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "all" | "breakfast" | "meals" | "drinks";
  tag?: string;
  rating: number;
  calories: number;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  isLocalGuide?: boolean;
}

const INITIAL_MENU: MenuItem[] = [
  {
    id: "m1",
    name: "Special Masala Dosa",
    price: 110,
    description: "Crispy golden golden-brown crepe spread with signature spicy red Mysore chutney, stuffed with tempered potato palya & topped with clear pure ghee.",
    category: "breakfast",
    tag: "Patron's Favorite",
    rating: 4.9,
    calories: 380,
  },
  {
    id: "m2",
    name: "Ghee Idli Vada Combo",
    price: 95,
    description: "Two pillow-soft steamed rice cakes and one super crispy deep-fried black gram donut. Served with spicy sambar & fresh coconut chutney.",
    category: "breakfast",
    tag: "Best Seller",
    rating: 4.8,
    calories: 290,
  },
  {
    id: "m3",
    name: "Traditional Shavige Bath",
    price: 80,
    description: "Light and flavorful steamed vermicelli tossed with fresh local green peas, carrots, grated coconut, curry leaves, and tempered mustard seeds.",
    category: "breakfast",
    rating: 4.5,
    calories: 240,
  },
  {
    id: "m4",
    name: "Golden Cashew Rava Dosa",
    price: 120,
    description: "Lacy, crispy semolina crepe seasoned with black peppercorns, cumin seed, ginger slices, and loaded with roasted whole cashews.",
    category: "breakfast",
    rating: 4.6,
    calories: 420,
  },
  {
    id: "m5",
    name: "Special South Indian Meals",
    price: 180,
    description: "Our signature afternoon feast. Features hot steamed premium rice, traditional sambar, rasam, kootu, poriyal, papad, fresh curd, and an authentic sweet.",
    category: "meals",
    tag: "Unlimited Rice Top-up",
    rating: 4.9,
    calories: 720,
  },
  {
    id: "m6",
    name: "Mysuru Bisi Bele Bath",
    price: 110,
    description: "Classic spicy hot lentil and rice mash slowly cooked with mixed vegetables, tamarind pulp, ghee, served with crisp potato wafers.",
    category: "meals",
    tag: "Heritage Dish",
    rating: 4.7,
    calories: 480,
  },
  {
    id: "m7",
    name: "Traditional Curd Rice",
    price: 85,
    description: "Creamy, refreshing cooked rice folded into fresh house-made curd, tempered milk, ginger, green chilies, and topped with juicy sweet pomegranate seeds.",
    category: "meals",
    rating: 4.4,
    calories: 310,
  },
  {
    id: "m8",
    name: "Aromatic Filter Coffee",
    price: 45,
    description: "Fabulous chicory-blend coffee brewed in traditional brass filters, combined with bubbling hot milk, and frothed beautifully from a height.",
    category: "drinks",
    tag: "Legendary Brew",
    rating: 5.0,
    calories: 90,
  },
  {
    id: "m9",
    name: "Saffron Badam Milk",
    price: 60,
    description: "Slowly simmered whole milk blended with pure organic almond paste, infused with real Kashmiri saffron strands and crushed green cardamom.",
    category: "drinks",
    rating: 4.7,
    calories: 160,
  },
  {
    id: "m10",
    name: "Special Desi Ghee Mysore Pak",
    price: 70,
    description: "The traditional sweet of the Mysore Royalty. Soft, golden chunks made of roasted gram flour, generous pure desi ghee, and syrup.",
    category: "drinks",
    tag: "Royal Heritage Dessert",
    rating: 4.9,
    calories: 220,
  }
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Ramesh K. Hegde",
    rating: 5,
    date: "1 week ago",
    comment: "The absolute best Masala Dosa in Mysuru! Period. Extremely thin, crispy, and the red chutney they smear inside has a unique rich taste. Filter coffee is spectacular. No wonder it is ranked #1.",
    isLocalGuide: true
  },
  {
    id: "r2",
    author: "Shreya Mahendra",
    rating: 5,
    date: "2 weeks ago",
    comment: "A heritage restaurant near the landmark Ballal Circle. Yes, it has a crowd, but you get your food within 5 minutes. The Ghee Idli melts in your mouth and the coconut chutney is fresh and chilled.",
    isLocalGuide: false
  },
  {
    id: "r3",
    author: "Devanand Sree",
    rating: 4,
    date: "3 weeks ago",
    comment: "Highly cost-effective and completely authentic South Indian cuisine. Their Bisi Bele Bath is robust and deeply flavorful. A Mysuru food spot you absolutely cannot miss.",
    isLocalGuide: true
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "breakfast" | "meals" | "drinks">("all");
  const [tray, setTray] = useState<{ [key: string]: number }>({});
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeTab, setActiveTab] = useState<"menu" | "about" | "reviews">("menu");
  
  // Review form state
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Enquiry/Catering Form State
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCount, setGuestCount] = useState("10");
  const [enquiryDate, setEnquiryDate] = useState("");
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // General Notification Alert State
  const [notifMessage, setNotifMessage] = useState("");

  // Opening hours check
  const [isOpen, setIsOpen] = useState(true);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    // Standard Mysuru Restaurant hours: 7:00 AM to 10:30 PM (22:30)
    const checkStatus = () => {
      const now = new Date();
      // Calculate local time in India (UTC+5:30)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istTime = new Date(utc + (3600000 * 5.5));
      
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const decimalTime = hours + minutes / 60;

      const openingHour = 7.0; // 7:00 AM
      const closingHour = 22.5; // 10:30 PM

      const formattedMin = minutes < 10 ? `0${minutes}` : minutes;
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      
      setTimeString(`${displayHours}:${formattedMin} ${ampm} (IST)`);
      setIsOpen(decimalTime >= openingHour && decimalTime <= closingHour);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Sync tray items to localStorage or just keep react state
  const addToTray = (id: string, name: string) => {
    setTray(prev => {
      const current = prev[id] || 0;
      return { ...prev, [id]: current + 1 };
    });
    triggerNotification(`Added ${name} to your custom Feast Tray!`);
  };

  const removeFromTray = (id: string) => {
    setTray(prev => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const clearTray = () => {
    setTray({});
    triggerNotification("Feast Tray cleared.");
  };

  const triggerNotification = (msg: string) => {
    setNotifMessage(msg);
    setTimeout(() => {
      setNotifMessage("");
    }, 3500);
  };

  // Compute tray statistics
  const trayItems = Object.keys(tray).map(id => {
    const dish = INITIAL_MENU.find(m => m.id === id);
    return {
      dish,
      quantity: tray[id],
    };
  }).filter(item => item.dish !== undefined) as { dish: MenuItem; quantity: number }[];

  const totalPrice = trayItems.reduce((acc, item) => acc + (item.dish.price * item.quantity), 0);
  const totalCalories = trayItems.reduce((acc, item) => acc + (item.dish.calories * item.quantity), 0);

  // Submit visual review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRevObj: Review = {
      id: `custom-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: "Just now",
      comment: newComment,
      isLocalGuide: false
    };

    setReviews(prev => [newRevObj, ...prev]);
    setNewAuthor("");
    setNewComment("");
    setReviewSubmitted(true);
    triggerNotification("Thank you! Your feedback has been posted successfully.");
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

  // Submit Catering Form
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim() || !enquiryDate) return;

    setEnquirySuccess(true);
    triggerNotification("Inquiry Sent! Our catering manager will contact you within 2 hours.");
    setTimeout(() => {
      setGuestName("");
      setGuestPhone("");
      setEnquiryDate("");
      setEnquirySuccess(false);
    }, 6000);
  };

  // Copy Address helper
  const copyAddress = () => {
    const addressText = "Ballal Cir, near RTO Office, Chamarajapura, Chamarajapuram Mohalla, Lakshmipuram, Mysuru, Karnataka 570005";
    navigator.clipboard.writeText(addressText);
    triggerNotification("Restaurant address copied to clipboard!");
  };

  const filteredMenu = selectedCategory === "all" 
    ? INITIAL_MENU 
    : INITIAL_MENU.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF6F0] font-sans text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      
      {/* Floating Notification Toast */}
      <AnimatePresence>
        {notifMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900 text-[#FAF6F0] px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 max-w-sm"
          >
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
            <p className="text-sm font-medium">{notifMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Notice Banner */}
      <div className="bg-emerald-900 text-white py-2 px-4 text-xs font-medium tracking-wide flex justify-between items-center sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? "bg-green-400" : "bg-orange-400"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? "bg-green-500" : "bg-orange-500"}`}></span>
          </span>
          <span className="opacity-95">
            {isOpen ? "Serving Live: Warm & Authentically Flavored Mysurn Tiffins" : "Closed Now: Opens tomorrow at 7:00 AM"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] opacity-80">
          <span>📍 Ballal Circle, Mysuru</span>
          <span>📞 0821 233 0820</span>
        </div>
      </div>

      {/* Navbar Header */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-stone-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-800 text-[#FAF6F0] flex items-center justify-center font-serif text-lg font-bold tracking-tight shadow-md">
              MP
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight text-stone-900 leading-none">
                Mahesh Prasad
              </h1>
              <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                <Leaf className="w-2.5 h-2.5 fill-current" /> 100% Vegetarian
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
            <button 
              onClick={() => { setActiveTab("menu"); document.getElementById("main-section")?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-stone-900 transition-colors ${activeTab === 'menu' ? "text-amber-800 border-b-2 border-amber-700 pb-1" : ""}`}
            >
              Interactive Menu
            </button>
            <button 
              onClick={() => { setActiveTab("about"); document.getElementById("main-section")?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-stone-900 transition-colors ${activeTab === 'about' ? "text-amber-800 border-b-2 border-amber-700 pb-1" : ""}`}
            >
              Our Ambiance & Story
            </button>
            <button 
              onClick={() => { setActiveTab("reviews"); document.getElementById("main-section")?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-stone-900 transition-colors ${activeTab === 'reviews' ? "text-amber-800 border-b-2 border-amber-700 pb-1" : ""}`}
            >
              Patron Reviews ({reviews.length})
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <a 
              href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-stone-900 hover:bg-stone-800 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
              id="nav-directions-btn"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-gradient-to-b from-[#FAF6F0] to-[#EFEAE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide w-fit animate-pulse">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Ranked #1 Pure Veg Restaurant in Mysuru</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[110%]">
              Savor the Authentic <br />
              <span className="text-emerald-800">Heritage Delicacies</span> <br />
              of Royal Mysuru.
            </h1>

            <p className="text-stone-600 max-w-xl text-base sm:text-lg leading-relaxed">
              Serving our community near Ballal Circle with time-honored South Indian tiffins, crispy legendary Masala Dosas, hearty traditional meals, and rich frothy filter coffee since generations. Pure flavor, pure vegetable, zero compromise.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 py-2 border-y border-stone-300/60 max-w-lg">
              <div>
                <div className="font-serif text-2xl font-bold text-stone-900">4.1 <span className="text-amber-500 text-lg">★</span></div>
                <div className="text-[11px] text-stone-500 uppercase tracking-widest font-semibold mt-0.5">Google Rating</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-stone-900">3,914</div>
                <div className="text-[11px] text-stone-500 uppercase tracking-widest font-semibold mt-0.5">Patron Reviews</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-stone-800 flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Open</span>
                </div>
                <div className="text-[11px] text-stone-500 uppercase tracking-widest font-semibold mt-0.5">7:00 AM - 10:30 PM</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => { setActiveTab("menu"); document.getElementById("main-section")?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl px-7 py-4 text-sm font-bold shadow-lg shadow-emerald-900/10 transition-all flex items-center gap-2 hover:translate-y-[-1px]"
                id="hero-order-preview-btn"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Interactive Menu</span>
              </button>
              
              <a 
                href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 rounded-xl px-6 py-4 text-sm font-bold transition-all flex items-center gap-2 hover:shadow-xs"
              >
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>Locate Near Ballal Circle</span>
              </a>
            </div>

            {/* Address Row Quick Highlight */}
            <div className="flex items-center gap-2.5 text-xs text-stone-500 pt-2 lg:pt-4">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <p>Located near the <strong>RTO Office, Chamarajapura</strong>. Digital portal launching proudly to serve Mysuru.</p>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Backing Accent Panel */}
              <div className="absolute -inset-2 bg-amber-500/10 rounded-3xl transform rotate-2"></div>
              
              {/* Main Photo Wrapper */}
              <div className="relative bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF6F0]">
                <img 
                  src={heroImage} 
                  alt="Delicious Traditional South Indian Breakfast at Mahesh Prasad Veg Restaurant" 
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  id="hero-banner-main-image"
                />
                
                {/* Floating Card: Live Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#FAF6F0]/95 backdrop-blur-xs p-4 rounded-xl shadow-lg border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-800 flex items-center justify-center font-bold">
                      <Coffee className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Now Brewing</h4>
                      <p className="text-sm font-bold text-stone-900">Iconic Brass Filter Coffee</p>
                    </div>
                  </div>
                  <div className="bg-emerald-800 text-white rounded-lg px-2.5 py-1 text-xs font-bold">
                    ₹45 Only
                  </div>
                </div>
              </div>

              {/* Gold Label Detail badge */}
              <div className="absolute -top-4 -right-4 bg-amber-500 text-stone-950 font-serif font-black p-4 rounded-full shadow-xl flex flex-col items-center justify-center w-20 h-20 rotate-12 border-2 border-white">
                <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#FAF6F0]">No 1</span>
                <span className="text-xl">VEG</span>
                <span className="text-[9px] uppercase font-sans font-semibold text-[#FAF6F0] leading-none">Mysore</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Live Status and Dynamic Location Card Strip */}
      <section className="bg-emerald-950 text-[#FAF6F0] py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">Weekly Timings (Every Single Day)</h3>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${isOpen ? "bg-emerald-500 text-white" : "bg-amber-600 text-white"}`}>
                  {isOpen ? "OPEN NOW" : "CLOSED NOW"}
                </span>
              </div>
              <p className="text-emerald-200 text-sm mt-0.5">
                Morning Session: 7:00 AM – 11:30 AM | Afternoon & Evening: 12:00 PM – 10:30 PM
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 border-t border-emerald-900 md:border-0 pt-4 md:pt-0">
            <div className="text-right hidden lg:block">
              <h4 className="text-[11px] uppercase tracking-widest text-emerald-300 font-bold">Local Time Check</h4>
              <p className="text-sm font-mono mt-0.5 text-stone-300">{timeString || "1:05 PM IST"}</p>
            </div>
            <button 
              onClick={copyAddress}
              className="bg-emerald-900 hover:bg-emerald-800 text-emerald-100 text-xs font-bold rounded-xl py-2.5 px-4 inline-flex items-center gap-2 border border-emerald-800 transition-all"
              id="copy-address-badge-btn"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Address</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Feature Content Grid: Menu / Ambiance / Reviews Toggle */}
      <main id="main-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Navigation Tabs (Sub-Header) */}
        <div className="flex items-center justify-center border-b border-stone-300/80 mb-12">
          <div className="flex gap-2 sm:gap-6">
            <button 
              onClick={() => setActiveTab("menu")}
              className={`pb-4 px-4 text-base font-bold tracking-tight relative transition-all flex items-center gap-2 ${activeTab === "menu" ? "text-emerald-900 font-extrabold" : "text-stone-500 hover:text-stone-900"}`}
              id="tab-toggle-menu"
            >
              <Utensils className={`w-4 h-4 ${activeTab === 'menu' ? 'text-emerald-800' : 'text-stone-400'}`} />
              <span>Interactive Menu & Feast Tray</span>
              {activeTab === "menu" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-800" />
              )}
            </button>
            
            <button 
              onClick={() => setActiveTab("about")}
              className={`pb-4 px-4 text-base font-bold tracking-tight relative transition-all flex items-center gap-2 ${activeTab === "about" ? "text-emerald-900 font-extrabold" : "text-stone-500 hover:text-stone-900"}`}
              id="tab-toggle-about"
            >
              <Leaf className={`w-4 h-4 ${activeTab === 'about' ? 'text-emerald-800' : 'text-stone-400'}`} />
              <span>Our Heritage & Ambiance</span>
              {activeTab === "about" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-800" />
              )}
            </button>

            <button 
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 px-4 text-base font-bold tracking-tight relative transition-all flex items-center gap-2 ${activeTab === "reviews" ? "text-emerald-900 font-extrabold" : "text-stone-500 hover:text-stone-900"}`}
              id="tab-toggle-reviews"
            >
              <Star className={`w-4 h-4 ${activeTab === 'reviews' ? 'text-amber-500 fill-amber-500' : 'text-stone-400'}`} />
              <span>Patron Reviews ({reviews.length})</span>
              {activeTab === "reviews" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-800" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Tab Content - Left Side (Vast Section) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* TAB: MENU SECTION COMPONENT */}
            {activeTab === "menu" && (
              <div className="space-y-8">
                
                {/* Menu category filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-2">Filter Flavors:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: "all", label: "All Items" },
                      { id: "breakfast", label: "Tiffins (Breakfast)" },
                      { id: "meals", label: "Heritage Meals (Lunch/Dinner)" },
                      { id: "drinks", label: "Beverages & Desserts" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as any)}
                        className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${selectedCategory === cat.id ? "bg-emerald-800 text-white shadow-xs" : "bg-transparent text-stone-600 hover:bg-stone-100"}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid list of food items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMenu.map((item) => {
                    const quantity = tray[item.id] || 0;
                    return (
                      <div 
                        key={item.id}
                        className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                      >
                        {item.tag && (
                          <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[9px] font-bold uppercase tracking-widest leading-none px-2.5 py-1.5 rounded-bl-xl border-b border-l border-white/20 select-none">
                            {item.tag}
                          </span>
                        )}

                        <div className="space-y-2">
                          <div className="flex justify-between items-start pt-1">
                            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                              {item.name}
                            </h3>
                          </div>
                          
                          <p className="text-xs text-stone-500 leading-relaxed max-w-[90%] font-medium">
                            {item.description}
                          </p>

                          <div className="flex items-center gap-3 pt-1 text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
                            <span className="text-amber-700 font-bold flex items-center gap-0.5">
                              ★ {item.rating}
                            </span>
                            <span>•</span>
                            <span>{item.calories} kCal</span>
                            <span>•</span>
                            <span className="text-emerald-800 lowercase">veg</span>
                          </div>
                        </div>

                        {/* Card bottom footer detail: Price & Trigger Add button */}
                        <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-4">
                          <span className="font-serif text-xl font-black text-emerald-950">
                            ₹{item.price}
                          </span>

                          <div className="flex items-center gap-2">
                            {quantity > 0 && (
                              <>
                                <button
                                  onClick={() => removeFromTray(item.id)}
                                  className="h-8 w-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold flex items-center justify-center transition-colors"
                                  title="Remove 1 item"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-mono text-sm font-extrabold text-stone-800 px-1 w-5 text-center">
                                  {quantity}
                                </span>
                              </>
                            )}
                            <button
                              onClick={() => addToTray(item.id, item.name)}
                              className={`h-8 px-3.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${quantity > 0 ? "bg-emerald-800 hover:bg-emerald-900 text-white" : "bg-[#FAF6F0] hover:bg-emerald-800 hover:text-white text-stone-800 border border-stone-300"}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{quantity > 0 ? "Add More" : "Add to Tray"}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-amber-50 border border-amber-200/70 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-amber-500/10 text-amber-900 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-950 text-sm">Have a Wedding, Feast, or Catered Event?</h4>
                    <p className="text-stone-600 text-xs mt-0.5">
                      We offer premium traditional South Indian buffet catering for group parties and weddings in Mysuru. Use the party enquiry card on the right to get a custom quote!
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: STORY & HERITAGE COMPONENT */}
            {activeTab === "about" && (
              <div className="space-y-8">
                
                <h3 className="font-serif text-2xl font-bold text-stone-950">
                  The Taste of Tradition near Ballal Circle
                </h3>
                
                <div className="relative rounded-2xl overflow-hidden bg-stone-900 shadow-xl border border-stone-200">
                  <img 
                    src={ambianceImage} 
                    alt="Authentic Traditional Restaurant Ambiance of Mahesh Prasad" 
                    className="w-full h-[320px] object-cover"
                    referrerPolicy="no-referrer"
                    id="heritage-ambiance-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest bg-amber-950/60 p-2 rounded">
                        Established Legacy
                      </span>
                      <h4 className="text-xl font-bold font-serif text-white mt-2">Mahesh Prasad Dining Hall</h4>
                    </div>
                  </div>
                </div>

                <div className="prose text-stone-600 space-y-4 text-sm leading-relaxed max-w-none">
                  <p>
                    Nestled in the vibrant heart of Chamarajapuram, just a stone's throw from the historic Mysuru RTO Office, <strong>Mahesh Prasad Veg Restaurant</strong> stands as a pure dietary heritage landmark. Over the decades, we have remained committed to preservation: authentic spice blends ground daily, pure high-quality locally produced oils and ghee, and original standard South Indian tiffin recipes.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    <div className="bg-white p-5 rounded-xl border border-stone-200">
                      <h4 className="font-serif font-bold text-stone-900 text-base mb-1.5">No Artificial Preservatives</h4>
                      <p className="text-xs text-stone-500">Every single batter, chutney, and sambar is prepared completely fresh on order. We do not use stored preservatives, chemicals, or artificial taste boosters like MSG.</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-stone-200">
                      <h4 className="font-serif font-bold text-stone-900 text-base mb-1.5 font-medium">Desi Butter & Ghee Only</h4>
                      <p className="text-xs text-stone-500">Our signature crispy dosa is prepared with fresh local pasture-reared cow butter, bringing back that nostalgic native heritage flavor.</p>
                    </div>
                  </div>

                  <p>
                    Whether you are a regular local guide starting your Friday morning with a filter coffee, or a traveler discovering the beauty of Mysuru, Mahesh Prasad welcomes you for a hearty breakfast or an authentic family lunch feast!
                  </p>
                </div>

              </div>
            )}

            {/* TAB: REVIEWS SHOWCASE COMPONENT */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-950">
                      What Patrons Say
                    </h3>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Aggregated total of 3,914 Google Reviews with a 4.1 overall rating.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-stone-900 leading-none">4.1</span>
                    <div className="text-stone-500 text-[11px] leading-tight font-semibold">
                      <div className="flex text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <Star className="w-3.5 h-3.5/2 fill-current opacity-30" />
                      </div>
                      <span>3,914 Verified Google Reviews</span>
                    </div>
                  </div>
                </div>

                {/* Submit New Review Form Block */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
                  <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-800" />
                    <span>Leave a Community Review</span>
                  </h4>

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                          Your Name
                        </label>
                        <input 
                          type="text" 
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="Example: Anand Rao"
                          required
                          className="w-full bg-[#FAF6F0] rounded-xl border border-stone-300 p-3 text-xs font-bold outline-emerald-800 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                          Star Rating
                        </label>
                        <select 
                          value={newRating}
                          onChange={(e) => setNewRating(Number(e.target.value))}
                          className="w-full bg-[#FAF6F0] rounded-xl border border-stone-300 p-3 text-xs font-bold outline-emerald-800 transition-all appearance-none"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ Excellent (5 Stars)</option>
                          <option value="4">⭐⭐⭐⭐ Healthy & Tasty (4 Stars)</option>
                          <option value="3">⭐⭐⭐ Good Average (3 Stars)</option>
                          <option value="2">⭐⭐ Subpar (2 Stars)</option>
                          <option value="1">⭐ Bad (1 Star)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                        Your Feedback Comment
                      </label>
                      <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your authentic dining experience at Mahesh Prasad..."
                        rows={3}
                        required
                        className="w-full bg-[#FAF6F0] rounded-xl border border-stone-300 p-3 text-xs font-medium outline-emerald-800 transition-all"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl px-5 py-3 text-xs font-bold transition-all inline-flex items-center gap-2"
                      id="submit-review-form-btn"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Post Anonymous Review</span>
                    </button>
                    
                    {reviewSubmitted && (
                      <p className="text-xs text-emerald-800 font-extrabold flex items-center gap-1 mt-2">
                        <Check className="w-4 h-4 text-emerald-800" />
                        <span>Review posted successfully in your active browser deck!</span>
                      </p>
                    )}
                  </form>
                </div>

                {/* List of Reviews */}
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-black text-stone-900 text-sm">{rev.author}</span>
                          {rev.isLocalGuide && (
                            <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[9px] font-extrabold tracking-wider uppercase select-none">
                              Local Guide
                            </span>
                          )}
                        </div>
                        <span className="text-stone-400 text-[10px] font-semibold">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-500 text-amber-500" : "text-stone-200 fill-none"}`} 
                          />
                        ))}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

          {/* Tab Content - Right Side (Enquiry & Order Checker Sticky) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* STICKY COMPONENT: CUSTOM FEAST TRAY ESTIMATOR */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-md space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-800 flex items-center justify-center font-bold">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-950">My Feast Tray</h3>
                    <p className="text-[10px] text-stone-500 font-medium">Select meals to preview plate cost</p>
                  </div>
                </div>
                {trayItems.length > 0 && (
                  <button 
                    onClick={clearTray}
                    className="text-[10px] uppercase tracking-wider font-extrabold text-stone-400 hover:text-stone-950 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {trayItems.length === 0 ? (
                <div className="text-center py-6 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                    <Utensils className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-stone-700">Your Feast Tray is Empty</p>
                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      Tap <strong className="text-emerald-800 font-bold">+ Ghee Tray</strong> on any dish inside the menu to calculate prices, calories, and preview a traditional lunch order.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Tray Items List */}
                  <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto pr-1">
                    {trayItems.map((item) => (
                      <div key={item.dish.id} className="py-2.5 flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                          <p className="font-medium text-stone-900 font-serif font-bold">{item.dish.name}</p>
                          <p className="text-[10px] text-stone-400 font-semibold">{item.dish.calories} kcal each</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-stone-400 font-medium">x{item.quantity}</span>
                          <span className="font-bold text-stone-900 w-12 text-right">₹{item.dish.price * item.quantity}</span>
                          <button
                            onClick={() => removeFromTray(item.dish.id)}
                            className="text-stone-300 hover:text-orange-600 transition-colors pl-1"
                            title="Remove completely"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Calorie Totalizer */}
                  <div className="bg-[#FAF6F0] p-4 rounded-xl border border-stone-200/80 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-stone-500 font-medium">
                      <span>Total Nutrients (Estimate):</span>
                      <span className="font-mono">{totalCalories} kCal</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-900 font-bold text-sm pt-1 border-t border-stone-200/50">
                      <span>Grand Total:</span>
                      <span className="font-serif text-emerald-950 font-black text-base">₹{totalPrice}</span>
                    </div>
                  </div>

                  {/* Simulated Dine-in Plate Call to Action */}
                  <button 
                    onClick={() => triggerNotification(`Order Estimated! Dine-In with us at Ballal Circle to get these piping hot.`)}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl py-3.5 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                    id="feast-dine-estimate-cta"
                  >
                    <span>Dine-In Estimate Plate</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Group Reservation Catering Enquiry Quick Form */}
              <div className="border-t border-stone-200 pt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-700" />
                  <h4 className="font-serif text-sm font-bold text-stone-900">Group Dining / Catering Inquiry</h4>
                </div>
                
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <div>
                    <input 
                      type="text" 
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Contact Name"
                      required
                      className="w-full bg-[#FAF6F0] rounded-lg border border-stone-300 p-2 text-xs font-semibold outline-emerald-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="tel" 
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="Phone Number"
                      required
                      className="w-full bg-[#FAF6F0] rounded-lg border border-stone-300 p-2 text-xs font-semibold outline-emerald-800"
                    />
                    
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#FAF6F0] rounded-lg border border-stone-300 p-2 text-xs font-semibold outline-emerald-800 appearance-none"
                    >
                      <option value="10">10-25 Guests</option>
                      <option value="50">25-50 Guests</option>
                      <option value="100">50-100 Guests</option>
                      <option value="200">100+ Guests (Wedding)</option>
                    </select>
                  </div>

                  <div>
                    <input 
                      type="date"
                      value={enquiryDate}
                      onChange={(e) => setEnquiryDate(e.target.value)}
                      required
                      className="w-full bg-[#FAF6F0] rounded-lg border border-stone-300 p-2 text-xs font-semibold outline-emerald-800 font-mono"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-lg py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    id="submit-catering-lead-btn"
                  >
                    <span>Request Catering Booklet</span>
                  </button>

                  {enquirySuccess && (
                    <p className="text-[10px] text-center text-emerald-800 font-black flex items-center justify-center gap-1 mt-1 bg-emerald-50 py-1.5 rounded-lg border border-emerald-100">
                      <Check className="w-3.5 h-3.5" />
                      <span>Thank you! We will text you custom menus.</span>
                    </p>
                  )}
                </form>
              </div>

              {/* Direct Call Quick Link Card */}
              <div className="bg-stone-50 border border-stone-200/80 px-4 py-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-800 animate-pulse" />
                  <div>
                    <p className="font-semibold text-stone-500">Need immediate help?</p>
                    <p className="font-bold text-stone-900">0821 233 0820</p>
                  </div>
                </div>
                <a 
                  href="tel:08212330820"
                  className="bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-800 hover:text-white px-3 py-1.5 rounded-lg transition-all"
                >
                  Dial Now
                </a>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Structured Google Maps Interactive Callout / High Contrast Grid */}
      <section className="bg-[#EFEAE2] border-t border-stone-300/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FAF6F0] bg-emerald-800/80 px-3.5 py-1.5 rounded-full shadow-xs w-fit">
              Location & Accessibility
            </span>

            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-stone-950">
              Visit Us Near Ballal Circle & the RTO Office
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed max-w-xl">
              Our restaurant features accessible ground-floor seating, ample two-wheeler parking, and rapid service. Located at the bustling junction of Lakshmipuram & Chamarajapuram—making it an ideal stop for tourists exploring Mysore and locals alike.
            </p>

            {/* List coordinates & landmarks */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 text-xs">
                <MapPin className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 uppercase tracking-wide">Official Address</h4>
                  <p className="text-stone-500 font-medium leading-relaxed mt-0.5">
                    Ballal Cir, near RTO Office, Chamarajapura, Chamarajapuram Mohalla, Lakshmipuram, Mysuru, Karnataka 570005
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <Phone className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 uppercase tracking-wide">Telephone Inquiries</h4>
                  <p className="text-stone-500 font-medium mt-0.5">
                    0821 233 0820 (Standard carrier rates apply)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl py-3 px-6 text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
                id="maps-direction-launcher-cta-bottom"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>
              <button 
                onClick={copyAddress}
                className="bg-white hover:bg-stone-100 border border-stone-300 text-stone-950 rounded-xl py-3 px-5 text-xs font-bold transition-all inline-flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy to Share</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            {/* Visual static map representation indicating the location meticulously */}
            <div className="bg-white p-4 rounded-2xl border border-stone-350 shadow-md space-y-4">
              <div className="h-64 rounded-xl bg-stone-100 relative overflow-hidden border border-stone-200">
                
                {/* Visual grid representing streets of Mysuru */}
                <div className="absolute inset-0 bg-[#E8DCC4]/20 p-4 flex flex-col justify-between border border-stone-200" style={{ backgroundImage: "radial-gradient(#D6C4A3 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
                  
                  {/* Street Labels Mock Representation */}
                  <div className="text-[10px] text-stone-400 font-extrabold uppercase tracking-wider absolute top-4 left-4 rotate-6 select-none bg-[#FAF6F0]/60 px-1 rounded">
                    RTO Office Road
                  </div>
                  
                  <div className="text-[10px] text-stone-400 font-extrabold uppercase tracking-wider absolute bottom-12 right-12 -rotate-12 select-none bg-[#FAF6F0]/60 px-1 rounded">
                    Ballal Circle Junction
                  </div>

                  {/* Main Marker in middle represent location */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <span className="flex h-6 w-6 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600 border-2 border-white items-center justify-center font-bold text-[9px] text-white">MP</span>
                    </span>
                    <div className="bg-stone-900 text-[#FAF6F0] p-2.5 rounded-lg shadow-xl text-center mt-2 border border-white/20 select-none max-w-xs shrink-0 whitespace-nowrap">
                      <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Mahesh Prasad Veg</p>
                      <p className="text-[8px] opacity-80 mt-0.5">Ballal Cir, Mysuru 570005</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 font-bold border-t border-stone-100 pt-3">
                <div className="flex items-center gap-1 text-emerald-800">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>100% Traditional South Indian</span>
                </div>
                <span>★ 4.1 Rating</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer & Royal Mysuru Credit Elements */}
      <footer className="bg-stone-950 text-stone-400 border-t border-stone-900 py-12 px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-serif text-sm font-black">
                MP
              </div>
              <h2 className="font-serif text-base font-bold text-white tracking-wide">
                Mahesh Prasad Restaurant
              </h2>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
              Providing nutritious, fully traditional, pure vegetarian food to our regular patrons and tourists in Mysuru since decades.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FAF6F0]">Operational Framework</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between">
                <span>Breakfast Session</span>
                <span className="font-semibold text-white">7:00 AM - 11:30 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Lunch Session</span>
                <span className="font-semibold text-white">12:00 PM - 3:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Dinner / Tiffins</span>
                <span className="font-semibold text-white">4:00 PM - 10:30 PM</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FAF6F0]">Contact Points</h4>
            <ul className="space-y-1.5 text-xs">
              <li className="text-white">📞 Phone: 0821 233 0820</li>
              <li>📍 Ballal Cir, near RTO Office, Mysuru, Karnataka 570005</li>
              <li>Proudly launched for digitizing local traditional dining rooms.</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
          <p>© 2026 Mahesh Prasad Veg Restaurant. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span>Standard South Indian Pure Veg</span>
            <span>📍 Mysuru Heritage Spot</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
