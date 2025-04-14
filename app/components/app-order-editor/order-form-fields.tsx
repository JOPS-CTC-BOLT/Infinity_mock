import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";

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

export interface OrderFormFieldsProps {
  form: UseFormReturn<any>;
}

export function OrderFormFields({ form }: OrderFormFieldsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="grid grid-cols-7 gap-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="register"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>登録者</FormLabel>
                <Input placeholder="登録者" disabled {...field} />
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
                <Input placeholder="受注番号" disabled {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-start-7 flex justify-center pt-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown
                className={`transition-transform ${isOpen && "rotate-180"}`}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent>
        <div className="grid grid-cols-7 gap-4 pt-4">
          <div className="space-y-2 col-start-1">
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

          <div className="space-y-2 col-span-2">
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

          <div className="space-y-2 col-span-2">
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

          <div className="space-y-2 col-span-2">
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

          <div className="space-y-2 col-span-2">
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

          <div className="space-y-2 col-span-2">
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
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
