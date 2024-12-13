// Libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// Components
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CallActionComponent } from '../../components/call-action/call-action.component';
import { BackToTopButtonComponent } from '../../components/buttons/back-to-top-button/back-to-top-button.component';
import { ProjectCardSkeletonComponent } from '../../components/skeletons/project-card-skeleton/project-card-skeleton.component';
// Service
import { ProjectService } from '../../shared/project.service';
import { IProject } from '../../../util/interfaces';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, TranslateModule, CallActionComponent, BackToTopButtonComponent, ProjectCardSkeletonComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  filteredProjects$: Observable<IProject[]>;
  selectedFilter$!: Observable<string | null>;
  projectsByIndustry$!: Observable<{ [industry: string]: IProject[] }>;
  isLoading$!: Observable<boolean | null>;

  // Lazy loading
  visibleProjects: IProject[] = [];
  private allProjects: IProject[] = [];
  projectsToLoad: number = 12;
  loadMoreButtonVisible: boolean = false;

  projectService: ProjectService = inject(ProjectService);
  translate: TranslateService = inject(TranslateService);
  currentLanguage: string = 'en';

  constructor(private titleService: Title, private metaService: Meta) {
    this.filteredProjects$ = this.projectService.filteredProjects$;
    this.selectedFilter$ = this.projectService.selectedFilter$;
    this.projectsByIndustry$ = this.projectService.projectsByIndustry$;
    this.isLoading$ = this.projectService.isLoading$;
  }

  ngOnInit(): void {
    // Meta info for SEO
    this.titleService.setTitle('Projects - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Browse our projects to learn more about the amazing things we have done at Perpeture.' });

    this.selectedFilter$.subscribe((filter) => {
      if (filter) {
        const upperCaseFilter = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase(); // capitalise only the first letter
        this.titleService.setTitle(`${upperCaseFilter} Projects - Perpeture`);
        this.metaService.updateTag({ name: 'description', content: `Browse ${filter} projects by Perpeture` });
      } else {
        this.titleService.setTitle('All Projects - Perpeture');
        this.metaService.updateTag({ name: 'description', content: 'Browse all projects by Perpeture' });
      }
    });

    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
      this.titleService.setTitle(this.translate.instant('projects.title') + ' - Perpeture');
    });

    this.filteredProjects$
      .pipe(
        filter(projects => projects.length > 0)
      )
      .subscribe((projects) => {
        this.allProjects = projects;
        this.initializeVisibleProjects();
      });
  }

  initializeVisibleProjects(): void {
    this.visibleProjects = this.allProjects.slice(0, this.projectsToLoad);
    this.loadMoreButtonVisible = this.visibleProjects.length < this.allProjects.length;
  }

  loadMoreProjects(): void {
    const newProjects = this.allProjects.slice(this.visibleProjects.length, this.visibleProjects.length + this.projectsToLoad);
    this.visibleProjects = [...this.visibleProjects, ...newProjects];
    this.loadMoreButtonVisible = this.visibleProjects.length < this.allProjects.length;
  }

  sortProjects(type: string): void {
    this.projectService.filterProjects(type);
  }

  getIndustryKeys(projectsByIndustry: { [industry: string]: IProject[] }): string[] {
    return Object.keys(projectsByIndustry);
  }
}
