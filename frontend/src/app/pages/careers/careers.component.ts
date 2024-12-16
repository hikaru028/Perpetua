// libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
// Components
import { FooterComponent } from '../../components/footer/footer.component';
// Services
import { ICareer, APIResponseModel } from '../../../util/interfaces';
import { StrapiService } from '../../api/strapi.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})

export class CareersComponent implements OnInit {
  documentId: string = '';
  career: ICareer | null = null;
  strapiService = inject(StrapiService);
  route = inject(ActivatedRoute);

  constructor(private titleService: Title, private metaService: Meta) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.documentId = params.get('id') || '';

      if (this.documentId) {
        this.strapiService.getCareerById(this.documentId).subscribe(
          (result: APIResponseModel) => {
            if (result && result.data) {
              this.career = result.data;

              if (this.career?.job_title) {
                this.titleService.setTitle(`Careers | ${this.career.job_title} - Perpeture`);
                this.metaService.updateTag({
                  name: 'description',
                  content: `Explore the opportunity for a ${this.career.job_title} position at Perpeture. Join our team and grow your career!`
                });
              }
            }
          },
          (error) => {
            console.error('Error fetching career:', error);
          }
        );
      } else {
        console.error('Document ID is missing in the URL');
      }
    });

    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });

  }
}
