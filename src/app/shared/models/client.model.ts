export interface Client {
  clientId: string;
  groupId: number|string;
  accountId: number|string;
  number: string;
  name: string;
  clientType: number|string;
  discount: string;
  state: string;
  city: string;
  address: string;
  postcode: string;

  mainContact: string;
  phone: string;
  paymentTerms: string;
  size: number|string;
  attachment: string;
  description: string;
  registerTaxCode: string;

  createBy: string;
  modifyBy: string;

  businessType: string;
  accountType: number|string;
  purchaseContact: string;
  billingContact: string;

  createDate: Date;
  modifyDate: Date;
}
