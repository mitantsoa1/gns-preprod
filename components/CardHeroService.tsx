// components/ServiceCard.jsx
import React from 'react';
import LearnMore from './learn-more';
import Image from 'next/image';

const CardHeroService = ({
    title,
    description,
    icon,
    bg = 'bg-transparent',
    EnSavoirDAvantage = "En savoir d'avantage"
}: { title: string, description: string, icon: string, bg?: string, EnSavoirDAvantage?: string }) => {

    return (
        <div className={`${bg} relative rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow px-4 pt-2 py-4 flex flex-col justify-between min-h-[200px]`}>
            {/* En-tête */}
            <div className='flex items-start gap-2 mb-2'>
                <Image src={icon} alt="" width={24} height={24} className='mt-1' />
                <h2 className="text-lg font-bold text-black">{title}</h2>
            </div>

            <p className="text-black text-sm flex-grow">{description}</p>

            <div className='mt-0'>
                <LearnMore text={EnSavoirDAvantage} textClassName='text-black font-semibold' />
            </div>
        </div>
    );
};

export default CardHeroService;