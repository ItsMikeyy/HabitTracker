"use client"

import { useState, useRef, useEffect } from "react"
import {
    Dumbbell,
    BookOpen,
    Heart,
    Coffee,
    Brain,
    Music,
    Sun,
    Moon,
    Briefcase,
    CheckCircle,
    Timer,
    Pencil,
    Leaf,
    Smile,
    Flame,
    Target,
    AlarmClock,
    Utensils,
    Bed,
    Droplets,
    Footprints,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Export icon components (not JSX elements) for reuse
export const iconComponents = {
    dumbbell: Dumbbell,
    book: BookOpen,
    heart: Heart,
    coffee: Coffee,
    brain: Brain,
    music: Music,
    sun: Sun,
    moon: Moon,
    work: Briefcase,
    check: CheckCircle,
    timer: Timer,
    write: Pencil,
    plant: Leaf,
    smile: Smile,
    flame: Flame,
    target: Target,
    alarm: AlarmClock,
    meal: Utensils,
    sleep: Bed,
    water: Droplets,
    run: Footprints,
} as const

export type IconName = keyof typeof iconComponents

interface IconPickerProps {
    value?: string
    onChange: (iconName: string) => void
    className?: string
    color?: string
}

export default function IconPicker({ value, onChange, className, color }: IconPickerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    
    // Close popover when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])
    
    const selectedIcon = value && value in iconComponents 
        ? iconComponents[value as IconName] 
        : null
    const SelectedIconComponent = selectedIcon
    
    const iconEntries = Object.entries(iconComponents) as [IconName, typeof iconComponents[IconName]][]
    return (
        <div ref={containerRef} className={cn("relative", className)}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
                    "ring-offset-background placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "hover:bg-accent hover:text-accent-foreground"
                )}
            >
                <div className="flex items-center gap-2">
                    {SelectedIconComponent ? (
                        <>
                            <SelectedIconComponent className="h-5 w-5" />
                            <span className="capitalize">{value}</span>
                        </>
                    ) : (
                        <span className="text-muted-foreground">Select an icon</span>
                    )}
                </div>
                <svg
                    className={cn(
                        "h-4 w-4 opacity-50 transition-transform",
                        isOpen && "rotate-180"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            
            {/* Popover Content */}
            {isOpen && (
                    <div className="absolute top-full left-0 z-[100] mt-1 w-full rounded-md border bg-popover p-3 shadow-lg">
                        <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
                            {iconEntries.map(([name, IconComponent]) => {
                                const isSelected = value === name
                                return (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => {
                                            onChange(name)
                                            setIsOpen(false)
                                        }}
                                        className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
                                            "hover:bg-accent hover:text-accent-foreground",
                                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            isSelected && "border-primary bg-accent text-accent-foreground ring-2 ring-ring"
                                        )}
                                        title={name}
                                    >
                                        
                                        <IconComponent className="h-5 w-5" color={color ?? "white"}/>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
            )}
        </div>
    )
} 