import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

interface FinancialMetric {
  title: string;
  year: string | number;
  value: string | number;
  valueDescription?: string;
  comparisonValue?: string | number;
  percentageChange?: number;
  isPositiveChange?: boolean;
  comparisonText?: string;
  showInfo?: boolean;
  averageYearsText?: string;
  decreaseText?: string;
  increaseText?: string;
  operationalProfitMargin?: number;
  operationalProfitMarginChange?: number;
  isOperationalProfitMarginChangePositive?: boolean;
  showOperationalProfitMargin?: boolean;
  operationalChangeText?: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, CardComponent, TranslocoDirective],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  financialMetrics: FinancialMetric[] = [];
  isRTL: boolean = true;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.isRTL = this.translocoService.getActiveLang() === 'ar';
    this.initializeMetrics();
  }

  initializeMetrics(): void {
    const t = (key: string) => this.translocoService.translate(`dashboard.cards.${key}`);
    
    this.financialMetrics = [
      {
        title: t('salesGrowth'),
        year: '2024',
        value: '125.9%',
        valueDescription: 'نسبة نمو المبيعات الحالية',
        comparisonValue: '36%',
        percentageChange: 6,
        isPositiveChange: true,
        comparisonText: t('previousYear'),
        showInfo: true,
        averageYearsText: `18% ${t('average3Years')}`,
        increaseText: t('increased'),
        operationalProfitMargin: 30.2,
        operationalProfitMarginChange: 4.8,
        isOperationalProfitMarginChangePositive: true,
        showOperationalProfitMargin: true,
        operationalChangeText: 'زادت بنسبة'
      },
      {
        title: t('salesScope'),
        year: '2024',
        value: 'ر.س 10.1 م - ر.س 50 م',
        valueDescription: 'نطاق المبيعات السنوي',
        comparisonValue: 'ر.س 10.1 - ر.س 50',
        comparisonText: t('lastYearSalesScope'),
        showInfo: true,
        averageYearsText: ''
      },
      {
        title: t('operatingMargin'),
        year: '2024',
        value: '9.2%',
        valueDescription: 'هامش الربح التشغيلي',
        comparisonValue: '1.6%',
        percentageChange: 7.6,
        isPositiveChange: true,
        comparisonText: t('lastYear'),
        showInfo: true,
        averageYearsText: `55% ${t('average3Years')}`,
        increaseText: t('increased'),
        operationalProfitMargin: 1.6,
        operationalProfitMarginChange: 7.6,
        isOperationalProfitMarginChangePositive: true,
        showOperationalProfitMargin: true,
        operationalChangeText: 'زادت بنسبة'
      },
      {
        title: t('netMargin'),
        year: '2024',
        value: '8.90%',
        valueDescription: 'صافي الربح الحالي',
        comparisonValue: '1.40%',
        percentageChange: 7.50,
        isPositiveChange: true,
        comparisonText: t('lastYear'),
        showInfo: true,
        averageYearsText: `5.20% ${t('average3Years')}`,
        increaseText: t('increased'),
        operationalProfitMargin: 2.8,
        operationalProfitMarginChange: 6.1,
        isOperationalProfitMarginChangePositive: true,
        showOperationalProfitMargin: true,
        operationalChangeText: 'زادت بنسبة'
      },
      {
        title: t('totalEquity'),
        year: '2024',
        value: 'ر.س 1.5 م',
        valueDescription: 'إجمالي حقوق الملكية',
        comparisonValue: 'ر.س 0.5 م',
        percentageChange: 0.9,
        isPositiveChange: true,
        comparisonText: t('lastYear'),
        showInfo: true,
        averageYearsText: `ر.س 1 م ${t('average3Years')}`,
        increaseText: t('increased')
      },
      {
        title: t('debtToEquity'),
        year: '2024',
        value: '0%',
        valueDescription: 'نسبة الدين إلى حقوق الملكية',
        comparisonValue: '0%',
        comparisonText: t('debtToEquity'),
        showInfo: true,
        averageYearsText: `0% ${t('average3Years')}`
      },
      {
        title: t('accountsReceivable'),
        year: '2024',
        value: 'ر.س 934.1 ألف',
        valueDescription: 'حسابات الذمم المدينة',
        comparisonValue: 'ر.س 1.2 م',
        percentageChange: 281.9,
        isPositiveChange: false,
        comparisonText: t('lastYear'),
        showInfo: true,
        averageYearsText: `ر.س 1.1 م ${t('average3Years')}`,
        decreaseText: t('decreased')
      },
      {
        title: t('accountsPayable'),
        year: '2024',
        value: '59.2%',
        valueDescription: 'حسابات الذمم الدائنة',
        comparisonValue: '58%',
        percentageChange: 1.2,
        isPositiveChange: true,
        comparisonText: t('salesGrowth2022'),
        showInfo: true,
        averageYearsText: `55% ${t('average3Years')}`,
        increaseText: t('increased'),
        operationalProfitMargin: 45.5,
        operationalProfitMarginChange: 13.7,
        isOperationalProfitMarginChangePositive: false,
        showOperationalProfitMargin: true,
        operationalChangeText: 'انخفضت بنسبة'
      }
    ];
  }
} 