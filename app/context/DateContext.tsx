"use client"
import { createContext, useContext, useState } from "react"

export const DateContext = createContext<{
    date: Date
    setDate: (date: Date) => void
}>({
    date: new Date(),
    setDate: () => {}
})

export function DateProvider({ children }: { children: React.ReactNode }) {
    const [date, setDate] = useState(new Date())
    return (
        <DateContext.Provider value={{ date, setDate: (date: Date) => setDate(new Date(date.getTime())) }}>
            {children}
        </DateContext.Provider>
    );
}

export function useDate() {
    return useContext(DateContext);
}

