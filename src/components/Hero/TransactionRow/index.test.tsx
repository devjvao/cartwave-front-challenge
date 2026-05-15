import {render, screen} from '@testing-library/react';
import {TransactionRow} from './index';

const defaultProps = {
    iconBgClass: 'bg-primary',
    iconColorClass: 'text-primary-foreground',
    label: 'Pix recebido',
    time: 'Agora mesmo',
    amount: 'R$ 1.250,00',
};

describe('<TransactionRow />', () => {
    it('should render the transaction label', () => {
        render(<TransactionRow {...defaultProps} />);
        expect(screen.getByText('Pix recebido')).toBeInTheDocument();
    });

    it('should render the transaction time', () => {
        render(<TransactionRow {...defaultProps} />);
        expect(screen.getByText('Agora mesmo')).toBeInTheDocument();
    });

    it('should render the transaction amount', () => {
        render(<TransactionRow {...defaultProps} />);
        expect(screen.getByText('R$ 1.250,00')).toBeInTheDocument();
    });

    it('should render with a different label and amount', () => {
        render(
            <TransactionRow
                {...defaultProps}
                iconBgClass="bg-secondary"
                iconColorClass="text-secondary-foreground"
                label="Boleto pago"
                amount="R$ 850,00"
            />,
        );
        expect(screen.getByText('Boleto pago')).toBeInTheDocument();
        expect(screen.getByText('R$ 850,00')).toBeInTheDocument();
    });
});
