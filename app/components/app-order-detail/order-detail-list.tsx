import { useState } from "react";
import { BookOpen, SquarePen } from "lucide-react";
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
import { OrderDetail } from "~/components/app-order-editor/types";
import { StockCheckModal } from "~/components/app-order-editor/stock-check-modal";
import { UnitPriceHistoryModal } from "~/components/app-order-editor/unit-price-history-modal";

export interface OrderDetailListProps {
  details: OrderDetail[];
  setDetails: React.Dispatch<React.SetStateAction<OrderDetail[]>>;
  isAllChecked: boolean;
}

export function OrderDetailList({
  details,
  setDetails,
  isAllChecked,
}: OrderDetailListProps) {
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isUnitPriceHistoryModalOpen, setIsUnitPriceHistoryModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<OrderDetail | null>(null);

  const handleStockCheck = (detail: OrderDetail) => {
    setSelectedDetail(detail);
    setIsStockModalOpen(true);
  };

  const handleUnitPriceHistory = (detail: OrderDetail) => {
    setSelectedDetail(detail);
    setIsUnitPriceHistoryModalOpen(true);
  };

  return (
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
                <TableCell className="p-2">通常</TableCell>
                <TableCell className="p-2">{detail.productCode}</TableCell>
                <TableCell className="p-2">{detail.productName}</TableCell>
                <TableCell className="p-2">{detail.spec}</TableCell>
                <TableCell className="p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleStockCheck(detail)}
                  >
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="p-2">{detail.quantity}</TableCell>
                <TableCell className="p-2">{detail.unit}</TableCell>
                <TableCell className="p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUnitPriceHistory(detail)}
                  >
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