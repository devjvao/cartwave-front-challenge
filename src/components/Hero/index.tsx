import {getTranslations} from 'next-intl/server';
import {CheckCircle, ArrowRight} from 'lucide-react';
import {WHATSAPP_URL} from '@/constants';
import {cn} from '@/utils/cn';
import {TransactionRow} from './TransactionRow';

export async function Hero() {
    const t = await getTranslations('hero');

    const features = (t.raw('features') as string[])

    return (
        <section
            id="inicio"
            aria-labelledby="hero-heading"
            className={cn(
                'flex items-center',
                'relative',
                'min-h-screen overflow-hidden',
                'bg-linear-to-br from-accent via-background to-muted',
            )}
        >
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 animate-pulse" />
            </div>

            <div className="max-w-content mx-auto px-6 py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-in fade-in-0 duration-500 ease-in">
                        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-6 duration-500 ease-out delay-50">
                            <h1
                                id="hero-heading"
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                            >
                                {t.rich('heading', {
                                    highlight: (chunks) => (
                                        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">{chunks}</span>
                                    ),
                                })}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                {t('subheading')}
                            </p>
                        </div>
                        <div className="space-y-4">
                            {features.map(feature => (
                                <div
                                    key={feature}
                                    className={cn(
                                        'flex items-center space-x-3',
                                        'animate-in fade-in-0 slide-in-from-bottom-6 duration-500 ease-out delay-100',
                                    )}
                                >
                                    <CheckCircle aria-hidden className="h-5 w-5 text-primary shrink-0" />
                                    <span className="text-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'inline-flex items-center justify-center gap-4 group',
                                    'px-8',
                                    'h-11',
                                    'whitespace-nowrap rounded-md ring-offset-background bg-primary bg-linear-to-r from-primary to-secondary shadow-hero [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                                    'text-sm font-medium text-primary-foreground',
                                    'transition-colors',
                                    'hover:bg-primary/90 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    'animate-in fade-in-0 slide-in-from-bottom-6 duration-500 ease-out delay-200',
                                )}
                            >
                                {t('cta.primary')}
                                <ArrowRight aria-hidden className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'inline-flex items-center justify-center gap-2',
                                    'px-8',
                                    'h-11',
                                    'whitespace-nowrap rounded-md ring-offset-background border border-primary bg-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                                    'text-sm font-medium text-primary',
                                    'transition-colors',
                                    'hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                    'animate-in fade-in-0 slide-in-from-bottom-8 duration-500 ease-out delay-200',
                                )}
                            >
                                {t('cta.secondary')}
                            </a>
                        </div>
                        <div className="pt-6 animate-in fade-in-0 slide-in-from-bottom-6 duration-500 ease-out delay-300">
                            <p className="text-sm text-muted-foreground mb-3">{t('badge')}</p>
                            <div className="flex items-center space-x-6 opacity-60">
                                <div className="h-8 w-20 bg-muted rounded"></div>
                                <div className="h-8 w-20 bg-muted rounded"></div>
                                <div className="h-8 w-20 bg-muted rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="relative animate-card-enter">
                        <div className="relative bg-card rounded-2xl shadow-hero p-8 mx-auto max-w-lg">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between"><h3
                                    className="font-semibold text-secondary">{t('dashboard.title')}</h3>
                                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                                </div>
                                <div className="space-y-4">
                                    <TransactionRow
                                        iconBgClass="bg-primary"
                                        iconColorClass="text-primary-foreground"
                                        label={t('dashboard.transactions.pix.label')}
                                        time={t('dashboard.transactions.pix.time')}
                                        amount={t('dashboard.transactions.pix.amount')}
                                    />
                                    <TransactionRow
                                        iconBgClass="bg-secondary"
                                        iconColorClass="text-secondary-foreground"
                                        label={t('dashboard.transactions.boleto.label')}
                                        time={t('dashboard.transactions.boleto.time')}
                                        amount={t('dashboard.transactions.boleto.amount')}
                                    />
                                    <TransactionRow
                                        iconBgClass="bg-primary"
                                        iconColorClass="text-secondary-foreground"
                                        label={t('dashboard.transactions.split.label')}
                                        time={t('dashboard.transactions.split.time')}
                                        amount={t('dashboard.transactions.split.amount')}
                                    />
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 h-8 w-8 bg-primary rounded-full animate-bounce"></div>
                            <div className="absolute -bottom-4 -left-4 h-6 w-6 bg-secondary rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
