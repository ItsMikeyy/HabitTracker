CREATE TABLE `completionRecords` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habitId` integer,
	`userId` integer,
	`completedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`habitId`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
