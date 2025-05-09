import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";
import { toast } from "sonner";
import { OrderDetail } from "~/components/app-order-editor/types";

export interface DataTransmissionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  details: OrderDetail[];
}

export function DataTransmissionModal({
  isOpen,
  onOpenChange,
  details,
}: DataTransmissionModalProps) {
  const handleDataTransmission = () => {
    onOpenChange(false);
    toast("送信しました");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>発注情報を送信しますか？</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="font-medium">
              送信方法 <span className="text-red-500 text-sm">※必須</span>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="メール" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">メール</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="font-medium">
              送信先 <span className="text-red-500 text-sm">※必須</span>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="yamada@aaa.co.jp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yamada@aaa.co.jp">
                  yamada@aaa.co.jp
                </SelectItem>
                <SelectItem value="tanaka@aaa.co.jp">
                  tanaka@aaa.co.jp
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="font-medium">送信対象</div>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox />
                    </TableHead>
                    <TableHead>商品名</TableHead>
                    <TableHead>規格</TableHead>
                    <TableHead>発注数</TableHead>
                    <TableHead>単位</TableHead>
                    <TableHead className="text-right">発注単価</TableHead>
                    <TableHead className="text-right">発注金額</TableHead>
                    <TableHead className="text-right">受注単価</TableHead>
                    <TableHead className="text-right">受注金額</TableHead>
                    <TableHead className="text-right">粗利金額</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{detail.productName}</TableCell>
                      <TableCell>{detail.spec}</TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell className="text-right">
                        {detail.unitPrice.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {detail.orderAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {detail.receivedUnitPrice.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {detail.receivedAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {detail.profitAmount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            閉じる
          </Button>
          <Button onClick={handleDataTransmission}>送信</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
