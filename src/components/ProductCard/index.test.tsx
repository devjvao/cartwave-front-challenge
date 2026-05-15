import {render, screen} from '@testing-library/react';
import {ProductCard} from './index';

const defaultProps = {
    iconName: 'Zap',
    iconGradientClass: 'from-primary to-secondary',
    title: 'API de Pix',
    description: 'Receba e envie pagamentos Pix de forma automática.',
    features: ['Pix 24/7', 'QR Code dinâmico', 'Webhooks', 'Conciliação automática'],
    learnMoreLabel: 'Saiba mais',
    learnMoreHref: '/',
    featuresAriaLabel: 'Recursos de API de Pix',
    learnMoreAriaLabel: 'Saiba mais sobre API de Pix',
};

describe('<ProductCard />', () => {
    it('should render the product title', () => {
        render(<ProductCard {...defaultProps} />);
        expect(screen.getByRole('heading', {name: /api de pix/i})).toBeInTheDocument();
    });

    it('should render the product description', () => {
        render(<ProductCard {...defaultProps} />);
        expect(screen.getByText(/receba e envie pagamentos/i)).toBeInTheDocument();
    });

    it('should render all features', () => {
        render(<ProductCard {...defaultProps} />);
        defaultProps.features.forEach((feature) => {
            expect(screen.getByText(feature)).toBeInTheDocument();
        });
    });

    it('should render the learn more link', () => {
        render(<ProductCard {...defaultProps} />);
        expect(screen.getByRole('link', {name: /saiba mais sobre api de pix/i})).toBeInTheDocument();
    });

    it('should fall back to Zap icon for unknown iconName', () => {
        render(<ProductCard {...defaultProps} iconName="UnknownIcon" />);
        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('should apply the correct href to the learn more link', () => {
        render(<ProductCard {...defaultProps} />);
        expect(screen.getByRole('link', {name: /saiba mais sobre api de pix/i})).toHaveAttribute('href', '/');
    });

    it('should apply the features aria-label to the list', () => {
        render(<ProductCard {...defaultProps} />);
        expect(screen.getByRole('list', {name: /recursos de api de pix/i})).toBeInTheDocument();
    });
});
