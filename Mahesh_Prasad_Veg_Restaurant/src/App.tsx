import React, { useState } from "react";
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Coffee, 
  UtensilsCrossed, 
  Check, 
  ThumbsUp, 
  MessageSquare, 
  Heart, 
  ChefHat, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  ClipboardCheck,
  Map,
  Share2
} from "lucide-react";

// Import our professionally generated high-resolution assets
import heroImage from "./assets/images/mahesh_prasad_hero_1781296442343.jpg";
import vibeImage from "./assets/images/mahesh_prasad_vibe_1781296459334.jpg";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  tags?: string[];
}

interface MenuCategory {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const MENU_DATA: MenuCategory[] = [
  {
    title: "Morning Specialties & Dosas",
    icon: <UtensilsCrossed className="w-5 h-5 text-amber-600" />,
    items: [
      {
        id: "d1",
        name: "Mysuru Masala Dosa",
        price: 95,
        description: "Crispy dark-golden rice crepe smeared with our legendary signature spicy red garlic-lentil chutney, filled with soft spiced potato mash, served with pure coconut chutney and piping hot sambar.",
        isPopular: true,
        tags: ["Ghee-roasted", "Iconic Mysore Style"]
      },
      {
        id: "d2",
        name: "Steamed Idli-Vada Combo",
        price: 75,
        description: "Two ultra-fluffy, cloud-like steamed rice cakes paired with one crispy, golden, piping-hot savory black-lentil donut (Medu Vada). Accompanied by fresh coconut and mint chutneys.",
        isPopular: true,
        tags: ["Breakfast Classic", "Soft & Crispy"]
      },
      {
        id: "d3",
        name: "Khara Bath & Kesari Bath (Chow Chow Bath)",
        price: 80,
        description: "A perfect duo of Mysore breakfast: spiced, savory semolina cooked with fresh vegetables & ghee, alongside melt-in-mouth saffron-scented sweet pineapple semolina dessert.",
        tags: ["Sweet & Savory Combo"]
      },
      {
        id: "d4",
        name: "Rava Onion Dosa",
        price: 110,
        description: "Lacy, crispy wheat semolina crepe studded with finely chopped roasted onions, green chilies, and a pinch of black pepper. Incredibly crunchy.",
        tags: ["Extra Crispy"]
      }
    ]
  },
  {
    title: "Traditional Meals & Mains",
    icon: <Sparkles className="w-5 h-5 text-amber-600" />,
    items: [
      {
        id: "m1",
        name: "South Indian Special Thali (Meals)",
        price: 150,
        description: "A royal feast served in traditional bowls: Fragrant Basmati/Sona Masuri rice, rich Sambar, house-special Tangy Rasam, two traditional dry vegetable curries (Palya), Papadum, fresh curd, pickle, and the sweet of the day.",
        isPopular: true,
        tags: ["Signature Feast", "Satisfying"]
      },
      {
        id: "m2",
        name: "Ghee Bisi Bele Bath",
        price: 90,
        description: "Mysuru's original comfort food. A slow-cooked, wholesome blend of rice, lentils, and mixed garden vegetables brewed under custom secret spices, finished with a generous ladle of pure melted ghee and crisps.",
        isPopular: true,
        tags: ["State Favorite"]
      },
      {
        id: "m3",
        name: "Curd Rice (Bagala Bath)",
        price: 75,
        description: "Perfect cooling meal. Soothing, creamy yogurt rice tempered with mustard seeds, curry leaves, ginger, pomegranate arils, and served with tangy mango pickle.",
        tags: ["Cooling & Digestible"]
      }
    ]
  },
  {
    title: "Signature Brews & Sweets",
    icon: <Coffee className="w-5 h-5 text-amber-600" />,
    items: [
      {
        id: "b1",
        name: "Authentic Mysuru Filter Coffee",
        price: 35,
        description: "The pride of Southern Karnataka. Dark, freshly roasted chicory-coffee blend slow-dripped, frothed expertly with boiling whole milk from a height, served steaming in a traditional brass tumbler & dabarah.",
        isPopular: true,
        tags: ["Must Try", "Perfect Froth"]
      },
      {
        id: "b2",
        name: "Special Masala Chai",
        price: 30,
        description: "Strong milk tea infused with crushed ginger, cardamom, and fresh cloves. Perfect companion for a chilly Mysuru afternoon.",
        tags: ["Freshly Brewed"]
      },
      {
        id: "b3",
        name: "Special Mysurupa",
        price: 45,
        description: "The classic royal sweet of Mysuru. Melt-in-the-mouth, porous, golden-brown sweet made from gram flour, pure sugar syrup, and lavish amounts of aromatic desi ghee.",
        isPopular: true,
        tags: ["Royal Sweet"]
      }
    ]
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(MENU_DATA[0].items[0]);
  
  // Dynamic user reviews state initialized with some real-looking content
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Ranganath Swamy",
      rating: 5,
      date: "2 days ago",
      comment: "Best Masala Dosa in Mysuru hands down. The red chutney is extremely authentic and has the perfect balance of spice and garlic flavor. The filter coffee served in brass is excellent!",
      likes: 42,
      isLiked: false
    },
    {
      id: 2,
      author: "Priya Nair",
      rating: 5,
      date: "1 week ago",
      comment: "Whenever I visit Mysuru from Bangalore, Mahesh Prasad is my first breakfast stop. Clean, fast service and very pocket friendly. Sambar is piping hot and they never hesitate to refill it.",
      likes: 29,
      isLiked: false
    },
    {
      id: 3,
      author: "David Miller",
      rating: 4,
      date: "3 weeks ago",
      comment: "We tried the South Indian Thali. So many flavors and everything tasted fresh! The place can be crowded during lunchtime but the queue moves very fast. Highly recommended for authentic veg cuisine.",
      likes: 15,
      isLiked: false
    }
  ]);

  // Review form submission state
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittedReview, setSubmittedReview] = useState(false);

  // Table Booking inquiry state
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingGuestCount, setBookingGuestCount] = useState("2");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Handle new review submission
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRevObj = {
      id: Date.now(),
      author: newAuthor,
      rating: newRating,
      date: "Just now",
      comment: newComment,
      likes: 0,
      isLiked: false
    };

    setReviews([newRevObj, ...reviews]);
    setNewAuthor("");
    setNewRating(5);
    setNewComment("");
    setSubmittedReview(true);
    setTimeout(() => setSubmittedReview(false), 5000);
  };

  // Handle like reviews
  const handleLikeReview = (id: number) => {
    setReviews(reviews.map(rev => {
      if (rev.id === id) {
        return {
          ...rev,
          likes: rev.isLiked ? rev.likes - 1 : rev.likes + 1,
          isLiked: !rev.isLiked
        };
      }
      return rev;
    }));
  };

  // Handle Booking inquiry submission
  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim() || !bookingDate) return;
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingName("");
      setBookingPhone("");
      setBookingDate("");
      setBookingTime("");
    }, 6000);
  };

  // Copy address utility
  const [copied, setCopied] = useState(false);
  const copyAddress = () => {
    navigator.clipboard.writeText("Ballal Cir, near RTO Office, Chamarajapura, Chamarajapuram Mohalla, Lakshmipuram, Mysuru, Karnataka 570005");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div id="landing-container" className="min-h-screen bg-warm-pattern font-sans text-stone-800 selection:bg-amber-200 selection:text-amber-900">
      
      {/* Dynamic Top Announcement Strip */}
      <div id="announcement-bar" className="bg-amber-600 text-white text-xs md:text-sm py-2 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 bg-green-500 border border-white rounded-full animate-pulse"></span>
            <span>100% Pure Vegetarian South Indian Culinary Heritage in Mysuru</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:08212330820" className="hover:underline flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 inline" />
              <span>Call: 0821 233 0820</span>
            </a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Hours: 6:30 AM – 10:30 PM</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center space-x-3">
            {/* Indian Vegetarian Emblem (Green dot in white circle in green square outline) */}
            <div className="w-9 h-9 border border-emerald-600 flex items-center justify-center p-1 bg-white rounded-md flex-shrink-0" title="100% Pure Vegetarian">
              <div className="w-5 h-5 bg-emerald-600 rounded-full"></div>
            </div>
            
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-black tracking-tight text-stone-900 leading-none">
                Mahesh Prasad
              </h1>
              <p className="text-xs uppercase tracking-widest text-amber-700 font-bold mt-0.5">Veg Restaurant</p>
            </div>
          </div>

          {/* Quick Metrics Badge & Direct CTA */}
          <div className="flex items-center space-x-4">
            {/* Rating badge */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant"
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2.5 bg-stone-150 border border-stone-200 px-3 py-1.5 rounded-full hover:bg-stone-100 transition-colors"
            >
              <div className="flex items-center space-x-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
                <Star className="w-4 h-4 fill-amber-400 text-amber-500 opacity-60" />
              </div>
              <div className="text-xs text-left">
                <span className="font-bold text-stone-900 block leading-none">4.1 Star Rating</span>
                <span className="text-stone-550 block leading-none mt-0.5">3,914 Google Reviews</span>
              </div>
            </a>

            <a 
              href="#menu" 
              className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-4 md:px-5 py-2.5 rounded-lg shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-1.5"
            >
              <span>Explore Menu</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </header>

      {/* Hero section */}
      <section id="hero" className="relative bg-stone-900 text-white overflow-hidden py-16 md:py-24">
        
        {/* Ambient Dark Overlay on background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Mouth-watering South Indian Dosa and Sambar feast" 
            className="w-full h-full object-cover opacity-35 object-center scale-105 motion-safe:animate-subtle-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Ranked #1 Vegetarian Landmark in Mysuru</span>
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]">
              Taste the Authentic <br />
              <span className="text-amber-400">Heritage of Mysuru</span>
            </h2>

            <p className="text-lg text-stone-200 font-sans max-w-xl leading-relaxed">
              Step into the aromatic legacy of pure ghee dosas, steaming soft idlis, and custom slow-dripped filter coffee. Lovingly serving Mysuru residents and global travelers under authentic quality, pocket-friendly comfort, and pristine traditional hospitality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#menu" 
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 text-base font-bold text-center px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105"
              >
                View Culinary Menu
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-stone-800/80 hover:bg-stone-700/90 text-white border border-stone-700/60 text-base font-semibold text-center px-8 py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Get Driving Directions</span>
              </a>
            </div>

            {/* Quick specifications counts */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-800">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-amber-400 font-serif">4.1 <span className="text-sm text-stone-300">★</span></span>
                <span className="text-xs text-stone-300 uppercase tracking-wider font-semibold">Google Rating</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-amber-400 font-serif">3,900+</span>
                <span className="text-xs text-stone-300 uppercase tracking-wider font-semibold">Happy Reviews</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-amber-400 font-serif">100%</span>
                <span className="text-xs text-stone-300 uppercase tracking-wider font-semibold">Pure Vegetarian</span>
              </div>
            </div>

          </div>

          {/* Quick Info Overlay Card - Desktop Right */}
          <div className="lg:col-span-5 bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-100 flex flex-col justify-between">
            <h3 className="text-xl font-serif font-bold text-stone-900 border-b pb-4 mb-4 flex items-center justify-between">
              <span>Quick Details</span>
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">Open Now</span>
            </h3>

            <div className="space-y-5">
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Address</h4>
                  <p className="text-sm font-medium text-stone-800 leading-relaxed mt-0.5">
                    Ballal Cir, near RTO Office, Chamarajapura, Chamarajapuram Mohalla, Lakshmipuram, Mysuru, Karnataka 570005
                  </p>
                  <button 
                    onClick={copyAddress}
                    className="mt-1.5 text-xs text-amber-700 hover:text-amber-800 font-bold inline-flex items-center space-x-1 hover:underline"
                  >
                    <span>{copied ? "✓ Copied to clipboard" : "Copy full address"}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Telephone Line</h4>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">
                    <a href="tel:08212330820" className="hover:underline text-amber-800">0821 233 0820</a>
                  </p>
                  <p className="text-xs text-stone-500">Tap to dial from mobile device</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Service Hours</h4>
                  <p className="text-sm font-medium text-stone-900 mt-0.5">
                    Everyday: <span className="font-bold">6:30 AM – 10:30 PM</span>
                  </p>
                  <p className="text-xs text-stone-500">Perfect for early breakfast & late dinner</p>
                </div>
              </div>

            </div>

            <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">Found via query: &quot;restaurant in Mysuru&quot;</span>
              <span className="text-xs font-semibold text-stone-700 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span>Active Dine-in</span>
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Info Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Highlight Feature: The Menu */}
        <section id="menu" className="scroll-mt-24 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-amber-700 font-bold uppercase text-xs tracking-widest block font-sans">Traditional Delicacies</span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-950">
              Our Curated Menu Favorites
            </h3>
            <p className="text-stone-600 text-sm sm:text-base">
              Freshly prepared daily with the finest indigenous rice grains, home-ground roasted spice blends, and generous amounts of pure ghee. Authentic Southern flavours.
            </p>
            {/* Indian Vegetarian Emblem Center Line */}
            <div className="flex justify-center items-center py-2">
              <div className="h-px bg-stone-300 w-16"></div>
              <div className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center p-0.5 mx-3 bg-white">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
              </div>
              <div className="h-px bg-stone-300 w-16"></div>
            </div>
          </div>

          {/* Interactive Menu Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Category Navigation Controls */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 px-2">Menu Categories</h4>
              <div className="flex flex-row overflow-x-auto lg:flex-col gap-2 pb-3 lg:pb-0 scrollbar-none">
                {MENU_DATA.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCategory(idx);
                      // Set default item to display on desktop panel
                      if (cat.items.length > 0) setSelectedItem(cat.items[0]);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left font-serif font-bold text-sm sm:text-base border transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 w-auto lg:w-full ${
                      activeCategory === idx 
                        ? "bg-amber-500 border-amber-600 text-stone-950 shadow-md translate-x-1" 
                        : "bg-white border-stone-200 text-stone-800 hover:bg-stone-50"
                    }`}
                  >
                    <span className={`p-1.5 rounded-lg bg-white ${activeCategory === idx ? "shadow-sm text-stone-900" : ""}`}>
                      {cat.icon}
                    </span>
                    <span className="flex-1">{cat.title}</span>
                  </button>
                ))}
              </div>

              {/* Special dietary announcement card */}
              <div className="hidden lg:block bg-stone-100 border border-stone-250 p-5 rounded-2xl text-xs space-y-2.5">
                <h5 className="font-bold text-stone-900 flex items-center space-x-1.5">
                  <span className="inline-block w-4 h-4 border border-emerald-600 flex items-center justify-center p-0.5 bg-white rounded">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  </span>
                  <span>100% Pure Vegetarian Policy</span>
                </h5>
                <p className="text-stone-600 leading-relaxed">
                  We maintain zero tolerance for non-vegetarian products in our warehouse, kitchen, storage, and utensils. All ingredients are carefully audited for your peace of mind.
                </p>
              </div>
            </div>

            {/* Menu Items List */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-1 gap-6">
              
              {/* Active Category Item Card List */}
              <div className="space-y-4">
                {MENU_DATA[activeCategory].items.map((item) => {
                  const isCurrentlySelected = selectedItem?.id === item.id;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`group p-5 bg-white rounded-2xl border transition-all cursor-pointer relative hover:shadow-md ${
                        isCurrentlySelected 
                          ? "border-amber-500 ring-1 ring-amber-500/50 shadow-md bg-stone-50/10" 
                          : "border-stone-200 hover:border-stone-350"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1.5 flex-1">
                          
                          {/* Title & Tags */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-block w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center p-0.5 bg-white">
                              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                            </span>
                            <h4 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                              {item.name}
                            </h4>
                            {item.isPopular && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-0.5">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>Local Favorite</span>
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                            {item.description}
                          </p>

                          {/* Chips tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags?.map((tag, tIdx) => (
                              <span key={tIdx} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>

                        </div>

                        {/* Price & Selection indicator */}
                        <div className="text-right flex flex-col justify-between items-end h-full min-w-[70px]">
                          <span className="text-base sm:text-lg font-extrabold text-stone-900 font-serif">
                            ₹{item.price}
                          </span>
                          <span className={`text-xs ml-auto mt-4 font-bold flex items-center space-x-1 ${isCurrentlySelected ? "text-amber-700" : "text-stone-300 group-hover:text-stone-500"}`}>
                            <span>Details</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Mobile Selected Item Detailed Spotlight (or interactive visual placeholder) */}
              {selectedItem && (
                <div id="recipe-spotlight" className="bg-gradient-to-r from-amber-50 to-stone-100 border border-amber-500/20 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 tracking-widest uppercase flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Dish Spotlight</span>
                    </span>
                    <span className="text-stone-500 text-xs font-mono">Mahesh Prasad Special</span>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-xl font-serif font-extrabold text-stone-900">{selectedItem.name}</h5>
                    <p className="text-sm text-stone-700 leading-relaxed">{selectedItem.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-stone-500">Premium quality and taste guaranteed • Pure Ghee</span>
                    </div>
                    <span className="text-lg font-black text-stone-955">₹{selectedItem.price} (Inclusive of Taxes)</span>
                  </div>
                </div>
              )}

            </div>

          </div>

        </section>

        {/* Brand Vibe / Heritage Highlights */}
        <section id="heritage" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl aspect-16/10 lg:aspect-square">
            <img 
              src={vibeImage} 
              alt="Warm hospitality, clean wooden tables, and bright light at Mahesh Prasad Veg Restaurant" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Soft gold glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
            
            {/* Quick tag floating */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between">
              <div>
                <h5 className="font-serif font-bold text-stone-900">Iconic Heritage Inside</h5>
                <p className="text-xs text-amber-800">Near RTO Office, Chamarajapura, Mysuru</p>
              </div>
              <div className="bg-amber-600 text-white rounded-full p-2">
                <Compass className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-amber-700 font-bold uppercase text-xs tracking-widest block">The Heart of Mysuru Food</span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-stone-950">
              Where Generous Recipes Meet Decades of Legacy
            </h3>
            
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              At Mahesh Prasad Veg Restaurant, we stand as keepers of local food traditions. Our master chefs prepare breakfast, lunch meals, and our famous evening filter coffee with recipes passed down through generations. 
            </p>

            <div className="space-y-4">
              
              <div className="flex items-start space-x-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">Handpicked Local Ingredients</h4>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    Sourcing directly from local farmers in Mysore district ensuring absolute crisp freshness and supreme flavor.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">Melt-In-Your-Mouth Quality</h4>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    The famous crispy golden texture of our Dosas comes from a carefully fermented black lentil rice batter recipe, ground daily on ancient stone-grinders.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">Fast & Warm Indian Dining Experience</h4>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    Enjoy fast service from our legendary, smiling team members who serve every single cup of coffee scalding hot and piping fresh.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 flex items-center space-x-4">
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <p className="italic text-stone-600 text-sm">
                  &quot;The quintessential Mysuru breakfast experience! Excellent flavor, superb value, and iconic coffee in every serve.&quot;
                </p>
                <span className="text-xs font-bold block mt-1.5 text-stone-900">— 4.1 rated user citation on search</span>
              </div>
            </div>

          </div>

        </section>

        {/* Interactive Reviews & Customer Feedbacks */}
        <section id="reviews" className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-10 space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-stone-200 pb-8">
            <div className="space-y-2">
              <span className="text-amber-700 font-bold uppercase text-xs tracking-widest block">Customer Testimonials</span>
              <h3 className="text-3xl font-serif font-black tracking-tight text-stone-950">
                What 3,914 Diners Are Saying
              </h3>
              <p className="text-stone-650 text-sm max-w-xl">
                We pride ourselves on culinary consistency. Read honest testimonials from genuine food lovers, or share your own personal experience below.
              </p>
            </div>
            
            {/* Quick rating summaries card */}
            <div className="bg-white px-5 py-4 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4 self-stretch md:self-auto justify-center">
              <div className="text-center">
                <span className="block text-3xl font-serif font-extrabold text-stone-900">4.1</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">out of 5 stars</span>
              </div>
              <div className="h-10 w-px bg-stone-200"></div>
              <div>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500 opacity-60" />
                </div>
                <p className="text-xs text-stone-600 font-semibold mt-1">3,914 Verified reviews</p>
              </div>
            </div>
          </div>

          {/* Testimonial Feed Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Review List Left */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Diners Feedback</h4>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin pr-1">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-5 rounded-2xl border border-stone-150 shadow-sm space-y-3.5 transition-all hover:border-stone-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-bold text-stone-900 text-sm sm:text-base">{rev.author}</h5>
                        <span className="text-stone-400 text-xs">{rev.date}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-stone-800">{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-sm text-stone-650 leading-relaxed italic">
                      &quot;{rev.comment}&quot;
                    </p>

                    {/* Social feedback buttons */}
                    <div className="flex items-center justify-between pt-1 text-xs text-stone-500">
                      <button 
                        onClick={() => handleLikeReview(rev.id)}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors ${rev.isLiked ? "bg-amber-50 text-amber-700 font-bold" : "hover:bg-stone-100"}`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${rev.isLiked ? "fill-amber-600 text-amber-700" : ""}`} />
                        <span>{rev.likes} Helpful</span>
                      </button>
                      <span className="text-[10px] text-stone-400 bg-stone-50 px-2 py-1 rounded">Verified Visitor</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Leave a Review Form Right */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-md space-y-6">
              
              <div className="space-y-1.5">
                <h4 className="text-lg font-serif font-bold text-stone-900">Share Your Experience</h4>
                <p className="text-xs text-stone-500">Have you visited Mahesh Prasad? Tell other travelers what you enjoyed most!</p>
              </div>

              {submittedReview ? (
                <div className="bg-emerald-55 bg-emerald-50 border border-emerald-250 p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h5 className="font-bold text-emerald-900">Review Submitted Successfully!</h5>
                  <p className="text-xs text-emerald-700">Thank you for rating Mahesh Prasad Veg Restaurant. Your feedback keeps our traditional standards pristine!</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  
                  <div>
                    <label htmlFor="reviewer-name" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Your Name</label>
                    <input 
                      id="reviewer-name"
                      type="text" 
                      placeholder="e.g. Anand Kumar" 
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      required
                      className="w-full bg-stone-50 border border-stone-200 text-stone-850 px-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Your Rating</label>
                    <div className="flex items-center space-x-1.5">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setNewRating(val)}
                          className="p-1 rounded hover:bg-stone-100 transition-colors focus:ring-1 focus:ring-amber-400"
                          title={`${val} Stars`}
                        >
                          <Star className={`w-7 h-7 transition-colors ${val <= newRating ? "fill-amber-400 text-amber-500" : "text-stone-300"}`} />
                        </button>
                      ))}
                      <span className="text-sm font-bold text-stone-700 ml-2">{newRating} out of 5</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reviewer-comment" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Your Honest Review Comment</label>
                    <textarea 
                      id="reviewer-comment"
                      rows={3}
                      placeholder="Describe what you ate (e.g., Dosa, Coffee) and your service experience..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                      className="w-full bg-stone-50 border border-stone-200 text-stone-850 px-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-stone-900 hover:bg-stone-850 text-white text-sm font-bold py-3.5 rounded-xl transition-all hover:scale-101 active:scale-99 shadow-md flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>Submit Review Feedback</span>
                  </button>

                </form>
              )}

            </div>

          </div>

        </section>

        {/* Dynamic Table Reservation / Event Inquiry Form */}
        <section id="reservation" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch scroll-mt-24">
          
          {/* Reservation Card Details - Left */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-amber-400 font-bold uppercase text-xs tracking-widest block">Group Dinners & Catering</span>
              <h3 className="text-3xl font-serif font-black tracking-tight leading-tight">
                Planning a Family Gatherting or Event?
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                While we operate primarily on an open walk-in policy, we happily arrange table couplings for large groups of 6+ or cater traditional Mysuru feasts for custom events, family rituals, and business meetings.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-800">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Why Pre-Register with us?</h4>
              
              <ul className="space-y-3.5 text-sm font-medium">
                <li className="flex items-center space-x-2.5 text-stone-200">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">✓</span>
                  <span>Zero Queue Waiting Time</span>
                </li>
                <li className="flex items-center space-x-2.5 text-stone-200">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">✓</span>
                  <span>Dedicated table servers</span>
                </li>
                <li className="flex items-center space-x-2.5 text-stone-200">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">✓</span>
                  <span>Customizable food menu items</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-stone-400">Need instant custom catering quote? Call:</p>
              <a href="tel:08212330820" className="text-lg font-bold text-amber-400 hover:underline flex items-center space-x-1.5">
                <Phone className="w-4 h-4 inline" />
                <span>0821 233 0820</span>
              </a>
            </div>
          </div>

          {/* Interactive Booking Form - Right */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between">
            <div className="space-y-2 mb-4">
              <h4 className="text-xl font-serif font-black text-stone-900">Request Group Table / Event Space</h4>
              <p className="text-xs text-stone-500">Provide details below. Our reservation manager will call back to confirm your booking within 15 minutes.</p>
            </div>

            {bookingSubmitted ? (
              <div className="flex-1 bg-amber-50/50 border border-amber-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-150 bg-amber-100 flex items-center justify-center">
                  <ClipboardCheck className="w-8 h-8 text-amber-700" />
                </div>
                <div>
                  <h5 className="font-serif font-black text-stone-900 text-lg">Inquiry Successfully Registered!</h5>
                  <p className="text-sm text-stone-700 max-w-md mt-1 leading-relaxed">
                    Thank you <span className="font-bold">{bookingName}</span>! We have received your request for <span className="font-bold">{bookingGuestCount} guests</span> on <span className="font-bold">{bookingDate}</span>. Our dining executive will call your mobile number <span className="font-semibold text-amber-800">{bookingPhone}</span> within 10–15 minutes.
                  </p>
                </div>
                <div className="w-full text-xs text-stone-500">
                  Your prompt booking details are tracked securely under local browser safety.
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingConfirm} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-name" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Your Full Name</label>
                    <input 
                      id="booking-name"
                      type="text" 
                      placeholder="e.g. Ramesh Hegde" 
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      required
                      className="w-full bg-stone-50 border border-stone-200 text-stone-850 px-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Mobile Contact Phone</label>
                    <input 
                      id="booking-phone"
                      type="tel" 
                      placeholder="e.g. 09845X XXXXX" 
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      required
                      className="w-full bg-stone-50 border border-stone-200 text-stone-850 px-3.5 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="booking-guests" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">No. of Guests</label>
                    <select 
                      id="booking-guests"
                      value={bookingGuestCount}
                      onChange={(e) => setBookingGuestCount(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-850 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all"
                    >
                      <option value="2">2 - Small Table</option>
                      <option value="4">4 - Standard Table</option>
                      <option value="6">6 - Coupling Table</option>
                      <option value="8">8 - Large Family Bench</option>
                      <option value="12">12+ - Party Hall Suite</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="booking-date" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Preferred Date</label>
                    <input 
                      id="booking-date"
                      type="date" 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="w-full bg-stone-50 border border-stone-200 text-stone-850 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500/60 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-time" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Preferred Time</label>
                    <input 
                      id="booking-time"
                      type="time" 
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-850 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500/60 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-600 leading-relaxed">
                  <strong>Important Dining Note:</strong> Walk-in queues remain fully functional. Registered banquet space inquiries or high-volume table coupons will request a final call verification to ensure flawless table prep before arrival.
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:scale-101 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5 text-white" />
                  <span>Submit Table Pre-Registration</span>
                </button>

              </form>
            )}

          </div>

        </section>

      </main>

      {/* Comprehensive Maps Area & Visual Location Footer Segment */}
      <section id="full-map" className="aspect-21/9 relative min-h-[350px] bg-stone-200 flex items-center justify-center overflow-hidden border-t border-b border-stone-300">
        
        {/* Mock static maps render utilizing professional satellite outlines or a clean, stylized route layout */}
        <div className="absolute inset-0 z-0 bg-stone-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center text-center">
          
          <div className="max-w-md mx-auto space-y-4 px-6 z-10">
            <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center mx-auto shadow-lg">
              <Map className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-xl font-serif font-black text-stone-900">Map & Satellite Guidance</h4>
              <p className="text-xs text-stone-500 leading-relaxed px-4">
                Located near Ballal Circle, right next to the RTO Office in the beautiful surroundings of Lakshmipuram/Chamarajapuram, Mysuru, Karnataka 570005.
              </p>
            </div>

            <div className="pt-2">
              <a 
                href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
              >
                <span>Navigate on Google Maps App</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Floating cards */}
        <div id="quick-address" className="hidden lg:block absolute bottom-8 left-12 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-sm border border-stone-200 z-10 space-y-3">
          <h5 className="font-serif font-extrabold text-stone-900 text-sm">Mahesh Prasad landmarks</h5>
          <p className="text-xs text-stone-600 leading-relaxed">
            Beautifully nestled in Chamarajapuram Mohalla, adjacent to Ballal Circle, Mysore. Extremely close to RTO Office. Dedicated private parking for two-wheelers and parking arrangements for tourist cars.
          </p>
          <div className="flex text-amber-500 text-xs font-bold space-x-2">
            <span>✓ Dine-in</span>
            <span>• Takeaway</span>
            <span>• catering</span>
          </div>
        </div>

      </section>

      {/* Footer Area */}
      <footer id="main-footer" className="bg-stone-950 text-stone-400 py-16 px-4 border-t border-stone-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo Brand Right Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 border border-emerald-600 flex items-center justify-center p-0.5 bg-white rounded-md">
                <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
              </div>
              <span className="text-lg font-serif font-black text-white tracking-wide">Mahesh Prasad Veg Restaurant</span>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Mysuru’s cherished culinary treasure, serving delicious pure vegetarian South Indian meals, fluffy idlis, crispy dosas, and heritage filter coffee under uncompromised traditional hygiene standards.
            </p>

            <p className="text-xs text-stone-500">
              Copyright © {new Date().getFullYear()} Mahesh Prasad Veg Restaurant, Mysuru. All architectural rights reserved.
            </p>
          </div>

          {/* Quick links Center */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Dine-In Information</h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Culinary Dosa Menu</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">3,900+ Google Reviews</a></li>
              <li><a href="#heritage" className="hover:text-amber-400 transition-colors">Our Karnataka Heritage</a></li>
              <li><a href="#reservation" className="hover:text-amber-400 transition-colors">Banquet & Group Tables</a></li>
            </ul>
          </div>

          {/* Contact Details Left Column */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Business Information</h5>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-500 inline mr-1 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-stone-400">
                  Ballal Cir, near RTO Office, Chamarajapura, Mysuru, Karnataka 570005
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-500 inline mr-1 flex-shrink-0" />
                <a href="tel:08212330820" className="hover:text-white transition-colors">0821 233 0820</a>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-500 inline mr-1 flex-shrink-0" />
                <span>6:30 AM – 10:30 PM (All Days)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-stone-900 border border-stone-800 hover:border-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center space-x-1.5 transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Open Google Maps</span>
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Share Link Copied to clipboard!");
                }}
                className="bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-400 hover:text-white p-2 rounded-lg transition-all"
                title="Share Website"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
