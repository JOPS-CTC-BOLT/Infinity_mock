import { Plus, BookOpen, SquarePen, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { useState, useMemo } from "react";
import { OrderDetail } from "./types";
import { ProductSelectionModal } from "./product-selection-modal";
import { StockCheckModal } from "./stock-check-modal";
import { UnitPriceHistoryModal } from "./unit-price-history-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { orderDetailTypes, units } from "./constants";

export interface OrderDetailsProps {
  details: OrderDetail[];
  setDetails: React.Dispatch<React.SetStateAction<OrderDetail[]>>;
}

export function OrderDetails({ details, setDetails }: OrderDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isUnitPriceHistoryModalOpen, setIsUnitPriceHistoryModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<OrderDetail | null>(null);

  const isAllChecked = useMemo(
    () => details.every((detail) => detail.selected),
    [details]
  );

  const removeDetail = (id: string) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };

  const updateDetail = (id: string, field: keyof OrderDetail, value: any) => {
    setDetails(details.map(detail => {
      if (detail.id === id) {
        const updatedDetail = { ...detail, [field]: value };
        
        // 数量または単価が変更された場合、関連する金額を再計算
        if (field === 'quantity' || field === 'unitPrice') {
          const orderAmount = updatedDetail.quantity * updatedDetail.unitPrice;
          updatedDetail.orderAmount = orderAmount;
          updatedDetail.tax = Math.floor(orderAmount * 0.1);
          updatedDetail.profitAmount = updatedDetail.receivedAmount - orderAmount;
        }
        
        // 受注単価が変更された場合、受注金額と消費税を再計算
        if (field === 'receivedUnitPrice') {
          const receivedAmount = updatedDetail.quantity * updatedDetail.receivedUnitPrice;
          updatedDetail.receivedAmount = receivedAmount;
          updatedDetail.receivedTax = Math.floor(receivedAmount * 0.1);
          updatedDetail.profitAmount = receivedAmount - updatedDetail.orderAmount;
        }

        // 発注金額が変更された場合、消費税を再計算
        if (field === 'orderAmount') {
          updatedDetail.tax = Math.floor(value * 0.1);
          updatedDetail.profitAmount = updatedDetail.receivedAmount - value;
        }

        // 受注金額が変更された場合、消費税と粗利金額を再計算
        if (field === 'receivedAmount') {
          updatedDetail.receivedTax = Math.floor(value * 0.1);
          updatedDetail.profitAmount = value - updatedDetail.orderAmount;
        }

        return updatedDetail;
      }
      return detail;
    }));
  };

  const handleStockCheck = (detail: OrderDetail) => {
    setSelectedDetail(detail);
    setIsStockModalOpen(true);
  };

  const handleUnitPriceHistory = (detail: OrderDetail) => {
    setSelectedDetail(detail);
    setIsUnitPriceHistoryModalOpen(true);
  };

  return (
    <div className="pt-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-medium">明細一覧</span>
        <Button
          onClick={() => setIsModalOpen(true)}
          type="button"
          variant="outline"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          商品追加
        </Button>
      </div>

      <div className="overflow-x-auto">
        {details.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            明細が登録されていません。「商品追加」ボタンから明細を追加してください。
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={isAllChecked}
                    onClick={() =>
                      setDetails((ds) =>
                        ds.map((d) => ({
                          ...d,
                          selected: !isAllChecked,
                        }))
                      )
                    }
                  />
                </TableHead>
                <TableHead className="p-2 text-left font-medium">区分</TableHead>
                <TableHead className="p-2 text-left font-medium">商品番号</TableHead>
                <TableHead className="p-2 text-left font-medium">商品名</TableHead>
                <TableHead className="p-2 text-left font-medium">規格</TableHead>
                <TableHead className="p-2 text-left font-medium">在庫確認</TableHead>
                <TableHead className="p-2 text-left font-medium">発注数</TableHead>
                <TableHead className="p-2 text-left font-medium">単位</TableHead>
                <TableHead className="p-2 text-left font-medium">単価履歴</TableHead>
                <TableHead className="p-2 text-right font-medium">発注単価</TableHead>
                <TableHead className="p-2 text-right font-medium">発注金額</TableHead>
                <TableHead className="p-2 text-right font-medium">消費税</TableHead>
                <TableHead className="p-2 text-right font-medium">受注単価</TableHead>
                <TableHead className="p-2 text-right font-medium">受注金額</TableHead>
                <TableHead className="p-2 text-right font-medium">消費税</TableHead>
                <TableHead className="p-2 text-right font-medium">粗利金額</TableHead>
                <TableHead className="p-2 text-left font-medium">倉庫番号</TableHead>
                <TableHead className="p-2 text-left font-medium">倉庫名</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.map((detail) => (
                <TableRow key={detail.id} className="border-b">
                  <TableCell>
                    <Checkbox
                      checked={detail.selected}
                      onClick={() =>
                        setDetails((ds) =>
                          ds.map((d) =>
                            d.id === detail.id
                              ? { ...d, selected: !d.selected }
                              : d
                          )
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Select
                      value={detail.type || "通常"}
                      onValueChange={(value) => updateDetail(detail.id, 'type', value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {orderDetailTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      value={detail.productCode}
                      onChange={(e) => updateDetail(detail.id, 'productCode', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      value={detail.productName}
                      onChange={(e) => updateDetail(detail.id, 'productName', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      value={detail.spec}
                      onChange={(e) => updateDetail(detail.id, 'spec', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      type="button"
                      onClick={() => handleStockCheck(detail)}
                    >
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      type="number"
                      value={detail.quantity}
                      onChange={(e) => updateDetail(detail.id, 'quantity', Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Select
                      value={detail.unit}
                      onValueChange={(value) => updateDetail(detail.id, 'unit', value)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="p-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      type="button"
                      onClick={() => handleUnitPriceHistory(detail)}
                    >
                      <SquarePen className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      type="number"
                      value={detail.unitPrice}
                      onChange={(e) => updateDetail(detail.id, 'unitPrice', Number(e.target.value))}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      type="number"
                      value={detail.orderAmount}
                      onChange={(e) => updateDetail(detail.id, 'orderAmount', Number(e.target.value))}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      type="number"
                      value={detail.tax}
                      onChange={(e) => updateDetail(detail.id, 'tax', Number(e.target.value))}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      type="number"
                      value={detail.receivedUnitPrice}
                      onChange={(e) => updateDetail(detail.id, 'receivedUnitPrice', Number(e.target.value))}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      type="number"
                      value={detail.receivedAmount}
                      onChange={(e) => updateDetail(detail.id, 'receivedAmount', Number(e.target.value))}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      type="number"
                      value={detail.receivedTax}
                      onChange={(e) => updateDetail(detail.id, 'receivedTax', Number(e.target.value))}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      type="number"
                      value={detail.profitAmount}
                      onChange={(e) => updateDetail(detail.id, 'profitAmount', Number(e.target.value))}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      value={detail.warehouseCode}
                      onChange={(e) => updateDetail(detail.id, 'warehouseCode', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input 
                      value={detail.warehouseName}
                      onChange={(e) => updateDetail(detail.id, 'warehouseName', e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeDetail(detail.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ProductSelectionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        details={details}
        setDetails={setDetails}
      />

      {selectedDetail && (
        <>
          <StockCheckModal
            isOpen={isStockModalOpen}
            onOpenChange={setIsStockModalOpen}
            productCode={selectedDetail.productCode}
            productName={selectedDetail.productName}
          />
          <UnitPriceHistoryModal
            isOpen={isUnitPriceHistoryModalOpen}
            onOpenChange={setIsUnitPriceHistoryModalOpen}
            productCode={selectedDetail.productCode}
            productName={selectedDetail.productName}
            spec={selectedDetail.spec}
          />
        </>
      )}
    </div>
  );
}