// Libraries
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { ClientBlockComponent } from './components/client-block/client-block.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { StaffCardComponent } from './components/staff-card/staff-card.component';
import { CallActionComponent } from '../../components/call-action/call-action.component';
// Services
import { StrapiService } from '../../api/strapi.service';
import { IClient, IMember, IOffice, APIResponseModel } from '../../../util/interfaces';
import { TranslationHelper } from '../../shared/translation-helper';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    ClientBlockComponent,
    LocationCardComponent,
    StaffCardComponent,
    CallActionComponent,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutComponent implements OnInit, OnDestroy {
  offices: IOffice[] = [];
  clients: IClient[] = [];
  members: IMember[] = [];
  locations: string[] = [];
  memberNames: string[] = [];
  selectedMember: IMember | undefined;
  strapiUrl = 'http://localhost:1337';
  private intervalId: any;
  private timeoutId: any;
  currentLanguage: string = 'en';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private strapiService: StrapiService,
    private route: ActivatedRoute,
    private translationHelper: TranslationHelper
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnInit(): void {
    // Meta info for SEO
    this.titleService.setTitle('About us - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Browse About up to learn more about our amazing clients and team at Perpeture.' });

    this.strapiService.getAllOffices().subscribe((response: APIResponseModel) => {
      this.offices = response.data.map((office: IOffice) => ({
        ...office,
        office_image: {
          ...office.office_image,
          url: this.strapiUrl + office.office_image.url || "../../../assets/images/img_n.a.png"
        },
        currentTime: this.getCurrentTime(office.office_location)
      }))
        .sort((a: IOffice, b: IOffice) => a.office_location.localeCompare(b.office_location));
      this.locations = this.offices.map((office: IOffice) => office.office_location);

      this.alignToNextMinute();
    });

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

  alignToNextMinute(): void {
    const now = new Date();
    const millisecondsUntilNextMinute = (60 - now.getSeconds()) * 1000;

    this.timeoutId = setTimeout(() => {
      this.updateCurrentTimes();
      this.intervalId = setInterval(() => {
        this.updateCurrentTimes();
      }, 60000);
    }, millisecondsUntilNextMinute);
  }

  updateCurrentTimes(): void {
    this.offices.forEach(office => {
      office.currentTime = this.getCurrentTime(office.office_location);
    });
  }

  getCurrentTime(location: string): string {
    if (location === 'Christchurch') location = 'Pacific/Auckland';
    if (location === 'Sydney') location = 'Australia/Sydney';
    if (location === 'Yokohama') location = 'Asia/Tokyo';

    try {
      const date = new Date().toLocaleString("en-US", {
        timeZone: location,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      return date;
    } catch (error) {
      console.error(`Error fetching time for location ${location}:`, error);
      return "00:00 AM";
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
