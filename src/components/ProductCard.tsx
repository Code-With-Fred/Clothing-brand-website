import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <Card className="overflow-hidden bg-card border-border hover:shadow-luxury transition-all duration-500 h-full">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              whileHover={{ scale: 1.1 }}
            />
            
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
            >
              <Button
                size="icon"
                variant="outline"
                className="bg-background/90 border-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                onClick={handleAddToCart}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="h-4 w-4" />
                </motion.div>
              </Button>
              
              <Button
                size="icon"
                variant="outline"
                className="bg-background/90 border-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>

            <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="font-heading text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
              >
                ${product.price.toFixed(2)}
              </motion.span>

              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </motion.span>
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;