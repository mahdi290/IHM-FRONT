import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceModel } from './service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(`${this.apiBaseUrl}/service/all`, { withCredentials: true });
  }

  getServiceById(id: number): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.apiBaseUrl}/service/find/${id}`, { withCredentials: true });
  }

  addService(service: ServiceModel): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(`${this.apiBaseUrl}/service/add`, service, { withCredentials: true });
  }

  updateService(service: ServiceModel): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(`${this.apiBaseUrl}/service/update`, service, { withCredentials: true });
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/service/delete/${id}`, { withCredentials: true });
  }

  getServicesPerUser(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(`${this.apiBaseUrl}/service/user-services`, { withCredentials: true });
  }
}
