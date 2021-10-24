import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          component: NbAuthComponent,
          children: [
            {
              path: '',
              component: NbLoginComponent,
            },
            {
              path: 'login',
              component: NbLoginComponent,
            },
            {
              path: 'register',
              component: NbRegisterComponent,
            },
            {
              path: 'logout',
              component: NbLogoutComponent,
            },
            {
              path: 'request-password',
              component: NbRequestPasswordComponent,
            },
            {
              path: 'reset-password',
              component: NbResetPasswordComponent,
            },
          ],
        },
        {
          path: 'pages',
          loadChildren: () => import('./ngx-admin/pages/pages.module').then(m => m.PagesModule),
        },
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        /* { path: '', redirectTo: 'pages', pathMatch: 'full' }, */
        /* { path: '**', redirectTo: 'pages' }, */
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
