import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndividualCalculatorResults } from "@shared/schema";
import { BarChart3, TrendingUp, DollarSign } from "lucide-react";

interface IndividualResultsProps {
  results: IndividualCalculatorResults | null;
}

export function IndividualResults({ results }: IndividualResultsProps) {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  if (!results) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-calculator-gray-900 flex items-center">
            <BarChart3 className="text-primary mr-3 h-5 w-5" />
            Results Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-calculator-gray-600">Enter your information to see calculated results</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Part 1 Results */}
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-calculator-gray-900 flex items-center">
            <TrendingUp className="text-success-600 mr-3 h-4 w-4" />
            Part 1: Value Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Cost Per Hour</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-costPerHour">
                {formatCurrency(results.costPerHour)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Value of Work / Hour</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-valueOfWorkPerHour">
                {formatCurrency(results.valueOfWorkPerHour)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Annual Value of Work</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-annualValueOfWork">
                {formatCurrency(results.annualValueOfWork)}
              </p>
            </div>
            <div className="bg-success-50 rounded-lg p-4 border border-success-200">
              <p className="text-xs text-success-700 mb-1">Value of Productivity Lift</p>
              <p className="text-lg font-semibold text-success-900" data-testid="result-valueOfProductivityLift">
                {formatCurrency(results.valueOfProductivityLift)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">New Annual Value of Work</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-newAnnualValueOfWork">
                {formatCurrency(results.newAnnualValueOfWork)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part 2 Results */}
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-calculator-gray-900 flex items-center">
            <DollarSign className="text-warning-600 mr-3 h-4 w-4" />
            Part 2: Cost Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">AI Training Human Costs</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-aiTrainingHumanCosts">
                {formatCurrency(results.aiTrainingHumanCosts)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Total AI Training Costs</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-totalAiTrainingCosts">
                {formatCurrency(results.totalAiTrainingCosts)}
              </p>
            </div>
            <div className="bg-warning-50 rounded-lg p-4 border border-warning-200">
              <p className="text-xs text-warning-700 mb-1">TOTAL AI COSTS</p>
              <p className="text-lg font-semibold text-warning-900" data-testid="result-totalAiCosts">
                {formatCurrency(results.totalAiCosts)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part 3 Results */}
      <Card className="bg-gradient-to-r from-primary/5 to-indigo-50 rounded-xl shadow-sm border border-primary/20">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-calculator-gray-900 flex items-center">
            <BarChart3 className="text-primary mr-3 h-4 w-4" />
            Part 3: Net Value Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-sm text-calculator-gray-600 mb-2">FIRST-YEAR NET VALUE</p>
              <p className="text-3xl font-bold text-primary" data-testid="result-firstYearNetValue">
                {formatCurrency(results.firstYearNetValue)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-calculator-gray-600 mb-2">ROI</p>
              <div>
                <p className="text-2xl font-bold text-success-600" data-testid="result-roi">
                  {results.roi.toFixed(2)}
                </p>
                <p className="text-3xl font-bold text-success-700" data-testid="result-roiPercentage">
                  {formatPercentage(results.roi)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}