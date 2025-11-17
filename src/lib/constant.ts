export enum AvailableTableName {
    songs = 'songs'
}

export enum ErrorMessageTypes {
    not_found = 'notefound',
    duplicate = 'duplicate',
    note_max_duration = 'note_max_duration',
}

export const ErrorMessages = {
    [ErrorMessageTypes.not_found]: "Item not found!",
    [ErrorMessageTypes.duplicate]: "Duplicate error: Multiple notes cannot exist at the same position (same track + time)!",
    [ErrorMessageTypes.note_max_duration]: "The note has exceeded the song's duration.",
}