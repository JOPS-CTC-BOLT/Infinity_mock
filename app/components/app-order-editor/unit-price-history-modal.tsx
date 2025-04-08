import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { format } from "date-fns";

export interface UnitPriceHistoryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productCode: string;
  productName: string;
  spec: string;
}

interface UnitPriceHistory {
  id: string;
  date: Date;
  documentNo: string;
  supplier: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

// サンプルデータ
const sampleHistories: UnitPriceHistory[] = [
  {
    id: "1",
    date: new Date("2024-01-15"),
    documentNo: "P-0001",
    supplier: "株式会社ABC",
    quantity: 10,
    unit: "個",
    unitPrice: 1000,
    amount: 10000,
  },
  {
    id: "2",
    date: new Date("2024-01-10"),
    documentNo: "P-0002",
    supplier: "株式会社XYZ",
    quantity: 5,
    unit: "個",
    unitPrice: 1200,
    amount: 6000,
  },
];

export function UnitPriceHistoryModal({
  isOpen,
  onOpenChange,
  productCode,
  productName,
  spec,
}: UnitPriceHistoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>仕入先単価履歴</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">部門</div>
              <Input value="仙台営業所" readOnly />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">商品番号</div>
              <Input value={productCode} readOnly />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">商品名</div>
              <Input value={productName} readOnly />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">規格</div>
              <Input value={spec} readOnly />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>処理</TableHead>
                  <TableHead>日付</TableHead>
                  <TableHead>伝票番号</TableHead>
                  <TableHead>仕入先</TableHead>
                  <TableHead>仕入先略称</TableHead>
                  <TableHead className="text-right">数量</TableHead>
                  <TableHead>単位</TableHead>
                  <TableHead className="text-right">単価</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleHistories.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>
                      <div className="flex gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>見積</span>
                      </div>
                    </TableCell>
                    <TableCell>{format(history.date, "yyyy/MM/dd")}</TableCell>
                    <TableCell>{history.documentNo}</TableCell>
                    <TableCell>{history.supplier}</TableCell>
                    <TableCell>{history.supplier}</TableCell>
                    <TableCell className="text-right">{history.quantity}</TableCell>
                    <TableCell>{history.unit}</TableCell>
                    <TableCell className="text-right">
                      {history.unitPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {history.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              閉じる
            </Button>
            <Button onClick={() => onOpenChange(false)}>反映</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}