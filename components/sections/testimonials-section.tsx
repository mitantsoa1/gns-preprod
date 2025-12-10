'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';

export function TestimonialsSection() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const expertises = [
    {
      title: t('testimonials.expertise1.title'),
      description: t('testimonials.expertise1.description'),
    },
    {
      title: t('testimonials.expertise2.title'),
      description: t('testimonials.expertise2.description'),
    },
    {
      title: t('testimonials.expertise3.title'),
      description: t('testimonials.expertise3.description'),
    },
    {
      title: t('testimonials.expertise4.title'),
      description: t('testimonials.expertise4.description'),
    },
    {
      title: t('testimonials.expertise5.title'),
      description: t('testimonials.expertise5.description'),
    },
    {
      title: t('testimonials.expertise6.title'),
      description: t('testimonials.expertise6.description'),
    },
  ];

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
      className="py-16 md:py-24 bg-[#F5F5F5] overflow-hidden overflow-x-hidden"
    >
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 md:mb-14 gap-4">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            {t('testimonials.title')}
          </h2>
          <div
            className={`flex items-center gap-2 cursor-pointer group transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="text-sm md:text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors whitespace-nowrap">
              {t('testimonials.learnMore')}
            </span>
            <Image
              src="/testimonials/flèche-queue-droite.svg"
              alt="Arrow"
              width={35}
              height={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>

        {/* Grid of expertise cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {expertises.map((expertise, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-[0_6px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] overflow-hidden group cursor-pointer transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Card content - using flex row to position arrow on right */}
              <div className="p-5 flex items-center gap-4">
                {/* Left content container */}
                <div className="flex-1 flex items-start gap-4">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src="/testimonials/home.png"
                      alt={expertise.title}
                      width={84}
                      height={84}
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                      {expertise.title}
                    </h3>

                    {/* Description with star icon */}
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        <Image
                          src="/header/etoile.svg"
                          alt="Star"
                          width={18}
                          height={18}
                        />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {expertise.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow icon - vertically centered on right */}
                <div className="flex-shrink-0">
                  <Image
                    src="/testimonials/flèche-droite.svg"
                    alt="Arrow"
                    width={18}
                    height={36}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
