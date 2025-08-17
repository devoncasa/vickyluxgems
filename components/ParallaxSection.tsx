
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SECTION_BACKGROUND_IMAGES } from '../constants';

interface ParallaxSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, id, className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
      const randomIndex = Math.floor(Math.random() * SECTION_BACKGROUND_IMAGES.length);
      setBgImage(SECTION_BACKGROUND_IMAGES[randomIndex]);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-20 md:py-32 overflow-hidden ${className || ''}`}
    >
      <div
        className="parallax-bg absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
      </div>
      <div className="absolute inset-0 z-0 filter backdrop-blur-[8px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ParallaxSection;
