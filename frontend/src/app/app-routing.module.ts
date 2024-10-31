import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    { path: 'projects', loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule) },
    { path: 'services', loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule) },
    { path: 'about', loadChildren: () => import('./pages/aboutus/aboutus.module').then(m => m.AboutusModule) },
    { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },
    { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }