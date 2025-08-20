import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, Info } from "lucide-react";

interface AIParametersSectionProps {
  values: {
    trainingDataSize: string;
    trainingDuration: string;
    modelComplexity: string;
    expectedAccuracy: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AIParametersSection({ values, onChange }: AIParametersSectionProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
            <Brain className="text-primary mr-3 h-5 w-5" />
            AI Training Parameters
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-calculator-gray-600 hover:text-calculator-gray-700 transition-colors" data-testid="tooltip-ai-params">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Configure your AI training expectations</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="trainingDataSize" className="block text-sm font-medium text-calculator-gray-700">
              Training Data Size (GB)
            </Label>
            <Input
              type="number"
              id="trainingDataSize"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 500"
              value={values.trainingDataSize}
              onChange={(e) => onChange('trainingDataSize', e.target.value)}
              data-testid="input-trainingDataSize"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trainingDuration" className="block text-sm font-medium text-calculator-gray-700">
              Training Duration (weeks)
            </Label>
            <Input
              type="number"
              id="trainingDuration"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 8"
              value={values.trainingDuration}
              onChange={(e) => onChange('trainingDuration', e.target.value)}
              data-testid="input-trainingDuration"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modelComplexity" className="block text-sm font-medium text-calculator-gray-700">
              Model Complexity
            </Label>
            <Select value={values.modelComplexity} onValueChange={(value) => onChange('modelComplexity', value)}>
              <SelectTrigger 
                className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                data-testid="select-modelComplexity"
              >
                <SelectValue placeholder="Select complexity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (Simple patterns)</SelectItem>
                <SelectItem value="intermediate">Intermediate (Moderate complexity)</SelectItem>
                <SelectItem value="advanced">Advanced (High complexity)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expectedAccuracy" className="block text-sm font-medium text-calculator-gray-700">
              Expected Model Accuracy (%)
            </Label>
            <Input
              type="number"
              id="expectedAccuracy"
              step="0.1"
              className="w-full px-4 py-3 border border-calculator-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g., 94.5"
              value={values.expectedAccuracy}
              onChange={(e) => onChange('expectedAccuracy', e.target.value)}
              data-testid="input-expectedAccuracy"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
