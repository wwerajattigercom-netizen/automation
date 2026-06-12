import { useState } from 'react';
import { MenuItem } from '../types';
import { Search, Flame, Sparkles, Coffee, Sun, Utensils, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Path of the generated Mysore Masala Dosa image
const DOSA_IMAGE_PATH = '/src/assets/images/mysore_masala_dosa_1781293991430.jpg';

const MENU_ITEMS: MenuItem[] = [
  // Breakfast Section (Mornings)
  {
    id: 'b1',
    name: 'Mysore Masala Dosa',
    description: 'Crispy golden crepe layered with our authentic heritage spiced garlic-red chilli paste, stuffed with flavorful potato masala, finished with pure local ghee.',
    price: '₹95',
    category: 'breakfast',
    isPopular: true,
    spicyLevel: 2,
  },
  {
    id: 'b2',
    name: 'Steaming Mallige Idli (2 Pcs)',
    description: 'Incredibly soft, fluffy "jasmine-like" steamed rice-lentil cakes, served with traditional Mysuru coconut chutney and steaming hot spicy sambar.',
    price: '₹50',
    category: 'breakfast',
    spicyLevel: 1,
  },
  {
    id: 'b3',
    name: 'Crispy Uddina Vada',
    description: 'Freshly fried black-gram donuts, crunchy on the outside, light and soft on the inside, seasoned with crushed pepper, ginger, and curry leaves.',
    price: '₹45',
    category: 'breakfast',
    isPopular: true,
  },
  {
    id: 'b4',
    name: 'Poori Sagu',
    description: 'Two golden-puffed, crispy whole wheat flatbreads served with our special creamed potato and mixed vegetable curry (Sagu).',
    price: '₹80',
    category: 'breakfast',
    spicyLevel: 1,
  },
  
  // Meals (Lunch & Dinner)
  {
    id: 'm1',
    name: 'Mahesh Prasad Deluxe Special Thali',
    description: 'An expansive traditional royal meal served custom-style with Mysore aromatic rice, pure ghee, seasonal dry subji, authentic Sambar, Rasam, Pappadum, thick curd, sweet of the day, and special digestive buttermilk.',
    price: '₹140',
    category: 'meals',
    isPopular: true,
    spicyLevel: 2,
  },
  {
    id: 'm2',
    name: 'Famous Bisi Bele Bath',
    description: 'Classic aromatic rice-lentil hotpot slow-cooked with fresh hand-pounded vegetables, spiced tamarind extract, topped with crisp boondi and generous hot ghee.',
    price: '₹85',
    category: 'meals',
    spicyLevel: 2,
  },
  {
    id: 'm3',
    name: 'Golden Lacey Rava Masala Dosa',
    description: 'Large, lacy crepe prepared from semolina, rice flour, sprinkled with black peppercorns, cumin, fresh coriander, and ginger, enclosing mashed potato palya.',
    price: '₹110',
    category: 'meals',
  },
  {
    id: 'm4',
    name: 'Authentic Akki Roti (2 Pcs)',
    description: 'Traditional rustic griddled flatbread made with rice flour, finely chopped onions, hand-picked dill leaves, green chillies, served with freshly churned unsalted white butter.',
    price: '₹90',
    category: 'meals',
    spicyLevel: 2,
  },

  // Beverages & Desserts (Brews)
  {
    id: 'be1',
    name: 'Authentic Mysore Filter Coffee',
    description: 'Royal standard hot chicory-blended coffee, freshly brewed using a long double-decoction drip, expertly frothed with hot milk in a traditional brass cup.',
    price: '₹35',
    category: 'beverages',
    isPopular: true,
  },
  {
    id: 'be2',
    name: 'Cardamom Ginger Masala Tea',
    description: 'Rich hand-crushed ginger, whole sweet green cardamom capsule, and premium tea dust slow-boiled together to create a refreshing hot beverage.',
    price: '₹30',
    category: 'beverages',
  },
  {
    id: 'be3',
    name: 'Melt-in-mouth Mysore Pak',
    description: 'The definitive royal sweet of Mysuru, crafted perfectly with slow-stirred chickpea flour, organic sugar, and high-purity bubbling cow milk ghee.',
    price: '₹60',
    category: 'beverages',
    isPopular: true,
  },
  {
    id: 'be4',
    name: 'Royal Saffron Badam Halwa',
    description: 'Sweet luxury dessert made with rich hand-ground raw almonds, saffron strands from Kashmir, pure ghee, and topped with dry cashew nuts.',
    price: '₹80',
    category: 'beverages',
  },
];

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<'breakfast' | 'meals' | 'beverages'>('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopularOnly, setShowPopularOnly] = useState(false);

  // Filter items logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesTab = item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPopular = showPopularOnly ? item.isPopular : true;
    
    return matchesTab && matchesSearch && matchesPopular;
  });

  return (
    <section id="menu" className="py-20 bg-gray-50 border-t border-brand-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Description */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-gold-100 text-brand-gold-600 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-brand-gold-500/15">
            <Sparkles size={14} />
            <span>Traditional Landmarks</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Our Pure Vegetarian Specialties
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-sans">
            Handcrafted recipes passed down through generations, utilizing genuine local ingredients, organic spices, and premium local ghee.
          </p>
        </div>

        {/* Search, Filter, Popular Toggles Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-brand-green-100 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Category selection */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('breakfast')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'breakfast'
                    ? 'bg-brand-green-600 text-white shadow-md border-b-2 border-brand-gold-500'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Sun size={16} />
                <span>Mornings Breakfast</span>
              </button>
              <button
                onClick={() => setActiveTab('meals')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'meals'
                    ? 'bg-brand-green-600 text-white shadow-md border-b-2 border-brand-gold-500'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Utensils size={16} />
                <span>Heritage Lunch & Dinner</span>
              </button>
              <button
                onClick={() => setActiveTab('beverages')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'beverages'
                    ? 'bg-brand-green-600 text-white shadow-md border-b-2 border-brand-gold-500'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Coffee size={16} />
                <span>Brews & Sweets</span>
              </button>
            </div>

            {/* Search Input and Popular Switch */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:max-w-md flex-1 md:justify-end">
              {/* Search */}
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search popular delicacies (e.g. Dosa)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 focus:border-brand-green-600"
                />
              </div>

              {/* Popular Checkbox Toggle */}
              <button
                onClick={() => setShowPopularOnly(!showPopularOnly)}
                className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all cursor-pointer border ${
                  showPopularOnly
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <ThumbsUp size={14} className={showPopularOnly ? 'fill-amber-600' : ''} />
                <span>Highly Ranked Only</span>
              </button>
            </div>

          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="menu-grid">
          
          {/* Flagship Mysore Masala Dosa Spotlight (if we are in breakfast and matching) */}
          {activeTab === 'breakfast' && !showPopularOnly && (
            <div className="md:col-span-2 bg-radial from-brand-gold-100/40 to-white rounded-3xl p-6 sm:p-8 border-2 border-brand-gold-500/15 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-video lg:aspect-square h-full border border-gray-200 shadow-sm">
                <img
                  src={DOSA_IMAGE_PATH}
                  alt="Famous Crispy Golden Mysore Masala Dosa"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-500 text-white text-[10px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-full font-extrabold shadow-xs">
                    ⭐ Flagship Specialty
                  </span>
                  <span className="bg-brand-green-100 text-brand-green-800 text-[10px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-full font-bold">
                    Pure Ghee
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green-800">
                    Signature Mysore Masala Dosa
                  </h3>
                  <span className="font-mono font-bold text-2xl text-brand-gold-600">₹95</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  The quintessential Mysore culinary marvel. Crispy crepe pan-smeared with authentic fiery Kashmiri garlic chutney, packed internally with flavorful spiced potato dry stew, served alongside our unlimited piping hot sambar & rich wet coconut relish.
                </p>
                <div className="flex items-center space-x-4 pt-1 font-mono text-xs text-gray-500">
                  <div className="flex items-center space-x-1.5">
                    <Flame size={14} className="text-orange-500" />
                    <span>Mild Spice (Level 2)</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300" />
                  <span>Mysuru Royal Court Favorite</span>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Map Items */}
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              // Skip Mysore Masala Dosa b1 inside the standard card if we highlight it right above (avoids duplicate feel for clean visual)
              !(activeTab === 'breakfast' && item.id === 'b1' && !showPopularOnly) && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-brand-green-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-gray-900 group-hover:text-brand-green-600 transition-colors">
                          {item.name}
                        </h4>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {item.isPopular && (
                            <span className="bg-amber-100 text-amber-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                              Popular Order
                            </span>
                          )}
                          {item.spicyLevel && (
                            <span className="bg-red-50 text-red-700 text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm flex items-center space-x-0.5">
                              <Flame size={10} className="fill-red-500 text-red-500" />
                              <span>Spice Level {item.spicyLevel}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-lg font-bold text-brand-green-700 whitespace-nowrap bg-brand-green-50 px-2.5 py-1 rounded-lg border border-brand-green-100">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Empty search fallback */}
          {filteredItems.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
              <span className="text-4xl block mb-3">🍽️</span>
              <h4 className="text-gray-800 font-semibold mb-1">No delicacies matched the filter</h4>
              <p className="text-gray-400 text-xs font-mono">Try typing another keyword (e.g., Saffron, Thali, Coffee)</p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
