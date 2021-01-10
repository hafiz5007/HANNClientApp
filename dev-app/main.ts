import {Aurelia} from 'aurelia-framework';
import environment from './environment';
import 'whatwg-fetch';
import {ValidationController, validateTrigger} from "aurelia-validation";
import { HttpClient, json } from 'aurelia-fetch-client';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'; 
import {PLATFORM} from 'aurelia-pal';



export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature('resources')
    .plugin("aurelia-validation")    
   // .plugin('aurelia-dialog');
    .plugin(PLATFORM.moduleName('aurelia-dialog'), config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 5;
      config.settings.keyboard = false;
    });

    

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
