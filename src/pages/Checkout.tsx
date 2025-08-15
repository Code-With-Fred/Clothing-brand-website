import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const Checkout = () => {
  const { items, total, itemCount, clearCart } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderPlaced(true);
    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: "Your luxury items will be delivered within 2-3 business days.",
      duration: 5000,
    });
  };

  if (items.length === 0 && !orderPlaced) {
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
              <h1 className="font-heading text-4xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Add some items to your cart before proceeding to checkout.
              </p>
              <Link to="/products">
                <Button size="lg" className="bg-gradient-primary hover:shadow-luxury">
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Check className="h-12 w-12 text-primary-foreground" />
              </motion.div>
              
              <h1 className="font-heading text-4xl font-bold mb-4">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Order Confirmed!
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for your purchase. Your luxury items are being prepared for delivery.
              </p>
              
              <div className="bg-secondary/50 rounded-lg p-6 mb-8">
                <h3 className="font-heading text-lg font-semibold mb-4">What's Next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>You'll receive an email confirmation shortly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Your order will be processed within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Delivery within 2-3 business days</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-luxury">
                    Continue Shopping
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg">
                    Back to Home
                  </Button>
                </Link>
              </div>
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
            <Link to="/cart" className="inline-block mb-6">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Button>
            </Link>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Checkout
              </span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <Card className="p-8">
                <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Delivery Information */}
              <Card className="p-8">
                <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                  <Truck className="h-6 w-6 text-primary" />
                  Delivery Address
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Luxury Avenue"
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Special delivery instructions..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-8">
                <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  Payment Method
                </h2>
                
                <div className="bg-secondary/50 rounded-lg p-6 border-2 border-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">Pay on Delivery</h3>
                      <p className="text-muted-foreground">Secure cash payment when your order arrives</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>No upfront payment required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Inspect items before payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>100% secure and trusted</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <Card className="p-8 bg-secondary/50">
                <h2 className="font-heading text-2xl font-bold mb-6">Order Summary</h2>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-card flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-muted-foreground text-sm">Qty: {item.quantity}</span>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-3 mb-8 pt-6 border-t border-border">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-primary font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-gradient-primary hover:shadow-luxury transition-all duration-300 text-lg py-6"
                >
                  <motion.span
                    whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                    className="flex items-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        Place Order - ${total.toFixed(2)}
                      </>
                    )}
                  </motion.span>
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  By placing this order, you agree to our terms and conditions.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;