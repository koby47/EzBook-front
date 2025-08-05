import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const placeholderSuggestions = [
  "Search facilities near you",
  "Try 'Sports Hall'",
  "Try 'Conference Room'",
  "Try 'Auditorium'",
];

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder text
  useState(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderSuggestions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-[75vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/herosection.jpg')" }}
    >
      {/* Overlay for background dim */}
      <div className="absolute inset-0  bg-gray-800/70 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-white">
        <div className="text-center px-4 max-w-3xl">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Our Booking Platform
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Find and reserve the best facilities near you
          </motion.p>

          {/* Search Input */}
          <motion.div
            className="relative w-full md:w-[500px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholderSuggestions[placeholderIndex]}
              className="w-full px-5 py-3 pr-12 rounded-full bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
