import {render, screen} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import messages from '@/translations/pt-br.json';
import {Footer} from './index';



describe('<Footer />', () => {
    it('should render the Cartwave logo image', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByRole('img', {name: /cartwave/i})).toBeInTheDocument();
    });

    it('should render the company description', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByText(/soluções completas e seguras para empresas/i)).toBeInTheDocument();
    });

    it('should render the CNPJ', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByText(/33\.207\.641\/0001-70/i)).toBeInTheDocument();
    });

    it('should render product links', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByRole('navigation', {name: /links de produtos/i})).toBeInTheDocument();
        expect(screen.getByText('API de Pix')).toBeInTheDocument();
        expect(screen.getByText('Emissão de Boletos')).toBeInTheDocument();
    });

    it('should render company links', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByRole('navigation', {name: /links da empresa/i})).toBeInTheDocument();
        expect(screen.getByText('Sobre nós')).toBeInTheDocument();
        expect(screen.getByText('Carreira')).toBeInTheDocument();
    });

    it('should render legal links', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByRole('link', {name: /privacidade/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /termos de uso/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /política de cookies/i})).toBeInTheDocument();
    });

    it('should render the copyright notice', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByText(/2024 cartwave instituição de pagamento/i)).toBeInTheDocument();
    });

    it('should render contact phone and email', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByText(/\+55 62/i)).toBeInTheDocument();
        expect(screen.getByText(/atendimento@/i)).toBeInTheDocument();
    });

    it('should render the newsletter section heading', async () => {
        const component = await Footer();
        render(
            <NextIntlClientProvider locale="pt-br" messages={messages}>
                {component}
            </NextIntlClientProvider>,
        );
        expect(screen.getByRole('heading', {name: /newsletter/i})).toBeInTheDocument();
    });
});
