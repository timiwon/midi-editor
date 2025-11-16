export type Song = {
    id: string;
    name: string;
    description: string;
    totalDuration: number;
    tags: string[];
    trackLabels: string[];
    notes: Note[];
    createdAt: string;
    updatedAt: string;
}

export type Note = {
    id: string;
    track: number;
    time: number;
    title: string;
    description: string;
    color: string;
}