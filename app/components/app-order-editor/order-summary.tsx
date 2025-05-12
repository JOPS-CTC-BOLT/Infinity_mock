import { OrderDetail } from "./types";

export interface OrderSummaryProps {
  details: OrderDetail[];
}

export function OrderSummary({ details }: OrderSummaryProps) {
  const totalOrderAmount = details.reduce(
    (sum, detail) => sum + detail.orderAmount,
    0
  );
  const totalReceivedAmount = details.reduce(
    (sum, detail) => sum + detail.receivedAmount,
    0
  );
  const totalProfitAmount = details.reduce(
    (sum, detail) => sum + detail.profitAmount,
    0
  );
  const profitRate =
    totalOrderAmount > 0 ? (totalProfitAmount / totalOrderAmount) * 100 : 0;

  return (
    <div className="grid grid-cols-7 gap-4 mt-8">
      <div className="">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          発注金額計
        </div>
        <div className="text-sm text-right border-b">
          {totalOrderAmount.toLocaleString()}
        </div>
      </div>
      <div className="">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          受注金額計
        </div>
        <div className="text-sm text-right border-b">
          {totalReceivedAmount.toLocaleString()}
        </div>
      </div>
      <div className="">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          粗利金額計
        </div>
        <div className="text-sm text-right border-b">
          {totalProfitAmount.toLocaleString()}
        </div>
      </div>
      <div className="">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          粗利率
        </div>
        <div className="text-sm text-right border-b">
          {profitRate.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
