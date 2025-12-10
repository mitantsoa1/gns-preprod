
import type { Metadata } from 'next';
import NewsClientPage from './_components/news-client';

export const metadata: Metadata = {
    title: 'News',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function NewsPage() {
    return <NewsClientPage />;
}