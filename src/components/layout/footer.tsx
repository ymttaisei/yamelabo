import Link from "next/link";
import { SITE_NAME, SITE_CATCHCOPY, CONTACT_FORM_URL, TOOLS } from "@/lib/constants";

export function Footer() {
  return (
    <footer>
      {/* Main footer — FACLOG: bg #0b4d64, text white, padding 50px TB / 100px LR */}
      <div className="bg-[#0b4d64] px-6 py-12 text-white md:px-[100px] md:py-[50px]">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div>
              <p className="mb-[35px] text-lg font-bold text-white">{SITE_NAME}</p>
              <p className="text-sm text-white/80">
                {SITE_CATCHCOPY}
              </p>
            </div>

            {/* 退職代行 links */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[1.2px] text-white/80">退職代行</p>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/"
                    className="cursor-pointer text-xs font-medium leading-[18px] tracking-[1.2px] text-white transition-colors duration-200 hover:text-white/70"
                  >
                    おすすめランキング
                  </Link>
                </li>
                <li>
                  <Link
                    href="/taishoku-daikou"
                    className="cursor-pointer text-xs font-medium leading-[18px] tracking-[1.2px] text-white transition-colors duration-200 hover:text-white/70"
                  >
                    退職代行比較
                  </Link>
                </li>
              </ul>
            </div>

            {/* サービス links */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[1.2px] text-white/80">サービス</p>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/tenshoku"
                    className="cursor-pointer text-xs font-medium leading-[18px] tracking-[1.2px] text-white transition-colors duration-200 hover:text-white/70"
                  >
                    転職エージェント比較
                  </Link>
                </li>
                {TOOLS.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="cursor-pointer text-xs font-medium leading-[18px] tracking-[1.2px] text-white transition-colors duration-200 hover:text-white/70"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/column"
                    className="cursor-pointer text-xs font-medium leading-[18px] tracking-[1.2px] text-white transition-colors duration-200 hover:text-white/70"
                  >
                    コラム
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="cursor-pointer text-xs font-medium leading-[18px] tracking-[1.2px] text-white transition-colors duration-200 hover:text-white/70"
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
                      className="cursor-pointer text-xs font-medium leading-[18px] tracking-[1.2px] text-white transition-colors duration-200 hover:text-white/70"
                    >
                      お問い合わせ
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 border-t border-white/20 pt-6">
            <div className="space-y-1 text-xs text-white/60">
              <p>
                ※
                本サイトの計算結果は参考値です。正確な金額はハローワーク・税務署等にご確認ください。
              </p>
              <p>
                ※ 本サイトはアフィリエイト広告を利用しています。
              </p>
            </div>
            <p className="mt-4 text-center text-[12.8px] leading-[14.72px] text-white">
              © {new Date().getFullYear()} {SITE_NAME} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
