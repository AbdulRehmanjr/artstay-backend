import { Router } from 'express';
import { artisanRouter } from '~/routers/artisan.routes';
import { accountRouter } from '~/routers/account.routes';
import { craftRouter } from '~/routers/craft.routes';

const router = Router();

router.use('/artisan',artisanRouter);
router.use('/account',accountRouter);
router.use('/craft',craftRouter)

export const mainRouter = router;