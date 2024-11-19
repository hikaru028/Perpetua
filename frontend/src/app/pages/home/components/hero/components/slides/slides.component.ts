import { Component, inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../../../../../api/strapi.service';
import { ISlide, APIResponseModel } from '../../../../../../../util/interfaces';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-slides',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slides.component.html',
  styleUrl: './slides.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlidesComponent implements OnInit {
  slides: ISlide[] = [];
  strapiService = inject(StrapiService);
  showSwiper: boolean = false;

  ngOnInit(): void {
    this.strapiService.getSlides().subscribe((result: APIResponseModel) => {
      this.slides = result.data;
      this.slides = this.slides.map(slide => ({
        ...slide,
        slide_image: {
          ...slide.slide_image,
          url: slide.slide_image.url || "../../../../../assets/images/img_n.a.png"
        }
      }));

      setTimeout(() => {
        this.showSwiper = true;
      }, 100);
    }, error => {
      console.error('Error fetching projects:', error);
    });
  }

  ngAfterViewInit(): void {
    register();
  }
}
