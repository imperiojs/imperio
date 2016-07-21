# imperio
imperio is an open source javascript library that gives developers an easy way to interact mobile webAPI bridge between native mobile inputs and sensor data with desktop interaction, requiring minimal code and knowledge of the underlying technologies.

### Version
[![npm version](https://badge.fury.io/js/imperio.svg)](https://www.npmjs.com/package/imperio)

## Features
#### Capturing Mobile inputs
* Touch Gestures - Tap, Press, Pan, Pinch, Swipe, Rotate
* Accelerometer
* Gyroscope
* Geolocation

#### Phone to Desktop Connections
* WebRTC
* WebSockets

#### Authenticating Mobile to Desktop Sessions
* URL + shortcode
* Alphanumeric Client Password
* Cookie/Token Sessions

## Installation
Install via npm:
```bash
npm install --save imperio
```

## Getting Started

#### Client Side Implementation
The client side implementation of imperio represents the use of the mobile functionality to influence browser interaction.
Client-side functionality can be accessed by:

```javascript
<script src='./dist/imperio.min.js'></script>
```
Then you can simply access the imperio object attached to the window.


#### Server Side Implementation

imperio's server functions function as Express middleware. Implementing imperio will require Express to be installed and required.
```bash
npm install --save express
```

imperio's server-side functionality can be enable with just a couple lines of javascript:
Just require the module and pass it the server object of your app
```javascript
const imperio = require('imperio')(server);
```

Add a static route so your client will get the correct files from our node module
```javascript
app.use(express.static(path.join(`${__dirname}/../node_modules/imperio`)));
```

Then have your app use the returned object as middleware
```javascript
app.use(imperio.init());
```
imperio will handle the mobile-to-desktop connections for you!

### Examples
Checkout our wiki and other repos in this organization for some examples of imperio in use.

### Available Functions

### License
MIT
