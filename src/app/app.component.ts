import { AngularFireMessaging } from '@angular/fire/messaging';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <button (click)="requestPermission()">
    Hello this is a chat app. You should let us send you notifications for this reason.
  </button>
  `
})
export class AppComponent {
  constructor(private afMessaging: AngularFireMessaging) {}

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
    // TODO: This is a workaround for https://github.com/angular/angularfire/issues/2299
    this.afMessaging.onMessage((message) => { console.log(message); });
  }
}
