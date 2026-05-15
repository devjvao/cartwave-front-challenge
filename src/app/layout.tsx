import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {getLocale} from 'next-intl/server';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Cartwave Instituição de Pagamento',
    description: 'API de Pix, Emissão de Boletos e muito mais. Simplifique suas operações financeiras com a Cartwave.',
    icons: {
        icon: '/catwave-small-logo.png',
    },
};

export default async function RootLayout({children}: {children: ReactNode}) {
    const locale = await getLocale();
    return (
        <html lang={locale} className="light" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
