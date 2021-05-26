import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'searchfilter',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profileandactivity/profileandactivity.module').then(m => m.ProfileandactivityPageModule)
            
          }
        ]
      },
      {
        path: 'searchlist',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../searchlist/searchlist.module').then(m => m.SearchlistPageModule)
          }
        ]
      },
      {
        path: 'booking',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../booking/booking.module').then(m => m.BookingPageModule)
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../messages/messages.module').then(m => m.MessagesPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
