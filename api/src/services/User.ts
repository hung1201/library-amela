import db from '../db/models';

class User {
  public fullName: string;
  public email: string;
  public passwordHash: string;

  constructor(fullName: string | null, email: string | null) {
    if (fullName) {
      this.fullName = fullName;
    }
    if (email) {
      this.email = email;
    }
  }

  setHashedPassword(passwordHash: string) {
    this.passwordHash = passwordHash;
  }

  doesUserExist() {
    return db.users.findOne({
      raw: true,
      where: { email: this.email }
    });
  }

  saveUser() {
    return db.users.create({
      fullName: this.fullName,
      email: this.email,
      password: this.passwordHash
    });
  }

  getUser(userId: number) {
    return db.users.findOne({
      raw: true,
      where: { id: userId },
      attributes: ['fullName', 'email']
    });
  }
}

export { User };
