import type { MetaFunction } from "@remix-run/node";
import { Home as HomeIcon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const handle = {
  title: "Home",
  icon: HomeIcon,
};

export default function Home() {
  return (
    <div className="flex h-fit justify-center content-center">
      <div>開始ページ</div>
    </div>
  );
}
