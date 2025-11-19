"use client"
import { useEffect, useState, useCallback } from "react"
import HabitRow from "./HabitRow"
import { getStartAndEndDate, getTodayDate, formatDateLocal } from "@/lib/date"
import { Habit } from "@/types/Habit"
import { CompletionRecord } from "@/types/CompletionRecord"

export function HabitList() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [completions, setCompletions] = useState<CompletionRecord[]>([])
    const today = formatDateLocal( new Date())

    const refreshHabits = useCallback(async () => {
        const today = new Date()
        const [startDate, endDate] = getStartAndEndDate(today)
        
        const res = await fetch(`/api/habits?startDate=${startDate}&endDate=${endDate}`)
        const data = await res.json()
        setHabits(data.habits || [])
        setCompletions(data.completedHabits || [])
    }, [])
    
    useEffect(() => {
        refreshHabits()
    }, [refreshHabits])
    
    return (
        <>
            {habits.map((habit) => (
                <HabitRow 
                    key={habit.id} 
                    date={today}
                    habit={habit} 
                    completed={completions.filter(c => c.habitId === habit.id)}
                    onCompletionChange={refreshHabits}
                />
            ))}
        </>
    )
}