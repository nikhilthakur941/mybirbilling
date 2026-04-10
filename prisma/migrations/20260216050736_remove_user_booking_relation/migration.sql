/*
  Warnings:

  - You are about to drop the column `amount` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `paymentStatus` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - Added the required column `balanceDue` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestPhone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropIndex
DROP INDEX `Booking_packageId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Booking_userId_fkey` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `amount`,
    DROP COLUMN `paymentId`,
    DROP COLUMN `userId`,
    ADD COLUMN `advancePaid` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `balanceDue` INTEGER NOT NULL,
    ADD COLUMN `bookingDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `guestEmail` VARCHAR(191) NULL,
    ADD COLUMN `guestName` VARCHAR(191) NOT NULL,
    ADD COLUMN `guestPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `totalAmount` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `packageId` INTEGER NULL,
    MODIFY `paymentStatus` ENUM('PENDING', 'PARTIAL', 'PAID') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
