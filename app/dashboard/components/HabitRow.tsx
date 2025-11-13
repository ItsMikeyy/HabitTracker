"use client"

import { TableRow, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useMemo, useEffect } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import HabitDetails from "./HabitDetails"
import { getWeekDates } from "@/lib/date"

interface Completion {
    id: number
    habitId: number
    userId: number
    date: string
    completedAt: string
}

interface HabitRowProps {
    habit: {
        id?: number
        name: string
        description?: string
        icon?: string
        color?: string
        frequency: string
        currentStreak?: number
        longestStreak?: number
    }
    completed: Completion[]
}

export default function HabitRow({habit, completed}: HabitRowProps) {
    const [detailsOpen, setDetailsOpen] = useState(false)
    const weekDates = getWeekDates(new Date());

    // Create a set of completed dates for quick lookup - stable when completed array changes
    const completedDatesSet = useMemo(() => {
        return new Set(completed.map(c => c.date))
    }, [completed])

    // Create a stable serialized version of completed dates for dependency tracking
    const completedDatesKey = useMemo(() => {
        return completed.map(c => c.date).sort().join(',')
    }, [completed])

    // Compute checkedDays from completed dates
    const computedCheckedDays = useMemo(() => {
        return weekDates.reduce((acc, date) => {
            acc[date] = completedDatesSet.has(date)
            return acc
        }, {} as Record<string, boolean>)
    }, [weekDates.join(','), completedDatesKey]) // Use stable string keys

    // State for optimistic updates during API calls
    const [checkedDays, setCheckedDays] = useState<Record<string, boolean>>(() => 
        weekDates.reduce((acc, date) => {
            acc[date] = completedDatesSet.has(date)
            return acc
        }, {} as Record<string, boolean>)
    )

    // Sync state with completed prop changes (when API calls complete and data refreshes)
    useEffect(() => {
        setCheckedDays(computedCheckedDays)
    }, [computedCheckedDays])


    async function handleDayToggle(day: string) {
        // Capture the previous state before updating
        const wasChecked = checkedDays[day]
        const willBeChecked = !wasChecked
        
        setCheckedDays(prev => ({
            ...prev,
            [day]: willBeChecked
        }))
        
        if (willBeChecked) {
            // Being checked 
            const res = await fetch("/api/habits/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ habitId: habit.id, date: day }),
            })
        } else {
            // Being unchecked
            const res = await fetch("/api/habits/complete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ habitId: habit.id, date: day }),
            })
        }
    }


    const days = [
        { key: weekDates[0], label: 'Sun' },
        { key: weekDates[1], label: 'Mon' },
        { key: weekDates[2], label: 'Tue' },
        { key: weekDates[3], label: 'Wed' },
        { key: weekDates[4], label: 'Thu' },
        { key: weekDates[5], label: 'Fri' },
        { key: weekDates[6], label: 'Sat' },
    ]

    return (
        <>
            <TableRow className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        {/* Color indicator */}
                        <div 
                            className="h-4 w-1 rounded-full shrink-0"
                            style={{ backgroundColor: habit.color || "#6366f1" }}
                        />
                        
                        {habit.icon && (
                            <div 
                                className="flex h-8 w-8 items-center justify-center rounded-md shrink-0"
                                style={{
                                    backgroundColor: habit.color ? `${habit.color}20` : "#6366f120",
                                    color: habit.color || "#6366f1"
                                }}
                            >
                            </div>
                        )}
                        
                        <div className="min-w-0 flex-1">
                            <div className="font-medium text-foreground flex items-center gap-2">
                                <span className="truncate">{habit.name}</span>
                                <button
                                    onClick={() => setDetailsOpen(!detailsOpen)}
                                    className="shrink-0 hover:bg-muted rounded p-1 transition-colors"
                                    aria-label={detailsOpen ? "Hide details" : "Show details"}
                                >
                                    {detailsOpen ? (
                                        <ChevronUpIcon className="w-4 h-4" />
                                    ) : (
                                        <ChevronDownIcon className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </TableCell>
                
                {days.map((day) => (
                    <TableCell key={day.key} className="text-center">
                        <div className="flex justify-center">
                            <Checkbox
                                checked={checkedDays[day.key]}
                                onCheckedChange={() => handleDayToggle(day.key)}
                                color={habit.color}
                                className="cursor-pointer transition-all hover:scale-110"
                            />
                        </div>
                    </TableCell>
                ))}
            </TableRow>
            
            {detailsOpen && (
                <TableRow>
                    <TableCell colSpan={8} className="p-4 bg-muted/30">
                        <HabitDetails habit={habit} />
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}