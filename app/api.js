var Bluebird = require('bluebird');
var omdb     = require('omdbjs');
var _        = require('lodash');

var searchStore = require('./stores/search-store');
var movieStore  = require('./stores/movie-store');

omdb.setApiUrl('https://www.omdbapi.com');

function searchEntity (name, year) {
  return omdb.searchTitle(name)
             .year(year)
             .request()
             .then(function(req) {
               return Bluebird.resolve(req.body.Search);
             });
}

function getMovie (id) {
  return ombd.imdbId(id);
}

exports.search = function(name, year) {
  var searchMovieP = _.partial(searchEntity, name, year);
  var addToSTore   = _.partial(searchStore.addAll, name, year);

  return new Bluebird(function(resolve, reject) {
    searchStore.find(name, year)
               .then(resolve, searchMovieP)
               .then(searchStore.addAll, reject);
  });
};

exports.get = function(id) {
  var getMovieP = _.partial(getMovie, id);

  return new Bluebird(function(resolve, reject) {
    return movieStore.getByIMDBId(id).then(resolve, getMovieP);
  });
};
