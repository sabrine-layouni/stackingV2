import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidowService {

  constructor() { }

  getWindow() {
    return window;
  }

  getWindowRef() {
    return this.getWindow();
  }
}
