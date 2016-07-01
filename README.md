# EchoPhone
EchoPhone provides developers with an SDK that creates a bridge between native mobile inputs and sensor data with desktop interaction, requiring minimal code and knowledge of the underlying technologies.

### Installation
```bash
npm install echo-phone
```

### Getting Started
EchoPhone's server functions are currently Express middleware. Implementing EchoPhone will require Express to be installed and required.

EchoPhone's server-side functionality can be enable with just a couple lines of javascrips:
Just require the module and pass it the server object of your app
```javascript
const echo = require('echo-phone')(server);
```
Then have your app use the returned object as middleware
```javascript
app.use(echo.init());
```
EchoPhone will handle the mobile-to-desktop connections for you!

### A Simple Example
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
const echo = require('echo-phone')(server);
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(useragent.express()); // TODO tie this into our library somehow?
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
// *-*-*-*-*-*-*-*-*-
app.use(echo.init());
// *-*-*-*-*-*-*-*-*-

// Handle Routes
app.get('/', (req, res) => {
  if (req.useragent && req.useragent.isDesktop) {
    res.sendFile(path.join(`${__dirname}/path/to/desktop/page`));
  } else if (req.useragent && req.useragent.isMobile) {
    res.sendFile(path.join(`${__dirname}/path/to/mobile/page`));
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### Available Functions
All of the Functions

### License
To Kill
