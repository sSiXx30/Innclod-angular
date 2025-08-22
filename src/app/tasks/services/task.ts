import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTasksByProject(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL}?userId=${userId}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
