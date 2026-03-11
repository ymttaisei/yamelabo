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
import { calculatePaidLeave } from "@/lib/calculators/paid-leave";
import { sendEvent } from "@/lib/gtag";
import type { EmploymentType, PaidLeaveInput, PaidLeaveResult } from "@/lib/types";
import { PaidLeaveResultCard } from "./paid-leave-result";
import { ToolResultCta } from "./tool-result-cta";
import { OtherTools } from "./other-tools";

function todayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function PaidLeaveForm() {
  const [startDate, setStartDate] = useState("");
  const [baseDate, setBaseDate] = useState(todayString());
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>("fulltime");
  const [weeklyWorkDays, setWeeklyWorkDays] = useState("");
  const [result, setResult] = useState<PaidLeaveResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  function handleCalculate() {
    const newErrors: Record<string, string> = {};

    if (!startDate) {
      newErrors.startDate = "入社日を入力してください";
    }
    if (!baseDate) {
      newErrors.baseDate = "計算基準日を入力してください";
    }
    if (startDate && baseDate && new Date(startDate) >= new Date(baseDate)) {
      newErrors.startDate = "入社日は基準日より前の日付を入力してください";
    }
    if (startDate && new Date(startDate) > new Date()) {
      newErrors.startDate = "未来の日付は入力できません";
    }
    if (
      employmentType === "parttime" &&
      !weeklyWorkDays
    ) {
      newErrors.weeklyWorkDays = "週所定労働日数を選択してください";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const input: PaidLeaveInput = {
      startDate: new Date(startDate),
      baseDate: new Date(baseDate),
      employmentType,
      weeklyWorkDays:
        employmentType === "parttime" ? Number(weeklyWorkDays) : undefined,
    };

    const calcResult = calculatePaidLeave(input);
    setResult(calcResult);
    sendEvent("tool_calculate", { tool_name: "paid-leave" });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <Label htmlFor="startDate">入社日</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && (
              <p className="text-xs text-destructive">{errors.startDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseDate">計算基準日</Label>
            <div className="flex gap-2">
              <Input
                id="baseDate"
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setBaseDate(todayString())}
                className="cursor-pointer"
              >
                今日
              </Button>
            </div>
            {errors.baseDate && (
              <p className="text-xs text-destructive">{errors.baseDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>雇用形態</Label>
            <RadioGroup
              value={employmentType}
              onValueChange={(v) => setEmploymentType(v as EmploymentType)}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="fulltime" id="fulltime" />
                <Label htmlFor="fulltime" className="font-normal">
                  フルタイム
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="parttime" id="parttime" />
                <Label htmlFor="parttime" className="font-normal">
                  パートタイム
                </Label>
              </div>
            </RadioGroup>
          </div>

          {employmentType === "parttime" && (
            <div className="space-y-2">
              <Label htmlFor="weeklyWorkDays">週所定労働日数</Label>
              <Select
                value={weeklyWorkDays}
                onValueChange={(v) => setWeeklyWorkDays(v ?? "")}
              >
                <SelectTrigger id="weeklyWorkDays">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      週{d}日
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.weeklyWorkDays && (
                <p className="text-xs text-destructive">
                  {errors.weeklyWorkDays}
                </p>
              )}
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full cursor-pointer shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110">
            計算する
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div ref={resultRef} className="space-y-6">
          <PaidLeaveResultCard result={result} />
          <ToolResultCta />
        </div>
      )}

      <OtherTools currentPath="/tools/paid-leave" />
    </div>
  );
}
