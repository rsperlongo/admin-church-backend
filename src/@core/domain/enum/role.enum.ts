export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
};
