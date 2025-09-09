import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, Info } from "lucide-react";

interface TeamValueAnalysisProps {
  values: {
    numberOfLearners: string;
    combinedComp: string;
    averageWorkHours: string;
    valueOfWorkMultiple: string;
    estProductivityLift: string;
  };
  onChange: (field: string, value: string) => void;
  calculationType: "efficiency" | "productivity";
}

export function TeamValueAnalysis({ values, onChange, calculationType }: TeamValueAnalysisProps) {
  const liftLabel = calculationType === "productivity" ? "Est. Productivity Lift (%)" : "Est. Time Savings (%)";
  const liftTooltip = calculationType === "productivity" 
    ? "Explore different assumptions. Conservative: 10%" 
    : "Explore different assumptions. Conservative: 10%";
  
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-calculator-gray-900 flex items-center">
          <Users className="text-primary mr-3 h-5 w-5" />
          Part 1: Value Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="numberOfLearners" className="block text-sm font-medium text-calculator-gray-700">
                Number of Learners
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-numberOfLearners">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the total number of learners</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number"
              id="numberOfLearners"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 25"
              value={values.numberOfLearners}
              onChange={(e) => onChange('numberOfLearners', e.target.value)}
              data-testid="input-numberOfLearners"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="combinedComp" className="block text-sm font-medium text-calculator-gray-700">
                Combined Compensation ($)
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-combinedComp">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter total annual comp (salary + payroll taxes + benefits) for all learners</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number"
              id="combinedComp"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 2500000"
              value={values.combinedComp}
              onChange={(e) => onChange('combinedComp', e.target.value)}
              data-testid="input-combinedComp"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="averageWorkHours" className="block text-sm font-medium text-calculator-gray-700">
                Average Work Hours (per year)
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-averageWorkHours">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Standard work year based on 40 hr/week (2080). Adjust as needed.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number"
              id="averageWorkHours"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 2080"
              value={values.averageWorkHours}
              onChange={(e) => onChange('averageWorkHours', e.target.value)}
              data-testid="input-averageWorkHours"
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
                  <p>Varies by profession and role. Conservative: 1.5-2.0x</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number"
              step="0.1"
              id="valueOfWorkMultiple"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 2.0"
              value={values.valueOfWorkMultiple}
              onChange={(e) => onChange('valueOfWorkMultiple', e.target.value)}
              data-testid="input-valueOfWorkMultiple"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
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
              type="number"
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