import { Calendar1 } from 'lucide-react'
import React from 'react'
import AnimatedElement from '../animations/AnimatedElement'
import { useTranslations } from 'next-intl'

interface ReleaseCardProps {
    image: string
    description: string
    title: string
    date: string
    className?: string
}

const ReleaseCard = ({ image, description, title, date, className = '' }: ReleaseCardProps) => {

    return (
        <AnimatedElement animation="fade" delay={0.4}>
            <div className={`bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200 ${className}`}>
                {/* Image */}
                <div className='w-full px-4 pt-4'>
                    <img
                        className="h-32 sm:h-40 w-full object-cover"
                        src={image}
                        alt={title}
                        loading="lazy"
                        style={{
                            marginTop: '20px'
                        }}
                    />
                </div>

                {/* Contenu */}
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h1 className='text-base sm:text-lg font-bold text-gray-500 mb-1 sm:mb-2'>{title}</h1>
                    <p className='text-gray-700 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-3'>
                        {description}
                    </p>
                    <div className='flex items-center gap-2 text-gray-500 mt-auto'>
                        <Calendar1 size={14} className='w-3 h-3 sm:w-4 sm:h-4' />
                        <span className='text-xs sm:text-sm'>{date}</span>
                    </div>
                </div>
            </div>
        </AnimatedElement>
    )
}

export default ReleaseCard