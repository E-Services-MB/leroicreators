PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`subject` text,
	`message` text NOT NULL,
	`createdat` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_contacts`("id", "name", "contact", "subject", "message", "createdat") SELECT "id", "name", "contact", "subject", "message", "createdat" FROM `contacts`;--> statement-breakpoint
DROP TABLE `contacts`;--> statement-breakpoint
ALTER TABLE `__new_contacts` RENAME TO `contacts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `contacts_contact_unique` ON `contacts` (`contact`);