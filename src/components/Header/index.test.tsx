import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NextIntlClientProvider} from 'next-intl';
import messages from '@/translations/pt-br.json';
import {Header} from './index';

function renderHeader() {
    return render(
        <NextIntlClientProvider locale="pt-br" messages={messages}>
            <Header />
        </NextIntlClientProvider>,
    );
}

describe('<Header />', () => {
    it('should render the logo image', () => {
        renderHeader();
        expect(screen.getByRole('img', {name: /cartwave/i})).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
        renderHeader();
        expect(screen.getByRole('link', {name: /início/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /soluções/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /produtos/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /contato/i})).toBeInTheDocument();
    });

    it('should render the Entrar link', () => {
        renderHeader();
        const loginLinks = screen.getAllByText(/entrar/i);
        expect(loginLinks.length).toBeGreaterThan(0);
    });

    it('should render the specialist CTA', () => {
        renderHeader();
        const ctaLinks = screen.getAllByText(/fale com um especialista/i);
        expect(ctaLinks.length).toBeGreaterThan(0);
    });

    it('should toggle mobile menu on button click', async () => {
        renderHeader();
        const user = userEvent.setup();

        const menuButton = screen.getByRole('button', {name: /abrir menu/i});
        expect(screen.queryByRole('navigation', {name: /navegação mobile/i})).not.toBeInTheDocument();

        await user.click(menuButton);

        expect(screen.getByRole('navigation', {name: /navegação mobile/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /fechar menu/i})).toBeInTheDocument();
    });

    it('should close mobile menu when a nav link is clicked', async () => {
        renderHeader();
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: /abrir menu/i}));
        const mobileNav = screen.getByRole('navigation', {name: /navegação mobile/i});
        const homeLink = mobileNav.querySelector('a');
        expect(homeLink).not.toBeNull();

        await user.click(homeLink!);

        expect(screen.queryByRole('navigation', {name: /navegação mobile/i})).not.toBeInTheDocument();
    });
});
