export const products = [
    {
        id: 'pix',
        iconName: 'CreditCard',
        iconGradientClass: 'from-secondary to-secondary/80',
        learnMoreHref: '/api-pix',
    },
    {
        id: 'boletos',
        iconName: 'Banknote',
        iconGradientClass: 'from-primary to-secondary',
        learnMoreHref: '/boletos',
    },
    {
        id: 'referral',
        iconName: 'Users',
        iconGradientClass: 'from-secondary to-primary',
        learnMoreHref: '/indica-ganha',
    },
    {
        id: 'split',
        iconName: 'Split',
        iconGradientClass: 'from-primary/80 to-secondary/80',
        learnMoreHref: '/split-pagamentos',
    },
    {
        id: 'checkout',
        iconName: 'ShoppingCart',
        iconGradientClass: 'from-secondary/80 to-primary/80',
        learnMoreHref: '/checkout',
    },
] as const;

export type ProductMeta = (typeof products)[number];

export const valueProps = [
    {id: 'integration', iconName: 'Zap'},
    {id: 'security', iconName: 'Shield'},
    {id: 'support', iconName: 'Headphones'},
    {id: 'scale', iconName: 'TrendingUp'},
    {id: 'technology', iconName: 'Code'},
    {id: 'processing', iconName: 'Clock'},
] as const;

export type ValuePropMeta = (typeof valueProps)[number];

export const metricIds = [
    {id: 'companies'},
    {id: 'volume'},
    {id: 'uptime'},
    {id: 'support'},
] as const;

export type MetricMeta = (typeof metricIds)[number];