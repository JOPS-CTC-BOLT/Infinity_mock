import { Plus, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export interface OrderDetailsProps {
  details: OrderDetail[];
  setDetails: React.Dispatch<React.SetStateAction<OrderDetail[]>>;
}

export function OrderDetails({ details, setDetails }: OrderDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

  const isAllChecked = useMemo(
    () => details.every((detail) => detail.selected),
    [details]
  );

  const hasSelectedItems = useMemo(
    () => details.some((detail) => detail.selected),
    [details]
  );

  const removeDetail = (id: string) => {
    setDetails(details.filter((detail) => detail.id !== id));
    setDeleteTargetId(null);
  };

  const removeSelectedDetails = () => {
    setDetails(details.filter((detail) => !detail.selected));
    setIsBulkDeleteDialogOpen(false);
  };

  const updateDetail = (id: string, field: keyof OrderDetail, value: any) => {
    setDetails(
      details.map((detail) => {
        if (detail.id === id) {
          const updatedDetail = { ...detail, [field]: value };

          // 数量または単価が変更された場合、関連する金額を再計算
          if (field === "quantity" || field === "unitPrice") {
            const orderAmount =
              updatedDetail.quantity * updatedDetail.unitPrice;
            updatedDetail.orderAmount = orderAmount;
            updatedDetail.profitAmount =
              updatedDetail.receivedAmount - orderAmount;
          }

          // 受注単価が変更された場合、受注金額と粗利金額を再計算
          if (field === "receivedUnitPrice") {
            const receivedAmount =
              updatedDetail.quantity * updatedDetail.receivedUnitPrice;
            updatedDetail.receivedAmount = receivedAmount;
            updatedDetail.profitAmount =
              receivedAmount - updatedDetail.orderAmount;
          }

          return updatedDetail;
        }
        return detail;
      })
    );
  };

  return (
    <div className="pt-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-medium">明細一覧</span>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsBulkDeleteDialogOpen(true)}
            type="button"
            variant="destructive"
            size="sm"
            disabled={!hasSelectedItems}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            一括削除
          </Button>
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
                <TableHead className="p-2 text-center font-bold">
                  商品名
                </TableHead>
                <TableHead className="p-2 text-center font-bold">
                  規格
                </TableHead>
                <TableHead className="p-2 text-center font-bold">
                  数量
                </TableHead>
                <TableHead className="p-2 text-center font-bold">
                  発注単価
                </TableHead>
                <TableHead className="p-2 text-center font-bold">
                  発注金額
                </TableHead>
                <TableHead className="p-2 text-center font-bold">
                  受注単価
                </TableHead>
                <TableHead className="p-2 text-center font-bold">
                  受注金額
                </TableHead>
                <TableHead className="p-2 text-center font-bold">
                  粗利金額
                </TableHead>
                <TableHead className="p-2 text-center font-bold">
                  備考
                </TableHead>
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
                    <Input
                      value={detail.productName}
                      onChange={(e) =>
                        updateDetail(detail.id, "productName", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      value={detail.spec}
                      onChange={(e) =>
                        updateDetail(detail.id, "spec", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      value={detail.quantity}
                      onChange={(e) =>
                        updateDetail(
                          detail.id,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      value={detail.unitPrice}
                      onChange={(e) =>
                        updateDetail(
                          detail.id,
                          "unitPrice",
                          Number(e.target.value)
                        )
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      value={detail.orderAmount}
                      onChange={(e) =>
                        updateDetail(
                          detail.id,
                          "orderAmount",
                          Number(e.target.value)
                        )
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      value={detail.receivedUnitPrice}
                      onChange={(e) =>
                        updateDetail(
                          detail.id,
                          "receivedUnitPrice",
                          Number(e.target.value)
                        )
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      value={detail.receivedAmount}
                      onChange={(e) =>
                        updateDetail(
                          detail.id,
                          "receivedAmount",
                          Number(e.target.value)
                        )
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      value={detail.profitAmount}
                      onChange={(e) =>
                        updateDetail(
                          detail.id,
                          "profitAmount",
                          Number(e.target.value)
                        )
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      value={detail.note || ""}
                      onChange={(e) =>
                        updateDetail(detail.id, "note", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => setDeleteTargetId(detail.id)}
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

      <AlertDialog
        open={!!deleteTargetId}
        onOpenChange={() => setDeleteTargetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>明細を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTargetId && removeDetail(deleteTargetId)}
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>選択した明細を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={removeSelectedDetails}>
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
