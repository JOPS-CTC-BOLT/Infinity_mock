import { MetaFunction } from "@remix-run/node";
import {
  ArrowLeft,
  Trash2,
  Edit,
  Copy,
  Check,
  Save,
  Share2,
  Printer,
  BookOpen,
  SquarePen,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { NavLink } from "@remix-run/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";
import { useMemo, useState } from "react";
import { handle as index_handle } from "app/routes/order.$id";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export const meta: MetaFunction = () => {
  return [
    { title: "発注詳細" },
    { name: "description", content: "Order detail page" },
  ];
};

export const handle = {};

interface OrderDetail {
  selected: boolean;
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
  const orderDetailsData: OrderDetail[] = [
    {
      selected: false,
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
      selected: false,
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

  const [orderDetails, setOrderDetails] = useState(orderDetailsData);
  const isAllChecked = useMemo(
    () => orderDetails.every((detail) => detail.selected),
    [orderDetails]
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="py-6 text-4xl font-bold">{index_handle.title}</div>
        <div className="flex gap-2">
          <Button variant="destructive" size="default">
            <Trash2 className="h-4 w-4" />
            削除
          </Button>
          <Button variant="outline" size="default" asChild>
            <NavLink to="../">
              <ArrowLeft className="h-4 w-4" />
              一覧
            </NavLink>
          </Button>
          <Button variant="outline" size="default" asChild>
            <NavLink to="./edit">
              <Edit className="h-4 w-4" />
              編集
            </NavLink>
          </Button>
          <Button variant="outline" size="default">
            <Copy className="h-4 w-4" />
            複写
          </Button>
          <Button variant="outline" size="default">
            <Check className="h-4 w-4" />
            申請
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="default">
                <Save className="h-4 w-4" />
                データ確定
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  発注データを確定しますか？
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>戻る</AlertDialogCancel>
                <AlertDialogAction>確定</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" size="default">
            <Share2 className="h-4 w-4" />
            データ送信
          </Button>
          <Button variant="outline" size="default">
            <Printer className="h-4 w-4" />
            データ出力
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
            <div className="font-medium">受注日</div>
            <div>2021/11/13</div>
          </div>
          <div>
            <div className="font-medium">仕入先名称</div>
            <div>株式会社△△</div>
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
            <div className="font-medium">直送先住所</div>
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
          <div>
            <div className="font-medium">荷札枚数</div>
            <div></div>
          </div>
          <div>
            <div className="font-medium">仕入担当者</div>
            <div>長谷川一郎</div>
          </div>
          <div>
            <div className="font-medium">売上担当者</div>
            <div>長谷川一郎</div>
          </div>
          <div>
            <div className="font-medium">最終更新日</div>
            <div>2021/11/16</div>
          </div>
          <div>
            <div className="font-medium">承認日</div>
            <div></div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-8">
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">数量計</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">容重量計</div>
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
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">粗利率</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">小売金額</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">粗利金額</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">粗利率</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">発注金額</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">消費税等</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">発注伝票合計</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">受注金額</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">消費税等</div>
            <div className="text-xl">999,999,999</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">受注伝票合計</div>
            <div className="text-xl">999,999,999</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="pb-4 font-medium">明細一覧</div>
        <div className="overflow-x-auto border-y">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={isAllChecked}
                    onClick={() =>
                      setOrderDetails((orderDetails) =>
                        orderDetails.map((detail) => ({
                          ...detail,
                          selected: !isAllChecked,
                        }))
                      )
                    }
                  />
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  区分
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  商品番号
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  商品名
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  規格
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  在庫確認
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  発注数
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  単位
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  単価履歴
                </TableHead>
                <TableHead className="p-2 text-right font-medium">
                  発注単価
                </TableHead>
                <TableHead className="p-2 text-right font-medium">
                  発注金額
                </TableHead>
                <TableHead className="p-2 text-right font-medium">
                  消費税
                </TableHead>
                <TableHead className="p-2 text-right font-medium">
                  受注単価
                </TableHead>
                <TableHead className="p-2 text-right font-medium">
                  受注金額
                </TableHead>
                <TableHead className="p-2 text-right font-medium">
                  消費税
                </TableHead>
                <TableHead className="p-2 text-right font-medium">
                  粗利金額
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  倉庫番号
                </TableHead>
                <TableHead className="p-2 text-left font-medium">
                  倉庫名
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails.map((detail) => (
                <TableRow key={detail.id} className="border-b">
                  <TableCell>
                    <Checkbox
                      checked={detail.selected}
                      onClick={() =>
                        setOrderDetails((orderDetails) =>
                          orderDetails.map((d) =>
                            d.id === detail.id
                              ? { ...d, selected: !d.selected }
                              : d
                          )
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">通常</TableCell>
                  <TableCell className="p-2">{detail.productCode}</TableCell>
                  <TableCell className="p-2">{detail.productName}</TableCell>
                  <TableCell className="p-2"></TableCell>
                  <TableCell className="p-2">
                    <Button variant="ghost" size="icon">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="p-2">{detail.quantity}</TableCell>
                  <TableCell className="p-2">{detail.unit}</TableCell>
                  <TableCell className="p-2">
                    <Button variant="ghost" size="icon">
                      <SquarePen className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    {detail.unitPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    {detail.orderAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    {detail.tax.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    {detail.receivedUnitPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    {detail.receivedAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    {detail.receivedTax.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    {detail.profitAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2">{detail.warehouseCode}</TableCell>
                  <TableCell className="p-2">{detail.warehouseName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
