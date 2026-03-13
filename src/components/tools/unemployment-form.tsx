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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateUnemploymentInsurance } from "@/lib/calculators/unemployment-insurance";
import { sendEvent } from "@/lib/gtag";
import type {
  ResignationType,
  UnemploymentInput,
  UnemploymentResult,
} from "@/lib/types";
import { UnemploymentResultCard } from "./unemployment-result";
import { ToolResultCta } from "./tool-result-cta";
import { OtherTools } from "./other-tools";

export function UnemploymentForm() {
  const [age, setAge] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [resignationType, setResignationType] =
    useState<ResignationType>("voluntary");
  const [isDisabled, setIsDisabled] = useState(false);
  const [result, setResult] = useState<UnemploymentResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  function handleCalculate() {
    const newErrors: Record<string, string> = {};
    const ageNum = Number(age);
    const salary = Number(monthlySalary.replace(/,/g, ""));
    const tenure = Number(tenureYears);

    if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 64) {
      if (ageNum >= 65) {
        newErrors.age = "65歳以上は高年齢求職者給付金の対象です";
      } else {
        newErrors.age = "18〜64の整数を入力してください";
      }
    }
    if (
      !monthlySalary ||
      isNaN(salary) ||
      salary < 88_000
    ) {
      if (salary > 0 && salary < 88_000) {
        newErrors.monthlySalary = "雇用保険の加入条件を満たしません";
      } else {
        newErrors.monthlySalary = "月額給与を入力してください";
      }
    }
    if (!tenureYears) {
      newErrors.tenureYears = "勤続年数を選択してください";
    }
    if (
      resignationType === "voluntary" &&
      tenure > 0 &&
      tenure < 1
    ) {
      newErrors.tenureYears = "自己都合退職では1年以上の被保険者期間が必要です";
    }
    if (ageNum && tenure && tenure > ageNum - 15) {
      newErrors.tenureYears = "年齢に対して勤続年数が長すぎます";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const input: UnemploymentInput = {
      age: ageNum,
      monthlySalary: salary,
      tenureYears: tenure,
      resignationType,
      isDisabled,
    };

    const calcResult = calculateUnemploymentInsurance(input);
    setResult(calcResult);
    sendEvent("tool_calculate", { tool_name: "unemployment-insurance" });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function formatSalaryOnBlur() {
    const num = Number(monthlySalary.replace(/,/g, ""));
    if (!isNaN(num) && num > 0) {
      setMonthlySalary(num.toLocaleString("ja-JP"));
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <Label htmlFor="age">年齢</Label>
            <Input
              id="age"
              inputMode="numeric"
              placeholder="35"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && (
              <p className="text-xs text-destructive">{errors.age}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlySalary">離職時の月額給与（税込）</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ¥
              </span>
              <Input
                id="monthlySalary"
                inputMode="numeric"
                placeholder="300,000"
                className="pl-7"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                onBlur={formatSalaryOnBlur}
              />
            </div>
            {errors.monthlySalary && (
              <p className="text-xs text-destructive">
                {errors.monthlySalary}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenureYears">勤続年数（被保険者期間）</Label>
            <Select value={tenureYears} onValueChange={(v) => setTenureYears(v ?? "")}>
              <SelectTrigger id="tenureYears">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 45 }, (_, i) => i + 1).map((y) => (
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

          <div className="space-y-2">
            <Label>離職理由</Label>
            <RadioGroup
              value={resignationType}
              onValueChange={(v) => setResignationType(v as ResignationType)}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="voluntary" id="voluntary" />
                <Label htmlFor="voluntary" className="font-normal">
                  自己都合
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company" className="font-normal">
                  会社都合
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="specified-reason" id="specified" />
                <Label htmlFor="specified" className="font-normal">
                  特定理由離職者
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDisabled"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isDisabled" className="text-sm font-normal">
              障害者等の就職困難者
            </Label>
          </div>

          <Button onClick={handleCalculate} className="w-full cursor-pointer rounded-[3px] bg-[#ffa215] font-bold text-white shadow-[3px_3px_0_0_#d8d7d7] transition-all hover:brightness-110">
            計算する
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div ref={resultRef} className="space-y-6">
          <UnemploymentResultCard result={result} />
          <ToolResultCta />
        </div>
      )}

      <OtherTools currentPath="/tools/unemployment-insurance" />
    </div>
  );
}
