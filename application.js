let movies = [];
let genres = [];
let resourceLoader;
const recentKey = "recently_played";
let BASEURL;

App.onLaunch = function(options) {
  BASEURL = options.BASEURL;

  const javascriptFiles = [
    `${BASEURL}/js/fetch-polyfill.js`,
    `${BASEURL}/js/load-movies.js`,
    `${BASEURL}/js/resource_loader.js`,
    `${BASEURL}/js/presenter.js`,
    `${BASEURL}/templates/menubar.js`,
    `${BASEURL}/templates/recent.js`,
    `${BASEURL}/templates/catalog.js`,
    `${BASEURL}/templates/search.js`,
    `${BASEURL}/templates/movie.js`,
  ];

  evaluateScripts(javascriptFiles, (didLoad) => {
    if (didLoad) {
      resourceLoader = new ResourceLoader(options.BASEURL);
      let menu = Presenter.makeDocument(MenuBarTemplate());
      menu.addEventListener("select", Presenter.loadMenuItem.bind(Presenter));
      Presenter.pushDocument(menu);
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
      <title>${title}</title>
      <description>${description}</description>
    </alertTemplate>
  </document>`

  let parser = new DOMParser();

  return parser.parseFromString(alertString, "application/xml");
}
