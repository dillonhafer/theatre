const PerformSearchRequest = (doc, searchKeyboard) => {
  const searchText     = searchKeyboard.text.trim().replace(/\s+/g, " ");
  const resultsSection = doc.getElementById('resultsSection');
  const matchingMovies = findMatchingMovies(searchText);
  const lockups        = createLockups(doc, matchingMovies);

  clearSearchResults(resultsSection);

  if (lockups.length) {
    const pluralizedNoun = (lockups.length === 1) ? 'Movie' : 'Movies';
    doc.getElementById('searchTitle').textContent = `${lockups.length} ${pluralizedNoun} Found`;

    lockups.forEach((lockup) => {
      resultsSection.appendChild(lockup);
    });
  } else {
    doc.getElementById('searchTitle').textContent = `No results found for ${searchKeyboard.text.trim()}`;
  }
}

const findMatchingMovies = (text) => {
  const titleRegex = new RegExp(text, "gi");

  return movies.filter((movie) => {
    return movie.title.match(titleRegex);
  });
}

const clearSearchResults = (resultsSection) => {
  while (resultsSection.firstChild) {
    resultsSection.removeChild(resultsSection.firstChild);
  }
}

const createLockups = (document, foundMovies=[]) => {
  return foundMovies.map((movie, index) => {
    let lockup  = document.createElement('lockup');
    let artwork = document.createElement('img');
    artwork.setAttribute('width', '300');
    artwork.setAttribute('height', '500');
    artwork.setAttribute('src', BASEURL+movie.img);

    let title   = document.createElement('title');
    title.textContent = movie.title;

    lockup.addEventListener("select", Presenter.load.bind(Presenter));
    lockup.appendChild(artwork);
    lockup.appendChild(title);
    return lockup;
  });
}

const SearchTemplate = () => {
  return (`<?xml version="1.0" encoding="UTF-8" ?>
    <document>
       <searchTemplate>
          <searchField/>
          <shelf>
             <header>
                <title id='searchTitle'>Enter Text To Search By Title</title>
             </header>
             <section id='resultsSection'></section>
          </shelf>
       </searchTemplate>
    </document>`);
}
