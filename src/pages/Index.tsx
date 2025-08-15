import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      <Hero />
      <Footer />
    </div>
  );
};

export default Index;
