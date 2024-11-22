import { Component, inject, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlidesComponent implements OnInit, AfterViewInit {
  slides: ISlide[] = [];
  isLoading: boolean = false;
  strapiService = inject(StrapiService);

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
      this.isLoading = false;
    }, error => {
      console.error('Error fetching slides:', error);
    });
  }

  ngAfterViewInit(): void {
    const carouselImages = document.getElementById('carouselImages');
    const carouselText = document.getElementById('carouselText');

    if (carouselImages && carouselText) {
      const bootstrapCarouselImages = bootstrap.Carousel.getOrCreateInstance(carouselImages);
      const bootstrapCarouselText = bootstrap.Carousel.getOrCreateInstance(carouselText);

      carouselImages.addEventListener('slide.bs.carousel', () => {
        bootstrapCarouselText.next();
      });

      carouselText.addEventListener('slide.bs.carousel', () => {
        bootstrapCarouselImages.next();
      });
    }

    setTimeout(() => {
      this.controlCarousel('next');
    }, 3000);
  }

  controlCarousel(direction: 'prev' | 'next'): void {
    const carouselImages = document.getElementById('carouselImages');
    const carouselText = document.getElementById('carouselText');

    if (carouselImages && carouselText) {
      const bootstrapCarouselImages = bootstrap.Carousel.getOrCreateInstance(carouselImages);
      const bootstrapCarouselText = bootstrap.Carousel.getOrCreateInstance(carouselText);

      if (direction === 'prev') {
        bootstrapCarouselImages.prev();
        bootstrapCarouselText.prev();
      } else {
        bootstrapCarouselImages.next();
        bootstrapCarouselText.next();
      }
    }
  }
}
