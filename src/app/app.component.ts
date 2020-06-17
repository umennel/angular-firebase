import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  template: `
  <button (click)="requestPermission()">
    Hello this is a chat app. You should let us send you notifications for this reason.
  </button>
  `
})
export class AppComponent {
  constructor(private afMessaging: AngularFireMessaging) { }

  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
          this.listen();
        },
        (error) => { console.error(error); },
      );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message); });
  }
}
