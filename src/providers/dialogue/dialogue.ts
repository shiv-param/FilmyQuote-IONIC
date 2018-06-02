import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogueProvider {

  private baseUrl:string = "";

  constructor(public http: HttpClient) {}

  public getDialogue(include_tags:string, year_min:string, year_max:string, movie_name:string, movie_year:string){

    let api_url:string = this.baseUrl + '/api/get-dialogues/?include_tags=' + include_tags + '&year_min=' + year_min + '&year_max=' + year_max + '&movie_name=' + movie_name + '&movie_year=' + movie_year;

    return new Promise((resolve) => {
      this.http.get(api_url).subscribe((data:any) => {
        resolve(data.dialogue);
      }, (err) => {
        console.log(err);
        resolve(null);
      });
    });

  }

  public getDialogueDetails(dialogue_id:string){

    let api_url:string = this.baseUrl + '/api/get-dialogue-by-id/?dialogue_id=' + dialogue_id;

    return new Promise((resolve) => {
      this.http.get(api_url).subscribe((data:any) => {
        resolve(data.dialogue);
      }, (err) => {
        console.log(err);
        resolve(null);
      });
    });

  }

  public getSearchResult(query:string){

    let api_url:string = this.baseUrl + '/api/search-movies/?query='+query.trim();

    return new Promise((resolve) => {
      this.http.get(api_url).subscribe((data:any) => {
        let results = [];
        if(data.success){
          for(let i=0; i < data.results.length; i++){
            results.push({
              'text': data.results[i].text,
              'name': data.results[i].value.split('|')[0],
              'year': data.results[i].value.split('|')[1],
            });
          }
        }
        resolve(results);
      }, (err) => {
        console.log(err);
        resolve([]);
      });
    });
  }

  public addReaction(dialogue_id:string, mood:string){

    let data = {
        dialogue: dialogue_id,
        mood: mood
    };

    let api_url:string = this.baseUrl + '/api/add-emotion/';

    return new Promise((resolve) => {
      this.http.post(api_url, data).subscribe((data:any) => {
        resolve(true);
      }, (err) => {
        console.log(err);
        resolve(false);
      });
    });

  }

  public removeReaction(dialogue_id:string, mood:string){

    let data = {
        dialogue: dialogue_id,
        mood: mood
    };

    let api_url:string = this.baseUrl + '/api/remove-emotion/';

    return new Promise((resolve) => {
      this.http.post(api_url, data).subscribe((data:any) => {
        resolve(true);
      }, (err) => {
        console.log(err);
        resolve(false);
      });
    });

  }

}
