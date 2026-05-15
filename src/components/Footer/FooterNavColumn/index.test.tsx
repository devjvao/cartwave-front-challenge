import {render, screen} from '@testing-library/react';
import {FooterNavColumn, type FooterNavColumnProps} from './index';

const defaultProps: FooterNavColumnProps = {
    ariaLabel: 'Links de produtos',
    heading: 'Produtos',
    links: [
        {label: 'API de Pix', href: '#'},
        {label: 'Emissão de Boletos', href: '#'},
        {label: 'Split de Pagamentos', href: '#'},
    ],
};

describe('<FooterNavColumn />', () => {
    it('should render the heading', () => {
        render(<FooterNavColumn {...defaultProps} />);
        expect(screen.getByRole('heading', {name: 'Produtos'})).toBeInTheDocument();
    });

    it('should render all links', () => {
        render(<FooterNavColumn {...defaultProps} />);
        expect(screen.getByRole('link', {name: 'API de Pix'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Emissão de Boletos'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Split de Pagamentos'})).toBeInTheDocument();
    });

    it('should have the correct aria-label on the nav', () => {
        render(<FooterNavColumn {...defaultProps} />);
        expect(screen.getByRole('navigation', {name: 'Links de produtos'})).toBeInTheDocument();
    });

    it('should apply the href to each link', () => {
        render(<FooterNavColumn {...defaultProps} />);
        expect(screen.getByRole('link', {name: 'API de Pix'})).toHaveAttribute('href', '#');
    });
});
