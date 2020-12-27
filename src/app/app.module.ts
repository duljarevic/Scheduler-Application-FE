import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {ChipsModule} from 'primeng/chips';
import {TabViewModule} from 'primeng/tabview';
import {ViewBillsComponent} from './bills/view-bills/view-bills.component';
import {TableModule} from 'primeng/table';
import {BillsService} from './services/bills.service';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {BoInteractionService} from './core/bo-interaction.service';
import {TabControllerService} from './core/tab-controller.service';
import {DetailBillComponent} from './bills/detail-bill/detail-bill.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MessageService} from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    ViewBillsComponent,
    DetailBillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    ChipsModule,
    TabViewModule,
    TableModule,
    SplitButtonModule,
    TooltipModule,
    DialogModule,
    CalendarModule,
    InputTextareaModule
  ],
  providers: [httpInterceptorProviders, BillsService, BoInteractionService, TabControllerService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
