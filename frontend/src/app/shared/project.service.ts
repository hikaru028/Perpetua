import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StrapiService } from '../api/strapi.service';
import { IProject, APIResponseModel } from '../../util/interfaces';

@Injectable({
    providedIn: 'root'
})

export class ProjectService {
    private projectsSubject = new BehaviorSubject<IProject[]>([]);
    projects$ = this.projectsSubject.asObservable();

    private filteredProjectsSubject = new BehaviorSubject<IProject[]>([]);
    filteredProjects$ = this.filteredProjectsSubject.asObservable();

    private selectedFilterSubject = new BehaviorSubject<string | null>('');
    selectedFilter$ = this.selectedFilterSubject.asObservable();

    private projectsByIndustrySubject = new BehaviorSubject<{ [industry: string]: IProject[] }>({});
    projectsByIndustry$ = this.projectsByIndustrySubject.asObservable();

    strapiUrl = 'http://localhost:1337';

    constructor(private strapiService: StrapiService) {
        this.fetchProjects();
    }

    private fetchProjects(): void {
        this.strapiService.getAllProjects().subscribe((result: APIResponseModel) => {
            const projects = result.data.map((project: IProject) => ({
                ...project,
                project_image: {
                    ...project.project_image,
                    url: this.strapiUrl + project.project_image.url || "../../../../../assets/images/img_n.a.png"
                }
            }));
            this.projectsSubject.next(projects);
            this.filteredProjectsSubject.next(projects);
            this.groupProjectsByIndustry(projects);
        }, error => {
            console.error('Error fetching projects:', error);
        });
    }

    filterProjects(type: string): void {
        const currentProjects = this.projectsSubject.getValue();

        if (this.selectedFilterSubject.getValue() === type || type === '') {
            this.selectedFilterSubject.next('');
            this.filteredProjectsSubject.next(currentProjects);
        } else {
            this.selectedFilterSubject.next(type);
            const filteredProjects = currentProjects.filter(project => project.project_type === type);
            this.filteredProjectsSubject.next(filteredProjects);
        }
    }

    private groupProjectsByIndustry(projects: IProject[]): void {
        const projectsByIndustry: { [industry: string]: IProject[] } = {};

        projects.forEach((project) => {
            if (project.industry) {
                const industryKey = project.industry.toLowerCase();
                if (!projectsByIndustry[industryKey]) {
                    projectsByIndustry[industryKey] = [];
                }
                projectsByIndustry[industryKey].push(project);
            }
        });

        this.projectsByIndustrySubject.next(projectsByIndustry);
    }
}
