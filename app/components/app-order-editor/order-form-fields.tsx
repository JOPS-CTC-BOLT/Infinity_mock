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

const orderStatuses = ["発注入力中", "発注済", "納品済", "検収済"];
const approvalStatuses = ["承認待", "承認済"];
const purchaseTypes = ["取次", "販売"];

export interface OrderFormFieldsProps {
  form: UseFormReturn<any>;
}

export function OrderFormFields({ form }: OrderFormFieldsProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="grid grid-cols-7 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">発注No.</div>
          <div></div>
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="orderDate"
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
                          format(field.value, "yyyy/MM/dd")
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
          <div className="text-sm font-medium">発注ステータス</div>
          <div>発注入力中</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">承認ステータス</div>
          <div></div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">入力担当者</div>
          <div>松本 一郎</div>
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
          <div className="space-y-2 col-start-1 col-span-2">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>部門</FormLabel>
                  <Input placeholder="部門を入力" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>仕入先</FormLabel>
                  <Input placeholder="仕入先を入力" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2 col-start-1">
            <FormField
              control={form.control}
              name="purchaseType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>仕入形態</FormLabel>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="仕入形態を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
              name="customer"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>得意先</FormLabel>
                  <Input placeholder="得意先を入力" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>現場</FormLabel>
                  <Input placeholder="現場を入力" {...field} />
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
