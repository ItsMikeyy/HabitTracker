import { getUserSession } from "@/lib/session";
import SignOutButton from "../components/buttons/SignOutButton";
import HabitForm from "./components/HabitForm";
import { redirect } from "next/navigation";
import HabitTable from "./components/HabitTable";
import { getWeekRange } from "@/lib/date";
import { Calendar } from "lucide-react";

export default async function Dashboard() {
    const user = await getUserSession()
    if (!user) {
        redirect("/api/auth/signin")
    }

    const weekRange = getWeekRange()

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Habit Tracker</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Welcome back, {user.name || user.email}
                            </p>
                        </div>
                        <SignOutButton />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Page Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground">Your Habits</h2>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{weekRange}</span>
                            </div>
                        </div>
                        <HabitForm email={user?.email || ""} />
                    </div>

                    {/* Habits Table */}
                    <div className="rounded-lg border border-4 p-4 shadow-sm">
                        <HabitTable />
                    </div>
                </div>
            </main>
        </div>
    )
} 