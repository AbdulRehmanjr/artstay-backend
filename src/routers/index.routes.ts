import { Router } from 'express';
import { artisanRouter } from '~/routers/artisan.routes';
import { accountRouter } from '~/routers/account.routes';

const router = Router();

router.use('/artisan',artisanRouter);
router.use('/account',accountRouter);

export const mainRouter = router;