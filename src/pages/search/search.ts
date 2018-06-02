import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchResultsPage } from "../search-results/search-results";
import { DialogueProvider } from "../../providers/dialogue/dialogue";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private search_input:string = '';
  private search_results:any = [];

  constructor(
    public dialogue_provider: DialogueProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  public openSearchResult(name:string, year:string, text:string){
    this.navCtrl.push(SearchResultsPage, {
      name: name,
      year: year,
      text: text
    });
  }

  public onInput(event){
    this.dialogue_provider.getSearchResult(this.search_input).then((results:any) => {
      this.search_results = results;
    });
  }

}
