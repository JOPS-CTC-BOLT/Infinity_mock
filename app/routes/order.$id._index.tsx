import { MetaFunction } from "@remix-run/node";
import OrderDetailIndex from "~/components/app-order-detail";

export const meta: MetaFunction = () => {
  return [
    { title: "発注詳細" },
    { name: "description", content: "Order detail page" },
  ];
};

export const handle = {};

export default function Index() {
  return <OrderDetailIndex />;
}
