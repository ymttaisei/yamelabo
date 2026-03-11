import Link from "next/link";
import { SITE_NAME, SITE_CATCHCOPY, CONTACT_FORM_URL, TOOLS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-primary">{SITE_NAME}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {SITE_CATCHCOPY}
            </p>
          </div>

          {/* Tools links */}
          <div>
            <p className="text-sm font-semibold">ツール</p>
            <ul className="mt-2 space-y-1">
              {TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="cursor-pointer text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <p className="text-sm font-semibold">サポート</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link
                  href="/about"
                  className="cursor-pointer text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  About
                </Link>
              </li>
              {CONTACT_FORM_URL && (
                <li>
                  <a
                    href={CONTACT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    お問い合わせ
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t pt-6">
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              ※
              本サイトの計算結果は参考値です。正確な金額はハローワーク・税務署等にご確認ください。
            </p>
            <p>
              ※ 本サイトはアフィリエイト広告を利用しています。
            </p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE_NAME} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
