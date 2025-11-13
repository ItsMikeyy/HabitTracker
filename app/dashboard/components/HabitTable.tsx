import { Table, TableCaption, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { HabitList } from "./HabitList";
import { getUserSession } from "@/lib/session";

export default function HabitTable(props: { email: string}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Habit</TableHead>
                    <TableHead>Sun</TableHead>
                    <TableHead>Mon</TableHead>
                    <TableHead>Tue</TableHead>
                    <TableHead>Wed</TableHead>
                    <TableHead>Thu</TableHead>
                    <TableHead>Fri</TableHead>
                    <TableHead>Sat</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <HabitList email={props.email}/>
            </TableBody>
        </Table>
    )
}