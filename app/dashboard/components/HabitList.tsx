"use client"
import { useEffect, useState, useCallback } from "react"
import HabitRow from "./HabitRow"
import { getStartAndEndDate, getTodayDate, formatDateLocal } from "@/lib/date"
import { Habit } from "@/types/Habit"
import { CompletionRecord } from "@/types/CompletionRecord"
import { useDate } from "@/app/context/DateContext"

export function HabitList() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [completions, setCompletions] = useState<CompletionRecord[]>([])
    const { date } = useDate()
    const today = formatDateLocal(date)
    console.log(today)


    const refreshHabits = useCallback(async () => {

        const [startDate, endDate] = getStartAndEndDate(date)
        
        const res = await fetch(`/api/habits?startDate=${startDate}&endDate=${endDate}`)
        const data = await res.json()
        setHabits(data.habits || [])
        console.log(data.completedHabits || [])
        setCompletions(data.completedHabits || [])
    }, [date])
    
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