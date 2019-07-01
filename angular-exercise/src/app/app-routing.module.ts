import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent
    },
    {
        path: '',
        redirectTo: '/home/event-listing',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule { }
