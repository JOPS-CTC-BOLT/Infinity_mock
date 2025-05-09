export interface Product {
  id: string;
  code: string;
  name: string;
  spec: string;
  unit: string;
  unitPrice: number;
  stock: number;
}

export interface OrderDetail {
  id: string;
  selected: boolean;
  productName: string;
  spec: string;
  quantity: number;
  unitPrice: number;
  orderAmount: number;
  receivedUnitPrice: number;
  receivedAmount: number;
  profitAmount: number;
  note?: string;
}
