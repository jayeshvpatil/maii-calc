import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamCalculatorResults } from "@shared/schema";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

interface TeamResultsProps {
  results: TeamCalculatorResults | null;
  section?: 'value' | 'cost' | 'net' | 'all';
}

export function TeamResults({ results, section = 'all' }: TeamResultsProps) {
  const formatCurrency = (value: number | undefined) => value ? `$${value.toLocaleString()}` : '$0';
  const formatPercentage = (value: number | undefined) => value ? `${value.toFixed(2)}%` : '0%';

  if (!results) {
    let title = "Team Results Summary";
    if (section === 'value') title = "Value Analysis Results";
    else if (section === 'cost') title = "Cost Analysis Results";
    else if (section === 'net') title = "Net Value Results";
    
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200 h-full">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-calculator-gray-900 flex items-center">
            <BarChart3 className="text-primary mr-3 h-4 w-4" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-calculator-gray-600 text-sm">Enter your team information to see calculated results</p>
        </CardContent>
      </Card>
    );
  }

  // Value Analysis Section
  if (section === 'value') {
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200 h-full">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-calculator-gray-900 flex items-center">
            <TrendingUp className="text-success-600 mr-3 h-4 w-4" />
            Part 1: Value Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-center space-y-1">
            <div className="text-calculator-gray-600 text-xs">Blended Cost Per Hour</div>
            <div className="font-semibold text-sm">{formatCurrency(results.blendedCostPerHour)}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-calculator-gray-600 text-xs">Blended Value Per Hour</div>
            <div className="font-semibold text-sm">{formatCurrency(results.blendedValueOfWorkPerHour)}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-calculator-gray-600 text-xs">Average Annual Value</div>
            <div className="font-semibold text-sm">{formatCurrency(results.avgAnnualValueOfWork)}</div>
          </div>
          <div className="text-center space-y-1 p-2 bg-success-50 rounded">
            <div className="text-success-700 text-xs">Total Productivity Lift Value</div>
            <div className="font-semibold text-sm text-success-600">{formatCurrency(results.totalValueOfProductivityLift)}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-calculator-gray-600 text-xs">Average New Annual Value</div>
            <div className="font-semibold text-sm text-primary">{formatCurrency(results.avgNewAnnualValueOfWork)}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Cost Analysis Section
  if (section === 'cost') {
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200 h-full">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-calculator-gray-900 flex items-center">
            <DollarSign className="text-warning-600 mr-3 h-4 w-4" />
            Part 2: Cost Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-center space-y-1">
            <div className="text-calculator-gray-600 text-xs">Combined Training Hours</div>
            <div className="font-semibold text-sm">{results.combinedAiTrainingHours?.toLocaleString() || 0} hrs</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-calculator-gray-600 text-xs">Combined Training Human Costs</div>
            <div className="font-semibold text-sm">{formatCurrency(results.combinedAiTrainingHumanCosts)}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-calculator-gray-600 text-xs">Total AI Costs</div>
            <div className="font-semibold text-sm">{formatCurrency(results.totalAiCosts)}</div>
          </div>
          <div className="mt-3 p-3 bg-warning-50 rounded-lg text-center">
            <div className="text-warning-800 font-semibold text-sm">
              TOTAL TEAM AI COSTS: {formatCurrency(results.totalAiCosts)}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Net Value Section
  if (section === 'net') {
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-calculator-gray-900 flex items-center">
            <BarChart3 className="text-primary mr-3 h-4 w-4" />
            Part 3: Net Value Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-calculator-gray-600 text-sm">FIRST-YEAR NET VALUE</div>
              <div className="font-bold text-3xl text-primary">{formatCurrency(results.firstYearNetValue)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-calculator-gray-200">
              <div className="text-center">
                <div className="text-calculator-gray-600 text-sm">ROI</div>
                <div className="font-semibold text-xl text-success-600">{results.roi.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-calculator-gray-600 text-sm">ROI %</div>
                <div className="font-semibold text-xl text-success-600">{formatPercentage(results.roi * 100)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // All sections (fallback - shouldn't be used in new layout)
  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
        <CardHeader>
          <CardTitle className="text-md font-semibold text-calculator-gray-900">All Team Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-calculator-gray-600">Complete team results view</p>
        </CardContent>
      </Card>
    </div>
  );
}