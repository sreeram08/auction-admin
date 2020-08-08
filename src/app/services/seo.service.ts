import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(public title: Title) { }

  setTitle(title: string) {
    this.title.setTitle(title);
  }
}
