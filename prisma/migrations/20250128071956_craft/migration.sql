-- CreateTable
CREATE TABLE "Craft" (
    "craftId" TEXT NOT NULL,
    "craftName" TEXT NOT NULL DEFAULT 'none',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Craft_pkey" PRIMARY KEY ("craftId")
);

-- CreateTable
CREATE TABLE "SubCraft" (
    "subCraftId" TEXT NOT NULL,
    "subCraftName" TEXT NOT NULL DEFAULT 'none',
    "craftId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubCraft_pkey" PRIMARY KEY ("subCraftId")
);

-- AddForeignKey
ALTER TABLE "SubCraft" ADD CONSTRAINT "SubCraft_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "Craft"("craftId") ON DELETE CASCADE ON UPDATE CASCADE;
