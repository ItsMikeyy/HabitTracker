import { getUserSession } from "@/lib/session";
import SignOutButton from "../components/buttons/SignOutButton";
import HabitForm from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import { redirect } from "next/navigation";
import { Table, TableCaption, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table";


export default async function Dashboard() {
    const user = await getUserSession()
    if (!user) {
        redirect("/api/auth/signin")
    }

    if (!user) {
        redirect("/api/auth/signin")
    }
    return (
        <div>
            {JSON.stringify(user)}
            <SignOutButton />
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Habits</h1>
                <div className="flex flex-col items-center">
                <Table>
                    <TableCaption>A list of your habits.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Habit</TableHead>
                        <TableHead>Sunday</TableHead>
                        <TableHead>Monday</TableHead>
                        <TableHead>Tuesday</TableHead>
                        <TableHead>Wednesday</TableHead>
                        <TableHead>Thursday</TableHead>
                        <TableHead>Friday</TableHead>
                        <TableHead>Saturday</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        
                    </TableBody>
                </Table>
                    {/* <HabitList /> */}
                </div>
                <HabitForm email={user?.email || ""}/>  
            </div>
            
        </div>
    )
} 