# AngularFirebase

Demonstrate Angular Firebase integration using the Angular service worker instead of the Firebase service worker.
The Angular service worker provides a very convenient PWA experience. 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.


## Quickstart

    npm install -g http-server-spa
    ng build --prod
    http-server-spa dist/angular-firebase

### Trigger a notification

    POST https://fcm.googleapis.com/fcm/send

Headers:

    Authorization Key=<Your Server Key>
    content-type application/json

Body:

    {
      "to": "<Your Registration Token>",
      "notification": {
        "body": "This is a test notification",
        "title": "Test Notification"
      }
    }
