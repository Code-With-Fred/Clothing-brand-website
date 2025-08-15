import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Shirt, Watch, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { productAPI } from '@/services/api';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: productAPI.getCategories,
  });

  const categoryIcons = {
    "men's clothing": Shirt,
    "women's clothing": Sparkles,
    "jewelery": Watch,
    "electronics": Watch,
  };

  const categoryDescriptions = {
    "men's clothing": "Sophisticated menswear for the modern gentleman. Premium suits, casual wear, and accessories.",
    "women's clothing": "Elegant women's fashion that embodies grace and style. From formal wear to everyday luxury.",
    "jewelery": "Exquisite jewelry pieces that add sparkle to any outfit. Timeless designs crafted with precision.",
    "electronics": "Premium accessories and tech that complement your luxury lifestyle.",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Shop by Category
              </span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our carefully curated collections of luxury fashion. Each category represents 
              the pinnacle of craftsmanship and timeless elegance.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="p-8 bg-card border-border">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-muted animate-pulse rounded-lg" />
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
                    <div className="h-10 bg-muted animate-pulse rounded w-32" />
                  </div>
                </Card>
              ))
            ) : (
              categories.map((category, index) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Shirt;
                const description = categoryDescriptions[category as keyof typeof categoryDescriptions] || 
                  "Discover premium quality items in this category.";

                return (
                  <motion.div key={category} variants={itemVariants}>
                    <Card className="group p-8 bg-card border-border hover:shadow-luxury transition-all duration-300 cursor-pointer h-full">
                      <Link to={`/products?category=${encodeURIComponent(category)}`}>
                        <div className="space-y-6">
                          {/* Icon */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center"
                          >
                            <IconComponent className="h-8 w-8 text-primary-foreground" />
                          </motion.div>

                          {/* Content */}
                          <div className="space-y-4">
                            <h3 className="font-heading text-2xl font-bold capitalize group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                              {category}
                            </h3>
                            
                            <p className="text-muted-foreground leading-relaxed">
                              {description}
                            </p>

                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-2 text-primary font-semibold"
                            >
                              <span>Shop Now</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </motion.div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </motion.div>

          {/* Featured Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 text-center"
          >
            <Card className="p-12 bg-gradient-to-r from-secondary/20 to-primary/10 border-primary/20">
              <div className="max-w-2xl mx-auto space-y-6">
                <Sparkles className="h-12 w-12 text-primary mx-auto" />
                <h2 className="font-heading text-3xl font-bold">
                  Can't decide? Explore everything
                </h2>
                <p className="text-muted-foreground text-lg">
                  Browse our complete collection of luxury fashion items. 
                  Each piece is carefully selected for quality and style.
                </p>
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-luxury transition-all duration-300">
                    <motion.span whileHover={{ scale: 1.05 }}>
                      View All Products
                    </motion.span>
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;