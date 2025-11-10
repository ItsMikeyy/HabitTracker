import { db } from "@/db";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getUserIdByEmail(email: String) {
    const id = await db.select().from(users).where(eq(users.email, email as string)).limit(1);
    return id[0]?.id || null;
}

export async function getUserByEmail(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user[0] || null;
}

export async function upsertUser(profile: any) {
    const userName = profile.name || profile.email.split("@")[0]
    const userAvatar = profile.picture || ""

    try {
        await db.insert(users).values({
            name: userName,
            email: profile.email,
            avatar: userAvatar,
        }).onConflictDoUpdate({
            target: [users.email],
            set: {
                name: userName,
                avatar: userAvatar,
            }
        })
    } catch (error) {
        console.error("Database error:", profile.image)
        throw error
    }
}