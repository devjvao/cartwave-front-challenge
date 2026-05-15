'use client';

import {useEffect} from 'react';

type Props = {
    error: Error & {digest?: string};
    reset: () => void;
};

export default function Error({error, reset}: Props) {
    useEffect(
        () => {
            console.error(error);
        },
        [error],
    );

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
            <h2 className="text-2xl font-semibold">Algo deu errado</h2>
            <button
                onClick={reset}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
                Tentar novamente
            </button>
        </div>
    );
}
