export interface User {
  email: string;
  password?: string;
}

export interface CustomerUser extends User {
  
}

export interface EmployeeUser extends User {

}