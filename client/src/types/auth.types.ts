export interface IRegisterIn {
  fullName: string;
  email: string;
  password: string;
}
export interface ILoginIn {
  email: string;
  password: string;
  isRemember: boolean;
}
export interface IAuthInfo {
  email: string;
  name: string;
}

export interface ILoginOutput {
  success: boolean;
  authToken?: string;
  refreshToken?: string;
  firstName: string;
  lastName: string;
  email: string;
}
