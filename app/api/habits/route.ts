import { NextResponse } from "next/server"
import { getUserHabits, insertHabit } from "@/lib/data/habits"
import { getUserIdByEmail } from "@/lib/data/users"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


export async function POST(req: Request) {
    const data = await req.json()
    const userId = await getUserIdByEmail(data.userEmail)
    if (!userId) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    await insertHabit({...data, userId: userId})
    return NextResponse.json({ message: "Habit created successfully" }, { status: 200 })
}

export async function GET() {
    const session = await getServerSession(authOptions)
    if(!session) {
        NextResponse.json({ message: "Not authorized" }, { status: 401 })
    }
    const userId = await getUserIdByEmail(session?.user?.email as string)
    if (!userId) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const habits = await getUserHabits(userId)
    return NextResponse.json({ habits }, { status: 200 })
}