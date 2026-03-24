ALTER TABLE `contacts` RENAME COLUMN "email" TO "contact";--> statement-breakpoint
ALTER TABLE `posts` RENAME COLUMN "name" TO "title";--> statement-breakpoint
DROP INDEX `contacts_email_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `contacts_contact_unique` ON `contacts` (`contact`);