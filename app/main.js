var _        = require('lodash');
var Bluebird = require('bluebird');

var api        = require('./api');
var domHelpers = require('./lib/dom-helpers');

var FILENAME_REGEXP = /((.+[\s|\.])\(?(\d{4})\)?)+/;

// Only trigger the code if we can actually assure we are on tbh page
if (!_.startsWith(document.location.host, 'thepiratebay')) {
  return;
}


function trimString (str) {
  return str.replace(/^\s+|\s+$/g, '');
}

function normalizeFilename (filename) {
  filename = filename || '';
  return filename.replace(/[\.]/g, ' ');
}

function normalizeYear (date) {
  if (!date) {
    return null;
  }
  return +date.replace(/\D/g, '');
}

function getElementData (element) {
  var el      = element.querySelector('.detName a');
  var rawName = domHelpers.getInnerHtml(el);
  var data    = FILENAME_REGEXP.exec(rawName) || [];
  return {
    isMovie : domHelpers.isMovieOrVideo(element),
    element : element,
    name    : trimString(normalizeFilename(data[2])),
    year    : normalizeYear(data[3])
  };
}


function addRatingHeader () {
  var tr = document.querySelector('#tableHead tr');
  tr.appendChild(domHelpers.createRatingColumnByType('th'));
}

function addRatingColumn (entity) {
  entity.element.appendChild(domHelpers.createRatingColumn('td'));
}

function searchEntity (entity) {
  if (_.isEmpty(entity.name)) {
    return Bluebird.reject();
  }

  return api.search(entity.name, entity.year);
}

var entities = _.map(domHelpers.findAllRows(), getElementData);

if (entities.length) {
  addRatingHeader();
  entities = _.take(entities, 5);
  _.each(entities, function (entity) {
    searchEntity(entity).then(function (foundEntity) {
      console.log(foundEntity);
    }, _.noop);
  });
}
