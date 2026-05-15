import Link from 'next/link';

export type FooterNavColumnProps = {
    ariaLabel: string;
    heading: string;
    links: ReadonlyArray<{label: string; href: string}>;
};

export function FooterNavColumn(props: FooterNavColumnProps) {
    const {ariaLabel, heading, links} = props;

    return (
        <nav aria-label={ariaLabel} className="space-y-6">
            <h3 className="text-lg font-semibold">{heading}</h3>
            <ul className="space-y-3">
                {links.map(({label, href}) => (
                    <li key={label}>
                        <Link
                            href={href}
                            className="text-white/80 hover:text-primary transition-colors text-sm"
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
