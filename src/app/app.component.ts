import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-firebase';

  displayToken: string;
  constructor(updates: SwUpdate, push: SwPush) {
    updates.available.subscribe(_ => updates.activateUpdate().then(() => {
      console.log('reload for update');
      document.location.reload();
    }));
    push.messages.subscribe(msg => console.log('push message', msg));
    push.notificationClicks.subscribe(click => console.log('notification click', click));
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }
  }

  permitToNotify() {
    const messaging = firebase.messaging();
    navigator.serviceWorker.getRegistration().then(serviceWorkerRegistration => {
    Notification.requestPermission()
      .then(() => messaging.getToken({ serviceWorkerRegistration }).then(token => this.displayToken = token))
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
    });
  }
}
