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

## [Getting Started](https://github.com/imperiojs/imperio/wiki/Getting-Started)
Getting started with imperio is simple, just add a few methods to your client and server code.

#### Client Side Implementation
Use imperio in your client-side code to share and receive a range of events and data.

imperio is attached to the window object and is accessible at namespace `imperio` once you add the script tag to your html files.

```javascript
<script src='./dist/imperio.min.js'></script>
```
One client sets up the socket connection, generally the desktop browser, and listens for an emit from other clients. However, any client can setup and listen for a socket emit as long as the line above is in their js file.
```javascript
imperio.listenerRoomSetup();
```

The other client(s), generally the mobile, need the above code in their js in order to emit a method from the imperio library. The `imperio.gesture()` method is one example method from our library. Check out the [API wiki page](https://github.com/imperiojs/imperio/wiki/API) to see the full suite of features available for development.

```javascript
const myElement = document.getElementById('swipeBox');
imperio.emitRoomSetup();
imperio.gesture('swipe', myElement);
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

Then have your app use the returned object as middleware
```javascript
app.use(imperio.init());
```
imperio will handle the mobile-to-desktop connections for you!

### Server Side Implementation
imperio server side functions are currently Express middleware. Implementing Imperio will require Express to be installed and required. We use several Express middleware (body-parser, cookie-parser, useragent) which are invoked before imperio middleware is invoked. These middleware handle the creation of connection sessions and authenticates connections to these sessions.

Require the module and pass it the server object of your app
```javascript
const imperio = require('imperio')(server);
```

Add a static route so your client will get the correct files from our node module

```javascript
app.use(express.static(path.join(`{path/from/server/to/node_modules}/node_modules/imperio`)));
```

The above is the example of how a developer would implement a server GET route.  Include <code>imperio.init()</code> as middleware in your GET route. Check out the cookies on your desktop browser to find your nonce. Your `route/nonce` on both client urls finalizes the connection between imperio and clients.

```javascript
app.get('/:nonce', imperio.init(),
   (req, res) => {
     if (req.imperio.isDesktop) {
       res.sendFile(path.join(__dirname, "route/from/server/to/desktop/html/file"));
     } else if (req.imperio.isMobile) {
       res.render(path.join(__dirname, "route/from/server/to/mobile/html/file"));
     }
   }
 );
```

And that's it! Now go forth and build awesome things.




### Examples
Checkout our wiki and other repos in this organization for some examples of imperio in use.

### Available Functions

### License
MIT
