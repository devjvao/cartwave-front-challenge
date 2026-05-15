'use client';

import {useState, type SubmitEvent} from 'react';
import {useTranslations} from 'next-intl';
import {cn} from '@/utils/cn';
import {ArrowRight} from 'lucide-react';

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function NewsletterForm() {
    const t = useTranslations('footer');
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;

        if (!isValidEmail(email)) {
            setError(t('newsletter.emailError'));
            return;
        }

        setError(null);
    }

    return (
        <form aria-label={t('newsletter.formAriaLabel')} onSubmit={handleSubmit}>
            <div className="flex space-x-2">
                <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    placeholder={t('newsletter.placeholder')}
                    onChange={() => { if (error) setError(null); }}
                    className={cn(
                        'flex',
                        'h-10 w-full',
                        'px-3 py-2',
                        'rounded-md ring-offset-background bg-white/10 file:border-0 file:bg-transparent',
                        error ? 'border border-red-400' : 'border border-white/20',
                        'text-base md:text-sm text-white file:text-sm file:font-medium file:text-foreground placeholder:text-white/60',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    )}
                />
                <button
                    type="submit"
                    className={cn(
                        'inline-flex items-center justify-center gap-2',
                        'px-3',
                        'h-9',
                        'whitespace-nowrap rounded-md ring-offset-background bg-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                        'text-sm font-medium text-white',
                        'transition-colors',
                        'hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    )}
                >
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
            {error && (
                <p className="text-xs text-red-400 mt-2">{error}</p>
            )}
            <p className="text-xs text-white/60 mt-3">
                {t('newsletter.privacy')}
            </p>
        </form>
    );
}
