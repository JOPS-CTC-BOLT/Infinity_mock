import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

export function OrderDetailInfo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border p-6">
        <div className="grid grid-cols-7 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              発注No.
            </div>
            <div>0000415820</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              発注日
            </div>
            <div>2025/03/14</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              発注ステータス
            </div>
            <div>発注入力中</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              承認ステータス
            </div>
            <div></div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              入力担当者
            </div>
            <div>松本 一郎</div>
          </div>

          <div className="col-start-7 flex justify-center">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown
                  className={`transition-transform ${isOpen && "rotate-180"}`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent>
          <div className="grid grid-cols-7 gap-4 pt-4">
            <div className="space-y-2 col-span-2">
              <div className="text-sm font-medium text-muted-foreground">
                部門
              </div>
              <div>702050 松本支店</div>
            </div>

            <div className="space-y-2 col-span-2">
              <div className="text-sm font-medium text-muted-foreground">
                仕入先
              </div>
              <div>053016 ﾀﾞｲﾜﾎﾞｳ情報ｼｽﾃﾑ㈱</div>
            </div>

            <div className="space-y-2 col-start-1">
              <div className="text-sm font-medium text-muted-foreground">
                仕入形態
              </div>
              <div>取次</div>
            </div>

            <div className="space-y-2 col-span-2">
              <div className="text-sm font-medium text-muted-foreground">
                得意先
              </div>
              <div>010001 スワテック建設</div>
            </div>

            <div className="space-y-2 col-span-2">
              <div className="text-sm font-medium text-muted-foreground">
                現場
              </div>
              <div>000003 土木部</div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
