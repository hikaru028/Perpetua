// Libraries
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
// Services
import { IOffice } from '../../../../../util/interfaces';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent implements OnInit {
  @Input() offices: IOffice[] = [];
  currentTime: Date = new Date();

  ngOnInit(): void {
    for (let office of this.offices) {
      this.getCurrentTime(office.office_location);
    }
  }

  getCurrentTime(location: string) {
    this.currentTime = new Date(new Date().toLocaleString("en-US", { timeZone: location }));
  }
}
