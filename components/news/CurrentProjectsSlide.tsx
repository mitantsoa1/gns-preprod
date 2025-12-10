import React from 'react'
import ReleaseCard from './ReleaseCard2'
import LearnMore from '../learn-more'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CurrentProjectsSlide = () => {
    return (

        <div className='grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6'>
            {/* Carte 1 */}
            <ReleaseCard
                title='#ExpertiseLocale'
                description='Nos équipes vous accompagnent à chaque étape pour transformer vos idées en ouvrages concrets'
                date='04 avril, 2025'
                image='/news/release1.svg'
                className='h-full'
            />

            {/* Carte 2 */}
            <ReleaseCard
                title='#ExpertiseLocale'
                description='Nos équipes vous accompagnent à chaque étape pour transformer vos idées en ouvrages concrets'
                date='04 avril, 2025'
                image='/news/release2.svg'
                className='h-full'
            />

            {/* Carte 3 */}
            <ReleaseCard
                title='#ExpertiseLocale'
                description='Nos équipes vous accompagnent à chaque étape pour transformer vos idées en ouvrages concrets'
                date='04 avril, 2025'
                image='/news/release3.svg'
                className='h-full'
            />

            {/* Carte 4 */}
            <ReleaseCard
                title='#ExpertiseLocale'
                description='Nos équipes vous accompagnent à chaque étape pour transformer vos idées en ouvrages concrets'
                date='04 avril, 2025'
                image='/news/release1.svg'
                className='h-full'
            />

            {/* Flèche pour carousel - visible seulement sur desktop */}
            <div className="hidden lg:flex rounded-lg items-center justify-center h-full min-h-[200px]">
                <div className='flex flex-col items-center justify-center gap-2'>
                    <ChevronRight className='w-10 h-10 text-gray-400 hover:text-black transition-colors cursor-pointer' />
                    <span className='text-sm text-gray-500'>Voir plus</span>
                </div>
            </div>

            {/* LearnMore - positionné correctement */}
            <div className="col-span-full xs:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 mt-4 sm:mt-6 flex justify-center sm:justify-start">
                <LearnMore
                    text="En savoir d'avantage"
                    textClassName='text-gray-600 text-sm sm:text-base'
                    className='text-gray-600 text-sm sm:text-base'
                    arrowColor='#718096'
                />
            </div>
        </div>
    )
}

export default CurrentProjectsSlide