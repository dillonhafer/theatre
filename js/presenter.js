const Presenter = {
  makeDocument(resource) {
    if (!Presenter.parser) {
      Presenter.parser = new DOMParser();
    }

    return Presenter.parser.parseFromString(resource, "application/xml");
  },
  modalDialogPresenter(xml) {
    navigationDocument.presentModal(xml);
  },
  pushDocument(xml) {
    navigationDocument.pushDocument(xml);
  },
  load(event) {
    ele = event.target,
    videoURL = ele.getAttribute("videoURL")
    if (videoURL) {
      const player    = new Player();
      const playlist  = new Playlist();
      const mediaItem = new MediaItem("video", videoURL);

      player.playlist = playlist;
      player.playlist.push(mediaItem);
      player.present();
    }
  },
}
