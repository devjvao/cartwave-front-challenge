import {render, screen} from '@testing-library/react';
import {Products} from './index';

describe('<Products />', () => {
    it('should render the section heading', async () => {
        render(await Products());
        expect(
            screen.getByRole('heading', {name: /produtos e soluções/i}),
        ).toBeInTheDocument();
    });

    it('should render all six product cards', async () => {
        render(await Products());
        expect(screen.getByText('API de Pix')).toBeInTheDocument();
        expect(screen.getByText('Emissão de Boletos')).toBeInTheDocument();
        expect(screen.getByText('Indique e Ganhe')).toBeInTheDocument();
        expect(screen.getByText('Split de Pagamentos')).toBeInTheDocument();
        expect(screen.getByText('Checkout Customizável')).toBeInTheDocument();
    });

    it('should render the view all solutions button', async () => {
        render(await Products());
        expect(
            screen.getByRole('button', {name: /ver todas as soluções/i}),
        ).toBeInTheDocument();
    });
});
