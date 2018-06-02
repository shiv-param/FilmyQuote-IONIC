import { Component } from '@angular/core';

import { HomePage } from "../home/home";
import { SearchPage } from "../search/search";
import { BookmarksPage } from "../bookmarks/bookmarks";
import { UserPage } from "../user/user";
import { AboutPage } from "../about/about";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = BookmarksPage;
  tab4Root = UserPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
