# Imperio
Imperio provides developers with an SDK that creates a bridge between native mobile inputs and sensor data with desktop interaction, requiring minimal code and knowledge of the underlying technologies.

## Features
#### Capturing Mobile inputs
* Touch Gestures
* Accelerometer
* Gyroscope

#### Phone to Desktop Connections
* Sockets

#### Various Forms of Authenticating Mobile to Desktop Sessions
* URL + shortcode
* Alphanumeric Client Password
* Cookie/ Token Sessions

## Installation
```bash
npm install imperio-phone
```

## Getting Started

#### Client Side Implementation
The client side implementation of Imperio represents the use of the mobile functionality to influence browser interaction.
Client-side functionality can be accessed by:

```javascript
<script src = 'https://cdn.socket.io/socket-io-1.4.5.js'></script>
<script src = './client/lib/imperio/imperio.js'></script>
```
This above code needs to be included on the mobile browser and desktop browser.


#### Server Side Implementation

Imperio's server functions are currently Express middleware. Implementing Imperio will require Express to be installed and required.

Imperio's server-side functionality can be enable with just a couple lines of javascrips:
Just require the module and pass it the server object of your app
```javascript
const imperio = require('imperio')(server);
```
Then have your app use the returned object as middleware
```javascript
app.use(imperio.init());
```
Imperio will handle the mobile-to-desktop connections for you!

### A Simple Example
In this example, we'll include a button in the mobile browser, which on "tap", will alter the Dom of the desktop browser.

mobile.html :
```javascript
<body>
  <button type="button" name="button" class="tap" onclick="imperio.mobileTapShare()">Tap Here</button>
  <h2>Hello World</h2
</body>
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script src="./lib/imperio/imperio.js"></script>
```

mobile.js:
```javascript
imperio.mobileRoomSetup(imperio.socket, imperio.room);
```


desktopBrowser.html:
```javascript
<body class='class1'>
  <h1> Welcome, Imperio User!</h1>
  <div id= "nonceContainer"></div>
</body>
```

desktopBrowser.js
```javascript

function changeBodyClass() {
  if (bodyElement.classList.contains('class1')) {
    bodyElement.classList.remove('class1');
    bodyElement.classList.add('class2');
  } else {
    bodyElement.classList.remove('class2');
    bodyElement.classList.add('class1');
  }
}

```


In server.js:
```javascript
const express = require('express');
const app = express();
const server = require('http').Server(app); // get the server object from the app instance
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const imperio = require('imperio')(server);
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(useragent.express()); // TODO tie this into our library somehow?
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
// *-*-*-*-*-*-*-*-*-
app.use(imperio.init());
// *-*-*-*-*-*-*-*-*-

// Handle Routes
app.get('/', (req, res) => {
  if (req.useragent && req.useragent.isDesktop) {
    res.sendFile(path.join(`${__dirname}/path/to/desktopBrowser.html`));
  } else if (req.useragent && req.useragent.isMobile) {
    res.sendFile(path.join(`${__dirname}/path/to/mobile.html`));
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### Available Functions
All of the Functions

### TODO

- [ ] Tell Austin about adding parameter for non-Nonce implementation of SDK
- [ ] Add different url form of authentication
- [ ] Look at testing suite for Sockets and Implement some socket testing



### License
MIT

### On That Note....
Go forth and build awesome things!
