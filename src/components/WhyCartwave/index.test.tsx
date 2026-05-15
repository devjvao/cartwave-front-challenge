import {render, screen} from '@testing-library/react';
import {WhyCartwave} from './index';

describe('<WhyCartwave />', () => {
    it('should render the section heading', async () => {
        render(await WhyCartwave());
        expect(
            screen.getByRole('heading', {name: /por que escolher a cartwave/i}),
        ).toBeInTheDocument();
    });

    it('should render all six value proposition cards', async () => {
        render(await WhyCartwave());
        expect(screen.getByText('Integração Rápida')).toBeInTheDocument();
        expect(screen.getByText('Segurança Total')).toBeInTheDocument();
        expect(screen.getByText('Suporte Especializado')).toBeInTheDocument();
        expect(screen.getByText('Crescimento Escalável')).toBeInTheDocument();
        expect(screen.getByText('Tecnologia Avançada')).toBeInTheDocument();
        expect(screen.getByText('Processamento Instantâneo')).toBeInTheDocument();
    });

    it('should render metric labels', async () => {
        render(await WhyCartwave());
        // Metric text is split across a highlighted span and a sibling text node;
        // test the highlighted value spans and label text fragments individually.
        expect(screen.getByText('< 1 hora')).toBeInTheDocument();
        expect(screen.getByText(/para integrar/)).toBeInTheDocument();
        expect(screen.getAllByText('99.5%').length).toBeGreaterThan(0);
        expect(screen.getAllByText('24/7').length).toBeGreaterThan(0);
    });

    it('should render the summary metric values', async () => {
        render(await WhyCartwave());
        // Values appear both in card metrics and in the summary grid;
        // use getAllByText to handle multiple occurrences.
        expect(screen.getAllByText('1000+').length).toBeGreaterThan(0);
        expect(screen.getByText('R$ 2B+')).toBeInTheDocument();
        expect(screen.getAllByText('99.5%').length).toBeGreaterThan(0);
        expect(screen.getAllByText('24/7').length).toBeGreaterThan(0);
    });
});
