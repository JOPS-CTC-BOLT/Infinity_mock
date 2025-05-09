import {
  Links,
  NavLink,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { ChevronDown, Inbox, ShoppingCart, Factory, Warehouse, Wrench, ShoppingBag, Menu, X } from "lucide-react";

const items = [
  {
    title: "販売管理",
    icon: ShoppingCart,
    children: [
      {
        title: "見積",
        url: "",
        icon: Inbox,
      },
      {
        title: "受注",
        url: "",
        icon: Inbox,
      },
      {
        title: "出荷",
        url: "",
        icon: Inbox,
      },
      {
        title: "売上",
        url: "",
        icon: Inbox,
      },
      {
        title: "売掛",
        url: "",
        icon: Inbox,
      },
      {
        title: "請求",
        url: "",
        icon: Inbox,
      },
      {
        title: "回収",
        url: "",
        icon: Inbox,
      },
    ],
  },
  {
    title: "生産管理",
    icon: Factory,
  },
  {
    title: "賃貸管理",
    icon: Inbox,
  },
  {
    title: "倉庫管理",
    icon: Warehouse,
  },
  {
    title: "システム管理",
    icon: Wrench,
  },
  {
    title: "購買管理",
    icon: ShoppingBag,
    children: [
      {
        title: "発注",
        url: "order",
        icon: Inbox,
      },
    ],
  },
];

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar()
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSidebar()}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen={item.children && item.children.length > 0}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="cursor-pointer" tooltip={item.title}>
                  <item.icon className="h-4 w-4" />
                  <span className="ml-3 group-data-[collapsible=icon]:hidden">{item.title}</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <CollapsibleContent>
                  <SidebarMenu>
                    {item.children?.map((child) => (
                      <SidebarMenuItem key={child.title}>
                        <SidebarMenuButton 
                          asChild 
                          tooltip={child.title}
                        >
                          <NavLink to={child.url}>
                            <child.icon className="h-4 w-4" />
                            <span className="ml-3">{child.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarGroupContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}