import { Component, ElementRef, ViewChild, Input, inject, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LanguagesComponent implements AfterViewInit {
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
  cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef to force UI update

  get filteredLanguages() {
    return this.allLanguages.filter(lang => lang.label !== this.selectedLanguage);
  }

  ngAfterViewInit() {
    // This can be left empty if no specific logic is needed here.
  }

  toggleOption() {
    this.isOpen = !this.isOpen;
    this.updateDropdownVisibility();
  }

  updateDropdownVisibility() {
    if (this.isOpen) {
      this.onMouseEnter();
    } else {
      this.onCloseOption();
    }
  }

  onMouseEnter() {
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
    event.stopPropagation(); // Prevent other unintended clicks
    this.selectedLanguage = language;

    // Update the language immediately
    this.translate.use(code.trim()).subscribe(() => {
      this.cdr.detectChanges(); // Force Angular to detect changes and update the UI
      this.onCloseOption(); // Close the dropdown properly after the language change
    });
  }

  onToggleOptionKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleOption();
    }
  }
}
