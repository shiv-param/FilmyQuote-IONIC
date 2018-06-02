import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DialogueProvider } from "../../providers/dialogue/dialogue";

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  private movie_text:string = '';
  private movie_name:string = '';
  private movie_year:string = '';
  private dialogue:any = {};
  private dialogue_loaded:boolean = false;
  private refresher:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dialogue_provider: DialogueProvider
  ) {}

  public doRefresh(refresher){
    this.refresher = refresher;
    this.fetch_dialogue();
  }

  public endRefresher(){
    if(this.refresher) this.refresher.complete();
  }

  public fetch_dialogue(){
    this.dialogue_provider.getDialogue('0', String(this.movie_year), String(this.movie_year), String(this.movie_name), String(this.movie_year))
        .then((dialogue:any) => {
        this.dialogue = dialogue;
        this.endRefresher();
        this.dialogue_loaded = true;
    });
  }

  ionViewDidLoad() {
    this.movie_text = this.navParams.data.text;
    this.movie_name = this.navParams.data.name;
    this.movie_year = this.navParams.data.year;
    this.fetch_dialogue();
  }

}
