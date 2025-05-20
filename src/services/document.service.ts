// craft.service.ts
import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";

export const docService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.craftDocumentor.findUnique({
        where: {
          accountId: accountId,
        },
        include: {
          documentedCrafts: true,
        }
      });
      return {
        status: "success",
        message: "application status",
        data: application,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },

  createCraftDocumentorProfile: async (documentorData: CraftDocumentorInput) => {
    try {
      // Create new craft documentor profile
      const documentor = await prisma.craftDocumentor.create({
        data: {
          firstName: documentorData.firstName,
          lastName: documentorData.lastName,
          profileImage: documentorData.profileImage || "none",
          bio: documentorData.bio,
          expertise: documentorData.expertise,
          location: documentorData.location,
          equipment: documentorData.equipment,
          yearsOfExperience: documentorData.yearsOfExperience,
          documentationStyle: documentorData.documentationStyle,
          mediaTypes: documentorData.mediaTypes,
          accountId: documentorData.accountId,
          portfolioLinks: documentorData.portfolioLinks || [],
        },
      });

      // If there are documented crafts provided, create them
      if (documentorData.documentedCrafts && documentorData.documentedCrafts.length > 0) {
        for (const craft of documentorData.documentedCrafts) {
          await prisma.documentedCraft.create({
            data: {
              craftName: craft.craftName,
              region: craft.region,
              description: craft.description,
              mediaUrls: craft.mediaUrls || [],
              documentorId: documentor.documentorId,
            }
          });
        }
      }

      return {
        status: "success",
        message: "Craft documentor profile created successfully",
        data: {
          documentorId: documentor.documentorId,
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create craft documentor profile");
    }
  },

  // Additional methods to be implemented later
};

