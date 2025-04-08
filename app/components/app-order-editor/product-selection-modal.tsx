import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { OrderDetail } from "./types";
import { sampleProducts } from "./sample-data";

export interface ProductSelectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  details: OrderDetail[];
  setDetails: React.Dispatch<React.SetStateAction<OrderDetail[]>>;
}

export function ProductSelectionModal({
  isOpen,
  onOpenChange,
  details,
  setDetails,
}: ProductSelectionModalProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

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
          selected: false,
        });
      }
    });
    setDetails(newDetails);
    onOpenChange(false);
    setSelectedProducts(new Set());
    setQuantity({});
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
            <Button onClick={addSelectedProducts}>追加</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}