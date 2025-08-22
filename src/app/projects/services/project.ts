import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.API_URL);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.API_URL, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${project.id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
