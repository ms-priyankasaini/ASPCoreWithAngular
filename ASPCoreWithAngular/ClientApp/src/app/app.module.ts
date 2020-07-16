import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { ToastrModule } from 'ngx-toastr';
import { BoatRentingComponent } from './app-renting/app-renting.component';
import { BoatDeregisterComponent } from './boat-deregister/boat-deregister.component';
import { BoatReturnComponent } from './boat-return/boat-return.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddBoatComponent,
    BoatRentingComponent,
    BoatDeregisterComponent,
    BoatReturnComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'add-boat', component: AddBoatComponent },
      { path: 'rent-boat', component: BoatRentingComponent },
      { path: 'return-boat', component: BoatReturnComponent },
      { path: 'deregister-boat', component: BoatDeregisterComponent },
    ]),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
