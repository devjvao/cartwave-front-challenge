import {
    Zap,
    CreditCard,
    Banknote,
    Users,
    Split,
    ShoppingCart,
    ArrowRight,
    type LucideIcon,
} from 'lucide-react';
import {cn} from '@/utils/cn';

const iconMap: Record<string, LucideIcon> = {
    CreditCard,
    Banknote,
    Users,
    Split,
    ShoppingCart,
};

type ProductCardProps = {
    iconName: string;
    iconGradientClass: string;
    title: string;
    description: string;
    features: string[];
    learnMoreLabel: string;
    learnMoreHref: string;
    featuresAriaLabel: string;
    learnMoreAriaLabel: string;
};

export function ProductCard(props: ProductCardProps) {
    const {
        iconName,
        title,
        description,
        features,
        learnMoreLabel,
        iconGradientClass,
        learnMoreHref,
        featuresAriaLabel,
        learnMoreAriaLabel,
    } = props;

    const Icon = iconMap[iconName] ?? Zap;

    return (
        <article
            className={cn(
                'rounded-lg border border-border/50 bg-card text-card-foreground shadow-sm group',
                'transition-all duration-300',
                'hover:shadow-card hover:-translate-y-2',
            )}
        >
            <div className="flex flex-col p-6 space-y-4">
                <div
                    className={cn(
                        'flex items-center justify-center',
                        'w-12 h-12',
                        'rounded-lg bg-linear-to-r',
                        iconGradientClass,
                    )}
                >
                    <Icon aria-hidden className="h-6 w-6 text-white" />
                </div>
                <h3
                    className={cn(
                        'm-0',
                        'text-xl font-semibold tracking-tight text-foreground',
                        'transition-colors',
                        'group-hover:text-primary',
                    )}
                >
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{description}</p>
            </div>

            <div className="p-6 pt-0 space-y-6">
                <ul aria-label={featuresAriaLabel} className="flex flex-col gap-2">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <a
                    href={learnMoreHref}
                    aria-label={learnMoreAriaLabel}
                    className={cn(
                        'inline-flex items-center justify-between gap-2 w-full',
                        'px-4 py-2',
                        'h-10',
                        'whitespace-nowrap rounded-md ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                        'text-sm font-medium',
                        'transition-all',
                        'group-hover:bg-primary group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    )}
                >
                    {learnMoreLabel}
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
            </div>
        </article>
    );
}
