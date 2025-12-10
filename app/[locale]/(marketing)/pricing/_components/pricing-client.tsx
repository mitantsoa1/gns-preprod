"use client"
import ButtonText from '@/components/ButtonText'
import DownloadButton from '@/components/DownloadButton'
import FAQ from '@/components/FAQ'
import { Check, Minus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import AnimatedElement from '@/components/animations/AnimatedElement'
import RepeatableTextRoll from '@/components/animations/RepeatableTextRoll'
import { useLocale, useTranslations } from 'next-intl'
import ButtonDelay from './button-delay'
import Link from 'next/link'
import { useProductStore } from '@/store/product-store'
import { Product } from '@/lib/generated/prisma/client'
import { FaqData } from '@/types'

const PricingContent = ({ products }: { products: Product[] }) => {
    const locale = useLocale()
    const t = useTranslations('pricing');
    const { setSelectedProduct } = useProductStore();

    const services = [
        {
            name: "Étude de sol & fondations",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Structure béton armé",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Murs porteurs & cloisons",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Etanchéité toiture",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Isolation thermique & phonique",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Réseaux d'évacuation (eaux, pluviales)",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Finitions structurelles (escaliers, dalles)",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Étude technique & ingénierie",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Coordination des corps d'état",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Étude de sol & fondations",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Structure béton armé",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Murs porteurs & cloisons",
            case1: "Check",
            case2: "NO",
            case3: "Check",
            case4: "NO",
        },
        {
            name: "Etanchéité toiture",
            case1: "Check",
            case2: "NO",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Isolation thermique & phonique",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Réseaux d'évacuation (eaux, pluviales)",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Finitions structurelles (escaliers, dalles)",
            case1: "Check",
            case2: "NO",
            case3: "Check",
            case4: "Check",
        },
        {
            name: "Étude technique & ingénierie",
            case1: "Check",
            case2: "NO",
            case3: "NO",
            case4: "Check",
        },
        {
            name: "Coordination des corps d'état",
            case1: "Check",
            case2: "Check",
            case3: "Check",
            case4: "Check",
        },
    ];

    const faqData: FaqData[] = [
        {
            id: 1,
            question: t('faq.question1'),
            answer: t('faq.answer1')
        },
        {
            id: 2,
            question: t('faq.question2'),
            answer: t('faq.answer2')
        },
        {
            id: 3,
            question: t('faq.question3'),
            answer: t('faq.answer3')
        },
        {
            id: 4,
            question: t('faq.question4'),
            answer: t('faq.answer4')
        }
    ];

    return (
        <div className='bg-[#eee9ed] m-0 pt-32'>
            <section>
                <div className='max-w-5xl mx-auto px-4 '>
                    <div className='py-2 flex flex-col items-center justify-center'>
                        <p className='text-md text-black text-center max-w-xl'>
                            {t('intro')}
                        </p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <motion.h1
                                initial={{ clipPath: "inset(0 100% 0 0)" }}
                                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                                className='text-[80px] sm:text-[100px] font-bold text-center bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                            >
                                {t('title')}
                            </motion.h1>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute -bottom-2 left-1/4 right-1/4 h-0 bg-gray-300 origin-center"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className='max-w-7xl mx-auto px-4 pb-10'
                style={{
                    backgroundImage: 'url(/pricing/bg-card.svg)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundOrigin: 'border-box',
                }}
            >
                <div className="fixed right-4 top-1/2">
                    <DownloadButton />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 px-4 gap-4 md:gap-6 lg:gap-2 mt-10">
                    {/* card 1 - Titre */}
                    <div className='lg:col-span-1 md:col-span-3 sm:col-span-2 flex justify-center items-center py-6'
                        style={{
                            backgroundImage: 'url(/pricing/ellipse.svg)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundOrigin: 'border-box',
                        }}
                    >
                        <h2 className="font-extrabold text-center text-2xl">{t('choosePlan')}</h2>
                    </div>

                    {products.map((product, index) => {
                        const slug = product.name.toLowerCase().replace(/ /g, '-');
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6 + index * 0.1, ease: "easeOut" }}
                                viewport={{ once: false, amount: 0.3 }}
                                whileHover={{ y: -8, transition: { duration: 0.5 } }}
                                className='flex flex-col'
                                onClick={() => setSelectedProduct(product)}
                            >
                                <p className='text-center text-xs h-6 py-1'>{product.isPopular ? t('plans.mostRequested') : ''}&nbsp;</p>
                                <div className={`flex flex-col justify-between h-full bg-slate-100 rounded-lg shadow-lg `}>
                                    {product.isPopular && <span className='h-2 bg-jaune rounded-t-lg w-full'></span>}
                                    <div className='py-4 px-4 flex flex-col justify-between h-full'>
                                        <div>
                                            <h2 className={`font-extrabold text-lg text-center ${product.isPopular ? 'text-[#FAAE2B]' : ''}`}>{product.name}</h2>
                                            {product.price > 0 && (
                                                <div className="flex flex-col items-center my-2">
                                                    <p className={`font-extrabold text-xl ${product.isPopular ? 'text-[#FAAE2B]' : ''}`}>{product.price.toLocaleString('fr-FR')} € {product.unit === 'm²' ? '/ m²' : ''}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {product.delay && (
                                                <div className="flex justify-center mt-1">
                                                    <ButtonDelay text={product.delay} />
                                                </div>
                                            )}
                                            <p className='text-center text-sm'>
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <Link href={`/${locale}/pricing/${product.id}`}>
                                                <ButtonText className='text-sm font-semibold'>{t('cta.choose')}</ButtonText>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}

                    {/* Custom Quote Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6 + products.length * 0.1, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.3 }}
                        whileHover={{ y: -8, transition: { duration: 0.5 } }}
                        className='flex flex-col'
                    >
                        <p className='text-center text-xs h-6 py-1'>&nbsp;</p>
                        <div className={`flex flex-col justify-between h-full bg-slate-100 rounded-lg shadow-lg `}>
                            <div className='py-4 px-4 flex flex-col justify-between h-full'>
                                <div>
                                    <h2 className={`font-extrabold text-lg text-center`}>{t('plans.custom.title')}</h2>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className='text-center text-sm'>
                                        {t('plans.custom.description')}
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <ButtonText className='text-sm font-semibold'>{t('cta.request')}</ButtonText>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className='max-w-7xl mx-auto'>
                <h2 className="font-bold text-lg text-left py-8">{t('features.title')} </h2>

                <div className="grid grid-cols-1 lg:grid-cols-9 gap-4">
                    {/* Colonne des noms de services - Mobile: en-tête, Desktop: colonne gauche */}
                    <div className="lg:col-span-2 bg-white py-4 sm:py-6 lg:py-8 px-4 rounded-xl lg:rounded-2xl text-left overflow-x-auto">
                        {/* En-tête mobile */}
                        <div className="lg:hidden mb-4">
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base">{t('features.servicesOffered')}</h3>
                        </div>

                        <div className="space-y-1">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="text-gray-800 text-xs sm:text-sm py-2 lg:py-3 last:border-b-0 border-b border-gray-100 lg:border-b-0"
                                >
                                    {service.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Colonne des cases - Mobile: scroll horizontal, Desktop: largeur normale */}
                    <div className="lg:col-span-7 lg:col-start-3 py-4 sm:py-6 lg:py-8 px-4 bg-white rounded-xl lg:rounded-2xl overflow-x-auto">
                        {/* En-têtes des colonnes */}
                        <div className="hidden lg:grid grid-cols-4 gap-4 mb-4 px-2">
                            <div className="text-center text-sm font-semibold text-gray-600">Option 1</div>
                            <div className="text-center text-sm font-semibold text-gray-600">Option 2</div>
                            <div className="text-center text-sm font-semibold text-gray-600">Option 3</div>
                            <div className="text-center text-sm font-semibold text-gray-600">Option 4</div>
                        </div>

                        {/* Mobile: en-têtes horizontaux */}
                        <div className="lg:hidden grid grid-cols-4 gap-2 mb-4 min-w-[500px]">
                            <div className="text-center text-xs font-semibold text-gray-600">Opt. 1</div>
                            <div className="text-center text-xs font-semibold text-gray-600">Opt. 2</div>
                            <div className="text-center text-xs font-semibold text-gray-600">Opt. 3</div>
                            <div className="text-center text-xs font-semibold text-gray-600">Opt. 4</div>
                        </div>

                        <div className="space-y-1 min-w-[500px] lg:min-w-0">
                            {services.map((service, index) => (
                                <div
                                    key={service.name + "-" + index}
                                    className="grid grid-cols-4 gap-2 lg:gap-4 py-2 lg:py-3 border-b border-gray-100 last:border-b-0 items-center"
                                >
                                    {/* Case 1 */}
                                    <div className="text-center">
                                        {service.case1 === "Check" ? (
                                            <span className="bg-jaune w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto">
                                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                            </span>
                                        ) : (
                                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto border border-gray-300">
                                                <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                            </span>
                                        )}
                                    </div>

                                    {/* Case 2 */}
                                    <div className="text-center">
                                        {service.case2 === "Check" ? (
                                            <span className="bg-jaune w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto">
                                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                            </span>
                                        ) : service.case2 === "NO" ? (
                                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto border border-red-300 bg-red-50">
                                                <span className="text-red-500 text-xs font-bold">×</span>
                                            </span>
                                        ) : (
                                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto border border-gray-300">
                                                <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                            </span>
                                        )}
                                    </div>

                                    {/* Case 3 */}
                                    <div className="text-center">
                                        {service.case3 === "Check" ? (
                                            <span className="bg-jaune w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto">
                                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                            </span>
                                        ) : service.case3 === "NO" ? (
                                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto border border-red-300 bg-red-50">
                                                <span className="text-red-500 text-xs font-bold">×</span>
                                            </span>
                                        ) : (
                                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto border border-gray-300">
                                                <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                            </span>
                                        )}
                                    </div>

                                    {/* Case 4 */}
                                    <div className="text-center">
                                        {service.case4 === "Check" ? (
                                            <span className="bg-jaune w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto">
                                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                            </span>
                                        ) : service.case4 === "NO" ? (
                                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto border border-red-300 bg-red-50">
                                                <span className="text-red-500 text-xs font-bold">×</span>
                                            </span>
                                        ) : (
                                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto border border-gray-300">
                                                <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>

            <section className="pb-4 w-full bg-jaune mt-16">
                <motion.div
                    initial={{ y: -100, opacity: 0, rotate: -30 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        duration: 0.8
                    }}
                    className="flex justify-center items-start"
                >
                    <Image src="/pricing/marteau.svg" alt="marteau" width={116} height={96} />
                </motion.div>
                <div className="space-y-4 mb-4">
                    <h1 className="text-2xl font-bold text-center">
                        <RepeatableTextRoll duration={0.1}>
                            {t('notConvinced.title')}
                        </RepeatableTextRoll>
                    </h1>
                    <p className="text-center text-xs">
                        {t('notConvinced.description1')}<br />
                        {t('notConvinced.description2')}
                    </p>
                </div>
                <div className="flex justify-center">
                    <AnimatedElement animation='blur'>
                        <ButtonText className='text-sm font-semibold '>{t('cta.appointment')}</ButtonText>
                    </AnimatedElement>
                </div>
            </section>

            <section className="mt-16 pb-16">
                <FAQ data={faqData} />
            </section>
        </div>
    )
}

export default PricingContent