/**
* @name Initializer
* @desc Injects router into componets
* @param { Object } params - fromTo value
* @param { Object } application - your app class
*/

export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('component', 'router', 'router:main');
}

export default {
  name: 'component-router-injector',
  initialize
};
