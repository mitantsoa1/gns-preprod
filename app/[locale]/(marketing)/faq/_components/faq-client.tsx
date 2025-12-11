'use client';

import { useTranslations } from "next-intl";

export default function FaqClientPage() {
    const t = useTranslations('faqPage');

    const faqs = [
        {
            question: t('items.islandWide.question'),
            answer: t('items.islandWide.answer')
        },
        {
            question: t('items.quoteDelay.question'),
            answer: t('items.quoteDelay.answer')
        },
        {
            question: t('items.warranty.question'),
            answer: t('items.warranty.answer')
        },
        {
            question: t('items.monitoring.question'),
            answer: t('items.monitoring.answer')
        },
        {
            question: t('items.turnkey.question'),
            answer: t('items.turnkey.answer')
        },
        {
            question: t('items.payment.question'),
            answer: t('items.payment.answer')
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl pt-32">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
                <p className="text-muted-foreground text-lg">
                    {t('description')}
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <details
                        key={index}
                        className="group border rounded-lg bg-card open:ring-1 open:ring-primary/20 overflow-hidden transition-all"
                    >
                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors list-none">
                            <span className="font-semibold text-lg">{faq.question}</span>
                            <span className="transform transition-transform duration-200 group-open:rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-muted-foreground"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </span>
                        </summary>
                        <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
                            {faq.answer}
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
}
