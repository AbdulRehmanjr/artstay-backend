import { Request, Response } from 'express';
import { hotelService } from '~/services/hotel.service';
import { logger } from '~/utils/logger';

export const hotelApplicationtatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await hotelService.getApplicationStatus(accountId);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch application status",
      data: null,
    });
  }
};
