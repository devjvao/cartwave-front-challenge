'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Menu, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {cn} from '@/utils/cn';
import {WHATSAPP_URL, APP_URL} from '@/constants';

const navLinks = [
    {labelKey: 'nav.inicio', href: '#inicio'},
    {labelKey: 'nav.solucoes', href: '#solucoes'},
    {labelKey: 'nav.produtos', href: '#produtos'},
    {labelKey: 'nav.contato', href: '#contato'},
] as const;

export function Header() {
    const t = useTranslations('header');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50',
                'bg-background/95 backdrop-blur-sm border-b border-border',
            )}
        >
            <div className="max-w-content mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        aria-label={t('aria.logo')}
                        className={cn(
                            'rounded',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        )}
                    >
                        <Image
                            src="/catwave-logo.png"
                            alt="Cartwave"
                            width={160}
                            height={40}
                            priority
                            className="h-8 w-auto"
                        />
                    </Link>

                    <nav aria-label={t('aria.mainNav')} className="hidden md:flex items-center gap-8">
                        {navLinks.map(({labelKey, href}) => (
                            <a
                                key={href}
                                href={href}
                                className={cn(
                                    'rounded',
                                    'text-foreground',
                                    'transition-colors',
                                    'hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                                )}
                            >
                                {t(labelKey)}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href={APP_URL}
                            className={cn(
                                'inline-flex items-center justify-center gap-2',
                                'px-4 py-2',
                                'h-10',
                                'whitespace-nowrap rounded-md ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                                'text-sm font-medium text-foreground',
                                'transition-colors',
                                'hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                            )}
                        >
                            {t('entrar')}
                        </a>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'inline-flex items-center justify-center gap-2',
                                'px-4 py-2',
                                'h-10',
                                'whitespace-nowrap rounded-md ring-offset-background bg-primary bg-linear-to-r from-primary to-secondary shadow-soft [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                                'text-sm font-medium text-white',
                                'transition-colors',
                                'hover:bg-primary/90 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                            )}
                        >
                            {t('especialista')}
                        </a>
                    </div>

                    <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? t('aria.closeMenu') : t('aria.openMenu')}
                        onClick={() => setIsOpen((prev) => !prev)}
                        className={cn(
                            'md:hidden',
                            'p-2',
                            'rounded-lg',
                            'text-muted-foreground',
                            'transition-colors',
                            'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        )}
                    >
                        {isOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
                    </button>
                </div>

                {isOpen && (
                    <div
                        id="mobile-menu"
                        className="md:hidden mt-4 pb-4 border-t border-border"
                    >
                        <nav aria-label={t('aria.mobileNav')} className="flex flex-col space-y-4 mt-4">
                            {navLinks.map(({labelKey, href}) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-foreground hover:text-primary transition-colors"
                                >
                                    {t(labelKey)}
                                </a>
                            ))}
                            <div className="flex flex-col space-y-2 pt-4">
                                <a
                                    href={APP_URL}
                                    className={cn(
                                        'inline-flex items-center justify-start gap-2',
                                        'px-4 py-2',
                                        'h-10',
                                        'whitespace-nowrap rounded-md ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                                        'text-sm font-medium',
                                        'transition-colors',
                                        'hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    )}
                                >
                                    {t('entrar')}
                                </a>
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'inline-flex items-center justify-start gap-2',
                                        'px-4 py-2',
                                        'h-10',
                                        'whitespace-nowrap rounded-md ring-offset-background bg-primary bg-linear-to-r from-primary to-secondary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                                        'text-sm font-medium text-white',
                                        'transition-colors',
                                        'hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    )}
                                >
                                    {t('abrirConta')}
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
