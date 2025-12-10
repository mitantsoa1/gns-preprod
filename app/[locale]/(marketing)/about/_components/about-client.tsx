"use client"
import React from 'react'
import Image from 'next/image'
import ButtonText from '@/components/ButtonText'
import FAQ from '@/components/FAQ'
import DownloadButton from '@/components/DownloadButton'
import { motion } from 'framer-motion'
import AnimatedElement from '@/components/animations/AnimatedElement'
import { useTranslations } from 'next-intl'
import { FaqData } from '@/types'

const AboutClientPage = () => {
    const t = useTranslations('about')

    const faqData: FaqData[] = [
        {
            id: 1,
            question: t('faq.question1'),
            answer: t('faq.answer1')
        },
        {
            id: 2,
            question: t('faq.question2'),
            answer: t('faq.answer1')
        },
        {
            id: 3,
            question: t('faq.question1'),
            answer: t('faq.answer1')
        },
        {
            id: 4,
            question: t('faq.question2'),
            answer: t('faq.answer1')
        }
    ]

    const strengths = [
        t('strengths.0'),
        t('strengths.1'),
        t('strengths.2'),
        t('strengths.3'),
        t('strengths.4')
    ]

    return (
        <div className='min-h-screen bg-[#eee9ed] pt-0'>
            <section className=' min-h-screen flex items-center justify-center pt-20'>
                <div className='max-w-7xl mx-auto px-6 w-full relative'>
                    <div className="fixed right-4 bottom-4">
                        <DownloadButton />
                    </div>
                    {/* Titre en haut à gauche */}
                    <motion.h1
                        initial={{ opacity: 0, x: -50, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            opacity: { duration: 0.8 },
                            filter: { duration: 0.6 }
                        }}
                        viewport={{ once: false }}
                        className={`text-[40px] font-bold absolute left-10 bottom-6 max-w-1/5`}
                    >
                        {t('title')}
                    </motion.h1>

                    {/* Conteneur principal centré VERTICALEMENT */}
                    <div
                        className='flex flex-col items-center justify-center min-h-[60vh] max-w-xl mx-auto bg-contain bg-center bg-no-repeat'
                        style={{
                            backgroundImage: 'url(/about/AboutHero.svg)'
                        }}
                    >

                    </div>

                    {/* Texte en haut à droite */}
                    <p className='hidden md:block absolute right-0 bottom-0 sm:top-0 max-w-xs text-md text-gray-700 leading-relaxed'>
                        {t('intro')}
                    </p>
                </div>

            </section>
            <p className=' block md:hidden   max-w-2xl mx-auto text-md text-gray-700 leading-relaxed px-4'>
                {t('intro')}
            </p>
            <section className='w-full'>
                <div className='max-w-7xl mx-auto px-6 py-12'>
                    <div className='flex flex-col md:flex-row flex-wrap w-full mx-auto'>


                        {/* Bloc 1 */}
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className='w-full md:w-1/2 lg:w-1/4  p-6'>
                            <h1 className='text-xl font-bold text-gray-900 mb-4 border-r-4 border-r-black'>{t('whoWeAre.title')}</h1>
                            <p className='text-gray-700 leading-relaxed text-sm'>
                                {t('whoWeAre.description')}
                            </p>
                        </motion.div>

                        {/* Bloc 2 */}
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className='w-full md:w-1/2 lg:w-1/4  p-6'>
                            <h1 className='text-xl font-bold text-gray-900 mb-4 border-r-4 border-r-black'>{t('identity.title')}</h1>
                            <p className='text-gray-700 leading-relaxed text-sm'>
                                {t('identity.description')}
                            </p>
                        </motion.div>

                        {/* Bloc 3 */}
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className='w-full md:w-1/2 lg:w-1/4  p-6'>
                            <h1 className='text-xl font-bold text-gray-900 mb-4 border-r-4 border-r-black'>{t('mission.title')}</h1>
                            <p className='text-gray-700 leading-relaxed text-sm'>
                                {t('mission.description')}
                            </p>
                        </motion.div>

                        {/* Bloc 4 */}
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.1, ease: "easeOut" }}
                            viewport={{ once: false }} className='w-full md:w-1/2 lg:w-1/4  p-6'>
                            <h1 className='text-xl font-bold text-gray-900 mb-4'>{t('expertise.title')}</h1>
                            <p className='text-gray-700 leading-relaxed text-sm'>
                                {t('expertise.description')}
                            </p>
                        </motion.div>

                    </div>
                </div>
                <div className="py-4 flex justify-center items-center">
                    <ButtonText className='text-sm font-semibold'>{t('cta')}</ButtonText>
                </div>
            </section>

            <section className='w-ull mx-auto py-12'>
                <div className='flex flex-col md:flex-row gap-6'>
                    <div
                        className='w-full md:w-2/5 rounded-lg '>
                        <div className='flex items-center gap-2 mb-2 px-6 pb-2  pl-16 border-b  border-b-gray-600 w-[70%]'>
                            <Image src="/about/asterix.svg" alt='star' width={20} height={20} />
                            <h1 className='text-xl font-bold '>{t('vision.title')}</h1>
                        </div>

                        <AnimatedElement animation='slide' direction='right'>
                            <p className="text-sm  pt-2 pl-16">
                                {t('vision.description')}
                            </p>
                        </AnimatedElement>
                    </div>

                    <div className='w-full md:w-3/5 bg-black py-6 px-10 rounded-lg'>
                        <div className='space-y-3'>
                            {strengths.map((item, index) => (
                                <div key={index} className='flex items-start gap-3'>
                                    <Image src="/about/asterix-blanc.svg" alt='star' width={20} height={20} className="mt-0.5 shrink-0" />
                                    <AnimatedElement animation='slide' direction='left' delay={index * 0.1}>
                                        <p className='text-white text-sm'>{item}</p>
                                    </AnimatedElement>
                                </div>
                            ))}
                        </div>

                        <div className='mt-8'>
                            <ButtonText className='text-sm font-semibold bg-white text-black hover:bg-black/20'><span className='text-black hover:text-white'>{t('cta')}</span></ButtonText>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-16 pb-16">
                <FAQ data={faqData} />
            </section>
        </div>

    )
}

export default AboutClientPage