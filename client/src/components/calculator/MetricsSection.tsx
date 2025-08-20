import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Activity, Info } from "lucide-react";

interface MetricsSectionProps {
  values: {
    currentProductivity: string;
    errorRate: string;
    processingTime: string;
    resourceUtilization: string;
  };
  onChange: (field: string, value: string) => void;
}

export function MetricsSection({ values, onChange }: MetricsSectionProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
            <Activity className="text-primary mr-3 h-5 w-5" />
            Current Performance Metrics
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-baseline">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Enter your current baseline metrics</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currentProductivity" className="block text-sm font-medium text-calculator-gray-700">
              Current Productivity (units/hour)
            </Label>
            <Input
              type="number"
              id="currentProductivity"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 100"
              value={values.currentProductivity}
              onChange={(e) => onChange('currentProductivity', e.target.value)}
              data-testid="input-currentProductivity"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="errorRate" className="block text-sm font-medium text-calculator-gray-700">
              Current Error Rate (%)
            </Label>
            <Input
              type="number"
              id="errorRate"
              step="0.1"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 5.2"
              value={values.errorRate}
              onChange={(e) => onChange('errorRate', e.target.value)}
              data-testid="input-errorRate"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="processingTime" className="block text-sm font-medium text-calculator-gray-700">
              Average Processing Time (minutes)
            </Label>
            <Input
              type="number"
              id="processingTime"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 15"
              value={values.processingTime}
              onChange={(e) => onChange('processingTime', e.target.value)}
              data-testid="input-processingTime"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resourceUtilization" className="block text-sm font-medium text-calculator-gray-700">
              Resource Utilization (%)
            </Label>
            <Input
              type="number"
              id="resourceUtilization"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 75"
              value={values.resourceUtilization}
              onChange={(e) => onChange('resourceUtilization', e.target.value)}
              data-testid="input-resourceUtilization"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
