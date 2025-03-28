import { Router } from 'express';
import { createCraft, createSubCraft, getAllCrafts, getAllSubCraftsByCraftId } from '~/controllers/craft.controller';
import { validate } from '~/middlewares/zod.middleware';
import { CraftCreationSchema, SubCraftCreationSchema } from '~/schemas/craft';

const router = Router();

router.get('/',getAllCrafts)
router.get('/subcrafts/:craftId',getAllSubCraftsByCraftId)
router.post('/craft',validate(CraftCreationSchema),createCraft)
router.post('/subcraft',validate(SubCraftCreationSchema),createSubCraft)

export const craftRouter = router;