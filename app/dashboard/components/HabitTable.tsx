import { Table, TableCaption, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { HabitList } from "./HabitList";

export default function HabitTable() {
    return (
        <Table>
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
                <HabitList />
            </TableBody>
        </Table>
    )
}