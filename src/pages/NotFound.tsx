import React, { useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <h1 className="font-heading text-8xl md:text-9xl font-bold mb-4">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  404
                </span>
              </h1>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
                Page Not Found
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                The luxury you're looking for seems to have wandered off. 
                Let's get you back to our beautiful collection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/">
                <Button size="lg" className="bg-gradient-primary hover:shadow-luxury transition-all duration-300">
                  <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Return Home
                  </motion.span>
                </Button>
              </Link>
              
              <Link to="/products">
                <Button variant="outline" size="lg" className="transition-all duration-300">
                  <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Browse Products
                  </motion.span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 text-sm text-muted-foreground"
            >
              <p>Attempted to access: <code className="bg-secondary px-2 py-1 rounded">{location.pathname}</code></p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
