"use client"
import { useDate } from "@/app/context/DateContext";
import { getTodayDate, getWeekRange } from "@/lib/date";
import { Calendar, ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function DateRange() {
    const { date, setDate } = useDate()
    const [weekRange, setWeekRange] = useState(getWeekRange(date))

    function prevWeek() {
        const day = date.getDay()
        const diff = day + 1

        const prevSaturday = new Date(date)
        prevSaturday.setDate(date.getDate() - diff)
        const week = getWeekRange(prevSaturday)
        setWeekRange(week)
        setDate(prevSaturday)
    }

    function nextWeek() {
        const day = date.getDay()
        const diff = 7 - day

        const nextSaturday = new Date(date)
        nextSaturday.setDate(date.getDate() + diff)
        const week = getWeekRange(nextSaturday)
        setWeekRange(week)
        setDate(nextSaturday)
    }

    return (
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Calendar className="h-6 w-6" />
            <ChevronLeftCircle className="cursor-pointer hover:text-white" onClick={() => prevWeek()}/>
            <span>{weekRange}</span>
            <ChevronRightCircle className="cursor-pointer hover:text-white" onClick={() => nextWeek()}/>
        </div>
    )
}