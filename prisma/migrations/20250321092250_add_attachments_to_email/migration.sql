/*
  Warnings:

  - You are about to drop the column `attachment` on the `Email` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Email" DROP COLUMN "attachment",
ADD COLUMN     "attachments" TEXT[];
