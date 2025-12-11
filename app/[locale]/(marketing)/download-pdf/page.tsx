
import type { Metadata } from 'next';
import DownloadPdfClientPage from './_components/download-pdf-client';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
    title: 'Download Documents',
    description: 'Download our documents and resources.',
};

type Document = {
    title: string;
    description: string;
    size: string;
    date: string;
    url: string;
};

function formatBytes(bytes: number, decimals = 1) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function getDocuments(dir: string, baseDir: string): Document[] {
    let results: Document[] = [];

    // Check if directory exists
    if (!fs.existsSync(dir)) {
        return [];
    }

    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(getDocuments(filePath, baseDir));
        } else {
            const relativePath = path.relative(baseDir, filePath);
            // Convert backslashes to forward slashes for URL and ensure it starts with /doc/
            const url = `/doc/${relativePath.split(path.sep).join('/')}`;

            // Create a readable title from the filename
            const filename = path.basename(file, path.extname(file));
            const title = filename
                .split(/[-_]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            results.push({
                title: title,
                description: path.extname(file).substring(1).toUpperCase() + ' Document', // Use extension as description
                size: formatBytes(stat.size),
                date: formatDate(stat.mtime),
                url: url
            });
        }
    });

    return results;
}

export default function DownloadPdfPage() {
    const docDir = path.join(process.cwd(), 'public', 'doc');
    const documents = getDocuments(docDir, docDir);

    // Sort documents by date (newest first) or name? Let's sort by name for consistency
    documents.sort((a, b) => a.title.localeCompare(b.title));

    return <DownloadPdfClientPage initialDocuments={documents} />;
}
