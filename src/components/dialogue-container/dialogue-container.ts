import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'dialogue-container',
  templateUrl: 'dialogue-container.html'
})
export class DialogueContainerComponent {

  @Input('dialogue') dialogue;

  constructor() {
  }

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

}
