import prisma from "~/libs/prisma"
import { logger } from "~/utils/logger"


export const safariService = {
    getApplicationStatus: async (accountId:string) => {
        try {
            const application = await prisma.safari.findUnique({
                where: {
                    accountId: accountId
                },
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
