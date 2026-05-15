import type messages from '@/translations/pt-br.json';

declare module 'next-intl' {
    interface AppConfig {
        Messages: typeof messages;
    }
}
