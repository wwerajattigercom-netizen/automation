import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import QuizSection from './components/QuizSection';
import ReservationSection from './components/ReservationSection';
import ReviewSection from './components/ReviewSection';
import Footer from './components/Footer';

const RESTAURANT_DETAILS = {
  name: 'Mahesh Prasad Veg Restaurant',
  category: 'Vegetarian restaurant',
  rating: 4.1,
  reviews: 3914,
  phone: '0821 233 0820',
  address: 'Ballal Cir, near RTO Office, Chamarajapura, Chamarajapuram Mohalla, Lakshmipuram, Mysuru, Karnataka 570005',
  city: 'Mysuru',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query_place_id=ChIJ776TqABwrzsRJlFuzZSXo-I&query=Mahesh%20Prasad%20Veg%20Restaurant',
};

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased overflow-x-hidden selection:bg-brand-green-150 selection:text-brand-green-800">
      {/* 1. Header Navigation Grid */}
      <Header />

      {/* 2. Hero Presentation Banner & Badging */}
      <Hero />

      {/* 3. Interactive Menu Landmarks Section */}
      <MenuSection />

      {/* 4. Taste Selector / Flavour Navigator Quiz */}
      <QuizSection />

      {/* 5. Reservation / Table Enquiry Pass */}
      <ReservationSection />

      {/* 6. Diner Reviews Highlights Slider & Write Module */}
      <ReviewSection />

      {/* 7. Comprehensive Landmark Map & Contacts Footer */}
      <Footer
        address={RESTAURANT_DETAILS.address}
        phone={RESTAURANT_DETAILS.phone}
        mapsUrl={RESTAURANT_DETAILS.mapsUrl}
      />
    </div>
  );
}
