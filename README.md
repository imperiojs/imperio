# [imperio](imperiojs.com)
imperio is an open source JavaScript library that enables developers to build web applications that harness the power of mobile devices communicating sensor and gesture data to other devices in real-time. imperio provides developers an easy-to-use API, configurable middlware to easily set up device communication rules, and automatically initiates optimal datastreams based on browser compatibility with minimal code to get started.

Check out our website for a glimpse at what is possible with [imperio](imperiojs.com).

## Version
[![npm version](https://badge.fury.io/js/imperio.svg)](https://www.npmjs.com/package/imperio)

## Features
#### Front-end API
* Sensor event data:
  * Accelerometer
  * Gyroscope
  * Geolocation
* Gesture event data:
  * Pan
  * Pinch
  * Press
  * Rotate
  * Swipe
  * Tap
* Peer client ID information
* Room information

#### Real-time Communication
* Initiate streaming communication using WebSockets
* Automatically switch to WebRTC DataChannels as appropriate with one line of code

#### Authenticate
* Configurable middleware automatically creates and manages data streaming rooms for clients
* Clients connect with short, randomly generated passwords provided to room initiator
* Peristent client room connections

## Installation
Install via npm:
```bash
npm install --save imperio
```

## Get Started
Getting started with imperio is simple: add a few lines in your frontend and server code.  Below is some code to get a basic example running.  For all available functionality, check out our [API ](https://github.com/imperiojs/imperio/wiki/API) docs.

Check out the full code for the sample implementation [here](https://github.com/imperiojs/getting-started).

#### Client Side Implementation
Use imperio in your client-side code to emit and receive a wide range of sensor and gesture events and data.

imperio is attached to the window object and is accessible by `imperio` once you add the script tag to your html files.

```javascript
<script src='./dist/imperio.min.js'></script>
```
ListenerRoomSetup starts the socket room connection and listens for incoming data from other connected clients. This is generally, but not necessarily, on a desktop/main browser.
```javascript
imperio.listenerRoomSetup();
```

The emitter(s), generally mobile devices, will connect to the room established above.
```javascript
imperio.emitRoomSetup();
```

The `imperio.gesture()` method gives developers access to all gesture events on a touch screen enabled device. Check out the [API wiki page](https://github.com/imperiojs/imperio/wiki/API) to see the full suite of features available.

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

And that's it! This application will now stream swipe data from client to client, with a just a few lines of front end code and one line of middleware. Now go forth and build awesome things.

### Examples
Other examples using imperio can be found in the other repos under the imperio organization and on our [example](https://github.com/imperiojs/imperio/wiki/example) page.

### License
MIT
