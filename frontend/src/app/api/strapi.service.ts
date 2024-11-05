import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../../util/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) { }

  getSlides(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/slides?populate=*`);
  }

  getAllProjects(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/projects?populate=*`);
  }

  getProjectById(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/projects/${id}`);
  }

  getAllClients(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/clients?populate=*`);
  }

  getClientById(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/clients/${id}`);
  }
}
