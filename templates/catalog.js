const createMovies = (movies) => {
  let mvs = []
  movies.forEach((movie, index) => {
    mvs.push(`
      <lockup>
        <img src="${BASEURL}${movie.img}" width="300" height="500" />
        <title>${movie.title}</title>
      </lockup>
    `);
  });
  return mvs.join('');
}

const createSections = (genres, movies) => {
  let sections = [];
  genres.forEach((genre) => {
    const moviesInGenre = movies.filter((movie, index) => { return genre.movies.includes(index); });
    sections.push(`
      <section>
        <listItemLockup>
          <title>${genre.name}</title>
          <decorationLabel>${genre.movies.length}</decorationLabel>
          <relatedContent>
            <grid>
              <section style='backgroundColor: rgb(31,38,41)'>
                ${createMovies(moviesInGenre)}
              </section>
            </grid>
          </relatedContent>
        </listItemLockup>
      </section>
    `)
  });
  return sections.join('');
}

const CatalogTemplate = () => {
  let template = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <catalogTemplate>
        <banner>
          <title>Dillon's Home Theatre 📽</title>
        </banner>
        <list>
          <section>
            <listItemLockup>
              <title>All Movies</title>
              <decorationLabel>${movies.length}</decorationLabel>
              <relatedContent>
                <grid>
                  <section>
                    ${createMovies(movies)}
                  </section>
                </grid>
              </relatedContent>
            </listItemLockup>
          </section>
          ${createSections(genres, movies)}
        </list>
      </catalogTemplate>
    </document>`;

  return template;
}
