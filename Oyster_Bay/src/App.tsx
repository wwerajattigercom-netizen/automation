import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  Users, 
  Check, 
  Wine, 
  Sparkles, 
  ChevronRight, 
  Search, 
  MessageSquare, 
  Leaf, 
  Flame, 
  Menu as MenuIcon, 
  X, 
  ChevronDown, 
  Map,
  BadgeAlert,
  CalendarCheck
} from 'lucide-react';

import { BUSINESS_INFO, MENU_ITEMS, REVIEWS } from './data';
import { MenuItem, Review, ReservationData } from './types';

// Let's import our high-res generated images.
import heroImg from './assets/images/oyster_bay_hero_1781296456741.jpg';
import ambianceImg from './assets/images/oyster_bay_ambiance_1781296470052.jpg';

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'all' | 'coastal' | 'grill' | 'mains' | 'desserts'>('all');
  const [selectedReviewTag, setSelectedReviewTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Reservation Form States
  const [reservationName, setReservationName] = useState('');
  const [reservationPhone, setReservationPhone] = useState('');
  const [reservationEmail, setReservationEmail] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('08:00 PM');
  const [reservationGuests, setReservationGuests] = useState(2);
  const [reservationArea, setReservationArea] = useState<'garden' | 'gold_room' | 'lounge' | 'any'>('any');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Confirmation Modal State
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  // Auto detect scrolling for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Refs for smooth scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const reserveRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Extract unique review tags for filtering, prepending 'All'
  const allReviewTags = useMemo(() => {
    const tagsSet = new Set<string>();
    REVIEWS.forEach(r => r.tags.forEach(t => tagsSet.add(t)));
    return ['All', ...Array.from(tagsSet)];
  }, []);

  // Filter Menu Items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeTab === 'all' || item.category === activeTab;
      const matchesVeg = !vegOnly || item.isVeg;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesVeg && matchesSearch;
    });
  }, [activeTab, vegOnly, searchQuery]);

  // Filter Reviews
  const filteredReviews = useMemo(() => {
    if (selectedReviewTag === 'All') return REVIEWS;
    return REVIEWS.filter(r => r.tags.includes(selectedReviewTag));
  }, [selectedReviewTag]);

  // Handle Reservation Submission
  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationName || !reservationPhone || !reservationDate) {
      alert('Please fill in your Name, Phone Number, and Reservation Date.');
      return;
    }
    
    // Generate simple random booking number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dateCode = reservationDate.replace(/-/g, '').slice(4); // e.g. "0612"
    setConfirmedBookingId(`OB-${dateCode}-${randomNum}`);
    setShowConfirmation(true);
  };

  // Reset reservation form back to default
  const resetReservationForm = () => {
    setShowConfirmation(false);
    setReservationName('');
    setReservationPhone('');
    setReservationEmail('');
    setReservationDate('');
    setReservationTime('08:00 PM');
    setReservationGuests(2);
    setReservationArea('any');
    setSpecialRequests('');
  };

  return (
    <div id="landing-page" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-[#a8e0f4] selection:text-neutral-900">
      
      {/* HEADER & ACCESS LOGS FREE NAVIGATION */}
      <header 
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 py-3' 
            : 'bg-gradient-to-b from-black/60 to-transparent text-white py-5'
        }`}
      >
        <div id="nav-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            id="brand-logo" 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div id="logo-icon-box" className={`p-1.5 rounded-full ${scrolled ? 'bg-[#0f4c5c]/10 text-[#0f4c5c]' : 'bg-white/10 text-[#e0b973]'}`}>
              <Wine id="logo-shell-icon" className="w-5 h-5" />
            </div>
            <div>
              <span className={`font-serif text-xl tracking-wider font-semibold ${scrolled ? 'text-[#0a3641]' : 'text-white'}`}>
                OYSTER BAY
              </span>
              <p className={`text-[9px] font-mono tracking-widest uppercase -mt-1 ${scrolled ? 'text-neutral-500' : 'text-neutral-300'}`}>
                Fine Dining • Mysuru
              </p>
            </div>
          </div>

          {/* Desktop Navigation Link Anchors */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button 
              id="link-home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`transition-colors duration-200 hover:text-[#d4af37] ${scrolled ? 'text-neutral-700' : 'text-white'}`}
            >
              Home
            </button>
            <button 
              id="link-about"
              onClick={() => scrollToSection(aboutRef)}
              className={`transition-colors duration-200 hover:text-[#d4af37] ${scrolled ? 'text-neutral-700' : 'text-white'}`}
            >
              Our Story
            </button>
            <button 
              id="link-menu"
              onClick={() => scrollToSection(menuRef)}
              className={`transition-colors duration-200 hover:text-[#d4af37] ${scrolled ? 'text-neutral-700' : 'text-white'}`}
            >
              The Menu
            </button>
            <button 
              id="link-reviews"
              onClick={() => scrollToSection(reviewsRef)}
              className={`transition-colors duration-200 hover:text-[#d4af37] ${scrolled ? 'text-neutral-700' : 'text-white'}`}
            >
              Reviews
            </button>
            <button 
              id="link-location"
              onClick={() => scrollToSection(reserveRef)}
              className={`transition-colors duration-200 hover:text-[#d4af37] ${scrolled ? 'text-neutral-700' : 'text-white'}`}
            >
              Find Us
            </button>
          </nav>

          {/* Action Call & Social Badge */}
          <div id="nav-cta-group" className="hidden md:flex items-center space-x-4">
            <a 
              id="phone-link-nav"
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
              className={`flex items-center space-x-1.5 font-medium text-xs font-mono tracking-wider ${scrolled ? 'text-[#0f4c5c]' : 'text-neutral-200'}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#e0b973]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <button 
              id="btn-nav-reserve"
              onClick={() => scrollToSection(reserveRef)}
              className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                scrolled 
                  ? 'bg-[#0f4c5c] text-white hover:bg-[#07242c]' 
                  : 'bg-[#e0b973] text-neutral-900 hover:bg-[#cf9e4e]'
              }`}
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div id="mobile-menu-trigger" className="md:hidden flex items-center">
            <button 
              id="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none ${scrolled ? 'text-neutral-800' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown Box */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="md:hidden bg-white border-b border-neutral-200 py-4 px-6 space-y-4 shadow-xl">
            <button 
              id="mob-home"
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="block w-full text-left font-serif text-lg text-neutral-800 hover:text-[#0f4c5c]"
            >
              Home
            </button>
            <button 
              id="mob-about"
              onClick={() => scrollToSection(aboutRef)}
              className="block w-full text-left font-serif text-lg text-neutral-800 hover:text-[#0f4c5c]"
            >
              Our Story
            </button>
            <button 
              id="mob-menu"
              onClick={() => scrollToSection(menuRef)}
              className="block w-full text-left font-serif text-lg text-neutral-800 hover:text-[#0f4c5c]"
            >
              The Menu
            </button>
            <button 
              id="mob-reviews"
              onClick={() => scrollToSection(reviewsRef)}
              className="block w-full text-left font-serif text-lg text-neutral-800 hover:text-[#0f4c5c]"
            >
              Reviews & Feedback
            </button>
            <button 
              id="mob-location"
              onClick={() => scrollToSection(reserveRef)}
              className="block w-full text-left font-serif text-lg text-neutral-800 hover:text-[#0f4c5c]"
            >
              Reservations & Contact
            </button>
            <div id="mobile-divider" className="border-t border-neutral-100 my-2 pt-4">
              <a 
                id="phone-link-mob"
                href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`} 
                className="flex items-center space-x-2 text-md text-[#0f4c5c] font-medium"
              >
                <Phone className="w-4 h-4 text-[#e0b973]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
              <button 
                id="mob-btn-book"
                onClick={() => scrollToSection(reserveRef)}
                className="mt-4 w-full bg-[#0f4c5c] text-white py-2.5 rounded text-sm font-semibold tracking-wide uppercase hover:bg-neutral-800 text-center block"
              >
                Book a Table
              </button>
            </div>
          </div>
        )}
      </header>


      {/* HERO SECTION / LANDING SHOWCASE */}
      <section id="hero-showcase" className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Gradient Layer */}
        <div id="hero-img-container" className="absolute inset-0">
          <img 
            id="hero-bg-image"
            src={heroImg} 
            alt="Oyster Bay Seafood Fine Dining" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 filter brightness-75 md:brightness-[0.65]" 
          />
          <div id="hero-overlay" className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/70" />
        </div>

        {/* Content Box */}
        <div id="hero-content" className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-10">
          
          {/* Tagline / Culinary Category */}
          <div id="hero-badge" className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-[#e2b053] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#e0b973] animate-pulse" />
            <span>Ranked #2 Fine Dining in Mysuru</span>
          </div>

          {/* Heading */}
          <h1 id="hero-main-title" className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
            Where Coastal Soul Meets <span className="text-[#e2b053] italic">Gourmet Luxury</span>
          </h1>

          {/* Subheading text */}
          <p id="hero-body-paragraph" className="text-neutral-200 text-base sm:text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
            Delight in Mysuru’s premier culinary sanctuary. Featuring fresh coastal catches, authentic Tandoori mastercrafts, and traditional recipes wrapped in uncompromised luxury.
          </p>

          {/* Call to Actions */}
          <div id="hero-btn-group" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              id="hero-btn-reserve"
              onClick={() => scrollToSection(reserveRef)}
              className="w-full sm:w-auto px-8 py-4 bg-[#e0b973] text-neutral-900 rounded font-semibold text-sm uppercase tracking-wider hover:bg-[#f1cd8a] transition-all duration-300 shadow-lg cursor-pointer transform hover:-translate-y-0.5"
            >
              Reserve a Table
            </button>
            <button 
              id="hero-btn-menu"
              onClick={() => scrollToSection(menuRef)}
              className="w-full sm:w-auto px-8 py-4 bg-white/15 backdrop-blur-sm text-white border border-white/35 rounded font-semibold text-sm uppercase tracking-wider hover:bg-white/25 transition-all duration-300"
            >
              Browse The Menu
            </button>
          </div>

          {/* Business Vital Info Strips */}
          <div id="hero-infostrip" className="mt-16 grid grid-cols-3 gap-2 max-w-3xl mx-auto border-t border-white/20 pt-8 text-neutral-200">
            <div id="strip-item-rating" className="text-center">
              <div id="rating-stars" className="flex items-center justify-center space-x-0.5 text-yellow-400 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current opacity-80" />
              </div>
              <p id="rating-score" className="text-lg font-bold text-white font-mono">{BUSINESS_INFO.rating} / 5</p>
              <p id="rating-count" className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">{BUSINESS_INFO.reviewsCount} Reviews</p>
            </div>

            <div id="strip-item-cuisine" className="text-center border-x border-white/10">
              <div id="cuisine-icon-box" className="text-[#e2b053] flex justify-center mb-1">
                <Wine className="w-5 h-5" />
              </div>
              <p id="cuisine-text" className="text-sm font-semibold text-white tracking-wide truncate">Coastal & Multi-Cuisine</p>
              <p id="cuisine-sub" className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">Fine Dining Standard</p>
            </div>

            <div id="strip-item-loc" className="text-center">
              <div id="loc-icon-box" className="text-[#e0b973] flex justify-center mb-1">
                <MapPin className="w-5 h-5 animate-bounce" />
              </div>
              <p id="loc-title" className="text-sm font-semibold text-white tracking-wide truncate">Vijayanagar 2nd Stage</p>
              <p id="loc-city" className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">{BUSINESS_INFO.city}, India</p>
            </div>
          </div>

        </div>

        {/* Subtle Elegant Wave shape or bottom shade */}
        <div id="hero-bottom-grad" className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-50 to-transparent" />
      </section>


      {/* STORY / ABOUT SECTION (Including genuine business values & details) */}
      <section id="about-story" ref={aboutRef} className="py-24 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div id="story-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Detail */}
          <div id="story-text-col" className="lg:col-span-7 space-y-6">
            <div id="story-caption-box">
              <p id="story-subtitle" className="text-xs uppercase tracking-widest text-[#0f4c5c] font-semibold mb-2">Heritage & Dining Excellence</p>
              <h2 id="story-main-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
                Authentic Coastal Recipes Crafted For The Discerning Palate
              </h2>
            </div>

            <p id="story-desc-1" className="text-neutral-600 text-base sm:text-lg leading-relaxed font-light">
              Founded on the values of culinary purity and royal South-Indian hospitality, <strong className="text-neutral-900 font-medium">Oyster Bay</strong> stands as one of Mysuru’s premier modern landmarks. Our fine-dining kitchen celebrates the diverse seashore communities of Mangalore, Malabar, and Kundapur.
            </p>

            <blockquote id="story-quote" className="pl-4 border-l-2 border-[#e0b973] py-2 italic font-serif text-neutral-700 bg-neutral-100/50 rounded-r pr-4">
              "Every single signature curry is a secret blend of twelve micro-roasted spices, pure hand-squeezed coconuts, and the freshest catch of seafood delivered from the coast daily."
            </blockquote>

            <p id="story-desc-2" className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Beyond spectacular seafood, our multi-cuisine menu provides a majestic assortment of slow-roasted Northern Indian Tandoori grills, rich Mughal gravies, and meticulously assembled vegetarian gourmet delights designed to please your family and friends.
            </p>

            {/* Visual Value Badges Grid */}
            <div id="values-grid" className="grid grid-cols-2 gap-6 pt-4">
              <div id="value-item-coastal" className="flex items-start space-x-3">
                <div id="badge-icon-wrap" className="p-2 bg-[#0a3641]/5 rounded text-[#0f4c5c] shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 id="val-1-title" className="font-semibold text-neutral-900 text-sm">Coastal Specialty</h4>
                  <p id="val-1-text" className="text-xs text-neutral-500">Traditional coconut masalas</p>
                </div>
              </div>

              <div id="value-item-bar" className="flex items-start space-x-3">
                <div id="badge-icon-wrap-2" className="p-2 bg-[#0a3641]/5 rounded text-[#0f4c5c] shrink-0 mt-0.5">
                  <Wine className="w-4 h-4" />
                </div>
                <div>
                  <h4 id="val-2-title" className="font-semibold text-neutral-900 text-sm">Upscale Vibe</h4>
                  <p id="val-2-text" className="text-xs text-neutral-500">Perfect for celebrations</p>
                </div>
              </div>

              <div id="value-item-fresh" className="flex items-start space-x-3">
                <div id="badge-icon-wrap-3" className="p-2 bg-[#0a3641]/5 rounded text-[#0f4c5c] shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 id="val-3-title" className="font-semibold text-neutral-900 text-sm">Fine Cookery</h4>
                  <p id="val-3-text" className="text-xs text-neutral-500">Zero artificial enhancers</p>
                </div>
              </div>

              <div id="value-item-rating" className="flex items-start space-x-3">
                <div id="badge-icon-wrap-4" className="p-2 bg-[#0a3641]/5 rounded text-[#0f4c5c] shrink-0 mt-0.5">
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h4 id="val-4-title" className="font-semibold text-neutral-900 text-sm">4.1 Star Rating</h4>
                  <p id="val-4-text" className="text-xs text-neutral-500">Trusted by 3,600+ guests</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Frame */}
          <div id="story-img-col" className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Main Luxury Frame */}
            <div id="story-frame" className="relative group overflow-hidden rounded-lg shadow-2xl transition-all duration-300 hover:shadow-gold-sm border border-neutral-200">
              <img 
                id="story-ambiance-image"
                src={ambianceImg} 
                alt="Oyster Bay Dining Room Ambiance" 
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div id="story-img-overlay" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              {/* Floating Status / Floating Ambiance Label */}
              <div id="story-floating-tag" className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block font-mono">Dining Room</span>
                  <span className="text-sm font-serif font-bold text-neutral-800">Aqua-Marine Fine Artistry</span>
                </div>
                <div id="story-tag-status" className="flex items-center space-x-1 p-1 px-2.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Open Seating</span>
                </div>
              </div>
            </div>

            {/* Back Accent Gold Frame decoration */}
            <div id="story-gold-decor" className="absolute -bottom-4 -right-4 w-1/2 h-1/2 rounded border-r-2 border-b-2 border-[#e0b973] z-[-1] pointer-events-none opacity-8s0" />
          </div>

        </div>
      </section>


      {/* THE MENU SECTION WITH ADVANCED CLIENT FILTERS & SEARCH */}
      <section id="restaurant-menu" ref={menuRef} className="bg-neutral-100 py-24 border-t border-b border-neutral-200/60">
        <div id="menu-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Menu Section Header */}
          <div id="menu-heading-block" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p id="menu-tagline" className="text-xs uppercase tracking-widest text-[#0f4c5c] font-semibold">Gourmet Collections</p>
            <h2 id="menu-main-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-950">
              The Gastronomic Assortment
            </h2>
            <div id="menu-heading-accent" className="w-16 h-0.5 bg-[#e0b973] mx-auto mt-3"></div>
            <p id="menu-desc" className="text-neutral-500 font-light text-sm sm:text-base">
              Filter through our premium master culinary categories or type a keyword to discover spectacular seafood curries, vegetarian treats, and exquisite desserts.
            </p>
          </div>

          {/* Interactive Filters Grid & Search Controls */}
          <div id="menu-controls" className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200/70 mb-10 space-y-6">
            
            {/* Row 1: Search & Toggles */}
            <div id="controls-row-1" className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Live Search Input */}
              <div id="search-input-box" className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input 
                  id="inp-menu-search"
                  type="text"
                  placeholder="Search dishes... (e.g. Curry, Ghee Roast, Paneer)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-50 pl-10 pr-4 py-2.5 rounded border border-neutral-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f4c5c] focus:bg-white text-neutral-800"
                />
                {searchQuery && (
                  <button 
                    id="btn-clear-search"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-neutral-200 text-neutral-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Veg / Non-Veg Switch */}
              <div id="veg-switch-box" className="flex items-center space-x-3 shrink-0 self-start md:self-auto">
                <span id="lbl-veg-all" className={`text-xs uppercase font-semibold tracking-wider ${!vegOnly ? 'text-neutral-800' : 'text-neutral-400'}`}>
                  Traditional
                </span>
                <button 
                  id="btn-veg-toggle"
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    vegOnly ? 'bg-emerald-600' : 'bg-neutral-300'
                  }`}
                >
                  <span 
                    id="veg-toggle-dot"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      vegOnly ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <div id="lbl-vegetarian" className="flex items-center space-x-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                  <span className={`text-xs uppercase font-semibold tracking-wider ${vegOnly ? 'text-emerald-700 font-bold' : 'text-neutral-600'}`}>
                    Vegetarian Only
                  </span>
                </div>
              </div>

            </div>

            {/* Row 2: Category Toggles */}
            <div id="controls-row-2" className="flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-5">
              <button 
                id="tab-all"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'all' 
                    ? 'bg-[#0f4c5c] text-white' 
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                All Chef Craft
              </button>
              <button 
                id="tab-coastal"
                onClick={() => setActiveTab('coastal')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'coastal' 
                    ? 'bg-[#0f4c5c] text-white' 
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <span>🌊 Coastal & Oyster Specialities</span>
              </button>
              <button 
                id="tab-grills"
                onClick={() => setActiveTab('grill')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'grill' 
                    ? 'bg-[#0f4c5c] text-white' 
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <span>🔥 Charcoal Grills & Tandoor</span>
              </button>
              <button 
                id="tab-mains"
                onClick={() => setActiveTab('mains')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'mains' 
                    ? 'bg-[#0f4c5c] text-white' 
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <span>🍲 Signature Mains & Biryanis</span>
              </button>
              <button 
                id="tab-desserts"
                onClick={() => setActiveTab('desserts')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'desserts' 
                    ? 'bg-[#0f4c5c] text-white' 
                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                <span>🍧 Exquisite Sweet Desserts</span>
              </button>
            </div>

          </div>

          {/* Live Render Grid with Framer Motion AnimatePresence */}
          <div id="menu-items-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMenuItems.map(item => (
                <motion.div 
                  id={`item-card-${item.id}`}
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -6 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="bg-white rounded-lg p-5 border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  <div id="item-top-wrap">
                    {/* Tags line */}
                    <div id="item-badges" className="flex items-center justify-between mb-2">
                      <div id="item-diet-tag" className="flex items-center space-x-1">
                        {item.isVeg ? (
                          <div id="diet-badge-veg" className="flex items-center space-x-1 border border-emerald-500/20 bg-emerald-50 px-2 py-0.5 rounded text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                            <Leaf className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                            <span>Veg</span>
                          </div>
                        ) : (
                          <div id="diet-badge-nonveg" className="flex items-center space-x-1 border border-red-500/20 bg-red-50 px-2 py-0.5 rounded text-[10px] text-red-700 font-bold uppercase tracking-wider">
                            <Flame className="w-3 h-3 text-red-600 fill-red-100" />
                            <span>Non-Veg</span>
                          </div>
                        )}
                        {item.category === 'coastal' && (
                          <span id="coastal-tag" className="bg-[#0f4c5c]/5 text-[#0f4c5c] border border-[#0f4c5c]/10 text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                            Coastal Capture
                          </span>
                        )}
                      </div>

                      {/* Popular / Chef Special Tag */}
                      {item.isPopular && (
                        <span id="popular-tag" className="flex items-center space-x-1 bg-amber-500 text-neutral-950 font-bold text-[9px] tracking-widest px-2 py-0.5 rounded uppercase">
                          <Sparkles className="w-2.5 h-2.5 fill-current text-current animate-pulse" />
                          <span>Signature</span>
                        </span>
                      )}
                    </div>

                    {/* Dining Title Details */}
                    <div id="item-title-section" className="flex justify-between items-baseline gap-2 mb-2">
                      <h3 id={`title-${item.id}`} className="font-serif text-lg font-bold text-neutral-900 group-hover:text-[#0f4c5c] transition-colors leading-tight">
                        {item.name}
                      </h3>
                      {/* Price tag */}
                      <span id={`price-${item.id}`} className="font-mono font-semibold text-sm text-[#0f4c5c] bg-[#0a3641]/5 px-2.5 py-1 rounded shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Rich Product Description */}
                    <p id={`desc-${item.id}`} className="text-[#555] text-xs sm:text-sm font-light leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Aesthetic visual booking helper CTA inside cards */}
                  <div id="item-booking-helper" className="border-t border-neutral-100 pt-3 flex items-center justify-between text-neutral-400">
                    <span id="helper-text-reserve" className="text-[10px] uppercase tracking-wider font-mono font-medium text-neutral-400">Available for lunch & dinner</span>
                    <button 
                      id={`btn-order-indicator-${item.id}`}
                      onClick={() => scrollToSection(reserveRef)}
                      className="text-xs text-[#0f4c5c] font-semibold flex items-center space-x-1 hover:underline"
                    >
                      <span>Reserve to Taste</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty Search Fallback */}
            {filteredMenuItems.length === 0 && (
              <div id="empty-menu-box" className="col-span-full bg-white rounded-lg p-12 border border-dashed border-neutral-300 text-center space-y-4">
                <div id="empty-icon-wrap" className="mx-auto w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <BadgeAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 id="empty-main" className="font-semibold text-lg text-neutral-800">No dishes match your preferences</h4>
                  <p id="empty-sub" className="text-sm text-neutral-500 max-w-sm mx-auto mt-1">
                    We couldn't find matches containing "{searchQuery}". Try searching for popular parameters like "Ghee Roast", "Seafood", or "Tikka".
                  </p>
                </div>
                <button 
                  id="btn-reset-filters"
                  onClick={() => { setSearchQuery(''); setActiveTab('all'); setVegOnly(false); }}
                  className="px-4 py-2 bg-[#0f4c5c] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800"
                >
                  Reset Menu Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>


      {/* REVIEWS & RECOMMENDATION BLOCK */}
      <section id="customer-reviews" ref={reviewsRef} className="py-24 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        
        {/* Reviews Grid Header */}
        <div id="reviews-header-layout" className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
          <div id="reviews-header-titles">
            <p id="reviews-tag" className="text-xs uppercase tracking-widest text-[#0f4c5c] font-semibold mb-2">Guest Testimonials</p>
            <h2 id="reviews-main-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950">
              Trusted By Over 3,600+ Regular Patrons in Mysuru
            </h2>
            <p id="reviews-subtitle" className="text-neutral-500 font-light mt-3 max-w-xl text-sm sm:text-base">
              Explore authentic feedback shared by food lovers who dine with us frequently near the Vijayanagar Water Tank.
            </p>
          </div>

          {/* Genuine Stats Display Box */}
          <div id="reviews-overall-card" className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 shrink-0 w-full sm:w-auto text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
            <div id="overall-large-display" className="text-5xl font-black font-mono text-[#0f4c5c]">{BUSINESS_INFO.rating}</div>
            <div id="overall-badge-info">
              <div id="overall-rating-stars-row" className="flex items-center justify-center sm:justify-start text-amber-500 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current opacity-80" />
              </div>
              <p id="overall-subtitle-card" className="text-xs uppercase tracking-wider text-neutral-500 font-bold font-mono">
                {BUSINESS_INFO.reviewsCount} Google Reviews
              </p>
              <a 
                id="link-google-maps-write"
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#0a3641] font-semibold hover:underline flex items-center space-x-1 mt-0.5 justify-center sm:justify-start"
              >
                <span>Write a Google review</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Feature Tags Filters */}
        <div id="reviews-filter-tags-grid" className="flex flex-wrap items-center gap-2 mb-8">
          <span id="reviews-lbl-filter" className="text-xs font-mono uppercase text-neutral-400 mr-2">Filter highlights:</span>
          {allReviewTags.map(tag => (
            <button
              id={`tag-review-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              key={tag}
              onClick={() => setSelectedReviewTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                selectedReviewTag === tag 
                  ? 'bg-neutral-900 text-white shadow-xs' 
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards Render Grid with framer motion stagger */}
        <div id="reviews-card-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div 
                id={`review-card-${review.id}`}
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-6 rounded-lg border border-neutral-200 shadow-xs flex flex-col justify-between"
              >
                <div id="rev-card-top">
                  {/* Rating row & verified icon */}
                  <div id="rev-row-rating" className="flex items-center justify-between mb-4">
                    <div id="rev-stars" className="flex space-x-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-current text-amber-500' : 'text-neutral-200'}`} 
                        />
                      ))}
                    </div>
                    <span id="rev-time" className="text-xs text-neutral-400 font-mono italic">{review.relativeTime}</span>
                  </div>

                  {/* Comment */}
                  <p id="rev-comment-par" className="text-neutral-700 text-sm leading-relaxed italic mb-4">
                    " {review.comment} "
                  </p>
                </div>

                {/* Author footer */}
                <div id="rev-card-bottom" className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                  <div>
                    <span id="rev-author-name" className="text-sm font-semibold text-neutral-950 block">{review.author}</span>
                    <span id="rev-verified" className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Verified Diner</span>
                  </div>
                  {/* Sub tags highlight indicators */}
                  <div id="rev-indicators" className="flex gap-1">
                    {review.tags.map(t => (
                      <span id={`ind-${t.toLowerCase().replace(/\s+/g, '')}`} key={t} className="bg-[#0f4c5c]/5 text-[#0f4c5c] text-[9px] font-semibold px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>


      {/* INTERACTIVE TABLE RESERVATIONS ENGINE & PHYSICAL MAP INFORMATION */}
      <section id="reservations-maps" ref={reserveRef} className="bg-neutral-900 text-white relative py-24 overflow-hidden border-t border-neutral-850">
        
        {/* Absolute visual subtle pattern accents */}
        <div id="reserve-gradient-bg" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#0a3641_0%,_transparent_55%)] opacity-35 z-0" />
        
        <div id="reserve-content-grid" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column A: Interactive Table Reservation Form */}
          <div id="col-reservation-form" className="lg:col-span-7 bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-md shadow-2xl space-y-6">
            
            <div id="form-header-box">
              <span id="lbl-reserve-form" className="text-xs font-mono uppercase tracking-widest text-[#e2b053] font-semibold block mb-2">Dining Table Booking</span>
              <h3 id="form-main-title" className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Book Your Curated Culinary Table
              </h3>
              <p id="form-sub" className="text-neutral-400 text-xs sm:text-sm font-light mt-1">
                Receive instant visual confirmation with a unique booking ID. No credit card required.
              </p>
            </div>

            {/* Standard Form element */}
            <form id="frm-main-reservation" onSubmit={handleReserveSubmit} className="space-y-4">
              
              <div id="form-row-1" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div id="grp-name" className="space-y-1.5">
                  <label id="lbl-form-name" className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">Your Full Name *</label>
                  <input 
                    id="inp-reserve-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={reservationName}
                    onChange={(e) => setReservationName(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700/80 rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#e0b973] focus:border-[#e0b973]"
                  />
                </div>

                {/* Mobile number */}
                <div id="grp-phone" className="space-y-1.5">
                  <label id="lbl-form-phone" className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">Phone Number *</label>
                  <input 
                    id="inp-reserve-phone"
                    type="tel"
                    required
                    placeholder="e.g. +91 99000 37368"
                    value={reservationPhone}
                    onChange={(e) => setReservationPhone(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700/80 rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#e0b973] focus:border-[#e0b973]"
                  />
                </div>
              </div>

              <div id="form-row-2" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div id="grp-email" className="space-y-1.5">
                  <label id="lbl-form-email" className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">Email Address (Optional)</label>
                  <input 
                    id="inp-reserve-email"
                    type="email"
                    placeholder="e.g. delicious@oysterbay.com"
                    value={reservationEmail}
                    onChange={(e) => setReservationEmail(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700/80 rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#e0b973] focus:border-[#e0b973]"
                  />
                </div>

                {/* Reservation date */}
                <div id="grp-date" className="space-y-1.5">
                  <label id="lbl-form-date" className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">Date *</label>
                  <input 
                    id="inp-reserve-date"
                    type="date"
                    required
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700/80 rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#e0b973] focus:border-[#e0b973]"
                  />
                </div>
              </div>

              <div id="form-row-3" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Time Slot Picker */}
                <div id="grp-timeslot" className="space-y-1.5">
                  <label id="lbl-form-time" className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 font-medium">Dining Slot</label>
                  <select 
                    id="sel-reserve-time"
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700/80 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#e0b973] focus:border-[#e0b973]"
                  >
                    <option value="12:30 PM">12:30 PM (Lunch)</option>
                    <option value="01:30 PM">01:30 PM (Lunch)</option>
                    <option value="07:00 PM">07:00 PM (Dinner)</option>
                    <option value="08:00 PM">08:00 PM (Dinner)</option>
                    <option value="09:00 PM">09:00 PM (Dinner)</option>
                    <option value="10:00 PM">10:00 PM (Late Dinner)</option>
                  </select>
                </div>

                {/* Number of Guests */}
                <div id="grp-guests" className="space-y-1.5">
                  <label id="lbl-form-guests" className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">Guests</label>
                  <select 
                    id="sel-reserve-guests"
                    value={reservationGuests}
                    onChange={(e) => setReservationGuests(Number(e.target.value))}
                    className="w-full bg-neutral-800 border border-neutral-700/80 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#e0b973] focus:border-[#e0b973]"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={8}>8 Guests</option>
                    <option value={10}>10+ Custom Event</option>
                  </select>
                </div>

                {/* Preferred Area */}
                <div id="grp-area" className="space-y-1.5">
                  <label id="lbl-form-area" className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">Seating Area</label>
                  <select 
                    id="sel-reserve-area"
                    value={reservationArea}
                    onChange={(e) => setReservationArea(e.target.value as any)}
                    className="w-full bg-neutral-800 border border-neutral-700/80 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#e0b973] focus:border-[#e0b973]"
                  >
                    <option value="any">No Preference (First Avail)</option>
                    <option value="garden">Lush Garden Patio</option>
                    <option value="gold_room">Aqua-Marine Gold Room</option>
                    <option value="lounge">Private Bar Section</option>
                  </select>
                </div>
              </div>

              {/* Special instructions */}
              <div id="grp-requests" className="space-y-1.5 row-span-2">
                <label id="lbl-form-requests" className="block text-xs uppercase tracking-wider font-semibold text-neutral-300">Special Requests / Occasion details</label>
                <textarea 
                  id="inp-reserve-requests"
                  rows={2}
                  placeholder="e.g. Birthday celebration, seafood allergy, quiet booth request..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700/80 rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#e0b973] focus:border-[#e0b973]"
                />
              </div>

              {/* Submit trigger button */}
              <button 
                id="btn-submit-booking"
                type="submit"
                className="w-full bg-[#e0b973] hover:bg-[#ebd095] text-[#121212] font-semibold text-sm uppercase py-3.5 rounded tracking-widest transition-all duration-300 cursor-pointer shadow-lg font-mono"
              >
                Launch Booking Request
              </button>

            </form>

          </div>

          {/* Column B: Physical Location Details & FAQ */}
          <div id="col-maps-info" className="lg:col-span-5 space-y-8 z-10 text-neutral-300">
            
            <div id="loc-header-box">
              <span id="lbl-maps-badge" className="text-xs font-mono uppercase tracking-widest text-[#e2b053] font-semibold block mb-2">Location & Contacts</span>
              <h3 id="maps-main-title" className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                Visit Oyster Bay
              </h3>
              
              {/* Authentic Google Maps Information */}
              <div id="loc-physical-details-card" className="space-y-4 bg-white/5 border border-white/10 p-5 rounded-lg">
                
                {/* Real Address */}
                <div id="phys-item-address" className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-5 h-5 text-[#e0b973] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block text-sm">Fine Dining Address</span>
                    <p className="text-neutral-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-[#e2b053] text-[11px] font-mono tracking-wide mt-1 uppercase">
                      📍 Adjacent to Vijayanagar 2nd Stage Water Tank
                    </p>
                  </div>
                </div>

                {/* Real Phone Line */}
                <div id="phys-item-phone" className="flex items-start space-x-3 text-sm border-t border-white/5 pt-4">
                  <Phone className="w-5 h-5 text-[#e0b973] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block text-sm">Phone Reservation Inquiries</span>
                    <a 
                      id="phone-link-details"
                      href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`} 
                      className="text-neutral-300 hover:text-white font-mono hover:underline text-sm sm:text-base tracking-wide inline-block mt-0.5"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Hours section */}
                <div id="phys-item-hours" className="flex items-start space-x-3 text-sm border-t border-white/5 pt-4">
                  <Clock className="w-5 h-5 text-[#e0b973] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block text-sm">Business Operations</span>
                    <p className="text-neutral-300 text-xs mt-0.5">
                      Lunch: 11:30 AM – 3:30 PM <span className="text-neutral-500 mx-1">•</span> Dinner: 7:00 PM – 11:30 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Launch Map Routing CTA */}
            <div id="maps-cta-block" className="space-y-4">
              <span className="text-xs text-neutral-400 font-light block leading-relaxed">
                Need direct directions layout or navigation routing? Launch the official Google Maps link below for accurate real-time transit guides:
              </span>
              <a 
                id="btn-google-maps-cta"
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-[#0f4c5c] hover:bg-[#14667c] text-white border border-white/15 px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300"
              >
                <Map className="w-4 h-4 text-[#e0b973]" />
                <span>Navigate via Google Maps</span>
              </a>
            </div>

            {/* Micro FAQ panel inside reservations */}
            <div id="micro-faq-block" className="border-t border-white/10 pt-6 space-y-4">
              <span id="faq-headline" className="text-xs font-semibold uppercase tracking-wider text-[#e2b053] block font-mono">Frequently Asked Questions</span>
              
              <div id="faq-item-1" className="space-y-1">
                <h5 className="text-xs font-semibold text-white">Is valet or car parking available?</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">Yes, spacious and secure off-street car and two-wheeler parking is available surrounding the fine dining property.</p>
              </div>

              <div id="faq-item-2" className="space-y-1">
                <h5 className="text-xs font-semibold text-white">Do you host corporate parties or private family events?</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">Absolutely. Our Golden Chamber Room and Lounge Patio can host up to 80 guests. Please coordinate via our phone number.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DETAILED RESERVATION CONFIRMATION DIALOG MODAL */}
      <AnimatePresence>
        {showConfirmation && (
          <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glassmorphic backdrop overlay */}
            <motion.div 
              id="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetReservationForm}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Inner Modal Content Box */}
            <motion.div 
              id="modal-box"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
              className="relative bg-white text-neutral-900 rounded-lg max-w-lg w-full p-8 shadow-2xl border border-neutral-200/90 overflow-hidden z-10"
            >
              {/* Confetti effect or gold decoration strip */}
              <div id="modal-strip" className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-[#e0b973] to-emerald-600" />
              
              {/* Close Button */}
              <button 
                id="btn-close-modal"
                onClick={resetReservationForm}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div id="modal-body-layout" className="text-center space-y-6">
                
                {/* Glowing Success Badge */}
                <div id="modal-icon-wrap" className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-md">
                  <CalendarCheck className="w-8 h-8" />
                </div>

                <div id="modal-title-wrap">
                  <span id="lbl-reserve-modal-badge" className="text-xs font-mono font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100/60 px-3 py-1 rounded">
                    Table Provisioned
                  </span>
                  <h4 id="modal-main-title" className="font-serif text-2xl font-bold tracking-tight text-neutral-900 mt-3">
                    Reservation Confirmed!
                  </h4>
                  <p id="modal-sub" className="text-neutral-500 text-xs mt-1">
                    Your table is securely held. A copy is preparing for transport.
                  </p>
                </div>

                {/* Booking Code Display Board */}
                <div id="modal-code-board" className="bg-neutral-150 p-4 rounded-md border border-neutral-200/80 max-w-sm mx-auto">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold block">Unique Reservation Reference</span>
                  <span id="modal-booking-id" className="text-xl font-bold font-mono text-[#0f4c5c] tracking-widest mt-0.5 block select-all">
                    {confirmedBookingId}
                  </span>
                </div>

                {/* Summarized specifications table */}
                <div id="modal-details-table" className="text-left bg-neutral-50 p-5 rounded border border-neutral-200/60 text-xs sm:text-sm space-y-3 max-w-sm mx-auto">
                  <div id="modal-pax" className="flex justify-between items-center text-neutral-600 pb-2 border-b border-neutral-200/40">
                    <span>Diner Name</span>
                    <strong className="text-neutral-900 font-semibold">{reservationName}</strong>
                  </div>
                  <div id="modal-pax-count" className="flex justify-between items-center text-neutral-600 pb-2 border-b border-neutral-200/40">
                    <span>Number of Guests</span>
                    <strong className="text-neutral-900 font-semibold">{reservationGuests} Diners</strong>
                  </div>
                  <div id="modal-day" className="flex justify-between items-center text-neutral-600 pb-2 border-b border-neutral-200/40">
                    <span>Date & Time</span>
                    <strong className="text-neutral-900 font-semibold">{reservationDate} @ {reservationTime}</strong>
                  </div>
                  <div id="modal-preferred-seating" className="flex justify-between items-center text-neutral-600">
                    <span>Seating Zone</span>
                    <strong className="text-neutral-900 font-semibold capitalize">{reservationArea === 'any' ? 'First Available Seating' : `${reservationArea.replace('_', ' ')} Area`}</strong>
                  </div>
                </div>

                {/* Security Advice Info */}
                <p id="modal-footing-notice" className="text-[10px] sm:text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
                  Please hold or screenshot this unique receipt ID. If you need to alter or delay seating, present reference <strong className="font-mono">{confirmedBookingId}</strong> to our desk via <span className="font-medium underline">{BUSINESS_INFO.phone}</span>.
                </p>

                {/* OK confirm dismiss button */}
                <button 
                  id="btn-ok-dismiss"
                  onClick={resetReservationForm}
                  className="w-full bg-[#0f4c5c] text-white py-3 rounded font-semibold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Return to Landing Page
                </button>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>


      {/* MINIMALIST FOOTER & ZERO-TELEMETRY PRIDE (NO MOCK LIVE LIGHTS OR TECHNICAL LOGS IN MARGINS) */}
      <footer id="main-footer" className="bg-neutral-950 text-white border-t border-neutral-850 py-16 px-4">
        <div id="footer-inner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div id="footer-row-1" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Brand Logo Info */}
            <div id="foot-col-brand" className="md:col-span-4 space-y-4">
              <div id="foot-brand-header" className="flex items-center space-x-2">
                <div id="foot-icon-wrap" className="p-1.5 rounded-full bg-white/10 text-[#e0b973]">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif text-lg tracking-wider font-semibold text-white block">OYSTER BAY</span>
                  <p className="text-[9px] font-mono tracking-widest text-[#e0b973] uppercase -mt-1">{BUSINESS_INFO.category}</p>
                </div>
              </div>
              <p id="foot-brand-p" className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                Mysuru's signature dining sanctuary. Crafting authentic, spicy coastal delicacies, robust tandoori grills, and refined cocktails in a luxurious aqua-styled salon with a garden patio.
              </p>
            </div>

            {/* Quick anchors */}
            <div id="foot-col-nav" className="md:col-span-3 space-y-3 text-xs sm:text-sm">
              <h5 className="font-semibold text-white uppercase tracking-wider font-mono text-xs">Aesthetic Navigation</h5>
              <div id="foot-nav-links" className="grid grid-cols-1 gap-2 text-neutral-400">
                <button onClick={() => window.scrollTo({ top:0, behavior: 'smooth' })} className="text-left hover:text-[#e0b973] transition-colors">Return Top</button>
                <button onClick={() => scrollToSection(aboutRef)} className="text-left hover:text-[#e0b973] transition-colors">Our Gastronomic Journey</button>
                <button onClick={() => scrollToSection(menuRef)} className="text-left hover:text-[#e0b973] transition-colors">Explore the Complete Menu</button>
                <button onClick={() => scrollToSection(reviewsRef)} className="text-left hover:text-[#e0b973] transition-colors">Guest Testimonials</button>
                <button onClick={() => scrollToSection(reserveRef)} className="text-left hover:text-[#e0b973] transition-colors">Coordinates & Reservations</button>
              </div>
            </div>

            {/* Factual directions */}
            <div id="foot-col-address" className="md:col-span-5 space-y-3 text-xs sm:text-sm">
              <h5 className="font-semibold text-white uppercase tracking-wider font-mono text-xs">Landmark Coordinates</h5>
              <p id="foot-address-par" className="text-neutral-400 leading-relaxed font-light">
                {BUSINESS_INFO.address}
              </p>
              <div id="foot-actions" className="flex items-center space-x-4 pt-1">
                <a 
                  id="foot-dial"
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`} 
                  className="text-white hover:text-[#e0b973] font-mono text-xs hover:underline flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#e0b973]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
                <span className="text-neutral-700">|</span>
                <a 
                  id="foot-maps-link"
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#e0b973] text-xs hover:underline flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#e0b973]" />
                  <span>Navigate on Maps</span>
                </a>
              </div>
            </div>

          </div>

          <div id="footer-row-2" className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-neutral-500 gap-4">
            <p id="foot-copyright">
              © {new Date().getFullYear()} Oyster Bay Restaurant, Mysuru. All culinary rights reserved.
            </p>
            <div id="foot-privacy-claims" className="flex space-x-4">
              <span>Fine Dining Category</span>
              <span>•</span>
              <span>Mysuru Vijayanagar</span>
              <span>•</span>
              <span>Kannada Parishath Road</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
