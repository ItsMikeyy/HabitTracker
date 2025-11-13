import { Table, TableHeader, TableBody, TableHead, TableRow, } from "@/components/ui/table";
import { HabitList } from "./HabitList";

export default function HabitTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Habit</TableHead>
                    <TableHead className="text-center">Sun</TableHead>
                    <TableHead className="text-center">Mon</TableHead>
                    <TableHead className="text-center">Tue</TableHead>
                    <TableHead className="text-center">Wed</TableHead>
                    <TableHead className="text-center">Thu</TableHead>
                    <TableHead className="text-center">Fri</TableHead>
                    <TableHead className="text-center">Sat</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <HabitList />
            </TableBody>
        </Table>
    )
}