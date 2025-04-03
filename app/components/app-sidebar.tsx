import { NavLink } from "react-router";
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
} from "./ui/sidebar";
import { ChevronDown, Inbox } from "lucide-react";

const items = [
  {
    title: "販売管理",
    icon: Inbox,
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
    icon: Inbox,
  },
  {
    title: "賃貸管理",
    icon: Inbox,
  },
  {
    title: "倉庫管理",
    icon: Inbox,
  },
  {
    title: "システム管理",
    icon: Inbox,
  },
  {
    title: "購買管理",
    icon: Inbox,
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
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="cursor-pointer">
                  <span>{item.title}</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <CollapsibleContent>
                  <SidebarMenu>
                    {item.children?.map((child) => (
                      <SidebarMenuItem key={child.title}>
                        <SidebarMenuButton asChild>
                          <NavLink to={child.url}>
                            <child.icon />
                            <span>{child.title}</span>
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
