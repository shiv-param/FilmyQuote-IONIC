import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class AppFiltersProvider {

  private app_filters_found:boolean = false;
  private app_filters: any = {};

  private baseUrl:string = "";

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {}

  public getYearRange(){

    let api_url:string = this.baseUrl + '/api/get-year-range/';

    return new Promise((resolve) => {
      this.http.get(api_url).subscribe((data:any) => {
        resolve(data);
      }, (err) => {
        console.log(err);
        resolve({});
      });
    });

  }

  public getAllTags(){

    let api_url:string = this.baseUrl + '/api/get-tags/';

    return new Promise((resolve) => {
      this.http.get(api_url).subscribe((data:any) => {
        resolve(data.tags);
      }, (err) => {
        console.log(err);
        resolve([]);
      });
    });

  }

  public updateAppFilters(){
    this.storage.set('app_filters_found', this.app_filters_found);
    this.storage.set('app_filters', this.app_filters);
  }

  public getAppTagFilters(){
    return new Promise((resolve, reject) => {
      this.getAllTags().then((data) => {
        this.app_filters_found = true;
        this.app_filters.tags = data;
        this.app_filters.lastUpdated = Date.now();
        this.updateAppFilters();
        resolve();
      });
    });
  }

  public getAppYearRanges(){
    return new Promise((resolve, reject) => {
      this.getYearRange().then((data:any) => {
        this.app_filters.years = [data.min_year, data.max_year];
        this.getAppTagFilters().then(()=>{
          resolve();
        });
      });
    });

  }

  public refreshFilters(){
    return new Promise((resolve, reject) => {
      this.getAppYearRanges().then(()=>{
        resolve();
      });
    });
  }

  public loadFilters(){

    return new Promise((resolve, reject) => {
      this.storage.get('app_filters').then((filters) => {
        if(Number((Date.now() - filters.lastUpdated)/(1000*60*60*24)) > 7){
          this.refreshFilters().then(()=>{
            resolve();
          });
        }else{
          this.app_filters_found = true;
          this.app_filters = filters;
          resolve();
        }
      }).catch((err) => {
        this.refreshFilters().then(()=>{
          resolve();
        });
      });
    });

  }

  public loadAppFilters(){
    return new Promise((resolve, reject) => {
      this.storage.get('app_filters_found').then((found) => {
        if(found){
          this.loadFilters().then(()=>{
            resolve();
          });
        }else{
          this.storage.get('app_filters_found').then((found) => {
            if(found){
              this.loadFilters().then(()=>{
                resolve();
              });
            }else{
              this.refreshFilters().then(()=>{
                resolve();
              });
            }
          }).catch((err) => {
            this.refreshFilters().then(()=>{
              resolve();
            });
          });
        }
      }).catch((err) => {
        this.refreshFilters().then(()=>{
          resolve();
        });
      });
    });
  }

  public getFilters(){
    return this.app_filters;
  }
}
