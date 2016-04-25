Autocomplete
==========

Autocomplete utility using trie data structure in javascript.
A demo is hosted at http://linkm.in/autocompleteweb/[http://linkm.in/autocompleteweb/]

## Usage

```js
var autoComplete = require('./autocomplete');
autoComplete(opts, function(err, dictionary) {
   dictionary.getWord("hac", 10);
});
```

options: {
  dictionary: 'PATH_TO_DICTIONARY_FILE'
}

If not provided default '/usr/share/dict/words' will be picked on unix machines.

## API
### getWords(key, limit)
### add(word)


## TODO
- test
- ES6


