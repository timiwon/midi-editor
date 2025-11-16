import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
    if (!error) {
        return defaultMessage;
    }

    return (typeof error === 'object' && 'message' in error) ||
        error instanceof Error ? error.message as string : defaultMessage;
};

