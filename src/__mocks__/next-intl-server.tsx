import {Fragment} from 'react';
import type {ReactNode} from 'react';
import messages from '@/translations/pt-br.json';

type RichComponents = Record<string, (chunks: ReactNode) => ReactNode>;

function makeMockT(namespace: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolve = (key: string): any => {
        const parts = [namespace, ...key.split('.')];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let value: any = messages;
        for (const part of parts) {
            value = value?.[part];
        }
        return value ?? key;
    };

    const t = (key: string): string => {
        const result = resolve(key);
        return typeof result === 'string' ? result : key;
    };

    t.rich = (key: string, components: RichComponents): ReactNode => {
        const str = resolve(key);
        if (typeof str !== 'string') return key;

        const tagPattern = /(<(\w+)>)(.*?)(<\/\2>)/g;
        const parts: ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = tagPattern.exec(str)) !== null) {
            if (match.index > lastIndex) {
                parts.push(str.slice(lastIndex, match.index));
            }
            const [, , tagName, content] = match;
            const renderer = components[tagName];
            parts.push(renderer ? renderer(content) : content);
            lastIndex = tagPattern.lastIndex;
        }

        if (lastIndex < str.length) {
            parts.push(str.slice(lastIndex));
        }

        if (parts.length === 1) return parts[0];
        return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
    };

    t.raw = resolve;

    return t;
}

export const getTranslations = (namespace: string) =>
    Promise.resolve(makeMockT(namespace));
