// Libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// Services
import { StrapiService } from '../../../api/strapi.service';
import { IProject, APIResponseModel } from '../../../../util/interfaces';
// Components
import { CallActionComponent } from '../../../components/call-action/call-action.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { BackToTopButtonComponent } from '../../../components/buttons/back-to-top-button/back-to-top-button.component';
import { ProjectDetailSkeletonComponent } from '../../../components/skeletons/project-detail-skeleton/project-detail-skeleton.component';
import { MoreProjectsComponent } from './components/more-projects/more-projects.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    // RouterLink,
    ProjectDetailSkeletonComponent,
    CallActionComponent,
    FooterComponent,
    BackToTopButtonComponent,
    MoreProjectsComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  documentId!: string;
  project?: IProject;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private location: Location,
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
    this.location.back();
  }
}
