import { Input } from "~/components/ui/input";
import type { MetaFunction } from "@remix-run/node";
import { Pen, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { NavLink } from "@remix-run/react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

export const meta: MetaFunction = () => {
  return [
    { title: "発注一覧" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export const handle = {};

export default function Order() {
  // Generate 100 sample records
  const rows = Array.from({ length: 100 }, (_, i) => {
    const orderNo = `P-${String(i + 1).padStart(4, "0")}`;
    const receivedNo = `S-${String(
      Math.floor(Math.random() * 999) + 1
    ).padStart(3, "0")}`;

    const orderTypes = ["在庫", "直送", "工事", "その他"];
    const purchases = [
      "ABC株式会社",
      "XYZ商事",
      "工業システム株式会社",
      "テクノ産業",
      "建設資材株式会社",
    ];
    const scenes = [
      "D河川工事",
      "市道拡張工事",
      "橋梁補修工事",
      "トンネル補強工事",
      "道路舗装工事",
    ];
    const orderStatuses = ["未発注", "発注済", "納品済", "検収済"];
    const orderPaperStatuses = ["未発行", "発行済", "再発行"];
    const departments = [
      "仙台営業所",
      "東京支店",
      "大阪支店",
      "名古屋営業所",
      "福岡営業所",
    ];
    const managers = [
      "仙台一郎",
      "東京二郎",
      "大阪三郎",
      "名古屋四郎",
      "福岡五郎",
    ];

    const randomDate = (start: Date, end: Date) => {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    };

    const deadlineDate = randomDate(
      new Date(2025, 3, 1),
      new Date(2025, 11, 31)
    );
    const updateDate = randomDate(new Date(2025, 0, 1), new Date(2025, 2, 31));

    return {
      id: i + 1,
      order_no: orderNo,
      received_no: receivedNo,
      order_type: orderTypes[Math.floor(Math.random() * orderTypes.length)],
      purchase: purchases[Math.floor(Math.random() * purchases.length)],
      scene: scenes[Math.floor(Math.random() * scenes.length)],
      order_status:
        orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      deadline: deadlineDate.toLocaleDateString("ja-JP"),
      deadline_type: Math.random() > 0.5 ? "希望納期" : "確定納期",
      order_paper_status:
        orderPaperStatuses[
          Math.floor(Math.random() * orderPaperStatuses.length)
        ],
      department: departments[Math.floor(Math.random() * departments.length)],
      manager: managers[Math.floor(Math.random() * managers.length)],
      update_at: updateDate.toLocaleDateString("ja-JP"),
    };
  });

  const colDefs: ColDef[] = [
    {
      field: "order_no",
      headerName: "発注番号",
      filter: true,
      width: 120,
      cellRenderer: (params: any) => {
        return <NavLink to={`./${params.data.id}`}>{params.value}</NavLink>;
      },
    },
    {
      field: "received_no",
      headerName: "受注番号",
      filter: true,
      width: 120,
    },
    {
      field: "order_type",
      headerName: "調達区分",
      filter: true,
      width: 120,
    },
    {
      field: "purchase",
      headerName: "仕入先名",
      filter: true,
      width: 160,
    },
    {
      field: "scene",
      headerName: "現場名",
      filter: true,
      width: 160,
    },
    {
      field: "order_status",
      headerName: "発注ステータス",
      filter: true,
      width: 140,
    },
    {
      field: "deadline",
      headerName: "希望納期",
      filter: true,
      width: 120,
    },
    {
      field: "deadline_type",
      headerName: "納期指定",
      filter: true,
      width: 120,
    },
    {
      field: "order_paper_status",
      headerName: "発注書発行状態",
      filter: true,
      width: 140,
    },
    {
      field: "department",
      headerName: "部門",
      filter: true,
      width: 140,
    },
    {
      field: "manager",
      headerName: "担当者",
      filter: true,
      width: 120,
    },
    {
      field: "update_at",
      headerName: "更新日時",
      filter: true,
      width: 120,
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <Input className="w-2xl" placeholder="検索キーワードを入力"></Input>
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
          defaultColDef={{
            floatingFilter: true,
            filter: true,
            sortable: true,
            resizable: true,
          }}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>
  );
}
