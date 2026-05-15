import {getTranslations} from 'next-intl/server';
import {
    Timer,
    Shield,
    Headphones,
    TrendingUp,
    Code,
    Clock,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import {valueProps} from '@/content';
import {cn} from '@/utils/cn';
import {styles} from './styles';

const iconMap: Record<string, LucideIcon> = {
    Timer,
    Shield,
    Headphones,
    TrendingUp,
    Code,
    Clock,
};

export async function WhyCartwave() {
    const t = await getTranslations('whyCartwave');

    return (
        <section
            id="solucoes"
            aria-labelledby="why-heading"
            className="py-24 bg-background"
        >
            <div className="max-w-content mx-auto px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2
                        id="why-heading"
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    >
                        {t.rich('heading', {
                            highlight: (chunks) => (
                                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">{chunks}</span>
                            ),
                        })}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subheading')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {valueProps.map((prop) => {
                        const Icon = iconMap[prop.iconName] ?? Zap;
                        return (
                            <article
                                key={prop.id}
                                className={cn(
                                    'rounded-lg border border-border/50 bg-card text-card-foreground shadow-sm group',
                                    'transition-all duration-300',
                                    'hover:shadow-card hover:border-primary/50',
                                )}
                            >
                                <div className="p-8 text-center">
                                    <div className="mb-6">
                                        <div
                                            className={cn(
                                                'flex items-center justify-center',
                                                'mx-auto',
                                                'w-16 h-16',
                                                'rounded-full bg-linear-to-r from-primary/10 to-secondary/10',
                                                'transition-all',
                                                'group-hover:from-primary/20 group-hover:to-secondary/20',
                                            )}
                                        >
                                            <Icon aria-hidden className="h-8 w-8 text-primary" />
                                        </div>
                                    </div>
                                    <h3
                                        className={cn(
                                            'mb-3',
                                            'text-xl font-semibold text-foreground',
                                            'transition-colors',
                                            'group-hover:text-primary',
                                        )}
                                    >
                                        {t(`items.${prop.id}.title`)}
                                    </h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {t(`items.${prop.id}.description`)}
                                    </p>
                                    <div className="border-t border-border pt-6">
                                        <p className="text-sm text-muted-foreground">
                                            {t.rich(`items.${prop.id}.metric`, {
                                                highlight: (chunks) => (
                                                    <span
                                                        className={cn(
                                                            'block',
                                                            'mb-1',
                                                            'bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent',
                                                            'text-3xl font-bold',
                                                        )}
                                                    >
                                                        {chunks}
                                                    </span>
                                                ),
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="space-y-2">
                        <div className={styles.metricValue}>
                            {t('metrics.companies.value')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            {t('metrics.companies.label')}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className={styles.metricValue}>
                            {t('metrics.volume.value')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            {t('metrics.volume.label')}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className={styles.metricValue}>
                            {t('metrics.uptime.value')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            {t('metrics.uptime.label')}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className={styles.metricValue}>
                            {t('metrics.support.value')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                            {t('metrics.support.label')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
