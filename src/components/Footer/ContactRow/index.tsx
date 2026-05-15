import type {LucideIcon} from 'lucide-react';

type ContactRowProps = {
    icon: LucideIcon;
    text: string;
};

export function ContactRow({icon: Icon, text}: ContactRowProps) {
    return (
        <div className="flex items-center space-x-3 text-sm">
            <Icon aria-hidden className="h-4 w-4 text-primary shrink-0" />
            <span className="text-white/80">{text}</span>
        </div>
    );
}
