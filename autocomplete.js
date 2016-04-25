'use strict';

var fs = require('fs');
var byline = require('byline');
var debug = require('debug')('autocomplete');

var Trie = require('./lib/trie');

var DEFAULT_DICTIONARY = '/usr/share/dict/words';


function autoComplete(opts, cb) {
	var stream;
	if (!cb) {
		cb = opts;
		opts = {};
	}
	var dictionary = opts.dictionary || DEFAULT_DICTIONARY;

	try {
		debug('Starting to read dictionary');
		stream = byline(fs.createReadStream(dictionary, { encoding: 'utf8' }));
	} catch (err) {
		return cb(err);
	}

	var trie = new Trie();

	debug('Starting to add words in trie');
	stream.on('data', function(line) {
	  trie.add(line);
	});

	stream.on('end', function(line) {
		debug('Dictionary read completed');
		cb(null, trie);
	});
}

module.exports = autoComplete;