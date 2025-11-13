"use client"
import { useEffect, useState } from "react"
import HabitRow from "./HabitRow"
import { getStartAndEndDate } from "@/lib/date"

interface Habit {
    id?: number
    name: string
    description?: string
    icon?: string
    color?: string
    frequency: string
    currentStreak?: number
    longestStreak?: number
}

interface Completion {
    id: number
    habitId: number
    userId: number
    date: string
    completedAt: string
}

export function HabitList() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [completions, setCompletions] = useState<Completion[]>([])
    
    useEffect(() => {
        async function getHabits() {
            // Calculate week dates on client side (using client's local timezone)
            const today = new Date()
            const [startDate, endDate] = getStartAndEndDate(today)
            
            // Send the client's calculated dates to the server
            const res = await fetch(`/api/habits?startDate=${startDate}&endDate=${endDate}`)
            const data = await res.json()
            setHabits(data.habits || [])
            setCompletions(data.completedHabits || [])
        }
        getHabits()
    }, [])
    
    return (
        <>
            {habits.map((habit) => (
                <HabitRow 
                    key={habit.id} 
                    habit={habit} 
                    completed={completions.filter(c => c.habitId === habit.id)}
                />
            ))}
        </>
    )
}