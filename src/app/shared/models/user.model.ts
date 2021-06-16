export interface Role {
  client?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  email: string;
  password?: string;
  roles: Role
}

export interface CustomerUser extends User {
  
}

export interface EmployeeUser extends User {

}