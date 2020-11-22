export function jsDateToString(date: Date): string {
    return date
        .toISOString()
        .split('T')
        [0];
}
