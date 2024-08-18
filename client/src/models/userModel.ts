export interface UserLoginModel {
  emailOrUsername: string;
  password: string;
}
export interface UserRegisterModel {
  email: string;
  username: string;
  password: string;
}
export interface UserModel {
  id: number;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
