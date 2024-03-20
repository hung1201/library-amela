import { Router } from 'express';
const router = Router();

import * as errors from '../../helpers/error';
import { Authentication } from '../../services/Authentication';
import { ILoginInput, ILoginOutput, IUser } from '../../types/user.types';
import { verifyToken } from '../../middleware/auth';
import * as validation from '../../helpers/requestSchemaValidation';
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from './schema';

router.post('/register', validation.requestSchemaValidation(registerSchema), (req, res) => {
  const auth = new Authentication();

  auth
    .createUser({
      ...req.body
    })
    .then(() => {
      return res.send({
        success: true,
        message: 'Thanks for registering! Please log in to continue.'
      });
    })
    .catch((err: any) => {
      return errors.errorHandler(res, err.message, null);
    });
});

router.post(
  '/forgot-password',
  validation.requestSchemaValidation(forgotPasswordSchema),
  (req, res) => {
    const auth = new Authentication();

    auth
      .forgotPassword(req.body.email)
      .then(() => {
        return res.send({
          success: true,
          message: 'Please check your email for further instructions.'
        });
      })
      .catch((err: any) => {
        return errors.errorHandler(res, err.message, null);
      });
  }
);

router.post(
  '/reset-password',
  validation.requestSchemaValidation(resetPasswordSchema),
  (req, res) => {
    const auth = new Authentication();
    auth
      .resetPassword(req.body)
      .then(() => {
        return res.send({
          success: true,
          message: 'Your password has been reset. Please log in.'
        });
      })
      .catch((err: any) => {
        return errors.errorHandler(res, err.message, null);
      });
  }
);

router.post('/login', validation.requestSchemaValidation(loginSchema), (req: ILoginInput, res) => {
  const authentication = new Authentication();

  return authentication
    .loginUser({
      email: req.body.email,
      password: req.body.password,
      isRemember: req.body.isRemember
    })
    .then((theUser: IUser) => {
      let payload: ILoginOutput = {
        success: true,
        fullName: theUser.fullName,
        email: theUser.email,
        isRemember: req.body.isRemember,
        refreshToken: theUser.refreshToken,
        authToken: theUser.authToken
      };

      return theUser && res.send(payload);
    })
    .catch((err: any) => {
      return errors.errorHandler(res, err.message, null);
    });
});

router.post('/validate', (req, res) => {
  const authentication = new Authentication();
  return authentication
    .validateToken(req.body.token)
    .then(() => {
      res.send({
        success: true
      });
    })
    .catch((err: string) => {
      res.send({
        success: false
      });
    });
});

router.use(verifyToken());

router.post('/protected', (req, res) => {
  res.send({
    success: true
  });
});

module.exports = router;
