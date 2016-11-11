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

let movies = [
  {
    video: "lemon.mp4",
    img: "marceline.png",
    title: "Lemon Grab Mayhem"
  },
  {
    video: "movies/antman.m4v",
    img: "lemon.png",
    title: "Antman"
  },
  {
    video: "movies/BALTO_II.m4v",
    img: "lemon.png",
    title: "Balto II"
  },
  {
    video: "movies/BALTO.m4v",
    img: "lemon.png",
    title: "Balto"
  },
  {
    video: "movies/BIG_HERO_6.m4v",
    img: "lemon.png",
    title: "Big Hero 6"
  },
  {
    video: "movies/Citizen4.mp4",
    img: "lemon.png",
    title: "Citizen 4"
  },
  {
    video: "movies/DOLPHIN_TALE_2.m4v",
    img: "lemon.png",
    title: "Dolphin Tale 2"
  },
  {
    video: "movies/Grumpy%20Cats%20Worst%20Christmas%20Ever.m4v",
    img: "lemon.png",
    title: "Grumpy Cat's Worst Christmas Ever"
  },
  {
    video: "movies/GUARDIANS_OF_THE_GALAXY.m4v",
    img: "lemon.png",
    title: "Guardians Of The Galaxy"
  },
  {
    video: "movies/HOW_TO_TRAIN_YOUR_DRAGON_2.m4v",
    img: "lemon.png",
    title: "How To Train Your Dragon 2"
  },
  {
    video: "movies/KIKIS_DELIVERY_SERVICE_D1.m4v",
    img: "lemon.png",
    title: "Kiki's Delivery Service"
  },
  {
    video: "movies/LKD-0N-NW1.m4v",
    img: "lemon.png",
    title: "The Lion King",
    description: "Someone pooped",
    resumeTime: 400
  },
  {
    video: "movies/Madea_Goes_to_Jail.m4v",
    img: "lemon.png",
    title: "Madea Goes To Jail"
  },
  {
    video: "movies/MEMOIRS_OF_A_GEISHA.m4v",
    img: "lemon.png",
    title: "Memoirs Of A Geisha"
  },
  {
    video: "movies/MOCKINGJAY_PT1.m4v",
    img: "lemon.png",
    title: "Hunger Games: Mocking Jay Part 1"
  },
  {
    video: "movies/NATM_3.m4v",
    img: "lemon.png",
    title: "Night At The Museum 3"
  },
  {
    video: "movies/Neighbors.mp4",
    img: "lemon.png",
    title: "Neighbors"
  },
  {
    video: "movies/OCEANS_TWELVE.m4v",
    img: "lemon.png",
    title: "Ocean's 12"
  },
  {
    video: "movies/PITCH_PERFECT_2.m4v",
    img: "lemon.png",
    title: "Pitch Perfect 2"
  },
  {
    video: "movies/SAVING_MR_BANKS.m4v",
    img: "lemon.png",
    title: "Saving Mr. Banks"
  },
  {
    video: "movies/SKYLARK.m4v",
    img: "lemon.png",
    title: "Skylark"
  },
  {
    video: "movies/SNOW_FLOWER_FD.m4v",
    img: "lemon.png",
    title: "Snow Flower"
  },
  {
    video: "movies/SONG_OF_THE_SEA.m4v",
    img: "lemon.png",
    title: "Song Of The Sea"
  },
  {
    video: "movies/TALES_FROM_AVONLEA2.m4v",
    img: "lemon.png",
    title: "Tales From Avonlea 2"
  },
  {
    video: "movies/TALES_FROM_AVONLEA.m4v",
    img: "lemon.png",
    title: "Tales From Avonlea"
  },
  {
    video: "movies/The Fellowship Of The Ring ED.m4v",
    img: "lemon.png",
    title: "The Lord Of The Ring: The Fellowship Of The Ring Ext."
  },
  {
    video: "movies/the_notebook.m4v",
    img: "lemon.png",
    title: "The Notebook"
  },
  {
    video: "movies/THE_TALE_OF_THE_PRINCESS_KAGUYA.m4v",
    img: "lemon.png",
    title: "The Tale Of The Princess Kaguya"
  },
  {
    video: "movies/TOYSTORY1.m4v",
    img: "lemon.png",
    title: "Toy Story"
  },
  {
    video: "movies/where_the_heart_is.m4v",
    img: "lemon.png",
    title: "Where The Heart Is"
  }
];

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
