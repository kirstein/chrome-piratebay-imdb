var Bluebird = require('bluebird');
var _        = require('lodash');

function createDataEntity (name, year, entity) {
  return

}

function getStore () {
  return chrome.storage.local;
}

function appendToName (name, year, entity) {
  return getStore().set();
}

function findByNameAndYear (name, year) {
  return new Bluebird(function(resolve, reject) {
    getStore().get(name, function(entity) {

    });
  });
}

exports.find = function(name, year) {
  return Bluebird.reject();
};

exports.add = function(name, year, entity) {
  return Bluebird.resolve(entity);
};

exports.addAll = function(name, year, arr) {
  var add = _.partial(exports.add, name, year);
  return Bluebird.all(_.map(arr, add));
};
