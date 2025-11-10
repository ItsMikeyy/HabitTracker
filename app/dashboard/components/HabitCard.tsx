"use client"
import { Flame, Trophy } from "lucide-react"


export default function HabitCard(props: { habit: any }) {
    const { habit } = props
    
    const frequencyLabel = habit.frequency ? habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1) : ""
    
    return (
        <div 
            className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            style={{
                borderLeftColor: habit.color || "#6366f1",
                borderLeftWidth: "4px"
            }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            {habit.name}
                        </h3>
                        {habit.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {habit.description}
                            </p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1.5">
                                <Flame className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-medium text-foreground">
                                    {habit.currentStreak || 0} day{habit.currentStreak !== 1 ? 's' : ''}
                                </span>
                            </div>
                            
                            {habit.longestStreak > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <Trophy className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm text-muted-foreground">
                                        Best: {habit.longestStreak}
                                    </span>
                                </div>
                            )}
                            
                            {frequencyLabel && (
                                <span 
                                    className="text-xs font-medium px-2 py-1 rounded-full"
                                    style={{
                                        backgroundColor: habit.color ? `${habit.color}15` : "#6366f115",
                                        color: habit.color || "#6366f1"
                                    }}
                                >
                                    {frequencyLabel}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
                <div 
                    className="h-full transition-all"
                    style={{
                        width: habit.currentStreak > 0 ? `${Math.min((habit.currentStreak / (habit.target || 30)) * 100, 100)}%` : "0%",
                        backgroundColor: habit.color || "#6366f1"
                    }}
                />
            </div>
        </div>
    )
}