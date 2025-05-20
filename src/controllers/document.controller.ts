import { Request, Response } from 'express';
import { docService } from '~/services/document.service';
import { logger } from '~/utils/logger';

export const craftDocumentorApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const result = await docService.getApplicationStatus(accountId);
    res.status(200).json(result);
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

export const createCraftDocumentorProfile = async (req: Request, res: Response) => {
  try {
    const result = await docService.createCraftDocumentorProfile(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to create craft documentor profile",
      data: null,
    });
  }
};
