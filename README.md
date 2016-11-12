# Theatre

You should be able to get the Xcode tvOS TVML template to run
out-of-the-box by simply serving this folder after setup. Nginx
is a good canidate for serving this folder.

## Basic Setup/Usage

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
]
```

## Preview

![theatre](https://cloud.githubusercontent.com/assets/1136388/20239549/41caac0c-a8c8-11e6-8957-2f4fd875b17a.png)
