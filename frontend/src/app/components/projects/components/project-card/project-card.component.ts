import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../../../services/strapi.service';
import { IProject, APIResponseModel } from '../../../../../util/interfaces';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  projects: IProject[] = [];
  strapiUrl = 'http://localhost:1337';
  strapiService = inject(StrapiService);

  ngOnInit(): void {
    this.strapiService.getAllProjects().subscribe((result: APIResponseModel) => {
      this.projects = result.data;

      this.projects = this.projects.map(project => ({
        ...project,
        project_image: {
          ...project.project_image,
          url: this.strapiUrl + project.project_image.url || "../../../../../assets/images/img_n.a.png"
        }
      }));

    }, error => {
      console.error('Error fetching projects:', error);
    });
  }
}