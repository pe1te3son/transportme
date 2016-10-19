# Transportme

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)


Transportation application that displays a list of departures from user selected location. It uses google autocomplete API which is passing data to TrasportApi and then displaying selected journey. The app is equally functional on mobile and desktop. The application uses a service worker to cache necessary files and in the case of losing connection, it allows to work with recently searched or favorite journeys by storing them into the indexedDb database.

**This app only works for journeys within London area.**

[Live Demo here](https://transportme-26649.firebaseapp.com)

**You may enter any address as long as it is located in London.**
If you want to test an app and don't know London very well, here are some locations you may want to try:
> Please make sure, that you are selecting locations from google's autocomplete select menu.

  * Brick Lane
  * Oxford Circus Station
  * Buckingham Palace Road
  * London Bridge Station
  * Stratford
  * Benthal Road
  * Covent Garden
  * Paddington London
  * Victoria Station


  ![Screenshort](https://github.com/pe1te3son/cdn/blob/master/transportme/trasportme_screenshot.jpg?raw=true)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* Clone this repository
* Change into the new directory
* Run following commands:
  * `npm install -g ember-cli`
  * `npm install`
  * `bower install`

## Running

* To preview the app run `ember serve`
* App is running at [http://localhost:4200](http://localhost:4200).


### Building
* To build app for production run  `ember build --environment=production`
* Compressed files are saved in `/dist` folder

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

### Credits
[Google API](https://developers.google.com/places/web-service/autocomplete)

[TrasportApi](https://developer.transportapi.com/)
