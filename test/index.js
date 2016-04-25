var assert = require('chai').assert;
var expect = require('chai').expect;
var autoComplete = require('../');



describe('autocomplete', function(){
    var dictionary;
    before(function(done){
        autoComplete(function(err, dict) {
            dictionary = dict;
            done();
        });
    });
    describe('basics',function(){
        it('should give autocomplete suggestions', function () {
            assert.isAbove(dictionary.getWords("man").length, 0);
        });

        it('should contain strings suggestions', function () {
            expect(dictionary.getWords("man")[0]).to.be.a('string');
        });

    });
});
