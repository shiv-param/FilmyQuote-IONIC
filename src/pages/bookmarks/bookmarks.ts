import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SignInOptionsPage } from "../sign-in-options/sign-in-options";
import { LoadingController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { DialogueProvider } from "../../providers/dialogue/dialogue";
import { ComponentsModule } from "../../components/components.module";

@IonicPage()
@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage {

  private loader:any = null;
  private bookmarks = [];
  private final_bookmarks = [];

  @ViewChild(Slides) slides: Slides;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public user_provider: UserProvider,
    public dialogue_provider: DialogueProvider
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

  public slideChanged() {
    let current_index = this.slides.getActiveIndex();
    if(!this.final_bookmarks[current_index].dialogue_added){
      this.loadDialogue(current_index);
    }
  }

  public loadDialogue(index:number){
    this.dialogue_provider.getDialogueDetails(String(this.final_bookmarks[index].id)).then((res) => {
      this.final_bookmarks[index].dialogue = res;
      this.final_bookmarks[index].dialogue_loaded = true;
    });
  }

  public updateDialogues(){
    for(let i=0; i<this.bookmarks.length; i++){
      this.final_bookmarks.push({
        id: this.bookmarks[i],
        dialogue: {},
        dialogue_loaded: false
      });
    }
    if(this.final_bookmarks.length > 0){
      this.loadDialogue(0);
    }
  }

  public userDataLoad(){
    this.user_provider.loadUser().then(()=>{
      this.bookmarks = this.user_provider.getAllBookmarks();
      this.updateDialogues();
      this.dismissLoader();
    });
  }

  ionViewDidLoad() {
    this.userDataLoad();
  }

  public showSignInOptions(){
    this.navCtrl.push(SignInOptionsPage, {
      callback: this.signInCallback
    });
  }

  public signInCallback = (logged_in) => {
    return new Promise((resolve, reject) => {
      if(logged_in){
        this.presentLoading("Getting user bookmarks...");
        this.userDataLoad();
      }
      resolve();
     });
  };

  public capitalize(str:string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public dialogueTextClass(str:string){
    var num_words = str.split(" ").length;

    if (num_words >= 1 && num_words < 10) {
        return "dialog_text large"
    }
    else if (num_words >= 10 && num_words < 25) {
        return "dialog_text medium"
    }
    else if (num_words >= 25 && num_words < 40) {
        return "dialog_text small"
    }
    else if (num_words >= 40) {
        return "dialog_text very-small"
    }
  }

  public tagString(tag_list:any) {
    let tags_string: string = "";
    if (tag_list.length > 1) {
      tags_string = this.capitalize(tag_list[0]);
      for (let i = 1; i < tag_list.length; i++) {
        tags_string += ", " + this.capitalize(tag_list[i]);
      }
    } else if (tag_list.length == 1) {
      tags_string = this.capitalize(tag_list[0]);
    }
    return tags_string;
  }

  public posterUrl(url:string) {
    if(url != "" && url != undefined){
      return 'https://image.tmdb.org/t/p/w500_and_h500_face' + url;
    }
    else{
      return '../../assets/imgs/placeholder.svg';
    }
  }

  public checkReactionPresent(id:string){
    return this.user_provider.reactionAddedForDialogue(String(id));
  }

  private compare(a,b) {
    if (a.count < b.count)
      return 1;
    if (a.count > b.count)
      return -1;
    return 0;
  }

  public emojiCount(dialogue_emotions:any){
    let count:number = 0;
    for(let i=0; i < dialogue_emotions.length; i++){
      count += Number(dialogue_emotions[i].count);
    }
    return count;
  }

  public emojiSrc(emoji:string){
    if(emoji === 'heart_eyes'){
      return "../../assets/imgs/placeholder.svg";
    }
    if(emoji === 'joy'){
      return "../../assets/imgs/placeholder.svg";
    }
    if(emoji === 'pensive'){
      return "../../assets/imgs/placeholder.svg";
    }
    if(emoji === 'rage'){
      return "../../assets/imgs/placeholder.svg";
    }
    if(emoji === 'flushed'){
      return "../../assets/imgs/placeholder.svg";
    }
  }

  public emojiImage(emotions:any){
    let images:any = [];
    emotions.sort(this.compare);
    let emoji_classes = ["second", "third", "fourth", "fifth"];
    if(emotions.length > 0){
      images.push({
        src: this.emojiSrc(emotions[0].mood),
        class: 'emoji-icon'
      });
    }
    if(emotions.length > 1){
      for(let i=1; i < emotions.length; i++){
        images.push({
          src: this.emojiSrc(emotions[i].mood),
          class: 'emoji-icon ' + emoji_classes.shift()
        });
      }
    }
    return images;
  }

  public updateReaction(dialogue_id:number) {
    if(this.user_provider.reactionAddedForDialogue(String(dialogue_id))){
      this.user_provider.removeReaction(String(dialogue_id));
    }else{

    }
  }

  public removeBookmark(dialogue_id:number){
    this.user_provider.removeBookmark(dialogue_id).then(()=>{
      let index = -1;
      for(let i = 0; i < this.final_bookmarks.length; i++){
        if(this.final_bookmarks[i].id === dialogue_id){
          index = i;
        }
      }
      if(index > -1){
        this.final_bookmarks.splice(index, 1)
      }
    });
  }
}
