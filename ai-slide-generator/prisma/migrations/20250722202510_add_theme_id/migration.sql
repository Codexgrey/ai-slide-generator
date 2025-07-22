/*
  Warnings:

  - Added the required column `themeId` to the `Presentation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Presentation" ADD COLUMN "themeId" TEXT NOT NULL DEFAULT 'clean';
