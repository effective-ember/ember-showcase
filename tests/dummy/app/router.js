/* eslint-disable @typescript-eslint/no-empty-function */
import config from 'dummy/config/environment';

import EmberRouter from '@ember/routing/router';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});
