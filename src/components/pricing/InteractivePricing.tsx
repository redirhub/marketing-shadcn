"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PlanData } from "@/lib/services/pricing";
import { URL_DASHBOARD_REGISTER } from "@/config/constant";

interface InteractivePricingProps {
  redirectData: PlanData;
  monitorData: PlanData;
  addons: any[];
}

interface Plan {
  id: string;
  label?: string;
  price?: number;
  annual_price?: number;
  annual_coefficient?: number;
  free?: boolean;
  badge?: string;
  features: Array<{ label: string; isHighlighted?: boolean; included?: boolean }>;
  limits?: Array<{ label?: string; primary?: boolean }>;
}

function PlanCard({
  plan,
  isAnnually,
  isRecommended,
  everythingIn,
}: {
  plan: Plan;
  isAnnually: boolean;
  isRecommended: boolean;
  everythingIn?: string;
}) {
  const isEnterprise = plan.id?.includes("enterprise") || plan.id?.includes("custom");
  const isCustom = isEnterprise;

  const monthlyPrice = plan.price ?? 0;
  const annualMonthlyPrice = plan.annual_price ? plan.annual_price / 12 : monthlyPrice * (plan.annual_coefficient ?? 1);
  const displayPrice = isCustom ? "Custom" : isAnnually ? annualMonthlyPrice.toFixed(0) : monthlyPrice.toFixed(0);
  const annualTotal = isAnnually && !isCustom ? (plan.annual_price ?? annualMonthlyPrice * 12).toFixed(0) : null;

  const mainFeature = plan.limits?.find((l) => l.primary)?.label || plan.features[0]?.label;
  const featureList = plan.features.filter((f) => f !== plan.features[0]);

  return (
    <div
      className={`flex flex-col rounded-3xl border-2 transition-all relative max-w-[370px] ${
        plan.free || !isRecommended
          ? "bg-white border-[#D5D7DA]"
          : "bg-[#FFF4ED] border-brand-blue shadow-xl"
      }`}
    >
      {isRecommended && (
        <Badge className="absolute top-3.5 right-2 bg-amber-50 text-amber-900 border border-amber-700 text-sm font-medium rounded-full">
          Recommended
        </Badge>
      )}

      <div className="p-6 flex flex-col gap-2 min-h-[245px]">
        <h3 className="text-lg font-semibold text-gray-700">{plan.label}</h3>

        <div className="flex flex-wrap items-baseline gap-2">
          {!isCustom && <span className="text-gray-500 text-3xl font-semibold">$</span>}
          <span className={`font-semibold text-gray-700 leading-tight ${isCustom ? "text-2xl" : "text-4xl"}`}>
            {displayPrice}
          </span>
          {!isCustom && (
            <span className="text-base font-medium text-gray-500 whitespace-nowrap">per month</span>
          )}
          {annualTotal && (
            <span className="text-sm text-gray-500 w-full">${annualTotal} billed annually</span>
          )}
        </div>

        <div className="flex flex-col flex-1 justify-between">
          {mainFeature && <p className="text-base font-medium text-gray-700">{mainFeature}</p>}
          <div className="mt-3">
            <a
              href={isEnterprise ? "/enterprise" : `${URL_DASHBOARD_REGISTER}?plan=${plan.id}&interval=${isAnnually ? "annually" : "monthly"}`}
              className={`w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isRecommended ? "bg-brand-blue hover:bg-brand-blue/90 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {isEnterprise ? "Contact Sales" : plan.free ? "Get Started Free" : "Get Started"}
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="p-6 flex flex-col gap-4 flex-1">
        <p className="text-base font-semibold text-gray-700 uppercase">Features</p>
        {everythingIn && (
          <p className="text-sm text-gray-600 -mt-2">Everything in {everythingIn} plus...</p>
        )}
        <ul className="flex flex-col gap-3">
          {featureList.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  feature.isHighlighted ? "bg-green-500" : "bg-green-100"
                }`}
              >
                <Check
                  className={`w-3 h-3 stroke-[3] ${
                    feature.isHighlighted ? "text-white" : "text-green-600"
                  }`}
                />
              </div>
              <span
                className={`text-sm text-gray-700 ${feature.isHighlighted ? "font-medium" : "font-normal"}`}
              >
                {feature.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function InteractivePricing({ redirectData, monitorData, addons }: InteractivePricingProps) {
  const [activeTab, setActiveTab] = useState<"redirects" | "monitor">("redirects");
  const [isAnnually, setIsAnnually] = useState(false);

  const currentData = activeTab === "redirects" ? redirectData : monitorData;
  const plans: Plan[] = (currentData?.plans || []) as Plan[];

  return (
    <div className="relative -mt-32 md:-mt-[350px] pb-20 px-5 z-[99]">
      {/* Card container */}
      <div className="max-w-[1180px] mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Tab header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
          {/* Tabs */}
          <div className="flex gap-2">
            {(["redirects", "monitor"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-brand-blue text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab === "redirects" ? "Links Management" : "Monitor"}
              </button>
            ))}
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAnnually(false)}
              className={`text-base font-${!isAnnually ? "semibold" : "normal"} ${
                !isAnnually ? "text-gray-800" : "text-gray-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnually(!isAnnually)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isAnnually ? "bg-brand-blue" : "bg-gray-200"
              }`}
              role="switch"
              aria-checked={isAnnually}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  isAnnually ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAnnually(true)}
                className={`text-base font-${isAnnually ? "semibold" : "normal"} ${
                  isAnnually ? "text-gray-800" : "text-gray-400"
                }`}
              >
                Annually
              </button>
              <Badge className="bg-green-50 text-green-900 border border-green-200 rounded-full text-xs font-medium">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>

        {/* Plans grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isAnnually={isAnnually}
                isRecommended={!!plan.badge}
                everythingIn={index > 0 ? plans[index - 1]?.label : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
