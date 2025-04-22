import { Component, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LanguageService, Language } from '../../services/language.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

interface MenuItem {
  icon: string;
  translationKey: string;
  route: string;
  active: boolean;
  iconPath?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoDirective],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = true;
  @Input() isRtl: boolean = true;
  
  currentDirection: 'rtl' | 'ltr' = 'rtl';
  private langSubscription: Subscription | null = null;
  
  menuItems: MenuItem[] = [
    { 
      icon: '', 
      translationKey: 'sidebar.financialStatements', 
      route: '/financial', 
      active: true,
      iconPath: 'assets/Icons/Financial-Icon.svg'
    },
    { 
      icon: 'bi bi-people', 
      translationKey: 'sidebar.indicatorsManagement', 
      route: '/indicators', 
      active: false,
      iconPath: 'assets/Icons/Credit-Icon.svg'
    },
    { 
      icon: '', 
      translationKey: 'sidebar.commercialRegister', 
      route: '/commercial-register', 
      active: false,
      iconPath: 'assets/Icons/Card-Info-Icon.svg'
    },
    { 
      icon: '', 
      translationKey: 'sidebar.help', 
      route: '/help', 
      active: false,
      iconPath: 'assets/Icons/Support-Icon.svg'
    },
    { 
      icon: '', 
      translationKey: 'sidebar.settings', 
      route: '/settings', 
      active: false,
      iconPath: 'assets/Icons/Settings-Icon.svg'
    },
    { 
      icon: '', 
      translationKey: 'sidebar.logout', 
      route: '/logout', 
      active: false,
      iconPath: 'assets/Icons/Logout-Icon.svg'
    }
  ];

  logoPath: string = 'assets/Images/Emdad-E-Logo.png';
  
  constructor(
    private languageService: LanguageService,
    private translocoService: TranslocoService,
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    // Set direction based on input
    this.updateDirection();
    
    // Subscribe to language changes
    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      // Update direction when language changes
      this.updateDirection();
      
      // Force reflow to ensure layout changes are applied
      const sidebarElement = document.querySelector('.sidebar');
      if (sidebarElement) {
        this.renderer.addClass(sidebarElement, 'direction-change');
        setTimeout(() => {
          this.renderer.removeClass(sidebarElement, 'direction-change');
        }, 50);
      }
    });
  }
  
  ngOnChanges(): void {
    // Update direction when isRtl input changes
    this.updateDirection();
  }
  
  private updateDirection(): void {
    this.currentDirection = this.isRtl ? 'rtl' : 'ltr';
  }
  
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
  
  toggleMenuItem(index: number): void {
    this.menuItems.forEach((item, i) => {
      item.active = i === index;
    });
  }
} 