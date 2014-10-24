'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Battle = new Module('battle');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Battle.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Battle.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Battle.menus.add({
    title: 'battle example page',
    link: 'battle example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Battle.aggregateAsset('css', 'battle.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Battle.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Battle.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Battle.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Battle;
});
