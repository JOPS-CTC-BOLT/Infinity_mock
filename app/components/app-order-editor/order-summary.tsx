import { OrderDetail } from "./types";

export interface OrderSummaryProps {
  details: OrderDetail[];
}

export function OrderSummary({ details }: OrderSummaryProps) {
  return (
    <div className="grid grid-cols-9 gap-4 mt-8">
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">数量計</div>
        <div className="text-sm">
          {details
            .reduce((sum, detail) => sum + detail.quantity, 0)
            .toLocaleString()}
        </div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">容重量系</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">小売金額計</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">原価金額計</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">粗利金額計</div>
        <div className="text-sm">
          {details
            .reduce((sum, detail) => sum + detail.profitAmount, 0)
            .toLocaleString()}
        </div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">粗利率</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2 col-start-1">
        <div className="text-sm font-medium mb-2">小売金額</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">粗利金額</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">粗利率</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">発注金額</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">消費税等</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">発注伝票合計</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">受注金額</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">消費税等</div>
        <div className="text-sm">0</div>
      </div>
      <div className="border rounded p-2">
        <div className="text-sm font-medium mb-2">受注伝票合計</div>
        <div className="text-sm">0</div>
      </div>
    </div>
  );
}
