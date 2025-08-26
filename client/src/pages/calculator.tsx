import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { IndividualValueAnalysis } from "@/components/individual/IndividualValueAnalysis";
import { IndividualCostAnalysis } from "@/components/individual/IndividualCostAnalysis";
import { IndividualResults } from "@/components/individual/IndividualResults";
import { TeamValueAnalysis } from "@/components/team/TeamValueAnalysis";
import { TeamCostAnalysis } from "@/components/team/TeamCostAnalysis";
import { TeamResults } from "@/components/team/TeamResults";
import { InsightsPanel } from "@/components/calculator/InsightsPanel";
import {
  calculateIndividualValue,
  calculateIndividualEfficiency,
  calculateTeamValue,
  calculateTeamEfficiency,
  generateIndividualInsights,
  generateTeamInsights,
  Insight,
} from "@/lib/calculations";
import {
  IndividualCalculatorInputs,
  IndividualCalculatorResults,
  TeamCalculatorInputs,
  TeamCalculatorResults,
} from "@shared/schema";
import {
  Calculator,
  User,
  Users,
  TrendingUp,
  DollarSign,
  Target,
} from "lucide-react";
import logoUrl from "@assets/smarterx_logo.png";

export default function CalculatorPage() {
  const { toast } = useToast();

  // Utility function for formatting currency
  const formatCurrency = (value: number | undefined | null): string => {
    if (value === undefined || value === null || isNaN(value)) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  const [activeTab, setActiveTab] = useState("individual");
  const [calculationType, setCalculationType] = useState<"efficiency" | "productivity">("productivity");

  // Individual Calculator State
  const [individualFormData, setIndividualFormData] = useState({
    comp: "",
    workHours: "2080",
    valueOfWorkMultiple: "2.0",
    estProductivityLift: "",
    aiTrainingHours: "",
    aiTrainingLicenseFees: "",
    aiTechCosts: "",
  });

  // Team Calculator State
  const [teamFormData, setTeamFormData] = useState({
    numberOfLearners: "",
    combinedComp: "",
    averageWorkHours: "2080",
    valueOfWorkMultiple: "2.0",
    estProductivityLift: "",
    aiTrainingHoursPerLearner: "",
    aiTrainingLicenseFeesPerLearner: "",
    aiTechCostsPerLearner: "",
  });

  const [individualResults, setIndividualResults] =
    useState<IndividualCalculatorResults | null>(null);
  const [teamResults, setTeamResults] = useState<TeamCalculatorResults | null>(
    null,
  );
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleIndividualInputChange = useCallback(
    (field: string, value: string) => {
      setIndividualFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleTeamInputChange = useCallback((field: string, value: string) => {
    setTeamFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validateIndividualInputs = (): IndividualCalculatorInputs | null => {
    const numericFields = {
      comp: parseFloat(individualFormData.comp),
      workHours: parseFloat(individualFormData.workHours),
      valueOfWorkMultiple: parseFloat(individualFormData.valueOfWorkMultiple),
      estProductivityLift: parseFloat(individualFormData.estProductivityLift),
      aiTrainingHours: parseFloat(individualFormData.aiTrainingHours),
      aiTrainingLicenseFees:
        parseFloat(individualFormData.aiTrainingLicenseFees) || 0,
      aiTechCosts: parseFloat(individualFormData.aiTechCosts) || 0,
    };

    // Check for required fields
    const requiredFields = [
      "comp",
      "workHours",
      "valueOfWorkMultiple",
      "estProductivityLift",
      "aiTrainingHours",
    ];
    for (const field of requiredFields) {
      if (
        isNaN(numericFields[field as keyof typeof numericFields]) ||
        numericFields[field as keyof typeof numericFields] <= 0
      ) {
        toast({
          title: "Validation Error",
          description: `Please enter a valid value for ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          variant: "destructive",
        });
        return null;
      }
    }

    if (numericFields.estProductivityLift > 100) {
      toast({
        title: "Validation Error",
        description: `${calculationType === "productivity" ? "Productivity lift" : "Time savings"} percentage cannot exceed 100%`,
        variant: "destructive",
      });
      return null;
    }

    return numericFields;
  };

  const validateTeamInputs = (): TeamCalculatorInputs | null => {
    const numericFields = {
      numberOfLearners: parseFloat(teamFormData.numberOfLearners),
      combinedComp: parseFloat(teamFormData.combinedComp),
      averageWorkHours: parseFloat(teamFormData.averageWorkHours),
      valueOfWorkMultiple: parseFloat(teamFormData.valueOfWorkMultiple),
      estProductivityLift: parseFloat(teamFormData.estProductivityLift),
      aiTrainingHoursPerLearner: parseFloat(
        teamFormData.aiTrainingHoursPerLearner,
      ),
      aiTrainingLicenseFeesPerLearner:
        parseFloat(teamFormData.aiTrainingLicenseFeesPerLearner) || 0,
      aiTechCostsPerLearner:
        parseFloat(teamFormData.aiTechCostsPerLearner) || 0,
    };

    // Check for required fields
    const requiredFields = [
      "numberOfLearners",
      "combinedComp",
      "averageWorkHours",
      "valueOfWorkMultiple",
      "estProductivityLift",
      "aiTrainingHoursPerLearner",
    ];
    for (const field of requiredFields) {
      if (
        isNaN(numericFields[field as keyof typeof numericFields]) ||
        numericFields[field as keyof typeof numericFields] <= 0
      ) {
        toast({
          title: "Validation Error",
          description: `Please enter a valid value for ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          variant: "destructive",
        });
        return null;
      }
    }

    if (numericFields.estProductivityLift > 100) {
      toast({
        title: "Validation Error",
        description: `${calculationType === "productivity" ? "Productivity lift" : "Time savings"} percentage cannot exceed 100%`,
        variant: "destructive",
      });
      return null;
    }

    return numericFields;
  };

  const handleIndividualCalculate = () => {
    const inputs = validateIndividualInputs();
    if (!inputs) return;

    setIsCalculating(true);

    try {
      const calculationResults = calculationType === "productivity" 
        ? calculateIndividualValue(inputs)
        : calculateIndividualEfficiency(inputs);
      const generatedInsights = generateIndividualInsights(
        inputs,
        calculationResults,
      );

      setIndividualResults(calculationResults);
      setInsights(generatedInsights);

      toast({
        title: "Calculation Complete",
        description:
          `Your individual ${calculationType} analysis has been calculated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "An error occurred during calculation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleTeamCalculate = () => {
    const inputs = validateTeamInputs();
    if (!inputs) return;

    setIsCalculating(true);

    try {
      const calculationResults = calculationType === "productivity"
        ? calculateTeamValue(inputs)
        : calculateTeamEfficiency(inputs);
      const generatedInsights = generateTeamInsights(
        inputs,
        calculationResults,
      );

      setTeamResults(calculationResults);
      setInsights(generatedInsights);

      toast({
        title: "Calculation Complete",
        description: `Your team ${calculationType} analysis has been calculated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "An error occurred during calculation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-calculator-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-calculator-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <img src={logoUrl} alt="SmarterX Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-calculator-gray-900">
                  AI Value Calculator
                </h1>
                <p className="text-sm text-calculator-gray-600">
                  An Interactive Tool to Estimate Efficiency and Productivity
                  Lift from AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Calculation Type Selector */}
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-calculator-gray-900">
                Calculation Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <label htmlFor="calculation-type" className="block text-sm font-medium text-calculator-gray-700 mb-2">
                    What would you like to calculate?
                  </label>
                  <Select value={calculationType} onValueChange={(value: "efficiency" | "productivity") => setCalculationType(value)}>
                    <SelectTrigger className="w-full sm:w-80">
                      <SelectValue placeholder="Select calculation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="productivity">
                        <div className="flex flex-col">
                          <span className="font-medium">Productivity Lift</span>
                          <span className="text-xs text-calculator-gray-500">
                            Calculate value from increased output/quality
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="efficiency">
                        <div className="flex flex-col">
                          <span className="font-medium">Efficiency Gains</span>
                          <span className="text-xs text-calculator-gray-500">
                            Calculate value from time savings and cost reduction
                          </span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-calculator-gray-50 rounded-lg p-3 text-sm text-calculator-gray-600">
                  <strong className="text-calculator-gray-800">
                    {calculationType === "productivity" ? "Productivity Focus:" : "Efficiency Focus:"}
                  </strong>
                  <br />
                  {calculationType === "productivity" 
                    ? "Increase Output and Revenue by Doing More."
                    : "Save Time and Money by Doing Work Faster."
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger
              value="individual"
              className="flex items-center space-x-2"
              data-testid="tab-individual"
            >
              <User className="h-4 w-4" />
              <span>Individual</span>
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="flex items-center space-x-2"
              data-testid="tab-team"
            >
              <Users className="h-4 w-4" />
              <span>Team</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <div className="space-y-4">
              {/* Row 1: Forms - Value Analysis and Cost Analysis side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <IndividualValueAnalysis
                  values={{
                    comp: individualFormData.comp,
                    workHours: individualFormData.workHours,
                    valueOfWorkMultiple: individualFormData.valueOfWorkMultiple,
                    estProductivityLift: individualFormData.estProductivityLift,
                  }}
                  onChange={handleIndividualInputChange}
                  calculationType={calculationType}
                />
                <IndividualCostAnalysis
                  values={{
                    aiTrainingHours: individualFormData.aiTrainingHours,
                    aiTrainingLicenseFees:
                      individualFormData.aiTrainingLicenseFees,
                    aiTechCosts: individualFormData.aiTechCosts,
                  }}
                  onChange={handleIndividualInputChange}
                />
              </div>

              {/* Calculate Button */}
              <div className="text-center py-1">
                <Button
                  onClick={handleIndividualCalculate}
                  disabled={isCalculating}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-testid="button-calculate-individual"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  {isCalculating
                    ? "Calculating..."
                    : `Calculate Individual ${calculationType === "productivity" ? "Productivity" : "Efficiency"} Value`}
                </Button>
              </div>

              {/* Row 2: Single comprehensive results box */}
              {individualResults ? (
                <div className="bg-white rounded-xl shadow-sm border border-calculator-gray-200 p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Value Analysis Results */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
                        <TrendingUp className="text-success-600 mr-2 h-5 w-5" />
                        Value Analysis Results
                      </h3>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            Cost Per Hour
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(individualResults.costPerHour)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            {calculationType === "productivity" ? "Current Value of Work Per Year" : "Annual Cost (Comp)"}
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(
                              individualResults.annualValueOfWork,
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            {calculationType === "productivity" ? "Productivity Lift Value Per Year" : "Value of Time Savings Per Year"}
                          </div>
                          <div className="font-semibold text-lg text-success-600">
                            {formatCurrency(
                              individualResults.valueOfProductivityLift,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cost Analysis Results */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
                        <DollarSign className="text-warning-600 mr-2 h-5 w-5" />
                        Cost Analysis Results
                      </h3>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            AI Training Human Costs
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(
                              individualResults.aiTrainingHumanCosts,
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            AI Training Total Costs
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(
                              individualResults.totalAiTrainingCosts,
                            )}
                          </div>
                        </div>
                        <div className="text-center pt-2 border-t border-calculator-gray-200">
                          <div className="text-calculator-gray-600 text-xs">
                            Total AI Costs
                          </div>
                          <div className="font-semibold text-lg text-warning-600">
                            {formatCurrency(individualResults.totalAiCosts)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Net Value and Insights */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
                        <Target className="text-primary mr-2 h-5 w-5" />
                        Net Value & ROI
                      </h3>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            First Year Net Value
                          </div>
                          <div
                            className={`font-bold text-xl ${(individualResults.firstYearNetValue || 0) >= 0 ? "text-success-600" : "text-red-600"}`}
                          >
                            {formatCurrency(
                              individualResults.firstYearNetValue,
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            First Year ROI
                          </div>
                          <div
                            className={`font-semibold text-lg ${(individualResults.roi || 0) >= 0 ? "text-success-600" : "text-red-600"}`}
                          >
                            {individualResults.roi
                              ? `${individualResults.roi.toFixed(0)}%`
                              : "0%"}
                          </div>
                        </div>
                      </div>

                      {/* Key Insights */}
                      <div className="mt-4 pt-4 border-t border-calculator-gray-200">
                        <h4 className="text-sm font-semibold text-calculator-gray-900 mb-2">
                          Key Insights
                        </h4>
                        <div className="space-y-1">
                          {insights.slice(0, 3).map((insight, index) => (
                            <div
                              key={index}
                              className="text-xs text-calculator-gray-600"
                            >
                              •{" "}
                              {typeof insight === "string"
                                ? insight
                                : insight.message}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-calculator-gray-200 p-6">
                  <div className="text-center text-calculator-gray-500">
                    <p>
                      Complete the forms above and click "Calculate Individual {calculationType === "productivity" ? "Productivity" : "Efficiency"} Value" to see your results.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-4">
              {/* Row 1: Forms - Value Analysis and Cost Analysis side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TeamValueAnalysis
                  values={{
                    numberOfLearners: teamFormData.numberOfLearners,
                    combinedComp: teamFormData.combinedComp,
                    averageWorkHours: teamFormData.averageWorkHours,
                    valueOfWorkMultiple: teamFormData.valueOfWorkMultiple,
                    estProductivityLift: teamFormData.estProductivityLift,
                  }}
                  onChange={handleTeamInputChange}
                  calculationType={calculationType}
                />
                <TeamCostAnalysis
                  values={{
                    aiTrainingHoursPerLearner:
                      teamFormData.aiTrainingHoursPerLearner,
                    aiTrainingLicenseFeesPerLearner:
                      teamFormData.aiTrainingLicenseFeesPerLearner,
                    aiTechCostsPerLearner: teamFormData.aiTechCostsPerLearner,
                  }}
                  onChange={handleTeamInputChange}
                />
              </div>

              {/* Calculate Button */}
              <div className="text-center py-1">
                <Button
                  onClick={handleTeamCalculate}
                  disabled={isCalculating}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-testid="button-calculate-team"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  {isCalculating ? "Calculating..." : `Calculate Team ${calculationType === "productivity" ? "Productivity" : "Efficiency"} Value`}
                </Button>
              </div>

              {/* Row 2: Single comprehensive results box */}
              {teamResults ? (
                <div className="bg-white rounded-xl shadow-sm border border-calculator-gray-200 p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Value Analysis Results */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
                        <TrendingUp className="text-success-600 mr-2 h-5 w-5" />
                        Value Analysis Results
                      </h3>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            Blended Cost Per Hour
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(teamResults.blendedCostPerHour)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            {calculationType === "productivity" ? "Avg Annual Value Per Person" : "Avg Annual Cost Per Person"}
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(teamResults.avgAnnualValueOfWork)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            {calculationType === "productivity" ? "Total Team Productivity Lift Value" : "Total Team Time Savings Value"}
                          </div>
                          <div className="font-semibold text-lg text-success-600">
                            {formatCurrency(
                              teamResults.totalValueOfProductivityLift,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cost Analysis Results */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
                        <DollarSign className="text-warning-600 mr-2 h-5 w-5" />
                        Cost Analysis Results
                      </h3>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            Combined Training Hours
                          </div>
                          <div className="font-semibold text-sm">
                            {teamResults.combinedAiTrainingHours?.toLocaleString() ||
                              0}{" "}
                            hrs
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            Combined Human Costs
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(
                              teamResults.combinedAiTrainingHumanCosts,
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            Combined License Fees
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(
                              teamResults.combinedAiTrainingLicenseFees,
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            Combined Tech Costs
                          </div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(teamResults.totalAiTechCosts)}
                          </div>
                        </div>
                        <div className="text-center pt-2 border-t border-calculator-gray-200">
                          <div className="text-calculator-gray-600 text-xs">
                            Total AI Costs
                          </div>
                          <div className="font-semibold text-lg text-warning-600">
                            {formatCurrency(teamResults.totalAiCosts)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Net Value and Insights */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-calculator-gray-900 flex items-center">
                        <Target className="text-primary mr-2 h-5 w-5" />
                        Net Value & ROI
                      </h3>
                      <div className="space-y-2">
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            Team First Year Net Value
                          </div>
                          <div
                            className={`font-bold text-xl ${(teamResults.firstYearNetValue || 0) >= 0 ? "text-success-600" : "text-red-600"}`}
                          >
                            {formatCurrency(teamResults.firstYearNetValue)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-calculator-gray-600 text-xs">
                            Team First Year ROI
                          </div>
                          <div
                            className={`font-semibold text-lg ${(teamResults.roi || 0) >= 0 ? "text-success-600" : "text-red-600"}`}
                          >
                            {teamResults.roi
                              ? `${teamResults.roi.toFixed(0)}%`
                              : "0%"}
                          </div>
                        </div>
                      </div>

                      {/* Key Insights */}
                      <div className="mt-4 pt-4 border-t border-calculator-gray-200">
                        <h4 className="text-sm font-semibold text-calculator-gray-900 mb-2">
                          Key Insights
                        </h4>
                        <div className="space-y-1">
                          {insights.slice(0, 3).map((insight, index) => (
                            <div
                              key={index}
                              className="text-xs text-calculator-gray-600"
                            >
                              •{" "}
                              {typeof insight === "string"
                                ? insight
                                : insight.message}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-calculator-gray-200 p-6">
                  <div className="text-center text-calculator-gray-500">
                    <p>
                      Complete the forms above and click "Calculate Team {calculationType === "productivity" ? "Productivity" : "Efficiency"} Value" to see your results.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
