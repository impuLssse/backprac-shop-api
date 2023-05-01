/*
  Warnings:

  - The primary key for the `producturl` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `producturl` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`url`);

-- CreateIndex
CREATE INDEX `ProductUrl_url_idx` ON `ProductUrl`(`url`);
