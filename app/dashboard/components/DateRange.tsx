"use client"
import { getTodayDate, getWeekRange } from "@/lib/date";
import { Calendar, ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function DateRange() {
    const [weekRange, setWeekRange] = useState(getWeekRange(new Date()))
    const [currentDate, setCurrentDate] = useState(new Date())

    function prevWeek() {
        const date = currentDate
        const day = date.getDay()
        const diff = day + 1

        const prevSaturday = new Date(date)
        prevSaturday.setDate(date.getDate() - diff)
        const week = getWeekRange(prevSaturday)
        setWeekRange(week)
        setCurrentDate(prevSaturday)
    }

    return (
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Calendar className="h-6 w-6" />
            <ChevronLeftCircle className="cursor-pointer hover:text-white" onClick={() => prevWeek()}/>
            <span>{weekRange}</span>
            <ChevronRightCircle className="cursor-pointer hover:text-white"/>
        </div>
    )
}