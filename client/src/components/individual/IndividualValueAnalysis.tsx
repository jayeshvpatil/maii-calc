import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { User, Info } from "lucide-react";

interface IndividualValueAnalysisProps {
  values: {
    comp: string;
    workHours: string;
    valueOfWorkMultiple: string;
    estProductivityLift: string;
  };
  onChange: (field: string, value: string) => void;
  calculationType: "efficiency" | "productivity";
}

export function IndividualValueAnalysis({ values, onChange, calculationType }: IndividualValueAnalysisProps) {
  const liftLabel = calculationType === "productivity" ? "Estimated Productivity Lift (%)" : "Estimated Efficiency Lift (%)";
  const liftTooltip = calculationType === "productivity" 
    ? "The expected percentage improvement in productivity from AI tools. Explore different assumptions. Conservative estimate: 10%." 
    : "The expected percentage improvement in efficiency from AI tools. Explore different assumptions. Conservative estimate: 10%.";
  
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-calculator-gray-900 flex items-center">
          <User className="text-primary mr-3 h-5 w-5" />
          Part 1: Value Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="comp" className="block text-sm font-medium text-calculator-gray-700">
                Annual Compensation ($)
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-comp">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The total annual compensation (salary + payroll taxes + benefits).</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number"
              id="comp"
              min="0"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 120000"
              value={values.comp}
              onChange={(e) => onChange('comp', e.target.value)}
              data-testid="input-comp"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="workHours" className="block text-sm font-medium text-calculator-gray-700">
                Annual Work Hours
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-workHours">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The number of hours worked per year. The standard work year based on 40 hr/week is 2,080 hours.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              id="workHours"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 2080"
              value={values.workHours}
              onChange={(e) => onChange('workHours', e.target.value)}
              data-testid="input-workHours"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="valueOfWorkMultiple" className="block text-sm font-medium text-calculator-gray-700">
                Value of Work Multiple
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-valueMultiple">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>How much more value does this person's work generate vs. their compensation? Varies by profession and role. A conservative multiple would be 1.5 - 2.0x.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              step="0.1"
              id="valueOfWorkMultiple"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 2.0"
              value={values.valueOfWorkMultiple}
              onChange={(e) => onChange('valueOfWorkMultiple', e.target.value)}
              data-testid="input-valueOfWorkMultiple"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="estProductivityLift" className="block text-sm font-medium text-calculator-gray-700">
                {liftLabel}
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-productivityLift">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{liftTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              step="1"
              max="100"
              id="estProductivityLift"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 20"
              value={values.estProductivityLift}
              onChange={(e) => onChange('estProductivityLift', e.target.value)}
              data-testid="input-estProductivityLift"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}