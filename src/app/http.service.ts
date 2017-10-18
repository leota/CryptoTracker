import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  retreiveData(currency: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://api.coinmarketcap.com/v1/ticker/' + currency + '/').subscribe(data => {
        return resolve(data);
      });
    })
  }

}

