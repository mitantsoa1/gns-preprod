'use client'

import AnimatedElement from '@/components/animations/AnimatedElement'
import DownloadButton from '@/components/DownloadButton'
import LearnMore from '@/components/learn-more'
import { BorderTrail } from '@/components/motion-primitives/border-trail'
import CurrentProjectsSlide from '@/components/news/CurrentProjectsSlide'
import HeroCard from '@/components/news/HeroCard'
import ReleaseCard from '@/components/news/ReleaseCard2'
import { Calendar1, Clock4, Search, Share2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const NewsClientPage = () => {
    const t = useTranslations()

    return (
        <div className="min-h-screen bg-[#eee9ed] pt-20">
            <section className='max-w-7xl mx-auto py-20 px-4'>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mb-10">
                    {/* Recherche */}
                    <div className='sm:col-span-3 lg:col-span-2 inline-flex items-center gap-2 sm:pr-4 border-gray-300 sm:border-b-0 pb-2 sm:pb-0'>
                        <Search className="w-5 h-5 text-gray-500" />
                        <input
                            placeholder={t('news.search')}
                            className='w-full border-b-2 border-gray-500 focus:border-b-2 focus:border-gray-800 focus:outline-none focus:ring-0 py-1'
                        />
                    </div>

                    {/* Texte descriptif */}
                    <div className="sm:col-span-6 lg:col-span-8 sm:col-start-4 lg:col-start-3 sm:pt-4">
                        <p className='font-semibold text-gray-900 text-center sm:text-left text-sm sm:text-base lg:text-lg leading-relaxed'>
                            {t('news.description')}
                        </p>
                    </div>

                    {/* Partager */}
                    <div className="sm:col-span-3 lg:col-span-2 sm:col-start-10 lg:col-start-11 inline-flex items-center justify-end sm:justify-end gap-2">
                        <p className="text-sm sm:text-base whitespace-nowrap">{t('news.share')}</p>
                        <Share2 className="w-5 h-5 text-gray-700" />
                    </div>
                </div>

                <div className="relative">
                    {/* Carte principale - Mobile */}
                    <div className="w-full lg:hidden mb-8">
                        <AnimatedElement animation="blur">
                            <div className={`w-full h-[350px] md:h-[400px] rounded-2xl relative py-4 px-4`}
                                style={{
                                    backgroundImage: `url(/news/card1.svg)`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}>
                                <div className="w-full h-full absolute top-0 left-0 bg-black/50 rounded-2xl"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="w-full flex flex-col items-start text-left pt-32 md:pt-40 gap-2">
                                        <h2 className='text-white text-left text-lg md:text-xl font-semibold'>
                                            {t('news.mainCard.title')}
                                        </h2>
                                        <p className='text-white text-left text-xs md:text-sm font-semibold'>
                                            {t('news.mainCard.description')}
                                        </p>
                                    </div>
                                    <div className='w-full flex items-center justify-between'>
                                        <div className="flex items-center gap-2 text-white hover:gap-3 transition-all cursor-pointer">
                                            <span className="text-sm md:text-base">
                                                {t('news.mainCard.consult')}
                                            </span>
                                            <Image
                                                src="/news/arrow-right.svg"
                                                alt="arrow-right"
                                                width={32}
                                                height={32}
                                                className="w-6 h-6 md:w-8 md:h-8"
                                            />
                                        </div>
                                        <div className='flex items-center gap-2 border border-white/20 rounded-2xl px-2 py-1 bg-gray-400/20'>
                                            <span className='text-white text-xs md:text-sm'>
                                                {t('news.mainCard.timeAgo')}
                                            </span>
                                            <Clock4 className='text-white w-3 h-3 md:w-4 md:h-4' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedElement>
                    </div>

                    {/* Grid mobile */}
                    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <AnimatedElement animation="blur" delay={0.2}>
                            <HeroCard image="/news/card31.svg" description={t('news.mainCard.title')} className='h-[250px] sm:h-[250px] md:h-[250px]' />
                        </AnimatedElement>
                        <AnimatedElement animation="blur" delay={0.3}>
                            <HeroCard image="/news/card41.svg" description={t('news.mainCard.title')} className='h-[250px] sm:h-[250px] md:h-[250px]' />
                        </AnimatedElement>
                        <AnimatedElement animation="blur" delay={0.4}>
                            <HeroCard image="/news/card2.svg" description={t('news.mainCard.title')} className='h-[250px] sm:h-[250px] md:h-[250px]' />
                        </AnimatedElement>
                        <AnimatedElement animation="blur" delay={0.5}>
                            <HeroCard image="/news/card5.svg" description={t('news.mainCard.title')} className='h-[250px] sm:h-[250px] md:h-[250px]' />
                        </AnimatedElement>
                    </div>

                    {/* Layout desktop */}
                    <div className="hidden lg:grid lg:grid-cols-8 lg:grid-rows-2 lg:space-y-2 relative">
                        {/* Carte 1 */}
                        <div className="col-span-2 px-4">
                            <AnimatedElement animation="blur" delay={0.4}>
                                <HeroCard
                                    image="/news/card31.svg"
                                    description={t('news.mainCard.title')}
                                    className='h-[250px]'
                                />
                            </AnimatedElement>
                        </div>

                        {/* Carte principale */}
                        <div className="col-span-4 row-span-2 col-start-3 px-4">
                            <AnimatedElement animation="blur">
                                <div className={`w-full h-[500px] rounded-2xl relative py-4 px-4`}
                                    style={{
                                        backgroundImage: `url(/news/card1.svg)`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>
                                    <div className="w-full h-full absolute top-0 left-0 bg-black/50 rounded-2xl"></div>
                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div className="w-full flex flex-col items-start text-left pt-80 gap-2">
                                            <h2 className='text-white text-left text-xl font-semibold'>
                                                {t('news.mainCard.title')}
                                            </h2>
                                            <p className='text-white text-left text-sm font-semibold'>
                                                {t('news.mainCard.description')}
                                            </p>
                                        </div>
                                        <div className='w-full flex items-center justify-between'>
                                            <div className="flex items-center gap-2 text-white hover:gap-3 transition-all cursor-pointer">
                                                <span>{t('news.mainCard.consult')}</span>
                                                <Image
                                                    src="/news/arrow-right.svg"
                                                    alt="arrow-right"
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                            <div className='flex items-center gap-2 border border-white/20 rounded-2xl px-2 py-1 bg-gray-400/20'>
                                                <span className='text-white text-sm'>
                                                    {t('news.mainCard.timeAgo')}
                                                </span>
                                                <Clock4 className='text-white w-4 h-4' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedElement>
                        </div>

                        {/* Cartes restantes */}
                        <div className="col-span-2 col-start-1 row-start-2 px-4">
                            <AnimatedElement animation="blur" delay={0.6}>
                                <HeroCard
                                    image="/news/card41.svg"
                                    description={t('news.mainCard.title')}
                                    className='h-[250px]'
                                />
                            </AnimatedElement>
                        </div>

                        <div className="col-span-2 col-start-7 row-start-1 px-4">
                            <AnimatedElement animation="blur" delay={0.7}>
                                <HeroCard
                                    image="/news/card2.svg"
                                    description={t('news.mainCard.title')}
                                    className='h-[250px]'
                                />
                            </AnimatedElement>
                        </div>

                        <div className="col-span-2 col-start-7 row-start-2 px-4">
                            <AnimatedElement animation="blur" delay={0.8}>
                                <HeroCard
                                    image="/news/card5.svg"
                                    description={t('news.mainCard.title')}
                                    className='h-[250px]'
                                />
                            </AnimatedElement>
                        </div>
                    </div>
                </div>
            </section>

            {/* testimonial */}
            <section>
                <div className="relative w-full bg-white mx-auto py-4 px-4">
                    <div className='max-w-5xl mx-auto'>
                        <div className='flex flex-col md:flex-row items-start justify-between gap-8'>
                            {/* Carte 1 */}
                            <div className='w-full md:w-1/3 flex flex-row items-start md:items-center gap-4'>
                                <div className='shrink-0 items-center justify-center'>
                                    <Image
                                        src="/news/profile-testi1.svg"
                                        alt="profile-testi1"
                                        width={60}
                                        height={60}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className='flex flex-col gap-3 flex-1'>
                                    <h1 className='text-lg font-bold text-gray-500'>{t('news.testimonials.hashtag')}</h1>
                                    <p className='text-black text-sm leading-relaxed'>
                                        {t('news.testimonials.description')}
                                    </p>
                                    <div className='flex items-center gap-2 text-gray-500 font-bold'>
                                        <Calendar1 size={18} />
                                        <span className='text-sm'>{t('news.testimonials.date')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Carte 2 */}
                            <div className='w-full md:w-1/3 flex flex-row items-start md:items-center gap-4'>
                                <div className='shrink-0 items-center justify-center'>
                                    <Image
                                        src="/news/profile-testi2.svg"
                                        alt="profile-testi2"
                                        width={60}
                                        height={60}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className='flex flex-col gap-3 flex-1'>
                                    <h1 className='text-lg font-bold text-gray-500'>{t('news.testimonials.hashtag')} </h1>
                                    <p className='text-black text-sm leading-relaxed'>
                                        {t('news.testimonials.description')}
                                    </p>
                                    <div className='flex items-center gap-2 text-gray-500 font-bold'>
                                        <Calendar1 size={18} />
                                        <span className='text-sm'>{t('news.testimonials.date')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Carte 3 */}
                            <div className='w-full md:w-1/3 flex flex-row items-start md:items-center gap-4'>
                                <div className='shrink-0 items-center justify-center'>
                                    <Image
                                        src="/news/profile-testi3.svg"
                                        alt="profile-testi3"
                                        width={60}
                                        height={60}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className='flex flex-col gap-3 flex-1'>
                                    <h1 className='text-lg font-bold text-gray-500'>{t('news.testimonials.hashtag')}</h1>
                                    <p className='text-black text-sm leading-relaxed'>
                                        {t('news.testimonials.description')}
                                    </p>
                                    <div className='flex items-center gap-2 text-gray-500 font-bold'>
                                        <Calendar1 size={18} />
                                        <span className='text-sm'>{t('news.testimonials.date')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Communiqués */}
            <section className='max-w-7xl mx-auto py-20 px-4'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                        {/* Partie gauche - Nos communiqués */}

                        <div className='w-full lg:w-2/3'>
                            <h1 className='text-xl sm:text-2xl font-bold text-gray-900 mb-4'>{t('news.releases.title')}</h1>
                            <AnimatedElement animation="slide" direction="right">
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6'>
                                    <ReleaseCard
                                        title={t('news.releases.hashtag')}
                                        description={t('news.releases.description')}
                                        date={t('news.releases.date')}
                                        image='/news/release1.svg'
                                    />
                                    <ReleaseCard
                                        title={t('news.releases.hashtag')}
                                        description={t('news.releases.description')}
                                        date={t('news.releases.date')}
                                        image='/news/release2.svg'
                                    />
                                    <ReleaseCard
                                        title={t('news.releases.hashtag')}
                                        description={t('news.releases.description')}
                                        date={t('news.releases.date')}
                                        image='/news/release3.svg'
                                    />
                                    <div className="col-span-full sm:col-span-2 lg:col-span-3">
                                        <LearnMore text={t('news.releases.learnMore')} textClassName='text-gray-600 text-xs sm:text-sm' className='text-gray-600 text-xs sm:text-sm' arrowColor='#718096' />
                                    </div>
                                </div>
                            </AnimatedElement>
                        </div>
                        {/* Partie droite - Rester connecté */}
                        <div className='w-full lg:w-1/3 mt-6 lg:mt-0'>
                            <h1 className='text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                                {t('news.stayConnected.title')}
                                <span className='w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-700'></span>
                            </h1>

                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 border-t border-gray-900 pt-4 sm:pt-6'>

                                {/* Facebook */}
                                <AnimatedElement animation="fade" delay={0.3}>
                                    <div
                                        className='flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg cursor-pointer min-h-[70px]'
                                        style={{
                                            backgroundImage: 'url(/news/facebook.svg)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <div className='flex items-center gap-2 sm:gap-3'>
                                            <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/10'>
                                                <img src="/news/fb.svg" alt="Facebook logo" className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <span className='font-medium font-poppins text-white text-sm sm:text-base'>Facebook</span>
                                        </div>

                                        <div className='flex items-center gap-4 sm:gap-6'>
                                            <span className='font-medium font-poppins text-white text-xs sm:text-sm'>Like</span>
                                            <span className=' font-poppins text-white text-xs sm:text-sm font-bold'>10k</span>
                                        </div>
                                    </div>
                                </AnimatedElement>

                                {/* Instagram */}
                                <AnimatedElement animation="fade" delay={0.5}>
                                    <div
                                        className='flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg cursor-pointer min-h-[70px]'
                                        style={{
                                            backgroundImage: 'url(/news/instagram.svg)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <div className='flex items-center gap-2 sm:gap-3'>
                                            <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/10'>
                                                <img src="/news/insta.svg" alt="Instagram logo" className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <span className='font-medium font-poppins text-white text-sm sm:text-base'>Instagram</span>
                                        </div>

                                        <div className='flex items-center gap-4 sm:gap-6'>
                                            <span className='font-medium font-poppins text-white text-xs sm:text-sm'>Follow</span>
                                            <span className=' font-poppins text-white text-xs sm:text-sm font-bold'>2k</span>
                                        </div>
                                    </div>
                                </AnimatedElement>

                                {/* Linkedin */}
                                <AnimatedElement animation="fade" delay={0.7}>
                                    <div
                                        className='flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg cursor-pointer min-h-[70px]'
                                        style={{
                                            backgroundImage: 'url(/news/linkedin.svg)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <div className='flex items-center gap-2 sm:gap-3'>
                                            <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/10'>
                                                <img src="/news/icons_linkedin.svg" alt="Linkedin logo" className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <span className='font-medium font-poppins text-white text-sm sm:text-base'>Linkedin</span>
                                        </div>

                                        <div className='flex items-center gap-4 sm:gap-6'>
                                            <span className='font-medium font-poppins text-white text-xs sm:text-sm'>Follow</span>
                                            <span className=' font-poppins text-white text-xs sm:text-sm font-bold'>800</span>
                                        </div>
                                    </div>
                                </AnimatedElement>
                                {/* X */}
                                <AnimatedElement animation="fade" delay={0.9}>
                                    <div
                                        className='flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg cursor-pointer min-h-[70px]'
                                        style={{
                                            backgroundImage: 'url(/news/x.svg)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <div className='flex items-center gap-2 sm:gap-3'>
                                            <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/10'>
                                                <img src="/news/x-logo.svg" alt="X logo" className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <span className='font-medium font-poppins text-white text-sm sm:text-base'>X</span>
                                        </div>

                                        <div className='flex items-center gap-4 sm:gap-6'>
                                            <span className='font-medium font-poppins text-white text-xs sm:text-sm'>Follow</span>
                                            <span className=' font-poppins text-white text-xs sm:text-sm font-bold'>1.5k</span>
                                        </div>
                                    </div>
                                </AnimatedElement>
                                {/* Youtube */}
                                <AnimatedElement animation="fade" delay={1}>
                                    <div
                                        className='flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg cursor-pointer min-h-[70px]'
                                        style={{
                                            backgroundImage: 'url(/news/youtube.svg)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <div className='flex items-center gap-2 sm:gap-3'>
                                            <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/10'>
                                                <img src="/news/YouTube_icon.svg" alt="Youtube logo" className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <span className='font-medium font-poppins text-white text-sm sm:text-base'>Youtube</span>
                                        </div>

                                        <div className='flex items-center gap-4 sm:gap-6'>
                                            <span className='font-medium font-poppins text-white text-xs sm:text-sm'>Subscribe</span>
                                            <span className=' font-poppins text-white text-xs sm:text-sm font-bold'>1k</span>
                                        </div>
                                    </div>
                                </AnimatedElement>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NewsClientPage