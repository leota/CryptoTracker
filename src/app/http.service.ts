import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';

@Injectable()
export class HttpService {

  private data = config.data;
  private convert = config.convert;

  constructor(private http: HttpClient) { }

  get(): void {
    this.data.forEach(el => {
      let currency = el.currency + '/';
      this.http.get('https://api.coinmarketcap.com/v1/ticker/' + currency + '?' + this.convert).subscribe(data => {
        console.log(data);
      });
    });

  }

}

