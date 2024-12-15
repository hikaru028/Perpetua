// Libraries
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Services
import { StrapiService } from '../api/strapi.service';
import { IProject, APIResponseModel } from '../../util/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ProjectService {
    private projectsSubject = new BehaviorSubject<IProject[]>([]);
    projects$ = this.projectsSubject.asObservable();

    public filteredProjectsSubject = new BehaviorSubject<IProject[]>([]);
    filteredProjects$ = this.filteredProjectsSubject.asObservable();

    private selectedFilterSubject = new BehaviorSubject<string | null>('all');
    selectedFilter$ = this.selectedFilterSubject.asObservable();

    private projectsByIndustrySubject = new BehaviorSubject<{ [industry: string]: IProject[] }>({});
    projectsByIndustry$ = this.projectsByIndustrySubject.asObservable();

    public moreProjectsSubject = new BehaviorSubject<IProject[]>([]);
    moreProjects$ = this.moreProjectsSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(true);
    isLoading$ = this.loadingSubject.asObservable();

    private searchResultsSubject = new BehaviorSubject<IProject[]>([]);
    searchResults$ = this.searchResultsSubject.asObservable();

    strapiUrl = environment.strapiMediaUrl;

    constructor(private strapiService: StrapiService) {
        this.fetchProjects();
    }

    private fetchProjects(): void {
        this.loadingSubject.next(true);
        this.strapiService.getAllProjects().subscribe((result: APIResponseModel) => {
            const projects = result.data.map((project: IProject) => ({
                ...project,
                thumbnail_image: {
                    ...project.thumbnail_image,
                    url: this.strapiUrl + project.thumbnail_image.url || "../../../../../assets/images/img_n.a.png"
                }
            }));
            this.projectsSubject.next(projects);
            this.filteredProjectsSubject.next(projects);
            this.groupProjectsByIndustry(projects);
            this.loadingSubject.next(false);
        }, error => {
            console.error('Error fetching projects:', error);
            this.loadingSubject.next(false);
        });
    }

    filterProjects(type: string): void {
        const currentProjects = this.projectsSubject.getValue();
        console.log("Filter Type:", type);
        console.log("Current Projects:", currentProjects); // Debugging line

        if (this.selectedFilterSubject.getValue() === type || type === 'all') {
            this.selectedFilterSubject.next('all');
            this.filteredProjectsSubject.next(currentProjects);
        } else {
            const filteredProjects = currentProjects.filter(project => project.project_type === type);
            console.log("Filtered Projects:", filteredProjects); // Debugging line
            this.selectedFilterSubject.next(type);
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

    public selectMoreProjectByDate(currentProjectDocumentId: string): void {
        this.strapiService.getAllProjects().subscribe((result: APIResponseModel) => {
            if (result && result.data) {
                const allProjects: IProject[] = result.data.map((project: IProject) => ({
                    ...project,
                    thumbnail_image: {
                        ...project.thumbnail_image,
                        url: this.strapiUrl + project.thumbnail_image.url || "../../../../../assets/images/img_n.a.png"
                    }
                }));

                const filteredProjects = allProjects.filter(project => project.documentId !== currentProjectDocumentId);
                const sortedProjects = filteredProjects.sort((a, b) => {
                    const dateA = new Date(a.project_date).getTime();
                    const dateB = new Date(b.project_date).getTime();
                    return dateB - dateA; // Sort by descending order (latest projects first)
                });

                const moreProjects = sortedProjects.slice(0, 3);
                this.moreProjectsSubject.next(moreProjects);
            }
        }, error => {
            console.error('Error fetching projects:', error);
        });
    }

    setSearchResults(results: IProject[]): void {
        this.searchResultsSubject.next(results);
        localStorage.setItem('searchResults', JSON.stringify(results));
    }

    getSearchResults(): IProject[] {
        const results = this.searchResultsSubject.getValue();
        if (results.length === 0) {
            const savedResults = localStorage.getItem('searchResults');
            return savedResults ? JSON.parse(savedResults) : [];
        }
        return results;
    }

    clearSearchResults(): void {
        this.searchResultsSubject.next([]);
        localStorage.removeItem('searchResults');
    }
}
