import { useState, FormEvent } from 'react';
import { Review } from '../types';
import { Star, CheckCircle, Quote, ThumbsUp, Feather, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Aniruddha Sen',
    role: 'Local Guide • 84 Reviews',
    rating: 5,
    text: 'Easily the best pure veg breakfast spot mock near Lakshmipuram! Their world-famous Mysore Masala Dosa has that authentic earthy garlic flavour and generous ghee on top. The hot filter coffee served in brass cups is an absolute Mysore experience.',
    date: '2 days ago',
  },
  {
    id: 'r2',
    author: 'Deepa K. Naik',
    role: 'Verified Customer',
    rating: 4,
    text: 'Outstanding service speed even during peak Sunday hours. We grabbed a Poori Sagu and the Special Deluxe Thali. The Rasam on the Thali was perfectly spicy and authentic. Very family friendly and extremely clean.',
    date: '1 week ago',
  },
  {
    id: 'r3',
    author: 'Karthik Gowda',
    role: 'Mysuru Food Explorer',
    rating: 5,
    text: 'Mahesh Prasad is a landmark in Mysuru. Visited with my parents after 5 long years, and the taste is exactly as incredible as it was. Their Bisi Bele Bath and Badam Halwa are culinary landmarks.',
    date: '3 weeks ago',
  },
  {
    id: 'r4',
    author: 'Vikram Chamaraj',
    role: 'Local Resident',
    rating: 4,
    text: 'Authentic local taste. Extremely affordable and high hygiene standards near Ballal Circle. If you are anywhere near Lakshmipuram, skip the hotels and come straight here for breakfast.',
    date: '1 month ago',
  },
];

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  
  // New review form state
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) {
      alert('Please fill in both your name and review remarks.');
      return;
    }

    const newReview: Review = {
      id: `r-custom-${Date.now()}`,
      author: newName,
      role: 'Verified Diners Club',
      rating: newRating,
      text: newText,
      date: 'Just now',
    };

    setReviews([newReview, ...reviews]);
    setIsSuccess(true);
    
    // Reset form after delay
    setTimeout(() => {
      setNewName('');
      setNewText('');
      setNewRating(5);
      setShowForm(false);
      setIsSuccess(false);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 bg-gray-50 border-t border-brand-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title / Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-brand-gold-100 text-brand-gold-600 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-brand-gold-500/15">
              <Sparkles size={14} />
              <span>Diner Feedback</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Shared by 3,900+ Diners
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-sans">
              Discover real experiences shared by families, locals, and global travelers who stop at our iconic Chamarajapuram dining spot.
            </p>
          </div>

          {/* Quick Review Write Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-brand-green-600 hover:bg-brand-green-700 text-white font-sans font-bold text-sm px-5 py-3.5 rounded-xl shadow-md cursor-pointer transition-all border border-brand-green-700"
          >
            <Feather size={16} />
            <span>Write Your Experience</span>
          </button>
        </div>

        {/* Write review expandable form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-green-100 shadow-md max-w-2xl mx-auto">
                {isSuccess ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="text-3xl text-emerald-500">🏆 Thank You!</div>
                    <h4 className="font-serif font-bold text-lg text-brand-green-800">Your experiences make us better.</h4>
                    <p className="text-xs font-mono text-gray-400">Review added instantly below.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <h3 className="font-serif font-bold text-lg text-brand-green-800 border-b border-gray-100 pb-2">
                      New Review for Mahesh Prasad
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-mono font-semibold text-gray-600">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g. Shruthi Hegde"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full px-4.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 font-sans"
                        />
                      </div>

                      {/* Rating selection star */}
                      <div className="space-y-1">
                        <label className="text-xs font-mono font-semibold text-gray-600 block">Rating Experience</label>
                        <div className="flex space-x-2 items-center h-[42px]">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <button
                              type="button"
                              key={val}
                              onClick={() => setNewRating(val)}
                              className="text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star size={24} fill={val <= newRating ? 'currentColor' : 'none'} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review text */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-semibold text-gray-600">Review Text / Comments</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="What did you love? (e.g. Dosa crispiness, pricing, hospitality)"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="w-full px-4.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-green-600 text-white font-sans font-bold text-sm py-3.5 rounded-xl cursor-pointer hover:bg-brand-green-700 transition"
                    >
                      Post Verifiable Review
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="reviews-grid">
          {reviews.map((rev) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-green-150 shadow-xs relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Score & verification */}
                <div className="flex justify-between items-start">
                  <div className="flex text-amber-500 space-x-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                    {[...Array(5 - rev.rating)].map((_, i) => (
                      <Star key={i} size={15} className="text-gray-300" />
                    ))}
                  </div>

                  <div className="flex items-center space-x-1 text-[10px] sm:text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    <CheckCircle size={12} className="fill-emerald-600 text-white" />
                    <span>Verified Dinner Review</span>
                  </div>
                </div>

                {/* Body Quotation */}
                <p className="text-gray-600 font-sans text-xs sm:text-sm leading-relaxed italic relative pl-4 border-l-2 border-brand-gold-500">
                  "{rev.text}"
                </p>

              </div>

              {/* Author Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-6">
                <div>
                  <h4 className="font-serif font-bold text-brand-green-800 text-sm">{rev.author}</h4>
                  <p className="text-[10px] font-mono text-gray-400">{rev.role}</p>
                </div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{rev.date}</span>
              </div>

              {/* Float quote icon in card back */}
              <Quote size={40} className="text-brand-gold-500/10 absolute bottom-4 right-4 -z-5" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
