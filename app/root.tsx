import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { AppBreadcrumb } from "./components/app-breadcrumb";
import { Toaster } from "./components/ui/sonner";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <div className="flex justify-between px-5 py-3 border-b">
              <div className="flex gap-4">
                <div>Sales Management System INFINITY</div>
              </div>
              <Avatar>
                <AvatarImage src="" alt="infinity" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
            </div>
            <div className="p-3">
              <AppBreadcrumb />
              {children}
            </div>
            <Toaster position="bottom-right" expand={true} />
          </main>
        </SidebarProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
