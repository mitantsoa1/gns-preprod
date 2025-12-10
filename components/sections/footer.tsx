'use client';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  return (
    <footer className="bg-[#F5F5F5] text-black py-16 border-t border-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_0.4fr_1fr] gap-6 md:gap-12 lg:gap-24 xl:gap-48 mb-12">
          {/* Left Column - Logo and Description */}
          <div
            className={`text-center md:text-left flex flex-col items-center md:items-start transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="mb-6">
              <Image
                src="/footer/logo.svg"
                alt="GNS BTP Logo"
                width={240}
                height={120}
                className="-mb-10 md:-ml-10 -mt-16"
              />
              <p className="text-sm leading-relaxed mb-6">
                {t('footer.description')}
              </p>
            </div>

            {/* Social Media Icons */}
            <div
              className={`flex gap-3 justify-center md:justify-start transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/footer/facebook.svg" alt="Facebook" width={23} height={23} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/footer/insta.svg" alt="Instagram" width={24} height={24} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/footer/linkedin.svg" alt="LinkedIn" width={25} height={25} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/footer/x.svg" alt="X (Twitter)" width={22} height={22} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Image src="/footer/whatsapp.svg" alt="WhatsApp" width={26} height={26} />
              </a>
            </div>
          </div>

          {/* Middle Column - Pages */}
          <div
            className={`text-center md:text-left transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="font-bold text-xl mb-6">{t('footer.pages.title')}</h3>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <li><a href="#" className="hover:underline transition-all">{t('footer.pages.services')}</a></li>
              <li><a href="#" className="hover:underline transition-all">{t('footer.pages.projects')}</a></li>
              <li><a href="#" className="hover:underline transition-all">{t('footer.pages.news')}</a></li>
              <li><a href="#" className="hover:underline transition-all">{t('footer.pages.pricing')}</a></li>
              <li><a href="#" className="hover:underline transition-all">{t('footer.pages.about')}</a></li>
              <li><a href="#" className="hover:underline transition-all">{t('footer.pages.contact')}</a></li>
            </ul>
          </div>

          {/* Right Column - Pages utilitaires */}
          <div
            className={`text-center md:text-left transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="font-bold text-xl mb-6">{t('footer.utilityPages.title')}</h3>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <li className="flex items-center gap-2">
                <Image src="/header/etoile.svg" alt="" width={21} height={21} />
                <a href="#" className="hover:underline transition-all underline">{t('footer.utilityPages.downloadPdf')}</a>
              </li>
              <li className="flex items-center gap-2">
                <Image src="/header/etoile.svg" alt="" width={21} height={21} />
                <a href="#" className="hover:underline transition-all underline">{t('footer.utilityPages.faq')}</a>
              </li>
              <li className="flex items-center gap-2">
                <Image src="/header/etoile.svg" alt="" width={21} height={21} />
                <a href="#" className="hover:underline transition-all underline">{t('footer.utilityPages.privacy')}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`text-center pt-8 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-sm flex items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 border border-black rounded-full text-xs">©</span>
            <span className="font-semibold">2025</span>
            <span>{t('footer.copyright.by')}</span>
            <a href="#" className="font-bold underline hover:opacity-70 transition-opacity">{t('footer.copyright.company')}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
