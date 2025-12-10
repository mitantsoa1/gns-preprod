'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition font-semibold"
        aria-label="Change language"
      >
        <Image
          src={locale === 'fr' ? '/header/french.svg' : '/header/anglais.svg'}
          alt={locale === 'fr' ? 'Français' : 'English'}
          width={24}
          height={24}
        />
        <span>{locale === 'fr' ? 'FR' : 'EN'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[120px] z-50">
          <button
            onClick={() => changeLanguage('fr')}
            className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition ${
              locale === 'fr' ? 'bg-gray-50' : ''
            }`}
          >
            <Image src="/header/french.svg" alt="Français" width={20} height={20} />
            <span className="font-bold">FR</span>
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition ${
              locale === 'en' ? 'bg-gray-50' : ''
            }`}
          >
            <Image src="/header/anglais.svg" alt="English" width={20} height={20} />
            <span className="font-bold">EN</span>
          </button>
        </div>
      )}
    </div>
  );
}
