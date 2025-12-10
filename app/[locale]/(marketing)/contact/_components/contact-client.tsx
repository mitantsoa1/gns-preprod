"use client"
import DownloadButton from '@/components/DownloadButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useAnimation, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import AnimatedElement from '@/components/animations/AnimatedElement'
import { useTranslations } from 'next-intl'

const ContactClientPage = () => {
    const t = useTranslations('contact');
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: false, // Important : false pour rejouer à chaque fois
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView) {
            // Reset et rejouer l'animation
            controls.start({
                clipPath: 'inset(0 0% 0 0)',
                transition: {
                    duration: 1.5,
                    ease: [0.85, 0, 0.15, 1], // Courbe d'easing pour effet typing
                }
            });
        } else {
            // Reset quand l'élément sort du viewport
            controls.start({
                clipPath: 'inset(0 100% 0 0)',
            });
        }
    }, [inView, controls]);
    return (
        <div className='min-h-screen bg-[#eee9ed] md:pb-20 pt-36'>
            <section className='max-w-7xl sm:bg-[#ffeb11]  min-h-screen mx-auto ' >
                <div className='max-w-7xl bg-[#ebefff]  px-6  md:h-[70%] mx-auto relative'>
                    <div className="fixed right-4 top-1/2">
                        <DownloadButton />
                    </div>
                    <div className='flex justify-center'>
                        <Image src="/contact/2-lignes-entete.svg" alt='2 lignes' width={200} height={200} />
                    </div>

                    <div className='flex flex-col sm:flex-row justify-between w-full gap-8 sm:gap-0 pb-2'>
                        {/* Partie gauche - Texte */}
                        <div className='w-full sm:w-auto space-y-2 -mt-8'>
                            <div ref={ref} className="relative inline-block">
                                <h1 className='text-xl sm:text-2xl opacity-0'>
                                    {t('title')}
                                </h1>
                                <motion.h1
                                    animate={controls}
                                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                    className='text-xl sm:text-2xl absolute top-0 left-0'
                                >
                                    {t('title')}
                                </motion.h1>
                            </div>
                            <AnimatedElement animation='blur-fade'>
                                <p className='text-xs'>
                                    {t('description')}
                                </p>
                            </AnimatedElement>
                            <AnimatedElement animation='blur-fade' delay={0.5}>
                                <p className='font-bold text-sm'>
                                    {t('tagline')}
                                </p>
                            </AnimatedElement>
                        </div>

                        {/* Partie droite - Formulaire */}
                        <div className='w-full sm:max-w-1/2 sm:pr-10'>
                            <form action="" className='space-y-4'>
                                <div>
                                    <Label className='text-black'>{t('form.name')}</Label>
                                    <Input className='w-full border border-gray-700 rounded-3xl p-2' />
                                </div>
                                <div>
                                    <Label className='text-black'>{t('form.email')}</Label>
                                    <Input className='w-full border border-gray-700 rounded-3xl p-2' />
                                </div>
                                <div>
                                    <Label className='text-black'>{t('form.message')}</Label>
                                    <Textarea className='w-full border border-gray-700 rounded-3xl p-2 min-h-[100px]' />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='absolute left-3/12 bottom-0 max-[925px]:hidden'>
                        <Image src="/contact/2-lignes-center.svg" alt='ellipse' width={300} height={300} />
                    </div>
                    <div className='absolute -bottom-4/12 left-2/12 max-[925px]:hidden'>
                        <Image src="/contact/Ellipse2.svg" alt='ellipse' width={300} height={300} />
                    </div>
                    <div className='absolute -bottom-3/12 left-2/12 z-20 max-[925px]:hidden' >
                        <Image src="/contact/women.svg" alt='women' width={300} height={300} />
                    </div>
                </div>
                <div className='w-1/6 h-1/4 absolute z-50 bottom-0 bg-[#ffeb11] hidden sm:block'
                    style={{ clipPath: 'polygon(16% 28%, 54% 61%, 100% 100%, 25% 100%, 0 100%, 0 0)' }}>
                </div>

                <div className='hidden sm:inline-flex space-x-4 absolute -bottom-32 sm:-bottom-28  left-20 z-100'>
                    <Link href={"https://www.facebook.com/gnsbtp"} target="_blank" className='hover:cursor-pointer'><Image src="/contact/fb.svg" alt='fb icon' width={20} height={20} className='hover:cursor-pointer' /></Link>
                    <Link href={"https://www.facebook.com/gnsbtp"} target="_blank" className='hover:cursor-pointer'><Image src="/contact/whatsapp.svg" alt='fb icon' width={20} height={20} className='hover:cursor-pointer' /></Link>
                    <Link href={"https://www.facebook.com/gnsbtp"} target="_blank" className='hover:cursor-pointer'><Image src="/contact/telegram.svg" alt='fb icon' width={20} height={20} className='hover:cursor-pointer' /></Link>
                </div>
                <div className='hidden sm:flex flex-col space-y-3 absolute -bottom-32  right-20 z-100'>
                    <h1 className='text-lg font-semibold'>{t('info.title')}</h1>
                    <p className='inline-flex space-x-4 text-sm'><Image className='mr-2' src="/contact/phone.svg" alt='phone icon' width={20} height={20} /> {t('info.phone')}</p>
                    <p className='inline-flex space-x-2 text-sm'><Image className='mr-2' src="/contact/mail.svg" alt='phone icon' width={20} height={20} /> {t('info.email')}</p>
                    <p className='inline-flex space-x-2 text-sm'><Image className='mr-2' src="/contact/localisation.svg" alt='phone icon' width={20} height={20} /> {t('info.location')}</p>
                </div>

                <div className='sm:hidden w-full'>
                    <div className='flex flex-col items-center justify-between gap-6 p-4 bg-gray-50 rounded-lg'>

                        {/* Section réseaux sociaux */}
                        <div className='flex flex-col items-center'>
                            <h2 className='text-sm font-medium text-gray-600 mb-3'>{t('social.follow')}</h2>
                            <div className='flex justify-center gap-4'>
                                <Link href="https://www.facebook.com/gnsbtp" target="_blank" className='hover:opacity-80 transition-opacity'>
                                    <Image src="/contact/fb.svg" alt='Facebook' width={24} height={24} />
                                </Link>
                                <Link href="https://wa.me/262262282625" target="_blank" className='hover:opacity-80 transition-opacity'>
                                    <Image src="/contact/whatsapp.svg" alt='WhatsApp' width={24} height={24} />
                                </Link>
                                <Link href="https://t.me/gnsbtp" target="_blank" className='hover:opacity-80 transition-opacity'>
                                    <Image src="/contact/telegram.svg" alt='Telegram' width={24} height={24} />
                                </Link>
                            </div>
                        </div>

                        {/* Section contact */}
                        <div className='flex flex-col items-center text-center'>
                            <h2 className='text-lg font-semibold text-gray-800 mb-3'>{t('info.title')}</h2>

                            <div className='space-y-3 w-full'>
                                {/* Téléphone */}
                                <div className='flex items-center justify-center gap-2'>
                                    <Image src="/contact/phone.svg" alt='Téléphone' width={18} height={18} />
                                    <p className='text-sm text-gray-700'>{t('info.phone')}</p>
                                </div>

                                {/* Email */}
                                <div className='flex items-center justify-center gap-2'>
                                    <Image src="/contact/mail.svg" alt='Email' width={18} height={18} />
                                    <p className='text-sm text-gray-700'>{t('info.email')}</p>
                                </div>

                                {/* Localisation */}
                                <div className='flex items-center justify-center gap-2'>
                                    <Image src="/contact/localisation.svg" alt='Localisation' width={18} height={18} />
                                    <p className='text-sm text-gray-700'>{t('info.location')}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactClientPage