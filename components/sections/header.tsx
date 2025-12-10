'use client';

import Image from 'next/image';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User2, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      // The redirection is now handled inside the signOut method in AuthContext
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
    >
      {/* Top Yellow Banner */}
      <div className="bg-[#FFD700] py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">

            <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
              <div className="flex items-center gap-1 sm:gap-2">
                <Image src="/header/etoile.svg" alt="" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold hidden md:inline">{t('stats.projects')}</span>
                <span className="font-semibold md:hidden">150+</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Image src="/header/etoile.svg" alt="" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold hidden md:inline">{t('stats.experience')}</span>
                <span className="font-semibold md:hidden">25+ ans</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 sm:gap-2">
                <Image src="/header/etoile.svg" alt="" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold hidden md:inline">{t('stats.mastery')}</span>
                <span className="font-semibold md:hidden">Maîtrise</span>
              </div>
            </div>


            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <div className="flex items-center gap-1 sm:gap-2">
                <Image src="/header/position.svg" alt="" width={16} height={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">{t('location')}</span>
              </div>
              <LanguageSwitcher />
              {/* Auth buttons - Conditional rendering based on user state */}
              <div className='flex items-center gap-2 sm:gap-4 lg:gap-6'>
                {user ? (
                  <>
                    {/* Dropdown for screens < sm - Authenticated */}
                    <div className="sm:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-1 border-black border px-2 py-1 rounded-sm text-sm font-bold text-black hover:text-yellow-400 hover:bg-black/90 transition">
                            <User2 className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#FFD700]/90 border-black">
                          <DropdownMenuItem asChild>
                            <Link href={`/${locale}/dashboard`} className="cursor-pointer font-bold text-black hover:text-yellow-400">
                              {t('nav.dashboard')}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <button
                              onClick={handleLogout}
                              disabled={isLoggingOut}
                              className="w-full text-left cursor-pointer font-bold text-black hover:text-yellow-400 disabled:opacity-50"
                            >
                              {isLoggingOut ? '...' : t('nav.logout')}
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Regular buttons for sm+ screens - Authenticated */}
                    <div className="hidden sm:flex items-center gap-2 lg:gap-4">
                      <Link href={`/${locale}/dashboard`} className="border-black border px-2 py-1 rounded-sm text-sm font-bold text-black hover:text-yellow-400 hover:bg-black/90 transition">
                        {t('nav.dashboard')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="text-sm font-bold bg-black px-2 py-1 rounded-sm text-yellow-400 hover:text-yellow-400 hover:bg-black/80 hover:border-black hover:border transition disabled:opacity-50 flex items-center gap-1"
                      >
                        {isLoggingOut ? '...' : (
                          <>
                            <LogOut className="w-3 h-3" />
                            {t('nav.logout')}
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Dropdown for screens < sm - Not Authenticated */}
                    <div className="sm:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-1 border-black border px-2 py-1 rounded-sm text-sm font-bold text-black hover:text-yellow-400 hover:bg-black/90 transition">
                            <User2 className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#FFD700]/90 border-black">
                          <DropdownMenuItem asChild>
                            <Link href={`/${locale}/login`} className="cursor-pointer font-bold text-black hover:text-yellow-400">
                              {t('nav.login')}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/${locale}/signup`} className="cursor-pointer font-bold text-black hover:text-yellow-400">
                              {t('nav.register')}
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Regular buttons for sm+ screens - Not Authenticated */}
                    <div className="hidden sm:flex items-center gap-2 lg:gap-4">
                      <Link href={`/${locale}/login`} className="border-black border px-2 py-1 rounded-sm text-sm font-bold text-black hover:text-yellow-400 hover:bg-black/90 transition">
                        {t('nav.login')}
                      </Link>
                      <Link href={`/${locale}/signup`} className="text-sm font-bold bg-black px-2 py-1 rounded-sm text-yellow-400 hover:text-yellow-400 hover:bg-black/80 hover:border-black hover:border transition">
                        {t('nav.register')}
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Desktop */}
      <div className="py-3 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-8 py-3">
            <div className="flex items-center justify-between relative">
              {/* Left Navigation */}
              <nav className="flex items-center gap-8">
                <Link href={`/${locale}/services`} className="text-sm font-bold text-white hover:text-yellow-400 transition">
                  {t('nav.services')}
                </Link>
                <Link href={`/${locale}/projects`} className="text-sm font-bold text-white hover:text-yellow-400 transition">
                  {t('nav.projects')}
                </Link>
                <Link href={`/${locale}/news`} className="text-sm font-bold text-white hover:text-yellow-400 transition">
                  {t('nav.news')}
                </Link>
                <Link href={`/${locale}/pricing`} className="text-sm font-bold text-white hover:text-yellow-400 transition">
                  {t('nav.pricing')}
                </Link>
              </nav>

              {/* Center Logo - Enlarged */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-[45%]">
                <Link href={`/${locale}`} className='cursor-pointer'>
                  <Image
                    src="/header/logo.svg"
                    alt="GNS BTP"
                    width={320}
                    height={20}
                    className="w-70 h-auto max-w-[90vw]"
                  />
                </Link>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center gap-8">
                <Link href={`/${locale}/about`} className="text-sm font-bold text-white hover:text-yellow-400 transition">
                  {t('nav.about')}
                </Link>
                <Link href={`/${locale}/contact`} className="text-sm font-bold text-white hover:text-yellow-400 transition">
                  {t('nav.contact')}
                </Link>

                {/* CTA Button */}
                <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-yellow-400 transition flex items-center gap-2">
                  <Image src="/header/etoile.svg" alt="" width={18} height={18} />
                  {t('cta')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden py-1">
        <div className="container mx-auto px-4">
          <div className="bg-black/30 backdrop-blur-sm h-10 rounded-full px-3 py-1 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 justify-center items-center">
              <Link href={`/${locale}`} className='cursor-pointer'>
                <Image
                  src="/header/logo.svg"
                  alt="GNS BTP"
                  width={150}
                  height={50}
                  className="w-24 sm:w-28 md:w-32 h-auto"
                />
              </Link>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="mt-2 bg-black/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <nav className="flex flex-col gap-3">
                <Link
                  href={`/${locale}/services`}
                  className="text-sm font-bold text-white hover:text-yellow-400 transition py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.services')}
                </Link>
                <Link
                  href={`/${locale}/projects`}
                  className="text-sm font-bold text-white hover:text-yellow-400 transition py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.projects')}
                </Link>
                <Link
                  href={`/${locale}/news`}
                  className="text-sm font-bold text-white hover:text-yellow-400 transition py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.news')}
                </Link>
                <Link
                  href={`/${locale}/pricing`}
                  className="text-sm font-bold text-white hover:text-yellow-400 transition py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.pricing')}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm font-bold text-white hover:text-yellow-400 transition py-2 border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.about')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm font-bold text-white hover:text-yellow-400 transition py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
                <Link href={`/${locale}/contact`}>
                  <button
                    className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-yellow-400 transition flex items-center gap-2 justify-center mt-2 w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image src="/header/etoile.svg" alt="" width={16} height={16} />
                    {t('cta')}
                  </button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
