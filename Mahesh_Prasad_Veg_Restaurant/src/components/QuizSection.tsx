import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, Flame, Scale, RotateCcw, Heart } from 'lucide-react';

interface QuizAnswer {
  mealtime: string;
  spice: string;
  appetite: string;
}

export default function QuizSection() {
  const [step, setStep] = useState<number>(0);
  const [selections, setSelections] = useState<Partial<QuizAnswer>>({});
  const [recommendation, setRecommendation] = useState<{
    name: string;
    description: string;
    tip: string;
    icon: string;
    price: string;
  } | null>(null);

  const startQuiz = () => {
    setStep(1);
    setSelections({});
    setRecommendation(null);
  };

  const handleSelect = (category: keyof QuizAnswer, value: string) => {
    const updated = { ...selections, [category]: value };
    setSelections(updated);
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate recommendation as step reaches 3
      calculateRecommendation(updated as QuizAnswer);
      setStep(4);
    }
  };

  const calculateRecommendation = (answers: QuizAnswer) => {
    const { mealtime, spice, appetite } = answers;

    if (mealtime === 'breakfast') {
      if (spice === 'spicy') {
        setRecommendation({
          name: 'Mysore Masala Dosa',
          description: 'Our world-famous golden crispy crepe smeared with fiery red garlic-chilli chutney and loaded with spiced potato filling.',
          tip: 'Ask for extra pure ghee on top to rich-up the flavor!',
          icon: '🥞',
          price: '₹95',
        });
      } else if (appetite === 'heavy') {
        setRecommendation({
          name: 'Poori Sagu',
          description: 'Two fluffy golden puffed pooris served with a rich aromatic coconut-based seasonal mixed vegetable curry.',
          tip: 'Enjoy them piping hot while they are fully puffed up!',
          icon: '🥟',
          price: '₹80',
        });
      } else {
        setRecommendation({
          name: 'Mallige Idli & Crispy Vada Combo',
          description: 'Our jasmine-soft steamed idlis paired with a crunchy black-gram lentil donut vada, served with traditional coconut chutney and hot sambar.',
          tip: 'Dip the crispy vada directly in the hot sambar for a traditional experience.',
          icon: '⚪',
          price: '₹95',
        });
      }
    } else if (mealtime === 'lunch') {
      if (appetite === 'heavy') {
        setRecommendation({
          name: 'Mahesh Prasad Deluxe Special Thali',
          description: 'Our signature royal feast: Mysuru fragrant rice, aromatic sambar, rasam, freshly made flatbread, multiple dry curries, curd, and hand-stirred sweet of the day.',
          tip: 'Eat in the traditional sequence. Start with the dry curries and rice, then enjoy Rasam rice and Curd rice as digestive finishers!',
          icon: '🍛',
          price: '₹140',
        });
      } else if (spice === 'spicy') {
        setRecommendation({
          name: 'Famous Bisi Bele Bath',
          description: 'Spicily rich, slow-simmered rice and lentil mash cooked with hand-sliced farm-picked vegetables, specialized local spices, and fresh ghee.',
          tip: 'Top it with crispy boondi provided on the side for that extra crunch!',
          icon: '🍲',
          price: '₹85',
        });
      } else {
        setRecommendation({
          name: 'Authentic Akki Roti with White Butter',
          description: 'Griddled rice-flour flatbread mixed with hand-shredded dill leaves, finely minced onions, and soft green chillies. Served with fresh white butter.',
          tip: 'Dill leaves provide an incredible traditional aroma. Eat it warm!',
          icon: '🫓',
          price: '₹90',
        });
      }
    } else {
      // Brews / Sweets craving
      if (spice === 'sweet') {
        setRecommendation({
          name: 'Mysore Pak & Filter Coffee Combo',
          description: 'The ultimate royal sweet made of slow-stirred chickpea flour and bubbled ghee, paired with our strong, frothy brass-poured filter coffee.',
          tip: 'Take a small bite of the rich Mysore Pak, then sip the deep-decoction Filter Coffee.',
          icon: '☕',
          price: '₹95',
        });
      } else {
        setRecommendation({
          name: 'Authentic Mysore Filter Coffee',
          description: 'Our classic double-decoction chicory blended coffee, freshly frothed from height in a traditional brass tumbler.',
          tip: 'Sip from the traditional brass dabarah and experience real South Indian cafe heritage.',
          icon: '☕',
          price: '₹35',
        });
      }
    }
  };

  return (
    <section id="taste-quiz" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold-500/10 rounded-full blur-3xl -z-5" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-brand-green-600/20 rounded-full blur-3xl -z-5" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Step Header */}
        <div className="max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-green-800 text-brand-gold-500 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-brand-gold-500/20">
            <Sparkles size={14} className="animate-pulse" />
            <span>Flavour Navigator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Find Your Perfect Traditional Dish
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-sans">
            Unsure of what to order? Take our 30-second taste selector quiz and let us recommend a traditional culinary masterpiece just for you!
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl max-w-2xl mx-auto text-left min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* Step 0: Welcome Screen */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-10 space-y-6 flex flex-col items-center justify-center h-full flex-1"
              >
                <div className="w-16 h-16 bg-brand-gold-500/20 rounded-full flex items-center justify-center text-4xl shadow-inner border border-brand-gold-500/30">
                  🍛
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-brand-gold-500">Welcome to the Flavour Selector</h3>
                  <p className="text-sm font-mono text-gray-300">Answer 3 simple questions about your current cravings</p>
                </div>
                <button
                  onClick={startQuiz}
                  className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-800 font-sans font-extrabold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  Begin Selection
                </button>
              </motion.div>
            )}

            {/* Step 1: Breakfast vs Lunch vs Brews */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col justify-center"
              >
                <div className="flex items-center space-x-2 text-brand-gold-500 font-mono text-xs">
                  <Utensils size={14} />
                  <span>Question 1 of 3</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">What type of culinary experience are you seeking today?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleSelect('mealtime', 'breakfast')}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer text-left transition-all hover:border-brand-gold-500/50"
                  >
                    <span className="text-3xl block mb-2">🌅</span>
                    <h4 className="font-bold font-serif text-brand-gold-500 text-sm">Morning Breakfast</h4>
                    <p className="text-xs text-gray-300 font-sans mt-1">Light, crisp crepes or steamed rice idlis as starter.</p>
                  </button>
                  <button
                    onClick={() => handleSelect('mealtime', 'lunch')}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer text-left transition-all hover:border-brand-gold-500/50"
                  >
                    <span className="text-3xl block mb-2">☀️</span>
                    <h4 className="font-bold font-serif text-brand-gold-500 text-sm">Heritage Meals</h4>
                    <p className="text-xs text-gray-300 font-sans mt-1">Robust traditional platters or wholesome hotpots.</p>
                  </button>
                  <button
                    onClick={() => handleSelect('mealtime', 'brews')}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer text-left transition-all hover:border-brand-gold-500/50"
                  >
                    <span className="text-3xl block mb-2">☕</span>
                    <h4 className="font-bold font-serif text-brand-gold-500 text-sm">Brews & Desserts</h4>
                    <p className="text-xs text-gray-300 font-sans mt-1">Aromatic filter coffee, spicy chai, and ghee sweets.</p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Mild vs Spicy */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col justify-center"
              >
                <div className="flex items-center space-x-2 text-brand-gold-500 font-mono text-xs">
                  <Flame size={14} />
                  <span>Question 2 of 3</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">How do you prefer your spice-palette?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleSelect('spice', 'mild')}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer text-left transition-all hover:border-brand-gold-500/50"
                  >
                    <span className="text-3xl block mb-2">🍲</span>
                    <h4 className="font-bold font-serif text-brand-gold-500 text-sm">Mild & Aromatic</h4>
                    <p className="text-xs text-gray-300 font-sans mt-1">Gentle flavor profiles with rich spices, but zero heat.</p>
                  </button>
                  <button
                    onClick={() => handleSelect('spice', 'spicy')}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer text-left transition-all hover:border-brand-gold-500/50"
                  >
                    <span className="text-3xl block mb-2">🌶️</span>
                    <h4 className="font-bold font-serif text-brand-gold-500 text-sm">Spicy & Zesty</h4>
                    <p className="text-xs text-gray-300 font-sans mt-1">Featuring authentic local chutneys and hot sambar.</p>
                  </button>
                  <button
                    onClick={() => handleSelect('spice', 'sweet')}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer text-left transition-all hover:border-brand-gold-500/50"
                  >
                    <span className="text-3xl block mb-2">🍯</span>
                    <h4 className="font-bold font-serif text-brand-gold-500 text-sm">Sweet Craving</h4>
                    <p className="text-xs text-gray-300 font-sans mt-1">Saffron, jaggery, or pure ghee infusions.</p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Appetite (Light vs Heavy) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col justify-center"
              >
                <div className="flex items-center space-x-2 text-brand-gold-500 font-mono text-xs">
                  <Scale size={14} />
                  <span>Question 3 of 3</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">How hungry are you feeling right now?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSelect('appetite', 'light')}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer text-left transition-all hover:border-brand-gold-500/50"
                  >
                    <span className="text-3xl block mb-2">🥗</span>
                    <h4 className="font-bold font-serif text-brand-gold-500 text-sm">Light & Satisfying</h4>
                    <p className="text-xs text-gray-300 font-sans mt-1">Perfect for a mid-day snack or gentle energy reboot.</p>
                  </button>
                  <button
                    onClick={() => handleSelect('appetite', 'heavy')}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer text-left transition-all hover:border-brand-gold-500/50"
                  >
                    <span className="text-3xl block mb-2">🥘</span>
                    <h4 className="font-bold font-serif text-brand-gold-500 text-sm">Hearty & Filling</h4>
                    <p className="text-xs text-gray-300 font-sans mt-1">Seeking the full traditional dining layout with multi-courses.</p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Output / Recommendations */}
            {step === 4 && recommendation && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-xl border border-white/5 font-mono text-xs text-brand-gold-500">
                  <span className="flex items-center gap-1">✨ Recommendation complete</span>
                  <span>{recommendation.price}</span>
                </div>

                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="bg-brand-gold-500/20 text-4xl sm:text-5xl w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center border border-brand-gold-500/30 shrink-0">
                    {recommendation.icon}
                  </div>
                  <div className="space-y-2">
                    <span className="bg-emerald-800 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Perfect Match For You
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold-500 leading-tight">
                      {recommendation.name}
                    </h4>
                    <p className="text-gray-200 text-sm font-sans leading-relaxed">
                      {recommendation.description}
                    </p>
                  </div>
                </div>

                {/* Chef Tip box */}
                <div className="bg-brand-green-800/80 p-4 rounded-xl border border-brand-green-700/50 flex space-x-3">
                  <Heart className="text-brand-gold-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs text-gray-300 font-sans">
                    <strong className="text-brand-gold-500 block font-mono font-bold text-[10px] uppercase mb-0.5">Heritage Recommendation Tip</strong>
                    {recommendation.tip}
                  </p>
                </div>

                {/* Reset Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={startQuiz}
                    className="flex justify-center items-center space-x-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-800 font-sans font-bold text-sm px-6 py-3 rounded-lg hover:-translate-y-0.5 transition-all cursor-pointer flex-1"
                  >
                    <RotateCcw size={16} />
                    <span>Try Brand Quiz Again</span>
                  </button>
                  <button
                    onClick={() => {
                      const element = document.getElementById('menu');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex justify-center items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-sm px-6 py-3 rounded-lg transition-all cursor-pointer"
                  >
                    <span>View In Menu landmarks</span>
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
