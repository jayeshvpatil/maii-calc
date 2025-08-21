import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  calculateTeamValue, 
  generateIndividualInsights, 
  generateTeamInsights,
  Insight 
} from "@/lib/calculations";
import { IndividualCalculatorInputs, IndividualCalculatorResults, TeamCalculatorInputs, TeamCalculatorResults } from "@shared/schema";
import { Calculator, User, Users } from "lucide-react";
import logoUrl from "@assets/image_1755721475254.png";

export default function CalculatorPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("individual");
  
  // Individual Calculator State
  const [individualFormData, setIndividualFormData] = useState({
    comp: '',
    workHours: '2080',
    valueOfWorkMultiple: '2.0',
    estProductivityLift: '',
    aiTrainingHours: '',
    aiTrainingLicenseFees: '',
    aiTechCosts: ''
  });

  // Team Calculator State
  const [teamFormData, setTeamFormData] = useState({
    numberOfLearners: '',
    combinedComp: '',
    averageWorkHours: '2080',
    valueOfWorkMultiple: '2.0',
    estProductivityLift: '',
    aiTrainingHoursPerLearner: '',
    aiTrainingLicenseFeesPerLearner: '',
    aiTechCostsPerLearner: ''
  });

  const [individualResults, setIndividualResults] = useState<IndividualCalculatorResults | null>(null);
  const [teamResults, setTeamResults] = useState<TeamCalculatorResults | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleIndividualInputChange = useCallback((field: string, value: string) => {
    setIndividualFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTeamInputChange = useCallback((field: string, value: string) => {
    setTeamFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateIndividualInputs = (): IndividualCalculatorInputs | null => {
    const numericFields = {
      comp: parseFloat(individualFormData.comp),
      workHours: parseFloat(individualFormData.workHours),
      valueOfWorkMultiple: parseFloat(individualFormData.valueOfWorkMultiple),
      estProductivityLift: parseFloat(individualFormData.estProductivityLift),
      aiTrainingHours: parseFloat(individualFormData.aiTrainingHours),
      aiTrainingLicenseFees: parseFloat(individualFormData.aiTrainingLicenseFees) || 0,
      aiTechCosts: parseFloat(individualFormData.aiTechCosts) || 0
    };

    // Check for required fields
    const requiredFields = ['comp', 'workHours', 'valueOfWorkMultiple', 'estProductivityLift', 'aiTrainingHours'];
    for (const field of requiredFields) {
      if (isNaN(numericFields[field as keyof typeof numericFields]) || numericFields[field as keyof typeof numericFields] <= 0) {
        toast({
          title: "Validation Error",
          description: `Please enter a valid value for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive"
        });
        return null;
      }
    }

    if (numericFields.estProductivityLift > 100) {
      toast({
        title: "Validation Error",
        description: "Productivity lift percentage cannot exceed 100%",
        variant: "destructive"
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
      aiTrainingHoursPerLearner: parseFloat(teamFormData.aiTrainingHoursPerLearner),
      aiTrainingLicenseFeesPerLearner: parseFloat(teamFormData.aiTrainingLicenseFeesPerLearner) || 0,
      aiTechCostsPerLearner: parseFloat(teamFormData.aiTechCostsPerLearner) || 0
    };

    // Check for required fields
    const requiredFields = ['numberOfLearners', 'combinedComp', 'averageWorkHours', 'valueOfWorkMultiple', 'estProductivityLift', 'aiTrainingHoursPerLearner'];
    for (const field of requiredFields) {
      if (isNaN(numericFields[field as keyof typeof numericFields]) || numericFields[field as keyof typeof numericFields] <= 0) {
        toast({
          title: "Validation Error",
          description: `Please enter a valid value for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive"
        });
        return null;
      }
    }

    if (numericFields.estProductivityLift > 100) {
      toast({
        title: "Validation Error",
        description: "Productivity lift percentage cannot exceed 100%",
        variant: "destructive"
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
      const calculationResults = calculateIndividualValue(inputs);
      const generatedInsights = generateIndividualInsights(inputs, calculationResults);
      
      setIndividualResults(calculationResults);
      setInsights(generatedInsights);
      
      toast({
        title: "Calculation Complete",
        description: "Your individual analysis has been calculated successfully.",
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "An error occurred during calculation. Please try again.",
        variant: "destructive"
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
      const calculationResults = calculateTeamValue(inputs);
      const generatedInsights = generateTeamInsights(inputs, calculationResults);
      
      setTeamResults(calculationResults);
      setInsights(generatedInsights);
      
      toast({
        title: "Calculation Complete",
        description: "Your team analysis has been calculated successfully.",
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "An error occurred during calculation. Please try again.",
        variant: "destructive"
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
              <img 
                src={logoUrl} 
                alt="SmarterX Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-calculator-gray-900">AI Value Calculator</h1>
                <p className="text-sm text-calculator-gray-600">AI Value Calculator: An Interactive Tool to Estimate Efficiency and Productivity Lift from AI.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="individual" className="flex items-center space-x-2" data-testid="tab-individual">
              <User className="h-4 w-4" />
              <span>Individual</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2" data-testid="tab-team">
              <Users className="h-4 w-4" />
              <span>Team</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <div className="space-y-8">
              {/* Row 1: Value Analysis Form and Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IndividualValueAnalysis 
                  values={{
                    comp: individualFormData.comp,
                    workHours: individualFormData.workHours,
                    valueOfWorkMultiple: individualFormData.valueOfWorkMultiple,
                    estProductivityLift: individualFormData.estProductivityLift
                  }}
                  onChange={handleIndividualInputChange}
                />
                <IndividualResults results={individualResults} section="value" />
              </div>

              {/* Row 2: Cost Analysis Form and Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IndividualCostAnalysis 
                  values={{
                    aiTrainingHours: individualFormData.aiTrainingHours,
                    aiTrainingLicenseFees: individualFormData.aiTrainingLicenseFees,
                    aiTechCosts: individualFormData.aiTechCosts
                  }}
                  onChange={handleIndividualInputChange}
                />
                <IndividualResults results={individualResults} section="cost" />
              </div>

              {/* Calculate Button */}
              <div className="text-center">
                <Button
                  onClick={handleIndividualCalculate}
                  disabled={isCalculating}
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-testid="button-calculate-individual"
                >
                  <Calculator className="mr-3 h-5 w-5" />
                  {isCalculating ? 'Calculating...' : 'Calculate Individual Value'}
                </Button>
              </div>

              {/* Row 3: Net Value Estimate and Key Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IndividualResults results={individualResults} section="net" />
                <InsightsPanel insights={insights} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-8">
              {/* Row 1: Value Analysis Form and Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TeamValueAnalysis 
                  values={{
                    numberOfLearners: teamFormData.numberOfLearners,
                    combinedComp: teamFormData.combinedComp,
                    averageWorkHours: teamFormData.averageWorkHours,
                    valueOfWorkMultiple: teamFormData.valueOfWorkMultiple,
                    estProductivityLift: teamFormData.estProductivityLift
                  }}
                  onChange={handleTeamInputChange}
                />
                <TeamResults results={teamResults} section="value" />
              </div>

              {/* Row 2: Cost Analysis Form and Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TeamCostAnalysis 
                  values={{
                    aiTrainingHoursPerLearner: teamFormData.aiTrainingHoursPerLearner,
                    aiTrainingLicenseFeesPerLearner: teamFormData.aiTrainingLicenseFeesPerLearner,
                    aiTechCostsPerLearner: teamFormData.aiTechCostsPerLearner
                  }}
                  onChange={handleTeamInputChange}
                />
                <TeamResults results={teamResults} section="cost" />
              </div>

              {/* Calculate Button */}
              <div className="text-center">
                <Button
                  onClick={handleTeamCalculate}
                  disabled={isCalculating}
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-testid="button-calculate-team"
                >
                  <Calculator className="mr-3 h-5 w-5" />
                  {isCalculating ? 'Calculating...' : 'Calculate Team Value'}
                </Button>
              </div>

              {/* Row 3: Net Value Estimate and Key Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TeamResults results={teamResults} section="net" />
                <InsightsPanel insights={insights} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
