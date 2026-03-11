import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TOOLS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

type OtherToolsProps = {
  currentPath: string;
};

export function OtherTools({ currentPath }: OtherToolsProps) {
  const otherTools = TOOLS.filter((t) => t.href !== currentPath);

  return (
    <div>
      <h2 className="text-lg font-semibold">他の退職計算ツール</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {otherTools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group cursor-pointer">
            <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
              <CardContent className="p-4">
                <p className="font-medium">
                  {tool.emoji} {tool.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tool.description}
                </p>
                <p className="mt-2 flex items-center gap-1 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2">
                  計算する
                  <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
