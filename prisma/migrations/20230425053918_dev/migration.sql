/*
  Warnings:

  - You are about to drop the column `userId` on the `basket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_basketId_fkey`;

-- DropIndex
DROP INDEX `Basket_userId_key` ON `basket`;

-- AlterTable
ALTER TABLE `basket` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `user` MODIFY `basketId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_basketId_fkey` FOREIGN KEY (`basketId`) REFERENCES `Basket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
