"use client"
import { useEffect, useState } from "react"
import HabitCard from "./HabitCard"

export function HabitList() {
    const [habits, setHabits] = useState([])
    useEffect(() => {
        async function getHabits() {
            const res = await fetch("/api/habits");
            const data = await res.json()
            setHabits(data.habits)
        }
        getHabits()
    }, [])
    console.log("HABITS", habits)
    return (
        <>
            {habits.map((habit) => (
                <HabitCard habit={habit} />
            ))}
        </>
    )
}