import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from 'src/dashboard/dashboarddemo.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './shared/app-layout/app-layout/app-layout.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'main', component: AppLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardDemoComponent,
            }
        ]
    },
    {
        path: '', component: AppLayoutComponent,
        children: [{ path: '', component: DashboardDemoComponent },
       
    ]
    }
    ,
    {
        path: 'auth',
        component: AuthLayoutComponent,
        data: {
            title: 'Login'
        },

        children: [
            {
                path: '',
                loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            },
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        data: {
            title: 'Book'
        },

        children: [
            {
                path: '',
                loadChildren: () => import('./component/bookshop/bookshop.module').then(m => m.BookshopModule)
            },
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        data: {
            title: 'Shared'
        },

        children: [
            {
                path: '',
                loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
            },
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        data: {
            title: 'Setting'
        },

        children: [
            {
                path: '',
                loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
            },
        ]
    },
    {
        path: 'auth',
        component: AppLayoutComponent,
        data: {
            title: 'Login'
        },

        children: [
            {
                path: '',
                loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            },
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        data: {
            title: 'directive'
        },
        children: [
            {
                path: '',
                loadChildren: () => import('./shared-directive/directive.module').then(m => m.DirectiveModule)
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/not-found'
    },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
