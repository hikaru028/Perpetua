// Libraries
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Components
import { ClientBlockComponent } from './components/client-block/client-block.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { StaffCardComponent } from './components/staff-card/staff-card.component';
import { CallActionComponent } from '../../components/call-action/call-action.component';
// Services
import { StrapiService } from '../../api/strapi.service';
import { IClient, IMember, IOffice, APIResponseModel } from '../../../util/interfaces';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    ClientBlockComponent,
    LocationCardComponent,
    StaffCardComponent,
    CallActionComponent,
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutComponent implements OnInit {
  offices: IOffice[] = [];
  clients: IClient[] = [];
  members: IMember[] = [];
  locations: string[] = [];
  memberNames: string[] = [];
  strapiUrl = 'http://localhost:1337';

  constructor(private titleService: Title, private metaService: Meta, private strapiService: StrapiService) {
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
        }
      }));
      this.locations = this.offices.map((office: IOffice) => office.office_location);
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
      this.members = response.data.map((member: IMember) => ({
        ...member,
        portrait_image: {
          ...member.portrait_image,
          url: this.strapiUrl + member.portrait_image.url || "../../../assets/images/img_n.a.png"
        }
      }));
      this.memberNames = this.members.map((member: IMember) => member.first_name + ' ' + member.last_name);
    });
  }
}
