import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function ToolResultCta() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-6 text-center">
      <h2 className="text-lg font-semibold">退職でお悩みなら</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        退職の意思を伝えるのが難しい方は、退職代行サービスの利用も選択肢のひとつです。
      </p>
      <Link
        href="/taishoku-daikou"
        className={cn(
          buttonVariants({ variant: "default" }),
          "mt-4 cursor-pointer shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110"
        )}
      >
        退職代行サービスを比較する
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}
