import Image from 'next/image'
import React from 'react'
import AnimatedElement from '../animations/AnimatedElement';

interface RealistationCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
}

const RealistationCard = ({ title, description, image, date }: RealistationCardProps) => {
  return (
    <AnimatedElement animation="blur">
      <div className="h-auto flex items-center justify-center py-4 relative z-0" >
        {/* Container avec fond gris */}

        {/* Card blanche avec shadow et encoches */}
        <div className=" p-6 relative overflow-hidden rounded-2xl sm:"
          style={{
            backgroundImage: `url(/projects/Subtract.svg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >

          {/* Badge jaune positionné en haut à droite - OVERLAPPING */}
          <div className="absolute top-2 right-0 md:top-1 sm:right-0 md:right-0  lg:-right-1 xl:right-2 rounded-full flex items-center justify-center shadow-lg z-20">
            <Image
              src="/projects/arrow-bg-yellow.svg"
              alt="arrow"
              width={80}
              height={80}
              className="w-16 h-16 lg:w-14 lg:h-14"
            />
          </div>

          {/* Contenu */}
          <div>
            {/* Titre */}
            <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight w-1/2">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {description}
            </p>

            {/* Image avec coins arrondis */}
            <div className="rounded-2xl overflow-hidden mb-6 h-44 bg-gray-200"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
            </div>

            {/* Date */}
            <p className="text-gray-600 text-sm font-medium">
              Publié le : 12 février 2024
            </p>
          </div>
        </div>
      </div>
    </AnimatedElement>
  )
}

export default RealistationCard