import { useState, useMemo, FormEvent } from 'react';
import { 
  Star, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  Check, 
  ChevronDown, 
  Copy, 
  Plus, 
  Utensils, 
  Compass, 
  Search, 
  MessageSquare, 
  ChevronRight, 
  Info,
  X,
  MapPinIcon,
  PhoneCall,
  Menu as MenuIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// @ts-ignore
import heroImg from './assets/images/oyster_bay_hero_1781294772413.jpg';
// @ts-ignore
import plateImg from './assets/images/finedining_plate_1781294791397.jpg';

import { RESTAURANT_INFO, MENU_ITEMS, CLIENT_REVIEWS, FAQS, MENU_CATEGORIES } from './data';

export default function App() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Menu category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Reservation Form State
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [guestsCount, setGuestsCount] = useState<string>("2 Guests");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [specialRequest, setSpecialRequest] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Review states (supports adding client-side reviews to the lists)
  const [reviewsList, setReviewsList] = useState(CLIENT_REVIEWS);
  const [ratingInput, setRatingInput] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Address Copied notification
  const [addressCopied, setAddressCopied] = useState(false);

  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Handlers
  const handleReservationSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !bookingDate || !bookingTime) {
      alert("Please fill in the required fields (Name, Phone, Date, and Time).");
      return;
    }
    const generatedId = "OB-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);
    setBookingSuccess(true);
  };

  const resetBookingForm = () => {
    setBookingSuccess(false);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setBookingDate("");
    setBookingTime("");
    setGuestsCount("2 Guests");
    setSpecialRequest("");
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      alert("Please provide both your name and some feedback lines.");
      return;
    }
    const newReview = {
      id: "r_custom_" + Date.now(),
      author: reviewAuthor,
      rating: ratingInput,
      date: "Just now",
      comment: reviewComment,
      origin: "Verified Visitor"
    };
    setReviewsList([newReview, ...reviewsList]);
    setReviewAuthor("");
    setReviewComment("");
    setRatingInput(5);
    setReviewSuccessMessage(true);
    setTimeout(() => {
      setReviewSuccessMessage(false);
      setReviewModalOpen(false);
    }, 2000);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2500);
  };

  // Filter items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Calculate dynamic review stats
  const totalReviewsCount = RESTAURANT_INFO.reviewsCount + (reviewsList.length - CLIENT_REVIEWS.length);
  const averageRating = useMemo(() => {
    const totalOriginalSum = RESTAURANT_INFO.rating * RESTAURANT_INFO.reviewsCount;
    const addedSum = reviewsList.slice(0, reviewsList.length - CLIENT_REVIEWS.length).reduce((sum, r) => sum + r.rating, 0);
    return ((totalOriginalSum + addedSum) / totalReviewsCount).toFixed(2);
  }, [reviewsList, totalReviewsCount]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans bg-[#FAF9F6] text-[#1D1610] selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden" id="main_container">
      
      {/* EXQUISITE TOP NOTIFICATION BAR */}
      <div className="bg-[#14100D] text-gold-200 text-xs py-2 px-4 border-b border-gold-900/40" id="top_notification_bar">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-mono tracking-wider text-center md:text-left">
            ✨ MYSURU’S ULTIMATE FINE DINING EXPERIENCE • HIGHEST RATED SEAFOOD DESTINATION
          </p>
          <div className="flex items-center gap-6 font-medium">
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors flex items-center gap-1.5 duration-200">
              <PhoneCall className="w-3.5 h-3.5 text-gold-300" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
            <button 
              onClick={() => scrollToSection('location_map')} 
              className="hover:text-white transition-colors flex items-center gap-1.5 duration-200 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-300" />
              <span>Vijayanagar 2nd Stage, Mysuru</span>
            </button>
          </div>
        </div>
      </div>

      {/* LUXURY PRE-HEADER BRAND BAR & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm" id="main_header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center">
          
          {/* Logo Brand Brand */}
          <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection('hero_banner')}>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-gold-900 flex items-center gap-2">
              OYSTER <span className="text-gold-500 font-normal italic">BAY</span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8C641F] -mt-1 font-bold">
              Fine Dining Restaurant
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-neutral-800" id="desktop_nav_links">
            <button onClick={() => scrollToSection('about_us')} className="hover:text-gold-600 transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection('menu_explorer')} className="hover:text-gold-600 transition-colors cursor-pointer">Signature Menu</button>
            <button onClick={() => scrollToSection('customer_reviews')} className="hover:text-gold-600 transition-colors cursor-pointer">Guest Reviews</button>
            <button onClick={() => scrollToSection('faq_section')} className="hover:text-gold-600 transition-colors cursor-pointer">FAQs</button>
            <button onClick={() => scrollToSection('location_map')} className="hover:text-gold-600 transition-colors cursor-pointer">Location</button>
          </nav>

          {/* Reserve Table CTA in Navbar */}
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('reservation_form')} 
              className="bg-[#1D1610] hover:bg-gold-850 text-white font-medium text-xs tracking-wider uppercase px-5 py-2.5 rounded-sm border border-gold-400 hover:border-gold-300 transition-all duration-300 cursor-pointer shadow-sm"
              id="header_reserve_btn"
            >
              Order & Reservations
            </button>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden flex items-center p-2 text-neutral-800 hover:text-gold-600 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
            id="mobile_menu_toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-white border-t border-amber-900/10 px-4 py-4 space-y-3 shadow-inner"
              id="mobile_nav_panel"
            >
              <button onClick={() => scrollToSection('about_us')} className="block w-full text-left py-2 text-neutral-800 hover:text-gold-600 font-medium text-sm">About Oysters Bay</button>
              <button onClick={() => scrollToSection('menu_explorer')} className="block w-full text-left py-2 text-neutral-800 hover:text-gold-600 font-medium text-sm">Our Signature Menu</button>
              <button onClick={() => scrollToSection('customer_reviews')} className="block w-full text-left py-2 text-neutral-800 hover:text-gold-600 font-medium text-sm">Guest Reviews</button>
              <button onClick={() => scrollToSection('faq_section')} className="block w-full text-left py-2 text-neutral-800 hover:text-gold-600 font-medium text-sm">Frequent Questions</button>
              <button onClick={() => scrollToSection('location_map')} className="block w-full text-left py-2 text-neutral-800 hover:text-gold-600 font-medium text-sm">Find Address & Route</button>
              <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                <button 
                  onClick={() => scrollToSection('reservation_form')} 
                  className="w-full bg-[#1D1610] text-white text-center py-2.5 rounded-sm text-xs uppercase font-semibold tracking-wider font-mono border border-gold-300"
                >
                  Reserve a Table Now
                </button>
                <a 
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="w-full bg-gold-50 text-gold-900 text-center py-2.5 rounded-sm text-xs font-semibold tracking-wider flex items-center justify-center gap-2 border border-gold-200"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Call +91 99000 37368
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION WITH LUXURIANCE & SOCIAL PROOF */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-white bg-[#0F0A06]" id="hero_banner">
        
        {/* Background Image with Dark Golden Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat overflow-hidden select-none">
          <img 
            src={heroImg} 
            alt="Oyster Bay fine dining interior table setup" 
            className="w-full h-full object-cover scale-102 filter brightness-65 contrast-105 transition-transform duration-10000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-neutral-900/80 to-[#120D08]/90 z-10" />
        </div>

        {/* Hero Interactive Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center mt-6">
          
          {/* Rank and Category Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gold-300/30 mb-6 animate-fade-in">
            <span className="bg-gold-500 text-black text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              ★ Mysuru Rank #{RESTAURANT_INFO.foundViaQuery ? '2' : '2'}
            </span>
            <span className="text-white text-[10px] sm:text-xs tracking-wide font-medium font-mono">
              Fine Dining Seafood & Continental
            </span>
          </div>

          {/* Master Display Typography */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 text-[#FFF]">
            Oyster <span className="text-gold-200 italic font-semibold">Bay</span>
          </h1>
          
          <p className="font-sans text-lg sm:text-xl md:text-2xl font-light tracking-wide text-amber-100 max-w-2xl mx-auto mb-6">
            Mysuru's distinguished culinary oasis near the landmark Vijayanagar water tank.
          </p>
          
          {/* Star Rating Panel */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-center">
            <div className="flex items-center bg-gold-900/90 border border-gold-300/40 px-4 py-2 rounded-md">
              <div className="flex text-gold-300 mr-2.5 animate-pulse">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current text-white/10" /> 
              </div>
              <span className="font-mono text-base font-bold text-gold-100">{averageRating} / 5</span>
            </div>
            
            <div className="text-sm font-mono tracking-wide text-amber-100/90 text-center sm:text-left">
              Based on <span className="text-white font-bold border-b border-gold-400 pb-0.5">{totalReviewsCount.toLocaleString()} real visitor reviews</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => scrollToSection('reservation_form')}
              className="w-full sm:w-auto bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-sm transition-all duration-300 shadow-xl cursor-pointer"
            >
              Book Dinner Session
            </button>
            <button
              onClick={() => scrollToSection('menu_explorer')}
              className="w-full sm:w-auto bg-transparent border-2 border-white/60 hover:border-gold-300 hover:text-gold-200 hover:bg-white/5 text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 rounded-sm transition-all duration-300 cursor-pointer"
            >
              Discover Menu
            </button>
          </div>

        </div>

        {/* Scroll Indicator Down pointer */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 opacity-80 cursor-pointer" onClick={() => scrollToSection('about_us')}>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-gold-200">Our Story</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-5 h-5 text-gold-400" />
          </motion.div>
        </div>
      </section>


      {/* LANDMARK HIGHLIGHT BOARD / QUICK DETAILS PANEL */}
      <section className="bg-white/80 border-y border-amber-900/10 py-8 relative z-30" id="quick_highlight_panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
            
            {/* Hour detail */}
            <div className="flex gap-4 items-start">
              <div className="bg-gold-100 p-3.5 rounded-full text-gold-700">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-gold-900">Elegant Dining Hours</h4>
                {RESTAURANT_INFO.workingHours.map((wh, idx) => (
                  <p key={idx} className="text-xs text-neutral-600 mt-1">
                    <span className="font-medium text-neutral-800">{wh.days}:</span> {wh.hours}
                  </p>
                ))}
              </div>
            </div>

            {/* Address detail */}
            <div className="flex gap-4 items-start">
              <div className="bg-gold-100 p-3.5 rounded-full text-gold-700">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-serif font-bold text-lg text-gold-900 flex items-center justify-between">
                  <span>Our Mysuru Landmark</span>
                  <button 
                    onClick={copyAddress}
                    className="text-xs text-gold-600 hover:text-gold-800 focus:outline-none flex items-center gap-1 cursor-pointer font-sans"
                    title="Copy full address"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{addressCopied ? "Copied!" : "Copy"}</span>
                  </button>
                </h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Near the landmark <span className="font-medium text-neutral-800">Water tank, Vijayanagar 2nd Stage</span>. Kannada Parishath Road, 570017.
                </p>
              </div>
            </div>

            {/* Contact detail */}
            <div className="flex gap-4 items-start">
              <div className="bg-gold-100 p-3.5 rounded-full text-gold-700">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-gold-900">Direct Front Desk</h4>
                <p className="text-xs text-neutral-600 mt-1">
                  Call for private event reservations or table requests anytime during working hours:
                </p>
                <a 
                  href={`tel:${RESTAURANT_INFO.phone}`} 
                  className="font-mono text-base font-bold text-gold-700 hover:text-gold-800 mt-1 inline-block transition-colors"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* THE HEART OF OYSTER BAY - ABOUT US & AMBIENCE STORY */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about_us">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Elegant Chef Plate image block (gorgeous layout geometry) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={plateImg} 
                alt="Signature coastal fresh oysters plate" 
                className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold-200">Signature Dish</p>
                <h3 className="font-serif font-bold text-lg leading-tight">Fresh Coastal Butter Oysters</h3>
              </div>
            </div>
            
            {/* Abstract visual decor element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-gold-300 -z-10" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-[#1D1610]/40 -z-10" />
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#8C641F] font-bold block">
              ESTABLISHED IN MYSURU
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gold-900 leading-tight">
              A Symphony of Fresh <span className="italic text-gold-600">Coastal Flavors</span> & Continental Luxury
            </h2>
            
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-light">
              We started with a simple ambition: to establish a culinary marvel inside the historical garden city of Mysuru, serving freshest bounties retrieved sustainably from the ocean and plated using sophisticated French, Indian, and Continental techniques.
            </p>
            
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              Oyster Bay is designed with magnificent wooden structures, comfortable velvet booths, high vaulted ceilings, and warm, romantic lighting panels. Whether you're ordering our legendary local <span className="font-semibold text-neutral-900">Mangalorean Ghee Roast Prawns</span>, tasting premium, rich artisan mocktails, or celebrating an anniversary near our breezy outdoor garden patio, you are treated with royal hospitality.
            </p>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-6 pt-6 border-t border-amber-900/10">
              <div>
                <dt className="text-2xl sm:text-3xl font-serif font-bold text-gold-700">4.1★</dt>
                <dd className="text-xs text-neutral-500 font-mono tracking-wider uppercase mt-1">Excellent Rating</dd>
              </div>
              <div>
                <dt className="text-2xl sm:text-3xl font-serif font-bold text-gold-700">3.6k+</dt>
                <dd className="text-xs text-neutral-500 font-mono tracking-wider uppercase mt-1">Verified Guests</dd>
              </div>
              <div>
                <dt className="text-2xl sm:text-3xl font-serif font-bold text-gold-700">Rank #2</dt>
                <dd className="text-xs text-neutral-500 font-mono tracking-wider uppercase mt-1">Top Diner in Mysuru</dd>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('reservation_form')}
                className="bg-[#1D1610] hover:bg-neutral-800 text-white font-medium text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition-all duration-200 cursor-pointer"
              >
                Inquire or Reserve Online
              </button>
              <button 
                onClick={() => scrollToSection('menu_explorer')}
                className="bg-transparent border border-neutral-300 hover:border-gold-500 hover:text-gold-700 text-neutral-700 font-medium text-xs tracking-wider uppercase px-6 py-3 rounded-sm transition-all duration-200"
              >
                View Full Menu Card
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* INTERACTIVE MENU EXPLORER SECTION */}
      <section className="bg-gradient-to-b from-[#1C1510] to-[#0A0705] text-white py-20 sm:py-28" id="menu_explorer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-300 block">
              EPICUREAN SELECTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              A Culinary Journey of Exceptional <span className="italic text-gold-200">Taste & Flair</span>
            </h2>
            <div className="h-0.5 w-24 bg-gold-400 mx-auto mt-4" />
            <p className="text-amber-100/75 text-sm sm:text-base leading-relaxed font-light">
              Browse our masterfully crafted fine-dining selections. Filter by category, or search for your favorite seafood masterpiece or vegetarian classic.
            </p>
          </div>

          {/* Search and Category Filters controls bar */}
          <div className="bg-[#14100D] border border-gold-900/60 p-4 rounded-lg shadow-2xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Category selection */}
            <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
              <button 
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-sm text-xs uppercase font-semibold tracking-wider font-mono transition-all duration-200 cursor-pointer ${selectedCategory === "All" ? 'bg-gold-500 text-black' : 'bg-transparent text-gray-300 hover:bg-white/5 border border-white/10'}`}
              >
                All Items
              </button>
              {MENU_CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-xs uppercase font-semibold tracking-wider font-mono transition-all duration-200 cursor-pointer ${selectedCategory === cat ? 'bg-gold-500 text-black' : 'bg-transparent text-gray-300 hover:bg-white/5 border border-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <Search className="w-4 h-4 text-gold-300" />
              </span>
              <input 
                type="text" 
                placeholder="Search oyster, pomfret, veg, etc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1C1510]/80 text-white rounded-md pl-10 pr-4 py-2.5 text-xs font-medium tracking-wide focus:outline-none focus:ring-1 focus:ring-gold-400 border border-gold-900/40"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* filtered list representation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredMenuItems.map((item, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="bg-[#120D0A]/70 hover:bg-[#1C140F]/80 p-5 sm:p-6 rounded-md border border-neutral-900/30 hover:border-gold-500/20 transition-all duration-350 shadow-lg flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    
                    {/* Header line */}
                    <div className="flex justify-between items-baseline gap-4">
                      <h3 className="font-serif text-lg sm:text-xl font-bold group-hover:text-gold-200 transition-colors">
                        {item.name}
                      </h3>
                      {/* elegant gold bridge border line on hover */}
                      <span className="text-gold-300 font-mono text-base font-bold text-right shrink-0">
                        {item.price}
                      </span>
                    </div>

                    {/* description */}
                    <p className="text-amber-100/70 text-xs sm:text-sm leading-relaxed font-light font-mono italic">
                      {item.description}
                    </p>
                  </div>

                  {/* footer item tags */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-900/50 mt-4">
                    <span className="text-[10px] font-semibold text-gold-300 bg-gold-950/80 px-2 py-0.5 rounded-sm uppercase tracking-widest font-mono border border-gold-900/40">
                      {item.category}
                    </span>
                    <div className="flex gap-1.5">
                      {item.tags?.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] text-gray-400 bg-neutral-900/45 px-2 py-0.5 rounded-sm font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Zero item results state */}
            {filteredMenuItems.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-16 bg-[#16100D]/50 rounded-lg border border-gold-900/30">
                <Search className="w-12 h-12 text-gold-400 mx-auto opacity-55 mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">No culinary items found</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  We couldn't find any dishes matching "{searchQuery}" under {selectedCategory}. Try another keyword like "oysters", "shrimp", "mignon", or change category.
                </p>
                <button 
                  onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                  className="mt-6 bg-gold-400 text-black text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-sm hover:bg-gold-500"
                >
                  Clear search Filters
                </button>
              </div>
            )}
          </div>

          {/* Quick interactive order text */}
          <div className="mt-16 bg-[#14100D] border border-gold-500/20 p-6 rounded-md max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="bg-gold-950 p-3 rounded-full text-gold-300 border border-gold-500/30">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-gold-300">Have customized dietary preferences?</h4>
                <p className="text-gray-400 text-xs mt-0.5">We cater to wheat-free, vegan or gluten-sensitive diets. Just tell our kitchen staff!</p>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('reservation_form')}
              className="bg-gold-500 hover:bg-gold-600 text-black font-semibold text-xs tracking-wider uppercase py-3 px-6 rounded-sm whitespace-nowrap cursor-pointer"
            >
              Reserve dinner now
            </button>
          </div>

        </div>
      </section>


      {/* AUTHENTIC REVIEWS SECTION WITH DYNAMIC REVIEWS FEEDBACK ENGINE */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="customer_reviews">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Review Column Left - Google Statistics */}
          <div className="lg:col-span-4 bg-white border border-rose-950/5 shadow-xl p-6 sm:p-8 rounded-lg sticky top-28">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C641F] font-bold block mb-2">
              GOOGLE REVIEWS
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-normal text-gold-900 leading-tight">
              Loved by Thousands of Diners
            </h2>
            
            <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
              Serving the people of Mysuru and global travelers with equal grace. Our reputation is built on 3600+ authentic submissions.
            </p>

            {/* Huge rating block */}
            <div className="my-8 py-6 border-y border-gray-100 flex items-center justify-between gap-4">
              <div>
                <span className="font-serif text-5xl font-bold text-neutral-900 block tracking-tight">
                  {averageRating}
                </span>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1 block">
                  Out of 5 Stars
                </span>
              </div>
              <div className="text-right">
                <div className="flex text-gold-500 justify-end mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs text-neutral-500 font-mono block font-semibold text-gold-700">
                  {totalReviewsCount.toLocaleString()} Verified reviews
                </span>
              </div>
            </div>

            {/* Direct write review button */}
            <div className="space-y-3">
              <button 
                onClick={() => setReviewModalOpen(true)}
                className="w-full bg-[#1D1610] text-white hover:bg-gold-750 p-3.5 rounded-sm text-xs uppercase font-mono tracking-wider font-semibold border border-gold-400 hover:border-gold-300 transition-all cursor-pointer flex items-center justify-center gap-2"
                id="open_review_modal_btn"
              >
                <Plus className="w-4 h-4 text-gold-300" /> Write local feedback
              </button>
              
              <p className="text-[11px] text-center text-neutral-500">
                Your feedback helps us continue our fine dining tradition program.
              </p>
            </div>
          </div>

          {/* Review Column Right - Live scrolling list */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1a1510] border-b border-gray-100 pb-3 flex justify-between items-center">
              <span>Guest Experiences ({reviewsList.length})</span>
              <span className="text-xs font-mono font-medium text-neutral-500 italic">Latest Submissions</span>
            </h3>

            <div className="space-y-6">
              {reviewsList.map((review, rIdx) => (
                <div 
                  key={review.id} 
                  className="bg-white border border-gray-200/60 p-5 sm:p-6 rounded-md shadow-sm relative group hover:border-gold-300/60 transition-all duration-300"
                >
                  {/* review upper row */}
                  <div className="flex justify-between items-start gap-4 flex-wrap mb-3">
                    <div>
                      <h4 className="font-serif text-base font-bold text-neutral-900">{review.author}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5 mt-1">
                        <div className="flex text-gold-500">
                          {Array.from({ length: 5 }).map((_, stIdx) => (
                            <Star 
                              key={stIdx} 
                              className={`w-3.5 h-3.5 ${stIdx < review.rating ? 'fill-current' : 'text-neutral-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-neutral-400 font-mono">• {review.date}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-neutral-100 text-[#8C641F] font-semibold px-2 py-1 rounded">
                      Source: {review.origin}
                    </span>
                  </div>

                  {/* comment body */}
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed italic font-light">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* INTERACTIVE REVIEW WRITING DIALOG MODAL */}
      <AnimatePresence>
        {reviewModalOpen && (
          <div className="fixed inset-0 bg-[#120D0A]/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" id="review_modal">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg border border-amber-900/10 w-full max-w-lg shadow-2xl p-6 relative overflow-hidden"
            >
              {/* heading close */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-gold-900">Share Your Dinner Opinion</h3>
                <button 
                  onClick={() => setReviewModalOpen(false)}
                  className="p-1 cursor-pointer hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reviewSuccessMessage ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mx-auto">
                    <Check className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-neutral-900">Review Submitted!</h4>
                  <p className="text-sm text-neutral-600 max-w-xs mx-auto">
                    Thank you immensely. Your rating has been recorded locally and factored into the average!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2 font-semibold">
                      Your Oyster Bay Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setRatingInput(stars)}
                          className="p-1 cursor-pointer text-gold-500 hover:scale-115 transition-transform"
                        >
                          <Star className={`w-8 h-8 ${stars <= ratingInput ? 'fill-current' : 'text-neutral-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                      Your Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rahul Kumar"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full bg-neutral-50 rounded border border-gray-300 p-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {/* Comment Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                      Your Direct Feedback
                    </label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Comment on the oysters, seafood freshness, tandoori menu quality or hospitality service..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-neutral-50 rounded border border-gray-300 p-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {/* action button */}
                  <button 
                    type="submit" 
                    className="w-full bg-[#1D1610] hover:bg-gold-850 text-white py-3 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold border border-gold-400"
                  >
                    Submit Feedback
                  </button>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* INTERACTIVE RESERVATION BOOKINGS & EVENT MANAGER */}
      <section className="bg-[#1C1510] text-white py-20 sm:py-28" id="reservation_form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column 1 info panel */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-300 font-bold block">
                JOURNAL & RESERVATION DECK
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Secure Your Fine <span className="italic text-gold-200">Dining Table</span>
              </h2>
              
              <p className="text-amber-100/75 text-sm sm:text-base leading-relaxed font-light">
                Secure tables online in seconds. Our automated dining reservation module reserves places directly near our garden fountain terrace or inside the opulent premium dining chamber under your name.
              </p>

              {/* Special features points */}
              <ul className="space-y-3.5 text-xs sm:text-sm font-mono text-amber-100/80">
                <li className="flex items-center gap-3">
                  <span className="bg-gold-500/20 text-gold-300 p-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Instant confirmation email and booking identification.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-gold-500/20 text-gold-300 p-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Zero reservation fees or pre-payment required.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-gold-500/20 text-gold-300 p-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Free modifications or cancellations up to 2 hours before.</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-neutral-800">
                <p className="text-xs text-gray-400">Prefer voice reservations?</p>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-gold-400" />
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-mono text-base font-bold text-gold-300 hover:underline">
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 interactive Reservation Form panel */}
            <div className="lg:col-span-7 bg-white text-[#1D1610] p-6 sm:p-10 rounded-lg border border-amber-900/15 shadow-2xl relative overflow-hidden" id="booking_form_wrapper">
              
              {/* Golden side graphic block */}
              <div className="absolute top-0 right-0 w-24 h-1.5 bg-gradient-to-r from-gold-300 to-gold-600" />

              {bookingSuccess ? (
                <div className="py-12 text-center space-y-6" id="booking_success_box">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-2 border-emerald-500/10">
                    <Check className="w-12 h-12 stroke-[2.5]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl font-bold text-neutral-900">Table Booked Successfully!</h4>
                    <p className="text-xs font-mono text-[#8C641F] bg-gold-50 px-3 py-1.5 rounded inline-block">
                      Booking Identification: <span className="font-bold">{bookingId}</span>
                    </p>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Booking summarize */}
                  <div className="bg-neutral-50 p-5 rounded-md text-left text-xs space-y-2.5 max-w-sm mx-auto border border-gray-100">
                    <p className="text-neutral-600"><span className="font-semibold text-neutral-900">Guest Name:</span> {customerName}</p>
                    <p className="text-neutral-600"><span className="font-semibold text-neutral-900">Date & Time:</span> {bookingDate} at {bookingTime}</p>
                    <p className="text-neutral-600"><span className="font-semibold text-neutral-900">Patron Group size:</span> {guestsCount}</p>
                    <p className="text-neutral-600"><span className="font-semibold text-neutral-900 font-mono">Contact Phone:</span> {customerPhone}</p>
                    {specialRequest && (
                      <p className="text-neutral-600 italic"><span className="font-semibold text-neutral-900 font-sans not-italic">Notes:</span> "{specialRequest}"</p>
                    )}
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed max-w-md mx-auto">
                    We have reserved this slot for you at Oysters Bay near Vijayanagar Water Tank, Mysuru. Please arrive 10 mins early. We look forward to treating you to exquisite food!
                  </p>

                  <div className="pt-2">
                    <button 
                      onClick={resetBookingForm}
                      className="bg-[#1D1610] hover:bg-gold-850 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-sm shadow cursor-pointer"
                    >
                      Make another reservation
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-5">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 pb-3 border-b border-gray-100 flex justify-between items-center">
                    <span>Reserve a Table</span>
                    <span className="text-[11px] font-mono text-neutral-400 capitalize normal-case font-normal italic">All items cooked fresh</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Date picker element */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                        Select Date *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                          <Calendar className="w-4 h-4 text-gold-600" />
                        </span>
                        <input 
                          type="date" 
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-[#FAF9F6]/90 border border-gray-300 pl-10 pr-3 py-2.5 rounded text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                        />
                      </div>
                    </div>

                    {/* Time picker element */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                        Select Time Slot *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                          <Clock className="w-4 h-4 text-gold-600" />
                        </span>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. 7:30 PM, 12:45 PM"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-[#FAF9F6]/90 border border-gray-300 pl-10 pr-3 py-2.5 rounded text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Guests selection menu */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                        Number of Diners
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                          <Users className="w-4 h-4 text-gold-600" />
                        </span>
                        <select 
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(e.target.value)}
                          className="w-full bg-[#FAF9F6]/90 border border-gray-300 pl-10 pr-3 py-2.5 rounded text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500 appearance-none cursor-pointer"
                        >
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                          <option>5 Guests</option>
                          <option>6 Guests</option>
                          <option>8 Guests</option>
                          <option>10+ Guests (Private dining)</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Phone number */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                        Your Mobile Phone *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 text-xs font-mono font-bold text-neutral-500">
                          +91
                        </span>
                        <input 
                          type="tel" 
                          required
                          placeholder="99000 37368"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-[#FAF9F6]/90 border border-gray-300 pl-12 pr-3 py-2.5 rounded text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Guest Name */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="Enter full name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#FAF9F6]/90 border border-gray-300 p-2.5 rounded text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                      />
                    </div>

                    {/* Email address */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1">
                        Your Email Address (Optional)
                      </label>
                      <input 
                        type="email" 
                        placeholder="e.g. rahul@gmail.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-[#FAF9F6]/90 border border-gray-300 p-2.5 rounded text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                      />
                    </div>

                  </div>

                  {/* Special requests comments */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1">
                      Are there any culinary/event requests?
                    </label>
                    <textarea 
                      rows={2}
                      placeholder="e.g. Vegetarian only table, allergy to seafood, anniversary table setup near the fountain, etc."
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full bg-[#FAF9F6]/90 border border-gray-300 p-2.5 rounded text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                  </div>

                  {/* form button */}
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-[#1D1610] hover:bg-gold-850 text-white font-semibold text-xs tracking-wider uppercase py-3.5 rounded-sm border border-gold-400 hover:border-gold-300 transition-all duration-300 shadow cursor-pointer"
                    >
                      Process Instant Reservation
                    </button>
                    <p className="text-[10px] text-center text-neutral-400 mt-2">
                      🔒 Your details are protected securely and will only be used to facilitate dining and seating.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>
      </section>


      {/* INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="bg-white py-16 sm:py-24" id="faq_section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C641F] font-bold block">
              HOSPITALITY GUIDE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-500 text-sm max-w-lg mx-auto">
              Everything you need to know about clothing preferences, reservations, ingredients and parking at Oyster Bay, Mysuru.
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {FAQS.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left py-3 focus:outline-none cursor-pointer group"
                >
                  <span className="font-serif font-bold text-base text-[#1D1610] group-hover:text-gold-700 transition-colors">
                    {faq.question}
                  </span>
                  <span className="ml-6 text-gold-600 bg-gold-50 p-1.5 rounded">
                    <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${activeFaq === index ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-neutral-600 leading-relaxed pb-4 pt-1 font-light pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* LOCATION, PHYSICAL DETAILS & INTERACTIVE MAP EMBED */}
      <section className="bg-[#FAF9F6] border-t border-amber-900/10 py-16 sm:py-24" id="location_map">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Map metadata card */}
            <div className="lg:col-span-5 bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow-xl flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C641F] font-bold block">
                  PHYSICAL DIRECTIONS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-900 leading-tight">
                  Discover Our Scenic Location
                </h3>
                
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Located near the famous high-capacity water tank landmark in the peaceful, lush residential/dining district of Vijayanagar 2nd Stage, Mysuru. It's fully connected and simple to find.
                </p>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  
                  {/* Address */}
                  <div className="flex gap-3">
                    <MapPinIcon className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono uppercase font-bold text-neutral-800">Complete Address</p>
                      <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                        {RESTAURANT_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Landmarks */}
                  <div className="flex gap-3">
                    <Compass className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono uppercase font-bold text-neutral-800">Clear Landmarks</p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Beside the Vijayanagar 2nd Stage Water Tank, on Kannada Parishath Road.
                      </p>
                    </div>
                  </div>

                  {/* Found Via */}
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono uppercase font-bold text-neutral-800">Local Listing Info</p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Found directly via Google Search query: <span className="font-semibold text-neutral-800">"{RESTAURANT_INFO.foundViaQuery}"</span>.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action buttons (copy address & google maps launch) */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  onClick={copyAddress}
                  className="bg-neutral-100 hover:bg-neutral-200 text-[#1D1610] text-xs font-bold tracking-wider uppercase p-3 rounded-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" /> 
                  <span>{addressCopied ? "Copied" : "Copy Address"}</span>
                </button>
                <a 
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-500 hover:bg-gold-600 text-black text-xs font-bold tracking-wider uppercase p-3 rounded-sm transition-all text-center flex items-center justify-center gap-2 block border-b border-gold-600"
                >
                  <MapPin className="w-3.5 h-3.5 text-black" />
                  <span>Open Google Maps</span>
                </a>
              </div>

            </div>

            {/* Simulated premium interactive elegant card map visual placeholder to guarantee beautiful UI (avoiding iframe broken API warnings) */}
            <div className="lg:col-span-7 bg-[#1D1610] p-4 sm:p-6 rounded-lg text-white relative overflow-hidden flex flex-col justify-between">
              
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C69C44_1px,transparent_1px)] [background-size:16px_16px] z-0" />

              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-300">
                    Oyster Bay, Mysuru Location Map Preview
                  </span>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                </div>
                
                {/* Visual mockup representation of Google maps */}
                <div className="bg-[#120D0A] h-72 sm:h-96 rounded-md border border-gold-900/50 relative overflow-hidden flex items-center justify-center">
                  
                  {/* Decorative map elements */}
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gold-900/30 font-mono text-[9px] text-[#8C641F] pl-4">Kannada Parishath Road</div>
                  <div className="absolute inset-y-0 left-1/3 w-0.5 bg-gold-900/30" />
                  
                  {/* Water tank landmark sphere */}
                  <div className="absolute top-1/4 left-1/4 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-[#1c2e42] border border-blue-400 flex items-center justify-center text-[8px] text-blue-200 text-center font-mono leading-tight shadow-lg">
                      Water Tank
                    </div>
                    <span className="text-[9px] font-mono text-gray-500">Vijayanagar Landmark</span>
                  </div>

                  {/* Oyster Bay center spot pin */}
                  <motion.div 
                    initial={{ y: -5 }}
                    animate={{ y: 5 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                    className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-10"
                    onClick={() => window.open(RESTAURANT_INFO.googleMapsUrl, "_blank")}
                  >
                    <div className="bg-gold-500 text-black px-3 py-1 rounded shadow-2xl border border-white flex items-center gap-1.5">
                      <Star className="w-3 h-3 fill-current text-black" />
                      <span className="font-serif text-xs font-bold whitespace-nowrap">Oyster Bay (4.1★)</span>
                    </div>
                    <div className="w-3 h-3 bg-gold-500 rotate-45 -mt-1.5 border-r border-b border-white" />
                    <div className="w-6 h-6 bg-gold-500/30 rounded-full animate-ping absolute -bottom-3" />
                  </motion.div>

                  <p className="absolute bottom-3 left-3 text-[10px] text-gray-400 font-mono">
                    🗺️ Zoom out: Mysuru Metropolitan Area
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 text-xs">
                  <span className="text-gray-400">
                    📍 Lat/Lng: ChIJrWuzVfV6rzsRDvpOdcbn81A
                  </span>
                  <a 
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gold-300 font-mono tracking-wide hover:text-white flex items-center gap-1"
                  >
                    Get GPS Navigation details <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      
      {/* FINAL MEMENTO & LOGOUT BAR FOOTER */}
      <footer className="bg-[#14100D] text-white border-t border-gold-900/50 pt-16 pb-8" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Grid 1 brand */}
            <div className="md:col-span-4 space-y-4">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF9F6]">
                OYSTER <span className="text-gold-300 italic font-normal">BAY</span>
              </span>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Creating memorable dinners, pristine seafood platters, and authentic hospitality values in Mysuru since inception. Visited and approved by over 3600+ physical patrons.
              </p>
              
              <div className="flex items-center gap-2 pt-2 text-xs text-gold-300 font-mono">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Verified Google Maps Listing</span>
              </div>
            </div>

            {/* Grid 2 navigation columns */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">Discover</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => scrollToSection('about_us')} className="hover:text-white">Our Heritage</button></li>
                <li><button onClick={() => scrollToSection('menu_explorer')} className="hover:text-white">Signature Dishes</button></li>
                <li><button onClick={() => scrollToSection('customer_reviews')} className="hover:text-white">Review System</button></li>
                <li><button onClick={() => scrollToSection('faq_section')} className="hover:text-white">FAQ Section</button></li>
              </ul>
            </div>

            {/* Grid 3 contact */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">Reach Out Directly</h4>
              <p className="text-xs text-gray-400">
                Kannada Parishath Road, Vijayanagar, 2nd Stage, near Water-Tank, Mysuru, Karnataka 570017
              </p>
              <div className="space-y-1 block pt-1">
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-xs text-gold-300 hover:text-white font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Grid 4 hours */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">Official Hours</h4>
              <ul className="space-y-1.5 text-xs text-gray-400">
                {RESTAURANT_INFO.workingHours.map((wh, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-white">{wh.days}:</span>
                    <br />{wh.hours}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* copyright sub-bar */}
        <div className="border-t border-neutral-900/90 pt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono">
          <p>© 2026 Oyster Bay Fine Dining. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href={RESTAURANT_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Google Maps Route</a>
            <span>•</span>
            <span className="text-gold-500/70">Found via query: "{RESTAURANT_INFO.foundViaQuery}"</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
