import { useState, useEffect } from 'react';
import { Phone, Clock, Compass, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if restaurant is currently open (6:30 AM to 10:30 PM)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      // Adjusting to Indian Standard Time (IST) would be ideal, but for now let's use the local container time
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      
      const openTime = 6 * 60 + 30; // 6:30 AM
      const closeTime = 22 * 60 + 30; // 10:30 PM
      
      setIsOpen(totalMinutes >= openTime && totalMinutes < closeTime);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-green-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-brand-green-600 text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center font-serif text-lg sm:text-xl font-bold shadow-md border-2 border-brand-gold-500">
              MP
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-brand-green-700 tracking-tight block">
                Mahesh Prasad
              </span>
              <span className="text-[10px] sm:text-xs text-brand-gold-600 tracking-wider font-mono font-semibold uppercase">
                Pure Veg Heritage • Mysuru
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-sans font-medium text-sm text-gray-600">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-brand-green-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('menu')} 
              className="hover:text-brand-green-600 transition-colors cursor-pointer"
            >
              Menu Landmarks
            </button>
            <button 
              onClick={() => scrollToSection('taste-quiz')} 
              className="hover:text-brand-green-600 transition-colors cursor-pointer"
            >
              Flavour Guide
            </button>
            <button 
              onClick={() => scrollToSection('reservation')} 
              className="hover:text-brand-green-600 transition-colors cursor-pointer"
            >
              Reserve Table
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-brand-green-600 transition-colors cursor-pointer"
            >
              Locate Us
            </button>
          </nav>

          {/* Desktop Call to Action & Live Status */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Live Timing Indicator */}
            <div className="flex items-center space-x-2 bg-brand-green-50 px-3 py-1.5 rounded-full border border-brand-green-100">
              <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs font-mono font-medium text-brand-green-700">
                {isOpen ? 'Serving Hot Now' : 'Closed (Opens 6:30 AM)'}
              </span>
            </div>

            <a
              href="tel:08212330820"
              className="flex items-center space-x-2 bg-brand-green-600 hover:bg-brand-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5 border border-brand-green-700"
            >
              <Phone size={16} />
              <span>0821 233 0820</span>
            </a>
          </div>

          {/* Mobile Menu Trigger & Status Indicator */}
          <div className="flex items-center space-x-3 md:hidden">
            <div className="flex items-center space-x-1.5 bg-brand-green-50 px-2.5 py-1 rounded-full border border-brand-green-100">
              <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-[10px] font-mono text-brand-green-700">
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-green-700 hover:bg-brand-green-50 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-brand-green-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 font-medium text-gray-700 border-b border-gray-100 pb-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left py-2 font-medium text-gray-700 border-b border-gray-100 pb-2"
              >
                Menu Landmarks
              </button>
              <button
                onClick={() => scrollToSection('taste-quiz')}
                className="text-left py-2 font-medium text-gray-700 border-b border-gray-100 pb-2"
              >
                Flavour Guide
              </button>
              <button
                onClick={() => scrollToSection('reservation')}
                className="text-left py-2 font-medium text-gray-700 border-b border-gray-100 pb-2"
              >
                Reserve Table
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 font-medium text-gray-700 border-b border-gray-100 pb-2"
              >
                Locate Us
              </button>

              <div className="pt-2 flex flex-col space-y-3">
                <div className="flex items-center space-x-2 text-xs text-brand-green-700 font-mono">
                  <Clock size={14} />
                  <span>Timings: 6:30 AM — 10:30 PM Everyday</span>
                </div>
                <a
                  href="tel:08212330820"
                  className="flex items-center justify-center space-x-2 bg-brand-green-600 text-white py-3 rounded-lg font-semibold shadow-md active:bg-brand-green-700"
                >
                  <Phone size={18} />
                  <span>Call to Order: 0821 233 0820</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
