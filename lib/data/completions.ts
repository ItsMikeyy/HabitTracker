import { db } from "@/db";
import { completionRecords } from "@/db/schemas";
import { and, eq, lte, gte, desc } from "drizzle-orm";

export async function markHabitCompleted(habitId: number, userId: number, date: string) {
    await db.insert(completionRecords).values({
        habitId: habitId,
        userId: userId,
        date: date,
        completedAt: new Date(),
    }).onConflictDoNothing();
}

export async function markHabitUncompleted(habitId: number, userId: number, date: string) {
    await db.delete(completionRecords).where(and(eq(completionRecords.habitId, habitId), eq(completionRecords.date, date), eq(completionRecords.userId, userId)))
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

// async function calculateStreak(habitId: number, userId: number, date: string) {
//     const habits = await db.select().from(completionRecords).where(and
//         (
//             eq(completionRecords.habitId, habitId),
//             eq(completionRecords.userId, userId),
//             lte(completionRecords.date, date)
//         )).orderBy(desc(completionRecords.date))

// }