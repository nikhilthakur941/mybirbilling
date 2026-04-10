/*
  Warnings:

  - You are about to alter the column `advancePaid` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to alter the column `balanceDue` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to alter the column `totalAmount` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `guestCount` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `razorpayOrderId` VARCHAR(191) NULL,
    ADD COLUMN `razorpayPaymentId` VARCHAR(191) NULL,
    MODIFY `advancePaid` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `balanceDue` DECIMAL(10, 2) NOT NULL,
    MODIFY `totalAmount` DECIMAL(10, 2) NOT NULL;
