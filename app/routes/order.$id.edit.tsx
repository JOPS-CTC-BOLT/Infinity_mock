import type { MetaFunction } from "@remix-run/node";
import { Inbox } from "lucide-react";
import OrderEditor from "~/components/app-order-editor";

export const meta: MetaFunction = () => {
  return [
    { title: "発注編集" },
    { name: "description", content: "Order edit page" },
  ];
};

export const handle = {
  title: "発注編集",
  icon: Inbox,
};

export default function OrderEdit() {
  return <OrderEditor />;
}
