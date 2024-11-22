import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription, Observable } from 'rxjs';
// Components
import { ProjectCardComponent } from '../../../../components/project-card/project-card.component';
import { ProjectCardSkeletonComponent } from '../../../../components/skeletons/project-card-skeleton/project-card-skeleton.component';
// Services
import { TranslationHelper } from '../../../../shared/translation-helper';
import { ProjectService } from '../../../../shared/project.service';
import { IProject } from '../../../../../util/interfaces';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink, TranslateModule, ProjectCardSkeletonComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnDestroy {
  projects$: Observable<IProject[]>;
  filteredProjects$: Observable<IProject[]>;
  selectedFilter$!: Observable<string | null>;
  isLoading$!: Observable<boolean | null>;
  currentLanguage: string = 'en';

  private langChangeSubscription!: Subscription;

  projectService: ProjectService = inject(ProjectService);

  constructor(private translationHelper: TranslationHelper, private translate: TranslateService) {
    this.projects$ = this.projectService.projects$;
    this.filteredProjects$ = this.projectService.filteredProjects$;
    this.selectedFilter$ = this.projectService.selectedFilter$;
    this.isLoading$ = this.projectService.isLoading$;
    this.currentLanguage = this.translationHelper.getCurrentLanguage();

    this.langChangeSubscription = this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }

    this.translationHelper.unsubscribe();
  }

  sortProjects(type: string): void {
    this.projectService.filterProjects(type);
  }
}
