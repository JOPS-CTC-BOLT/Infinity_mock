import { Input } from "~/components/ui/input";
import type { MetaFunction } from "@remix-run/node";
import { Inbox, Pen, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { NavLink } from "@remix-run/react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

export const meta: MetaFunction = () => {
  return [
    { title: "order" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const handle = {
  title: "発注一覧",
  icon: Inbox,
};

export default function order() {
  const rows = [
    {
      order_no: "P-0101",
      received_no: "S-001",
      order_type: "在庫",
      purchase: "ABC株式会社",
      scene: "D河川工事",
      order_status: "未発注",
      deadline: "2025/05/01",
      deadline_type: "希望納期",
      order_paper_status: "未発行",
      department: "仙台営業所",
      manager: "仙台一郎",
      update_at: "2025/04/01",
    },
  ];

  const colDefs: ColDef = [
    {
      field: "order_no",
      headerName: "発注番号",
    },
    {
      field: "received_no",
      headerName: "受注番号",
    },
    {
      field: "order_type",
      headerName: "調達区分",
    },
    {
      field: "purchase",
      headerName: "仕入先名",
    },
    {
      field: "scene",
      headerName: "現場名",
    },
    {
      field: "order_status",
      headerName: "発注ステータス",
    },
    {
      field: "deadline",
      headerName: "希望納期",
    },
    {
      field: "deadline_type",
      headerName: "納期指定",
    },
    {
      field: "order_paper_status",
      headerName: "発注書発行状態",
    },
    {
      field: "department",
      headerName: "部門",
    },
    {
      field: "manager",
      headerName: "担当者",
    },
    {
      field: "update_at",
      headerName: "更新日時",
    },
  ];

  return (
    <div>
      <div className="py-6 text-4xl font-bold">{handle.title}</div>
      <div className="flex justify-between">
        <Input className="w-2xl"></Input>
        <div className="flex gap-3">
          <Button>
            <Upload />
            データ出力
          </Button>
          <Button asChild>
            <NavLink to="./new">
              <Pen />
              新規作成
            </NavLink>
          </Button>
        </div>
      </div>
      <div className="pt-6 h-[500px]">
        <AgGridReact
          rowData={rows}
          columnDefs={colDefs}
          defaultColDef={{ floatingFilter: true, filter: true }}
        />
      </div>
    </div>
  );
}
