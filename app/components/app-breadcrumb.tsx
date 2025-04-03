import { NavLink, useMatches } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { handle as home_handle } from "app/routes/home";

export function AppBreadcrumb() {
  const matchs = useMatches();
  const breadcrumbs = [
    // TODO Homeのみ直追加
    {
      title: home_handle.title,
      icon: home_handle.icon,
      pathname: "/",
      id: "routes/home",
    },
    ...matchs
      .map((match) => {
        if (
          match.pathname !== "/" &&
          match.handle &&
          match.handle.title &&
          match.handle.icon
        ) {
          return {
            title: match.handle.title,
            icon: match.handle.icon,
            pathname: match.pathname,
            id: match.id,
          };
        }
      })
      .filter((match) => !!match),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumbs.length - 1 <= index ? (
            <BreadcrumbItem key={breadcrumb.id}>
              <BreadcrumbPage>
                <div className="flex gap-2 place-items-center">
                  {breadcrumb.icon && <breadcrumb.icon />}
                  <div>{breadcrumb.title}</div>
                </div>
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem key={breadcrumb.pathname}>
                <BreadcrumbLink>
                  <NavLink to={breadcrumb.pathname}>
                    <div className="flex gap-2 place-items-center">
                      {breadcrumb.icon && <breadcrumb.icon />}
                      <div>{breadcrumb.title}</div>
                    </div>
                  </NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
