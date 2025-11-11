"use client"

import { TableRow, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import React from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import HabitDetails from "./HabitDetails"

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
}

export default function HabitRow({habit}: HabitRowProps) {
    const [detailsOpen, setDetailsOpen] = useState(false)

    const [checkedDays, setCheckedDays] = useState<Record<string, boolean>>({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    })

    const handleDayToggle = (day: string) => {
        setCheckedDays(prev => ({
            ...prev,
            [day]: !prev[day]
        }))
    }


    const days = [
        { key: 'sunday', label: 'Sun' },
        { key: 'monday', label: 'Mon' },
        { key: 'tuesday', label: 'Tue' },
        { key: 'wednesday', label: 'Wed' },
        { key: 'thursday', label: 'Thu' },
        { key: 'friday', label: 'Fri' },
        { key: 'saturday', label: 'Sat' },
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