"use client";

import { Check } from "lucide-react";
import type { CheckoutStep } from "@/types/domain";

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

const steps = [
  { step: 1, label: "Pengiriman" },
  { step: 2, label: "Jadwal" },
  { step: 3, label: "Tinjauan" },
  { step: 4, label: "Pembayaran" },
] as const;

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map(({ step, label }, index) => (
        <div key={step} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${currentStep > step
                  ? "bg-teal-600 text-white"
                  : currentStep === step
                    ? "bg-teal-600 text-white ring-4 ring-teal-100"
                    : "bg-slate-100 text-slate-400"
                }`}
            >
              {currentStep > step ? <Check className="h-4 w-4" /> : step}
            </div>
            <span
              className={`text-sm font-medium hidden sm:inline ${currentStep >= step ? "text-teal-700" : "text-slate-400"
                }`}
            >
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-8 sm:w-16 ${currentStep > step ? "bg-teal-600" : "bg-slate-200"
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
