let movies = [];
let genres = [];
let resourceLoader;
let BASEURL;

App.onLaunch = function(options) {
  BASEURL = options.BASEURL;
  evaluateScripts([`${BASEURL}/js/movies.js`], (didLoad) => {
    if (didLoad) {
      movies = BaseMovies;
      genres = Genres;
    }
  });

  const javascriptFiles = [
    `${BASEURL}/js/resource_loader.js`,
    `${BASEURL}/js/presenter.js`
  ];

  evaluateScripts(javascriptFiles, (success) => {
    if (success) {
      resourceLoader = new ResourceLoader(options.BASEURL);
      resourceLoader.loadResource(`${BASEURL}/templates/catalog.js`, function(resource) {
        let doc = Presenter.makeDocument(resource);
        doc.addEventListener("select", Presenter.load.bind(Presenter));
        Presenter.pushDocument(doc);
      });
    } else {
      loadError();
    }
  });
}

App.onWillResignActive = function() {}
App.onDidEnterBackground = function() {}
App.onWillEnterForeground = function() {}
App.onDidBecomeActive = function() {}
App.onWillTerminate = function() {}

const loadError = () => {
  const errorDoc = createAlert("Application Error", "Error trying to load app.");
  navigationDocument.presentModal(errorDoc);
}

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
