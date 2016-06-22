(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var load = function load(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this);
      }
    };
    xhr.send();
  });
};

var parseByUrl = function parseByUrl(url) {
  return load(url).then(parseAPNG);
};

var parseAPNG = function parseAPNG(buffer) {
  var bytes = new Uint8Array(buffer);
  console.log(bytes);
  var PNG_SIGNATURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  return new Promise(function (resolve, reject) {
    for (var i = 0; i < PNG_SIGNATURE.length; i++) {
      if (PNG_SIGNATURE[i] != bytes[i]) {
        reject(new Error('Not a PNG file (invalid file signature)'));
        return;
      }
    }
    resolve();
  });
};

window.APNG = {
  parseByUrl: parseByUrl
};

},{}]},{},[1]);
