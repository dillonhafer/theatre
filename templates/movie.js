const reviewShelf = (movie) => {
  return (
    `<shelf>
      <header>
        <title>Ratings &amp; Awards</title>
      </header>
      <section>
        <ratingCard>
          <title>${movie.imdbRating} / 10</title>
          <ratingBadge value="${(movie.imdbRating / 10).toFixed(2)}"></ratingBadge>
          <description>Average of ${movie.imdbVotes} IMDB user votes.</description>
        </ratingCard>
        <reviewCard>
          <title>Awards</title>
          <description>${movie.awards}</description>
          <text>Released ${movie.released}</text>
        </reviewCard>
      </section>
    </shelf>
  `);
}

const productInfo = (movie) => {
  return (`
    <productInfo>
     <infoTable>
        <header>
           <title>Information</title>
        </header>
        <info>
           <header>
              <title>Studio</title>
           </header>
           <text>${movie.studio}</text>
        </info>
        <info>
           <header>
              <title>Runtime</title>
           </header>
           <text>${movie.digitalRuntime}</text>
        </info>
        <info>
           <header>
              <title>Format</title>
           </header>
           <text>${movie.format}</text>
        </info>
     </infoTable>
     <infoTable>
        <header>
           <title>Languages</title>
        </header>
        <info>
           <header>
              <title>Primary</title>
           </header>
           <text>${movie.language} (Dolby 5.1)</text>
        </info>
     </infoTable>
     <infoTable style="tv-line-spacing:10;">
        <header>
           <title>Accessibility</title>
        </header>
        <info>
           <header>
              <textBadge>SDH</textBadge>
           </header>
           <text>Subtitles for the deaf and Hard of Hearing (SDH) refer to subtitles in the original lanuage with the addition of relevant non-dialog information.</text>
        </info>
     </infoTable>
    </productInfo>
  `);
}

const actorShelf = (actors) => {
  const openingShelf =`<shelf>
    <header>
      <title>Cast &amp; Crew</title>
    </header>
    <section>`;

  const monograms = actors.split(', ').map((actor) => {
    const names = actor.split(' ');
    const first = names[0];
    const last  = names[names.length-1];

    return (`
      <monogramLockup>
        <monogram firstName="${first}" lastName="${last}"/>
        <title>${actor}</title>
        <subtitle>Actor</subtitle>
      </monogramLockup>
    `);
  });
  const closingShelf = '</section></shelf>';

  return [openingShelf, monograms, closingShelf].join('');
}

const createActors = (actors) => {
  if (!actors) {
    return
  }

  const actorEls = actors.split(',').map((a) => {
    return `<text>${a.trim()}</text>`;
  }).join('');

  return (`<info>
      <header>
        <title>Actors</title>
      </header>
      ${actorEls}
    </info>`);
}

const getRelatedMovies = (genres) => {
  return movies.filter((movie) => {
    if (movie.genres.length > 0) {
      return genres.includes(movie.genres[0]);
    }
  });
}

const showRelatedMovies = (movie) => {
  return getRelatedMovies(movie.genres).map((relatedMovie) => {
    if (relatedMovie.title !== movie.title) {
      return (`<lockup type="related">
                 <img src="${BASEURL+relatedMovie.img}" width="150" height="226" />
                 <title>${relatedMovie.title}</title>
               </lockup>`);
    }
  }).join("\n");
}

const MovieTemplate = (movie) => {
  return (`<?xml version="1.0" encoding="UTF-8" ?>
      <document>
         <productTemplate>
            <background></background>
            <banner>
               <infoList>
                  <info>
                     <header>
                        <title>Director</title>
                     </header>
                     <text>${movie.director.first} ${movie.director.last}</text>
                  </info>
                 ${createActors(movie.actors)}
               </infoList>
               <stack>
                  <title>${movie.title}</title>
                  <row>
                     <text>${movie.runtime}</text>
                     <text>${movie.genres.join(', ')}</text>
                     <text>${movie.year}</text>
                     <badge src="resource://${movie.rating}" class="badge" />
                  </row>
                  <description allowsZooming="true" moreLabel="more">${movie.description}</description>
                  <text>${movie.language}</text>
                  <row>
                    <buttonLockup type="preview">
                      <badge src="resource://button-preview" />
                      <title>Preview</title>
                    </buttonLockup>
                    <buttonLockup type="play">
                      <badge src="resource://button-play" />
                      <title>Play</title>
                    </buttonLockup>
                  </row>
               </stack>
               <heroImg src="${BASEURL+movie.img}" />
            </banner>
            <shelf>
               <header>
                  <title>Related Movies</title>
               </header>
               <section>
                 ${showRelatedMovies(movie)}
               </section>
            </shelf>
            ${reviewShelf(movie)}
            ${actorShelf(movie.actors)}
            ${productInfo(movie)}
         </productTemplate>
       </document>`);
}
