"use client";

/**
 * Pattern F — Social Proof Hero
 * 利用者実績・成功率をど真ん中に据えた数字インパクト型。
 * 大きな数字が先にカウントアップ→テキストが現れる構成。
 */

import { useEffect, useRef, useState } from "react";
import { Scale, Building2, Shield, BadgeCheck, Users, TrendingUp, CheckCircle2 } from "lucide-react";

function BigCounter({ end, suffix, delay = 0 }: { end: number; suffix: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      setDone(true);
      return;
    }
    const t0 = performance.now() + delay;
    const duration = 1200;
    function tick(now: number) {
      const elapsed = now - t0;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(eased * end));
      if (p >= 1) setDone(true);
      else requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [end, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      <span className="text-lg font-medium md:text-2xl">{suffix}</span>
    </span>
  );
}

function SmallCounter({ end, delay = 0 }: { end: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(end); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        const t0 = performance.now() + delay;
        function tick(now: number) {
          const elapsed = now - t0;
          if (elapsed < 0) { requestAnimationFrame(tick); return; }
          const p = Math.min(elapsed / 900, 1);
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, delay, started]);
  return <span ref={ref}>{count}</span>;
}

export function HeroPatternF({ serviceCount }: { serviceCount: number }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(5);
      return;
    }
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setPhase(4), 1800),
      setTimeout(() => setPhase(5), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden border-b" style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
      }}>
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 text-center md:py-24">
          {/* Big impact number */}
          <div style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.8)",
            transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}>
            <p className="text-5xl font-extrabold text-blue-600 md:text-7xl">
              <BigCounter end={serviceCount} suffix="社" delay={300} />
            </p>
            <p className="mt-1 text-sm font-medium text-slate-400">厳選サービスを徹底比較</p>
          </div>

          {/* Divider */}
          <div className="mx-auto my-6 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[60px]" style={{
              background: "linear-gradient(90deg, transparent, #cbd5e1)",
              opacity: phase >= 2 ? 1 : 0,
              transition: "opacity 0.5s ease",
            }} />
            <div style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "scale(1) rotate(0)" : "scale(0) rotate(-45deg)",
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-100">
                <Scale className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="h-px flex-1 max-w-[60px]" style={{
              background: "linear-gradient(90deg, #cbd5e1, transparent)",
              opacity: phase >= 2 ? 1 : 0,
              transition: "opacity 0.5s ease",
            }} />
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            退職代行おすすめランキング
          </h1>

          <p
            className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-slate-500"
            style={{
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            弁護士法人・労働組合運営の信頼できる退職代行サービスを徹底比較
          </p>

          {/* Social proof badges */}
          <div
            className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{
              opacity: phase >= 5 ? 1 : 0,
              transform: phase >= 5 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {[
              { icon: Shield, text: "弁護士法人を厳選", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              { icon: TrendingUp, text: "料金・実績で比較", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              { icon: CheckCircle2, text: "すべて無料", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            ].map((badge, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 rounded-full border ${badge.border} ${badge.bg} px-3.5 py-1.5 text-xs font-medium ${badge.color}`}
              >
                <badge.icon className="h-3.5 w-3.5" />
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-white py-8">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 px-4 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900"><SmallCounter end={serviceCount} delay={200} /></p>
            <p className="text-xs text-slate-500">掲載サービス数</p>
          </div>
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900"><SmallCounter end={3} delay={400} /></p>
            <p className="text-xs text-slate-500">運営種別で比較</p>
          </div>
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <BadgeCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-600">無料</p>
            <p className="text-xs text-slate-500">相談・比較</p>
          </div>
        </div>
      </section>
    </>
  );
}
