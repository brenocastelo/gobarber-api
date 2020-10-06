import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import confirmAuthentication from '../middlewares/confirmAuthentication';

const profilerRouter = Router();

const profileController = new ProfileController();

profilerRouter.use(confirmAuthentication);

profilerRouter.get('/', profileController.show);
profilerRouter.put('/', profileController.update);

export default profilerRouter;
