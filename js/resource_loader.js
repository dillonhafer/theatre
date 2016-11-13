function ResourceLoader(baseurl) {
  this.BASEURL = baseurl;
}

ResourceLoader.prototype.loadResource = (resource, callback) => {
  evaluateScripts([resource], (success) => {
    if (success) {
      let res;
      switch (resource) {
        case `${BASEURL}/templates/catalog.js`:
          res = CatalogTemplate.call(this);
          break;
        case `${BASEURL}/templates/recent.js`:
          res = RecentTemplate.call(this);
          break;
        default:
          res = MenuBarTemplate.call(this);
          break;
      }

      callback.call(this, res);
    } else {
      let title = "Resource Loader Error",
          description = `Error loading resource '${resource}'. \n\n Try again later.`,
          alert = createAlert(title, description);
      navigationDocument.presentModal(alert);
    }
  });
}
