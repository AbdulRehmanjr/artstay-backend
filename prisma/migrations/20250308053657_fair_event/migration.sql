-- AlterTable
ALTER TABLE "FairEvent" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
