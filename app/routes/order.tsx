import type { MetaFunction } from "@remix-run/node";
import { Inbox } from "lucide-react";
import { Outlet } from "@remix-run/react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export const meta: MetaFunction = () => {
  return [
    { title: "order" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export const handle = {
  title: "発注一覧",
  icon: Inbox,
};

export default function order() {
  return <Outlet />;
}
