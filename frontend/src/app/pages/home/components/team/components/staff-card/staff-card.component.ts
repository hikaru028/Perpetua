import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMember } from '../../../../../../../util/interfaces';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-staff-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StaffCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() members: IMember[] = [];
  shuffledMembers: IMember[][] = [];
  @ViewChildren('swiperRef') swiperContainers!: QueryList<ElementRef>;

  private swiperInstances: any[] = [];
  private hoverTimers: { [key: number]: any } = {};
  private initialIndex: number = 0;

  ngOnInit() {
    if (this.members.length > 0) {
      this.generateShuffledMembers();
    }
  }

  ngAfterViewInit(): void {
    this.swiperContainers.forEach((swiperContainer: ElementRef) => {
      const swiperInstance = swiperContainer.nativeElement.swiper;
      if (swiperInstance) {
        this.swiperInstances.push(swiperInstance);
      }
    });
  }

  ngOnDestroy(): void {
    Object.values(this.hoverTimers).forEach((timer) => clearInterval(timer));
  }

  generateShuffledMembers(): void {
    const numberOfMembers = this.members.length;
    const groupSize = 6;

    for (let i = 0; i < groupSize; i++) {
      const resultArray: IMember[] = [];
      let index = i;

      while (index < numberOfMembers) {
        resultArray.push(this.members[index]);
        index += groupSize;
      }

      if (resultArray.length > 0) {
        this.shuffledMembers.push(resultArray);
      }
    }
  }

  onMouseEnter(index: number): void {
    this.initialIndex = this.swiperInstances[index].activeIndex;
    if (this.swiperInstances[index]) {
      this.swiperInstances[index].slideNext();
      this.hoverTimers[index] = setInterval(() => {
        this.swiperInstances[index].slideNext(4000);
      }, 4000);
    }
  }

  onMouseLeave(index: number): void {
    if (this.hoverTimers[index]) {
      clearInterval(this.hoverTimers[index]);
      delete this.hoverTimers[index];
    }
    this.swiperInstances[index].slideNext(4000);
  }
}
