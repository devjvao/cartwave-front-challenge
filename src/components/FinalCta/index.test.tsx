import {render, screen} from '@testing-library/react';
import {FinalCta} from './index';

describe('<FinalCta />', () => {
    it('should render the section heading', async () => {
        render(await FinalCta());
        expect(
            screen.getByRole('heading', {name: /pronto para revolucionar/i}),
        ).toBeInTheDocument();
    });

    it('should render both CTA links', async () => {
        render(await FinalCta());
        expect(screen.getByRole('link', {name: /começar agora/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /falar com vendas/i})).toBeInTheDocument();
    });

    it('should render all three benefit items', async () => {
        render(await FinalCta());
        expect(screen.getByText('Implementação gratuita')).toBeInTheDocument();
        expect(screen.getByText('Suporte dedicado')).toBeInTheDocument();
        expect(screen.getByText('Sem taxa de setup')).toBeInTheDocument();
    });

    it('should render the subheading', async () => {
        render(await FinalCta());
        expect(screen.getByText(/junte-se a mais de 1000 empresas/i)).toBeInTheDocument();
    });

    it('should render benefit descriptions', async () => {
        render(await FinalCta());
        expect(screen.getByText(/setup e integração sem custos/i)).toBeInTheDocument();
        expect(screen.getByText(/time técnico especializado/i)).toBeInTheDocument();
        expect(screen.getByText(/pague apenas pelas transações/i)).toBeInTheDocument();
    });
});
