/* eslint-env node */
/* eslint quotes: [2, "single", "avoid-escape"] */
/* global expect, test */

const to = require('../lib/text_operations.js');

test('TextOps - Text Cleanup', function () {
    expect('A').toEqual(to.textToValues('A').text);

    expect('AE').toEqual(to.textToValues('ä').text);
    expect('AE').toEqual(to.textToValues('Ä').text);
    expect('SS').toEqual(to.textToValues('ß').text);

    expect('UESSAE').toEqual(to.textToValues('Üßä').text);
});

test('TextOps - Basic Sums', function () {
    expect(1).toEqual(to.textToValues('A').sum);
    expect(2).toEqual(to.textToValues('B').sum);
    expect(3).toEqual(to.textToValues('C').sum);
    expect(4).toEqual(to.textToValues('D').sum);
    expect(5).toEqual(to.textToValues('E').sum);
    expect(6).toEqual(to.textToValues('F').sum);
    expect(7).toEqual(to.textToValues('G').sum);
    expect(8).toEqual(to.textToValues('H').sum);
    expect(9).toEqual(to.textToValues('I').sum);
    expect(10).toEqual(to.textToValues('J').sum);
    expect(11).toEqual(to.textToValues('K').sum);
    expect(12).toEqual(to.textToValues('L').sum);
    expect(13).toEqual(to.textToValues('M').sum);
    expect(14).toEqual(to.textToValues('N').sum);
    expect(15).toEqual(to.textToValues('O').sum);
    expect(16).toEqual(to.textToValues('P').sum);
    expect(17).toEqual(to.textToValues('Q').sum);
    expect(18).toEqual(to.textToValues('R').sum);
    expect(19).toEqual(to.textToValues('S').sum);
    expect(20).toEqual(to.textToValues('T').sum);
    expect(21).toEqual(to.textToValues('U').sum);
    expect(22).toEqual(to.textToValues('V').sum);
    expect(23).toEqual(to.textToValues('W').sum);
    expect(24).toEqual(to.textToValues('X').sum);
    expect(25).toEqual(to.textToValues('Y').sum);
    expect(26).toEqual(to.textToValues('Z').sum);

    expect(1 + 26).toEqual(to.textToValues('AZ').sum);
    expect(26 + 26).toEqual(to.textToValues('ZZ').sum);
    expect(1 + 1).toEqual(to.textToValues('AA').sum);

    expect(4 * 26).toEqual(to.textToValues('ZZZZ').sum); // 104
    expect(7 * 26).toEqual(to.textToValues('ZZZZZZZ').sum); // 182
});

test('TextOps - Hello World', function () {
    expect(124).toEqual(to.textToValues('HELLO WORLD').sum);
    expect(to.textToValues('Hello World').sum).toEqual(to.textToValues('HELLO WORLD').sum);
    expect(to.textToValues('!!!HeLlO WoRlD???').sum).toEqual(to.textToValues('Hello World').sum);

    expect(to.textToValues('Hello World').cross_sum).toEqual(to.textToValues('HELLO WORLD').cross_sum);
    expect(to.textToValues('Hello World').cross_sum).toEqual(to.textToValues('HELLO WORLD').cross_sum);
    expect(to.textToValues('HELLO WORLD').cross_sum).toEqual(to.textToValues('!!!HeLlO WoRlD???').cross_sum);

    expect(to.textToValues('Hello World').cross_sum_iterated).toEqual(to.textToValues('HELLO WORLD').cross_sum_iterated);
    expect(to.textToValues('!!!HeLlO WoRlD???').cross_sum_iterated).toEqual(to.textToValues('Hello World').cross_sum_iterated);
    expect(to.textToValues('HELLO WORLD').cross_sum_iterated).toEqual(to.textToValues('!!!HeLlO WoRlD???').cross_sum_iterated);
});

test('TextOps - Sanitized Sums', function () {
    expect(to.textToValues('A').sum + to.textToValues('E').sum).toEqual(to.textToValues('Ä').sum);
    expect(to.textToValues('O').sum + to.textToValues('E').sum).toEqual(to.textToValues('Ö').sum);
    expect(to.textToValues('U').sum + to.textToValues('E').sum).toEqual(to.textToValues('Ü').sum);
    expect(2 * to.textToValues('S').sum).toEqual(to.textToValues('ß').sum);
    expect(to.textToValues('a').sum + to.textToValues('e').sum).toEqual(to.textToValues('ä').sum);
    expect(to.textToValues('o').sum + to.textToValues('e').sum).toEqual(to.textToValues('ö').sum);
    expect(to.textToValues('u').sum + to.textToValues('e').sum).toEqual(to.textToValues('ü').sum);

    expect(1).toEqual(to.textToValues('A-+()').sum);
    expect(0).toEqual(to.textToValues('-+()').sum);
    expect(0).toEqual(to.textToValues('?*-+(){|}[]^\\').sum);
});

test('TextOps - Cross Sums', function () {
    expect(1).toEqual(to.textToValues('A').cross_sum);
    expect(8).toEqual(to.textToValues('Z').cross_sum);

    expect(2 + 7).toEqual(to.textToValues('AZ').cross_sum);
    expect(5 + 2).toEqual(to.textToValues('ZZ').cross_sum);
    expect(2).toEqual(to.textToValues('AA').cross_sum);

    expect(1 + 0 + 4).toEqual(to.textToValues('ZZZZ').cross_sum);
    expect(1 + 8 + 2).toEqual(to.textToValues('ZZZZZZZ').cross_sum);
});

test('TextOps - Iterated Cross Sums', function () {
    expect(1).toEqual(to.textToValues('A').cross_sum_iterated);
    expect(8).toEqual(to.textToValues('Z').cross_sum_iterated);

    expect(9).toEqual(to.textToValues('AZ').cross_sum_iterated);
    expect(7).toEqual(to.textToValues('ZZ').cross_sum_iterated);
    expect(2).toEqual(to.textToValues('AA').cross_sum_iterated);

    expect(2).toEqual(to.textToValues('ZZZZZZZ').cross_sum_iterated);
});

test('TextOps - Values', function () {
    expect([1]).toEqual(to.textToValues('A').values);
    expect([1, 1]).toEqual(to.textToValues('A A').values);
    expect([1, 5, 1]).toEqual(to.textToValues('Ä-A').values);
    expect([1, 5, 1]).toEqual(to.textToValues('ä+a').values);
});
