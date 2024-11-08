import { Component, inject, OnInit } from '@angular/core';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, RouterLink, TranslateModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  translate: TranslateService = inject(TranslateService);
  currentLanguage: string = 'en';

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
  }
}
