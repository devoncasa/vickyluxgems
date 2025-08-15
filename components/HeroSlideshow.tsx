
import React, { useState, useEffect } from 'react';

interface HeroSlideshowProps {
    images: string[];
}

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Preload images for smoother transitions
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, [images]);

    return (
        <div className="absolute inset-0 z-0 hero-slideshow" aria-live="polite" aria-atomic="true">
            {images.map((src, index) => (
                <div
                    key={src}
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `url('${src}')`,
                        opacity: index === currentImageIndex ? 1 : 0,
                        filter: 'blur(4px)',
                        transform: 'scale(1.05)',
                    }}
                    aria-hidden={index !== currentImageIndex}
                    role="img"
                    aria-label={`Slideshow background image ${index + 1}`}
                />
            ))}
            <div className="absolute inset-0 bg-white/30"></div>
        </div>
    );
};

export default HeroSlideshow;
