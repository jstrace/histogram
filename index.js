
/**
 * Module dependencies.
 */

var chart = require('chart');

/**
 * Return a histogram with `data`.
 *
 * @param {Array} data
 * @param {Object} [opts]
 * @return {String}
 * @api public
 */

module.exports = function(data, opts){
  var opts = opts || {};
  var bins = opts.bins || 50;
  data = bin(data, bins, opts);
  return chart(data);
};

/**
 * Bin `data` into `total` bins.
 *
 * @param {Array} data
 * @param {Number} total
 * @param {Object} options
 * @return {Array}
 * @api public
 */

function bin(data, total, opts){
  opts = opts || {};
  var mi = null == opts.min ? min(data) : opts.min;
  var ma = null == opts.max ? max(data) : opts.max;
  var delta = ma - mi;

  // initialize bins
  var bins = [];
  for (var i = 0; i < total; i++) bins[i] = 0;

  // distribute
  for (var i = 0; i < data.length; i++) {
    var n = data[i];
    var p = (n - mi) / (ma - mi);
    var b = Math.max(0, (total * p | 0) - 1);
    bins[b]++;
  }

  return bins;
};

/**
 * Min of `arr`.
 */

function min(arr) {
  var n = arr[0];

  for (var i = 1; i < arr.length; i++) {
    n = arr[i] < n ? arr[i] : n;
  }

  return n;
}

/**
 * Max of `arr`.
 */

function max(arr) {
  var n = arr[0];

  for (var i = 1; i < arr.length; i++) {
    n = arr[i] > n ? arr[i] : n;
  }

  return n;
}