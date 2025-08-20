export interface CalculatorInputs {
  currentProductivity: number;
  errorRate: number;
  processingTime: number;
  resourceUtilization: number;
  trainingDataSize: number;
  trainingDuration: number;
  modelComplexity: 'basic' | 'intermediate' | 'advanced';
  expectedAccuracy: number;
  hourlyLabor: number;
  dailyVolume: number;
  errorCost: number;
  implementationCost: number;
}

export interface CalculationResults {
  efficiencyImprovement: number;
  timeSavings: number;
  errorReduction: number;
  costSavings: number;
  roi: number;
  paybackPeriod: number;
}

export interface Insight {
  type: 'success' | 'info' | 'warning';
  message: string;
}

export function calculateEfficiencyLift(inputs: CalculatorInputs): CalculationResults {
  // Model complexity factors
  const complexityFactors = {
    basic: { accuracy: 0.8, efficiency: 1.2, training: 0.8 },
    intermediate: { accuracy: 0.9, efficiency: 1.5, training: 1.0 },
    advanced: { accuracy: 0.95, efficiency: 1.8, training: 1.3 }
  };

  const factor = complexityFactors[inputs.modelComplexity];
  
  // Calculate AI-driven improvements
  const accuracyImprovement = (inputs.expectedAccuracy / 100) * factor.accuracy;
  const baseEfficiencyGain = Math.min(accuracyImprovement * factor.efficiency, 2.0); // Cap at 200%
  
  // Calculate efficiency improvement percentage
  const efficiencyImprovement = baseEfficiencyGain * 100;
  
  // Calculate time savings based on processing time improvement
  const timeReductionFactor = 1 - (1 / (1 + baseEfficiencyGain));
  const timeSavings = (inputs.processingTime * timeReductionFactor * inputs.dailyVolume) / 60; // hours per day
  
  // Calculate error reduction
  const errorReduction = Math.min(inputs.errorRate * accuracyImprovement * 0.8, inputs.errorRate * 0.9); // Max 90% reduction
  
  // Calculate daily cost savings
  const laborSavingsPerDay = timeSavings * inputs.hourlyLabor;
  const errorSavingsPerDay = (inputs.dailyVolume * (inputs.errorRate / 100) * errorReduction / 100) * inputs.errorCost;
  const totalDailySavings = laborSavingsPerDay + errorSavingsPerDay;
  
  // Monthly cost savings
  const costSavings = totalDailySavings * 22; // 22 working days per month
  
  // Annual savings and ROI
  const annualSavings = costSavings * 12;
  const roi = ((annualSavings - inputs.implementationCost) / inputs.implementationCost) * 100;
  
  // Payback period in months
  const paybackPeriod = inputs.implementationCost / costSavings;
  
  return {
    efficiencyImprovement: Math.round(efficiencyImprovement * 10) / 10,
    timeSavings: Math.round(timeSavings * 10) / 10,
    errorReduction: Math.round((errorReduction / inputs.errorRate) * 1000) / 10,
    costSavings: Math.round(costSavings),
    roi: Math.round(roi * 10) / 10,
    paybackPeriod: Math.round(paybackPeriod * 10) / 10
  };
}

export function generateInsights(inputs: CalculatorInputs, results: CalculationResults): Insight[] {
  const insights: Insight[] = [];
  
  if (results.roi > 200) {
    insights.push({
      type: 'success',
      message: 'Excellent potential: Your configuration shows strong efficiency gains'
    });
  } else if (results.roi > 100) {
    insights.push({
      type: 'info',
      message: 'Good potential: Solid returns expected from AI implementation'
    });
  } else {
    insights.push({
      type: 'warning',
      message: 'Consider optimizing: Review parameters to improve ROI'
    });
  }
  
  if (results.paybackPeriod < 12) {
    insights.push({
      type: 'success',
      message: 'Quick ROI: Payback period is under 12 months'
    });
  } else if (results.paybackPeriod < 24) {
    insights.push({
      type: 'info',
      message: 'Moderate timeline: Payback expected within 2 years'
    });
  } else {
    insights.push({
      type: 'warning',
      message: 'Long payback: Consider reducing implementation costs'
    });
  }
  
  if (inputs.modelComplexity === 'advanced' && inputs.trainingDataSize > 1000) {
    insights.push({
      type: 'success',
      message: 'Recommendation: High-quality data with advanced models yield optimal results'
    });
  } else if (inputs.trainingDataSize < 100) {
    insights.push({
      type: 'warning',
      message: 'Data concern: Consider increasing training data size for better accuracy'
    });
  } else {
    insights.push({
      type: 'info',
      message: 'Data quality: Ensure high-quality training data for optimal results'
    });
  }
  
  return insights;
}

export function exportResults(inputs: CalculatorInputs, results: CalculationResults): void {
  const exportData = {
    timestamp: new Date().toISOString(),
    inputs,
    results,
    insights: generateInsights(inputs, results)
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `ai-efficiency-calculation-${new Date().getTime()}.json`;
  link.click();
}
