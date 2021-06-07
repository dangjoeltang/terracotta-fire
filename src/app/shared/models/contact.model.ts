export interface Contact {
  client: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  department: string;
  title: string;

  name: string;
  email: string;
  phone: string;
  fax: string;
  
  notes: string;


  createDate: Date;
  modifyDate: Date;
}