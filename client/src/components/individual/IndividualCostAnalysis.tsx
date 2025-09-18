import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DollarSign, Info } from "lucide-react";

interface IndividualCostAnalysisProps {
  values: {
    aiTrainingHours: string;
    aiTrainingLicenseFees: string;
    aiTechCosts: string;
  };
  onChange: (field: string, value: string) => void;
}

export function IndividualCostAnalysis({ values, onChange }: IndividualCostAnalysisProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-calculator-gray-900 flex items-center">
          <DollarSign className="text-primary mr-3 h-5 w-5" />
          Part 2: Cost Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="aiTrainingHours" className="block text-sm font-medium text-calculator-gray-700">
                AI Training Hours
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-trainingHours">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Est. number of AI training hours for the year</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              id="aiTrainingHours"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 25"
              value={values.aiTrainingHours}
              onChange={(e) => onChange('aiTrainingHours', e.target.value)}
              data-testid="input-aiTrainingHours"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="aiTrainingLicenseFees" className="block text-sm font-medium text-calculator-gray-700">
                AI Training Fees ($)
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-licenseFees">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cost of AI training license and related fees (speakers, workshops, etc.)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              step="0.01"
              id="aiTrainingLicenseFees"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 300"
              value={values.aiTrainingLicenseFees}
              onChange={(e) => onChange('aiTrainingLicenseFees', e.target.value)}
              data-testid="input-aiTrainingLicenseFees"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="aiTechCosts" className="block text-sm font-medium text-calculator-gray-700">
                AI Tech Costs ($)
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-techCosts">
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Related tech costs such as ChatGPT or Gemini annual license fees</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              step="0.01"
              id="aiTechCosts"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 300"
              value={values.aiTechCosts}
              onChange={(e) => onChange('aiTechCosts', e.target.value)}
              data-testid="input-aiTechCosts"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}