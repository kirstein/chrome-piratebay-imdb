var _ = require('lodash');

function toLowerCase(txt) {
  txt = txt || '';
  return txt.toLowerCase();
}

exports.findAllRows = function () {
  return document.querySelectorAll('#searchResult tbody tr');
};

exports.getInnerHtml = function (element) {
  return element.innerHTML;
};

exports.findElementTypes = function (element) {
  var subEls = element.querySelectorAll('.vertTh a');
  return _.map(subEls, this.getInnerHtml).map(toLowerCase);
};

exports.isMovieOrVideo = function (element) {
  var types = this.findElementTypes(element);
  return !!_.intersection([
    'video',
    'movies'
  ], types).length;
};

exports.createRatingColumnByType = function(columnType) {
  columnType = columnType || 'th';

  var TITLE_NAME = "Rating";
  var th    = document.createElement(columnType);
  var abbr  = document.createElement('abbr');
  var txt   = document.createTextNode(TITLE_NAME);
  abbr.appendChild(txt);
  abbr.setAttribute("title", TITLE_NAME);
  th.appendChild(abbr);
  return th;
};
