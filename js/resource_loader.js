function ResourceLoader(baseurl) {
  this.BASEURL = baseurl;
}

ResourceLoader.prototype.loadResource = (resource, callback) => {
  evaluateScripts([resource], (success) => {
    if (success) {
      let resource = CatalogTemplate.call(this);
      callback.call(this, resource);
    } else {
      let title = "Resource Loader Error",
          description = `Error loading resource '${resource}'. \n\n Try again later.`,
          alert = createAlert(title, description);
      navigationDocument.presentModal(alert);
    }
  });
}
