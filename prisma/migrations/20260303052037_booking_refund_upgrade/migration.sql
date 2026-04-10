/*
  Warnings:

  - The values [REFUNDED] on the enum `Booking_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `cancelledAt` DATETIME(3) NULL,
    ADD COLUMN `razorpayRefundId` VARCHAR(191) NULL,
    ADD COLUMN `refundAmount` DECIMAL(10, 2) NULL,
    MODIFY `paymentStatus` ENUM('PENDING', 'PARTIAL', 'PAID', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    MODIFY `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
