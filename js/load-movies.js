const sortBy = (field, objectA, objectB) => {
  const fieldA  = objectA[field].replace(/^the /i, "");
  const fieldB = objectB[field].replace(/^the /i, "");

  if (fieldA < fieldB) {
    return -1;
  }
  if (fieldA > fieldB) {
    return 1;
  }

  return 0;
}

const loadMovies = () => {
  fetch(BASEURL+'/movies.json', {method: 'GET'})
    .then((r) => {return r.text()})
    .then((json) => {sortMovies(JSON.parse(json))});
}

const sortMovies = (jsonMovies) => {
  movies = jsonMovies.sort(sortBy.bind(this, 'title'));
  movies.forEach((movie, movieIndex) => {
    movie.genres.forEach((genre) => {
      const gid = genres.findIndex((g) => { return g.name === genre });
      if (gid === -1) {
        genres.push({name: genre, movies: [movieIndex]});
      } else {
        genres[gid].movies.push(movieIndex);
      }
    })
  });

  genres = genres.sort(sortBy.bind(this, 'name'));
}

loadMovies();
