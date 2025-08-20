import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MetricsSection } from "@/components/calculator/MetricsSection";
import { AIParametersSection } from "@/components/calculator/AIParametersSection";
import { BusinessFactorsSection } from "@/components/calculator/BusinessFactorsSection";
import { ResultsPanel } from "@/components/calculator/ResultsPanel";
import { InsightsPanel } from "@/components/calculator/InsightsPanel";
import { calculateEfficiencyLift, generateInsights, exportResults, CalculatorInputs, CalculationResults, Insight } from "@/lib/calculations";
import { Calculator, Download, TrendingUp } from "lucide-react";

export default function CalculatorPage() {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    currentProductivity: '',
    errorRate: '',
    processingTime: '',
    resourceUtilization: '',
    trainingDataSize: '',
    trainingDuration: '',
    modelComplexity: '',
    expectedAccuracy: '',
    hourlyLabor: '',
    dailyVolume: '',
    errorCost: '',
    implementationCost: ''
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateInputs = (): CalculatorInputs | null => {
    const numericFields = {
      currentProductivity: parseFloat(formData.currentProductivity),
      errorRate: parseFloat(formData.errorRate),
      processingTime: parseFloat(formData.processingTime),
      resourceUtilization: parseFloat(formData.resourceUtilization),
      trainingDataSize: parseFloat(formData.trainingDataSize),
      trainingDuration: parseFloat(formData.trainingDuration),
      expectedAccuracy: parseFloat(formData.expectedAccuracy),
      hourlyLabor: parseFloat(formData.hourlyLabor),
      dailyVolume: parseFloat(formData.dailyVolume),
      errorCost: parseFloat(formData.errorCost),
      implementationCost: parseFloat(formData.implementationCost)
    };

    // Check for required fields
    const requiredFields = Object.keys(numericFields);
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

    if (!formData.modelComplexity || !['basic', 'intermediate', 'advanced'].includes(formData.modelComplexity)) {
      toast({
        title: "Validation Error",
        description: "Please select a model complexity",
        variant: "destructive"
      });
      return null;
    }

    return {
      ...numericFields,
      modelComplexity: formData.modelComplexity as 'basic' | 'intermediate' | 'advanced'
    };
  };

  const simulateProgress = () => {
    return new Promise<void>((resolve) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress > 100) {
          currentProgress = 100;
        }
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  };

  const handleCalculate = async () => {
    const inputs = validateInputs();
    if (!inputs) return;

    setIsCalculating(true);
    setProgress(0);
    
    try {
      await simulateProgress();
      
      const calculationResults = calculateEfficiencyLift(inputs);
      const generatedInsights = generateInsights(inputs, calculationResults);
      
      setResults(calculationResults);
      setInsights(generatedInsights);
      
      toast({
        title: "Calculation Complete",
        description: "Your efficiency analysis has been calculated successfully.",
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

  const handleExport = () => {
    const inputs = validateInputs();
    if (!inputs || !results) {
      toast({
        title: "Export Error",
        description: "Please calculate results before exporting.",
        variant: "destructive"
      });
      return;
    }

    try {
      exportResults(inputs, results);
      toast({
        title: "Export Successful",
        description: "Results have been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "An error occurred during export. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-calculator-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-calculator-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary rounded-lg p-2">
                <TrendingUp className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-calculator-gray-900">AI Efficiency Calculator</h1>
                <p className="text-sm text-calculator-gray-600">Measure your product efficiency lift with AI training</p>
              </div>
            </div>
            <Button 
              onClick={handleExport}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              data-testid="button-export"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Input Sections */}
          <div className="xl:col-span-2 space-y-6">
            <MetricsSection 
              values={{
                currentProductivity: formData.currentProductivity,
                errorRate: formData.errorRate,
                processingTime: formData.processingTime,
                resourceUtilization: formData.resourceUtilization
              }}
              onChange={handleInputChange}
            />

            <AIParametersSection 
              values={{
                trainingDataSize: formData.trainingDataSize,
                trainingDuration: formData.trainingDuration,
                modelComplexity: formData.modelComplexity,
                expectedAccuracy: formData.expectedAccuracy
              }}
              onChange={handleInputChange}
            />

            <BusinessFactorsSection 
              values={{
                hourlyLabor: formData.hourlyLabor,
                dailyVolume: formData.dailyVolume,
                errorCost: formData.errorCost,
                implementationCost: formData.implementationCost
              }}
              onChange={handleInputChange}
            />

            {/* Calculate Button */}
            <div className="text-center">
              <Button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                data-testid="button-calculate"
              >
                <Calculator className="mr-3 h-5 w-5" />
                {isCalculating ? 'Calculating...' : 'Calculate Efficiency Lift'}
              </Button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="xl:col-span-1 space-y-6">
            <ResultsPanel 
              results={results}
              isCalculating={isCalculating}
              progress={progress}
            />
            <InsightsPanel insights={insights} />
          </div>
        </div>
      </main>
    </div>
  );
}
