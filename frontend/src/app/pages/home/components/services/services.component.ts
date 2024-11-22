// Libraries
import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// Components
import { ServiceCardComponent } from './components/service-card/service-card.component';
// Services
import { TranslationHelper } from '../../../../shared/translation-helper';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, RouterLink, TranslateModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})

export class ServicesComponent implements OnDestroy {
  currentLanguage: string = 'en';

  private langChangeSubscription!: Subscription;

  constructor(private translationHelper: TranslationHelper, private translate: TranslateService) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }

    this.translationHelper.unsubscribe();
  }
}
