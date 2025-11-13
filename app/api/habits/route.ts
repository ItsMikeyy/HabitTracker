import { NextResponse } from "next/server"
import { getUserHabits, insertHabit } from "@/lib/data/habits"
import { getUserIdByEmail } from "@/lib/data/users"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getHabitCompletions } from "@/lib/data/completions"
import { getStartAndEndDate } from "@/lib/date"


export async function POST(req: Request) {
    const data = await req.json()
    const userId = await getUserIdByEmail(data.userEmail)
    if (!userId) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    await insertHabit({...data, userId: userId})
    return NextResponse.json({ message: "Habit created successfully" }, { status: 200 })
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if(!session) {
        return NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }
    const userId = await getUserIdByEmail(session?.user?.email as string)
    if (!userId) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const habits = await getUserHabits(userId)

    // Get date range from query params if provided (client's local timezone)
    // Otherwise fall back to server's date calculation
    const url = new URL(req.url)
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    
    let dates: string[]
    if (startDate && endDate) {
        // Use dates from client (in client's local timezone)
        dates = [startDate, endDate]
    } else {
        // Fallback to server calculation (shouldn't normally happen)
        dates = getStartAndEndDate(new Date())
    }
    
    const completedHabits = await getHabitCompletions(dates, userId)
    return NextResponse.json({ habits, completedHabits }, { status: 200 })
}