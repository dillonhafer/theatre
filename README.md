# HaferTheatre

Create a `js/movies.js` file:

`cp js/movies{.example,}.js`

Then add movies to the `BaseMovies` const

```js
// js/movies.js
// Add movies to this data structure
const BaseMovies = [
  {
    video: "/movies/antman.m4v",
    img: "/images/ant-man.jpg",
    title: "Ant-Man",
    description: "Armed with a super-suit with the astonishing...",
    contentRatingDomain: "movie",
    contentRatingRanking: 300,
    genres: ['Action', 'Adventure', 'Comedy'],
  },
].sort(titleSort);
```
