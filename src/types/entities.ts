export type Song = {
    id: string;
    name: string;
    description?: string;
    totalDuration: number;
    tags?: string[];
    trackLabels: string[];
    notes?: Note[];
    createdAt: number;
    updatedAt: number;
}

export type Note = {
    track: number;
    time: number;
    title?: string;
    description?: string;
    color?: string;
    icon?: string;
}