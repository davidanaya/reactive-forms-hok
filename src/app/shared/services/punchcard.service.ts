import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PunchcardService {
  constructor(private http: Http) {}

  getDataList(): Observable<any> {
    return this.http
      .get(`${process.env.SETTINGS.API}/data`)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json()));
  }
}
