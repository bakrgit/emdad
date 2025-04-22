export interface FinancialMetric {
  title: string;
  year: number;
  value: string | number;
  comparisonText?: string;
  comparisonValue?: string | number;
  percentageChange?: number;
  isPositiveChange?: boolean;
  icon?: string;
} 