/* eslint-env node */
/* eslint quotes: [2, "single", "avoid-escape"] */
/* global textToValues */

var fs = require('fs');
var vm = require('vm');
vm.runInThisContext(fs.readFileSync('./lib/text_operations.js'));

var test = require('tape');

test('TextOps - Text Cleanup', function(t) {
    t.deepEqual('A', textToValues('A').text);

    t.deepEqual('AE', textToValues('ä').text);
    t.deepEqual('AE', textToValues('Ä').text);
    t.deepEqual('SS', textToValues('ß').text);

    t.deepEqual('UESSAE', textToValues('Üßä').text);

    t.end();
});

test('TextOps - Basic Sums', function(t) {
    t.deepEqual( 1, textToValues('A').sum);
    t.deepEqual( 2, textToValues('B').sum);
    t.deepEqual( 3, textToValues('C').sum);
    t.deepEqual( 4, textToValues('D').sum);
    t.deepEqual( 5, textToValues('E').sum);
    t.deepEqual( 6, textToValues('F').sum);
    t.deepEqual( 7, textToValues('G').sum);
    t.deepEqual( 8, textToValues('H').sum);
    t.deepEqual( 9, textToValues('I').sum);
    t.deepEqual(10, textToValues('J').sum);
    t.deepEqual(11, textToValues('K').sum);
    t.deepEqual(12, textToValues('L').sum);
    t.deepEqual(13, textToValues('M').sum);
    t.deepEqual(14, textToValues('N').sum);
    t.deepEqual(15, textToValues('O').sum);
    t.deepEqual(16, textToValues('P').sum);
    t.deepEqual(17, textToValues('Q').sum);
    t.deepEqual(18, textToValues('R').sum);
    t.deepEqual(19, textToValues('S').sum);
    t.deepEqual(20, textToValues('T').sum);
    t.deepEqual(21, textToValues('U').sum);
    t.deepEqual(22, textToValues('V').sum);
    t.deepEqual(23, textToValues('W').sum);
    t.deepEqual(24, textToValues('X').sum);
    t.deepEqual(25, textToValues('Y').sum);
    t.deepEqual(26, textToValues('Z').sum);

    t.deepEqual(1+26,  textToValues('AZ').sum);
    t.deepEqual(26+26, textToValues('ZZ').sum);
    t.deepEqual(1+1,   textToValues('AA').sum);

    t.deepEqual(4*26, textToValues('ZZZZ').sum); // 104
    t.deepEqual(7*26, textToValues('ZZZZZZZ').sum); // 182

    t.end();
});

test('TextOps - Hello World', function(t) {
    t.deepEqual(124, textToValues('HELLO WORLD').sum);
    t.deepEqual(textToValues('Hello World').sum, textToValues('HELLO WORLD').sum);
    t.deepEqual(textToValues('!!!HeLlO WoRlD???').sum, textToValues('Hello World').sum);

    t.deepEqual(textToValues('Hello World').cross_sum, textToValues('HELLO WORLD').cross_sum);
    t.deepEqual(textToValues('Hello World').cross_sum, textToValues('HELLO WORLD').cross_sum);
    t.deepEqual(textToValues('HELLO WORLD').cross_sum, textToValues('!!!HeLlO WoRlD???').cross_sum);

    t.deepEqual(textToValues('Hello World').cross_sum_iterated, textToValues('HELLO WORLD').cross_sum_iterated);
    t.deepEqual(textToValues('!!!HeLlO WoRlD???').cross_sum_iterated, textToValues('Hello World').cross_sum_iterated);
    t.deepEqual(textToValues('HELLO WORLD').cross_sum_iterated, textToValues('!!!HeLlO WoRlD???').cross_sum_iterated);

    t.end();
});

test('TextOps - Sanitized Sums', function(t) {
    t.deepEqual(textToValues('A').sum + textToValues('E').sum, textToValues('Ä').sum);
    t.deepEqual(textToValues('O').sum + textToValues('E').sum, textToValues('Ö').sum);
    t.deepEqual(textToValues('U').sum + textToValues('E').sum, textToValues('Ü').sum);
    t.deepEqual(2*textToValues('S').sum, textToValues('ß').sum);
    t.deepEqual(textToValues('a').sum + textToValues('e').sum, textToValues('ä').sum);
    t.deepEqual(textToValues('o').sum + textToValues('e').sum, textToValues('ö').sum);
    t.deepEqual(textToValues('u').sum + textToValues('e').sum, textToValues('ü').sum);

    t.deepEqual(1, textToValues('A-+()').sum);
    t.deepEqual(0, textToValues('-+()').sum);
    t.deepEqual(0, textToValues('?*-+(){|}[]^\\').sum);

    t.end();
});

test('TextOps - Cross Sums', function(t) {
    t.deepEqual(1, textToValues('A').cross_sum);
    t.deepEqual(8, textToValues('Z').cross_sum);

    t.deepEqual(2+7, textToValues('AZ').cross_sum);
    t.deepEqual(5+2, textToValues('ZZ').cross_sum);
    t.deepEqual(2, textToValues('AA').cross_sum);

    t.deepEqual(1+0+4, textToValues('ZZZZ').cross_sum);
    t.deepEqual(1+8+2, textToValues('ZZZZZZZ').cross_sum);

    t.end();
});

test('TextOps - Iterated Cross Sums', function(t) {
    t.deepEqual(1, textToValues('A').cross_sum_iterated);
    t.deepEqual(8, textToValues('Z').cross_sum_iterated);

    t.deepEqual(9, textToValues('AZ').cross_sum_iterated);
    t.deepEqual(7, textToValues('ZZ').cross_sum_iterated);
    t.deepEqual(2, textToValues('AA').cross_sum_iterated);

    t.deepEqual(2, textToValues('ZZZZZZZ').cross_sum_iterated);

    t.end();
});

test('TextOps - Values', function(t) {
    t.deepEqual([1], textToValues('A').values);
    t.deepEqual([1,1], textToValues('A A').values);
    t.deepEqual([1,5,1], textToValues('Ä-A').values);
    t.deepEqual([1,5,1], textToValues('ä+a').values);

    t.end();
});
