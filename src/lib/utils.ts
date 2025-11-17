import * as yup from 'yup';
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

    if (error instanceof yup.ValidationError) {
        if (error.inner && error.inner.length > 0) {
            const firstError = error.inner[0];
            return `Path: ${firstError.path}  ---   Message: ${firstError.message}`;
        } else {
            return `Validation Error (no inner errors found): ${error.message}`;
        }
    } else {
        console.error('An unexpected error occurred:', error);
    }

    if ((typeof error === 'object' && 'message' in error) || error instanceof Error) {
        return error.message as string
    }

    return defaultMessage;
};

