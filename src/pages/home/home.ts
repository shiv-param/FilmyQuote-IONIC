import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { DialogueProvider } from "../../providers/dialogue/dialogue";
import { UserProvider } from "../../providers/user/user";
import { AppFiltersProvider } from "../../providers/app-filters/app-filters";

import { FiltersPage } from "../filters/filters";

import { ComponentsModule } from "../../components/components.module";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private dialogue:any = {};
  private dialogue_loaded:boolean = false;
  private no_dialogue:boolean = false;
  private filter_tags:any = [];
  private filter_year_range:any = [];
  private refresher:any;
  private loader:any = null;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public dialogue_provider: DialogueProvider,
    public user_provider: UserProvider,
    public app_filter_provider:AppFiltersProvider
  ) {}

  public presentLoading(message:string) {
    this.loader = this.loadingCtrl.create({
      content: message,
    });
    this.loader.present();
  }

  public dismissLoader() {
    if(this.loader){
      this.loader.dismiss();
    }
  }

  public doRefresh(refresher){
    this.refresher = refresher;
    this.fetch_dialogue();
  }

  public endRefresher(){
    if(this.refresher) this.refresher.complete();
  }

  public getAllFilters(){
    if(this.user_provider.isUserLoggedIn()){
      this.filter_tags = this.user_provider.getUserTags();
      this.filter_year_range = this.user_provider.getUserYears();
      if(this.filter_year_range.length === 0){
        this.filter_year_range = this.app_filter_provider.getFilters().years;
      }
    }else{
      this.filter_year_range = this.app_filter_provider.getFilters().years;
    }
    this.fetch_dialogue();
  }

  public fetch_dialogue(){
    let tag_filter_string:string = '';
    if(this.filter_tags.length > 1){
      tag_filter_string = this.filter_tags[0];
      for(let i=1; i < this.filter_tags.length; i++){
        tag_filter_string += "," + this.filter_tags[i];
      }
    }else if(this.filter_tags.length == 1){
      tag_filter_string = this.filter_tags[0];
    }else{
      tag_filter_string = '0';
    }
    this.dialogue_provider.getDialogue(tag_filter_string, String(this.filter_year_range[0]), String(this.filter_year_range[1]), '0', '0')
      .then((dialogue:any) => {
        if(dialogue != null){
          this.dialogue = dialogue;
        }else{
          this.no_dialogue = true;
        }
        this.endRefresher();
        this.dialogue_loaded = true;
        this.dismissLoader();
    });
  }

  ionViewDidLoad(){
    this.user_provider.loadUser().then(()=>{
      this.app_filter_provider.loadAppFilters().then(()=>{
        this.getAllFilters();
      });
    });
  }

  public openFilters(){
    this.navCtrl.push(FiltersPage, {
      callback: this.filterCallback
    });
  }

  public filterCallback = (updated) => {
    return new Promise((resolve, reject) => {
      if(updated){
        this.presentLoading("Applying filters...");
        this.fetch_dialogue();
      }
      resolve();
     });
  };

}
