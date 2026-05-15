import {getTranslations} from 'next-intl/server';
import {products} from '@/content';
import {ProductCard} from '@/components/ProductCard';
import {cn} from '@/utils/cn';
import {ArrowRight} from 'lucide-react';

export async function Products() {
    const t = await getTranslations('products');

    return (
        <section
            id="produtos"
            aria-labelledby="products-heading"
            className="bg-linear-to-b from-background py-24 to-accent"
        >
            <div className="max-w-content mx-auto px-6">
                <div className="text-center mb-16">
                    <h2
                        id="products-heading"
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    >
                        {t('heading')}
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto">
                        {t('subheading')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => {
                        const features = (t.raw(`items.${product.id}.features`) as string[]);
                        const title = t(`items.${product.id}.title`);
                        const learnMoreLabel = t('learnMore');
                        return (
                            <ProductCard
                                key={product.id}
                                iconName={product.iconName}
                                iconGradientClass={product.iconGradientClass}
                                learnMoreHref={product.learnMoreHref}
                                title={title}
                                description={t(`items.${product.id}.description`)}
                                features={features}
                                learnMoreLabel={learnMoreLabel}
                                featuresAriaLabel={t('featuresAriaLabel', {title})}
                                learnMoreAriaLabel={t('learnMoreAriaLabel', {label: learnMoreLabel, title})}
                            />
                        );
                    })}
                </div>

                <div className="text-center mt-16">
                    <button
                        type="button"
                        className={cn(
                            'inline-flex items-center justify-center gap-2',
                            'px-8',
                            'h-11',
                            'whitespace-nowrap rounded-md ring-offset-background bg-primary bg-linear-to-r from-primary to-secondary shadow-soft [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                            'text-sm font-medium text-white',
                            'transition-colors',
                            'hover:bg-primary/90 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                        )}
                    >
                        {t('viewAll')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
