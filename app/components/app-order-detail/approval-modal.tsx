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
import { Textarea } from "~/components/ui/textarea";
import { toast } from "sonner";

export interface ApprovalModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApprovalModal({ isOpen, onOpenChange }: ApprovalModalProps) {
  const handleApproval = () => {
    onOpenChange(false);
    toast("申請しました");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>発注を申請しますか？</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <div className="font-medium">発注番号：</div>
            <div>P-0101</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">
              申請部署 <span className="text-red-500 text-sm">※必須</span>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="○○部" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dept1">○○部</SelectItem>
                <SelectItem value="dept2">△△部</SelectItem>
                <SelectItem value="dept3">□□部</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="font-medium">
              承認者 <span className="text-red-500 text-sm">※必須</span>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="山田 太郎" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user1">山田 太郎</SelectItem>
                <SelectItem value="user2">鈴木 一郎</SelectItem>
                <SelectItem value="user3">佐藤 次郎</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="font-medium">コメント</div>
            <Textarea
              placeholder="承認よろしくお願いします。"
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            閉じる
          </Button>
          <Button onClick={handleApproval}>送信</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}