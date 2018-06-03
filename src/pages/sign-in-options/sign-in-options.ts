import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { AuthProvider } from "../../providers/auth/auth";

import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sign-in-options',
  templateUrl: 'sign-in-options.html',
})
export class SignInOptionsPage {

  private mainCallback:any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public user_provider: UserProvider,
    public auth_provider: AuthProvider
  ) {}

  public showAlert(message){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  public presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Signing in...",
    });
    loader.present();
    return loader;
  }

  public login(sign_in_with:string){
    let loader = this.presentLoading();
    this.auth_provider.login(sign_in_with).then((user_data:any)=>{
      if(user_data !== null){
        this.auth_provider.createAndSaveUser(user_data, sign_in_with).then((user_details)=>{
          this.mainCallback(true).then(()=>{
            this.user_provider.loginUser(user_details);
            loader.dismiss();
            this.navCtrl.pop();
          });
        }).catch((err)=>{
          console.log(err);
          loader.dismiss();
          this.showAlert("Some error occurred while signing you in. Please try again");
        });
      }
    }).catch((err)=>{
      console.log(err);
      loader.dismiss();
      this.showAlert("Some error occurred while signing you in. Please try again");
    });
  }

  ionViewWillEnter() {
    this.mainCallback = this.navParams.get("callback")
  }

}
