import 'rxjs/add/operator/map';

import { Headers, Http, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const API_URL = '/api/';
@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

  get(url) {
    const token = JSON.parse(localStorage.getItem('userData'));
    const headers: any = new Headers();
    if (token && token.token) {
      const authToken = token.token;
      headers.append('Authorization', ` Token ${authToken}`);
      headers.append('test', `test`);
    }
    if(url.indexOf("scan/getdata")!==-1){
      return this.http.get(`http://localhost/combiscan/scan/getdata`, {headers: headers}).map(response => response.json());
    }
    return this.http.get(`${API_URL}${url}`, {headers: headers}).map(response => response.json());
  }

  create(url, data) {
    const headers: any = new Headers();


    return this.http.post(`${API_URL}${url}`, data, {headers: headers}).map(response => response.json());
  }

  update(url, data) {
    const headers: any = new Headers();

    if (url !== 'deployment/authenticatedeployment/') {
      // const token = JSON.parse(localStorage.getItem('userData')).token;
      // headers.append('Authorization', ` Token ${token}`);
      // headers.append('test', `test`);
    }
    return this.http.put(`${API_URL}${url}`, data, {headers: headers}).map(response => response.json());
  }

  inUrlSave(url, formData: FormData, id?) {
    url = API_URL + url;
    return Observable.create(observer => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 201) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      const type = id ? 'PUT' : 'POST';
      if (id) {
        url += `${id}/`;
      }
      xhr.open(type, url, true);
      xhr.send(formData);
    });
  }

  delete(url) {
    return this.http.delete(`${API_URL}${url}`).map(response => response.json());
  }
}
