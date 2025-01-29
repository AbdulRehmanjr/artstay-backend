/*
  Warnings:

  - Added the required column `accountId` to the `Artisan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artisan" ADD COLUMN     "accountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
