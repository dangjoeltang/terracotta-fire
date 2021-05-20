import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ClientModule } from './client/client.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationModule } from './navigation/navigation.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    ClientModule,
    NavigationModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
