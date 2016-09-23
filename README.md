# Transportme

Transportation application that displays a list of departures from user selected location. It uses google autocomplete API which is passing data to TrasportApi and then displaying selected journey. The app is equally functional on mobile and desktop. The application uses a service worker to cache necessary files and in the case of losing connection, it allows to work with recently searched or favorite journeys by storing them into the indexedDb database.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* clone this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).


### Building

* `ember build --environment production` (production)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

### Credits
[Google API](https://developers.google.com/places/web-service/autocomplete)

[TrasportApi](https://developer.transportapi.com/)
