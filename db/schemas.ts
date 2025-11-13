import { sqliteTable, integer, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({autoIncrement: true}),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    avatar: text("avatar").notNull(),
    createdAt: integer("createdAt", {mode: "timestamp"}).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", {mode: "timestamp"}).notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const habits = sqliteTable("habits", {
    id: integer("id").primaryKey({autoIncrement: true}),
    userId: integer("userId").references(() => users.id),
    name: text("name").notNull(),
    description: text("description"),
    icon: text("icon").notNull(),
    color: text("color").notNull(),
    currentStreak: integer("currentStreak").notNull().default(0),
    longestStreak: integer("longestStreak").notNull().default(0),
    lastCompleted: integer("lastCompleted", {mode: "timestamp"}),
    frequency: text("frequency").notNull(),
    createdAt: integer("createdAt", {mode: "timestamp"}).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", {mode: "timestamp"}).notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const completionRecords = sqliteTable("completionRecords", {
    id: integer("id").primaryKey({autoIncrement: true}),
    habitId: integer("habitId").references(() => habits.id),
    userId: integer("userId").references(() => users.id),
    date: text("date").notNull(),
    completedAt: integer("completedAt", {mode: "timestamp"}).notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
        uniqueHabitDate: uniqueIndex("unique_habit_date").on(table.habitId, table.date),
    }),
)
