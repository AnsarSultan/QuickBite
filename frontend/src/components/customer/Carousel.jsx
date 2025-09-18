import React from 'react'
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from '../../assets/slide1.jpg'
import image2 from '../../assets/slide2.jpg'
import image3 from '../../assets/slide3.png'

function Carousel() {
    const slides = [
        image1, image2 , image3
    ]
    const [currentIndex , setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
          nextSlide();
        }, 3000);
        return () => clearInterval(timer);
      }, [currentIndex]);
    
      const prevSlide = () => {
        setCurrentIndex((prev) =>
          prev === 0 ? slides.length - 1 : prev - 1
        );
      };
    
      const nextSlide = () => {
        setCurrentIndex((prev) =>
          prev === slides.length - 1 ? 0 : prev + 1
        );
      };
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-lg">
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {slides.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slide-${index}`}
          className="w-full flex-shrink-0 object-cover"
        />
      ))}
    </div>

    <button
      onClick={prevSlide}
      className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
    >
      <ChevronLeft size={24} />
    </button>

    <button
      onClick={nextSlide}
      className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
    >
      <ChevronRight size={24} />
    </button>

    <div className="absolute bottom-4 w-full flex justify-center gap-2">
      {slides.map((_, index) => (
        <div
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full cursor-pointer ${
            currentIndex === index ? "bg-white" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  </div>
  )
}

export default Carousel