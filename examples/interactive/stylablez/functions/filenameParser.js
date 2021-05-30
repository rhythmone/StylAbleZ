"use strict";
exports.__esModule = true;
exports.tokenMap = void 0;
exports.tokenMap = {
    'normal': 'NM',
    'multiply': 'ML',
    'screen': 'SC',
    'overlay': 'OL',
    'darken': 'DK',
    'darker-color': 'DC',
    'lighten': 'LI',
    'color-dodge': 'CD',
    'color-burn': 'CB',
    'hard-light': 'HL',
    'soft-light': 'SL',
    'pin-light': 'PL',
    'difference': 'DF',
    'exclusion': 'EX',
    'hue': 'HU'
};
var test = function () {
    var tokenCodes = Object.values(exports.tokenMap).join(')_|_(').toUpperCase();
    var tokenCodeExp = "d*[_-][(" + tokenCodes + ")]";
    console.log(tokenCodeExp);
    var z = 't01_n-shad1_br105_ma1_clS';
    var a = '02_n-shad2_op40_ma1_clS_blML';
    var b = '03_n-focus_op70_blML';
    var c = '04_n-eyeLiner_op50_ma1_clA';
    var d = '05_n-lash_ma1_clA';
    var e = '06_n-eye';
    var testNames = [z, a, b, c, d, e];
    console.log(testNames.join('\n').toUpperCase());
};
test();
