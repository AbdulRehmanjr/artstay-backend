-- CreateEnum
CREATE TYPE "Education" AS ENUM ('FORMAL', 'NON_FORMAL');

-- CreateEnum
CREATE TYPE "Training" AS ENUM ('FORMAL', 'NON_FORMAL');

-- CreateEnum
CREATE TYPE "Certificate" AS ENUM ('NONE', 'PROFESSIONAL', 'TRADE', 'WORKSHOP');

-- CreateEnum
CREATE TYPE "Recognition" AS ENUM ('STATE', 'NATIONAL', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('APPRENTICE', 'CRAFTMAN', 'MASTER', 'GRANDMASTER');

-- CreateTable
CREATE TABLE "Artisan" (
    "artisanId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "dp" TEXT NOT NULL DEFAULT 'none',
    "address" TEXT NOT NULL DEFAULT 'none',
    "description" TEXT NOT NULL DEFAULT 'none',
    "experience" "Experience" NOT NULL DEFAULT 'APPRENTICE',
    "education" "Education" NOT NULL DEFAULT 'NON_FORMAL',
    "training" "Training" NOT NULL DEFAULT 'NON_FORMAL',
    "certificate" "Certificate" NOT NULL DEFAULT 'NONE',
    "recongnition" "Recognition" NOT NULL DEFAULT 'STATE',
    "craftId" TEXT NOT NULL,
    "subCraftId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artisan_pkey" PRIMARY KEY ("artisanId")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "portfolioId" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "artisanId" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("portfolioId")
);

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_subCraftId_fkey" FOREIGN KEY ("subCraftId") REFERENCES "SubCraft"("subCraftId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artisan" ADD CONSTRAINT "Artisan_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "Craft"("craftId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "Artisan"("artisanId") ON DELETE CASCADE ON UPDATE CASCADE;
