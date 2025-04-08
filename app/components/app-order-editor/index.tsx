import { useState } from "react";
import { OrderForm } from "./order-form";
import { OrderDetail } from "./types";
import { useParams } from "@remix-run/react";

// サンプルの初期値データ
const sampleEditData = {
  purchaseOrderNo: "P-0101",
  register: "田中太郎",
  orderNo: "S-101",
  department: "仙台営業所",
  orderRegistrationType: "販売",
  OrderDate: new Date("2021-11-13"),
  supplierName: "株式会社△△",
  purchaseOrderDate: new Date("2021-11-15"),
  purchaseOrderStatuses: "未発注",
  purchaseOrderName: "株式会社△△",
  arrivalDesiredDeliveryDate: new Date("2021-11-15"),
  desiredDeliveryDate: new Date("2021-11-15"),
  arrivalDeliveryDateConfirmed: new Date("2021-11-15"),
  deadlineType: "希望納期",
  customerName: "協立設備株式会社",
  siteName: "仙台松森工場三次送熱設備工事（2号炉）追加",
  orderType: "在庫",
  transactionType: "通常",
  directDeliveryName: "",
  supplierTaxType: "外税10%",
  supplierTaxCalculationType: "締切単位",
  salesTaxType: "外税10%",
  salesTaxCalculationType: "締切単位",
  NumberOfTags: "",
  purchaser: "長谷川一郎",
  seller: "長谷川一郎",
  uploadAt: new Date("2021-11-16"),
  approvalAt: null,
};

const sampleEditDetails: OrderDetail[] = [
  {
    id: "1",
    type: "通常",
    productCode: "00130400040-00358",
    productName: "扇島型河川監視カメラ",
    spec: "1080p対応",
    stock: "10",
    quantity: 2,
    unit: "個",
    unitPrice: 655000,
    orderAmount: 1310000,
    tax: 131000,
    receivedUnitPrice: 0,
    receivedAmount: 0,
    receivedTax: 0,
    profitAmount: 0,
    warehouseCode: "",
    warehouseName: "",
    selected: false,
  },
  {
    id: "2",
    type: "通常",
    productCode: "00130400040-00023",
    productName: "SDカード 64GB",
    spec: "Class 10",
    stock: "50",
    quantity: 2,
    unit: "個",
    unitPrice: 5000,
    orderAmount: 10000,
    tax: 1000,
    receivedUnitPrice: 0,
    receivedAmount: 0,
    receivedTax: 0,
    profitAmount: 0,
    warehouseCode: "",
    warehouseName: "",
    selected: false,
  },
];

export default function OrderEditor() {
  const { id } = useParams();
  const isEdit = !!id;

  const [details, setDetails] = useState<OrderDetail[]>(
    isEdit ? sampleEditDetails : []
  );

  return (
    <div className="space-y-6">
      <OrderForm
        details={details}
        setDetails={setDetails}
        defaultValues={isEdit ? sampleEditData : undefined}
      />
    </div>
  );
}