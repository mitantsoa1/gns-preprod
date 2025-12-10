"use client"
import React from 'react';
import ServicesGrid from '@/components/services/ServicesGrid';
import ButtonPrimary from '@/components/ButtonPrimary';
import { Button } from '@/components/ui/button';
import DownloadButton from '@/components/DownloadButton';
import AnimatedElement from '@/components/animations/AnimatedElement';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import RepeatableAnimatedText from '@/components/animations/RepeatableAnimatedText';
import RepeatableTextRoll from '@/components/animations/RepeatableTextRoll';
import { useLocale, useTranslations } from 'next-intl';

export default function ServicesClientPage() {
    const t = useTranslations('services');
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    const locale = useLocale()
    return (
        <div className="min-h-screen bg-[#eee9ed] pt-20">
            {/* Hero Section */}
            <section className=" py-16 relative" id='nos-services'>
                <div className='grid grid-cols-5 gap-6'>
                    {/* Colonne 1 : Titre et description */}
                    <div className="col-span-5 lg:col-span-2 ">

                        <div className="col-span-5 lg:col-span-2 ">
                            <div className="flex flex-col h-full items-start justify-start    px-4 lg:pl-32 pt-0 md:pt-8 lg:pt-10  ">
                                <AnimatedElement animation='blur-fade' direction='right'>
                                    <h2
                                        className="text-[clamp(1.8rem,6vw,6rem)] font-bold sm:text-[clamp(2rem,6vw,6rem)] text-gray-900 leading-[0.9] sm:leading-[0.95]"
                                        style={{ fontStretch: 'condensed' }}

                                    >
                                        {t('title')}
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-4">
                                        {t('description')}
                                    </p>

                                    <ButtonPrimary className='sm:w-auto' text={t('cta')} />
                                </AnimatedElement>
                            </div>
                        </div>

                    </div>

                    {/* Colonne 2 : Grille des services */}
                    <div className='col-span-5 lg:col-span-2 lg:col-start-3 px-6'>
                        <ServicesGrid />
                    </div>

                    {/* Colonne 3 : Bouton Nos services - cachée sur mobile */}
                    <div className='hidden lg:flex col-span-1 col-start-5 text-black items-start justify-start space-y-4 px-4 pt-6 flex-col'>
                        <Button className='w-full px-4 py-2 text-black rounded-2xl border border-gray-600 bg-gray-300 hover:bg-gray-300 whitespace-normal wrap-break-word text-center' onClick={() => scrollToSection('nos-services')}>
                            {t('nav.services')}
                        </Button>
                        <Button className='w-full px-4 py-2 text-black rounded-2xl border border-gray-600 bg-transparent hover:bg-gray-300 whitespace-normal wrap-break-word text-center' onClick={() => scrollToSection('expertise')}>
                            {t('nav.expertise')}
                        </Button>
                        <Button className='w-full px-4 py-2 text-black rounded-2xl border border-gray-600 bg-transparent hover:bg-gray-300 whitespace-normal wrap-break-word text-center' onClick={() => scrollToSection('difference')}>
                            {t('nav.difference')}
                        </Button>
                    </div>
                </div>
                <div className="fixed right-4 top-1/2 z-999">
                    <DownloadButton className='bg-gray-300/80' />
                </div>
            </section>

            {/* Expertise Section */}
            <section className=" py-16" id='expertise'>
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-center text-4xl sm:text-3xl md:text-4xl mb-20 font-bold text-gray-900 leading-tight" style={{ fontStretch: 'condensed' }}>
                        <RepeatableAnimatedText per='char' preset='fade'>
                            {t('complementaryExpertise.title')}
                        </RepeatableAnimatedText>
                    </h3>

                    <AnimatedElement animation='blur'>
                        <div className='min-h-[350px] w-full rounded-2xl relative '
                            style={{
                                backgroundImage: `url(/services/expertise.svg)`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}>

                            <div className="w-72 bg-[#DBDBDB]/90 shadow-lg rounded-lg p-6 border-2 border-white/50 absolute top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-4">
                                <div className="h-36 w-full bg-gray-200 flex flex-col rounded-lg justify-between px-4 pt-4 pb-8"
                                    style={{
                                        backgroundImage: `url(/services/expertise-building.svg)`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>

                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <div className="flex flex-col">
                                            <h1 className="text-gray-800 font-bold my-6">{t('complementaryExpertise.technical.title')}</h1>
                                            <p className="text-gray-900 font-light text-xs">{t('complementaryExpertise.technical.description')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </AnimatedElement>
                    <div className="flex flex-wrap gap-4 mt-20">
                        <Button className='inline-flex items-center gap-3 bg-black border border-gray-800 rounded-2xl px-4 py-3 whitespace-nowrap'>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black shrink-0">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" />
                                </svg>
                            </span>
                            <span className='text-white'>{t('complementaryExpertise.technical.title')}</span>
                        </Button>

                        <Button className='inline-flex items-center gap-3 bg-transparent hover:bg-gray-300 border border-gray-800 rounded-2xl px-4 py-3 whitespace-nowrap'>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white shrink-0">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" />
                                </svg>
                            </span>
                            <span className='text-black'>{t('complementaryExpertise.monitoring')}</span>
                        </Button>

                        <Button className='inline-flex items-center gap-3 bg-transparent border hover:bg-gray-300 border-gray-800 rounded-2xl px-4 py-3 whitespace-nowrap'>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white shrink-0">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" />
                                </svg>
                            </span>
                            <span className='text-black'>{t('complementaryExpertise.management')}</span>
                        </Button>

                        <Button className='inline-flex items-center gap-3 bg-transparent hover:bg-gray-300 border border-gray-800 rounded-2xl px-4 py-3 whitespace-nowrap'>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white shrink-0">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" />
                                </svg>
                            </span>
                            <span className='text-black'>{t('complementaryExpertise.delivery')}</span>
                        </Button>
                    </div>

                </div>
            </section>

            {/* Différence Section */}
            <section className="pt-0 pb-16 md:py-16 px-6" id='difference' >
                <div className="max-w-7xl mx-auto px-6 bg-[#FFEB11] rounded-2xl py-4 ">
                    <div className="flex flex-col lg:flex-row items-start gap-8 relative">
                        {/* Partie texte à gauche */}
                        <div className="w-full md:w-1/2 motion-preset-pop motion-duration-1500">
                            <h2 className="hidden sm:block text-[clamp(2rem,5vw,5rem)] font-bold text-gray-900 leading-[1.3] mb-2" style={{ fontStretch: 'condensed' }}>
                                <RepeatableTextRoll >
                                    {locale === 'fr' ? 'NOTRE' : 'OUR'}
                                </RepeatableTextRoll>
                                <RepeatableTextRoll >
                                    DIFFERENCE
                                </RepeatableTextRoll>
                            </h2>
                            <h2 className="block sm:hidden text-[clamp(2rem,5vw,5rem)] font-bold text-gray-900 leading-[1.3] mb-2" style={{ fontStretch: 'condensed' }}>
                                <RepeatableTextRoll >
                                    NOTRE DIFFERENCE
                                </RepeatableTextRoll>
                            </h2>
                            <AnimatedElement animation="fade">
                                <p className="text-gray-900 text-sm max-w-2xl">
                                    {t('difference.description')}
                                </p>
                            </AnimatedElement>

                        </div>

                        {/* Partie cartes à droite */}
                        <div className="w-full hidden md:flex md:justify-endflex md:w-1/2   gap-6 ">
                            {/* Colonne 1 */}
                            <div className=" hidden lg:flex flex-col gap-6 absolute -top-14 right-1/6">
                                <AnimatedElement animation="blur">
                                    <div className='h-40 w-32 border border-gray-400 rounded-xl shadow-lg flex items-center justify-center' style={{
                                        backgroundImage: `url(/services/diff1.svg)`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>

                                    </div>
                                </AnimatedElement>
                                <AnimatedElement animation="blur">
                                    <div className='h-40 w-32  border border-gray-400 rounded-xl shadow-lg flex items-center justify-center' style={{
                                        backgroundImage: `url(/services/diff2.svg)`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>

                                    </div>
                                </AnimatedElement>
                            </div>

                            {/* Colonne 2 */}
                            <div className="flex flex-col gap-6 mt-8 absolute -top-4 md:-top-8 right-2">
                                <AnimatedElement animation="blur">
                                    <div className='h-40 w-32 border border-gray-400 rounded-xl shadow-lg flex items-center justify-center' style={{
                                        backgroundImage: `url(/services/diff3.svg)`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>

                                    </div>
                                </AnimatedElement>
                                <AnimatedElement animation="blur">
                                    <div className='h-40 w-32 border border-gray-400 rounded-xl shadow-lg flex items-center justify-center' style={{
                                        backgroundImage: `url(/services/diff4.svg)`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>

                                    </div>
                                </AnimatedElement>
                            </div>
                        </div>
                    </div>
                    <AnimatedElement animation="blur">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative mx-auto py-2">
                            <Button className='bg-black text-gray-100 border hover:bg-black/80 border-gray-800 rounded-sm px-4 py-2 whitespace-nowrap'>
                                {t('difference.viewProjects')}
                            </Button>
                            <Button className='bg-transparent text-gray-800 border hover:bg-gray-300 border-gray-800 rounded-sm px-4 py-2 whitespace-nowrap'>
                                {t('difference.aboutUs')}
                            </Button>
                        </div>
                    </AnimatedElement>

                </div>
            </section>

        </div>
    );
}