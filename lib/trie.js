'use strict';

function Node(value) {
	this.value = value;
	this.children = {};
	this.isLeaf = false;
	return this;
}

function Trie() {
	this.root = new Node(null);
	this.add = function(word) {
		var ptr = this.root;
		for (var i = 0; i < word.length; i++) {
			if (!ptr.children[word[i]]) {
				ptr.children[word[i]] = new Node(word[i]);
			}
			ptr = ptr.children[word[i]];
		}
		ptr.isLeaf = true;
	};

	this.getAllWords = function () {
		var result = [];

		function traverse(node, path, length) {
			if (!node) return;

			if (node.value) path[length++] = node.value;

			if (node.isLeaf) result.push(path.join(""));
			
			Object.keys(node.children).forEach(function(key){
				traverse(node.children[key], path, length);
			});
		}

		traverse(this.root, [], 0);
		return result;
	};

	this.getWords = function (key, limit) {

		var result = [];
		var ptr = this.root;
		var prefix = key.slice(0, key.length - 1);

		if (!key || !key.length) return result;

		for (var i = 0; i < key.length; i++) {
			if (ptr.children[key[i]]) {
				ptr = ptr.children[key[i]];
			} else {
				return result;
			}
		}

		function traverse(node, path, length) {
			if (!node) return;

			if (node.value) path[length++] = node.value;

			if (node.isLeaf) result.push(prefix + path.slice(0, length).join(""));

			if (limit && result.length >= limit) return;
			
			Object.keys(node.children).forEach(function(key){
				traverse(node.children[key], path, length);
			});
		}

		traverse(ptr, [], 0);
		return result;
	};

	return this;
}

module.exports = Trie;
