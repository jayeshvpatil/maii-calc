import { IndividualCalculatorInputs, IndividualCalculatorResults, TeamCalculatorInputs, TeamCalculatorResults } from "@shared/schema";

export interface Insight {
  type: 'success' | 'info' | 'warning';
  message: string;
}

// Individual Calculator Functions
export function calculateIndividualValue(inputs: IndividualCalculatorInputs): IndividualCalculatorResults {
  // Part 1: Value Analysis
  const costPerHour = inputs.comp / inputs.workHours;
  const valueOfWorkPerHour = costPerHour * inputs.valueOfWorkMultiple;
  const annualValueOfWork = inputs.workHours * valueOfWorkPerHour;
  const valueOfProductivityLift = annualValueOfWork * (inputs.estProductivityLift / 100);
  const newAnnualValueOfWork = annualValueOfWork + valueOfProductivityLift;
  
  // Part 2: Cost Analysis
  const aiTrainingHumanCosts = inputs.aiTrainingHours * costPerHour;
  const totalAiTrainingCosts = aiTrainingHumanCosts + inputs.aiTrainingLicenseFees;
  const totalAiCosts = totalAiTrainingCosts + inputs.aiTechCosts;
  
  // Part 3: Net Value Estimate
  const firstYearNetValue = valueOfProductivityLift - totalAiCosts;
  const roi = (firstYearNetValue / totalAiCosts) * 100;
  
  return {
    costPerHour: Math.round(costPerHour),
    valueOfWorkPerHour: Math.round(valueOfWorkPerHour),
    annualValueOfWork: Math.round(annualValueOfWork),
    valueOfProductivityLift: Math.round(valueOfProductivityLift),
    newAnnualValueOfWork: Math.round(newAnnualValueOfWork),
    aiTrainingHumanCosts: Math.round(aiTrainingHumanCosts),
    totalAiTrainingCosts: Math.round(totalAiTrainingCosts),
    totalAiCosts: Math.round(totalAiCosts),
    firstYearNetValue: Math.round(firstYearNetValue),
    roi: Math.round(roi * 100) / 100
  };
}

// Team Calculator Functions
export function calculateTeamValue(inputs: TeamCalculatorInputs): TeamCalculatorResults {
  // Part 1: Value Analysis
  const combinedWorkHours = inputs.averageWorkHours * inputs.numberOfLearners;
  const blendedCostPerHour = inputs.combinedComp / combinedWorkHours;
  const blendedValueOfWorkPerHour = blendedCostPerHour * inputs.valueOfWorkMultiple;
  const avgAnnualValueOfWork = inputs.averageWorkHours * blendedValueOfWorkPerHour;
  const avgValueOfProductivityLift = avgAnnualValueOfWork * (inputs.estProductivityLift / 100);
  const avgNewAnnualValueOfWork = avgAnnualValueOfWork + avgValueOfProductivityLift;
  const totalValueOfProductivityLift = avgValueOfProductivityLift * inputs.numberOfLearners;
  
  // Part 2: Cost Analysis
  const combinedAiTrainingHours = inputs.numberOfLearners * inputs.aiTrainingHoursPerLearner;
  const combinedAiTrainingHumanCosts = combinedAiTrainingHours * blendedCostPerHour;
  const combinedAiTrainingLicenseFees = inputs.aiTrainingLicenseFeesPerLearner * inputs.numberOfLearners;
  const totalAiTrainingCosts = combinedAiTrainingHumanCosts + combinedAiTrainingLicenseFees;
  const totalAiTechCosts = inputs.aiTechCostsPerLearner * inputs.numberOfLearners;
  const totalAiCosts = totalAiTrainingCosts + totalAiTechCosts;
  
  // Part 3: Net Value Estimate
  const firstYearNetValue = totalValueOfProductivityLift - totalAiCosts;
  const roi = (firstYearNetValue / totalAiCosts) * 100;
  
  return {
    combinedWorkHours: Math.round(combinedWorkHours),
    blendedCostPerHour: Math.round(blendedCostPerHour),
    blendedValueOfWorkPerHour: Math.round(blendedValueOfWorkPerHour),
    avgAnnualValueOfWork: Math.round(avgAnnualValueOfWork),
    avgValueOfProductivityLift: Math.round(avgValueOfProductivityLift),
    avgNewAnnualValueOfWork: Math.round(avgNewAnnualValueOfWork),
    totalValueOfProductivityLift: Math.round(totalValueOfProductivityLift),
    combinedAiTrainingHours: Math.round(combinedAiTrainingHours),
    combinedAiTrainingHumanCosts: Math.round(combinedAiTrainingHumanCosts),
    combinedAiTrainingLicenseFees: Math.round(combinedAiTrainingLicenseFees),
    totalAiTrainingCosts: Math.round(totalAiTrainingCosts),
    totalAiTechCosts: Math.round(totalAiTechCosts),
    totalAiCosts: Math.round(totalAiCosts),
    firstYearNetValue: Math.round(firstYearNetValue),
    roi: Math.round(roi * 100) / 100
  };
}

// Insights generation
export function generateIndividualInsights(inputs: IndividualCalculatorInputs, results: IndividualCalculatorResults): Insight[] {
  const insights: Insight[] = [];
  
  if (results.roi > 1000) {
    insights.push({
      type: 'success',
      message: 'Excellent ROI: Your investment shows exceptional returns'
    });
  } else if (results.roi > 500) {
    insights.push({
      type: 'info',
      message: 'Strong ROI: Good returns expected from AI training'
    });
  } else if (results.roi > 100) {
    insights.push({
      type: 'info',
      message: 'Positive ROI: Training investment will pay off'
    });
  } else {
    insights.push({
      type: 'warning',
      message: 'Consider optimizing: Review training costs or productivity expectations'
    });
  }
  
  if (inputs.estProductivityLift > 25) {
    insights.push({
      type: 'warning',
      message: 'High expectations: Ensure productivity lift assumptions are realistic'
    });
  } else if (inputs.estProductivityLift < 10) {
    insights.push({
      type: 'info',
      message: 'Conservative estimate: Consider if productivity gains could be higher'
    });
  }
  
  if (inputs.aiTrainingHours < 10) {
    insights.push({
      type: 'warning',
      message: 'Limited training: Consider increasing training hours for better results'
    });
  } else if (inputs.aiTrainingHours > 40) {
    insights.push({
      type: 'info',
      message: 'Comprehensive training: Extensive training should yield good results'
    });
  }
  
  return insights;
}

export function generateTeamInsights(inputs: TeamCalculatorInputs, results: TeamCalculatorResults): Insight[] {
  const insights: Insight[] = [];
  
  if (results.roi > 2000) {
    insights.push({
      type: 'success',
      message: 'Exceptional team ROI: Outstanding returns on team training investment'
    });
  } else if (results.roi > 1000) {
    insights.push({
      type: 'success',
      message: 'Strong team ROI: Excellent returns expected from team training'
    });
  } else if (results.roi > 500) {
    insights.push({
      type: 'info',
      message: 'Good team ROI: Positive returns on team investment'
    });
  } else {
    insights.push({
      type: 'warning',
      message: 'Review team parameters: Consider optimizing costs or expectations'
    });
  }
  
  if (inputs.numberOfLearners > 50) {
    insights.push({
      type: 'info',
      message: 'Large team: Economies of scale should reduce per-person costs'
    });
  } else if (inputs.numberOfLearners < 5) {
    insights.push({
      type: 'warning',
      message: 'Small team: Consider if individual training might be more cost-effective'
    });
  }
  
  const avgCostPerLearner = results.totalAiCosts / inputs.numberOfLearners;
  if (avgCostPerLearner > 2000) {
    insights.push({
      type: 'warning',
      message: 'High per-learner cost: Review training expenses and efficiency'
    });
  } else if (avgCostPerLearner < 500) {
    insights.push({
      type: 'success',
      message: 'Cost-effective training: Good value per learner achieved'
    });
  }
  
  return insights;
}


