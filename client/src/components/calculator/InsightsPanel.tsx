import { Card, CardContent } from "@/components/ui/card";
import { Insight } from "@/lib/calculations";
import { Lightbulb, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface InsightsPanelProps {
  insights: Insight[];
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-success-600 h-3 w-3" />;
      case 'info':
        return <Info className="text-info-600 h-3 w-3" />;
      case 'warning':
        return <AlertTriangle className="text-warning-600 h-3 w-3" />;
      default:
        return <Info className="text-info-600 h-3 w-3" />;
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success-50';
      case 'info':
        return 'bg-info-50';
      case 'warning':
        return 'bg-warning-50';
      default:
        return 'bg-info-50';
    }
  };

  const defaultInsights = [
    {
      type: 'success' as const,
      message: 'Enter your data to see personalized efficiency insights'
    },
    {
      type: 'info' as const,
      message: 'AI training impact will be calculated based on model complexity'
    },
    {
      type: 'warning' as const,
      message: 'Higher data quality typically yields better efficiency gains'
    }
  ];

  const displayInsights = insights.length > 0 ? insights : defaultInsights;

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-calculator-gray-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-calculator-gray-900 mb-4 flex items-center">
          <Lightbulb className="text-primary mr-3 h-5 w-5" />
          Key Insights
        </h3>
        <div className="space-y-3" data-testid="insights-container">
          {displayInsights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`${getInsightBgColor(insight.type)} rounded-full p-1 mt-1`}>
                {getInsightIcon(insight.type)}
              </div>
              <p className="text-sm text-calculator-gray-700" data-testid={`insight-${index}`}>
                {insight.message}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
