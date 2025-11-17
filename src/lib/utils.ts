import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
    if (!error) {
        return defaultMessage;
    }

    if (typeof error === 'string' || error instanceof String) {
        return error as string;
    }

    if ((typeof error === 'object' && 'message' in error) || error instanceof Error) {
        return error.message as string
    }

    return defaultMessage;
};

