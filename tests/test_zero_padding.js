/* eslint-env node */
/* eslint quotes: [2, "single", "avoid-escape"] */
/* global zero_padding */

var fs = require('fs');
var vm = require('vm');
vm.runInThisContext(fs.readFileSync('./lib/coordinate_conversions.js'));

var test = require('tape');

test('zero_padding', function(t) {
    t.deepEqual('010',   zero_padding(  10, 3));
    t.deepEqual('00010', zero_padding(  10, 5));
    t.deepEqual('10',    zero_padding(  10, 2));
    t.deepEqual('1000',  zero_padding(1000, 2));

    t.end();
});
