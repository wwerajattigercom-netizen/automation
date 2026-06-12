import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Table, Calendar, Users, Clock, Flame, Ticket, HeartHandshake, HelpCircle } from 'lucide-react';

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: '12:00 PM - 1:30 PM (Lunch)',
    guests: '2',
    jainDiet: false,
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState<{
    id: string;
    name: string;
    phone: string;
    date: string;
    timeSlot: string;
    guests: string;
    jainDiet: boolean;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill in your name, contact number, and booking date.');
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay to make the app feel alive and full-fidelity
    setTimeout(() => {
      const generatedId = `MP-${Math.floor(1000 + Math.random() * 9000)}-RES`;
      setTicketData({
        id: generatedId,
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        timeSlot: formData.timeSlot,
        guests: formData.guests,
        jainDiet: formData.jainDiet,
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      date: '',
      timeSlot: '12:00 PM - 1:30 PM (Lunch)',
      guests: '2',
      jainDiet: false,
      specialRequests: '',
    });
    setTicketData(null);
  };

  // Restrict calendar selection to today onwards
  const todayString = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="py-20 bg-linear-to-b from-white to-brand-gold-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-green-100 text-brand-green-800 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-brand-green-600/20">
            <Table size={14} />
            <span>Table Booking enquiry</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Reserve Your Traditional Table
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-sans">
            We happily accommodate families, large groups, and individuals. Submit an enquiry to lock in your heritage spot without waiting in lines!
          </p>
        </div>

        {/* Form Container Layout */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            
            {!ticketData ? (
              /* ACTIVE FORM SCREEN */
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-green-100 shadow-xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Grid Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Guest Name */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-semibold font-mono text-gray-700">Name of Principal Guest</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g. Ramesh Hegde"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 focus:border-brand-green-600"
                      />
                    </div>

                    {/* Contact Phone */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-semibold font-mono text-gray-700">Mobile Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="E.g. +91 98450 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 focus:border-brand-green-600"
                      />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-semibold font-mono text-gray-700 flex items-center space-x-1">
                        <Calendar size={14} className="text-brand-green-600" />
                        <span>Dining Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        min={todayString}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 focus:border-brand-green-600"
                      />
                    </div>

                    {/* Time slots */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-semibold font-mono text-gray-700 flex items-center space-x-1">
                        <Clock size={14} className="text-brand-green-600" />
                        <span>Dining Interval/Period</span>
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 focus:border-brand-green-600 font-sans"
                      >
                        <option>7:30 AM - 9:00 AM (Early Breakfast)</option>
                        <option>9:00 AM - 10:30 AM (Late Breakfast)</option>
                        <option>12:00 PM - 1:30 PM (Mid Lunch)</option>
                        <option>1:30 PM - 3:00 PM (Late Lunch)</option>
                        <option>7:00 PM - 8:30 PM (Dinner Hour)</option>
                        <option>8:30 PM - 10:00 PM (Late Dinner)</option>
                      </select>
                    </div>

                    {/* Party headcount */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-semibold font-mono text-gray-700 flex items-center space-x-1">
                        <Users size={14} className="text-brand-green-600" />
                        <span>Number of Guests</span>
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 focus:border-brand-green-600 font-sans"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Guests (Standard)</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests (Family)</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6 Guests (Large Table)</option>
                        <option value="8">8 Guests (Celebration)</option>
                        <option value="10">10+ Guests (Group Catering)</option>
                      </select>
                    </div>

                    {/* Jain Diet options toggle */}
                    <div className="flex items-center space-x-3 bg-brand-green-50/50 p-4 rounded-xl border border-brand-green-100/80">
                      <input
                        type="checkbox"
                        id="jainDiet"
                        checked={formData.jainDiet}
                        onChange={(e) => setFormData({ ...formData, jainDiet: e.target.checked })}
                        className="w-5 h-5 accent-brand-green-600 cursor-pointer rounded-sm border border-gray-300"
                      />
                      <label htmlFor="jainDiet" className="cursor-pointer font-sans text-xs sm:text-sm select-none">
                        <span className="font-semibold text-brand-green-800 block">Jain Diet Required</span>
                        <span className="text-[10px] sm:text-xs text-gray-500 block">Preparation without root onion, garlic, or ginger.</span>
                      </label>
                    </div>

                  </div>

                  {/* Special notes */}
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold font-mono text-gray-700">Any Special Requests or Occasion instructions</label>
                    <textarea
                      rows={2}
                      placeholder="E.g. Wheelchair access needed, Celebrating parent anniversary, etc."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-green-600/30 focus:border-brand-green-600 font-sans"
                    />
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-green-600 hover:bg-brand-green-700 text-white font-sans font-bold text-center py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-brand-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Validating Heritage Table...</span>
                      </>
                    ) : (
                      <span>Request Booking Reference</span>
                    )}
                  </button>

                  <div className="flex items-start space-x-2 text-[10px] sm:text-xs text-gray-500 font-sans py-1 bg-gray-50 px-3 rounded-lg">
                    <HelpCircle size={14} className="text-brand-green-600 shrink-0 mt-0.5" />
                    <span>No deposit fee required here. Submitting details serves as an automated reservation query immediately logged into our front desk at Mysuru.</span>
                  </div>

                </form>
              </motion.div>
            ) : (
              /* CONFIRMATION PASS / TICKET SCREEN */
              <motion.div
                key="booking-receipt"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-brand-green-800 text-white rounded-3xl border-2 border-brand-gold-500 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Visual side holes to mimic classic ticket coupon */}
                <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-linear-to-b from-white to-brand-gold-100/30 -translate-y-1/2" />
                <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-linear-to-b from-white to-brand-gold-100/30 -translate-y-1/2" />

                <div className="text-center space-y-6 border-b border-white/10 pb-6">
                  <div className="w-14 h-14 bg-brand-gold-500 text-brand-green-800 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-md">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold-500">Booking Reference Lock!</h3>
                    <p className="text-xs font-mono text-gray-300">Show this digital coupon to the front host upon arrival.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-dashed border-white/20">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-gold-500 uppercase tracking-widest block">Reference Ticket</span>
                    <span className="font-mono text-lg font-bold flex items-center gap-1.5 text-white">
                      <Ticket size={16} className="text-brand-gold-500" />
                      {ticketData.id}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-gold-500 uppercase tracking-widest block">Principal Guest</span>
                    <span className="font-sans font-medium text-white">{ticketData.name}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-gold-500 uppercase tracking-widest block">Date of Dining</span>
                    <span className="font-sans font-medium text-white">{ticketData.date}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-gold-500 uppercase tracking-widest block">Booked Time Slot</span>
                    <span className="font-sans font-medium text-white">{ticketData.timeSlot}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-gold-500 uppercase tracking-widest block">Total Headcount</span>
                    <span className="font-sans font-medium text-white">{ticketData.guests} Diners</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-gold-500 uppercase tracking-widest block">Special Preferences</span>
                    <span className="font-sans text-xs font-semibold text-brand-gold-500">
                      {ticketData.jainDiet ? '☘️ Pure Jain Diet Prep Requested' : 'Standard Mysore Veg Prep'}
                    </span>
                  </div>
                </div>

                {/* Helpful guidelines list */}
                <div className="py-6 space-y-4">
                  <div className="flex space-x-3 items-start text-xs text-gray-300">
                    <HeartHandshake className="text-brand-gold-500 shrink-0 mt-0.5" size={16} />
                    <div>
                      <strong className="text-white block font-sans font-bold">15-Minute Hold Guarantee</strong>
                      Due to high traffic demand near Ballal Circle, requested tables are reserved for 15 minutes past the slot. Notify via call if late!
                    </div>
                  </div>
                </div>

                {/* Reset button to make another booking */}
                <button
                  onClick={resetForm}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-sans text-xs font-semibold text-center py-3.5 rounded-xl transition-all cursor-pointer border border-white/10"
                >
                  Clear and Request New Seat
                </button>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
