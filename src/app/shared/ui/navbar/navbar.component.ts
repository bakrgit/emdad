import { Component, Input, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslocoDirective, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() companyName: string = '';
  @Input() logoUrl: string = '';
  @Input() currentLanguage: string = '';
  @Input() sidebarOpen: boolean = true;
  
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() changeLanguage = new EventEmitter<void>();
  @Output() notification = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();
  
  mobileMenuOpen: boolean = false;
  isMobileView: boolean = false;
  
  constructor(@Inject(DOCUMENT) public document: Document) {
    this.checkScreenSize();
  }
  
  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobileView = window.innerWidth < 1024;
    if (!this.isMobileView && this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }
  
  toggleSidebarMenu(): void {
    this.toggleSidebar.emit();
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  
  onLanguageChange(): void {
    this.changeLanguage.emit();
    if (this.isMobileView) {
      this.mobileMenuOpen = false;
    }
  }
  
  onNotificationClick(): void {
    this.notification.emit();
    if (this.isMobileView) {
      this.mobileMenuOpen = false;
    }
  }
  
  onSearch(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.search.emit(searchQuery);
  }
} 