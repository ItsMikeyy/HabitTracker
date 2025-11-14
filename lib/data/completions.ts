import { db } from "@/db";
import { completionRecords, habits } from "@/db/schemas";
import { and, eq, lte, gte, desc } from "drizzle-orm";
import { getTodayDate } from "../date";
import { updateHabit } from "./habits";

export async function markHabitCompleted(habitId: number, userId: number, date: string) {
    console.log("INSERT",date)
    await db.insert(completionRecords).values({
        habitId: habitId,
        userId: userId,
        date: date,
        completedAt: new Date(),
    }).onConflictDoNothing();

    await calculateStreak(habitId, userId)

}

export async function markHabitUncompleted(habitId: number, userId: number, date: string) {
    await db.delete(completionRecords).where(and(eq(completionRecords.habitId, habitId), eq(completionRecords.date, date), eq(completionRecords.userId, userId)))
    await calculateStreak(habitId, userId)
}

export async function getHabitCompletions(dates: string[], userId: number) {
    const startDate = dates[0]
    const endDate = dates[dates.length - 1]

    const result = await db.select().from(completionRecords).where(and
        (eq(completionRecords.userId, userId), 
        gte(completionRecords.date, startDate), 
        lte(completionRecords.date, endDate)))
    return result
}

export async function calculateStreak(habitId: number, userId: number) {
    const today = getTodayDate(new Date())
    
    // Get all completion records for this habit
    const completions = await db.select().from(completionRecords).where(and(
        eq(completionRecords.habitId, habitId),
        eq(completionRecords.userId, userId)
    )).orderBy(desc(completionRecords.date))

    // Create a Set of completion dates for O(1) lookup
    const completionDates = new Set(completions.map(c => c.date))
    

    // Count consecutive days backwards from today
    let currentStreak = 0
    let currentDate = new Date(today)
    

    // Count consecutive days backwards
    while (true) {
        console.log(currentDate)
        const dateStr = getTodayDate(currentDate)
        console.log(dateStr)
        if (completionDates.has(dateStr)) {
            currentStreak++
            currentDate.setDate(currentDate.getDate() - 1)
        } else {
            break
        }
    }

    // Update the streak in the database
    await db.update(habits).set({
        currentStreak: currentStreak
    }).where(and(eq(habits.id, habitId), eq(habits.userId, userId)))
}