const getRecentMovies = () => {
  let recentMovies = userDefaults.getData(recentKey);
  if (recentMovies === null) {
    return '';
  } else {
    recentMovies = JSON.parse(recentMovies);
  }

  let mvs = [];
  recentMovies.forEach((movie, index) => {
    mvs.push(`
      <lockup>
        <img src="${BASEURL}${movie.img}" width="300" height="500" />
        <title>${movie.title}</title>
      </lockup>
    `);
  });
  return mvs.join('');
}

const RecentTemplate = () => {
  let template = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <stackTemplate>
        <banner>
          <title>Recently Watched Movies</title>
        </banner>
        <collectionList>
          <shelf>
            <section>
              ${getRecentMovies()}
             </section>
           </shelf>
         </collectionList>
       </stackTemplate>
    </document>`;

  return template;
}
