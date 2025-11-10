import { getUserSession } from "@/lib/session";
import SignOutButton from "../components/buttons/SignOutButton";
import HabitForm from "./components/HabitForm";
import { HabitList } from "./components/HabitList";


export default async function Dashboard() {
    const user = await getUserSession()

//    console.log(user)
    return (
        <div>
            {JSON.stringify(user)}
            <SignOutButton />
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Habits</h1>
                <div className="flex flex-col items-center">
                    <HabitList />
                </div>
                <HabitForm email={user?.email || ""}/>  
            </div>
            
        </div>
    )
} 