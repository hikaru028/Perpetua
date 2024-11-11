// Libraries
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// Components
import { ProjectCardComponent } from '../../../../components/project-card/project-card.component'
// Services
import { ProjectService } from '../../../../shared/project.service';
import { Observable } from 'rxjs';
import { IProject } from '../../../../../util/interfaces';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements OnInit {
  projects$: Observable<IProject[]>;
  filteredProjects$: Observable<IProject[]>;
  selectedFilter$!: Observable<string | null>;

  projectService: ProjectService = inject(ProjectService);
  translate: TranslateService = inject(TranslateService);
  currentLanguage: string = 'en';

  constructor() {
    this.projects$ = this.projectService.projects$;
    this.filteredProjects$ = this.projectService.filteredProjects$;
    this.selectedFilter$ = this.projectService.selectedFilter$;
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
  }

  sortProjects(type: string): void {
    this.projectService.filterProjects(type);
  }
}
