"use client"

import { FaqData } from '@/types'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import React, { useState } from 'react'

const FAQ = ({ data }: { data: FaqData[] }) => {
    const [openItem, setOpenItem] = useState<number | null>(null)

    const toggleItem = (id: number) => {
        setOpenItem(prev => prev === id ? null : id)
    }

    return (
        <div className='max-w-7xl mx-auto px-4 bg-white shadow-lg rounded-2xl w-full flex'>
            {/* Partie gauche */}
            <div className='w-1/2 py-8 pl-6'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-xl font-semibold'>Des questions ? <br />On est là pour vous !
                    </h1>
                    <p className='text-sm max-w-sm'>
                        Nos conseillers sont disponibles pour répondre à toutes vos interrogations et vous accompagner à chaque étape.
                    </p>
                    <div className='inline-flex gap-2'>
                        <span className='text-gray-600 font-semibold'>Plus de FAQs </span>
                        <ArrowRight className='text-gray-600 mt-1' />
                    </div>
                </div>
            </div>

            {/* Partie droite */}
            <div className='w-1/2 py-8 pl-6 pr-6'>
                {data.map((item: FaqData) => {
                    const isOpen = openItem === item.id

                    return (
                        <div
                            key={item.id}
                            className='border-b border-gray-200 last:border-b-0'
                        >
                            {/* Question avec icône */}
                            <button
                                onClick={() => toggleItem(item.id)}
                                className='flex justify-between items-center w-full py-4 text-left hover:bg-gray-50 px-2 rounded-lg transition-colors'
                            >
                                <h2 className='font-semibold text-md pr-4'>{item.question}</h2>
                                <span className='flex-shrink-0'>
                                    {isOpen ? (
                                        <Minus className='w-5 h-5 text-gray-600' />
                                    ) : (
                                        <Plus className='w-5 h-5 text-gray-600' />
                                    )}
                                </span>
                            </button>

                            {/* Réponse (conditionnelle) */}
                            {isOpen && (
                                <div className='pb-4 px-2'>
                                    <p className='text-sm text-gray-700 leading-relaxed'>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FAQ