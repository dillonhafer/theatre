const MenuBarTemplate = () => {
  let template = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <menuBarTemplate>
        <menuBar>
           <menuItem id="navigation_recent" data-identifier="recent">
              <title>Recently Watched</title>
           </menuItem>
           <menuItem id="navigation_genres" data-identifier="genres">
              <title>Genres</title>
           </menuItem>
           <menuItem id="navigation_search" data-identifier="search">
              <title>Search</title>
           </menuItem>
        </menuBar>
      </menuBarTemplate>
    </document>`;
  return template;
}
