// Libraries
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Services
import { ICareer, APIResponseModel } from '../../util/interfaces';
import { StrapiService } from '../api/strapi.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CareerService {
    private careerData: ICareer | null = null;

    // Temporary hardcoded career list
    private hardcodedCareers: ICareer[] = [
        {
            id: 1,
            documentId: '123abc',
            job_title: 'Executive Assistant',
            job_type: 'Full-time',
            job_description: 'a position is open',
            job_location: 'Yokohama',
            location_type: 'Hybrid',
            branch_name: 'Perpetua Japan',
            office_address: [],
        },
        {
            id: 2,
            documentId: '123abcd',
            job_title: 'Senior Designer',
            job_type: 'Full-time',
            job_description: 'a position is open',
            job_location: 'Any location',
            location_type: 'Hybrid/Remote',
            branch_name: '',
            office_address: [],
        },
        {
            id: 3,
            documentId: '123abcde',
            job_title: 'Account Executive',
            job_type: 'Full-time',
            job_description: 'a position is open',
            job_location: 'Christchurch',
            location_type: 'Hybrid/Remote',
            branch_name: 'Perpetua Christchurch',
            office_address: [],
        }
    ];

    setCareerData(career: ICareer) {
        this.careerData = career;
    }

    getCareerData(): ICareer | null {
        return this.careerData;
    }

    getAllCareers(): ICareer[] {
        return this.hardcodedCareers;
    }


    // private careersSubject = new BehaviorSubject<ICareer[]>([]);
    // projects$ = this.careersSubject.asObservable();

    // private loadingSubject = new BehaviorSubject<boolean>(true);
    // isLoading$ = this.loadingSubject.asObservable();

    // strapiUrl = environment.strapiMediaUrl;

    // constructor(private strapiService: StrapiService) {
    //     this.fetchProjects();
    // }

    // private fetchProjects(): void {
    //     this.loadingSubject.next(true);
    //     this.strapiService.getAllProjects().subscribe((result: APIResponseModel) => {
    //         const careers = result.data;
    //         this.careersSubject.next(careers);
    //         this.loadingSubject.next(false);
    //     }, error => {
    //         console.error('Error fetching careers:', error);
    //         this.loadingSubject.next(false);
    //     });
    // }
}
