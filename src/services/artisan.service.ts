import prisma from "~/libs/prisma"
import { logger } from "~/utils/logger"
import { Request } from "express"



export const artisanService = {
    getApplicationStatus: async (accountId: string) => {
        try {
            const application = await prisma.artisan.findUnique({
                where: {
                    accountId: accountId
                },
                include: {
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
    toggleStatus: async (req: Request) => {
        try {
            const { artisanId, status } = req.body
            await prisma.artisan.update({
                where: {
                    artisanId: artisanId
                },
                data: {
                    isActive: status
                }
            })
            return {
                status: 'success',
                message: 'artisan toggle status',
                data: null
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to fetch application status')
        }
    },
}
