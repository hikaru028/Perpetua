import { Component, inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../../../../../services/strapi.service';
import { ISlide, APIResponseModel } from '../../../../../../../util/interfaces';

@Component({
  selector: 'app-slides',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slides.component.html',
  styleUrl: './slides.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlidesComponent implements OnInit {
  slides: ISlide[] = [];
  strapiUrl = 'http://localhost:1337';
  strapiService = inject(StrapiService);

  ngOnInit(): void {
    this.strapiService.getSlides().subscribe((result: APIResponseModel) => {
      this.slides = result.data;

      this.slides = this.slides.map(slide => ({
        ...slide,
        slide_image: {
          ...slide.slide_image,
          url: this.strapiUrl + slide.slide_image.url || "../../../../../assets/images/img_n.a.png"
        }
      }));

    }, error => {
      console.error('Error fetching projects:', error);
    });
  }
}
