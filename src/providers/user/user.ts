import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class UserProvider {

  private user_logged_in:boolean = false;
  // public user_id:string = '';
  // public user_name:string = '';
  // public display_pic:string = '';
  // public sign_in_with:string = '';
  // public tags:any = [];
  // public years:any = [];
  // public bookmarks:any = [];
  // public reactions:any = [];
  private user:any = {
    id: '',
    name: 'Shiv Saxena',
    display_pic: '../../assets/imgs/placeholder.svg',
    sign_in_with: 'facebook'
  };

  constructor(public http: HttpClient, public storage: Storage) {

  }

  // User Login and details
  public isUserLoggedIn(){
    // return this.user_logged_in;
    return false;
  }

  public logOutUser(){
    this.user_logged_in = false;
    this.user = {};
    this.storage.set('user', {});
    this.storage.set('user_logged_in', false);
  }

  public loadUserData(){

    return new Promise((resolve, reject) => {
      this.storage.get('user').then((user) => {
        this.user_logged_in = true;
        this.user = user;
        resolve();
      }).catch((err) => {
        this.logOutUser();
        resolve();
      });
    });

  }

  public loadUser(){

    return new Promise((resolve, reject) => {
      this.storage.get('user_logged_in').then((logged_in) => {
        if(logged_in){
          this.loadUserData().then(()=>{
            resolve();
          });
        }else{
          this.storage.get('user_logged_in').then((logged_in) => {
            if(logged_in){
              this.loadUserData().then(()=>{
                resolve();
              });
            }else{
              this.logOutUser();
              resolve();
            }
          }).catch((err) => {
            this.logOutUser();
            resolve();
          });
        }
      }).catch((err) => {
        this.logOutUser();
        resolve();
      });
    });

  }

  public updateUserData(user:any){
    this.storage.set('user', user);
  }

  public getUserBasicDetails(){
    return {
      name: this.user.name,
      id: this.user.id,
      display_pic: this.user.display_pic,
      sign_in_with: this.user.sign_in_with
    }
  }


  // Reactions
  public reactionAddedForDialogue(dialogue_id:string){
    for(let i=0; i<this.user.reactions; i++) {
      if (this.user.reactions[i].dialogue_id === dialogue_id)
        return true;
    }
    return false;
  }

  //public updateReactions(){
    // this.updateUserData(this.user);
    //this.afs.object('/users/'+this.user.id).update({
      //reactions: this.user.reactions
    //}).then((data) => {
      //this.updateUserData(this.user);
    //});
  //}

  public addReaction(dialogue_id:string, mood:string){
    if(!this.reactionAddedForDialogue(dialogue_id)){
      this.user.reactions.push({
        dialogue_id: dialogue_id,
        mood: mood
      });
      //this.updateReactions();
    }
  }

  public removeReaction(dialogue_id:string, reaction:string){
    if(this.reactionAddedForDialogue(dialogue_id)){
      let index = -1;
      for(let i=0; i<this.user.reactions; i++) {
        if (this.user.reactions[i].dialogue_id === dialogue_id){
          index = i;
          break;
        }
      }
      this.user.reactions.slice(index, 1);
      //this.updateReactions();
    }
  }

  // Bookmarks
  public getAllBookmarks(){
    if(this.user_logged_in)
      return this.user.bookmarks;
    return [];
  }

  public checkBookmarkPresent(dialogue_id:string){
    return this.user.bookmarks.indexOf(dialogue_id) > -1;
  }

  //public updateBookmarks(){
    // this.updateUserData(this.user);
    //this.afs.object('/users/'+this.user.id).update({
      //bookmarks: this.user.bookmarks
    //}).then((data) => {
      //this.updateUserData(this.user);
    //});
  //}

  public addBookmark(dialogue_id:string){
    if(this.user.bookmarks.indexOf(dialogue_id) == -1){
      this.user.bookmarks.push(dialogue_id);
      //this.updateBookmarks();
    }
  }

  public removeBookmark(dialogue_id:string){
    let index = this.user.bookmarks.indexOf(dialogue_id);
    if(index > -1){
      this.user.bookmarks.splice(index, 1);
      //this.updateBookmarks();
    }
  }


  // Years
  public getUserYears(){
    if(this.user_logged_in)
      return this.user.years;
    return [];
  }

  public updateYear(years:any){
    // this.updateUserData(this.user);
    // this.afs.object('/users/'+this.user.id).update({
    //   years: years
    // }).then((data) => {
    //   this.user.years = years;
    //   this.updateUserData(this.user);
    // });
  }


  // Tags
  public checkTagPresent(tag_id:string){
    if(this.user_logged_in)
      return this.user.tags.indexOf(tag_id) > -1;
    return false;
  }

  public getUserTags(){
    return this.user.tags;
  }

  //public updateTags(){
    // this.updateUserData(this.user);
    //this.afs.object('/users/'+this.user.id).update({
      //tags: this.user.tags
    //}).then((data) => {
      //this.updateUserData(this.user);
    //});
  //}

  public addTag(tag_id:string){
    if(this.user.tags.indexOf(tag_id) == -1){
      this.user.tags.push(tag_id);
      //this.updateTags();
    }
  }

  public removeTag(tag_id:string){
    let index = this.user.tags.indexOf(tag_id);
    if(index > -1){
      this.user.tags.splice(index, 1);
      //this.updateTags();
    }
  }

}
