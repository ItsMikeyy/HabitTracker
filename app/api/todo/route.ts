import { getUserByEmail } from "@/lib/data/users";
import { getUserSession } from "@/lib/session";
import { getTodoList, insertTodoList, deleteTodoList } from "@/lib/data/todoList";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const session = await getUserSession();
    const user = await getUserByEmail(session?.email!);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    const todoList = await getTodoList(user.id, date!)
    return NextResponse.json(todoList || []);
}
export async function POST(req: Request) {
    const data = await req.json();
    const session = await getUserSession();
    const user = await getUserByEmail(session?.email!);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    await insertTodoList(user.id, data.name, data.data);
    return NextResponse.json({ message: "Todo list created successfully" }, { status: 200 });
    
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const session = await getUserSession();
    if (!session) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    await deleteTodoList(Number(id));
    return NextResponse.json({ message: "Todo list deleted successfully" }, { status: 200 });
}