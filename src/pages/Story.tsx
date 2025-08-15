import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Story = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={() => {}} searchQuery="" />
      
      <main className="pt-24">
        {/* Hero Section */}
        <motion.section
          className="relative py-20 bg-gradient-to-b from-background to-background/80"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-8">
                <span className="block text-foreground">Our</span>
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Legacy
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Born from a vision to redefine luxury fashion, DabsCloth represents the perfect harmony of timeless elegance and contemporary sophistication.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Story Content */}
        <motion.section
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={itemVariants}>
                <h2 className="font-playfair text-4xl font-bold mb-6 text-foreground">
                  Crafted with Passion
                </h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Founded in 2020, DabsCloth emerged from a simple yet powerful belief: that luxury should be accessible without compromising on quality or ethical practices. Our journey began with a small team of passionate designers and craftspeople who shared a vision of creating clothing that tells a story.
                  </p>
                  <p>
                    Every piece in our collection is carefully curated from premium materials sourced responsibly from around the world. We work directly with skilled artisans who share our commitment to excellence, ensuring that each garment meets our exacting standards of quality and craftsmanship.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-gold/20 to-transparent p-8 rounded-lg">
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-gold">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize luxury fashion while maintaining the highest standards of quality, sustainability, and ethical production. We believe that everyone deserves to feel confident and elegant in what they wear.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="py-16 bg-dark/5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="font-playfair text-4xl font-bold mb-4 text-foreground">
                What We Stand For
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our values guide every decision we make, from design to delivery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality First",
                  description: "We never compromise on materials or craftsmanship. Every stitch, every seam, every detail is meticulously executed to ensure longevity and comfort."
                },
                {
                  title: "Sustainable Fashion",
                  description: "Environmental responsibility is at the core of our operations. We use eco-friendly materials and ethical manufacturing processes."
                },
                {
                  title: "Timeless Design",
                  description: "Our designs transcend seasonal trends, focusing on classic silhouettes and elegant details that remain stylish for years to come."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card p-8 rounded-lg border border-border hover:border-gold/50 transition-colors duration-300"
                >
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="font-playfair text-4xl font-bold mb-4 text-foreground">
                The Artisans Behind the Brand
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Meet the talented individuals who bring our vision to life, combining traditional craftsmanship with modern innovation.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-gold/10 to-transparent p-12 rounded-lg text-center"
              variants={itemVariants}
            >
              <blockquote className="text-2xl md:text-3xl font-playfair text-foreground mb-6 italic">
                "Fashion is not just about clothing; it's about expressing your authentic self with confidence and grace."
              </blockquote>
              <cite className="text-lg text-gold font-semibold">
                — Sarah Chen, Creative Director & Founder
              </cite>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Story;