export interface Order {
  orderHeaderId: number;
  accountOwner: string;
  client: string;
  owner?: string;
  salesRepName?: string;
  poNumber: string;

  status: number;
  // status: 1 = Active, 2 = Partial, 3 = Complete, 4 = Hold
  amount: number;
  paymentTerms?: string;
  shippingNotes?: string;
  lastShippingDate?: Date;

  billingAddressId: number;
  billingAddress: string;
  billingCity: string;
  billingStateName: string;
  billingPostcode: string;
  billingEmail?: string;
  billingPhone?: string;
  
  shippingAddressId: number;
  shippingReceiver: string;
  shippingAddress: string;
  shippingCity: string;
  shippingStateName: string;
  shippingPostCode: string;
  shippingEmail?: string;
  shippingPhone?: string;

  orderItems: OrderItem[];
  
  createBy: string;
  createDate: Date;
  modifyBy: string;
  modifyDate: Date;
}

export interface OrderItem {
  orderDetailId: number | string;
  orderHeaderId: number | string;
  poNumber: string;
  discount?: number;
  estimateShippingDate?: Date;
  note?: string;
  photoFile?: string;
  status: number;
  subTotal: number;

  productId: string;
  productName: string;
  productNumber: string;
  productPrice: number;
  productQuantity: number;
  
  shippedQuantity: number;
  
  createBy: string;
  createDate: Date;
  modifyBy: string;
  modifyDate: Date;
}