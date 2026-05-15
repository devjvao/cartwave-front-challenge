import {render, screen} from '@testing-library/react';
import {Hero} from './index';

describe('<Hero />', () => {
    it('should render the main heading', async () => {
        render(await Hero());
        expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
            'Soluções de pagamento completas para empresas',
        );
    });

    it('should render the highlighted word inside a span', async () => {
        render(await Hero());
        const heading = screen.getByRole('heading', {level: 1});
        const highlight = heading.querySelector('span');
        expect(highlight).not.toBeNull();
        expect(highlight).toHaveTextContent('pagamento');
    });

    it('should render all feature items', async () => {
        render(await Hero());
        expect(screen.getByText('Integração simples e rápida')).toBeInTheDocument();
        expect(screen.getByText('APIs de Pix, boletos e mais')).toBeInTheDocument();
        expect(screen.getByText('Suporte técnico especializado')).toBeInTheDocument();
        expect(screen.getByText('Compliance e segurança total')).toBeInTheDocument();
    });

    it('should render both CTA links', async () => {
        render(await Hero());
        expect(screen.getByRole('link', {name: /começar agora/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /falar com vendas/i})).toBeInTheDocument();
    });

    it('should render the badge text', async () => {
        render(await Hero());
        expect(screen.getByText(/1000\+ empresas confiam/i)).toBeInTheDocument();
    });

    it('should render the dashboard with all three transactions', async () => {
        render(await Hero());
        expect(screen.getByText('Dashboard Cartwave')).toBeInTheDocument();
        expect(screen.getByText('Pix recebido')).toBeInTheDocument();
        expect(screen.getByText('Boleto pago')).toBeInTheDocument();
        expect(screen.getByText('Split realizado')).toBeInTheDocument();
    });

    it('should render transaction amounts', async () => {
        render(await Hero());
        expect(screen.getByText('R$ 1.250,00')).toBeInTheDocument();
        expect(screen.getByText('R$ 850,00')).toBeInTheDocument();
        expect(screen.getByText('R$ 2.100,00')).toBeInTheDocument();
    });
});
