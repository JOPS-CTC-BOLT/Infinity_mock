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
              <TableHead className="p-2 text-left font-medium text-muted-foreground">
                商品名
              </TableHead>
              <TableHead className="p-2 text-left font-medium text-muted-foreground">
                規格
              </TableHead>
              <TableHead className="p-2 text-left font-medium text-muted-foreground">
                数量
              </TableHead>
              <TableHead className="p-2 text-right font-medium text-muted-foreground">
                発注単価
              </TableHead>
              <TableHead className="p-2 text-right font-medium text-muted-foreground">
                発注金額
              </TableHead>
              <TableHead className="p-2 text-right font-medium text-muted-foreground">
                受注単価
              </TableHead>
              <TableHead className="p-2 text-right font-medium text-muted-foreground">
                受注金額
              </TableHead>
              <TableHead className="p-2 text-right font-medium text-muted-foreground">
                粗利金額
              </TableHead>
              <TableHead className="p-2 text-left font-medium text-muted-foreground">
                備考
              </TableHead>
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
                <TableCell className="p-2">{detail.productName}</TableCell>
                <TableCell className="p-2">{detail.spec}</TableCell>
                <TableCell className="p-2">{detail.quantity}</TableCell>
                <TableCell className="p-2 text-right">
                  {detail.unitPrice.toLocaleString()}
                </TableCell>
                <TableCell className="p-2 text-right">
                  {detail.orderAmount.toLocaleString()}
                </TableCell>
                <TableCell className="p-2 text-right">
                  {detail.receivedUnitPrice.toLocaleString()}
                </TableCell>
                <TableCell className="p-2 text-right">
                  {detail.receivedAmount.toLocaleString()}
                </TableCell>
                <TableCell className="p-2 text-right">
                  {detail.profitAmount.toLocaleString()}
                </TableCell>
                <TableCell className="p-2">{detail.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
