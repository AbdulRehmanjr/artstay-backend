import prisma from "~/libs/prisma"
import { logger } from "~/utils/logger"
import { Request } from "express"

export const safariService = {
    getApplicationStatus: async (accountId: string) => {
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
    getAllSafarisPagination: async (req: Request) => {
        try {
            const queryParams = req.query
            const limit = Number(queryParams.limit)
            const skip = Number(queryParams.cursor ?? 0)
            const totalCount = await prisma.artisan.count();

            const safaris: SafariProps[] = await prisma.safari.findMany({
                take: limit,
                skip: skip,
                orderBy: {
                    createdAt: "desc",
                },
                distinct: ['safariId']
            })

            const nextCursor = skip + limit;
            const hasNextPage = nextCursor < totalCount;

            return {
                status: 'success',
                message: 'all safaris',
                data: {
                    safaris: safaris,
                    metadata: {
                        cursor: hasNextPage ? nextCursor.toString() : undefined,
                        hasNextPage,
                        totalItems: totalCount,
                        currentPage: Math.floor(skip / limit) + 1,
                        totalPages: Math.ceil(totalCount / limit),
                    }
                },
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Something went wrong')
        }
    },
    getAllSafaris: async () => {
        try {

            const safaris: SafariProps[] = await prisma.safari.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            })
            return {
                status: 'success',
                message: 'all safaris',
                data: safaris
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Something went wrong')
        }
    }
}
