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
    selected: false,
    productName: "0013010020-00001 NECﾉｰﾄPC PC-VKV50FB9B21M",
    spec: "",
    quantity: 5,
    unitPrice: 195700,
    orderAmount: 978500,
    receivedUnitPrice: 250000,
    receivedAmount: 1250000,
    profitAmount: 271500,
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
        defaultValues={
          isEdit ? sampleEditData : { department: "702050 松本支店" }
        }
      />
    </div>
  );
}
