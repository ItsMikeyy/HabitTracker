import "dotenv/config";
import { db } from "../db";
import { habits, users } from "../db/schemas";

async function seedHabits() {
    try {
        // Get the first user from the database
        const allUsers = await db.select().from(users).limit(1);
        
        if (allUsers.length === 0) {
            console.log("No users found. Please create a user first by signing in.");
            process.exit(1);
        }

        const userId = allUsers[0].id;
        console.log(`Seeding habits for user: ${allUsers[0].email}`);

        // Sample habits with different properties
        const testHabits = [
            {
                userId: userId,
                name: "Morning Meditation",
                description: "Start each day with 10 minutes of mindfulness meditation",
                icon: "Brain",
                color: "#8b5cf6", // Purple
                frequency: "daily",
                currentStreak: 7,
                longestStreak: 12
            },
            {
                userId: userId,
                name: "Exercise",
                description: "30 minutes of physical activity",
                icon: "Dumbbell",
                color: "#ef4444", // Red
                frequency: "daily",
                currentStreak: 3,
                longestStreak: 15
            },
            {
                userId: userId,
                name: "Read Books",
                description: "Read at least 20 pages every day",
                icon: "BookOpen",
                color: "#3b82f6", // Blue
                frequency: "daily",
                currentStreak: 0,
                longestStreak: 5
            },
            {
                userId: userId,
                name: "Drink Water",
                description: "Drink 8 glasses of water throughout the day",
                icon: "Droplet",
                color: "#06b6d4", // Cyan
                frequency: "daily",
                currentStreak: 21,
                longestStreak: 21
            },
            {
                userId: userId,
                name: "Journal Writing",
                description: "Write in my journal before bed",
                icon: "PenTool",
                color: "#f59e0b", // Amber
                frequency: "daily",
                currentStreak: 2,
                longestStreak: 8
            },
            {
                userId: userId,
                name: "Weekly Review",
                description: "Review goals and plan for the upcoming week",
                icon: "Target",
                color: "#10b981", // Green
                frequency: "weekly",
                currentStreak: 0,
                longestStreak: 3
            }
        ];

        // Insert habits
        for (const habit of testHabits) {
            await db.insert(habits).values(habit);
            console.log(`✓ Created habit: ${habit.name}`);
        }

        console.log(`\n✅ Successfully created ${testHabits.length} test habits!`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding habits:", error);
        process.exit(1);
    }
}

seedHabits();

