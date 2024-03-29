import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { UiModule } from '@modules/ui/ui.module';
import { WebsocketService } from '@services/websocket.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from '@app/custom-reuse-strategy';

registerLocaleData(localeRu, 'ru');

export function jwtTokenGetter() {
  if (localStorage.getItem('ngMonitoring')) {
    return JSON.parse(localStorage.getItem('ngMonitoring')).token;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        // whitelistedDomains: ['localhost:3001', 'localhost:4200'],
        //  blacklistedRoutes: ['http://localhost:3000/api/auth'],
      },
    }),
    AppRoutingModule,
    JwtModule,
    UiModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }, WebsocketService, { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
