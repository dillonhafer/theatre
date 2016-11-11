const createMovies = (movies) => {
  let tmp = ""
  movies.forEach((movie, index) => {
    tmp += `<lockup index="${index}" xdescription="${movie.description}" xtitle="${movie.title}" videoURL="http://theatre.dillonhafer.com/${movie.video}">
              <img src="http://theatre.dillonhafer.com/images/${movie.img}" width="300" height="500" />
              <title>${movie.title}</title>
            </lockup>`;
  });
  return tmp;
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
              <title>Movies</title>
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
        </list>
      </catalogTemplate>
    </document>`;

  return template;
}
