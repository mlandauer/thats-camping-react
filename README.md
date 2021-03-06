[![Stories in Ready](https://badge.waffle.io/mlandauer/thats-camping-react.png?label=ready&title=Ready)](https://waffle.io/mlandauer/thats-camping-react)
[![Build Status](https://travis-ci.org/mlandauer/thats-camping-react.svg?branch=master)](https://travis-ci.org/mlandauer/thats-camping-react)

# It's raining and my weetbix is wet. That's Camping!

Find campsites near you in New South Wales, Australia. It covers camping on public, common land such as National Parks, State Forests and Local Councils.

Originally, quite some years ago now, I made this as an [iPhone app](https://github.com/mlandauer/ThatsCamping). I've had
[several](https://github.com/mlandauer/thats-camping-2-aborted-attempt) [brief](https://github.com/mlandauer/thats-camping-2) [attempts](https://github.com/mlandauer/thats-camping-3) over the years at redeveloping it as a javascript
application with the idea to make it  easy for people to add their own
campsite information. I was never quite happy with the result or the direction things were taking. Either the performance was dreadful, the framework was too painful to work with, or as is the way with these things, I just put is aside while other things took priority.

This is my latest attempt, this time built with [React](https://facebook.github.io/react/) / [Redux](http://redux.js.org/) / [Node](https://nodejs.org/).

It should work even when you're out in the middle of nowhere (when does that
ever happen camping?) and you have no phone signal.

**It's still very much a work in progress. I wouldn't even call it a [minimal viable product](https://en.wikipedia.org/wiki/Minimum_viable_product) yet.**

## Development

To run:
```
nvm use
npm install
npm run development
```

Point your web browser at [http://localhost:3000](http://localhost:3000)

And for testing goodness:
```
npm run test:watch
```

## Production

It currently runs without any issues on [Heroku](https://www.heroku.com/).

## Copyright & License

Copyright Matthew Landauer. Licensed under the GPL v3. See LICENSE.md for more details.
