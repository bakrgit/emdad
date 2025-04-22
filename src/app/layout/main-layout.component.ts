import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/ui/navbar/navbar.component';
import { SidebarComponent } from '../shared/ui/sidebar/sidebar.component';
import { LanguageService, Language } from '../shared/services/language.service';
import { TranslocoDirective } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent, TranslocoDirective],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  companyName: string = 'شركة الجوف للتنمية الزراعية';
  logoUrl: string = 'assets/Images/Emdad E-Logo.png';
  isSidebarOpen: boolean = true;
  currentLanguage: string = 'العربية';
  isRtlLayout: boolean = true;
  
  private langSubscription: Subscription | null = null;
  
  constructor(private languageService: LanguageService) {}
  
  ngOnInit(): void {
    // Get current language first on init
    this.languageService.currentLang$.pipe(take(1)).subscribe((lang: Language) => {
      this.isRtlLayout = lang === 'ar';
    });
    
    this.updateLanguageDisplay();
    
    // Subscribe to language changes
    this.langSubscription = this.languageService.currentLang$.subscribe((lang: Language) => {
      this.updateLanguageDisplay();
      this.isRtlLayout = lang === 'ar';
    });
  }
  
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
  
  updateLanguageDisplay(): void {
    this.currentLanguage = this.languageService.getCurrentLanguageDisplay();
  }
  
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  onLanguageChange(): void {
    this.languageService.toggleLanguage();
  }
  
  onNotification(): void {
    // Add your notification logic here
  }
  
  onSearch(query: string): void {
    // Add your search logic here
    console.log('Search query:', query);
  }
} 