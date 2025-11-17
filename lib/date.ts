

function formatDateLocal(date: Date): string {

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function parseDateLocal(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export function getWeekRange(date: Date) {
    
    const dayofWeek = date.getDay()

    const sunday = new Date(date)
    sunday.setDate(date.getDate() - dayofWeek);

    const saturday = new Date(date)
    saturday.setDate(date.getDate() + (6-dayofWeek))

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
    sunday.setDate(date.getDate() - date.getDay()); 
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(sunday);
        d.setDate(sunday.getDate() + i);
        return formatDateLocal(d); 
  });
}

export function getTodayDate(date: Date) {
  return formatDateLocal(date)
}