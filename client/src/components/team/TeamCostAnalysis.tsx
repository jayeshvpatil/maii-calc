import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DollarSign, Info } from "lucide-react";

interface TeamCostAnalysisProps {
  values: {
    aiTrainingHoursPerLearner: string;
    aiTrainingLicenseFeesPerLearner: string;
    aiTechCostsPerLearner: string;
  };
  onChange: (field: string, value: string) => void;
}

export function TeamCostAnalysis({ values, onChange }: TeamCostAnalysisProps) {
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
              <Label
                htmlFor="aiTrainingHoursPerLearner"
                className="block text-sm font-medium text-calculator-gray-700"
              >
                AI Training Hours Per Learner
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors"
                    data-testid="tooltip-trainingHours"
                  >
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Est. number of AI training hours for the year per learner
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              id="aiTrainingHoursPerLearner"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 15"
              value={values.aiTrainingHoursPerLearner}
              onChange={(e) =>
                onChange("aiTrainingHoursPerLearner", e.target.value)
              }
              data-testid="input-aiTrainingHoursPerLearner"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label
                htmlFor="aiTrainingLicenseFeesPerLearner"
                className="block text-sm font-medium text-calculator-gray-700"
              >
                AI Training Fees Per Learner ($)
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors"
                    data-testid="tooltip-licenseFees"
                  >
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Cost of AI training license and related fees per learner
                    (speakers, workshops, etc.)
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              step="0.01"
              id="aiTrainingLicenseFeesPerLearner"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 300"
              value={values.aiTrainingLicenseFeesPerLearner}
              onChange={(e) =>
                onChange("aiTrainingLicenseFeesPerLearner", e.target.value)
              }
              data-testid="input-aiTrainingLicenseFeesPerLearner"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label
                htmlFor="aiTechCostsPerLearner"
                className="block text-sm font-medium text-calculator-gray-700"
              >
                AI Tech Costs Per Learner ($)
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors"
                    data-testid="tooltip-techCosts"
                  >
                    <Info className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Related tech costs such as ChatGPT or Gemini annual license
                    fees per learner
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number" min="0"
              step="0.01"
              id="aiTechCostsPerLearner"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 300"
              value={values.aiTechCostsPerLearner}
              onChange={(e) =>
                onChange("aiTechCostsPerLearner", e.target.value)
              }
              data-testid="input-aiTechCostsPerLearner"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
