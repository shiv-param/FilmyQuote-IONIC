import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class AuthProvider {

  constructor(
    private fire: AngularFireAuth,
    private afs: AngularFireDatabase
  ) {}

  public login(type:string) {

    return new Promise((resolve) => {

      let auth_provider:any = null;

      if (type == 'facebook') {
        auth_provider = new firebase.auth.FacebookAuthProvider();
      } else if (type == 'google') {
        auth_provider = new firebase.auth.GoogleAuthProvider();
      }

      this.fire.auth.signInWithPopup(auth_provider).then((res)=>{
        resolve(res.user);
      }).catch((err)=>{
        console.log(err);
        resolve(null);
      })

      // this.fire.auth.signInWithRedirect(auth_provider).then(() => {
      //   this.fire.auth.getRedirectResult().then((res) => {
      //     console.log("user logged in")
      //     resolve(res.user);
      //   }).catch((err) => {
      //     console.log(err);
      //     resolve(null);
      //   });
      // }).catch((err) => {
      //   console.log(err);
      //   resolve(null);
      // });
    });

  }

  public createAndSaveUser(user, sign_in_with){

    return new Promise((resolve) => {

      let user_obj:any = {
        id: user.uid,
        name: user.displayName,
        display_pic: user.photoURL,
        sign_in_with: sign_in_with
      };

      this.afs.object('/users/' + user_obj.id).valueChanges().subscribe((data:any) => {
        if(data){
          let user_details:any = {
            id: data.id,
            name: data.name,
            display_pic: data.display_pic,
            sign_in_with: data.sign_in_with,
            tags: [],
            years: [],
            bookmarks: [],
            reactions: [],
            theme: ''
          };
          if("tags" in data){
            user_details.tags = data.tags;
          }
          if("years" in data){
            user_details.years = data.years;
          }
          if("bookmarks" in data){
            user_details.bookmarks = data.bookmarks;
          }
          if("reactions" in data){
            user_details.reactions = data.reactions;
          }
          if("theme" in data){
            user_details.theme = data.theme;
          }else{
            user_details.theme = "primary";
          }
          resolve(user_details);
        }else{
          let user_details:any = {
            id: user_obj.id,
            name: user_obj.name,
            display_pic: user_obj.display_pic,
            sign_in_with: user_obj.sign_in_with,
            tags: [],
            years: [],
            bookmarks: [],
            reactions: [],
            theme: "primary"
          };
          this.afs.object('/users/'+user.uid).update(user_details).then(() => {
            resolve(user_details);
          });
        }
      });
    });

  }

  public logout(){
    return new Promise((resolve) => {
      this.fire.auth.signOut();
      resolve(true);
    });
  }
}
