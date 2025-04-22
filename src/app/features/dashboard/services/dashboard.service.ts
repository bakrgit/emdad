import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FinancialMetric } from '../../../shared/models/financial-metric.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  
  getFinancialMetrics(year: number): Observable<FinancialMetric[]> {
    // Mock data for now
    return of([
      {
        title: 'نمو المبيعات',
        year: 2024,
        value: '125.9%',
        comparisonText: 'نمو السنة السابقة',
        comparisonValue: '36%',
        percentageChange: 6,
        isPositiveChange: true
      },
      {
        title: 'نطاق المبيعات',
        year: 2024,
        value: 'ر.س 10.1 - ر.س 50 م',
        comparisonText: 'نطاق المبيعات العام الماضي',
        comparisonValue: 'ر.س 10.1 - ر.س 50'
      }
    ]);
  }
  
  getDashboardSummary(): Observable<any> {
    return of({
      title: 'مؤشرات الأداء الرئيسية لقائمة الدخل لعام 2024',
      lastUpdated: new Date()
    });
  }
} 