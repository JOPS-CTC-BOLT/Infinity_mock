import {
  BookOpen,
  CalendarIcon,
  Plus,
  Search,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useMemo, useState } from "react";
import { useNavigate } from "@remix-run/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";

interface Product {
  id: string;
  code: string;
  name: string;
  spec: string;
  unit: string;
  unitPrice: number;
  stock: number;
}

interface OrderDetail {
  id: string;
  productCode: string;
  productName: string;
  spec: string;
  stock: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  orderAmount: number;
  tax: number;
  receivedUnitPrice: number;
  receivedAmount: number;
  receivedTax: number;
  profitAmount: number;
  warehouseCode: string;
  warehouseName: string;
  selected: boolean;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    code: "00130400040-00358",
    name: "扇島型河川監視カメラ",
    spec: "1080p対応",
    unit: "個",
    unitPrice: 655000,
    stock: 10,
  },
  {
    id: "2",
    code: "00130400040-00023",
    name: "SDカード 64GB",
    spec: "Class 10",
    unit: "個",
    unitPrice: 5000,
    stock: 50,
  },
  {
    id: "3",
    code: "00130400040-00854",
    name: "取付金具",
    spec: "ステンレス製",
    unit: "個",
    unitPrice: 2000,
    stock: 100,
  },
];

const FormSchema = z
  .object({
    purchaseOrderNo: z.string({}),
    register: z.string({}),
    orderNo: z.string({}),
    department: z.string({}),
    orderRegistrationType: z.string({}),
    OrderDate: z.date({}),
    supplierName: z.string({}),
    purchaseOrderDate: z.date({}),
    purchaseOrderStatuses: z.string({}),
    purchaseOrderName: z.string({}),
    arrivalDesiredDeliveryDate: z.date({}),
    desiredDeliveryDate: z.date({}),
    arrivalDeliveryDateConfirmed: z.date({}),
    deadlineType: z.string({}),
    customerName: z.string({}),
    siteName: z.string({}),
    orderType: z.string({}),
    transactionType: z.string({}),
    directDeliveryName: z.string({}),
    supplierTaxType: z.string({}),
    supplierTaxCalculationType: z.string({}),
    salesTaxType: z.string({}),
    salesTaxCalculationType: z.string({}),
    NumberOfTags: z.string({}),
    purchaser: z.string({}),
    seller: z.string({}),
    uploadAt: z.date({}),
    approvalAt: z.date({}),
  })
  .partial();

export default function OrderEditor() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<OrderDetail[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

  const orderTypes = ["在庫", "直送", "工事", "その他"];
  const departments = [
    "仙台営業所",
    "東京支店",
    "大阪支店",
    "名古屋営業所",
    "福岡営業所",
  ];
  const deadlineTypes = ["希望納期", "確定納期"];
  const orderRegistrationTypes = ["販売", "在庫", "その他"];
  const orderStatuses = ["未発注", "発注済", "納品済", "検収済"];
  const transactionTypes = ["通常", "返品", "値引"];
  const taxTypes = ["外税10%", "内税10%", "非課税"];
  const taxCalculationTypes = ["締切単位", "伝票単位"];

  const filteredProducts = sampleProducts.filter(
    (product) =>
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProductSelection = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      const newQuantity = { ...quantity };
      delete newQuantity[productId];
      setQuantity(newQuantity);
    } else {
      newSelected.add(productId);
      setQuantity({ ...quantity, [productId]: 1 });
    }
    setSelectedProducts(newSelected);
  };

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantity({ ...quantity, [productId]: value });
  };

  const addSelectedProducts = () => {
    const newDetails = [...details];
    selectedProducts.forEach((productId) => {
      const product = sampleProducts.find((p) => p.id === productId);
      if (product && quantity[productId]) {
        const orderAmount = product.unitPrice * quantity[productId];
        newDetails.push({
          id: crypto.randomUUID(),
          productCode: product.code,
          productName: product.name,
          spec: product.spec,
          stock: product.stock.toString(),
          quantity: quantity[productId],
          unit: product.unit,
          unitPrice: product.unitPrice,
          orderAmount: orderAmount,
          tax: Math.floor(orderAmount * 0.1),
          receivedUnitPrice: 0,
          receivedAmount: 0,
          receivedTax: 0,
          profitAmount: 0,
          warehouseCode: "",
          warehouseName: "",
          selected: false,
        });
      }
    });
    setDetails(newDetails);
    setIsModalOpen(false);
    setSelectedProducts(new Set());
    setQuantity({});
    setSearchTerm("");
  };

  const removeDetail = (id: string) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };

  const isAllChecked = useMemo(
    () => details.every((detail) => detail.selected),
    [details]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    toast("登録しました");
    navigate("..");
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="rounded-lg border p-6 space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="purchaseOrderNo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>発注番号</FormLabel>
                      <Input placeholder="発注番号" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="register"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>登録者</FormLabel>
                      <Input placeholder="登録者" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="orderNo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>受注番号</FormLabel>
                      <Input placeholder="受注番号" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="orderNo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>部門</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="部門を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>{" "}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="orderRegistrationType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>発注登録区分</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="発注登録区分を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderRegistrationTypes.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="OrderDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>受注日</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyy/MM/dd")
                              ) : (
                                <span>受注日を選択</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="supplierName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>仕入先名称</FormLabel>
                      <Input placeholder="仕入先名称" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="purchaseOrderDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>発注日</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyy/MM/dd")
                              ) : (
                                <span>発注日を選択</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="purchaseOrderStatuses"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>発注ステータス</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="発注ステータスを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="purchaseOrderName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>発注先名称</FormLabel>
                      <Input placeholder="発注先名称" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="arrivalDesiredDeliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>入荷希望納期</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyy/MM/dd")
                              ) : (
                                <span>入荷希望納期を選択</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="desiredDeliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>入荷確定納期</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyy/MM/dd")
                              ) : (
                                <span>入荷確定納期を選択</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="arrivalDeliveryDateConfirmed"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>希望納期</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyy/MM/dd")
                              ) : (
                                <span>希望納期を選択</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="deadlineType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>納期指定</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="納期指定を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {deadlineTypes.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>得意先名称</FormLabel>
                      <Input placeholder="得意先名称" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>現場名称</FormLabel>
                      <Input placeholder="現場名称" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="orderType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>調達区分</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="調達区分を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderTypes.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="transactionType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>取引区分</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="取引区分を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {transactionTypes.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="directDeliveryName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>直送先名称</FormLabel>
                      <Input placeholder="直送先名称" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="supplierTaxType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>仕入税区分</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="仕入税区分を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxTypes.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="supplierTaxCalculationType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>仕入税計算</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="仕入税計算を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxCalculationTypes.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="salesTaxType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>売上税区分</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="売上税区分を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxTypes.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="salesTaxCalculationType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>売上税計算</FormLabel>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="売上税計算を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxCalculationTypes.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="NumberOfTags"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>荷札枚数</FormLabel>
                      <Input placeholder="荷札枚数" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="purchaser"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>仕入担当者</FormLabel>
                      <Input placeholder="仕入担当者" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="seller"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>売上担当者</FormLabel>
                      <Input placeholder="売上担当者" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="uploadAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>最終更新日</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyy/MM/dd")
                              ) : (
                                <span>最終更新日を選択</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="approvalAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>承認日</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyy/MM/dd")
                              ) : (
                                <span>承認日を選択</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-8">
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">数量計</div>
                <div className="text-xl">
                  {details
                    .reduce((sum, detail) => sum + detail.quantity, 0)
                    .toLocaleString()}
                </div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">容重量系</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">小売金額計</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">原価金額計</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">粗利金額計</div>
                <div className="text-xl">
                  {details
                    .reduce((sum, detail) => sum + detail.profitAmount, 0)
                    .toLocaleString()}
                </div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">粗利率</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">小売金額</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">粗利金額</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">粗利率</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">発注金額</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">消費税等</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">発注伝票合計</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">受注金額</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">消費税等</div>
                <div className="text-xl">0</div>
              </div>
              <div className="border rounded p-4">
                <div className="text-sm font-medium mb-2">受注伝票合計</div>
                <div className="text-xl">0</div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-medium">明細一覧</span>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  type="button"
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  明細追加
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {details.length > 0 && (
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
                        )}
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        区分
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        商品番号
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        商品名
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        規格
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        在庫確認
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        発注数
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        単位
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        単価履歴
                      </TableHead>
                      <TableHead className="p-2 text-right font-medium">
                        発注単価
                      </TableHead>
                      <TableHead className="p-2 text-right font-medium">
                        発注金額
                      </TableHead>
                      <TableHead className="p-2 text-right font-medium">
                        消費税
                      </TableHead>
                      <TableHead className="p-2 text-right font-medium">
                        受注単価
                      </TableHead>
                      <TableHead className="p-2 text-right font-medium">
                        受注金額
                      </TableHead>
                      <TableHead className="p-2 text-right font-medium">
                        消費税
                      </TableHead>
                      <TableHead className="p-2 text-right font-medium">
                        粗利金額
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        倉庫番号
                      </TableHead>
                      <TableHead className="p-2 text-left font-medium">
                        倉庫名
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
                        <TableCell className="p-2">通常</TableCell>
                        <TableCell className="p-2">
                          {detail.productCode}
                        </TableCell>
                        <TableCell className="p-2">
                          {detail.productName}
                        </TableCell>
                        <TableCell className="p-2"></TableCell>
                        <TableCell className="p-2">
                          <Button variant="ghost" size="icon">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell className="p-2">{detail.quantity}</TableCell>
                        <TableCell className="p-2">{detail.unit}</TableCell>
                        <TableCell className="p-2">
                          <Button variant="ghost" size="icon">
                            <SquarePen className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          {detail.unitPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          {detail.orderAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          {detail.tax.toLocaleString()}
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          {detail.receivedUnitPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          {detail.receivedAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          {detail.receivedTax.toLocaleString()}
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          {detail.profitAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="p-2">
                          {detail.warehouseCode}
                        </TableCell>
                        <TableCell className="p-2">
                          {detail.warehouseName}
                        </TableCell>
                        <TableCell className="p-2">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeDetail(detail.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate("..")}>
              キャンセル
            </Button>
            <Button type="submit">登録</Button>
          </div>
        </form>
      </Form>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>商品選択</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="商品番号・商品名で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="border rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 w-16"></th>
                    <th className="p-2 text-left">商品番号</th>
                    <th className="p-2 text-left">商品名</th>
                    <th className="p-2 text-left">規格</th>
                    <th className="p-2 text-right">在庫数</th>
                    <th className="p-2 text-left">単位</th>
                    <th className="p-2 text-right">単価</th>
                    <th className="p-2 text-center w-32">数量</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-2">{product.code}</td>
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.spec}</td>
                      <td className="p-2 text-right">{product.stock}</td>
                      <td className="p-2">{product.unit}</td>
                      <td className="p-2 text-right">
                        {product.unitPrice.toLocaleString()}
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="1"
                          value={quantity[product.id] || ""}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              Number(e.target.value)
                            )
                          }
                          disabled={!selectedProducts.has(product.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={addSelectedProducts}>追加</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
