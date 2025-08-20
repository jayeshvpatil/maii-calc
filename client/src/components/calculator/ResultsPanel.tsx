import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalculationResults } from "@/lib/calculations";
import { BarChart3, ArrowUp, Clock, Shield, DollarSign, TrendingUp, Calendar } from "lucide-react";

interface ResultsPanelProps {
  results: CalculationResults | null;
  isCalculating: boolean;
  progress: number;
}

export function ResultsPanel({ results, isCalculating, progress }: ResultsPanelProps) {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value}%`;
  const formatHours = (value: number) => `${value} hrs/day`;
  const formatMonths = (value: number) => `${value} months`;

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200 sticky top-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-calculator-gray-900 mb-6 flex items-center">
          <BarChart3 className="text-primary mr-3 h-5 w-5" />
          Calculated Results
        </h3>
        
        <div className="space-y-4">
          {/* Efficiency Improvement */}
          <div className="bg-success-50 rounded-lg p-4 border border-success-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success-800">Efficiency Improvement</p>
                <p className="text-2xl font-bold text-success-900" data-testid="text-efficiencyImprovement">
                  {results ? formatPercentage(results.efficiencyImprovement) : '---'}
                </p>
              </div>
              <div className="bg-success-200 rounded-full p-3">
                <ArrowUp className="text-success-700 h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Time Savings */}
          <div className="bg-info-50 rounded-lg p-4 border border-info-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-info-800">Time Savings</p>
                <p className="text-2xl font-bold text-info-900" data-testid="text-timeSavings">
                  {results ? formatHours(results.timeSavings) : '--- hrs/day'}
                </p>
              </div>
              <div className="bg-info-200 rounded-full p-3">
                <Clock className="text-info-700 h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Error Reduction */}
          <div className="bg-warning-50 rounded-lg p-4 border border-warning-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warning-800">Error Reduction</p>
                <p className="text-2xl font-bold text-warning-900" data-testid="text-errorReduction">
                  {results ? formatPercentage(results.errorReduction) : '---'}
                </p>
              </div>
              <div className="bg-warning-200 rounded-full p-3">
                <Shield className="text-warning-700 h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Cost Savings */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Monthly Cost Savings</p>
                <p className="text-2xl font-bold text-purple-900" data-testid="text-costSavings">
                  {results ? formatCurrency(results.costSavings) : '$---'}
                </p>
              </div>
              <div className="bg-purple-200 rounded-full p-3">
                <DollarSign className="text-purple-700 h-5 w-5" />
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-800">ROI (12 months)</p>
                <p className="text-2xl font-bold text-indigo-900" data-testid="text-roi">
                  {results ? formatPercentage(results.roi) : '---'}
                </p>
              </div>
              <div className="bg-indigo-200 rounded-full p-3">
                <TrendingUp className="text-indigo-700 h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Payback Period */}
          <div className="bg-calculator-gray-50 rounded-lg p-4 border border-calculator-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-calculator-gray-600">Payback Period</p>
                <p className="text-2xl font-bold text-calculator-gray-900" data-testid="text-paybackPeriod">
                  {results ? formatMonths(results.paybackPeriod) : '--- months'}
                </p>
              </div>
              <div className="bg-calculator-gray-200 rounded-full p-3">
                <Calendar className="text-calculator-gray-700 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 pt-4 border-t border-calculator-gray-200">
          <div className="flex items-center justify-between text-sm text-calculator-gray-600 mb-2">
            <span>Calculation Progress</span>
            <span data-testid="text-progress">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full h-2" data-testid="progress-calculation" />
        </div>
      </CardContent>
    </Card>
  );
}
