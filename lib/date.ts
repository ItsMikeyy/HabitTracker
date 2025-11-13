/**
 * Formats a date as YYYY-MM-DD in local timezone (not UTC)
 * This prevents timezone shifts when converting dates
 */
function formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getWeekRange() {
    const today = new Date();
    const dayofWeek = today.getDay()

    const sunday = new Date(today)
    sunday.setDate(today.getDate() - dayofWeek);

    const saturday = new Date(today)
    saturday.setDate(today.getDate() + (6-dayofWeek))

    const options: Intl.DateTimeFormatOptions = {month: "short", day: "numeric"}
    const start = sunday.toLocaleDateString("en-US", options)
    const end = saturday.toLocaleDateString("en-US", options)

    return `${start} - ${end}`
}

export function getStartAndEndDate(date: Date) {
    const sunday = new Date(date);
    sunday.setDate(sunday.getDate() - sunday.getDay());
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6); 
  
    return [
      formatDateLocal(sunday),
      formatDateLocal(saturday),
    ];
  }

export function getWeekDates(date: Date) {
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay()); // get Sunday
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(sunday);
        d.setDate(sunday.getDate() + i);
        return formatDateLocal(d); // e.g. "2025-11-09"
  });
}