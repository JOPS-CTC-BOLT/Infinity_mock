import { MetaFunction } from "@remix-run/node";
import { Inbox, Plus, Search, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

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

interface Product {
  id: string;
  code: string;
  name: string;
  spec: string;
  unit: string;
  unitPrice: number;
  stock: number;
}

interface OrderDetail {
  id: string;
  productCode: string;
  productName: string;
  spec: string;
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

const sampleProducts: Product[] = [
  {
    id: "1",
    code: "00130400040-00358",
    name: "扇島型河川監視カメラ",
    spec: "1080p対応",
    unit: "個",
    unitPrice: 655000,
    stock: 10,
  },
  {
    id: "2",
    code: "00130400040-00023",
    name: "SDカード 64GB",
    spec: "Class 10",
    unit: "個",
    unitPrice: 5000,
    stock: 50,
  },
  {
    id: "3",
    code: "00130400040-00854",
    name: "取付金具",
    spec: "ステンレス製",
    unit: "個",
    unitPrice: 2000,
    stock: 100,
  },
];

export default function OrderNew() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [details, setDetails] = useState<OrderDetail[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

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
  const orderRegistrationTypes = ["販売", "在庫", "その他"];
  const orderStatuses = ["未発注", "発注済", "納品済", "検収済"];
  const transactionTypes = ["通常", "返品", "値引"];
  const taxTypes = ["外税10%", "内税10%", "非課税"];
  const taxCalculationTypes = ["締切単位", "伝票単位"];

  const filteredProducts = sampleProducts.filter(
    (product) =>
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProductSelection = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      const newQuantity = { ...quantity };
      delete newQuantity[productId];
      setQuantity(newQuantity);
    } else {
      newSelected.add(productId);
      setQuantity({ ...quantity, [productId]: 1 });
    }
    setSelectedProducts(newSelected);
  };

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantity({ ...quantity, [productId]: value });
  };

  const addSelectedProducts = () => {
    const newDetails = [...details];
    selectedProducts.forEach((productId) => {
      const product = sampleProducts.find((p) => p.id === productId);
      if (product && quantity[productId]) {
        const orderAmount = product.unitPrice * quantity[productId];
        newDetails.push({
      id: crypto.randomUUID(),
          productCode: product.code,
          productName: product.name,
          spec: product.spec,
          stock: product.stock.toString(),
          quantity: quantity[productId],
          unit: product.unit,
          unitPrice: product.unitPrice,
          orderAmount: orderAmount,
          tax: Math.floor(orderAmount * 0.1),
          receivedUnitPrice: 0,
          receivedAmount: 0,
          receivedTax: 0,
          profitAmount: 0,
          warehouseCode: "",
          warehouseName: "",
        });
      }
    });
    setDetails(newDetails);
    setIsModalOpen(false);
    setSelectedProducts(new Set());
    setQuantity({});
    setSearchTerm("");
  };

  const removeDetail = (id: string) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="py-6 text-4xl font-bold">{handle.title}</div>

      <div className="rounded-lg border p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">発注番号</label>
            <Input placeholder="発注番号" disabled />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">登録者</label>
            <Input placeholder="登録者" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">受注番号</label>
            <Input placeholder="受注番号" />
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
            <label className="text-sm font-medium">発注登録区分</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="発注登録区分を選択" />
              </SelectTrigger>
              <SelectContent>
                {orderRegistrationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">発注日</label>
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
            <label className="text-sm font-medium">発注ステータス</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="発注ステータスを選択" />
              </SelectTrigger>
              <SelectContent>
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">発注先名称</label>
            <Input placeholder="発注先名称" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">入荷希望納期</label>
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
            <label className="text-sm font-medium">入荷確定納期</label>
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
            <label className="text-sm font-medium">希望納期</label>
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
            <label className="text-sm font-medium">得意先名称</label>
            <Input placeholder="得意先名称" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">現場名称</label>
            <Input placeholder="現場名称" />
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
            <label className="text-sm font-medium">取引区分</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="取引区分を選択" />
              </SelectTrigger>
              <SelectContent>
                {transactionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">原価名称</label>
            <Input placeholder="原価名称" />
                </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">仕入税区分</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="仕入税区分を選択" />
              </SelectTrigger>
              <SelectContent>
                {taxTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
                </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">仕入税計算</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="仕入税計算を選択" />
              </SelectTrigger>
              <SelectContent>
                {taxCalculationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
                </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">売上税計算</label>
            <Select>
                    <SelectTrigger>
                <SelectValue placeholder="売上税計算を選択" />
                    </SelectTrigger>
                    <SelectContent>
                {taxTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-8">
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">発注計</div>
            <div className="text-xl">
              {details
                .reduce((sum, detail) => sum + detail.orderAmount, 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">受注計</div>
            <div className="text-xl">
              {details
                .reduce((sum, detail) => sum + detail.receivedAmount, 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">小売金額計</div>
            <div className="text-xl">0</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">原価金額計</div>
            <div className="text-xl">0</div>
          </div>
          <div className="border rounded p-4">
            <div className="text-sm font-medium mb-2">粗利金額計</div>
            <div className="text-xl">
              {details
                .reduce((sum, detail) => sum + detail.profitAmount, 0)
                .toLocaleString()}
            </div>
          </div>
                </div>

        <div className="pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">明細</label>
            <Button onClick={() => setIsModalOpen(true)} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              明細追加
            </Button>
                </div>

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
                  <th className="p-2 text-left font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail) => (
                  <tr key={detail.id} className="border-b">
                    <td className="p-2">通常</td>
                    <td className="p-2">{detail.productCode}</td>
                    <td className="p-2">{detail.productName}</td>
                    <td className="p-2">{detail.spec}</td>
                    <td className="p-2">{detail.stock}</td>
                    <td className="p-2">{detail.quantity}</td>
                    <td className="p-2">{detail.unit}</td>
                    <td className="p-2 text-right">
                      {detail.unitPrice.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {detail.orderAmount.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {detail.tax.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {detail.receivedUnitPrice.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {detail.receivedAmount.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {detail.receivedTax.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {detail.profitAmount.toLocaleString()}
                    </td>
                    <td className="p-2">{detail.warehouseCode}</td>
                    <td className="p-2">{detail.warehouseName}</td>
                    <td className="p-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeDetail(detail.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                    </td>
                  </tr>
            ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("..")}>
          キャンセル
        </Button>
        <Button onClick={() => navigate("..")}>登録</Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>商品選択</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="商品番号・商品名で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="border rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 w-16"></th>
                    <th className="p-2 text-left">商品番号</th>
                    <th className="p-2 text-left">商品名</th>
                    <th className="p-2 text-left">規格</th>
                    <th className="p-2 text-right">在庫数</th>
                    <th className="p-2 text-left">単位</th>
                    <th className="p-2 text-right">単価</th>
                    <th className="p-2 text-center w-32">数量</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-2">{product.code}</td>
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.spec}</td>
                      <td className="p-2 text-right">{product.stock}</td>
                      <td className="p-2">{product.unit}</td>
                      <td className="p-2 text-right">
                        {product.unitPrice.toLocaleString()}
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="1"
                          value={quantity[product.id] || ""}
                          onChange={(e) =>
                            handleQuantityChange(product.id, Number(e.target.value))
                          }
                          disabled={!selectedProducts.has(product.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={addSelectedProducts}>追加</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}