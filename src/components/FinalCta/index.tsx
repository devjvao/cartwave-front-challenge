import {getTranslations} from 'next-intl/server';
import {ArrowRight, MessageCircle} from 'lucide-react';
import {APP_URL, WHATSAPP_URL} from '@/constants';
import {cn} from '@/utils/cn';

const benefitKeys = ['implementation', 'support', 'fees'] as const;

export async function FinalCta() {
    const t = await getTranslations('finalCta');

    return (
        <section
            id="contato"
            aria-labelledby="cta-heading"
            className={cn(
                'relative',
                'py-24',
                'overflow-hidden bg-linear-to-r from-primary via-primary to-secondary',
                'text-white',
            )}
        >
            <div className="absolute inset-0 opacity-10">
                <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0px)', backgroundSize: '40px 40px'}}
                />
            </div>

            <div className="max-w-content mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2
                        id="cta-heading"
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        {t('heading')}
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        {t('subheading')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                    <a
                            href={APP_URL}
                            className={cn(
                                'inline-flex items-center justify-center gap-2',
                                'px-8 py-4',
                                'h-auto',
                                'whitespace-nowrap rounded-md ring-offset-background border border-white bg-white [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                                'text-lg font-medium text-primary',
                                'transition-colors',
                                'hover:bg-white/90 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                            )}
                        >
                            {t('cta.primary')}
                            <ArrowRight className="ml-2 h-5 w-5"/>
                        </a>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'inline-flex items-center justify-center gap-2',
                                'px-8 py-4',
                                'h-auto',
                                'whitespace-nowrap rounded-md ring-offset-background border border-white/30 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                                'text-lg font-medium text-white',
                                'transition-colors',
                                'hover:bg-white/10 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                            )}
                        >
                            <MessageCircle className="mr-2 h-5 w-5"/>
                            {t('cta.secondary')}
                        </a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {benefitKeys.map((key) => (
                            <div key={key} className="space-y-3">
                                <h3 className="text-lg font-semibold">
                                    {t(`benefits.${key}.title`)}
                                </h3>
                                <p className="opacity-90 text-sm">
                                    {t(`benefits.${key}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
