import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamCalculatorResults } from "@shared/schema";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

interface TeamResultsProps {
  results: TeamCalculatorResults | null;
}

export function TeamResults({ results }: TeamResultsProps) {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  if (!results) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-calculator-gray-900 flex items-center">
            <BarChart3 className="text-primary mr-3 h-5 w-5" />
            Team Results Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-calculator-gray-600">Enter your team information to see calculated results</p>
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
              <p className="text-xs text-calculator-gray-600 mb-1">Combined Work Hours</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-combinedWorkHours">
                {results.combinedWorkHours.toLocaleString()}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Blended Cost Per Hour</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-blendedCostPerHour">
                {formatCurrency(results.blendedCostPerHour)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Blended Value of Work / Hour</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-blendedValueOfWorkPerHour">
                {formatCurrency(results.blendedValueOfWorkPerHour)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Avg. Annual Value of Work</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-avgAnnualValueOfWork">
                {formatCurrency(results.avgAnnualValueOfWork)}
              </p>
            </div>
            <div className="bg-success-50 rounded-lg p-4 border border-success-200">
              <p className="text-xs text-success-700 mb-1">Avg. Value of Productivity Lift</p>
              <p className="text-lg font-semibold text-success-900" data-testid="result-avgValueOfProductivityLift">
                {formatCurrency(results.avgValueOfProductivityLift)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Avg. New Annual Value of Work</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-avgNewAnnualValueOfWork">
                {formatCurrency(results.avgNewAnnualValueOfWork)}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-success-50 to-success-100 rounded-lg p-6 border border-success-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success-700 mb-1">TOTAL VALUE OF PRODUCTIVITY LIFT</p>
                <p className="text-2xl font-bold text-success-900" data-testid="result-totalValueOfProductivityLift">
                  {formatCurrency(results.totalValueOfProductivityLift)}
                </p>
              </div>
              <div className="bg-success-200 rounded-full p-3">
                <Users className="text-success-700 h-6 w-6" />
              </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Combined AI Training Hours</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-combinedAiTrainingHours">
                {results.combinedAiTrainingHours.toLocaleString()}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Combined AI Training Human Costs</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-combinedAiTrainingHumanCosts">
                {formatCurrency(results.combinedAiTrainingHumanCosts)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Combined AI Training License / Fees</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-combinedAiTrainingLicenseFees">
                {formatCurrency(results.combinedAiTrainingLicenseFees)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Total AI Training Costs</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-totalAiTrainingCosts">
                {formatCurrency(results.totalAiTrainingCosts)}
              </p>
            </div>
            <div className="bg-calculator-gray-50 rounded-lg p-4">
              <p className="text-xs text-calculator-gray-600 mb-1">Total AI Tech Costs</p>
              <p className="text-lg font-semibold text-calculator-gray-900" data-testid="result-totalAiTechCosts">
                {formatCurrency(results.totalAiTechCosts)}
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