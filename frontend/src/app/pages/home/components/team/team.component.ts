import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StaffCardComponent } from './components/staff-card/staff-card.component';
import { IMember, APIResponseModel } from '../../../../../util/interfaces';
import { StrapiService } from '../../../../api/strapi.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink, StaffCardComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  members: IMember[] = [];
  displayedMembers: IMember[] = [];
  strapiService = inject(StrapiService);
  strapiUrl = 'http://localhost:1337/';
  intervalId: any;

  ngOnInit(): void {
    this.strapiService.getAllMembers().subscribe((result: APIResponseModel) => {
      this.members = result.data;
      this.members = this.members.map(member => ({
        ...member,
        portrait_image: {
          ...member.portrait_image,
          url: `${this.strapiUrl}${member.portrait_image.url.startsWith('/') ? '' : '/'}${member.portrait_image.url}` || "../../../../../assets/images/img_n.a.png" || "../../../../../assets/images/img_n.a.png"
        }
      }));

      this.shuffleMembers();

      this.displayedMembers = this.members.slice(0, 6);
      this.startRotation();
    }, error => {
      console.error('Error fetching members:', error);
    });
  }

  shuffleMembers(): void {
    this.members = this.members.sort(() => Math.random() - 0.5);
  }

  startRotation(): void {
    let currentIndex = 6;

    this.intervalId = setInterval(() => {
      if (this.members.length <= 6) return;

      const memberIndexToReplace = Math.floor(Math.random() * 6);

      this.displayedMembers[memberIndexToReplace] = this.members[currentIndex];

      currentIndex = (currentIndex + 1) % this.members.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
