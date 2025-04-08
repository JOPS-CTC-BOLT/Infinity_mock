import { useState, useMemo } from "react";
import { useNavigate } from "@remix-run/react";
import { OrderDetail } from "~/components/app-order-editor/types";
import { OrderDetailHeader } from "./order-detail-header";
import { OrderDetailInfo } from "./order-detail-info";
import { OrderDetailSummary } from "./order-detail-summary";
import { OrderDetailList } from "./order-detail-list";
import { DeleteModal } from "./delete-modal";
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

export interface DeleteItem {
  id: string;
  productCode: string;
  productName: string;
  spec: string;
  quantity: number;
  unit: string;
  arrivalSchedule: string;
  deliveryDate: string;
  supplier: string;
  salesPrice: number;
  purchasePrice: number;
  shippingFee: number;
  selected: boolean;
}

export default function OrderDetailIndex() {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isDataTransmissionModalOpen, setIsDataTransmissionModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // サンプルデータ
  const orderDetailsData: OrderDetail[] = [
    {
      id: "1",
      productCode: "00130400040-00358",
      productName: "扇島型河川監視カメラ",
      spec: "1080p対応",
      stock: "✓",
      quantity: 2,
      unit: "個",
      unitPrice: 655000,
      orderAmount: 1310000,
      tax: 0,
      receivedUnitPrice: 0,
      receivedAmount: 0,
      receivedTax: 0,
      profitAmount: 0,
      warehouseCode: "",
      warehouseName: "",
      selected: false,
    },
    {
      id: "2",
      productCode: "00130400040-00023",
      productName: "SDカード 64GB",
      spec: "Class 10",
      stock: "✓",
      quantity: 2,
      unit: "個",
      unitPrice: 0,
      orderAmount: 0,
      tax: 0,
      receivedUnitPrice: 0,
      receivedAmount: 0,
      receivedTax: 0,
      profitAmount: 0,
      warehouseCode: "",
      warehouseName: "",
      selected: false,
    },
  ];

  const deleteItemsData: DeleteItem[] = [
    {
      id: "1",
      productCode: "00130400040-00358",
      productName: "簡易型河川監視カメラ",
      spec: "太陽光発電仕様 無日照7日タイプ",
      quantity: 1,
      unit: "式",
      arrivalSchedule: "-",
      deliveryDate: "2025/04/01",
      supplier: "-",
      salesPrice: 0,
      purchasePrice: 0,
      shippingFee: 0,
      selected: false,
    },
    {
      id: "2",
      productCode: "00130400040",
      productName: "親水フィルム",
      spec: "-",
      quantity: 1,
      unit: "式",
      arrivalSchedule: "-",
      deliveryDate: "2025/04/01",
      supplier: "在庫",
      salesPrice: 8000,
      purchasePrice: 8000,
      shippingFee: 300,
      selected: false,
    },
  ];

  const [orderDetails, setOrderDetails] = useState(orderDetailsData);
  const [deleteItems, setDeleteItems] = useState(deleteItemsData);

  const isAllChecked = useMemo(
    () => orderDetails.every((detail) => detail.selected),
    [orderDetails]
  );

  const isAllDeleteItemsChecked = useMemo(
    () => deleteItems.every((item) => item.selected),
    [deleteItems]
  );

  const handleExport = () => {
    setIsExportModalOpen(false);
    toast("出力しました");
  };

  return (
    <div className="space-y-6">
      <OrderDetailHeader
        onDelete={() => setIsDeleteModalOpen(true)}
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        items={deleteItems}
        setItems={setDeleteItems}
        isAllChecked={isAllDeleteItemsChecked}
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
            <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
              戻る
            </Button>
            <Button onClick={handleExport}>出力</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}