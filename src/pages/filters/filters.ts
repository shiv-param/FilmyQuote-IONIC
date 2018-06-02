import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { SignInOptionsPage } from "../sign-in-options/sign-in-options";
import { LoadingController } from 'ionic-angular';
import { AppFiltersProvider } from "../../providers/app-filters/app-filters";
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {

  private tags_list: any = [];
  private tag_show_limit: number = 10;
  private min_year: number = 0;
  private max_year: number = 0;
  private filter_years: object = {
    lower: 0,
    upper: 0
  };
  private loader:any = null;
  private main_callback:any;

  constructor(
    public loadingCtrl: LoadingController,
    public app_filter_provider: AppFiltersProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public user_provider: UserProvider
  ) {}

  public presentLoading(message:string) {
    this.loader = this.loadingCtrl.create({
      content: message,
    });
    this.loader.present();
  }

  public updateTag(tag_id:string){
    if(this.user_provider.checkTagPresent(tag_id)){
      this.user_provider.removeTag(tag_id);
    }else{
      this.user_provider.addTag(tag_id);
    }
  }

  public dismissLoader() {
    if(this.loader){
      this.loader.dismiss();
    }
  }

  public update_year_range(){
    this.user_provider.updateYear([this.filter_years['lower'], this.filter_years['upper']]);
  }

  public capitalize(str:string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public showMoreTags(){
    this.tag_show_limit = this.tags_list.length;
  }

  public showLessTags(){
    this.tag_show_limit = 10;
  }

  public getAllFilters(){
    this.tags_list = this.app_filter_provider.getFilters().tags;
    this.min_year = this.app_filter_provider.getFilters().years[0];
    this.max_year = this.app_filter_provider.getFilters().years[1];
    this.filter_years = {
      lower: this.app_filter_provider.getFilters().years[0],
      upper: this.app_filter_provider.getFilters().years[1]
    };
  }

  ionViewDidLoad() {
    this.main_callback = this.navParams.get("callback")
    this.user_provider.loadUser().then(()=>{
      this.app_filter_provider.loadAppFilters().then(()=>{
        this.getAllFilters();
      });
    });
  }

  ionViewWillLeave() {
    this.main_callback(this.user_provider.isUserLoggedIn());
  }

  // public showSignInOptions(){
  //   this.navCtrl.push(SignInOptionsPage, {
  //     callback: this.signInCallback
  //   });
  // }

  // public signInCallback = (logged_in) => {
  //   return new Promise((resolve, reject) => {
  //     if(logged_in){
  //       this.presentLoading("Getting user filters...");
  //       this.userDataLoad();
  //     }
  //     resolve();
  //    });
  // };

}
