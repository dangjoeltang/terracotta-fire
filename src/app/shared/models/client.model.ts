
export interface Client {
  accountNumber: string;
  name: string;

  businessType: string;
  accountType: string;
  companySize: string;

  streetAddress: StreetAddress;

  paymentTerms: string;
  taxResaleNumber: string;
  contacts: Contact[];
}

export interface StreetAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Contact {
  mainContact: boolean;
  phone: string;
  email: string;
  fax: string;
}