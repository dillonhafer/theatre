const nameSort = (objectA, objectB) => {
  if (objectA.name < objectB.name) {
    return -1;
  }
  if (objectA.name > objectB.name) {
    return 1;
  }

  return 0;
}

const titleSort = (objectA, objectB) => {
  const firstTitle  = objectA.title.replace(/^the /i, "");
  const secondTitle = objectB.title.replace(/^the /i, "");
  if (firstTitle < secondTitle) {
    return -1;
  }
  if (firstTitle > secondTitle) {
    return 1;
  }

  return 0;
}

// Add movies to this data structure
const BaseMovies = [
  {
    video: "/movies/antman.m4v",
    img: "/images/ant-man.jpg",
    title: "Ant-Man",
    description: "Armed with a super-suit with the astonishing ability to shrink in scale but increase in strength, cat burglar Scott Lang must embrace his inner hero and help his mentor, Dr. Hank Pym, plan and pull off a heist that will save the world.",
    contentRatingDomain: "movie",
    contentRatingRanking: 300,
    genres: ['Action', 'Adventure', 'Comedy'],
  },
].sort(titleSort);

Genres = [];

BaseMovies.forEach((movie, movieIndex) => {
  movie.genres.forEach((genre) => {
    const gid = Genres.findIndex((g) => { return g.name === genre });
    if (gid === -1) {
      Genres.push({name: genre, movies: [movieIndex]});
    } else {
      Genres[gid].movies.push(movieIndex);
    }
  })
});

Genres = Genres.sort(nameSort);
