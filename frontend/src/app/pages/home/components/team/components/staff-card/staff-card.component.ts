import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMember } from '../../../../../../../util/interfaces';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-staff-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-card.component.html',
  styleUrl: './staff-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StaffCardComponent implements OnInit {
  @Input() members: IMember[] = [];
  shuffledMembers: IMember[][] = [];

  ngOnInit() {
    if (this.members.length >= 6) {
      for (let i = 0; i < 6; i++) {
        this.shuffledMembers.push(this.generateCyclicArray(i));
      }
    }
  }

  generateCyclicArray(startIndex: number): IMember[] {
    const resultArray: IMember[] = [];
    const totalMembers = this.members.length;

    for (let i = 0; i < 6; i++) {
      const index = (startIndex + i * 6) % totalMembers;
      resultArray.push(this.members[index]);
    }

    return resultArray;
  }
}
