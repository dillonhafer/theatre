const setRecentlyPlayed = (movie) => {
  let ud = userDefaults.getData(recentKey);

  if (ud === null) {
    ud = JSON.stringify([movie]);
  } else {
    ud = JSON.parse(ud);
    let movieIndex = ud.findIndex((mv) => { return mv.title == movie.title });
    if (movieIndex === -1) {
      ud.unshift(movie);
    } else {
      ud.unshift(ud.pop(movieIndex));
    }
    ud = JSON.stringify(ud);
  }

  userDefaults.setData(recentKey, ud);
}

const setPlaybackEventListeners = (currentPlayer) => {
    /**
     * The requestSeekToTime event is called when the user attempts to seek to a specific point in the asset.
     * The listener is passed an object with the following attributes:
     * - type: this attribute represents the name of the event
     * - target: this attribute represents the event target which is the player object
     * - timeStamp: this attribute represents the timestamp of the event
     * - currentTime: this attribute represents the current playback time in seconds
     * - requestedTime: this attribute represents the time to seek to in seconds
     * The listener must return a value:
     * - true to allow the seek
     * - false or null to prevent it
     * - a number representing an alternative point in the asset to seek to, in seconds
     * @note Only a single requestSeekToTime listener can be active at any time. If multiple eventListeners are added for this event, only the last one will be called.
     */
    currentPlayer.addEventListener("requestSeekToTime", function(event) {
        // console.log("Event: " + event.type + "\ntarget: " + event.target + "\ntimestamp: " + event.timeStamp + "\ncurrent time: " + event.currentTime + "\ntime to seek to: " + event.requestedTime) ;
        return true;
    });

    /**
     * The shouldHandleStateChange is called when the user requests a state change, but before the change occurs.
     * The listener is passed an object with the following attributes:
     * - type: this attribute represents the name of the event
     * - target: this attribute represents the event target which is the player object
     * - timeStamp: this attribute represents the name of the event
     * - state: this attribute represents the state that the player will switch to, possible values: playing, paused, scanning
     * - oldState: this attribute represents the previous state of the player, possible values: playing, paused, scanning
     * - elapsedTime: this attribute represents the elapsed time, in seconds
     * - duration: this attribute represents the duration of the asset, in seconds
     * The listener must return a value:
     * - true to allow the state change
     * - false to prevent the state change
     * This event should be handled as quickly as possible because the user has already performed the action and is waiting for the application to respond.
     * @note Only a single listener can be active at any time. If multiple eventListeners are added for this event, only the last one will be called.
     */
    currentPlayer.addEventListener("shouldHandleStateChange", function(event) {
        // console.log("Event: " + event.type + "\ntarget: " + event.target + "\ntimestamp: " + event.timeStamp + "\nold state: " + event.oldState + "\nnew state: " + event.state + "\nelapsed time: " + event.elapsedTime + "\nduration: " + event.duration);
        // let movieIndex = movies.findIndex((mv) => { return mv.title == event.target.currentMediaItem.title })
        // movies[movieIndex].resumeTime = event.elapsedTime
        return true;
    });

    /**
     * The stateDidChange event is called after the player switched states.
     * The listener is passed an object with the following attributes:
     * - type: this attribute represents the name of the event
     * - target: this attribute represents the event target which is the player object
     * - timeStamp: this attribute represents the timestamp of the event
     * - state: this attribute represents the state that the player switched to
     * - oldState: this attribute represents the state that the player switched from
     */
    currentPlayer.addEventListener("stateDidChange", function(event) {
        // console.log("Event: " + event.type + "\ntarget: " + event.target + "\ntimestamp: " + event.timeStamp + "\noldState: " + event.oldState + "\nnew state: " + event.state);
    });
 
    /**
     * The stateWillChange event is called when the player is about to switch states.
     * The listener is passed an object with the following attributes:
     * - type: this attribute represents the name of the event
     * - target: this attribute represents the event target which is the player object
     * - timeStamp: this attribute represents the timestamp of the event
     * - state: this attribute represents the state that the player switched to
     * - oldState: this attribute represents the state that the player switched from
     */
    currentPlayer.addEventListener("stateWillChange", function(event) {
        // console.log("Event: " + event.type + "\ntarget: " + event.target + "\ntimestamp: " + event.timeStamp + "\noldState: " + event.oldState + "\nnew state: " + event.state);
    });
 
    /**
     * The timeBoundaryDidCross event is called every time a particular time point is crossed during playback.
     * The listener is passed an object with the following attributes:
     * - type: this attribute represents the name of the event
     * - target: this attribute represents the event target which is the player object
     * - timeStamp: this attribute represents the timestamp of the event
     * - boundary: this attribute represents the boundary value that was crossed to trigger the event
     * When adding the listener, a third argument has to be provided as an array of numbers, each representing a time boundary as an offset from the beginning of the asset, in seconds.
     * @note This event can fire multiple times for the same time boundary as the user can scrub back and forth through the asset.
     */
    currentPlayer.addEventListener("timeBoundaryDidCross", function(event) {
        // console.log("Event: " + event.type + "\ntarget: " + event.target + "\ntimestamp: " + event.timeStamp + "\nboundary: " + event.boundary);
    }, [30, 100, 150.5, 180.75]);
 
    /**
     * The timeDidChange event is called whenever a time interval has elapsed, this interval must be provided as the third argument when adding the listener.
     * The listener is passed an object with the following attributes:
     * - type: this attribute represents the name of the event
     * - target: this attribute represents the event target which is the player object
     * - timeStamp: this attribute represents the timestamp of the event
     * - time: this attribute represents the current playback time, in seconds.
     * - interval: this attribute represents the time interval
     * @note The interval argument should be an integer value as floating point values will be coerced to integers. If omitted, this value defaults to 1
     */
    currentPlayer.addEventListener("timeDidChange", function(event) {
        // console.log("Event: " + event.type + "\ntarget: " + event.target + "\ntimestamp: " + event.timeStamp + "\ntime: " +  event.time + "\ninterval: " + event.interval);
      let movieIndex = movies.findIndex((mv) => { return mv.title == event.target.currentMediaItem.title })
      movies[movieIndex].resumeTime = event.time
      return true;
    }, { interval: 2 });

    /**
     * The mediaItemDidChange event is called after the player switches media items.
     * The listener is passed an event object with the following attributes:
     * - type: this attribute represents the name of the event
     * - target: this attribute represents the event target which is the player object
     * - timeStamp: this attribute represents the timestamp of the event
     * - reason: this attribute represents the reason for the change; possible values are: 0 (Unknown), 1 (Played to end), 2 (Forwarded to end), 3 (Errored), 4 (Playlist changed), 5 (User initiated)
     */
    currentPlayer.addEventListener("mediaItemDidChange", function(event) {
        // console.log("Event: " + event.type + "\ntarget: " + event.target + "\ntimestamp: " + event.timeStamp + "\nreason: " + event.reason);
    });
 
   /**
     * The mediaItemWillChange event is when the player is about to switch media items.
     * The listener is passed an event object with the following attributes:
     * - type: this attribute represents the name of the event
     * - target: this attribute represents the event target which is the player object
     * - timeStamp: this attribute represents the timestamp of the event
     * - reason: this attribute represents the reason for the change; possible values are: 0 (Unknown), 1 (Played to end), 2 (Forwarded to end), 3 (Errored), 4 (Playlist changed), 5 (User initiated)
     */
    currentPlayer.addEventListener("mediaItemWillChange", function(event) {
        // console.log("Event: " + event.type + "\ntarget: " + event.target + "\ntimestamp: " + event.timeStamp + "\nreason: " + event.reason);
    });
}

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
  loadMenuItem(event) {
    const menuItemId = event.target.getAttribute('id');
    let doc;

    switch (menuItemId) {
      case 'navigation_recent':
        doc = Presenter.makeDocument(RecentTemplate());
        doc.addEventListener("select", Presenter.load.bind(Presenter));
        break;
      case 'navigation_genres':
        doc = Presenter.makeDocument(CatalogTemplate());
        doc.addEventListener("select", Presenter.load.bind(Presenter));
        break;
      case 'navigation_search':
        doc = Presenter.makeDocument(SearchTemplate());
        const searchFieldElem = doc.getElementsByTagName('searchField').item(0);
        const searchKeyboard = searchFieldElem.getFeature("Keyboard");
        searchKeyboard.onTextChange = PerformSearchRequest.bind(this, doc, searchKeyboard);
        break;
    }

    let menuItemDocument = event.target.parentNode.getFeature("MenuBarDocument");
    menuItemDocument.setDocument(doc, event.target);
  },
  loadMovie(movie, event) {
    const videoType  = event.target.getAttribute('type');

    switch (videoType) {
      case 'related':
        Presenter.load(event);
        break;
      case 'play':
      case 'preview':
        const videoUrl   = movie.customUrl ? movie.video : `${BASEURL}${movie.video}`;
        const previewUrl = movie.customPreviewUrl ? movie.previewVideo : `${BASEURL}${movie.previewVideo}`;
        const artworkUrl = `${BASEURL}${movie.img}`;

        const player    = new Player();
        const playlist  = new Playlist();

        let itemUrl = (videoType === 'play') ? videoUrl : previewUrl;
        const video = new MediaItem("video", itemUrl);

        video.title = movie.title;
        video.description = movie.description;
        video.artworkImageURL = artworkUrl;

        if (videoType === 'play') {
          video.resumeTime = movie.resumeTime;
          setPlaybackEventListeners(player);
          setRecentlyPlayed(movie);
        }

        video.contentRatingDomain = movie.contentRatingDomain;
        video.contentRatingRanking = movie.contentRatingRanking;

        player.playlist = playlist;
        player.playlist.push(video);
        player.present();
        break;
    }
  },
  load(event) {
    const movie = movies.find((m) => { return m.title === event.target.textContent; });

    if (movie.video !== undefined) {
      let doc = Presenter.makeDocument(MovieTemplate(movie));
      doc.addEventListener("select", Presenter.loadMovie.bind(Presenter, movie));
      Presenter.pushDocument(doc);
    }
  },
}
