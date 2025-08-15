import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const allCategories = ['All', ...categories];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap gap-3 justify-center mb-12"
    >
      {allCategories.map((category, index) => {
        const isSelected = selectedCategory === (category === 'All' ? null : category);
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={isSelected ? "default" : "outline"}
              onClick={() => onCategorySelect(category === 'All' ? null : category)}
              className={`
                relative overflow-hidden capitalize transition-all duration-300
                ${isSelected 
                  ? 'bg-gradient-primary shadow-luxury' 
                  : 'border-border hover:border-primary hover:shadow-glow'
                }
              `}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                {category}
              </motion.span>
              
              {/* Animated background */}
              {isSelected && (
                <motion.div
                  layoutId="category-background"
                  className="absolute inset-0 bg-gradient-primary"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CategoryFilter;