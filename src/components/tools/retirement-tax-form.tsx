"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateRetirementTax } from "@/lib/calculators/retirement-tax";
import { sendEvent } from "@/lib/gtag";
import type { RetirementTaxInput, RetirementTaxResult } from "@/lib/types";
import { RetirementTaxResultCard } from "./retirement-tax-result";
import { ToolResultCta } from "./tool-result-cta";
import { OtherTools } from "./other-tools";

export function RetirementTaxForm() {
  const [retirementPay, setRetirementPay] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [isDisability, setIsDisability] = useState(false);
  const [isExecutive, setIsExecutive] = useState(false);
  const [result, setResult] = useState<RetirementTaxResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  const tenure = Number(tenureYears);
  const showExecutive = tenure > 0 && tenure <= 5;

  function handleCalculate() {
    const newErrors: Record<string, string> = {};
    const pay = Number(retirementPay.replace(/,/g, ""));

    if (!retirementPay || isNaN(pay) || pay <= 0) {
      newErrors.retirementPay = "正の整数を入力してください";
    }
    if (!tenureYears) {
      newErrors.tenureYears = "勤続年数を選択してください";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const input: RetirementTaxInput = {
      retirementPay: pay,
      tenureYears: tenure,
      isDisability,
      isExecutive: showExecutive ? isExecutive : false,
    };

    const calcResult = calculateRetirementTax(input);
    setResult(calcResult);
    sendEvent("tool_calculate", { tool_name: "retirement-tax" });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function formatPayOnBlur() {
    const num = Number(retirementPay.replace(/,/g, ""));
    if (!isNaN(num) && num > 0) {
      setRetirementPay(num.toLocaleString("ja-JP"));
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <Label htmlFor="retirementPay">退職金額（税引前）</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ¥
              </span>
              <Input
                id="retirementPay"
                inputMode="numeric"
                placeholder="5,000,000"
                className="pl-7"
                value={retirementPay}
                onChange={(e) => setRetirementPay(e.target.value)}
                onBlur={formatPayOnBlur}
              />
            </div>
            {errors.retirementPay && (
              <p className="text-xs text-destructive">{errors.retirementPay}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenureYears">勤続年数</Label>
            <Select value={tenureYears} onValueChange={(v) => setTenureYears(v ?? "")}>
              <SelectTrigger id="tenureYears">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 50 }, (_, i) => i + 1).map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}年
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tenureYears && (
              <p className="text-xs text-destructive">{errors.tenureYears}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDisability"
              checked={isDisability}
              onChange={(e) => setIsDisability(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isDisability" className="text-sm font-normal">
              障害者になったことが退職の直接原因
            </Label>
          </div>

          {showExecutive && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isExecutive"
                checked={isExecutive}
                onChange={(e) => setIsExecutive(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isExecutive" className="text-sm font-normal">
                役員等に該当する
              </Label>
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full cursor-pointer shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110">
            計算する
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div ref={resultRef} className="space-y-6">
          <RetirementTaxResultCard
            result={result}
            retirementPay={Number(retirementPay.replace(/,/g, ""))}
          />
          <ToolResultCta />
        </div>
      )}

      <OtherTools currentPath="/tools/retirement-tax" />
    </div>
  );
}
