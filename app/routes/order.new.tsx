import { MetaFunction } from "@remix-run/node";
import { Inbox } from "lucide-react";
import OrderEditor from "~/components/app-order-editor/index";

export const meta: MetaFunction = () => {
  return [
    { title: "発注登録" },
    { name: "description", content: "Create new order" },
  ];
};

export const handle = {
  title: "発注登録",
  icon: Inbox,
};

export default function OrderNew() {
  return <OrderEditor />;
}
