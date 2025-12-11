import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';

interface Product {
    id: string;
    name: string;
    nameFr?: string;
    price: number;
    delay?: string;
    serviceIds: number[];
}

interface Service {
    id: number;
    name: string;
    nameFr?: string;
}

interface Props {
    products: Product[];
    services: Service[];
}

export default function ComparisonPage({ products, services }: Props) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Comparaison des Services par Produit
            </h1>

            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full">
                    {/* En-tête du tableau */}
                    <thead>
                        <tr className="bg-gray-100">
                            {/* Colonne Services */}
                            <th className="p-4 text-left border-r min-w-[250px]">
                                <span className="font-bold">Services</span>
                            </th>

                            {/* Colonnes pour chaque produit */}
                            {products.map(product => (
                                <th key={product.id} className="p-4 text-center border-r">
                                    <div className="font-bold">{product.nameFr || product.name}</div>
                                    <div className="text-blue-600 font-semibold mt-1">
                                        {product.price}€
                                    </div>
                                    {product.delay && (
                                        <div className="text-sm text-gray-500 mt-1">
                                            Délai: {product.delay}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Corps du tableau */}
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id} className="border-b hover:bg-gray-50">
                                {/* Nom du service */}
                                <td className="p-4 border-r font-medium">
                                    {service.nameFr || service.name}
                                </td>

                                {/* Cases à cocher pour chaque produit */}
                                {products.map(product => {
                                    const isIncluded = product.serviceIds.includes(service.id);
                                    return (
                                        <td key={`${service.id}-${product.id}`} className="p-4 text-center border-r">
                                            {isIncluded ? (
                                                <span className=" w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className=" w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                                                    ✗
                                                </span>
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
            <div className="mt-6 flex justify-center space-x-8">
                <div className="flex items-center">
                    <span className=" w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">
                        ✓
                    </span>
                    <span>Service inclus</span>
                </div>
                <div className="flex items-center">
                    <span className=" w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-2">
                        ✗
                    </span>
                    <span>Service non inclus</span>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { price: 'asc' },
            select: {
                id: true,
                name: true,
                nameFr: true,
                price: true,
                delay: true,
                serviceIds: true
            }
        });

        const services = await prisma.service.findMany({
            orderBy: { id: 'asc' },
            select: {
                id: true,
                name: true,
                nameFr: true
            }
        });

        return {
            props: {
                products: JSON.parse(JSON.stringify(products)),
                services: JSON.parse(JSON.stringify(services))
            }
        };
    } catch (error) {
        console.error('Erreur:', error);
        return {
            props: {
                products: [],
                services: []
            }
        };
    }
};