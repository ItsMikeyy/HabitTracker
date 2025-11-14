"use client"
import { useEffect, useState } from "react"
import HabitRow from "./HabitRow"
import { getStartAndEndDate, getTodayDate } from "@/lib/date"
import { Habit } from "@/types/Habit"
import { CompletionRecord } from "@/types/CompletionRecord"

export function HabitList() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [completions, setCompletions] = useState<CompletionRecord[]>([])
    const today = getTodayDate(new Date())

    
    useEffect(() => {
        async function getHabits() {
            const today = new Date()
            const [startDate, endDate] = getStartAndEndDate(today)
            
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
                    date={today}
                    habit={habit} 
                    completed={completions.filter(c => c.habitId === habit.id)}
                />
            ))}
        </>
    )
}