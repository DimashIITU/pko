/*
  Warnings:

  - Added the required column `phoneNumber` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "phoneNumber" SET DEFAULT '';