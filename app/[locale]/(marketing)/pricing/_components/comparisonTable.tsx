// components/ComparisonTable.tsx
'use client';

import { Product, Service } from '@/lib/generated/prisma/client';

interface ComparisonTableProps {
    products: Product[];
    services: Service[];
}

export default function ComparisonTable({ products, services }: ComparisonTableProps) {
    return (
        <div className="w-full">
            {/* En-tête du tableau */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                    <thead>
                        <tr className="bg-gray-50">
                            {/* Première colonne vide en haut à gauche */}
                            <th className="p-4 border"></th>

                            {/* En-tête : Nom des produits */}
                            {products.map(product => (
                                <th key={product.id} className="p-4 border text-center min-w-[200px]">
                                    <div className="space-y-2">
                                        {product.isPopular && (
                                            <div className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                                ★ Populaire
                                            </div>
                                        )}

                                        <div className="font-bold text-lg">
                                            {product.nameFr || product.name}
                                        </div>

                                        <div className="text-2xl font-bold text-blue-600">
                                            {product.price}€
                                            {product.unit && (
                                                <span className="text-sm text-gray-500">/{product.unit}</span>
                                            )}
                                        </div>

                                        {product.delay && (
                                            <div className="text-sm text-gray-500">
                                                Délai: {product.delay}
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Chaque ligne = un service */}
                        {services.map((service, index) => (
                            <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {/* Nom du service dans la première colonne */}
                                <td className="p-4 border font-medium">
                                    {service.nameFr || service.name}
                                </td>

                                {/* Cases pour chaque produit */}
                                {products.map(product => {
                                    const isIncluded = product.serviceIds.includes(service.id);
                                    return (
                                        <td key={`${service.id}-${product.id}`} className="p-4 border text-center">
                                            {isIncluded ? (
                                                <div className="flex justify-center">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center">
                                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Légende */}
            <div className="mt-6 flex justify-center space-x-6">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium">Service inclus</span>
                </div>

                <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium">Service non inclus</span>
                </div>
            </div>
        </div>
    );
}