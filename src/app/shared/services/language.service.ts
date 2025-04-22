import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { BehaviorSubject } from 'rxjs';

export type Language = 'ar' | 'en';

export interface LanguageOption {
  code: Language;
  displayText: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<Language>('ar');
  currentLang$ = this.currentLangSubject.asObservable();

  languageOptions: LanguageOption[] = [
    { code: 'ar', displayText: 'العربية' },
    { code: 'en', displayText: 'English' }
  ];

  constructor(private translocoService: TranslocoService) {
    // Initialize language on service creation
    this.initializeLanguage();
    
    // Subscribe to Transloco language changes
    this.translocoService.langChanges$.subscribe((lang: string) => {
      if (lang && (lang === 'ar' || lang === 'en')) {
        this.currentLangSubject.next(lang as Language);
      }
    });
  }
  
  private initializeLanguage(): void {
    // Get language from local storage or fallback to Arabic
    const savedLang = localStorage.getItem('language') as Language;
    const activeLang = this.translocoService.getActiveLang();
    
    const effectiveLang = (savedLang && ['ar', 'en'].includes(savedLang)) ? savedLang : 
                          (activeLang && ['ar', 'en'].includes(activeLang)) ? activeLang as Language : 'ar';
    
    this.setLanguage(effectiveLang);
  }

  setLanguage(lang: Language): void {
    console.log(`Setting language to: ${lang}`);
    this.translocoService.setActiveLang(lang);
    this.currentLangSubject.next(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction for more reliable RTL/LTR switching
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    htmlElement.setAttribute('lang', lang);
    
    // Force a style refresh by adding and removing a dummy class
    const bodyElement = document.body;
    bodyElement.classList.add('language-switch');
    setTimeout(() => {
      bodyElement.classList.remove('language-switch');
    }, 50);
  }

  toggleLanguage(): void {
    const currentLang = this.currentLangSubject.value;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLang);
  }

  getCurrentLanguageDisplay(): string {
    const currentLang = this.currentLangSubject.value;
    // Return the opposite language text - when current is 'ar', show 'English' and vice versa
    const oppositeCode = currentLang === 'ar' ? 'en' : 'ar';
    return this.languageOptions.find(option => option.code === oppositeCode)?.displayText || 'English';
  }
  
  getCurrentLanguage(): Language {
    return this.currentLangSubject.value;
  }
} 