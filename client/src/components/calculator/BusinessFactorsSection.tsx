import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Briefcase, Info } from "lucide-react";

interface BusinessFactorsSectionProps {
  values: {
    hourlyLabor: string;
    dailyVolume: string;
    errorCost: string;
    implementationCost: string;
  };
  onChange: (field: string, value: string) => void;
}

export function BusinessFactorsSection({ values, onChange }: BusinessFactorsSectionProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
            <Briefcase className="text-primary mr-3 h-5 w-5" />
            Business Impact Factors
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-business">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Enter business context for ROI calculations</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="hourlyLabor" className="block text-sm font-medium text-calculator-gray-700">
              Hourly Labor Cost ($)
            </Label>
            <Input
              type="number"
              id="hourlyLabor"
              step="0.01"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 45.00"
              value={values.hourlyLabor}
              onChange={(e) => onChange('hourlyLabor', e.target.value)}
              data-testid="input-hourlyLabor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dailyVolume" className="block text-sm font-medium text-calculator-gray-700">
              Daily Processing Volume
            </Label>
            <Input
              type="number"
              id="dailyVolume"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 1000"
              value={values.dailyVolume}
              onChange={(e) => onChange('dailyVolume', e.target.value)}
              data-testid="input-dailyVolume"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="errorCost" className="block text-sm font-medium text-calculator-gray-700">
              Cost Per Error ($)
            </Label>
            <Input
              type="number"
              id="errorCost"
              step="0.01"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 25.00"
              value={values.errorCost}
              onChange={(e) => onChange('errorCost', e.target.value)}
              data-testid="input-errorCost"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="implementationCost" className="block text-sm font-medium text-calculator-gray-700">
              Implementation Cost ($)
            </Label>
            <Input
              type="number"
              id="implementationCost"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 50000"
              value={values.implementationCost}
              onChange={(e) => onChange('implementationCost', e.target.value)}
              data-testid="input-implementationCost"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
