// controllers/languageService.controller.ts

import { Request, Response } from 'express';
import { languageServiceService } from '~/services/language.service';
import { logger } from '~/utils/logger';

export const createLanguageService = async (req: Request, res: Response) => {
    try {
        const languageService = req.body;
        const result = await languageServiceService.createLanguageService(languageService);
        res.status(201).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create language service',
            data: null
        });
    }
};

export const updateLanguageService = async (req: Request, res: Response) => {
    try {
        const { languageServiceId } = req.params;
        const languageService = req.body;
        const result = await languageServiceService.updateLanguageService({
            ...languageService,
            languageServiceId
        });
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update language service',
            data: null
        });
    }
};

export const deleteLanguageService = async (req: Request, res: Response) => {
    try {
        const { languageServiceId } = req.params;
        const result = await languageServiceService.deleteLanguageService(languageServiceId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to delete language service',
            data: null
        });
    }
};

export const getLanguageServiceById = async (req: Request, res: Response) => {
    try {
        const { languageServiceId } = req.params;
        const result = await languageServiceService.getLanguageServiceById(languageServiceId);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch language service',
            data: null
        });
    }
};

export const getAllLanguageServices = async (req: Request, res: Response) => {
    try {
        const result = await languageServiceService.getAllLanguageServices();
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch language services',
            data: null
        });
    }
};

export const getLanguageServiceFilters = async (req: Request, res: Response) => {
    try {
        const result = await languageServiceService.getLanguageServiceFilters();
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch language service filters',
            data: null
        });
    }
};

export const toggleLanguageServiceStatus = async (req: Request, res: Response) => {
    try {
        const { languageServiceId } = req.params;
        const { status } = req.body;
        const result = await languageServiceService.toggleLanguageServiceStatus(languageServiceId, status);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update language service status',
            data: null
        });
    }
};