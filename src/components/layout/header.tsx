"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TOOLS } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="cursor-pointer text-xl font-bold text-primary transition-opacity duration-200 hover:opacity-80">
          ヤメラボ
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="cursor-pointer text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
          >
            退職代行ランキング
          </Link>

          <Link
            href="/tenshoku"
            className="cursor-pointer text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
          >
            転職エージェント比較
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-sm font-medium"
              )}
            >
              計算ツール
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {TOOLS.map((tool) => (
                <DropdownMenuItem key={tool.href}>
                  <Link
                    href={tool.href}
                    className="flex w-full cursor-pointer items-center"
                  >
                    {tool.emoji} {tool.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/column"
            className="cursor-pointer text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
          >
            コラム
          </Link>

          <Link
            href="/about"
            className="cursor-pointer text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-foreground"
          >
            About
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden"
            )}
            aria-label="メニューを開く"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="mt-8 flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent"
              >
                退職代行ランキング
              </Link>
              <Link
                href="/tenshoku"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent"
              >
                転職エージェント比較
              </Link>

              <div className="my-2 border-t" />

              <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                計算ツール
              </p>
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent"
                >
                  {tool.emoji} {tool.name}
                </Link>
              ))}

              <div className="my-2 border-t" />

              <Link
                href="/column"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent"
              >
                コラム
              </Link>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent"
              >
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
