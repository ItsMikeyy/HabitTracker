import { db } from "@/db"
import { todoLists } from "@/db/schemas"
import { and, eq } from "drizzle-orm"

export const insertTodoList = async (userId: number, name: string, data: string) => {
    const todoList = await db.insert(todoLists).values({ userId, name, data })
}

export const getTodoList = async (userId: number, date: string) => {
    const todoList = await db.select().from(todoLists).where(and(eq(todoLists.userId, userId), eq(todoLists.data, date)))
    return todoList
}

export const updateTodoList = async (userId: number, name: string, data: string) => {
    const todoList = await db.update(todoLists).set({ name, data }).where(and(eq(todoLists.userId, userId), eq(todoLists.name, name)))
}

export const deleteTodoList = async (id: number) => {
    const todoList = await db.delete(todoLists).where(eq(todoLists.id, id))
}