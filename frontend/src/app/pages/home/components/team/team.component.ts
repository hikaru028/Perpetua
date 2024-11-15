// Libraries
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { StaffCardComponent } from './components/staff-card/staff-card.component';
// Services
import { IMember, APIResponseModel } from '../../../../../util/interfaces';
import { StrapiService } from '../../../../api/strapi.service';
import { TranslationHelper } from '../../../../shared/translation-helper';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink, StaffCardComponent, TranslateModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit, OnDestroy {
  members: IMember[] = [];
  strapiService = inject(StrapiService);
  strapiUrl = 'http://localhost:1337/';
  intervalId: any;
  currentLanguage: string = 'en';

  constructor(private translationHelper: TranslationHelper) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.strapiService.getAllMembers().subscribe((result: APIResponseModel) => {
      this.members = result.data;
      this.members = this.members.map(member => ({
        ...member,
        portrait_image: {
          ...member.portrait_image,
          url: this.strapiUrl + member.portrait_image.url || "../../../../../assets/images/img_n.a.png"
        }
      }));
    }, error => {
      console.error('Error fetching members:', error);
    });
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }
}
