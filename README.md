## Explanation ##

We'll be using a simple concept of re-rendering the dom whenever the data of sticky notes have been updated. It's a little ridiculous to write to localstorage on every `keyup` event but I felt like it helped the overall experience, instead of constantly pressing save.

Each sticky note is created via template strings and appended to the dom.

I was tempted to move code into various files but I felt it would have overkill as `index.js` does not exceed 150 lines yet. By wrapping everything into a IIFE to implement the module pattern, we can keep most of our variables private and rely on closures to execute most of our code.

As for the ID of each sticky note, I felt that using the date(converted to ~~seconds~~ milliseconds since unix epoch) would be a sufficiently unique id. Hopefully the user does not add a sticky note faster than that.

**edit** in light of the time constraint i have, I did not full test the code and app on IE >= 10.

## How to run ##

No npm packages accept a `http-server` to serve data. It's not needed but I wanted to serve a nice bundle.

```
$ npm start
```