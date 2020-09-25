import { Router } from 'express';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import RecoveryPasswordController from '@modules/users/infra/http/controllers/RecoveryPasswordConteoller';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const recoveryPasswordController = new RecoveryPasswordController();

passwordRouter.patch('/reset', resetPasswordController.create);
passwordRouter.post('/recovery', recoveryPasswordController.create);

export default passwordRouter;
