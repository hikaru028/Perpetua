import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from "./components/project-card/project-card.component";
import { IProject, APIResponseModel } from '../../../util/interfaces';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements OnInit {
  projects: IProject[] = [];
  filteredProjects: IProject[] = [];
  selectedFilter: string | null = null;
  strapiService = inject(StrapiService);
  strapiUrl = 'http://localhost:1337';

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
      this.filteredProjects = [...this.projects];
    }, error => {
      console.error('Error fetching projects:', error);
    });
  }

  sortProjects(type: string): void {
    if (this.selectedFilter === type) {
      this.selectedFilter = null;
      this.filteredProjects = this.projects;
    } else {
      this.selectedFilter = type;
      this.filteredProjects = type === '' ? this.projects : this.projects.filter(project => project.project_type === type);
    }
  }
}
