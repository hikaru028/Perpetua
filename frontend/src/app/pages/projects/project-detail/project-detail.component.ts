// Libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
// Components
import { BackToTopButtonComponent } from '../../../components/buttons/back-to-top-button/back-to-top-button.component';
import { ProjectDetailSkeletonComponent } from '../../../components/skeletons/project-detail-skeleton/project-detail-skeleton.component';
import { MoreProjectsComponent } from './components/more-projects/more-projects.component';
import { ProjectContentComponent } from './components/project-content/project-content.component';
// Services
import { StrapiService } from '../../../api/strapi.service';
import { IProject, APIResponseModel } from '../../../../util/interfaces';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    ProjectDetailSkeletonComponent,
    BackToTopButtonComponent,
    MoreProjectsComponent,
    ProjectContentComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  documentId!: string;
  project?: IProject;
  strapiUrl = environment.strapiMediaUrl;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private strapiService: StrapiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.documentId = id;
        this.loadProjectDetails();
      }
    });
  }

  loadProjectDetails(): void {
    this.strapiService.getProjectById(this.documentId).subscribe((result: APIResponseModel) => {
      if (result && result.data) {
        this.project = result.data;
        this.project = {
          ...result.data,
          thumbnail_image: {
            ...result.data.thumbnail_image,
            url: this.strapiUrl + result.data.thumbnail_image.url || "../../../../../assets/images/img_n.a.png"
          },
        };

        if (this.project) {
          const companyName = this.project?.project_client?.company_name || 'Unknown Company';
          this.titleService.setTitle(`${this.project.project_title} (${companyName}) - Perpeture`);
          this.metaService.updateTag({
            name: 'description',
            content: `Learn more about ${this.project.project_title} (${companyName}).`
          });
        }
      }
    },
      (error) => {
        console.error('Error fetching project:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}
