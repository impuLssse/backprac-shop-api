/*
  Warnings:

  - The primary key for the `basket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `basket` table. All the data in the column will be lost.
  - You are about to drop the column `basketId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_basketId_fkey`;

-- AlterTable
ALTER TABLE `basket` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `product` DROP COLUMN `basketId`;

-- CreateTable
CREATE TABLE `_BasketToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BasketToProduct_AB_unique`(`A`, `B`),
    INDEX `_BasketToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Basket_userId_idx` ON `Basket`(`userId`);

-- AddForeignKey
ALTER TABLE `_BasketToProduct` ADD CONSTRAINT `_BasketToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Basket`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BasketToProduct` ADD CONSTRAINT `_BasketToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
