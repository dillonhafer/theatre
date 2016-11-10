const CatalogTemplate = () => {
  return (
    `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <catalogTemplate>
        <banner>
          <title>Dillon's Home Theatre 📽</title>
        </banner>
        <list>
          <section>
            <listItemLockup>
              <title>Adventure Time Videos</title>
              <decorationLabel>2</decorationLabel>
              <relatedContent>
                <grid>
                  <section>
                    <lockup videoURL="http://theatre.dillonhafer.com/lemon.mp4">
                      <img src="http://theatre.dillonhafer.com/images/marceline.png" width="500" height="308" />
                    </lockup>
                    <lockup videoURL="http://theatre.dillonhafer.com/movies/Big%20Hero%206/BIG_HERO_6.m4v">
                      <img src="http://theatre.dillonhafer.com/images/deal-with-it.png" width="500" height="308" />
                    </lockup>
                  </section>
                </grid>
              </relatedContent>
            </listItemLockup>
          </section>
        </list>
      </catalogTemplate>
    </document>`
  )
}
