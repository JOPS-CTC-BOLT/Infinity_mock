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
  type?: string;
  productCode: string;
  productName: string;
  spec: string;
  stock: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  orderAmount: number;
  receivedUnitPrice: number;
  receivedAmount: number;
  profitAmount: number;
  note?: string;
  selected: boolean;
}