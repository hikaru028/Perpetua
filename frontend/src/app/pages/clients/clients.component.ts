// Libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
// Services
import { ClientService } from '../../shared/client.service';
import { TranslationHelper } from '../../shared/translation-helper';
import { IClient } from '../../../util/interfaces';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})

export class ClientsComponent implements OnInit, OnDestroy {
  clients$: Observable<IClient[]>;
  selectedClientIndex: number = 0;
  currentLanguage: string = 'en';

  constructor(private titleService: Title, private metaService: Meta, private clientService: ClientService, private translationHelper: TranslationHelper) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
    this.clients$ = this.clientService.getClients();
  }

  ngOnInit(): void {
    // Meta info for SEO
    this.titleService.setTitle('Our Clients - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Browse our projects searched by keywords to learn more about the amazing things we have done at Perpeture.' });
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }

  onClientSelected(index: number): void {
    this.selectedClientIndex = index;
  }
}