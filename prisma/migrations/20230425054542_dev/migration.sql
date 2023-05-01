/*
  Warnings:

  - Made the column `basketId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_basketId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `basketId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_basketId_fkey` FOREIGN KEY (`basketId`) REFERENCES `Basket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
