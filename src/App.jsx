import { MotionConfig } from 'motion/react';
import BookingProvider from './context/BookingProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Space from './components/Space';
import Visit from './components/Visit';
import Footer from './components/Footer';

export default function App() {
  return (
    // "user": with reduced motion on, transforms are dropped and only opacity animates.
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <div id="page">
          <a
            href="#servicios"
            className="sr-only z-[90] rounded-full bg-white px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <main>
            <Hero />
            <Showcase />
            <Manifesto />
            <Services />
            <Space />
            <Visit />
          </main>
          <Footer />
        </div>
      </BookingProvider>
    </MotionConfig>
  );
}
