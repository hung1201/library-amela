import * as bcrypt from 'bcryptjs';
import db from '../db/models';
import { ILoginInput, IRegisterIn } from '../types/user.types';
import { Token } from './Token';
import { User } from './User';
import * as mail from '../helpers/sendEmail';

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

    const user = new User(fullName, email);

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

    const user = new User(null, email);
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
      fullName: userExists.fullName,
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

  forgotPassword = async (email: string) => {
    const data = await mail.sendMail(
      email,
      'Password Reset',
      `Please click the link to reset your password: http://localhost:3000/reset-password?email=${email}`
    );

    if (data?.messageId) {
      return { success: true, message: 'Please check your email for further instructions.' };
    }
    return new Error('There was an error sending the email');
  };
  resetPassword = async (body: { email: string; password: string; confirmPassword: string }) => {
    if (body.password !== body.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    const user = new User(null, body.email);
    const userExists = await user.doesUserExist();
    if (!userExists) {
      throw new Error('No matching user.');
    }
    await user.updateUserPassword(this.hashPassword(body.password));

    return { success: true, message: 'Password reset successfully' };
  };
}

export { Authentication };
