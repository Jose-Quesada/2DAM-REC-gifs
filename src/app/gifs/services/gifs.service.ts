import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = '9sRmUi7HCk50jblcNpzwSn4IE5hyi04t';
  private serviceUrl: string = 'Http://api.giphy.com/v1/gifs';

  public gifList: Gif[]=[];


  constructor( private http:HttpClient) {
    this.loadLocalStorage();
    console.log ( 'Carga desde Local Storage');
   }


  private saveLocalStorage ():void{
    localStorage.setItem('appgifs', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void{
    if ( !localStorage.getItem('appgifs')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('appgifs')! );
    this.searchTag(this._tagsHistory[0]);
  }

  get tagHistory (){
    return [...this._tagsHistory];
  }

  public searchTag( tag:string ): void {
    if (tag.trim().length <= 0) return;

    const params = new HttpParams ()
              .set( 'api_key', this.apiKey)
              .set( 'limit', 10)
              .set('q', tag)

    this.http.get<SearchResponse>(this.serviceUrl+'/search', { params })
      .subscribe( (resp) =>{
        this.gifList = resp.data;
        console.log({gifs: this.gifList})
      })

    // this.http.get('http://api.giphy.com/v1/gifs/search?limit=10&api_key=9sRmUi7HCk50jblcNpzwSn4IE5hyi04t&q=doraemon')
    //   .subscribe( resp => {
    //     console.log(resp)
    //   })


    this.organizeHistory( tag);

  }

  organizeHistory( tag: string){
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter ( (oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift ( tag ) ;

    this._tagsHistory = this._tagsHistory.splice(0,10);

    this.saveLocalStorage();
  }




}
