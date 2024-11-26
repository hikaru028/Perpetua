import { Component, ElementRef, ViewChild, Input, inject, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-language-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-footer.component.html',
  styleUrls: ['./language-footer.component.scss'] // Updated to "styleUrls"
})
export class LanguageFooterComponent implements AfterViewInit {
  isOpen: boolean = false;
  selectedLanguage: string = 'English';
  allLanguages: { key: string, label: string, code: string }[] = [
    { key: 'korean', label: '한국어', code: 'ko' },
    { key: 'japanese', label: '日本語', code: 'ja' },
    { key: 'english', label: 'English', code: 'en' }
  ];

  @ViewChild('languageForm', { static: false }) formElement!: ElementRef<HTMLFormElement>;
  @ViewChild('currentLangWrapper', { static: false }) currentLangWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('chevronIcon', { static: false }) chevronIcon!: ElementRef<HTMLElement>;

  translate: TranslateService = inject(TranslateService);
  renderer = inject(Renderer2);

  get filteredLanguages() {
    return this.allLanguages.filter(lang => lang.label !== this.selectedLanguage);
  }

  ngAfterViewInit() { }

  toggleOption() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.onOpenOption();
    } else {
      this.onCloseOption();
    }
  }

  onOpenOption() {
    if (this.formElement) {
      this.renderer.addClass(this.formElement.nativeElement, 'visible');
    }
    if (this.currentLangWrapper) {
      this.renderer.addClass(this.currentLangWrapper.nativeElement, 'visible');
    }
    if (this.chevronIcon) {
      this.renderer.addClass(this.chevronIcon.nativeElement, 'visible');
    }
  }

  onCloseOption() {
    if (this.formElement) {
      this.renderer.removeClass(this.formElement.nativeElement, 'visible');
    }
    if (this.currentLangWrapper) {
      this.renderer.removeClass(this.currentLangWrapper.nativeElement, 'visible');
    }
    if (this.chevronIcon) {
      this.renderer.removeClass(this.chevronIcon.nativeElement, 'visible');
    }
    this.isOpen = false;
  }

  onLanguageChange(language: string, code: string, event: Event) {
    event.stopPropagation();
    this.selectedLanguage = language;
    this.translate.use(code.trim());

    this.onCloseOption();
  }

  onToggleOptionKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleOption();
    }
  }
}