/*
  Warnings:

  - A unique constraint covering the columns `[cancelToken]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `cancelToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_cancelToken_key` ON `Booking`(`cancelToken`);
