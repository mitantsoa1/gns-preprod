import { Clock4 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const HeroCard = ({ image, description, className }: { image: string, description: string, className: string }) => {
    const t = useTranslations('news.mainCard')
    return (
        <div className={`${className} w-full  rounded-2xl relative py-4 px-4 md:px-2`}
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>

            {/* Overlay */}
            <div className="w-full h-full absolute top-0 left-0 bg-black/40 rounded-2xl"></div>

            {/* Contenu */}
            <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Description PLUS BAS */}
                <div className="w-full flex items-start text-left pt-32"> {/* ← pt-8 au lieu de pt-4 */}
                    <p className='text-white text-left text-lg font-semibold'>{description}</p>
                </div>

                {/* Bouton et date en bas */}
                <div className='w-full flex items-center justify-between'>
                    {/* Bouton Consulter */}
                    <div className="flex items-center gap-2 text-white hover:gap-3 transition-all cursor-pointer">
                        <span>{t('consult')}</span>
                        <Image
                            src="/news/arrow-right.svg"
                            alt="arrow-right"
                            width={40}
                            height={40}
                        />
                    </div>

                    {/* Date et horloge alignés */}
                    <div className='flex items-center gap-2 border border-white/20 rounded-2xl px-2 py-1 bg-gray-400/20'>
                        <span className='text-white text-xs md:text-sm'>{t('timeAgo')}</span>
                        <Clock4 className='text-white w-4 h-4' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroCard