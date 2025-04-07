import type { MetaFunction } from "@remix-run/node";
import { Inbox } from "lucide-react";
import { Outlet } from "@remix-run/react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export const meta: MetaFunction = () => {
  return [
    { title: "発注詳細" },
    { name: "description", content: "Order detail page" },
  ];
};

export const handle = {
  title: "発注詳細",
  icon: Inbox,
};

export default function order() {
  return <Outlet />;
}
