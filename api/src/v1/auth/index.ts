import { Router } from 'express';
const router = Router();

import * as errors from '../../helpers/error';
import { Authentication } from '../../services/Authentication';
import { ILoginInput, ILoginOutput, IUser } from '../../types/user.types';
import { verifyToken } from '../../middleware/auth';

router.post('/register', (req, res) => {
  const auth = new Authentication();

  auth
    .createUser({
      fullName: req.body.firstName,
      email: req.body.email,
      password: req.body.password
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

router.post('/login', (req: ILoginInput, res) => {
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
        firstName: theUser.firstName,
        lastName: theUser.lastName,
        email: theUser.email
      };
      if (req.body.isRemember) {
        payload = {
          ...payload,
          refreshToken: theUser.refreshToken,
          authToken: theUser.authToken
        };
      }
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
