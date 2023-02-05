import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect';
import { HomeComponent } from './home/home';
import { AuthGuardService } from './services/auth-guard';
import { LoadingResolverService } from './services/loading-resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    resolve: {
      data: LoadingResolverService,
    },
  },
  {
    path: 'connect',
    component: ConnectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
