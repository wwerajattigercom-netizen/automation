/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  Users, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Check, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X, 
  Award,
  BookOpen,
  Map,
  Smile
} from 'lucide-react';

import heroImage from './assets/images/oyster_bay_hero_1781327119903.jpg';
import dishImage from './assets/images/oyster_bay_dish_1781327138486.jpg';

// Menu item definitions
interface MenuItem {
  name: string;
  price: string;
  description: string;
  badge?: string;
}

interface MenuCategory {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'coastal',
    title: 'Signature Coastal',
    icon: '🌊',
    items: [
      {
        name: 'Mysuru Spiced Prawn Ghee Roast',
        price: '₹750',
        description: 'Giant tiger prawns succulent in iron-skillet caramelized shallots, pure organic ghee, and vintage Byadgi chili paste.',
        badge: 'Chef\'s Pick'
      },
      {
        name: 'Tandoori Pomfret Royal',
        price: '₹890',
        description: 'Whole silver pomfret bathed in dry mango powder, rock-salt yogurt, and hand-ground spices, cooked crispy in coal tandoor.',
      },
      {
        name: 'Mangalorean Karavali Lobster',
        price: '₹1450',
        description: 'Fresh warm-water lobster tail simmered slowly in freshly grated coconut flesh, tamarind pulp, and roasted coriander.',
        badge: 'Premium'
      },
      {
        name: 'Oyster Bay Crab Butter Garlic',
        price: '₹950',
        description: 'Mud crab shelled and sautéed lightly with premium sea salt, hand-churned dairy butter, and toasted garlic chives.',
      }
    ]
  },
  {
    id: 'tandoor',
    title: 'Claypot & Grill',
    icon: '🔥',
    items: [
      {
        name: 'Murgh Malai Peshawari',
        price: '₹550',
        description: 'Boneless white-meat chicken infused with green cardamom, double cream, and fresh royal green chilies.',
      },
      {
        name: 'Saffron Paneer Tikka Shahi',
        price: '₹480',
        description: 'Cubes of fresh artisanal cottage cheese skewered with sweet bell peppers, marinated in Kashmiri saffron milk.',
      },
      {
        name: 'Smoked Lamb Seekh Kebab',
        price: '₹680',
        description: 'Finely minced local leg of lamb seasoned with royal cumin, fresh coriander roots, and slow-roasted on open fire skewers.',
        badge: 'Classic'
      }
    ]
  },
  {
    id: 'curries',
    title: 'Grand Curries',
    icon: '🥣',
    items: [
      {
        name: 'Royal Heritage Mutton Curry',
        price: '₹720',
        description: 'Tender baby goat pieces cooked in native Mysuru heritage spices with a rich caramelized onion base.',
        badge: 'Legendary'
      },
      {
        name: 'Oiled Coconut Veg Stew',
        price: '₹420',
        description: 'Farm-fresh local beans, carrots and button mushrooms in first-press virgin coconut milk and fresh curry leaf tempering.',
      },
      {
        name: 'Oyster Bay Shahi Fish Curry',
        price: '₹780',
        description: 'Delicate sea bass fillets cooked gently in an artisanal spicy-sour kokum and coconut gravy.',
      }
    ]
  },
  {
    id: 'desserts',
    title: 'Signature Desserts',
    icon: '🍨',
    items: [
      {
        name: 'Oyster Bay Saffron Kulfi Sphere',
        price: '₹350',
        description: 'Decadent frozen saffron cream sphere coated with a fine white chocolate glaze, presented with melted warm pistachio reduction.',
        badge: 'Must Try'
      },
      {
        name: 'Mysuru Palace Elaneer Payasam',
        price: '₹280',
        description: 'Traditional light sweet milk reduction with delicate tender coconut strips and pan-roasted cashews.',
      }
    ]
  }
];

export default function App() {
  const [activeMenuTab, setActiveMenuTab] = useState<string>('coastal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Reservation Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: '2026-06-15',
    time: '20:00',
    seating: 'indoor-gold',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationSaved, setReservationSaved] = useState<any | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium booking experience
    setTimeout(() => {
      setIsSubmitting(false);
      const bookingId = 'OB-' + Math.floor(100000 + Math.random() * 900000);
      setReservationSaved({
        ...formData,
        id: bookingId,
        timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
      });
    }, 1200);
  };

  const resetReservation = () => {
    setReservationSaved(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      guests: '2',
      date: '2026-06-15',
      time: '20:00',
      seating: 'indoor-gold',
      notes: ''
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] text-[#0d1f38] font-sans antialiased selection:bg-[#c2a35d]/20 selection:text-[#0d1f38]" id="top">
      
      {/* Premium Announcement Bar */}
      <div className="bg-[#0d1f38] text-[#fcfcf9] py-2 px-4 text-xs tracking-wider font-medium text-center border-b border-[#c2a35d]/25">
        <span className="text-[#c2a35d] inline-flex items-center gap-1.5 font-semibold">
          <Award className="w-3.5 h-3.5" /> Rank #2 Restaurant in Mysuru
        </span>
        <span className="mx-2 opacity-50">|</span> 
        Fine dining with authentic coastal & master grills. Call <a href="tel:09900037368" className="underline hover:text-[#c2a35d] transition-colors">099000 37368</a> for direct table inquiries.
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#fcfcf9]/95 backdrop-blur-md border-b border-gray-100/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Elegant Brand Logo */}
            <div className="flex items-center gap-3">
              <div href="#top" onClick={() => scrollToSection('top')} className="cursor-pointer group">
                <span className="font-serif text-2xl font-bold italic tracking-wide text-[#0d1f38] group-hover:text-[#c2a35d] transition-colors">
                  Oyster <span className="text-[#c2a35d] font-normal not-italic">Bay</span>
                </span>
                <p className="text-[9px] tracking-[0.25em] text-[#c2a35d] uppercase font-bold text-center group-hover:tracking-[0.3em] transition-all">
                  Fine Dining • Mysuru
                </p>
              </div>
            </div>

            {/* Desktop Navigation Link Menu */}
            <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide text-[#0d1f38]/80">
              <button onClick={() => scrollToSection('top')} className="hover:text-[#c2a35d] transition-colors cursor-pointer py-2">Home</button>
              <button onClick={() => scrollToSection('story')} className="hover:text-[#c2a35d] transition-colors cursor-pointer py-2">Our Story</button>
              <button onClick={() => scrollToSection('menu')} className="hover:text-[#c2a35d] transition-colors cursor-pointer py-2">Signature Menu</button>
              <button onClick={() => scrollToSection('location')} className="hover:text-[#c2a35d] transition-colors cursor-pointer py-2">Location</button>
            </nav>

            {/* Desktop Table Booking CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => scrollToSection('reserve')} 
                className="bg-[#0d1f38] hover:bg-[#163053] text-[#fcfcf9] px-6 py-2.5 rounded-sm text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all border border-[#c2a35d]/30"
              >
                Reserve a Table
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#0d1f38] p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#fcfcf9] border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col text-left">
                <button 
                  onClick={() => scrollToSection('top')} 
                  className="text-[#0d1f38] hover:text-[#c2a35d] transition-colors text-base font-semibold py-2 border-b border-gray-100"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('story')} 
                  className="text-[#0d1f38] hover:text-[#c2a35d] transition-colors text-base font-semibold py-2 border-b border-gray-100"
                >
                  Our Story
                </button>
                <button 
                  onClick={() => scrollToSection('menu')} 
                  className="text-[#0d1f38] hover:text-[#c2a35d] transition-colors text-base font-semibold py-2 border-b border-gray-100"
                >
                  Signature Menu
                </button>
                <button 
                  onClick={() => scrollToSection('location')} 
                  className="text-[#0d1f38] hover:text-[#c2a35d] transition-colors text-base font-semibold py-2 border-b border-gray-100"
                >
                  Location & Contact
                </button>
                <button 
                  onClick={() => scrollToSection('reserve')} 
                  className="w-full bg-[#0d1f38] text-white py-3 mt-2 rounded bg-opacity-95 text-center font-bold text-sm uppercase tracking-wider"
                >
                  Book Table Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Masterpiece Section */}
      <section className="relative bg-[#0d1f38] text-[#fcfcf9] py-16 lg:py-24 overflow-hidden">
        {/* Subtle Decorative Ocean Backdrops */}
        <div className="absolute inset-0 bg-radial-gradient from-[#142e52] to-[#0d1f38] opacity-70 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#c2a35d]/10 border border-[#c2a35d]/30 rounded-full"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c2a35d]" />
                <span className="text-[#c2a35d] text-xs font-bold uppercase tracking-widest">
                  Fine Dining Restaurant • Mysuru
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#fcfcf9] leading-tight"
                id="hero-headline"
              >
                A Sanctuary of <br />
                <span className="italic text-[#c2a35d] font-normal font-serif">Epicurean Artistry</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-300 text-base sm:text-lg max-w-xl font-light leading-relaxed font-sans"
              >
                Welcome to <span className="font-semibold text-[#fcfcf9]">Oyster Bay</span>, Mysuru's elite culinary destination. Delight in our masterfully crafted coastal catches, premium dry-aged charcoal grills, and regional heritage secrets, framed by warm golden lighting and classic high-end hospitality.
              </motion.p>

              {/* Dynamic Rating / Verification Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 sm:flex sm:items-center gap-x-8 gap-y-4 pt-2 border-t border-gray-100/10 w-full"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[#c2a35d]">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-xl font-bold font-serif text-[#fcfcf9]">4.1</span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">3,698 Google Reviews</p>
                </div>

                <div className="h-8 w-[1px] bg-gray-100/10 hidden sm:block" />

                <div>
                  <span className="text-xl font-bold font-serif text-[#fcfcf9]">#2</span>
                  <p className="text-xs text-gray-400 font-medium">Top Fine Dining, Mysuru</p>
                </div>

                <div className="h-8 w-[1px] bg-gray-100/10 hidden sm:block" />

                <div>
                  <span className="text-xl font-bold font-serif text-[#fcfcf9]">100%</span>
                  <p className="text-xs text-gray-400 font-medium font-sans">Artisanal Quality</p>
                </div>
              </motion.div>

              {/* Hero CTA Block */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
              >
                <button 
                  onClick={() => scrollToSection('reserve')}
                  className="bg-[#c2a35d] hover:bg-[#b0914c] text-[#0d1f38] px-8 py-3.5 rounded-sm font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                  id="btn-reserve-hero"
                >
                  Book a Table <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="border border-[#c2a35d]/40 hover:border-[#c2a35d] text-[#fcfcf9] bg-white/5 hover:bg-white/10 px-8 py-3.5 rounded-sm font-semibold tracking-wider text-xs uppercase transition-all"
                  id="btn-menu-hero"
                >
                  Explore Signature Menu
                </button>
              </motion.div>
            </div>

            {/* Hero Right Column: Beautiful Generated Restaurant Scene Mock */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-6 relative flex justify-center"
            >
              <div className="relative w-full max-w-lg lg:max-w-none aspect-[16/11] rounded-lg overflow-hidden shadow-2xl border-2 border-[#c2a35d]/35">
                <img 
                  src={heroImage} 
                  alt="Oyster Bay luxury fine dining interior" 
                  className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                  id="hero-img-tag"
                />
                
                {/* Visual Glassmorphism Info Overlay card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0d1f38]/90 backdrop-blur-md border border-[#c2a35d]/30 p-4 rounded-md shadow-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[9px] uppercase tracking-widest text-[#c2a35d] font-bold">Featured Ambience</p>
                    <p className="text-sm font-serif font-medium text-[#fcfcf9]">Grand Seafood Dining Room</p>
                    <p className="text-xs text-gray-300 font-light font-sans">Kannada Parishath Road, Vijayanagar</p>
                  </div>
                  <div className="bg-[#c2a35d]/20 text-[#c2a35d] p-2.5 rounded-full border border-[#c2a35d]/35">
                    <Compass className="w-5 h-5 animate-spin-slow" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Elegant Quote Divider */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-serif text-xl sm:text-2xl italic text-[#0d1f38]/85 leading-relaxed">
            "Food represents the heritage of a city. At Oyster Bay, we unite coastal tradition with royal Mysuru ingredients to choreograph a ballet of unforgettable sensory experiences."
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[1px] w-8 bg-[#c2a35d]"></span>
            <span className="text-xs tracking-widest text-[#c2a35d] uppercase font-bold">Culinary Director, Oyster Bay</span>
            <span className="h-[1px] w-8 bg-[#c2a35d]"></span>
          </div>
        </div>
      </section>

      {/* About Section & Narrative */}
      <section id="story" className="py-20 lg:py-28 bg-[#fcfcf9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Visual Column */}
            <div className="grid grid-cols-12 gap-4 relative">
              <div className="absolute inset-0 bg-radial-gradient from-[#c2a35d]/5 to-transparent pointer-events-none -z-10" />
              
              <div className="col-span-8 overflow-hidden rounded-lg shadow-lg border border-[#c2a35d]/20 aspect-square">
                <img 
                  src={dishImage} 
                  alt="Oyster Bay fine dining coastal seafood plate" 
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  id="dish-img-about"
                />
              </div>

              <div className="col-span-4 flex flex-col justify-between gap-4">
                <div className="bg-[#0d1f38] text-white p-6 rounded-lg text-center flex flex-col justify-center items-center h-full border border-[#c2a35d]/40">
                  <span className="text-3xl font-serif text-[#c2a35d] font-bold">3K+</span>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#c2a35d] mt-1">Patrons</p>
                  <p className="text-xs text-gray-300 font-light mt-2 leading-relaxed">Loved and rated by Mysuru locals and visitors alike.</p>
                </div>
                
                <div className="p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col justify-center items-center h-full">
                  <Award className="w-8 h-8 text-[#c2a35d] mb-1" />
                  <p className="text-xs font-bold text-[#0d1f38] uppercase tracking-wide">Elite Class</p>
                  <p className="text-[10px] text-gray-500 font-medium text-center mt-1">Vijayanagar 2nd Stage near the landmark water tank.</p>
                </div>
              </div>
            </div>

            {/* Narrative Story-telling Column */}
            <div className="flex flex-col space-y-6">
              <span className="text-[#c2a35d] text-xs font-bold uppercase tracking-widest">Our Culinary Vision</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0d1f38]">
                Where Coastline Bounty Meets <br />
                <span className="italic font-normal text-[#c2a35d]">Royal Karnataka Heritage</span>
              </h2>
              
              <div className="h-[2px] w-20 bg-[#c2a35d] my-1" />

              <div className="text-gray-600 font-normal leading-relaxed space-y-4 font-sans text-sm sm:text-base">
                <p>
                  Oyster Bay entered Mysuru's competitive cuisine maps with a grand objective: to curate a high-society dining space serving majestic coastal dishes, charred smoky meats, and timeless local flavors within a single opulent frame. 
                </p>
                <p>
                  As an elite <strong className="text-[#0d1f38] font-semibold">Fine Dining Restaurant</strong>, we source our coastal crabs, lobsters and oysters direct from South India's pristine coastlines, maintaining a meticulous cold chain to preserve rich, natural ocean dew. 
                </p>
                <p>
                  Located beautifully in the quiet uptown enclave of <strong className="text-[#0d1f38] font-bold">Vijayanagar 2nd Stage</strong> (near the classic Vijayanagar Water Tank landmark), we represent an ideal setting for romantic candlelight tables, elegant family milestones, and celebratory corporate dynamic lunch meetings.
                </p>
              </div>

              {/* Informative Grid of Values */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-2.5">
                  <div className="bg-[#c2a35d]/10 text-[#c2a35d] p-1.5 rounded-sm shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0d1f38] uppercase tracking-wider">Premium Ingredients</h4>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">Saffron from Kashmir, hand-ground Mysuru cardamom, and organic spices.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="bg-[#c2a35d]/10 text-[#c2a35d] p-1.5 rounded-sm shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0d1f38] uppercase tracking-wider">Coastal Perfection</h4>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">Fresh daily ocean freight lobsters, sea bass, pomfret and premium prawns.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => scrollToSection('reserve')}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#0d1f38] hover:text-[#c2a35d] transition-colors border-b-2 border-[#c2a35d] pb-1"
                >
                  Schedule A Memorable Evening <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Signature Menu Section (Tabbed Category View with customized animations) */}
      <section id="menu" className="py-20 lg:py-24 bg-[#f8f8f2] border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-[#c2a35d] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Curated Gastronomy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0d1f38] font-medium tracking-tight">
              Our Culinary Masterpieces
            </h2>
            <p className="text-sm text-gray-500 font-sans font-light">
              Exquisite flavor narratives developed carefully with timeless marinades, intense coal tandoors, and hand-selected regional spices.
            </p>
            <div className="h-[2px] w-20 bg-[#c2a35d] mx-auto" />
          </div>

          {/* Interactive Menu Categories Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-2 border-b border-gray-200 max-w-4xl mx-auto">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeMenuTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveMenuTab(cat.id)}
                  className={`px-5 py-3 text-xs uppercase tracking-wider font-bold transition-all relative shrink-0 duration-300 flex items-center gap-2 border-b-2 cursor-pointer ${
                    isActive 
                      ? 'border-[#0c1e36] text-[#0c1e36] bg-white rounded-t shadow-sm' 
                      : 'border-transparent text-gray-500 hover:text-[#0c1e36]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Menu Items Display List */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {MENU_CATEGORIES.map((category) => {
                if (category.id !== activeMenuTab) return null;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {category.items.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-serif text-lg font-bold text-[#0d1f38] tracking-tight group-hover:text-[#c2a35d] transition-colors">
                              {item.name}
                            </h3>
                            <span className="font-serif text-[#c2a35d] font-bold text-lg whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                          
                          {item.badge && (
                            <span className="inline-block bg-[#c2a35d]/10 text-[#c2a35d] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mt-1 border border-[#c2a35d]/20">
                              {item.badge}
                            </span>
                          )}

                          <p className="text-gray-500 font-sans text-xs sm:text-sm font-normal mt-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Order info badge */}
                        <div className="mt-4 pt-3 border-t border-gray-100/60 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                          <span>Ingredients verified fresh</span>
                          <span className="text-[#c2a35d]">★ Premium quality</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-[#c2a35d]/10 text-[#c2a35d] p-3 rounded-full shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0d1f38] uppercase tracking-wide">Custom Dietary Needs?</h4>
                  <p className="text-xs text-gray-500 font-normal">Our culinary artists can customize spice levels, sugar replacements, and accommodate severe oyster/shellfish allergy protocols upon request.</p>
                </div>
              </div>
              <button 
                onClick={() => scrollToSection('reserve')} 
                className="bg-[#0d1f38] text-white hover:bg-[#153154] py-2.5 px-6 rounded-sm text-xs uppercase tracking-widest font-bold whitespace-nowrap"
              >
                Let Us Know
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Reservation Module */}
      <section id="reserve" className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Reservation Narrative Column */}
            <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-28">
              <span className="text-[#c2a35d] text-xs font-bold uppercase tracking-widest">Reserve Your Table</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0d1f38]">
                Crafting Your <br />
                <span className="italic font-normal text-[#c2a35d]">Perfect Evening</span>
              </h2>
              <div className="h-[2px] w-20 bg-[#c2a35d] my-1" />
              
              <div className="text-gray-600 space-y-4 font-sans text-sm sm:text-base">
                <p>
                  Reservations at Oyster Bay are highly recommended, especially during weekend candlelight services (Fridays - Sundays). 
                </p>
                <p>
                  By arranging your seating ahead of time, we can ensure our table artists customize the floral arrangements and configure appropriate private dining parameters for your guests.
                </p>
                <p>
                  Prefer traditional telephonic hospitality? Speak directly with our lead maitre d' to book larger banquets or personalized requests:
                </p>
              </div>

              {/* Instant Call Button for Realism/Utility */}
              <a 
                href="tel:09900037368" 
                className="inline-flex items-center gap-3.5 bg-[#fcfcf9] hover:bg-gray-100 border border-gray-200 text-[#0d1f38] px-6 py-4 rounded-lg shadow-sm transition-all text-left group"
              >
                <div className="bg-[#0d1f38] text-white p-3 rounded-full group-hover:bg-[#c2a35d] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Maitre D' Hotline</p>
                  <p className="text-base font-bold font-serif text-[#0d1f38]">099000 37368</p>
                </div>
              </a>

              <div className="bg-[#c2a35d]/10 border border-[#c2a35d]/30 rounded-lg p-5">
                <h4 className="text-xs font-bold text-[#0d1f38] uppercase tracking-wide flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#c2a35d]" /> Operating Fine Hours
                </h4>
                <div className="mt-3 text-xs text-gray-600 space-y-2 font-sans font-medium">
                  <div className="flex justify-between">
                    <span>Lunch Service:</span>
                    <span>12:00 PM - 3:30 PM (Daily)</span>
                  </div>
                  <div className="h-[1px] bg-gray-100" />
                  <div className="flex justify-between">
                    <span>Dinner Royalty Service:</span>
                    <span>7:00 PM - 11:30 PM (Daily)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Reservation Form or animated Receipt pass */}
            <div className="lg:col-span-7 bg-[#fcfcf9] border border-gray-100 rounded-lg shadow-xl p-6 sm:p-10 relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0d1f38] via-[#c2a35d] to-[#0d1f38]" />
              
              <AnimatePresence mode="wait">
                {!reservationSaved ? (
                  <motion.form 
                    key="reservation-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-semibold text-[#0d1f38]">Secure a Table</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Instantly confirmation pass will generate</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#0d1f38]/80">Your Full Name *</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c2a35d] focus:border-[#c2a35d]"
                          id="input-reserve-name"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#0d1f38]/80">Mobile Number *</label>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          placeholder="10-digit primary contact"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c2a35d] focus:border-[#c2a35d]"
                          id="input-reserve-tel"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0d1f38]/80">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c2a35d] focus:border-[#c2a35d]"
                        id="input-reserve-email"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#0d1f38]/80">Party Size *</label>
                        <select 
                          name="guests" 
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c2a35d] focus:border-[#c2a35d]"
                          id="select-reserve-guests"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests (Couple)</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests (Family)</option>
                          <option value="6">6 Guests (Banquette)</option>
                          <option value="8">8+ Guests (Call Maitre D')</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#0d1f38]/80">Select Date *</label>
                        <input 
                          type="date" 
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c2a35d] focus:border-[#c2a35d]"
                          id="input-reserve-date"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#0d1f38]/80">Select Time *</label>
                        <select 
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c2a35d] focus:border-[#c2a35d]"
                          id="select-reserve-time"
                        >
                          <option value="12:00">12:00 PM (Lunch)</option>
                          <option value="13:30">1:30 PM (Lunch)</option>
                          <option value="15:00">3:00 PM (Lunch)</option>
                          <option value="19:00">7:00 PM (Sunset Dinner)</option>
                          <option value="20:00">8:00 PM (Prime Dinner)</option>
                          <option value="21:30">9:30 PM (Late Dinner)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0d1f38]/80">Seating Atmosphere Preference</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label className="bg-white border rounded p-3 text-center cursor-pointer hover:border-[#c2a35d] flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0d1f38]">
                          <input 
                            type="radio" 
                            name="seating" 
                            value="indoor-gold" 
                            checked={formData.seating === 'indoor-gold'}
                            onChange={handleInputChange}
                            className="text-[#c2a35d]"
                          />
                          Golden Lounge
                        </label>
                        <label className="bg-white border rounded p-3 text-center cursor-pointer hover:border-[#c2a35d] flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0d1f38]">
                          <input 
                            type="radio" 
                            name="seating" 
                            value="coastal-window"
                            checked={formData.seating === 'coastal-window'}
                            onChange={handleInputChange}
                            className="text-[#c2a35d]"
                          />
                          Aquarium View
                        </label>
                        <label className="bg-white border rounded p-3 text-center cursor-pointer hover:border-[#c2a35d] flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0d1f38]">
                          <input 
                            type="radio" 
                            name="seating" 
                            value="family-sofa"
                            checked={formData.seating === 'family-sofa'}
                            onChange={handleInputChange}
                            className="text-[#c2a35d]"
                          />
                          Private Booth
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0d1f38]/80">Special Celebration Notes / Dietary Guidelines</label>
                      <textarea 
                        name="notes"
                        rows={2}
                        placeholder="e.g. Anniversaries, pure vegetarian preparation, kid-friendly seating..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c2a35d] focus:border-[#c2a35d]"
                        id="textarea-reserve-notes"
                      />
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#0d1f38] disabled:bg-[#0d1f38]/50 hover:bg-[#163053] text-[#fcfcf9] py-4 rounded font-bold uppercase tracking-widest text-xs border border-[#c2a35d]/30 transition-all flex items-center justify-center gap-2 shadow-lg"
                        id="btn-reserve-submit"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Choreographing Seating Arrangements...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Secure My Table Reservation <Check className="w-4 h-4" />
                          </span>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-400 font-sans text-center mt-2 leading-relaxed">
                      By submitting, you agree to our respectful hospitality guidelines. Please arrive within 15 minutes of scheduled time before reservation is forfeited to waitlisted patrons.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="reservation-success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-6"
                  >
                    {/* Animated visual confirmation ticket */}
                    <div className="w-16 h-16 bg-[#c2a35d]/10 text-[#c2a35d] rounded-full flex items-center justify-center mb-6 border border-[#c2a35d]/30">
                      <Smile className="w-8 h-8 animate-bounce-slow" />
                    </div>

                    <span className="text-[#c2a35d] text-[10px] uppercase tracking-widest font-bold">Table Booking Secured</span>
                    <h3 className="font-serif text-3xl font-semibold text-[#0d1f38] mt-2">Welcome to Oyster Bay</h3>
                    <p className="text-xs text-gray-500 font-light mt-1 font-sans">A custom reservation pass has been provisioned below.</p>

                    {/* Receipt Design block */}
                    <div className="w-full bg-white border border-[#c2a35d]/40 rounded-lg p-6 my-6 text-left relative overflow-hidden shadow-inner">
                      {/* Jagged border bottom aesthetic mock */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#c2a35d]/45" />
                      
                      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pass ID</p>
                          <p className="text-sm font-semibold font-serif text-[#0d1f38] tracking-wider">{reservationSaved.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Secured At</p>
                          <p className="text-[10px] text-gray-500 font-sans font-medium">{reservationSaved.timestamp}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 py-4 border-b border-gray-100 text-xs text-gray-600 font-sans">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Host Guardian</p>
                          <p className="font-bold text-[#0d1f38]">{reservationSaved.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Contact Phone</p>
                          <p className="font-bold text-[#0d1f38]">{reservationSaved.phone}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Party / Count</p>
                          <p className="font-bold text-[#0d1f38]">{reservationSaved.guests} Patron(s)</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Date & Time</p>
                          <p className="font-bold text-[#0d1f38]">
                            {reservationSaved.date} @ {reservationSaved.time}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Atmosphere</p>
                          <p className="font-bold text-[#c2a35d] uppercase tracking-wider text-[11px]">
                            {reservationSaved.seating === 'indoor-gold' ? '👑 Golden Premium Lounge' : 
                             reservationSaved.seating === 'coastal-window' ? '🌊 Panoramic Aquarium Window' : 
                             '👥 Cozy Private Sofa Booth'}
                          </p>
                        </div>
                        {reservationSaved.notes && (
                          <div className="col-span-2 bg-[#fdfdfc] p-2.5 rounded border border-gray-100 text-[11px] italic">
                            <span className="font-bold not-italic text-[10px] uppercase text-gray-400 block mb-0.5">Patron Instructions:</span>
                            "{reservationSaved.notes}"
                          </div>
                        )}
                      </div>

                      <div className="pt-4 flex items-center gap-3">
                        <div className="bg-[#c2a35d]/10 text-[#c2a35d] p-2 rounded-full shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium leading-tight">
                          Presented at entrance lobby on <span className="font-bold text-gray-700">Kannada Parishath Road</span>. Your table is ready.
                        </div>
                      </div>
                    </div>

                    {/* Reset Button container */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button 
                        onClick={resetReservation}
                        className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Book Another Seating
                      </button>
                      <button 
                        onClick={() => scrollToSection('location')}
                        className="flex-1 bg-[#0d1f38] hover:bg-[#163053] text-[#fcfcf9] py-3 rounded text-xs font-bold uppercase tracking-widest border border-[#c2a35d]/30 shadow-md transition-all"
                      >
                        Get Maps Navigation
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Guest Reviews Spotlight Section */}
      <section className="bg-[#fcfcf9] py-20 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-[#c2a35d] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" /> Patrons Echo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0d1f38] font-medium tracking-tight">
              Honorable Google Reviews
            </h2>
            <p className="text-sm text-gray-500 font-sans font-light">
              See what some of our 3,698 valued diners have to say about their custom experiences.
            </p>
            <div className="h-[2px] w-20 bg-[#c2a35d] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex text-[#c2a35d] gap-1.5 mb-4">
                  <Star className="w-4 h-4 fill-current animate-pulse" />
                  <Star className="w-4 h-4 fill-current animate-pulse" />
                  <Star className="w-4 h-4 fill-current animate-pulse" />
                  <Star className="w-4 h-4 fill-current animate-pulse" />
                  <Star className="w-4 h-4 fill-current animate-pulse" />
                </div>
                <p className="text-gray-600 font-sans text-sm italic font-normal leading-relaxed">
                  "Oyster Bay is an absolute sensory delight! The prawns ghee roast is outstandingly fresh, perfectly matched with crisp tandoori flatbreads. Warm, polished lighting makes it Mysuru's perfect venue for private dinners."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                <div className="bg-[#0d1f38] text-[#fcfcf9] font-serif w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                  S
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0d1f38] uppercase tracking-wide">Sanjay Deshpande</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Verified Diner • Google Review</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex text-[#c2a35d] gap-1.5 mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current/30" />
                </div>
                <p className="text-gray-600 font-sans text-sm italic font-normal leading-relaxed">
                  "Superb seafood options in Vijayanagar 2nd stage. We requested lower salt profiles for our elderly parents, and the culinary team executed it with complete elegance. Elegant design, peaceful vibe near the water tank."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                <div className="bg-[#0d1f38] text-[#fcfcf9] font-serif w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                  K
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0d1f38] uppercase tracking-wide">Kiara Menon</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Local Guide (Level 6) • Google Review</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex text-[#c2a35d] gap-1.5 mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-gray-600 font-sans text-sm italic font-normal leading-relaxed">
                  "Absolutely stellar hospitality. From custom reserve booth settings to direct service hotlines, Oyster Bay sets the gold standard. Tandoori Pomfret is a masterpiece. Highly recommended!"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                <div className="bg-[#0d1f38] text-[#fcfcf9] font-serif w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                  R
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0d1f38] uppercase tracking-wide">Rahul Shastri</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Verified Gourmet • Google Review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location, Contacts & Map Section */}
      <section id="location" className="py-20 lg:py-24 bg-[#0d1f38] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Info panel left */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <span className="text-[#c2a35d] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5" /> Plan Your Visit
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#fcfcf9]">
                Find Us in the City <br />
                <span className="italic font-normal text-[#c2a35d]">of Royal Palaces</span>
              </h2>
              <div className="h-[2px] w-20 bg-[#c2a35d] my-1" />

              <div className="space-y-6 font-sans text-sm text-gray-300">
                <div className="flex gap-4">
                  <div className="bg-[#c2a35d]/10 text-[#c2a35d] p-3 rounded-md shrink-0 border border-[#c2a35d]/30 h-fit">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#fcfcf9] tracking-wider mb-1">Our Address</h4>
                    <p className="text-sm opacity-90 leading-relaxed max-w-sm">
                      Kannada Parishath Road, Vijayanagar, 2nd Stage, near Water tank, Mysuru, Karnataka 570017
                    </p>
                    <p className="text-xs text-[#c2a35d] font-semibold mt-1">
                      Landmark: Vijayanagar Water Tank / Kannada Parishath Building.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#c2a35d]/10 text-[#c2a35d] p-3 rounded-md shrink-0 border border-[#c2a35d]/30 h-fit">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#fcfcf9] tracking-wider mb-1">Table Bookings & Support</h4>
                    <p className="text-base text-[#fcfcf9] font-serif font-bold">
                      <a href="tel:09900037368" className="hover:text-[#c2a35d] transition-colors">099000 37368</a>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Please quote your Reservation Pass ID when calling.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#c2a35d]/10 text-[#c2a35d] p-3 rounded-md shrink-0 border border-[#c2a35d]/30 h-fit">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#fcfcf9] tracking-wider mb-1">General Operations</h4>
                    <p className="text-sm opacity-90">Open 7 days a week, every calendar day.</p>
                    <p className="text-xs text-gray-400 mt-0.5">Lunch: 12:00 PM – 3:30 PM</p>
                    <p className="text-xs text-gray-400">Dinner: 7:00 PM – 11:30 PM</p>
                  </div>
                </div>
              </div>

              {/* Instant Google Maps Launch button */}
              <div className="pt-2">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#c2a35d] hover:bg-[#b0914c] text-[#0d1f38] px-8 py-3.5 rounded-sm font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 shadow-lg transition-all"
                  id="btn-gmaps"
                >
                  Retrieve Google Maps Route <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Simulated Visual Vector map interface right */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-lg p-6 sm:p-8 flex flex-col justify-between min-h-[400px] relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#c2a35d] font-bold">Interactive Location Card</span>
                    <h3 className="text-xl font-serif font-medium text-[#fcfcf9] mt-1">Vijayanagar 2nd Stage, Mysuru</h3>
                  </div>
                  <div className="bg-[#c2a35d]/20 text-[#c2a35d] px-3 py-1 rounded border border-[#c2a35d]/30 text-[10px] font-bold uppercase tracking-widest">
                    Live Status: Uncrowded
                  </div>
                </div>

                {/* Styled minimalist typographic map rendering */}
                <div className="bg-[#0b1b30] border border-white/5 rounded p-6 my-2 text-center text-xs space-y-4 shadow-inner relative flex flex-col justify-center items-center">
                  
                  {/* Decorative Mysuru Water Tank Vector Mock */}
                  <div className="flex items-center justify-center gap-6 text-gray-400 w-full max-w-sm">
                    <div className="text-right flex-1">
                      <p className="font-serif font-bold text-[#fcfcf9] text-sm">Vijayanagar</p>
                      <p className="text-[10px] text-gray-400">Kannada Parishath Rd</p>
                    </div>
                    
                    <div className="relative shrink-0 flex flex-col items-center justify-center">
                      <div className="h-10 w-1 bg-gradient-to-b from-[#c2a35d] to-[#0d1f38]" />
                      <div className="absolute -top-3 w-8 h-8 rounded-full border border-[#c2a35d]/50 bg-[#0d1f38] flex items-center justify-center text-[10px] font-bold text-[#c2a35d] shadow">
                        ⛲
                      </div>
                      <span className="text-[9px] text-[#c2a35d] font-bold uppercase tracking-wider mt-1 block">Water Tank</span>
                    </div>

                    <div className="text-left flex-1">
                      <p className="font-serif font-bold text-[#c2a35d] text-sm">Oyster Bay</p>
                      <p className="text-[10px] text-green-400 font-bold flex items-center gap-0.5">★★★★★ 4.1</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-[11px] leading-relaxed max-w-md font-sans">
                    We are located right on Kannada Parishath Road, just 100 meters southwest of the majestic Vijayanagar Water Tank, Mysuru. Parking is readily available.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/5 font-sans">
                  <span>© {new Date().getFullYear()} Oyster Bay Fine Dining.</span>
                  <span className="text-gray-300">Mysuru, Karnataka, India</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#081324] text-gray-400 py-12 px-4 text-center text-xs border-t border-white/5 font-sans leading-relaxed">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="font-serif text-lg font-bold italic tracking-wide text-[#fcfcf9]">
            Oyster <span className="text-[#c2a35d] font-normal not-italic font-sans">Bay</span>
          </p>
          <p className="max-w-md mx-auto opacity-75">
            Ranked #2 restaurant premium dining venue in Mysuru. Expertly crafted seafood plate, master grills and world-class warm service hospitality.
          </p>
          <div className="flex justify-center gap-6 pt-2 text-gray-500 font-semibold uppercase tracking-wider text-[10px]">
            <a href="#top" onClick={() => scrollToSection('top')} className="hover:text-white transition-all">Back to top</a>
            <span>•</span>
            <a href="tel:09900037368" className="hover:text-white transition-all">Support Line</a>
            <span>•</span>
            <a href="https://www.google.com/maps/search/?api=1&query_place_id=ChIJrWuzVfV6rzsRDvpOdcbn81A&query=Oyster%20Bay" target="_blank" rel="noreferrer" className="hover:text-white transition-all">Google Maps</a>
          </div>
          <div className="pt-6 border-t border-gray-900 text-[10px] opacity-50 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <span>License: Apache License 2.0. Clean corporate static landing portal.</span>
            <span>All food photos curated via high-end Generative models.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
