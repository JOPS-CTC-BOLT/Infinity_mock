import { useState } from "react";
import { OrderForm } from "./order-form";
import { OrderDetail } from "./types";
import { useParams } from "@remix-run/react";

// サンプルの初期値データ
const sampleEditData = {
  purchaseOrderNo: "0000415820",
  register: "松本 一郎",
  orderDate: new Date("2025-03-14"),
  department: "702050 松本支店",
  supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
  purchaseType: "取次",
  customer: "010001 スワテック建設",
  site: "000003 土木部",
};

const sampleEditDetails: OrderDetail[] = [
  {
    id: "1",
    productCode: "00130400040-00358",
    productName: "扇島型河川監視カメラ",
    spec: "1080p対応",
    quantity: 2,
    unit: "個",
    unitPrice: 655000,
    orderAmount: 1310000,
    receivedUnitPrice: 800000,
    receivedAmount: 1600000,
    profitAmount: 290000,
    note: "",
    selected: false,
  },
  {
    id: "2",
    productCode: "00130400040-00023",
    productName: "SDカード 64GB",
    spec: "Class 10",
    quantity: 2,
    unit: "個",
    unitPrice: 5000,
    orderAmount: 10000,
    receivedUnitPrice: 6500,
    receivedAmount: 13000,
    profitAmount: 3000,
    note: "",
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