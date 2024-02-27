import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {KeepViewComponent} from './components/keep-view/keep-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
const routes: Routes = [
  {
    path: "",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "keep",
    component:KeepViewComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "notes",
        component: NotesContainerComponent
      },
      {
        path: "archive",
        component: ArchiveContainerComponent
      },
      {
         path: "trash",
         component: TrashContainerComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
