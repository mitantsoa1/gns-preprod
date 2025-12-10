'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';

export function ValuesSection() {
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
      className="py-12 bg-gradient-to-br from-gray-100 to-gray-200 overflow-x-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-2">
          <h2
            className={`text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            {t('values.title')}
          </h2>
          <p
            className={`text-base md:text-lg leading-relaxed text-gray-900 max-w-4xl mx-auto mb-8 px-4 sm:px-8 md:px-16 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            {t('values.description')}
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-0 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Link
              href="#contact"
              className="bg-black text-white px-8 py-3 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide"
            >
              {t('values.buttons.appointment')}
            </Link>
            <Link
              href="#about"
              className="bg-transparent border-2 border-black text-black px-8 py-3 rounded-sm text-sm font-medium hover:bg-black hover:text-white transition-colors uppercase tracking-wide"
            >
              {t('values.buttons.about')}
            </Link>
          </div>
        </div>
        <div
          className={`relative w-full h-[300px] sm:h-[400px] md:h-[600px] -mt-4 sm:-mt-8 transition-all duration-1200 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          style={{ transitionDelay: '800ms' }}
        >
          <Image
            src="/valeur/carto.png"
            alt="Plans architecturaux"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
