
// export interface Client {
//   accountNumber: string;
//   name: string;

//   businessType: string;
//   accountType: string;
//   companySize: string;
//   discount: string;
//   paymentTerms: string;
//   taxResaleNumber: string;

//   streetAddress: StreetAddress;

//   contacts: Contact[];
// }

export interface Client {
  name: string;
  clientId: string;
  email: string;
  phone: string;
  fax: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}
export interface StreetAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Contact {
  name: string;
  phone: string;
  email: string;
  fax: string;
}