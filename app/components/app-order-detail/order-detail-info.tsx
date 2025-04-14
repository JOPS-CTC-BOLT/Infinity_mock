import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

export function OrderDetailInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border p-6">
        <div className="grid grid-cols-7 gap-4 text-sm">
          <div>
            <div className="font-medium">登録者</div>
            <div>田中太郎</div>
          </div>
          <div>
            <div className="font-medium">受注番号</div>
            <div>S-101</div>
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
            <div className="col-start-1">
              <div className="font-medium">部門</div>
              <div>仙台営業部</div>
            </div>
            <div>
              <div className="font-medium">発注登録区分</div>
              <div>販売</div>
            </div>
            <div className="col-span-2">
              <div className="font-medium">仕入先名称</div>
              <div>株式会社△△</div>
            </div>
            <div>
              <div className="font-medium">発注日</div>
              <div>2021/11/15</div>
            </div>
            <div>
              <div className="font-medium">発注ステータス</div>
              <div>未発注</div>
            </div>
            <div className="col-span-2">
              <div className="font-medium">発注先名称</div>
              <div>株式会社△△</div>
            </div>
            <div>
              <div className="font-medium">入荷希望納期</div>
              <div>2021/11/15</div>
            </div>
            <div>
              <div className="font-medium">入荷確定納期</div>
              <div>2021/11/15</div>
            </div>
            <div>
              <div className="font-medium">希望納期</div>
              <div>2021/11/15</div>
            </div>
            <div>
              <div className="font-medium">納期指定</div>
              <div>希望納期</div>
            </div>
            <div className="col-span-2">
              <div className="font-medium">得意先名称</div>
              <div>協立設備株式会社</div>
            </div>
            <div className="col-span-2">
              <div className="font-medium">現場名称</div>
              <div>仙台松森工場三次送熱設備工事（2号炉）追加</div>
            </div>
            <div>
              <div className="font-medium">調達区分</div>
              <div>在庫</div>
            </div>
            <div>
              <div className="font-medium">取引区分</div>
              <div>通常</div>
            </div>
            <div className="col-span-2">
              <div className="font-medium">直送先住所</div>
              <div></div>
            </div>
            <div>
              <div className="font-medium">仕入税区分</div>
              <div>外税10%</div>
            </div>
            <div>
              <div className="font-medium">仕入税計算</div>
              <div>締切単位</div>
            </div>
            <div>
              <div className="font-medium">売上税区分</div>
              <div>外税10%</div>
            </div>
            <div>
              <div className="font-medium">売上税計算</div>
              <div>締切単位</div>
            </div>
            <div>
              <div className="font-medium">荷札枚数</div>
              <div></div>
            </div>
            <div>
              <div className="font-medium">仕入担当者</div>
              <div>長谷川一郎</div>
            </div>
            <div>
              <div className="font-medium">売上担当者</div>
              <div>長谷川一郎</div>
            </div>
            <div>
              <div className="font-medium">最終更新日</div>
              <div>2021/11/16</div>
            </div>
            <div>
              <div className="font-medium">承認日</div>
              <div></div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
