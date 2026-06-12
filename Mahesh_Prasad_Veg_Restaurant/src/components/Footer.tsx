import { useState } from 'react';
import { Phone, MapPin, Clock, ExternalLink, Copy, Check } from 'lucide-react';

interface FooterProps {
  address: string;
  phone: string;
  mapsUrl: string;
}

export default function Footer({ address, phone, mapsUrl }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="bg-brand-green-800 text-white pt-16 pb-12 overflow-hidden border-t border-brand-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core directory grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-brand-green-800 w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold border border-brand-gold-500">
                MP
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Mahesh Prasad
                </span>
                <span className="text-xs text-brand-gold-500 tracking-wider font-mono font-medium block">
                  100% PURE VEGETARIAN RESTAURANT
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Serving Mysuru's residents and heritage travelers with pristine vegetarian culinary craftsmanship since decades. We prepare every dish with organic ingredients, fresh grind spices, and standard local ghee.
            </p>
          </div>

          {/* Operational Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif font-bold text-lg text-brand-gold-500 tracking-wide flex items-center space-x-2">
              <Clock size={16} />
              <span>Operational Hours</span>
            </h3>
            <div className="font-sans text-sm text-gray-300 space-y-2.5">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Everyday Breakfast</span>
                <span className="font-mono text-xs">6:30 AM — 11:30 AM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Traditional Lunch</span>
                <span className="font-mono text-xs">12:00 PM — 3:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Sweets & Snacks</span>
                <span className="font-mono text-xs">3:30 PM — 6:30 PM</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Traditional Dinner</span>
                <span className="font-mono text-xs">7:00 PM — 10:30 PM</span>
              </div>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-brand-gold-500 tracking-wide flex items-center space-x-2">
              <MapPin size={16} />
              <span>Find Us in Mysuru</span>
            </h3>
            
            <div className="bg-brand-green-900/55 p-4 rounded-xl border border-white/5 space-y-4">
              <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">
                {address}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {/* Copy Address */}
                <button
                  onClick={copyAddressToClipboard}
                  className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/15 text-white active:bg-white/20 text-xs px-3 py-2 rounded-lg font-mono tracking-wide cursor-pointer select-none transition"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy Address'}</span>
                </button>

                {/* Open in Maps */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-green-800 text-xs px-3.5 py-2 rounded-lg font-bold transition font-sans"
                >
                  <span>Directions in Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-brand-gold-500">
              <Phone size={14} />
              <span className="font-semibold text-white"> फ्रंट डेस्क: </span>
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-mono hover:underline font-bold text-sm">
                {phone}
              </a>
            </div>

          </div>

        </div>

        {/* Footer Base copyright info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-400">
          <div>
            <p>© {new Date().getFullYear()} Mahesh Prasad Veg Restaurant. All Rights Reserved.</p>
            <p className="text-[10px] text-gray-500 mt-1">Preserving traditional Karnataka culinary heritage. Zero artificial colors or additives.</p>
          </div>
          
          <div className="flex items-center space-x-1 text-[10px]">
            <span>Ranked #1 pure-veg spot mock</span>
            <span>•</span>
            <span className="text-brand-gold-500">Mysore, KA, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
