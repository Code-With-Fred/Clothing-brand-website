import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cart = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-8" />
              <h1 className="font-heading text-4xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
                Discover our luxury collection and add some beautiful pieces to your cart.
              </p>
              <Link to="/products">
                <Button size="lg" className="bg-gradient-primary hover:shadow-luxury">
                  <motion.span whileHover={{ scale: 1.05 }}>
                    Explore Collection
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link to="/products" className="inline-block mb-6">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Shopping Cart
                  </span>
                </h1>
                <p className="text-muted-foreground">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                Clear Cart
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <Card className="p-6 bg-card border-border hover:shadow-card transition-all">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                              {item.category}
                            </span>
                            <h3 className="font-heading text-xl font-semibold mt-2 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">Qty:</span>
                              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 rounded-none"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-2 font-semibold min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 rounded-none"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Price & Remove */}
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="font-heading text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  ${item.price.toFixed(2)} each
                                </div>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="p-8 bg-secondary/50 border-border sticky top-24">
                <h2 className="font-heading text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-primary font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="bg-gradient-primary bg-clip-text text-transparent">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link to="/checkout" className="block">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-primary hover:shadow-luxury transition-all duration-300 text-lg py-6"
                    >
                      <motion.span whileHover={{ scale: 1.05 }}>
                        Proceed to Checkout
                      </motion.span>
                    </Button>
                  </Link>
                  
                  <Link to="/products" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-8 p-4 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm text-muted-foreground">
                      Secure checkout guaranteed
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;