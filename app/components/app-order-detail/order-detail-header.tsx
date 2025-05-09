import { NavLink } from "@remix-run/react";
import {
  ArrowLeft,
  Check,
  Copy,
  Printer,
  Save,
  Share2,
  Trash2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { toast } from "sonner";

export interface OrderDetailHeaderProps {
  onApproval: () => void;
  onDataTransmission: () => void;
  onExport: () => void;
}

export function OrderDetailHeader({
  onApproval,
  onDataTransmission,
  onExport,
}: OrderDetailHeaderProps) {
  return (
    <div className="flex justify-end items-center">
      <div className="flex gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="default">
              <Trash2 className="h-4 w-4" />
              削除
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                発注を削除しますか？
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>閉じる</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  toast("削除しました");
                }}
              >
                削除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="outline" size="default" asChild>
          <NavLink to="../">
            <ArrowLeft className="h-4 w-4" />
            一覧
          </NavLink>
        </Button>
        <Button variant="outline" size="default" asChild>
          <NavLink to="./edit">
            <Copy className="h-4 w-4" />
            編集
          </NavLink>
        </Button>
        <Button variant="outline" size="default" asChild>
          <NavLink to="../new">
            <Copy className="h-4 w-4" />
            複写
          </NavLink>
        </Button>
        <Button variant="outline" size="default" onClick={onApproval}>
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
              <AlertDialogAction
                onClick={() => {
                  toast("確定しました");
                }}
              >
                確定
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="outline" size="default" onClick={onDataTransmission}>
          <Share2 className="h-4 w-4" />
          データ送信
        </Button>
        <Button variant="outline" size="default" onClick={onExport}>
          <Printer className="h-4 w-4" />
          データ出力
        </Button>
      </div>
    </div>
  );
}
