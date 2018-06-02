import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from  '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { firebaseConfig } from '../environment';
import { AngularFireAuthModule } from "angularfire2/auth";

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from "../pages/search/search";
import { BookmarksPage } from "../pages/bookmarks/bookmarks";
import { UserPage } from "../pages/user/user";
import { SearchResultsPage } from "../pages/search-results/search-results";
import { FiltersPage } from "../pages/filters/filters";
import { SignInOptionsPage } from "../pages/sign-in-options/sign-in-options";

import { DialogueContainerComponent } from "../components/dialogue-container/dialogue-container";
import { LoaderComponent } from "../components/loader/loader";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DialogueProvider } from '../providers/dialogue/dialogue';
import { UserProvider } from '../providers/user/user';
import { AppFiltersProvider } from '../providers/app-filters/app-filters';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SearchPage,
    HomePage,
    TabsPage,
    BookmarksPage,
    UserPage,
    SearchResultsPage,
    FiltersPage,
    SignInOptionsPage,
    DialogueContainerComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SearchPage,
    HomePage,
    TabsPage,
    BookmarksPage,
    UserPage,
    SearchResultsPage,
    FiltersPage,
    SignInOptionsPage,
    DialogueContainerComponent,
    LoaderComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DialogueProvider,
    UserProvider,
    AppFiltersProvider,
    AuthProvider
  ]
})
export class AppModule {}
