export enum Role {
    User = 'user',
    Admin = 'admin',
  }

type User = {
    id: string;
    email: string;
    password: string;
    role: Role;
}