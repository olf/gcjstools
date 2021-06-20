/* eslint-env node */
/* eslint quotes: [2, "single", "avoid-escape"] */
/* global zero_padding */

const cc = require('../lib/coordinate_conversions.js');

test('zero_padding', function () {
    expect('010').toEqual(cc.zero_padding(10, 3));
    expect('00010').toEqual(cc.zero_padding(10, 5));
    expect('10').toEqual(cc.zero_padding(10, 2));
    expect('1000').toEqual(cc.zero_padding(1000, 2));
});
