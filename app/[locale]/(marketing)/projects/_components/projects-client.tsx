"use client"
import AnimatedElement from '@/components/animations/AnimatedElement';
import ButtonText from '@/components/ButtonText';
import DownloadButton from '@/components/DownloadButton';
import RealistationCard from '@/components/projects/RealistationCard'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

const ProjectsClientPage = () => {
    const t = useTranslations('projects');

    const realisationsData = [
        {
            id: 1,
            title: t('realization.title'),
            description: t('realization.description'),
            image: "/projects/real1.svg",
            date: t('realization.date')
        },
        {
            id: 2,
            title: t('realization.title'),
            description: t('realization.description'),
            image: "/projects/real2.svg",
            date: t('realization.date')
        },
        {
            id: 3,
            title: t('realization.title'),
            description: t('realization.description'),
            image: "/projects/real3.svg",
            date: t('realization.date')
        },
        {
            id: 4,
            title: t('realization.title'),
            description: t('realization.description'),
            image: "/projects/real4.svg",
            date: t('realization.date')
        },
        {
            id: 5,
            title: t('realization.title'),
            description: t('realization.description'),
            image: "/projects/real5.svg",
            date: t('realization.date')
        },
        {
            id: 6,
            title: t('realization.title'),
            description: t('realization.description'),
            image: "/projects/real6.svg",
            date: t('realization.date')
        }
    ];

    return (

        <div className="min-h-screen bg-[#eee9ed] pt-32 overflow-x-hidden px-4">
            <div className="max-w-7xl mx-auto "> {/* Déplacer px-4 ici */}
                <section
                    className="relative pt-10 pb-2 sm:pb-20 bg-cover bg-center bg-no-repeat min-h-[500px] rounded-2xl mb-12"
                    style={{
                        backgroundImage: `url(/projects/banner.svg)`,
                    }}
                >
                    <style>{`
                .gradient-overlay {
                    background: linear-gradient(to top, #282828E5 0%, #28282880 70%, #28282800 100%);
                    backdrop-filter: blur(10px);
                }
            `}</style>

                    {/* Conteneur principal positionné en bas */}
                    <div className="absolute bottom-0 left-0 right-0 flex   flex-col sm:flex-row  justify-between  items-end rounded-b-2xl gradient-overlay">
                        {/* Texte en bas à gauche */}
                        <div className="flex flex-col gap-4 w-full sm:w-1/2 text-white p-8">
                            <AnimatedElement animation="blur">
                                <h4 className="text-sm font-semibold">{t('title')}</h4>
                                <h2 className="text-5xl font-bold">{t('hero.title')}</h2>
                                <p className="text-sm text-gray-200">
                                    {t('hero.description')}
                                </p>
                            </AnimatedElement>
                        </div>

                        {/* Bouton en bas à droite */}
                        <AnimatedElement animation="blur" delay={0.5}>
                            <div className="flex items-center gap-2 text-white pr-24 pb-14 hover:gap-3 transition-all cursor-pointer">
                                <span>{t('hero.learnMore')}</span>
                                <Image
                                    src="/projects/arrow-right.svg"
                                    alt="arrow-right"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </AnimatedElement>
                    </div>
                </section>
            </div>


            <section className='max-w-7xl mx-auto '>
                <h2 className='font-bold text-gray-800'>{t('title')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {realisationsData.map((realisation) => (
                        <RealistationCard
                            key={realisation.id}
                            title={realisation.title}
                            description={realisation.description}
                            image={realisation.image}
                            date={realisation.date}
                        />
                    ))}
                </div>
                <div className="py-4 flex justify-center items-center">
                    <AnimatedElement animation="blur">
                        <ButtonText className='text-sm font-semibold'>{t('cta.viewMore')}</ButtonText>
                    </AnimatedElement>
                </div>
            </section>
            <section className='flex flex-col justify-center'>
                <div className='max-w-6xl mx-auto px-4'>
                    <div className="relative">
                        <AnimatedElement animation="blur">
                            <h2
                                className={`font-bold relative z-10 bg-cover text-[120px] sm:text-[200px] md:text-[220px] lg:text-[300px] xl:text-[350px] leading-[0.8] pt-8 sm:pt-12 md:pt-16 lg:pt-20 text-center `}
                                style={{
                                    backgroundImage: 'url(/projects/batir.svg)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    backgroundOrigin: 'border-box',
                                    color: 'transparent',
                                }}
                            >
                                {t('cta.build')}
                            </h2>
                        </AnimatedElement>
                    </div>
                </div>
                <div className="pt-0 mt-0   px-0 m-0 max-w-7xl mx-auto">
                    <AnimatedElement animation="slide" direction='right' delay={0.5}>
                        <h1 className='font-extrabold text-black text-lg sm:text-2xl md:text-3xl  lg:text-5xl text-center leading-tight py-2'>
                            {t('cta.tagline')}
                        </h1>

                        <div className='max-w-sm flex justify-center items-center mx-auto py-6'>
                            <Image
                                src="/projects/avatar.svg"
                                alt="avatar"
                                width={200}
                                height={200}
                            />
                        </div>
                    </AnimatedElement>
                </div>
                <div className="max-w-sm flex justify-center items-center mx-auto py-6 gap-2">
                    <AnimatedElement animation="fade" delay={0.5} duration={0.8}>
                        <ButtonText className='text-sm font-semibold'>{t('cta.appointment')}</ButtonText>
                    </AnimatedElement>
                    <AnimatedElement animation="fade" delay={0.7} duration={0.7}>
                        <ButtonText variant="outline" className='text-sm font-semibold'>{t('cta.aboutUs')}</ButtonText>
                    </AnimatedElement>
                </div>
            </section>
        </div>
    )
}

export default ProjectsClientPage