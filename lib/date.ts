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