import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagHistory (){
    return [...this._tagsHistory];
  }

  public searchTag( tag:string ): void {
    if (tag.trim().length <= 0) return;


    this.organizeHistory( tag);

  }

  organizeHistory( tag: string){
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter ( (oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift ( tag ) ;

    this._tagsHistory = this._tagsHistory.splice(0,10);
  }
}
