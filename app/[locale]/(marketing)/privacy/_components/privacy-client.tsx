'use client';

import { useTranslations } from "next-intl";

export default function PrivacyClientPage() {
    const t = useTranslations('privacyPage');

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl pt-36">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

                <div className="prose prose-slate max-w-none dark:prose-invert">
                    <p className="text-lg text-muted-foreground mb-8">
                        {t('lastUpdated', { date: '01 Janvier 2025' })}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('sections.intro.title')}</h2>
                        <p className="mb-4">
                            {t('sections.intro.content')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('sections.collection.title')}</h2>
                        <p className="mb-4">
                            {t('sections.collection.content')}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li dangerouslySetInnerHTML={{ __html: t.raw('sections.collection.list.item1') }}></li>
                            <li dangerouslySetInnerHTML={{ __html: t.raw('sections.collection.list.item2') }}></li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('sections.usage.title')}</h2>
                        <p className="mb-4">
                            {t('sections.usage.content')}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>{t('sections.usage.list.item1')}</li>
                            <li>{t('sections.usage.list.item2')}</li>
                            <li>{t('sections.usage.list.item3')}</li>
                            <li>{t('sections.usage.list.item4')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('sections.protection.title')}</h2>
                        <p className="mb-4">
                            {t('sections.protection.content')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('sections.cookies.title')}</h2>
                        <p className="mb-4">
                            {t('sections.cookies.content')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('sections.rights.title')}</h2>
                        <p className="mb-4">
                            {t('sections.rights.content')}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>{t('sections.rights.list.item1')}</li>
                            <li>{t('sections.rights.list.item2')}</li>
                            <li>{t('sections.rights.list.item3')}</li>
                            <li>{t('sections.rights.list.item4')}</li>
                            <li>{t('sections.rights.list.item5')}</li>
                        </ul>
                        <p className="mb-4">
                            {t('sections.rights.contact')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{t('sections.contact.title')}</h2>
                        <p className="mb-4">
                            {t('sections.contact.content')}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
