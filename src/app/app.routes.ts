import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then(m => m.ProjectsModule)
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
