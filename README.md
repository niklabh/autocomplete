Autocomplete
==========

Autocomplete utility using trie data structure in javascript.

## Usage

```js
var autoComplete = require('./autocomplete');
autoComplete(opts, function(err, dictionary) {
   dictionary.getWord("hac", 10);
});
```

options: {
  dictionary: '<PATH_TO_DICTIONARY_FILE>'
}

## API
### getWord(key, limit)
### add(word)


## TODO
- test
- ES6


