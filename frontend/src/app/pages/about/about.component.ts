// Libraries
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
// Components
import { ClientBlockComponent } from './components/client-block/client-block.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { StaffCardComponent } from '../../components/staff-card/staff-card.component';
import { CareerCardComponent } from './components/career-card/career-card.component';
// Services
import { StrapiService } from '../../api/strapi.service';
import { IClient, IMember, IOffice, ICareer, APIResponseModel } from '../../../util/interfaces';
import { TranslationHelper } from '../../shared/translation-helper';
import { environment } from '../../../environments/environment';
import { CareerService } from '../../shared/career.service';
import { OfficeService } from '../../shared/office.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    ClientBlockComponent,
    LocationCardComponent,
    StaffCardComponent,
    CareerCardComponent,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutComponent implements OnInit, OnDestroy {
  offices$: Observable<IOffice[]>;
  careers: ICareer[] = [];
  clients: IClient[] = [];
  members: IMember[] = [];
  memberNames: string[] = [];
  selectedMember: IMember | undefined;
  strapiUrl = environment.strapiMediaUrl;
  private intervalId: any;
  private timeoutId: any;
  currentLanguage: string = 'en';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private strapiService: StrapiService,
    private route: ActivatedRoute,
    private translationHelper: TranslationHelper,
    private careerService: CareerService,
    private officeService: OfficeService,
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
    this.offices$ = this.officeService.offices$;
  }

  ngOnInit(): void {
    this.careers = this.careerService.getAllCareers();
    this.officeService.offices$.subscribe();
    // Meta info for SEO
    this.titleService.setTitle('About us - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Browse About up to learn more about our amazing clients and team at Perpeture.' });


    this.strapiService.getAllClients().subscribe((response: APIResponseModel) => {
      this.clients = response.data.map((client: IClient) => ({
        ...client,
        company_logo: {
          ...client.company_logo,
          url: this.strapiUrl + client.company_logo.url || "../../../assets/images/img_n.a.png"
        }
      }));
    });

    this.strapiService.getAllMembers().subscribe((response: APIResponseModel) => {
      this.members = response.data
        .map((member: IMember) => ({
          ...member,
          portrait_image: {
            ...member.portrait_image,
            url: this.strapiUrl + member.portrait_image.url || "../../../assets/images/img_n.a.png"
          }
        }))
        .sort((a: IMember, b: IMember) => {
          const lastNameComparison = a.last_name.localeCompare(b.last_name);
          if (lastNameComparison !== 0) {
            return lastNameComparison;
          }
          return a.first_name.localeCompare(b.first_name);
        });

      // Set the default member
      if (this.members.length > 0) {
        this.selectedMember = this.members[0];
      }
    });

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  displayMember(documentId: string): void {
    const selected = this.members.find(member => member.documentId === documentId);
    if (selected) {
      this.selectedMember = selected;
    }
  }

  onKeyDown(event: KeyboardEvent, documentId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.displayMember(documentId);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
