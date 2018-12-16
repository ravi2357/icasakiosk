import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

    private storageTypeObj = localStorage;
    private isSession = false;
    private onSubject = new Subject<{ key: string, value: any }>();

    getItem(key: string, fromLocal: boolean = true): any {
        let store = fromLocal ? localStorage : sessionStorage;
        return JSON.parse(store.getItem(key));
    }

    setItem(key: string, value: any, toLocal: boolean = true): void {
        let store = toLocal ? localStorage : sessionStorage;
        store.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string, fromLocal: boolean = true): void {
        let store = fromLocal ? localStorage : sessionStorage;
        store.removeItem(key);
    }

    clearAll(toLocal: boolean = true) {
        let store = toLocal ? localStorage : sessionStorage;
        store.clear();
    }

}