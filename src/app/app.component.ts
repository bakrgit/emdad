import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './shared/services/language.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'emdad-app';
  
  constructor(
    private languageService: LanguageService,
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    // Initialize language service and monitor changes
    this.languageService.currentLang$.subscribe(lang => {
      // Apply direction class to the body for better RTL/LTR handling
      this.renderer.setAttribute(document.body, 'dir', lang === 'ar' ? 'rtl' : 'ltr');
      this.renderer.addClass(document.body, 'lang-' + lang);
      
      // Remove the opposite language class
      this.renderer.removeClass(document.body, 'lang-' + (lang === 'ar' ? 'en' : 'ar'));
    });
  }
}
