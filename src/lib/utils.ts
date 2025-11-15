export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
    if (!error) {
        return defaultMessage;
    }

    return (typeof error === 'object' && 'message' in error) ||
        error instanceof Error ? error.message as string : defaultMessage;
};
