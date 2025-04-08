import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Checkbox } from "~/components/ui/checkbox";
import { toast } from "sonner";
import { DeleteItem } from "./index";

export interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: DeleteItem[];
  setItems: React.Dispatch<React.SetStateAction<DeleteItem[]>>;
  isAllChecked: boolean;
}

export function DeleteModal({
  isOpen,
  onOpenChange,
  items,
  setItems,
  isAllChecked,
}: DeleteModalProps) {
  const handleDelete = () => {
    onOpenChange(false);
    toast("削除しました");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>発注を削除しますか？</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <div className="font-medium">発注番号：</div>
            <div>P-0101</div>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      checked={isAllChecked}
                      onClick={() =>
                        setItems((items) =>
                          items.map((item) => ({
                            ...item,
                            selected: !isAllChecked,
                          }))
                        )
                      }
                    />
                  </TableHead>
                  <TableHead>商品番号</TableHead>
                  <TableHead>商品名</TableHead>
                  <TableHead>規格</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>単位</TableHead>
                  <TableHead>入荷予定</TableHead>
                  <TableHead>納品予定日</TableHead>
                  <TableHead>仕入先</TableHead>
                  <TableHead>販売価格</TableHead>
                  <TableHead>仕入価格</TableHead>
                  <TableHead>送料</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={item.selected}
                        onClick={() =>
                          setItems((items) =>
                            items.map((i) =>
                              i.id === item.id
                                ? { ...i, selected: !i.selected }
                                : i
                            )
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>{item.productCode}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.spec}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.arrivalSchedule}</TableCell>
                    <TableCell>{item.deliveryDate}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.salesPrice.toLocaleString()}</TableCell>
                    <TableCell>{item.purchasePrice.toLocaleString()}</TableCell>
                    <TableCell>{item.shippingFee.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            閉じる
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
