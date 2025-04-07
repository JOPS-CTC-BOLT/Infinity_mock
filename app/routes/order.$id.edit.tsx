import type { MetaFunction } from "@remix-run/node";
import OrderNew from "./order.new";
import { Inbox } from "lucide-react";

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
  return <OrderNew />;
}
