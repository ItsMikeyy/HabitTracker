import { Habit } from "@/types/Habit";
import { db } from "@/db"
import { habits, } from "@/db/schemas"
import { eq } from "drizzle-orm";

export async function insertHabit(habit: Habit) {
    try {
        await db.insert(habits).values({
            userId: habit.userId,
            name: habit.name,
            description: habit.description,
            icon: habit.icon,
            color: habit.color,
            frequency: habit.frequency
        })
    } catch (error) {
        throw new Error("Failed to insert habit.");
    }
    
}

export async function getUserHabits(id: number) {
    const userHabits = await db.select().from(habits).where(eq(habits.userId, id))
    if (userHabits.length === 0) {
        return []
    }
    return userHabits
}