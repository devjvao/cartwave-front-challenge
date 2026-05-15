import {render, screen} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import messages from '@/translations/pt-br.json';
import {NewsletterForm} from './index';

function renderForm() {
    return render(
        <NextIntlClientProvider locale="pt-br" messages={messages}>
            <NewsletterForm />
        </NextIntlClientProvider>,
    );
}

describe('<NewsletterForm />', () => {
    it('should render the email input', () => {
        renderForm();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render the submit button', () => {
        renderForm();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render the privacy notice', () => {
        renderForm();
        expect(screen.getByText(/não enviamos spam/i)).toBeInTheDocument();
    });

    it('should render the form with the correct aria-label', () => {
        renderForm();
        expect(screen.getByRole('form', {name: /formulário de newsletter/i})).toBeInTheDocument();
    });

    it('should set the correct type on the email input', () => {
        renderForm();
        expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });
});
