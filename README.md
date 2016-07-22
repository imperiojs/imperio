# imperio
imperio is an open source javascript library that gives developers an easy way to interact mobile webAPI bridge between native mobile inputs and sensor data with desktop interaction, requiring minimal code and knowledge of the underlying technologies.

## Version
[![npm version](https://badge.fury.io/js/imperio.svg)](https://www.npmjs.com/package/imperio)

## Features
#### Control
* Gestures - Tap, Press, PresUp, Pan, Pinch, Swipe, Rotate
* Accelerometer
* Gyroscope
* Geolocation

#### Connect
* WebRTC
* WebSockets

#### Authenticate
* URL + shortcode
* Alphanumeric Client Password
* Cookie Sessions

## Installation
Install via npm:
```bash
npm install --save imperio
```

## Get Started
Getting started with imperio is simple, just add a few methods to your client and server code.  Below you will find some code to get a basic and quick example running.  For a full list of methods check out our full [API ](https://github.com/imperiojs/imperio/wiki/API) docs.

You can check out the full code for this sample implementation [here](https://github.com/imperiojs/getting-started).

#### Client Side Implementation
Use imperio in your client-side code to share and receive a range of events and data.

imperio is attached to the window object and is accessible at namespace `imperio` once you add the script tag to your html files.

```javascript
<script src='./dist/imperio.min.js'></script>
```
The listener sets up the socket room connection, generally the desktop browser, and listens for incoming data from connected clients.
```javascript
imperio.listenerRoomSetup();
```

The emitter(s), generally a mobile device, will connect to the room established above.
```javascript
imperio.emitRoomSetup();
```

The `imperio.gesture()` method is one example method from our library. Check out the [API wiki page](https://github.com/imperiojs/imperio/wiki/API) to see the full suite of features available for development.

```javascript
var swipeBox = document.getElementById('swipe-box');
imperio.gesture('swipe', swipeBox);
```

#### Server Side Implementation

imperio provides connection and authentication functionality on the server via an Express middleware.
```bash
npm install --save express
```
Just require the module and pass it the server object of your app
```javascript
const imperio = require('imperio')(server);
```

To correctly route the front-end request for the imperio bundle, include the following static route.
```javascript
app.use(express.static(path.join(`${__dirname}/../node_modules/imperio`)));
```

 Include <code>imperio.init()</code> as middleware in your desired express route.

```javascript
app.get('/:nonce', imperio.init(),
  (req, res) => {
    if (req.imperio.isDesktop) {
      res.sendFile(path.join(`${__dirname}/../client/desktop.html`));
    } else {
      if (req.imperio.connected) {
        res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
      } else {
        res.sendFile(path.join(`${__dirname}/../client/mobileLogin.html`));
      }
    }
  }
);
```

And that's it! Now go forth and build awesome things.

### Examples
Other examples using our library can be found at other repos on our organization and on our [example](https://github.com/imperiojs/imperio/wiki/example) page.

### License
MIT
