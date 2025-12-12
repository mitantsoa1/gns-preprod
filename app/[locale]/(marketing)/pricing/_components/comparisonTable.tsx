// components/ComparisonTable.tsx
'use client';

import { Product, Service } from '@/lib/generated/prisma/client';
import { Minus } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ComparisonTableProps {
    products: Product[];
    services: Service[];
    customQuoteLabel?: string;
    showCustomQuoteColumn?: boolean;
}

export default function ComparisonTable({
    products,
    services,
    customQuoteLabel = "Devis personnalisé",
    showCustomQuoteColumn = true
}: ComparisonTableProps) {
    const locale = useLocale()
    return (
        <div className="max-w-7xl mx-auto">
            {/* En-tête du tableau */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-max ">
                    <thead>
                        <tr className="bg-transparent">
                            {/* Première colonne vide en haut à gauche */}
                            <th className="p-4 "></th>

                            {/* En-tête : Nom des produits */}
                            {products.map(product => (
                                <th key={product.id} className="p-4  text-center min-w-[200px]">
                                    <div className="space-y-2">
                                        {/* {product.isPopular && (
                                            <div className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                                ★ Populaire
                                            </div>
                                        )} */}

                                        <div className="font-bold text-lg">
                                            {locale === 'fr' ? product.nameFr : product.name}
                                        </div>

                                        <div className="text-2xl font-bold text-blue-600">
                                            {product.price}€
                                            {product.unit && (
                                                <span className="text-sm text-gray-500">/{product.unit}</span>
                                            )}
                                        </div>

                                        {/* {product.delay && (
                                            <div className="text-sm text-gray-500">
                                                Délai: {product.delay}
                                            </div>
                                        )} */}
                                    </div>
                                </th>
                            ))}

                            {/* Colonne Devis personnalisé */}
                            {showCustomQuoteColumn && (
                                <th className="p-4  text-center min-w-[200px] ">
                                    <div className="space-y-2">
                                        <div className="font-bold text-lg ">
                                            {locale === 'fr' ? 'Devis personnalisé' : 'Custom Quote'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {locale === 'fr' ? 'Personnalisé selon vos besoins' : 'Customized according to your needs'}
                                        </div>
                                    </div>
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Chaque ligne = un service */}
                        {services.map((service, index) => (
                            // <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <tr key={service.id} className='bg-transparent'>
                                {/* Nom du service dans la première colonne */}
                                <td className={`p-4 font-medium bg-white ${index === 0 ? 'rounded-tl-2xl' :
                                    index === services.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                                    {service.nameFr || service.name}
                                </td>

                                {/* Cases pour chaque produit */}
                                {products.map((product, productIndex) => {
                                    const isIncluded = product.serviceIds.includes(service.id);
                                    return (
                                        <td
                                            key={`${service.id}-${product.id}`}
                                            className={`p-4 text-center ml-2 bg-white `}
                                        >
                                            {isIncluded ? (
                                                <div className="flex justify-center">
                                                    <div className="w-8 h-8 bg-jaune rounded-full flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center">
                                                    <Minus className="w-6 h-6 text-gray-600" />
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}

                                {/* Colonne Devis personnalisé - TOUJOURS ✓ */}
                                {showCustomQuoteColumn && (
                                    <td className={`p-4  text-center bg-white ${index === 0 ? 'rounded-tr-2xl' :
                                        index === services.length - 1 ? 'rounded-br-2xl' : ''}`}>
                                        <div className="flex justify-center">
                                            <div className="w-8 h-8 bg-jaune rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>

                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}