import {AppModule} from './app.module';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    AppModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
