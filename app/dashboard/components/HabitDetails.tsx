"use client"

import { Flame, Trophy, Calendar, HighlighterIcon } from "lucide-react"
import HabitForm from "./HabitForm"
import { Habit } from "@/types/Habit"




export default function HabitDetails(props: {habit: Habit}) {
    const habit = props.habit
    const frequencyLabel = habit.frequency 
        ? habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1) 
        : ""

    return (
        <div className="space-y-4">
            {/* Description */}
            {habit.description && (
                <div className="space-y-2">
                    <div className="flex w-full justify-between"> 
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Description
                        </p>
                        <HabitForm habit={habit} />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                        {habit.description}
                    </p>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Current Streak */}
                <div 
                    className="rounded-lg p-4 space-y-2 transition-all hover:shadow-sm"
                    style={{
                        backgroundColor: habit.color ? `${habit.color}15` : "rgba(99, 102, 241, 0.15)",
                        border: `1px solid ${habit.color ? `${habit.color}30` : "rgba(99, 102, 241, 0.3)"}`
                    }}
                >
                    <div className="flex items-center gap-2">
                        <div 
                            className="p-1.5 rounded-md"
                            style={{
                                backgroundColor: habit.color ? `${habit.color}25` : "rgba(249, 115, 22, 0.25)",
                            }}
                        >
                            <Flame className="h-4 w-4" style={{ color: habit.color || "#f97316" }} />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Current Streak
                        </span>
                    </div>
                    <div className="space-y-1">
                        <p 
                            className="text-3xl font-bold"
                            style={{ color: habit.color || "#f97316" }}
                        >
                            {habit.currentStreak || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {habit.currentStreak === 1 ? "day" : "days"} in a row
                        </p>
                    </div>
                </div>

                {/* Longest Streak */}
                <div 
                    className="rounded-lg p-4 space-y-2 transition-all hover:shadow-sm"
                    style={{
                        backgroundColor: habit.color ? `${habit.color}15` : "rgba(99, 102, 241, 0.15)",
                        border: `1px solid ${habit.color ? `${habit.color}30` : "rgba(99, 102, 241, 0.3)"}`
                    }}
                >
                    <div className="flex items-center gap-2">
                        <div 
                            className="p-1.5 rounded-md"
                            style={{
                                backgroundColor: habit.color ? `${habit.color}25` : "rgba(234, 179, 8, 0.25)",
                            }}
                        >
                            <Trophy 
                                className="h-4 w-4" 
                                style={{ color: habit.color || "#eab308" }}
                            />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Best Streak
                        </span>
                    </div>
                    <div className="space-y-1">
                        <p 
                            className="text-3xl font-bold"
                            style={{ color: habit.color || "#eab308" }}
                        >
                            {habit.longestStreak || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {habit.longestStreak === 1 ? "day" : "days"} record
                        </p>
                    </div>
                </div>
            </div>

            {/* Frequency and Metadata */}
            {frequencyLabel && (
                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Frequency:</span>
                    </div>
                    <span 
                        className="font-semibold px-3 py-1 rounded-full text-xs"
                        style={{
                            backgroundColor: habit.color ? `${habit.color}20` : "rgba(99, 102, 241, 0.2)",
                            color: habit.color || "#6366f1"
                        }}
                    >
                        {frequencyLabel}
                    </span>
                </div>
            )}
        </div>
    )
}