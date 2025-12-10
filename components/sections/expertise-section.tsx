'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';

export function ExpertiseSection() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
        threshold: 0.3,
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
      className="relative min-h-[450px] h-auto lg:h-[80vh] flex items-center justify-center py-6 px-3 sm:py-8 sm:px-4 md:px-8 bg-gradient-to-b from-gray-200 to-gray-100 overflow-x-hidden"
    >
      {/* Image de fond avec bords arrondis */}
      <div
        className={`absolute inset-3 sm:inset-4 md:inset-8 z-0 rounded-xl sm:rounded-3xl overflow-hidden transition-all duration-1200 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        style={{ transitionDelay: '200ms' }}
      >
        <Image
          src="/experience/immeuble.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay blanc pour éclaircir l'image */}
        <div className="absolute inset-0 bg-white/2" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 h-full flex flex-col">
        {/* Titre principal centré avec textes gauche et droite */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between pt-8 sm:pt-12 md:pt-16 lg:pt-20 gap-2 sm:gap-3 md:gap-0">
          <div
            className={`text-white text-xs sm:text-sm md:text-base font-bold tracking-wider transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            {t('expertise.leftText')}
          </div>
          <h2
            className={`text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center tracking-wider px-2 transition-all duration-1000 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
            style={{ transitionDelay: '600ms' }}
          >
            {t('expertise.centerTitle')}
          </h2>
          <div
            className={`text-white text-xs sm:text-sm md:text-base font-bold tracking-wider transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            {t('expertise.rightText')}
          </div>
        </div>

        {/* Bas de page avec navigation et description */}
        <div className="pb-6 sm:pb-8 md:pb-6 lg:pb-16 flex md:relative md:top-12 lg:relative lg:top-0 flex-col  md:flex-row items-start md:items-end justify-between gap-6 md:gap-4">
          {/* Navigation avec flèches */}
          <div
            className={`flex items-center gap-2 sm:gap-3 justify-between w-full md:w-auto md:gap-4 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            style={{ transitionDelay: '800ms' }}
          >
            <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 border-white rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors group">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-black" strokeWidth={2.5} />
            </button>
            <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 border-white rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors group">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-black" strokeWidth={2.5} />
            </button>
            <div className="hidden md:flex min-w-16 items-start justify-center ">
              <span className="text-white  text-xs   sm:text-sm ml-1 sm:ml-2 font-bold">03 / 05</span>
            </div>
          </div>


          {/* Description et bouton */}
          <div
            className={`max-w-full md:max-w-xl text-left mr-0 md:mr-2 lg:mr-16 xl:mr-24 lg:pt-4 transition-all duration-1000 ease-out  ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            style={{ transitionDelay: '800ms' }}
          >
            <p className="text-white text-sm sm:text-sm md:text-base mb-4 sm:mb-6 font-bold">
              {t('expertise.description')}
            </p>
            <button className="bg-white text-black px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-bold hover:bg-gray-100 transition-colors rounded-lg w-full sm:w-auto">
              {t('expertise.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
