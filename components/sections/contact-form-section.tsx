'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';

export function ContactFormSection() {
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
      className="pb-32 pt-10 bg-gradient-to-br bg-[#F5F5F5] to-gray-100 overflow-x-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative bg-white rounded-3xl border-2 border-black shadow-xl overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`}
          >
            <div className="grid lg:grid-cols-2 gap-0 lg:h-[350px]">
              {/* Left side - Newsletter form */}
              <div className="p-8 lg:p-10 flex flex-col justify-center relative z-10">
                <div className="space-y-4">
                  <h2
                    className={`text-3xl lg:text-4xl font-bold text-gray-900 leading-tight uppercase transition-all duration-700 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                      }`}
                    style={{ transitionDelay: '200ms' }}
                  >
                    {t('newsletter.title')}
                  </h2>
                  <p
                    className={`text-gray-600 text-sm leading-relaxed transition-all duration-700 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                      }`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    {t('newsletter.description')}
                  </p>

                  <form
                    className={`pt-1 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    <div className="relative bg-gray-200 rounded-xl p-1.5 flex flex-col sm:flex-row items-center gap-2">
                      <Input
                        type="email"
                        placeholder={t('newsletter.placeholder')}
                        className="flex-1 w-full h-12 px-5 bg-transparent border-0 text-gray-700 placeholder:text-gray-500 text-sm focus-visible:ring-0 focus-visible:outline-none"
                      />
                      <Button
                        type="submit"
                        className="h-12 px-8 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-semibold uppercase tracking-wide whitespace-nowrap w-full sm:w-auto flex-shrink-0"
                      >
                        {t('newsletter.submit')}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="relative h-[250px] md:h-[380px] lg:h-full overflow-hidden">
                <div
                  className={`absolute top-[35%] -translate-y-1/2 right-0 transition-all duration-700 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                    }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div className="relative max-w-full">
                    <Image
                      src="/contact/villa.png"
                      alt="Villa architecture"
                      width={800}
                      height={600}
                      className="object-contain max-w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
