import prisma from "~/libs/prisma"
import { logger } from "~/utils/logger"




export const artisanService = {
    getApplicationStatus: async (accountId:string) => {
        try {
            const application = await prisma.artisan.findUnique({
                where: {
                    accountId: accountId
                },
                include : {
                    craft: true,
                    subCraft: true
                }
            })
            return {
                status: 'success',
                message: 'application status',
                data: application
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to fetch application status')
        }
    },
}
