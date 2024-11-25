// Libraries
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { ClientCardComponent } from './components/client-card/client-card.component';
// Services
import { IClient, APIResponseModel } from '../../../../../util/interfaces';
import { StrapiService } from '../../../../api/strapi.service';
import { TranslationHelper } from '../../../../shared/translation-helper';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ClientCardComponent, RouterLink, CommonModule, TranslateModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: IClient[] = [];
  selectedClientIndex: number = 0;
  strapiService = inject(StrapiService);
  strapiUrl = environment.strapiMediaUrl;
  currentLanguage: string = 'en';

  constructor(private translationHelper: TranslationHelper) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.strapiService.getAllClients().subscribe((result: APIResponseModel) => {
      this.clients = result.data;
      this.clients = this.clients
        .map(client => ({
          ...client,
          company_logo: {
            ...client.company_logo,
            url: this.strapiUrl + client.company_logo.url || "../../../../../assets/images/img_n.a.png"
          }
        }))
        .sort((a, b) => a.company_name.localeCompare(b.company_name));
    }, error => {
      console.error('Error fetching clients:', error);
    });
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }

  onClientSelected(index: number): void {
    this.selectedClientIndex = index;
  }
}