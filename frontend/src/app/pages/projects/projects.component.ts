// Libraries
import { Meta } from '@angular/platform-browser';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// Components
import { ProjectCardComponent } from '../../components/project-card/project-card.component'
import { CallActionComponent } from '../../components/call-action/call-action.component';
// Service
import { ProjectService } from '../../shared/project.service';
import { Observable } from 'rxjs';
import { IProject } from '../../../util/interfaces';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RouterLink, TranslateModule, CallActionComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<IProject[]>;
  filteredProjects$: Observable<IProject[]>;
  selectedFilter$!: Observable<string | null>;
  projectsByIndustry$!: Observable<{ [industry: string]: IProject[] }>;

  translate: TranslateService = inject(TranslateService);
  projectService: ProjectService = inject(ProjectService);
  currentLanguage: string = 'en';

  constructor(private titleService: Title, private metaService: Meta) {
    this.projects$ = this.projectService.projects$;
    this.filteredProjects$ = this.projectService.filteredProjects$;
    this.selectedFilter$ = this.projectService.selectedFilter$;
    this.projectsByIndustry$ = this.projectService.projectsByIndustry$;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Projects - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Browse our projects to learn more about the amazing things we have done at Perpeture' });

    this.selectedFilter$.subscribe((filter) => {
      if (filter) {
        this.titleService.setTitle(`${filter} Projects - Perpeture`);
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
  }

  sortProjects(type: string): void {
    this.projectService.filterProjects(type);
  }

  getIndustryKeys(projectsByIndustry: { [industry: string]: IProject[] }): string[] {
    return Object.keys(projectsByIndustry);
  }
}
