import { markHabitCompleted, markHabitUncompleted } from "@/lib/data/completions"
import { getUserSession } from "@/lib/session"

export async function POST(req: Request) {
    const { habitId, date } = await req.json()
    const user = await getUserSession()
    
    if (!user) {
        return new Response("Unauthorized", { status: 401 })
    }
    await markHabitCompleted(habitId, user.id, date)
    return new Response("Habit completed", { status: 200 })
}

export async function DELETE(req: Request) {
    const { habitId, date } = await req.json()
    const user = await getUserSession()
    
    if (!user) {
        return new Response("Unauthorized", { status: 401 })
    }
    await markHabitUncompleted(habitId, user.id, date)
    return new Response("Habit uncompleted", { status: 200 })
}