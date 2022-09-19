import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule , } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { DealOfTheDayComponent } from './Components/deal-of-the-day/deal-of-the-day.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DefaultPageComponent } from './Components/default-page/default-page.component';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';

import { FilterPipe } from './Shared/filter.pipe';
import { AlertComponent } from './Components/alert/alert.component';
import { ToastrModule } from 'ngx-toastr';
import { SignInComponent } from './Components/user/sign-in/sign-in.component';
import { LogOutComponent } from './Components/user/log-out/log-out.component';
import { AdminComponent } from './Components/user/admin/admin.component';
import { TableComponent } from './Components/user/admin/Components/table/table.component';
import { FormsComponent } from './Components/user/admin/Components/forms/forms.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditFormComponent } from './Components/user/admin/Components/forms/edit-form/edit-form.component';
import { AddFormComponent } from './Components/user/admin/Components/forms/add-form/add-form.component';
import { DisplayComponent } from './Components/user/admin/Components/forms/display/display.component';
import { DeleteOperationComponent } from './Components/user/admin/Components/forms/delete-operation/delete-operation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DealOfTheDayComponent,
    FooterComponent,
    DefaultPageComponent,
    ProductsComponent,
    CartComponent,
    FilterPipe,
    AlertComponent,
    SignInComponent,
    LogOutComponent,
    AdminComponent,
    TableComponent,
    FormsComponent,
    EditFormComponent,
    AddFormComponent,
    DisplayComponent,
    DeleteOperationComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbCarouselModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MdbModalModule,
    ToastrModule.forRoot({
      timeOut:1000
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
