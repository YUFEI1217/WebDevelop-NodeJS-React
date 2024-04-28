import React, { useState, useEffect } from 'react';
import './CarouselImage.css';

function CarouselImage({images, className, alt}) {
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() =>{
        const interval = setInterval( () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        },2500);
        return () => clearInterval(interval);
    });
    
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    
    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };


    return (
          <div className={`${className}`}>
            <button onClick={goToPrevSlide} className="carousel__button back__btn">
              Back
            </button>
            <img src={images[currentIndex]} alt={alt[currentIndex]} className="carousel__image"/>    
            <button onClick={goToNextSlide} className="carousel__button next__btn">
              Next
            </button>
          </div>
        );
}

export default CarouselImage;