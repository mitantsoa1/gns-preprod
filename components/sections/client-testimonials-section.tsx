'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function ClientTestimonialsSection() {
  const t = useTranslations('clientTestimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      id: 1,
      image: '/temoingnage/femme.png',
      quote: t('testimonial1.quote'),
      author: t('testimonial1.author'),
      role: t('testimonial1.role'),
    },
    {
      id: 2,
      image: '/temoingnage/homme.png',
      quote: t('testimonial2.quote'),
      author: t('testimonial2.author'),
      role: t('testimonial2.role'),
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Intersection Observer pour détecter la visibilité
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
            setTimeout(() => {
              setIsVisible(true);
            }, 100);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#F5F5F5] overflow-x-hidden"
    >
      <div className="">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          style={{ transitionDelay: '200ms' }}
        >
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2  mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white shadow-lg overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 '
                }`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              {/* Version mobile (< 640px) - VERTICALE */}
              <div className="flex flex-col sm:hidden min-h-[500px]">
                {/* Header: Image */}
                <div className="w-full h-48 relative flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content: Témoignage */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Guillemet */}
                  <div className="flex justify-end mb-4">
                    <Image
                      src="/temoingnage/quote.svg"
                      alt="Quote"
                      width={40}
                      height={40}
                      className="w-8 h-8"
                    />
                  </div>

                  {/* Texte du témoignage */}
                  <p className="text-base leading-relaxed flex-1 mb-6">
                    {testimonial.quote}
                  </p>

                  {/* Footer: Nom et profession */}
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <p className="font-bold text-lg italic">
                      {testimonial.author},
                    </p>
                    <p className="text-gray-700 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Version desktop (≥ 640px) - HORIZONTALE */}
              <div className="hidden sm:flex relative h-[320px] w-full">
                {/* Image à gauche */}
                <div className="w-1/2 max-w-[315px] md:max-w-[380px] flex-shrink-0 relative">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Contenu à droite */}
                <div className="w-1/2 py-2 px-2 flex flex-col relative min-w-0">
                  {/* Guillemet en haut */}
                  <div className="flex justify-end  -mt-2">
                    <Image
                      src="/temoingnage/quote.svg"
                      alt="Quote"
                      width={50}
                      height={50}
                      className="w-12 h-12 md:w-[20px] md:h-[20px]"
                    />
                  </div>

                  {/* Texte du témoignage */}
                  <p className="text-sm leading-relaxed flex-1 mb-1">
                    {testimonial.quote}
                  </p>

                  {/* Nom et rôle en bas */}
                  <div className="mt-auto">
                    <p className="font-bold text-sm italic">
                      {testimonial.author},
                    </p>
                    <p className="text-gray-700 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flèches de navigation */}
        <div
          className={`flex justify-center gap-4 mt-8 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button
            onClick={handlePrevious}
            className="bg-black text-white p-4 rounded-md hover:bg-gray-800 transition-colors"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="bg-black text-white p-4 rounded-md hover:bg-gray-800 transition-colors"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
