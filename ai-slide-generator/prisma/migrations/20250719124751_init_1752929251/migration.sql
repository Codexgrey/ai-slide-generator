/*
  Warnings:

  - You are about to drop the column `content` on the `Presentation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Presentation" DROP COLUMN "content",
ADD COLUMN     "description" TEXT;
