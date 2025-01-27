-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('NONE', 'ARTISAN', 'SAFARI', 'FAIRS', 'BUSINESS', 'HOTEL', 'ALL', 'ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "accountType" "AccountType" NOT NULL DEFAULT 'NONE';
