import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { SignInOptionsPage } from "../sign-in-options/sign-in-options";
import { AuthProvider } from "../../providers/auth/auth";
import { LoadingController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  private data_loaded: boolean = false;
  private loader:any = null;

  constructor(
    private user_provider: UserProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth_provider: AuthProvider
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

  ionViewDidLoad() {
    this.checkLogin();
  }

  public signOut(){
    this.auth_provider.logout().then(()=>{
      this.user_provider.logOutUser();
    });
  }

  public checkLogin(){
    this.presentLoading("Getting user details...");
    this.user_provider.loadUser().then(()=>{
      this.dismissLoader();
      this.data_loaded = true;
    });
  }

  public signInCallback = (logged_in) => {
    return new Promise((resolve, reject) => {
      if(logged_in){
        this.checkLogin();
      }
      resolve();
     });
  };

  public openSignInOptions(){
    this.navCtrl.push(SignInOptionsPage, {
      callback: this.signInCallback,
    });
  }

}
