import {CircleCheckBig} from 'lucide-react';

type TransactionRowProps = {
    iconBgClass: string;
    iconColorClass: string;
    label: string;
    time: string;
    amount: string;
};

export function TransactionRow(props: TransactionRowProps) {
    const {iconBgClass, iconColorClass, label, time, amount} = props;

    return (
        <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
            <div className="flex items-center space-x-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${iconBgClass}`}>
                    <CircleCheckBig aria-hidden className={`h-4 w-4 ${iconColorClass}`} />
                </div>
                <div>
                    <p className="font-medium text-secondary">{label}</p>
                    <p className="text-sm text-muted-foreground">{time}</p>
                </div>
            </div>
            <p className="font-bold text-primary">{amount}</p>
        </div>
    );
}
