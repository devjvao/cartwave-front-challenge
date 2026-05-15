import {render, screen} from '@testing-library/react';
import {Phone} from 'lucide-react';
import {ContactRow} from './index';

describe('<ContactRow />', () => {
    it('should render the text', () => {
        render(<ContactRow icon={Phone} text="+55 62 92002-8202" />);
        expect(screen.getByText('+55 62 92002-8202')).toBeInTheDocument();
    });

    it('should render the icon inside the row', () => {
        render(<ContactRow icon={Phone} text="+55 62 92002-8202" />);
        const text = screen.getByText('+55 62 92002-8202');
        expect(text.closest('div')).toBeInTheDocument();
    });

    it('should render a different icon and text', () => {
        render(<ContactRow icon={Phone} text="atendimento@checkoutcartwave.com.br" />);
        expect(screen.getByText('atendimento@checkoutcartwave.com.br')).toBeInTheDocument();
    });
});
