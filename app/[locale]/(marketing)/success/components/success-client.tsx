"use client";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ButtonText from '@/components/ButtonText';

const SuccessClientPage = () => {
    const t = useTranslations('success');
    return (
        <div className="bg-[#eee9ed] m-0 pt-32 text-center min-h-screen">
            <section className="max-w-4xl mx-auto px-4 pb-10">
                <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
                <p className="mb-8">{t('message')}</p>
                <Link href="/">
                    <ButtonText>{t('cta')}</ButtonText>
                </Link>
            </section>
        </div>
    );
};

export default SuccessClientPage;