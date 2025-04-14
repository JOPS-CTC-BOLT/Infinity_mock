import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { toast } from "sonner";
import { OrderFormFields } from "./order-form-fields";
import { OrderSummary } from "./order-summary";
import { OrderDetails } from "./order-details";
import { OrderDetail } from "./types";
import { Separator } from "../ui/separator";

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
    approvalAt: z.date().nullable(),
  })
  .partial();

export interface OrderFormProps {
  details: OrderDetail[];
  setDetails: React.Dispatch<React.SetStateAction<OrderDetail[]>>;
  defaultValues?: z.infer<typeof FormSchema>;
}

export function OrderForm({
  details,
  setDetails,
  defaultValues,
}: OrderFormProps) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    toast("登録しました");
    navigate("..");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-lg border p-6 space-y-4">
          <OrderFormFields form={form} />
          <Separator />
          <OrderSummary details={details} />
          <Separator />
          <OrderDetails details={details} setDetails={setDetails} />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate("..")}
          >
            キャンセル
          </Button>
          <Button type="submit">登録</Button>
        </div>
      </form>
    </Form>
  );
}
