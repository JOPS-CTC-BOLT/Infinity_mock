import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export interface StockCheckModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productCode: string;
  productName: string;
}

export function StockCheckModal({
  isOpen,
  onOpenChange,
  productCode,
  productName,
}: StockCheckModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>在庫確認</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">商品番号</div>
            <div>{productCode}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">商品名</div>
            <div>{productName}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">現在在庫</div>
              <div className="text-xl">999,999,999</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">受注残数</div>
              <div className="text-xl">999,999,999</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">発注残数</div>
              <div className="text-xl">999,999,999</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">有効残数</div>
              <div className="text-xl">999,999,999</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}