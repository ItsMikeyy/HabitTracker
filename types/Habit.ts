export type Habit = {
    id: number
    userId: number,
    name?: string
    description?: string
    icon?: string
    color?: string
    frequency?: string
    currentStreak?: number
    longestStreak?: number
}