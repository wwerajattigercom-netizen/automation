import { Star, MessageSquare, Compass, PhoneCall, Award } from 'lucide-react';
import { motion } from 'motion/react';

// Path of the generated South Indian Thali image
const HERO_IMAGE_PATH = '/src/assets/images/south_indian_thali_1781293977138.jpg';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-b from-brand-gold-100/50 to-white pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
            id="hero-content"
          >
            {/* Elite Badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-green-100 hover:bg-brand-green-200/80 transition-colors px-3 sm:px-4 py-2 rounded-full border border-brand-green-600/20">
              <Award className="text-brand-green-700 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-mono font-bold text-brand-green-800 uppercase tracking-widest">
                Ranked #1 Vegetarian Restaurant in Mysuru
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-green-800 leading-tight tracking-tight">
              A Legacy of <br className="hidden sm:inline" />
              <span className="relative text-brand-gold-600 italic">
                Authentic Flavours
              </span> <br />
              in the Heart of Mysore
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg max-w-xl font-sans leading-relaxed">
              Step into <span className="font-semibold text-brand-green-700">Mahesh Prasad</span>, where every bite is a journey through traditional Karnataka culinary heritage. Famed for our crisp golden dosas, pure ghee filter coffee, and traditional South Indian thalis.
            </p>

            {/* Ratings & Reviews Counter */}
            <div className="flex flex-wrap items-center gap-6 py-2 border-y border-brand-green-100 my-4">
              <div className="flex items-center space-x-2">
                <div className="flex text-amber-500">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                  {/* Half Star approximation on Tailwind */}
                  <div className="relative text-amber-500">
                    <Star size={18} fill="currentColor" className="clip-half" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
                    <Star size={18} className="absolute top-0 left-0 text-amber-500" />
                  </div>
                </div>
                <span className="font-mono font-bold text-lg text-brand-green-800">4.1</span>
              </div>
              <div className="h-5 w-px bg-brand-green-200" />
              <div className="flex items-center space-x-2 text-gray-500 text-sm font-mono">
                <MessageSquare size={16} className="text-brand-green-600" />
                <span className="font-semibold text-gray-700">3,914 Verified Google Reviews</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => scrollToSection('menu')}
                className="bg-brand-green-600 hover:bg-brand-green-700 text-white font-semibold text-center hover:shadow-lg hover:-translate-y-0.5 transition-all px-8 py-4 rounded-xl shadow-md cursor-pointer border border-brand-green-700 font-sans"
              >
                Explore Culinary Landmarks
              </button>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 bg-white hover:bg-brand-green-50 text-brand-green-700 font-semibold px-6 py-4 rounded-xl border-2 border-brand-green-600/30 hover:border-brand-green-600 hover:shadow-md hover:-translate-y-0.5 transition-all font-sans"
              >
                <Compass size={18} />
                <span>Navigate via Google Maps</span>
              </a>
            </div>

            {/* Quick address indicator */}
            <p className="text-xs text-gray-500 font-mono italic">
              Located near Ballal Circle, RTO Office, Chamarajapuram, Mysuru.
            </p>

          </motion.div>

          {/* Hero Decorative Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
            id="hero-media-wrapper"
          >
            {/* Background design elements */}
            <div className="absolute -inset-4 bg-brand-green-100 rounded-2xl rotate-3 scale-95 opacity-50 blur-lg -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold-500/20 w-72 h-72 rounded-full filter blur-3xl -z-10" />

            <div className="overflow-hidden rounded-2xl border-4 border-white shadow-2xl relative aspect-[14/10]">
              <img
                src={HERO_IMAGE_PATH}
                alt="Delicious traditional Mysuru South Indian Thali served on a green banana leaf"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Image floating badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-3 rounded-xl shadow-lg border border-brand-green-100 flex items-center space-x-3">
                <div className="bg-brand-gold-100 p-2 rounded-lg">
                  <span className="text-xl">🍛</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-green-800 text-xs">Authentic Thali Feast</h4>
                  <p className="text-[10px] text-gray-500 font-mono">Unlimited pure vegetarian taste</p>
                </div>
              </div>

              {/* Dosa Badge */}
              <div className="absolute top-4 right-4 bg-brand-green-700/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-full shadow-md text-xs font-mono font-medium tracking-wide">
                ☘️ 100% Pure Vegetarian
              </div>
            </div>

            {/* Decorative hanging pattern */}
            <div className="absolute -top-3 left-10 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 px-1 bg-brand-gold-500 h-6 rounded-b-full opacity-60" />
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
