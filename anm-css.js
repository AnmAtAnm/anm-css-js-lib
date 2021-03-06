// Client-side Javascript function library for working with CSS.
// https://github.com/AnmAtAnm/anm-css-js-lib
Anm = (typeof Anm === "undefined") ? {} : Anm;
(function() {
  /** No-op method if anm-dev.js not loaded. */
  Anm.NOOP = function() {};
  Anm.log = Anm.log || Anm.NOOP;

  Anm.appendCssStylesheet = function(url, onload) {
    var linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "stylesheet");
    linkEl.setAttribute("type", "text/css");
    linkEl.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(linkEl);

    if (onload) {
      linkEl.onload = onload;
    }

    return linkEl;
  }

  Anm.getStylesheet = function(urlSuffix, mediaText) {
    if (typeof mediaText === 'undefined') {
      mediaText = 'all';
    }

    for(var sheet in document.styleSheets) {
      if (!urlSuffix || (sheet.href && sheet.href.endsWith(urlSuffix))) {
        if (sheet.media.mediaText == mediaText) {
          return sheet;
        }
      }
    }
    return null;  // Not found;
  }

  // http://css-tricks.com/get-value-of-css-rotation-through-javascript/
  Anm.extractRotationRad = function(el, adjustForScale) {
    var style = window.getComputedStyle(el);

    var transformText =
        style.getPropertyValue("-webkit-transform") ||
        style.getPropertyValue("-moz-transform") ||
        style.getPropertyValue("-ms-transform") ||
        style.getPropertyValue("-o-transform") ||
        style.getPropertyValue("transform");
    if (!transformText || transformText == "none") {
      return 0;
    }
    //Anm.log('transformText = ' + transformText);

    var matrix = transformText.split('(')[1];
    matrix = matrix.split(')')[0];
    matrix = matrix.split(',');

    return Math.atan2(matrix[1], matrix[0]);
  }

  return Anm;
})();
