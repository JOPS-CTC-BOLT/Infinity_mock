import { Input } from "~/components/ui/input";
import type { MetaFunction } from "@remix-run/node";
import { Loader, Pen, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { NavLink } from "@remix-run/react";
import type { ColDef, GridReadyEvent, IDatasource } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { useCallback, useState } from "react";
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

ModuleRegistry.registerModules([AllCommunityModule]);

export const meta: MetaFunction = () => {
  return [
    { title: "発注一覧" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export const handle = {};

const PAGE_SIZE = 100;

export default function Order() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Generate sample record
  const generateRow = (index: number) => {
    const orderNo = `P-${String(index + 1).padStart(4, "0")}`;
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
      id: index + 1,
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
  };

  const colDefs: ColDef[] = [
    {
      field: "order_no",
      headerName: "発注番号",
      filter: true,
      flex: 1,
      minWidth: 120,
      cellRenderer: (params: CustomCellRendererProps) => {
        return params.data ? (
          <NavLink to={`./${params.data.id}`}>{params.value}</NavLink>
        ) : (
          <Loader />
        );
      },
    },
    {
      field: "received_no",
      headerName: "受注番号",
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "order_type",
      headerName: "調達区分",
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "purchase",
      headerName: "仕入先名",
      filter: true,
      flex: 1.5,
      minWidth: 160,
    },
    {
      field: "scene",
      headerName: "現場名",
      filter: true,
      flex: 1.5,
      minWidth: 160,
    },
    {
      field: "order_status",
      headerName: "発注ステータス",
      filter: true,
      flex: 1,
      minWidth: 140,
    },
    {
      field: "deadline",
      headerName: "希望納期",
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "deadline_type",
      headerName: "納期指定",
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "order_paper_status",
      headerName: "発注書発行状態",
      filter: true,
      flex: 1,
      minWidth: 140,
    },
    {
      field: "department",
      headerName: "部門",
      filter: true,
      flex: 1,
      minWidth: 140,
    },
    {
      field: "manager",
      headerName: "担当者",
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "update_at",
      headerName: "更新日時",
      filter: true,
      flex: 1,
      minWidth: 120,
    },
  ];

  const onGridReady = useCallback((params: GridReadyEvent) => {
    // 初期データのロード
    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: (params) => {
        // To make the demo look real, wait for 500ms before returning
        setTimeout(function () {
          // take a slice of the total rows
          const rowsThisPage = Array.from({ length: PAGE_SIZE }, (_, i) =>
            generateRow(params.startRow + i)
          );
          // call the success callback
          params.successCallback(rowsThisPage, -1);
        }, 500);
      },
    };
    params.api.setGridOption("datasource", dataSource);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6">
        <Input className="w-2xl" placeholder="検索キーワードを入力"></Input>
        <div className="flex gap-3">
          <Button onClick={() => setIsExportModalOpen(true)}>
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
      <div className="flex grow">
        <div className="w-full h-96">
          <AgGridReact
            columnDefs={colDefs}
            defaultColDef={{
              floatingFilter: true,
              filter: true,
              sortable: true,
              resizable: true,
            }}
            rowBuffer={0}
            rowModelType={"infinite"}
            cacheBlockSize={PAGE_SIZE}
            cacheOverflowSize={2}
            maxConcurrentDatasourceRequests={1}
            infiniteInitialRowCount={1000}
            maxBlocksInCache={10}
            onGridReady={onGridReady}
            domLayout="normal"
          />
        </div>
      </div>

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
            <Button onClick={() => setIsExportModalOpen(false)}>出力</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
