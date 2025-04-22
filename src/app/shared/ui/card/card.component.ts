import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() year: string | number = '';
  @Input() icon: string = '';
  @Input() value: string | number = '';
  @Input() valueDescription: string = '';
  @Input() subValue: string | number = '';
  @Input() percentageChange: number = 0;
  @Input() isPositiveChange: boolean = true;
  @Input() comparisonPeriod: string = '';
  @Input() showInfo: boolean = false;
  @Input() averageYearsText: string = '';
  @Input() isRTL: boolean = true;
  @Input() decreaseText: string = '';
  @Input() increaseText: string = '';
  @Input() operationalProfitMargin: number = 0;
  @Input() operationalProfitMarginChange: number = 0;
  @Input() isOperationalProfitMarginChangePositive: boolean = true;
  @Input() showOperationalProfitMargin: boolean = false;
  @Input() operationalChangeText: string = 'زادت بنسبة';

  hasRiyalSymbol(): boolean {
    return this.value.toString().includes('ر.س') || this.value.toString().includes('SAR');
  }

  formatRiyalValue(): string {
    let val = this.value.toString();
    return val.replace('ر.س', '').replace('SAR', '').trim();
  }

  formatRiyalSubValue(): string {
    if (!this.subValue) return '';
    let val = this.subValue.toString();
    return val.replace('ر.س', '').replace('SAR', '').trim();
  }
  
  isSalesScope(): boolean {
    return this.title.includes('نطاق المبيعات') || this.title.includes('Sales Scope');
  }
  
  formatSubValueForSalesRange(): string {
    if (!this.subValue) return '';
    let val = this.subValue.toString();
    // Just return the value as is for the blue tag
    return val;
  }

  extractNumericPart(text: string): string {
    if (!text) return '';
    
    // First handle the case with Riyal symbols
    if (text.includes('ر.س') || text.includes('SAR')) {
      const parts = text.split(' ');
      for (const part of parts) {
        if (part.includes('ر.س') || part.includes('SAR')) {
          return part.replace('ر.س', '').replace('SAR', '').trim();
        }
      }
    }
    
    // For percentage or other numeric values
    const numericMatch = text.match(/^([\d.]+%?)/);
    if (numericMatch && numericMatch[1]) {
      return numericMatch[1];
    }
    
    return '';
  }

  extractTextPart(text: string): string {
    if (!text) return '';
    
    // For Riyal case
    if (text.includes('ر.س') || text.includes('SAR')) {
      const parts = text.split(' ');
      let indexOfRiyal = -1;
      
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].includes('ر.س') || parts[i].includes('SAR')) {
          indexOfRiyal = i;
          break;
        }
      }
      
      if (indexOfRiyal !== -1) {
        return parts.slice(indexOfRiyal + 1).join(' ');
      }
    }
    
    // For percentage or other values
    const numericMatch = text.match(/^([\d.]+%?)\s+(.*)/);
    if (numericMatch && numericMatch[2]) {
      return numericMatch[2];
    }
    
    return text;
  }

  formatAverageYearsText(): string {
    if (!this.averageYearsText) return '';
    
    let text = this.averageYearsText;
    
    // If the average years text contains Riyal symbols, format it with an icon
    if (text.includes('ر.س') || text.includes('SAR')) {
      const parts = text.split(' ');
      let valueWithRiyal = '';
      let restOfText = '';
      
      for (const part of parts) {
        if (part.includes('ر.س') || part.includes('SAR')) {
          valueWithRiyal = part;
        } else {
          if (restOfText) restOfText += ' ';
          restOfText += part;
        }
      }
      
      if (valueWithRiyal) {
        const formattedValue = valueWithRiyal.replace('ر.س', '').replace('SAR', '').trim();
        return `<div class="average-with-icon"><span>${formattedValue}</span><img src="assets/Icons/Card-Riyal-Icon.svg" alt="Riyal" class="riyal-icon-small"></div> ${restOfText}`;
      }
    }
    
    return text;
  }
  
  getChangeColorClass(): string {
    if (this.percentageChange === 0) return 'neutral-change';
    return this.isPositiveChange ? 'positive-change' : 'negative-change';
  }
  
  getOperationalProfitMarginChangeColorClass(): string {
    if (this.operationalProfitMarginChange === 0) return 'neutral-change';
    return this.isOperationalProfitMarginChangePositive ? 'positive-change' : 'negative-change';
  }
  
  getAverageTagClass(): string {
    return 'average-tag';
  }
  
  getSalesRangeClass(): string {
    return 'sales-range-tag';
  }
  
  getZeroPercentageClass(): string {
    return 'zero-percentage-tag';
  }
} 