import { getUserSession } from "@/lib/session";
import HabitForm from "./components/HabitForm";
import { redirect } from "next/navigation";
import HabitTable from "./components/HabitTable";
import DateRange from "./components/DateRange";


export default async function Dashboard() {
    const user = await getUserSession()
    if (!user) {
        redirect("/api/auth/signin")
    }
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <h1 className="text-3xl font-semibold pb-3">Welcome {user.name || user.email}</h1>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground">Your Habits</h2>
                            <DateRange />
                        </div>
                        <HabitForm />
                    </div>

                    <div className="rounded-lg border p-4 shadow-sm">
                        <HabitTable />
                    </div>
                </div>
            </main>
        </div>
    )
} 