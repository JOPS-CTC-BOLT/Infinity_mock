import { MetaFunction } from "@remix-run/node";
import { Inbox, Plus, Trash2 } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "発注登録" },
    { name: "description", content: "Create new order" },
  ];
};

export const handle = {
  title: "発注登録",
  icon: Inbox,
};

interface OrderDetail {
  id: string;
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
  remarks: string;
}

export default function OrderNew() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [details, setDetails] = useState<OrderDetail[]>([]);

  const orderTypes = ["在庫", "直送", "工事", "その他"];
  const departments = [
    "仙台営業所",
    "東京支店",
    "大阪支店",
    "名古屋営業所",
    "福岡営業所",
  ];
  const deadlineTypes = ["希望納期", "確定納期"];
  const units = ["個", "箱", "式", "本"];

  const addDetail = () => {
    const newDetail: OrderDetail = {
      id: crypto.randomUUID(),
      productCode: "",
      productName: "",
      quantity: 0,
      unit: "",
      unitPrice: 0,
      amount: 0,
      remarks: "",
    };
    setDetails([...details, newDetail]);
  };

  const removeDetail = (id: string) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };

  const updateDetail = (
    id: string,
    field: keyof OrderDetail,
    value: string | number
  ) => {
    setDetails(
      details.map((detail) => {
        if (detail.id === id) {
          const updatedDetail = { ...detail, [field]: value };
          // 数量か単価が変更された場合は金額を再計算
          if (field === "quantity" || field === "unitPrice") {
            updatedDetail.amount =
              updatedDetail.quantity * updatedDetail.unitPrice;
          }
          return updatedDetail;
        }
        return detail;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="py-6 text-4xl font-bold">{handle.title}</div>

      <div className="rounded-lg border p-6 space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">受注番号</label>
            <Input placeholder="受注番号を入力" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">調達区分</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="調達区分を選択" />
              </SelectTrigger>
              <SelectContent>
                {orderTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">仕入先名</label>
            <Input placeholder="仕入先名を入力" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">現場名</label>
            <Input placeholder="現場名を入力" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">納期指定</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="納期指定を選択" />
              </SelectTrigger>
              <SelectContent>
                {deadlineTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">納期</label>
            <div className="border rounded-md">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">部門</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="部門を選択" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">担当者</label>
            <Input placeholder="担当者名を入力" />
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <label className="text-sm font-medium">備考</label>
          <textarea
            className="w-full h-32 px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="備考を入力"
          />
        </div>

        <div className="pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">明細</label>
            <Button onClick={addDetail} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              明細追加
            </Button>
          </div>

          <div className="space-y-4">
            {details.map((detail) => (
              <div
                key={detail.id}
                className="grid grid-cols-12 gap-4 p-4 border rounded-lg"
              >
                <div className="col-span-2">
                  <label className="text-sm font-medium">品番</label>
                  <Input
                    value={detail.productCode}
                    onChange={(e) =>
                      updateDetail(detail.id, "productCode", e.target.value)
                    }
                    placeholder="品番を入力"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">品名</label>
                  <Input
                    value={detail.productName}
                    onChange={(e) =>
                      updateDetail(detail.id, "productName", e.target.value)
                    }
                    placeholder="品名を入力"
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-sm font-medium">数量</label>
                  <Input
                    type="number"
                    value={detail.quantity}
                    onChange={(e) =>
                      updateDetail(
                        detail.id,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    placeholder="数量"
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-sm font-medium">単位</label>
                  <Select
                    onValueChange={(value) =>
                      updateDetail(detail.id, "unit", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="単位" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">単価</label>
                  <Input
                    type="number"
                    value={detail.unitPrice}
                    onChange={(e) =>
                      updateDetail(
                        detail.id,
                        "unitPrice",
                        Number(e.target.value)
                      )
                    }
                    placeholder="単価を入力"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">金額</label>
                  <Input value={detail.amount} disabled placeholder="金額" />
                </div>

                <div className="col-span-1 flex items-end">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeDetail(detail.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("..")}>
          キャンセル
        </Button>
        <Button onClick={() => navigate("..")}>登録</Button>
      </div>
    </div>
  );
}
