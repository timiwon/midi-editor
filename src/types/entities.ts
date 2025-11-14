export type Song = {
    id: string;
    name: string;
    description: string;
    totalDuration: number;
    trackLabels: string[];
    notes: Note[];
}

export type Note = {
    id: string;
    track: number;
    time: number;
    title: string;
    description: string;
    color: string;
}