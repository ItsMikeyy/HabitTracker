PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_completionRecords` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habitId` integer,
	`userId` integer,
	`date` text NOT NULL,
	`completedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`habitId`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_completionRecords`("id", "habitId", "userId", "date", "completedAt") SELECT "id", "habitId", "userId", "date", "completedAt" FROM `completionRecords`;--> statement-breakpoint
DROP TABLE `completionRecords`;--> statement-breakpoint
ALTER TABLE `__new_completionRecords` RENAME TO `completionRecords`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `unique_habit_date` ON `completionRecords` (`habitId`,`date`);