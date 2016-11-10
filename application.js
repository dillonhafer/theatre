//# sourceURL=application.js

/*
 application.js
 HomeTheatre

 Copyright (c) 2016 DillonHafer. All rights reserved.
*/

/*
 * This file provides an example skeletal stub for the server-side implementation 
 * of a TVML application.
 *
 * A javascript file such as this should be provided at the tvBootURL that is 
 * configured in the AppDelegate of the TVML application. Note that  the various 
 * javascript functions here are referenced by name in the AppDelegate. This skeletal 
 * implementation shows the basic entry points that you will want to handle 
 * application lifecycle events.
 */

/**
 * @description The onLaunch callback is invoked after the application JavaScript 
 * has been parsed into a JavaScript context. The handler is passed an object 
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the 
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents 
 * the URL that was used to retrieve the application JavaScript.
 */
let resourceLoader;

App.onLaunch = function(options) {
  const javascriptFiles = [
    `${options.BASEURL}/js/resource_loader.js`,
    `${options.BASEURL}/js/presenter.js`
  ];

  evaluateScripts(javascriptFiles, function(success) {
    if (success) {
      resourceLoader = new ResourceLoader(options.BASEURL);
      resourceLoader.loadResource(`${options.BASEURL}/templates/catalog.js`, function(resource) {
        let doc = Presenter.makeDocument(resource);
        doc.addEventListener("select", Presenter.load.bind(Presenter));
        Presenter.pushDocument(doc);
      });
    } else {
      const errorDoc = createAlert("Application Error", "Error trying to load app.");
      navigationDocument.presentModal(errorDoc);
    }
  });
}


App.onWillResignActive = function() {

}

App.onDidEnterBackground = function() {

}

App.onWillEnterForeground = function() {
}

App.onDidBecomeActive = function() {
}

App.onWillTerminate = function() {
}


/**
 * This convenience funnction returns an alert template, which can be used to present errors to the user.
 */
const createAlert = (title, description) => {
  let alertString = `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <alertTemplate>
      <title style='color: rgb(0,136,204);font-size: 84px'>${title}</title>
      <description>${description}</description>
      <button>
        <text>Boo yes!</text>
      </button>
    </alertTemplate>
  </document>`

  let parser = new DOMParser();

  return parser.parseFromString(alertString, "application/xml");
}
