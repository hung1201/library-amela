import * as bcrypt from 'bcrypt';

import db from '../db/models';
import { ILoginInput, IRegisterIn } from '../types/user.types';

import { Token } from './Token';
import { User } from './User';

/**
 * Class to abstract the higher level authentication logic away from
 * specific user actions
 */
class Authentication {
  constructor() {}

  async createUser({ fullName, email, password }: Partial<IRegisterIn>) {
    if (!email || !fullName || !password) {
      throw new Error('You must send all register details.');
    }

    const user = new User(fullName, '', email);

    const userExists = await user.doesUserExist();
    if (userExists) {
      throw new Error('User already registered.');
    }

    user.setHashedPassword(this.hashPassword(password));
    const newUser = await user.saveUser();

    await this.logUserActivity(newUser.id, 'signup');

    return newUser;
  }

  async loginUser({ email, password, isRemember }: ILoginInput['body']) {
    if (!email || !password) {
      throw new Error('You must send all login details.');
    }

    const user = new User(null, null, email);
    const token = new Token();

    const userExists = await user.doesUserExist();
    if (!userExists) {
      throw new Error('No matching user.');
    }

    try {
      await this.compareHashedPassword(password, userExists.password);
    } catch (e) {
      throw e;
    }
    await token.createToken(userExists);
    await token.createRefreshToken(userExists.email);

    await this.logUserActivity(userExists.id, 'login');

    return {
      id: userExists.id,
      authToken: token.token,
      refreshToken: token.refreshToken,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.email
    };
  }

  private hashPassword(password: string) {
    return password && bcrypt.hashSync(password.trim(), 12);
  }

  private compareHashedPassword(password: string, hashedPassword: string) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, hashedPassword, (err: Error, success: boolean) => {
        if (err) {
          rej(new Error('The has been an unexpected error, please try again later'));
        }
        if (!success) {
          rej(new Error('Your password is incorrect.'));
        } else {
          res(true);
        }
      });
    });
  }

  logUserActivity(userId: number, activity: string) {
    return db.login_activity.create({ userId, activityType: activity });
  }

  async validateToken(tokenToCheck: string) {
    const token = new Token(tokenToCheck);

    if (!token.token) {
      throw new Error('No auth token.');
    }

    return await token.validateAuthToken(token.token);
  }
}

export { Authentication };