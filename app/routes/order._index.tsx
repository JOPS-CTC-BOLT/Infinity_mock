import { Input } from "~/components/ui/input";
import type { MetaFunction } from "@remix-run/node";
import {
  CalendarIcon,
  Filter,
  Loader,
  Pen,
  Search,
  Upload,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { NavLink } from "@remix-run/react";
import type { ColDef, GridReadyEvent, IDatasource } from "ag-grid-community";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";

ModuleRegistry.registerModules([AllCommunityModule]);

export const meta: MetaFunction = () => {
  return [
    { title: "発注一覧" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export const handle = {};

const PAGE_SIZE = 100;

const myTheme = themeQuartz.withParams({
  fontFamily: "Anonymous Pro",
});

export default function Order() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [orderStartDate, setOrderStartDate] = useState<Date>();
  const [orderEndDate, setOrderEndDate] = useState<Date>();

  const colDefs: ColDef[] = [
    {
      field: "order_status",
      headerName: "発注ステータス",
      filter: true,
      width: 130,
      pinned: "left",
      cellRenderer: (params: CustomCellRendererProps) => {
        return params.data ? params.value : <Loader />;
      },
    },
    {
      field: "approval_status",
      headerName: "承認ステータス",
      filter: true,
      width: 130,
      pinned: "left",
    },
    {
      field: "order_no",
      headerName: "発注No",
      filter: true,
      width: 120,
      pinned: "left",
      cellRenderer: (params: CustomCellRendererProps) => {
        return params.data ? (
          <NavLink
            to={`./${params.data.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            {params.value}
          </NavLink>
        ) : (
          params.value
        );
      },
    },
    {
      field: "order_date",
      headerName: "発注日",
      filter: true,
      width: 120,
      pinned: "left",
    },
    {
      field: "supplier",
      headerName: "仕入先",
      filter: true,
      width: 200,
      pinned: "left",
    },
    {
      field: "product_name",
      headerName: "商品名",
      filter: true,
      width: 200,
    },
    {
      field: "spec",
      headerName: "規格",
      filter: true,
      width: 150,
    },
    {
      field: "quantity",
      headerName: "数量",
      filter: true,
      width: 100,
      cellRenderer: (params: CustomCellRendererProps) => {
        return params.value?.toLocaleString();
      },
      cellStyle: { textAlign: "right" },
    },
    {
      field: "order_unit_price",
      headerName: "発注単価",
      filter: true,
      width: 120,
      cellRenderer: (params: CustomCellRendererProps) => {
        return params.value?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
      },
      cellStyle: { textAlign: "right" },
    },
    {
      field: "order_amount",
      headerName: "発注金額",
      filter: true,
      width: 120,
      cellRenderer: (params: CustomCellRendererProps) => {
        return params.value?.toLocaleString();
      },
      cellStyle: { textAlign: "right" },
    },
    {
      field: "customer",
      headerName: "得意先",
      filter: true,
      width: 200,
    },
    {
      field: "site",
      headerName: "現場",
      filter: true,
      width: 200,
    },
    {
      field: "received_unit_price",
      headerName: "受注単価",
      filter: true,
      width: 120,
      cellRenderer: (params: CustomCellRendererProps) => {
        return params.value?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
      },
      cellStyle: { textAlign: "right" },
    },
    {
      field: "received_amount",
      headerName: "受注金額",
      filter: true,
      width: 120,
      cellRenderer: (params: CustomCellRendererProps) => {
        return params.value?.toLocaleString();
      },
      cellStyle: { textAlign: "right" },
    },
    {
      field: "note",
      headerName: "備考",
      filter: true,
      width: 200,
    },
  ];

  const onGridReady = useCallback((params: GridReadyEvent) => {
    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: (params) => {
        // サンプルデータの生成
        let rowData = [
          {
            id: 1,
            order_status: "発注入力中",
            approval_status: "",
            order_no: "0000415820",
            order_date: "2025/03/14",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013010020-00001 NECﾉｰﾄPC PC-VKV50FB9B21M",
            spec: " ",
            quantity: 5,
            order_unit_price: 195700,
            order_amount: 978500,
            customer: "010001 スワテック建設",
            site: "000003 土木部",
            received_unit_price: 250000,
            received_amount: 1250000,
            note: "",
          },
          {
            id: 2,
            order_status: "発注申請中",
            approval_status: "承認待",
            order_no: "0000414739",
            order_date: "2025/03/11",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013010510-00002 iiyama 液晶ﾃﾞｨｽﾌﾟﾚｲ XUB2763HSU-B1",
            spec: " ",
            quantity: 1,
            order_unit_price: 16853,
            order_amount: 16853,
            customer: "010001 スワテック建設",
            site: "000844 蓼科高原別荘西岡邸",
            received_unit_price: 0,
            received_amount: 0,
            note: "",
          },
          {
            id: 3,
            order_status: "発注承認済",
            approval_status: "承認済",
            order_no: "0000415501",
            order_date: "2025/03/13",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013010510-00002 iiyama 液晶ﾃﾞｨｽﾌﾟﾚｲ XUB2293HS-B4",
            spec: " ",
            quantity: 2,
            order_unit_price: 16292,
            order_amount: 32584,
            customer: "010001 スワテック建設",
            site: "000844 蓼科高原別荘西岡邸",
            received_unit_price: 0,
            received_amount: 0,
            note: "",
          },
          {
            id: 4,
            order_status: "発注済",
            approval_status: "",
            order_no: "0000413523",
            order_date: "2025/03/07",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013270040-00011 ﾊﾞｯﾌｧﾛｰﾘﾝｸｽﾃｰｼｮﾝ　LS720D0802",
            spec: " ",
            quantity: 1,
            order_unit_price: 41072,
            order_amount: 41072,
            customer: "010041 岡谷組",
            site: "009999 本社総務部",
            received_unit_price: 48320,
            received_amount: 48320,
            note: "",
          },
          {
            id: 5,
            order_status: "仕入未",
            approval_status: "",
            order_no: "0000415729",
            order_date: "2025/03/14",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013010510-00002 IOﾜｲﾄﾞ液晶ﾃﾞｨｽﾌﾟﾚｲ　LCD-U431DX",
            spec: " ",
            quantity: 1,
            order_unit_price: 39690,
            order_amount: 39690,
            customer: "010042 岡谷組 中信",
            site: "000806 小諸義塾高校建築工事",
            received_unit_price: 49610,
            received_amount: 49610,
            note: "",
          },
          {
            id: 6,
            order_status: "一部仕入済",
            approval_status: "",
            order_no: "0000412291",
            order_date: "2025/03/03",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013010020-00001 HPﾉｰﾄPC B10NYAT#ABJ",
            spec: " ",
            quantity: 10,
            order_unit_price: 136000,
            order_amount: 1360000,
            customer: "010044 興和工業",
            site: "000999 本社",
            received_unit_price: 189000,
            received_amount: 1890000,
            note: "",
          },
          {
            id: 7,
            order_status: "仕入済",
            approval_status: "",
            order_no: "0000412297",
            order_date: "2025/03/03",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013100010-00012 ｳｨﾙｽｿﾌﾄESET CMJ-EPA1-C11",
            spec: " ",
            quantity: 14,
            order_unit_price: 4627,
            order_amount: 64778,
            customer: "010044 興和工業",
            site: "000999 本社",
            received_unit_price: 6000,
            received_amount: 84000,
            note: "",
          },
          {
            id: 8,
            order_status: "完了(支払済)",
            approval_status: "",
            order_no: "0000412632",
            order_date: "2025/03/05",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013010010-00001 ﾏｳｽｺﾝﾋﾟｭｰﾀﾃﾞｽｸﾄｯﾌﾟPC　Q5030441073",
            spec: "SH-I5U01　＃SHI5U01B7ADAW101CEC",
            quantity: 2,
            order_unit_price: 153450,
            order_amount: 306900,
            customer: "025025 ｱｲｻﾞﾜ工業",
            site: "000006 会社",
            received_unit_price: 195000,
            received_amount: 390000,
            note: "",
          },
          {
            id: 9,
            order_status: "発注入力中",
            approval_status: "",
            order_no: "0000414530",
            order_date: "2025/03/11",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013279999 ｱｯﾌﾟﾙ　AirPodsPro　MTJV3J/A",
            spec: " ",
            quantity: 1,
            order_unit_price: 34336,
            order_amount: 34336,
            customer: "025495 木曽土建工業",
            site: "000303 Ｒ6　夏山",
            received_unit_price: 46800,
            received_amount: 46800,
            note: "",
          },
          {
            id: 10,
            order_status: "発注申請中",
            approval_status: "承認待",
            order_no: "0000415056",
            order_date: "2025/03/12",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013100010-00012 ﾊｰﾄﾞｳｴｱｵﾝｻｲﾄ5年　U18HRE",
            spec: " ",
            quantity: 2,
            order_unit_price: 14835,
            order_amount: 29670,
            customer: "025511 清信建設興業",
            site: "000001 会社",
            received_unit_price: 23000,
            received_amount: 46000,
            note: "",
          },
          {
            id: 11,
            order_status: "発注承認済",
            approval_status: "承認済",
            order_no: "0000412946",
            order_date: "2025/03/06",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0026150021-00048 ｲﾝｸｶｰﾄﾘｯｼﾞ　Y　IB02YA",
            spec: "PX-M7110F用",
            quantity: 1,
            order_unit_price: 7053,
            order_amount: 7053,
            customer: "026330 中信土木",
            site: "000003 会社",
            received_unit_price: 8800,
            received_amount: 8800,
            note: "",
          },
          {
            id: 12,
            order_status: "発注済",
            approval_status: "",
            order_no: "0000415633",
            order_date: "2025/03/14",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013010510-00001 JAPANNEXT55型ﾃﾞｨｽﾌﾟﾚｲ JN-V55UHD-U",
            spec: " ",
            quantity: 2,
            order_unit_price: 59048,
            order_amount: 118096,
            customer: "026377 ﾃｨｰｼｰﾒﾝﾃﾅﾝｽ",
            site: "000001 松本事業所",
            received_unit_price: 80000,
            received_amount: 160000,
            note: "",
          },
          {
            id: 13,
            order_status: "仕入未",
            approval_status: "",
            order_no: "0000413067",
            order_date: "2025/03/06",
            supplier: "053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱",
            product_name: "0013010020-00001 NECﾉｰﾄPC　PC-VKV47FB7J79L",
            spec: " ",
            quantity: 1,
            order_unit_price: 195700,
            order_amount: 195700,
            customer: "027001 桝匠",
            site: "000999 株式会社WorkSpirit",
            received_unit_price: 220000,
            received_amount: 220000,
            note: "",
          },
        ];

        // ソート処理
        if (params.sortModel && params.sortModel.length > 0) {
          const { colId, sort } = params.sortModel[0];
          rowData.sort((a: any, b: any) => {
            if (sort === "asc") {
              return a[colId] > b[colId] ? 1 : -1;
            }
            return a[colId] < b[colId] ? 1 : -1;
          });
        }

        // フィルター処理
        if (params.filterModel) {
          Object.keys(params.filterModel).forEach((key) => {
            const filter = params.filterModel[key];
            if (filter.type === "contains") {
              rowData = rowData.filter((row: any) =>
                row[key]
                  .toString()
                  .toLowerCase()
                  .includes(filter.filter.toLowerCase())
              );
            }
          });
        }

        // ページネーション処理
        const startRow = params.startRow;
        const endRow = Math.min(params.endRow, rowData.length);
        const rowsThisPage = rowData.slice(startRow, endRow);

        // 遅延を入れてリアルなAPIコールをシミュレート
        setTimeout(() => {
          params.successCallback(rowsThisPage, rowData.length);
        }, 500);
      },
    };
    params.api.setGridOption("datasource", dataSource);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6">
        <div className="flex">
          <div className="relative flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="w-96 pl-9 rounded-r-none"
                placeholder="検索キーワードを入力"
                value="部門：松本支店"
              />
            </div>
            <Button
              variant="outline"
              className="px-3 rounded-l-none border-l-0"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
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
        <div className="w-full h-[600px]">
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
            rowHeight={40}
            headerHeight={40}
            floatingFiltersHeight={40}
            theme={myTheme}
            autoSizeStrategy={{
              type: "fitCellContents",
            }}
          />
        </div>
      </div>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>検索条件</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">部門</div>
              <Input value="702050 松本支店" />
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">
                営業担当者
              </div>
              <Input />
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">
                入力担当者
              </div>
              <Input />
            </div>

            <div className="grid grid-cols-[120px_1fr] items-start gap-2">
              <div className="font-medium text-muted-foreground">
                発注ステータス
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="unordered" />
                  <label htmlFor="unordered">発注入力中</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ordered" />
                  <label htmlFor="ordered">発注済</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending" />
                  <label htmlFor="pending">発注申請中</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="approved" />
                  <label htmlFor="approved">発注承認済</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="received" />
                  <label htmlFor="received">仕入済</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="partial" />
                  <label htmlFor="partial">一部仕入済</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="completed" />
                  <label htmlFor="completed">完了(支払済)</label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-start gap-2">
              <div className="font-medium text-muted-foreground">
                承認ステータス
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending-approval" />
                  <label htmlFor="pending-approval">承認待</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="approved-status" />
                  <label htmlFor="approved-status">承認済</label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-start gap-2">
              <div className="font-medium text-muted-foreground">仕入形態</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="purchase" />
                  <label htmlFor="purchase">取次</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sale" />
                  <label htmlFor="sale">販売</label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">発注No</div>
              <div className="flex items-center gap-2">
                <Input />
                <span>～</span>
                <Input />
              </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">発注日</div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !orderStartDate && "text-muted-foreground"
                      )}
                    >
                      {orderStartDate ? (
                        format(orderStartDate, "yyyy/MM/dd")
                      ) : (
                        <span>開始日を選択</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={orderStartDate}
                      onSelect={setOrderStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <span>～</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !orderEndDate && "text-muted-foreground"
                      )}
                    >
                      {orderEndDate ? (
                        format(orderEndDate, "yyyy/MM/dd")
                      ) : (
                        <span>終了日を選択</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={orderEndDate}
                      onSelect={setOrderEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">仕入先</div>
              <Input />
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">商品名</div>
              <Input />
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">得意先</div>
              <Input />
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">現場</div>
              <Input />
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-2">
              <div className="font-medium text-muted-foreground">備考</div>
              <Input />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
              クリア
            </Button>
            <Button onClick={() => setIsFilterOpen(false)}>検索</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>データ出力</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="font-medium text-muted-foreground">出力対象</div>
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
              <div className="font-medium text-muted-foreground">出力様式</div>
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
              <div className="font-medium text-muted-foreground">保存先</div>
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
              <div className="font-medium text-muted-foreground">ページ</div>
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
