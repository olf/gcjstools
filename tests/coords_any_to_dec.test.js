/* eslint-env node */
/* eslint quotes: [2, "single", "avoid-escape"] */
/* global coords_any_to_dec groundspeak_round */

const cc = require('../lib/coordinate_conversions.js');

function test_coords_any_to_dec(input, expected) {
    var coords = cc.coords_any_to_dec(input);
    coords = cc.groundspeak_round(coords);

    expect(expected).toEqual(coords);
}

test('coords_any_to_dec - invalid cases - general', function () {
    test_coords_any_to_dec('xxx', false);
});

test('coords_any_to_dec - invalid cases - too many decimal digits', function () {
    test_coords_any_to_dec('N53°09.0000 E8°44.100', false);
    test_coords_any_to_dec('N53°09.000 E8°44.0000', false);
    test_coords_any_to_dec('N53°09.0000 E8°44.0000', false);
});

test('coords_any_to_dec - invalid cases - minutes too large', function () {
    // minutes too large
    test_coords_any_to_dec('N53°60.000 E8°44.000', false);
    test_coords_any_to_dec('N53°70.000 E8°10.000', false);
    test_coords_any_to_dec('N53°80.000 E8°10.000', false);
    test_coords_any_to_dec('N53°90.000 E8°10.000', false);
    test_coords_any_to_dec('N53°170.000 E8°10.000', false);
    test_coords_any_to_dec('N53°59.000 E8°60.000', false);
    test_coords_any_to_dec('N53°59.000 E8°70.000', false);
    test_coords_any_to_dec('N53°59.000 E8°80.000', false);
    test_coords_any_to_dec('N53°59.000 E8°90.000', false);
    test_coords_any_to_dec('N53°59.000 E8°170.000', false);
});

test('coords_any_to_dec - trim', function () {
    test_coords_any_to_dec("   N53°09.000' E8°44.100'  ", [53.15, 8.735]);
    test_coords_any_to_dec('\n\nN53°09.000 E8°44.100\n\n', [53.15, 8.735]);
    test_coords_any_to_dec(' \n \n N53°09.000 E8°44.100 \n \n ', [53.15, 8.735]);
});

test('coords_any_to_dec - valid cases', function () {
    test_coords_any_to_dec('N53°09.000 E8°44.100', [53.15, 8.735]);
    test_coords_any_to_dec("N53°09.000' E8°44.100'", [53.15, 8.735]);
    test_coords_any_to_dec("N 53°09.000'  E8°44.100   ", [53.15, 8.735]);
    test_coords_any_to_dec('N 53°9.000 E008°44.100 ', [53.15, 8.735]);
});

test('coords_any_to_dec - valid cases - decimal to decimal', function () {
    test_coords_any_to_dec('5.123,6.123', [5.123, 6.123]);
    test_coords_any_to_dec('5.123, 6.123', [5.123, 6.123]);
    test_coords_any_to_dec('5.123,   6.123    ', [5.123, 6.123]);
    test_coords_any_to_dec('5.123333333333333333,   6.12366666666666666667    ', [5.12333, 6.12367]);
});

test('coords_any_to_dec - geocaching.com tests', function () {
    // Homezone
    test_coords_any_to_dec('N 53° 06.083 E 008° 49.362', [53.10138, 8.8227]); // Teecachelchen
    test_coords_any_to_dec('N 53° 05.743 E 008° 47.513', [53.09572, 8.79188]); // Indianer!
    test_coords_any_to_dec('N 53° 04.516 E 008° 48.431 ', [53.07527, 8.80718]); // Mitte Bremens
    test_coords_any_to_dec('N 53° 06.070 E 008° 48.636 ', [53.10117, 8.8106]); // Gemeinsam stark

    // California
    test_coords_any_to_dec('N 33° 58.102 W 117° 19.035', [33.96837, -117.31725]); // Top down bottoms up
    test_coords_any_to_dec('N 37° 48.153 W 122° 24.353 ', [37.80255, -122.40588]); // http://coord.info/GC136C
    test_coords_any_to_dec('N 35° 22.099 W 120° 51.245', [35.36832, -120.85408]); // http://coord.info/GC104D9

    // Australia & New Zealand
    test_coords_any_to_dec('S 27° 33.304 E 135° 27.085 ', [-27.55507, 135.45142]); // http://coord.info/GC2GA51
    test_coords_any_to_dec('S 44° 40.070 E 167° 55.516 ', [-44.66783, 167.92527]); // http://coord.info/GC1MN52

    // Date border
    test_coords_any_to_dec('S 16° 45.272 W 179° 47.577', [-16.75453, -179.79295]); // http://coord.info/GC2FQXV
    test_coords_any_to_dec('S 23° 37.627 W 178° 53.810 ', [-23.62712, -178.89683]); // http://coord.info/GC2EA3
    test_coords_any_to_dec('S 21° 10.411 W 175° 18.548 ', [-21.17352, -175.30913]); // http://coord.info/GC2YWAG
    test_coords_any_to_dec('N 55° 44.338 E 160° 16.797', [55.73897, 160.27995]); // http://coord.info/GC2DG9N

    // Middle & South America
    test_coords_any_to_dec('N 08° 57.535 W 079° 32.956 ', [8.95892, -79.54927]); // http://coord.info/GC1VYFE
    test_coords_any_to_dec('S 34° 35.498 W 058° 23.050 ', [-34.59163, -58.38417]); // http://coord.info/GCABE7

    // Egypt
    test_coords_any_to_dec('N 26° 09.376 E 034° 14.798 ', [26.15627, 34.24663]); // http://coord.info/GC2VGZT
});
