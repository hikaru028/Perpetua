import { Component, inject, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { SlidesSkeletonComponent } from '../../../../../../components/skeletons/slides-skeleton/slides-skeleton.component';
// Services
import { StrapiService } from '../../../../../../api/strapi.service';
import { ISlide, APIResponseModel } from '../../../../../../../util/interfaces';

@Component({
  selector: 'app-slides',
  standalone: true,
  imports: [CommonModule, SlidesSkeletonComponent],
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit, AfterViewInit, OnDestroy {
  strapiService = inject(StrapiService);
  cdr = inject(ChangeDetectorRef);

  slides: ISlide[] = [];
  isLoading: boolean = false;
  autoSlideInterval: any;
  currentIndex: number = 0;
  previousIndex: number = -1;
  direction: 'next' | 'prev' = 'next';

  // Arrays for alternating between two batches of slides
  array1: ISlide[] = [];
  array2: ISlide[] = [];
  currentArray: 'array1' | 'array2' = 'array1';

  ngOnInit(): void {
    this.isLoading = true;

    this.strapiService.getSlides().subscribe((result: APIResponseModel) => {
      this.slides = result.data;
      this.slides = this.slides.map(slide => ({
        ...slide,
        slide_image: {
          ...slide.slide_image,
          url: slide.slide_image.url || "../../../../../assets/images/img_n.a.png"
        }
      }));

      // Initialize array1 and array2 with the same slide data
      this.array1 = [...this.slides];
      this.array2 = [...this.slides];

      this.isLoading = false;
      this.startAutoSlide();
    }, error => {
      console.error('Error fetching slides:', error);
    });
  }

  ngAfterViewInit(): void {
    // Auto slide was moved to ngOnInit after data is loaded.
  }

  ngOnDestroy(): void {
    this.clearAutoSlideInterval();
  }

  controlCarousel(direction: 'prev' | 'next'): void {
    this.previousIndex = this.currentIndex;
    this.direction = direction;

    if (direction === 'next') {
      this.currentIndex++;
      if (this.currentIndex >= this.getCurrentSlides().length) {
        // Switch arrays when reaching the end of the current one
        this.currentArray = this.currentArray === 'array1' ? 'array2' : 'array1';
        this.currentIndex = 0; // Reset to start of new array
      }
    } else if (direction === 'prev') {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        // Switch arrays when reaching the beginning of the current one
        this.currentArray = this.currentArray === 'array1' ? 'array2' : 'array1';
        this.currentIndex = this.getCurrentSlides().length - 1; // Go to last slide of new array
      }
    }

    this.cdr.detectChanges();
    this.resetAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.controlCarousel('next');
    }, 5000);
  }

  resetAutoSlide(): void {
    this.clearAutoSlideInterval();
    this.startAutoSlide();
  }

  clearAutoSlideInterval(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  getCurrentSlides(): ISlide[] {
    // Get the currently active array of slides
    return this.currentArray === 'array1' ? this.array1 : this.array2;
  }

  getTransformStyle(index: number): { [key: string]: string | number } {
    // Determine the transform style based on the index, current slide, and direction
    if (index === this.currentIndex) {
      return { transform: 'translateX(0)', zIndex: 5 }; // Current slide stays in place
    } else if (index === this.previousIndex) {
      return { transform: this.direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)', zIndex: 1 }; // Move previous slide out based on direction
    } else if (this.direction === 'next') {
      return { transform: 'translateX(100%)', zIndex: 0 }; // Slide comes in from the right
    } else {
      return { transform: 'translateX(-100%)', zIndex: 0 }; // Slide comes in from the left
    }
  }
}