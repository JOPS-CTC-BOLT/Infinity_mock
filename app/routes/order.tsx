import type { MetaFunction } from "@remix-run/node";
import { Inbox } from "lucide-react";
import { Outlet, useMatches } from "@remix-run/react";
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

export default function Order() {
  const matches = useMatches();

  return (
    <div>
      <div className="py-6 text-4xl font-bold">
        {
          matches.filter((m) => !!m.handle && !!m.handle.title).at(-1)?.handle
            .title
        }
      </div>
      <Outlet />
    </div>
  );
}
