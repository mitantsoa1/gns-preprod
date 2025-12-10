"use client"
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ButtonText from '@/components/ButtonText';
import { useProductStore } from '@/store/product-store';
import { getProductById } from '@/actions/product-actions';
import { Product } from '@/lib/generated/prisma/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { User } from "better-auth/types";

const ProductDetailClient = () => {
    const { id: productId } = useParams<{ id: string }>();
    const t = useTranslations('pricing');
    const router = useRouter();
    const { selectedProduct, setSelectedProduct } = useProductStore();
    const [product, setProduct] = useState<Product | null>(selectedProduct);
    const [loading, setLoading] = useState(!selectedProduct);
    const [isStripeLoading, setIsStripeLoading] = useState(false);
    const locale = useLocale()
    const { user: session } = useAuth();

    const pathname = usePathname();

    useEffect(() => {
        if (!selectedProduct || selectedProduct.id !== productId) {
            setLoading(true);
            getProductById(productId).then(p => {
                if (p) {
                    setProduct(p);
                    setSelectedProduct(p);
                }
                setLoading(false);
            });
        }
    }, [productId, selectedProduct, setSelectedProduct]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>{t('planNotFound')}</div>;
    }

    console.log('sess', session)

    const handleCheckout = async () => {
        if (!session) {
            router.push(`/${locale}/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        setIsStripeLoading(true);
        try {

            const response = await fetch('/api/stripe/checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: product.id }),
            });

            if (!response.ok) {
                toast.error(`HTTP error! status: ${response.status}`);
            }

            const { session } = await response.json();

            router.push(session.url)

        } catch (error) {
            console.error('Checkout error:', error);

            // Gestion d'erreur utilisateur
            toast.error('Erreur lors de la création du paiement. Veuillez réessayer.');
            router.push(`/${locale}/cancel`);

        } finally {
            setIsStripeLoading(false)
        }
    };

    return (
        <div className="bg-[#eee9ed] m-0 pt-32">
            <section className="max-w-4xl mx-auto px-4 pb-10">
                <h1 className="text-4xl font-bold text-center mb-8">{product.name}</h1>
                <div className="bg-slate-100 p-8 rounded-lg shadow-lg">
                    <p className="text-2xl font-extrabold text-center mb-4">{product.price.toLocaleString('fr-FR')} €</p>

                    <p className="text-center mb-8">{product.description}</p>
                    <div className="flex justify-center">
                        <ButtonText className="text-lg font-semibold hover:cursor-pointer" onClick={handleCheckout}>
                            {t('cta.buy')}
                        </ButtonText>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailClient;
