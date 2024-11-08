import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { RouterLink } from '@angular/router';
import { IClient, APIResponseModel } from '../../../../../util/interfaces';
import { StrapiService } from '../../../../api/strapi.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ClientCardComponent, RouterLink, CommonModule, TranslateModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {
  clients: IClient[] = [];
  selectedClientIndex: number = 0;
  strapiService = inject(StrapiService);
  strapiUrl = 'http://localhost:1337';
  translate: TranslateService = inject(TranslateService);

  ngOnInit(): void {
    this.strapiService.getAllClients().subscribe((result: APIResponseModel) => {
      this.clients = result.data;
      this.clients = this.clients.map(client => ({
        ...client,
        company_logo: {
          ...client.company_logo,
          url: this.strapiUrl + client.company_logo.url || "../../../../../assets/images/img_n.a.png"
        }
      }));
    }, error => {
      console.error('Error fetching clients:', error);
    });
  }

  onClientSelected(index: number): void {
    this.selectedClientIndex = index;
  }
}
