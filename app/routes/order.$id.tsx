import { MetaFunction } from "@remix-run/node";
import { Inbox, ArrowLeft, Trash2, Edit, Copy, Check, Save, Share2, Printer } from "lucide-react";
import { Button } from "~/components/ui/button";
import { NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "発注詳細" },
    { name: "description", content: "Order detail page" },
  ];
};

export const handle = {
  title: "発注詳細",
  icon: Inbox,
};

interface OrderDetail {
  id: string;
  productCode: string;
  productName: string;
  stock: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  orderAmount: number;
  tax: number;
  receivedUnitPrice: number;
  receivedAmount: number;
  receivedTax: number;
  profitAmount: number;
  warehouseCode: string;
  warehouseName: string;
}

export default function OrderDetail() {
  // サンプルデータ
  const orderDetails: OrderDetail[] = [
    {
      id: "00130400040-00358",
      productCode: "00130400040-00358",
      productName: "扇島型河川監視カメラ",
      stock: "✓",
      quantity: 2,
      unit: "個",
      unitPrice: 655000,
      orderAmount: 1310000,
      tax: 0,
      receivedUnitPrice: 0,
      receivedAmount: 0,
      receivedTax: 0,
      profitAmount: 0,
      warehouseCode: "",
      warehouseName: "",
    },
    {
      id: "00130400040-00023",
      productCode: "00130400040-00023",
      productName: "SDカード 64GB",
      stock: "✓",
      quantity: 2,
      unit: "個",
      unitPrice: 0,
      orderAmount: 0,
      tax: 0,
      receivedUnitPrice: 0,
      receivedAmount: 0,
      receivedTax: 0,
      profitAmount: 0,
      warehouseCode: "",
      warehouseName: "",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="py-6 text-4xl font-bold flex items-center gap-4">
          <NavLink to="..">
            <ArrowLeft className="h-8 w-8" />
          </NavLink>
          {handle.title}
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium">発注番号</div>
            <div>P-0101</div>
          </div>
          <div>
            <div className="font-medium">登録者</div>
            <div>田中太郎</div>
          </div>
          <div>
            <div className="font-medium">受注番号</div>
            <div>S-101</div>
          </div>
          <div>
            <div className="font-medium">部門</div>
            <div>仙台営業部</div>
          </div>
          <div>
            <div className="font-medium">発注登録区分</div>
            <div>販売</div>
          </div>
          <div>
            <div className="font-medium">発注日</div>
            <div>2021/11/13</div>
          </div>
          <div>
            <div className="font-medium">発注日</div>
            <div>2021/11/15</div>
          </div>
          <div>
            <div className="font-medium">発注ステータス</div>
            <div>未発注</div>
          </div>
          <div>
            <div className="font-medium">発注先名称</div>
            <div>株式会社△△</div>
          </div>
          <div>
            <div className="font-medium">入荷希望納期</div>
            <div>2021/11/15</div>
          </div>
          <div>
            <div className="font-medium">入荷確定納期</div>
            <div>2021/11/15</div>
          </div>
          <div>
            <div className="font-medium">希望納期</div>
            <div>2021/11/15</div>
          </div>
          <div>
            <div className="font-medium">納期確定</div>
            <div>希望納期</div>
          </div>
          <div>
            <div className="font-medium">得意先名称</div>
            <div>協立設備株式会社</div>
          </div>
          <div>
            <div className="font-medium">現場名称</div>
            <div>仙台松森工場三次送熱設備工事（2号炉）追加</div>
          </div>
          <div>
            <div className="font-medium">調達区分</div>
            <div>在庫</div>
          </div>
          <div>
            <div className="font-medium">取引区分</div>
            <div>通常</div>
          </div>
          <div>
            <div className="font-medium">原価名称</div>
            <div></div>
          </div>
          <div>
            <div className="font-medium">仕入税区分</div>
            <div>外税10%</div>
          </div>
          <div>
            <div className="font-medium">仕入税計算</div>
            <div>締切単位</div>
          </div>
          <div>
            <div className="font-medium">売上税計算</div>
            <div>外税10%</div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-8">
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">発注計</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">受注計</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">小売金額計</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">原価金額計</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">粗利金額計</div>
            <div className="text-xl">999,999,999</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="p-4 font-medium border-b">明細一覧</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-2 text-left font-medium">区分</th>
                <th className="p-2 text-left font-medium">商品番号</th>
                <th className="p-2 text-left font-medium">商品名</th>
                <th className="p-2 text-left font-medium">規格</th>
                <th className="p-2 text-left font-medium">在庫確認</th>
                <th className="p-2 text-left font-medium">発注数</th>
                <th className="p-2 text-left font-medium">単位</th>
                <th className="p-2 text-right font-medium">発注単価</th>
                <th className="p-2 text-right font-medium">発注金額</th>
                <th className="p-2 text-right font-medium">消費税</th>
                <th className="p-2 text-right font-medium">受注単価</th>
                <th className="p-2 text-right font-medium">受注金額</th>
                <th className="p-2 text-right font-medium">消費税</th>
                <th className="p-2 text-right font-medium">粗利金額</th>
                <th className="p-2 text-left font-medium">倉庫番号</th>
                <th className="p-2 text-left font-medium">倉庫名</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((detail) => (
                <tr key={detail.id} className="border-b">
                  <td className="p-2">通常</td>
                  <td className="p-2">{detail.productCode}</td>
                  <td className="p-2">{detail.productName}</td>
                  <td className="p-2"></td>
                  <td className="p-2">{detail.stock}</td>
                  <td className="p-2">{detail.quantity}</td>
                  <td className="p-2">{detail.unit}</td>
                  <td className="p-2 text-right">{detail.unitPrice.toLocaleString()}</td>
                  <td className="p-2 text-right">{detail.orderAmount.toLocaleString()}</td>
                  <td className="p-2 text-right">{detail.tax.toLocaleString()}</td>
                  <td className="p-2 text-right">{detail.receivedUnitPrice.toLocaleString()}</td>
                  <td className="p-2 text-right">{detail.receivedAmount.toLocaleString()}</td>
                  <td className="p-2 text-right">{detail.receivedTax.toLocaleString()}</td>
                  <td className="p-2 text-right">{detail.profitAmount.toLocaleString()}</td>
                  <td className="p-2">{detail.warehouseCode}</td>
                  <td className="p-2">{detail.warehouseName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}