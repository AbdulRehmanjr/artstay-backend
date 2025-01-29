-- AlterTable
ALTER TABLE "Craft" ADD COLUMN     "craftSlug" TEXT NOT NULL DEFAULT 'none';

-- AlterTable
ALTER TABLE "SubCraft" ADD COLUMN     "subCraftSlug" TEXT NOT NULL DEFAULT 'none';
