import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import {Phone, Mail, MapPin, FileText} from 'lucide-react';
import {LuLinkedin, LuTwitter, LuInstagram} from 'react-icons/lu';
import {ContactRow} from './ContactRow';
import {FooterNavColumn} from './FooterNavColumn';
import {NewsletterForm} from './NewsletterForm';
import {styles} from './styles';

const legalLinks = ['privacy', 'terms', 'cookies'] as const;

export async function Footer() {
    const t = await getTranslations('footer');

    return (
        <footer aria-label={t('aria.footer')} className="bg-secondary text-white">
            <div className="max-w-content mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/catwave-small-logo.png"
                                alt="Cartwave"
                                width={160}
                                height={40}
                                className="h-8 w-auto brightness-0 invert"
                            />
                        </div>

                        <p className="text-white/80 leading-relaxed">
                            {t('description')}
                        </p>

                        <div className="space-y-3">
                            <ContactRow icon={MapPin} text={t('location')} />
                            <ContactRow icon={Phone} text={t('contact.phone')} />
                            <ContactRow icon={Mail} text={t('contact.email')} />
                            <ContactRow icon={Mail} text={t('contact.ombudsman')} />
                            <ContactRow icon={FileText} text={t('cnpj')} />
                        </div>
                    </div>

                    <FooterNavColumn
                        ariaLabel={t('aria.productsNav')}
                        heading={t('products.heading')}
                        links={(['pix', 'boletos', 'split', 'checkout', 'referral'] as const).map(link => ({
                            label: t(`products.links.${link}`),
                            href: '#',
                        }))}
                    />

                    <FooterNavColumn
                        ariaLabel={t('aria.companyNav')}
                        heading={t('company.heading')}
                        links={(['about', 'careers', 'press', 'blog', 'partners', 'contact'] as const).map(link => ({
                            label: t(`company.links.${link}`),
                            href: '#',
                        }))}
                    />

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">
                            {t('newsletter.heading')}
                        </h3>
                        <p className="text-white/80 text-sm">
                            {t('newsletter.description')}
                        </p>
                        <div className="space-y-3">
                            <NewsletterForm />
                        </div>
                        <div className="flex space-x-4">
                            <a
                                className={styles.socialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/company/cartwave-hub/"
                            >
                                <LuLinkedin className="h-4 w-4" />
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <LuTwitter className="h-4 w-4" />
                            </a>
                            <a
                                className={styles.socialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.instagram.com/cartwavehub/"
                            >
                                <LuInstagram className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-white/80 text-sm">{t('copyright')}</p>
                        <nav aria-label={t('aria.legalNav')} className="flex space-x-6 text-sm">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link}
                                    href="#"
                                    className="text-white/80 hover:text-primary transition-colors"
                                >
                                    {t(`legal.${link}`)}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
