# Theatre

You should be able to get the Xcode tvOS TVML template to run
out-of-the-box by simply serving this folder after setup. Nginx
is a good canidate for serving this folder.

This is great for serving videos from a RaspberryPi.

## Basic Setup/Usage

Simply create a `/movies.json` endpoint:

```json
[
  {
    "year": "2015",
    "rating": "mpaa-pg13",
    "released": "17 Jul 2015",
    "runtime": "117 min",
    "director": {"first": "Peyton", "last": "Reed"},
    "writer": "Edgar Wright (screenplay), Joe Cornish (screenplay), Adam McKay (screenplay), Paul Rudd (screenplay), Edgar Wright (story by), Joe Cornish (story by), Stan Lee (based on the comics by), Larry Lieber (based on the comics by), Jack Kirby (based on the comics by)",
    "actors": "Paul Rudd, Michael Douglas, Evangeline Lilly, Corey Stoll",
    "language": "English",
    "country": "USA",
    "awards": "Nominated for 1 BAFTA Film Award. Another 2 wins &amp; 28 nominations.",
    "imdbRating": "7.4",
    "imdbVotes": "331,138",
    "video": "/movies/antman.m4v",
    "previewVideo": "/trailers/antman.m4v",
    "img": "/images/antman.jpg",
    "title": "Ant-Man",
    "description": "Armed with a super-suit with the astonishing ability to shrink in scale but increase in strength, cat burglar Scott Lang must embrace his inner hero and help his mentor, Dr. Hank Pym, plan and pull off a heist that will save the world.",
    "genres": ["Action", "Adventure", "Comedy"],
    "contentRatingRanking": 400,
    "rating": "mpaa-pg",
    "format": "Widescreen",
    "studio": "Marvel",
    "digitalRuntime": "1:57"
  }
]
```

## Preview

![theatre](https://cloud.githubusercontent.com/assets/1136388/20239549/41caac0c-a8c8-11e6-8957-2f4fd875b17a.png)
