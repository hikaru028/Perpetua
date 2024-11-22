// Libraries
import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { ProjectCardComponent } from '../../../../components/project-card/project-card.component'
import { ProjectCardSkeletonComponent } from '../../../../components/skeletons/project-card-skeleton/project-card-skeleton.component';
// Services
import { TranslationHelper } from '../../../../shared/translation-helper';
import { ProjectService } from '../../../../shared/project.service';
import { Observable } from 'rxjs';
import { IProject } from '../../../../../util/interfaces';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink, TranslateModule, ProjectCardSkeletonComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements OnDestroy {
  projects$: Observable<IProject[]>;
  filteredProjects$: Observable<IProject[]>;
  selectedFilter$!: Observable<string | null>;
  isLoading$!: Observable<boolean | null>;

  projectService: ProjectService = inject(ProjectService);
  currentLanguage: string = 'en';

  constructor(private translationHelper: TranslationHelper) {
    this.projects$ = this.projectService.projects$;
    this.filteredProjects$ = this.projectService.filteredProjects$;
    this.selectedFilter$ = this.projectService.selectedFilter$;
    this.isLoading$ = this.projectService.isLoading$;
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }

  sortProjects(type: string): void {
    this.projectService.filterProjects(type);
  }
}
