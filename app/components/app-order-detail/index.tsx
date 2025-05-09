import { useState, useMemo } from "react";
import { useNavigate } from "@remix-run/react";
import { OrderDetail } from "~/components/app-order-editor/types";
import { OrderDetailHeader } from "./order-detail-header";
import { OrderDetailInfo } from "./order-detail-info";
import { OrderDetailSummary } from "./order-detail-summary";
import { OrderDetailList } from "./order-detail-list";
import { ApprovalModal } from "./approval-modal";
import { DataTransmissionModal } from "./data-transmission-modal";
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
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export default function OrderDetailIndex() {
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isDataTransmissionModalOpen, setIsDataTransmissionModalOpen] =
    useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // サンプルデータ
  const orderDetailsData: OrderDetail[] = [
    {
      id: "1",
      selected: false,
      productName: "0013010020-00001 NECﾉｰﾄPC PC-VKV50FB9B21M",
      spec: "",
      quantity: 5,
      unitPrice: 195700,
      orderAmount: 978500,
      receivedUnitPrice: 250000,
      receivedAmount: 1250000,
      profitAmount: 271500,
    },
  ];

  const [orderDetails, setOrderDetails] = useState(orderDetailsData);

  const isAllChecked = useMemo(
    () => orderDetails.every((detail) => detail.selected),
    [orderDetails]
  );

  const handleExport = () => {
    setIsExportModalOpen(false);
    toast("出力しました");
  };

  return (
    <div className="space-y-6">
      <OrderDetailHeader
        onApproval={() => setIsApprovalModalOpen(true)}
        onDataTransmission={() => setIsDataTransmissionModalOpen(true)}
        onExport={() => setIsExportModalOpen(true)}
      />

      <OrderDetailInfo />

      <OrderDetailSummary details={orderDetails} />

      <OrderDetailList
        details={orderDetails}
        setDetails={setOrderDetails}
        isAllChecked={isAllChecked}
      />

      <ApprovalModal
        isOpen={isApprovalModalOpen}
        onOpenChange={setIsApprovalModalOpen}
      />

      <DataTransmissionModal
        isOpen={isDataTransmissionModalOpen}
        onOpenChange={setIsDataTransmissionModalOpen}
        details={orderDetails}
      />

      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>データ出力</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div>出力対象</div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="出力対象を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="selected">選択された行</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div>出力様式</div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="様式1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="format1">様式1</SelectItem>
                  <SelectItem value="format2">様式2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div>保存先</div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="ダウンロード" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="download">ダウンロード</SelectItem>
                  <SelectItem value="save">保存</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div>ページ</div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="すべて" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="current">現在のページ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsExportModalOpen(false)}
            >
              戻る
            </Button>
            <Button onClick={handleExport}>出力</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
