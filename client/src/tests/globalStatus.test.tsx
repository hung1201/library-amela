require('dotenv').config();
import * as AuthService from '../services/auth';

const incorrectUserDetails: any = {
  email: '--',
  password: '--'
};
const correctUserDetails: any = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD
};

describe('Logging in global status', () => {
  beforeEach(() => {
    return AuthService.loginUser({
      email: correctUserDetails.email,
      password: correctUserDetails.password,
      isRemember: true
    });
  });

  beforeEach(() => {
    return AuthService.loginUser({
      email: incorrectUserDetails.email,
      password: incorrectUserDetails.password,
      isRemember: true
    });
  });
});
