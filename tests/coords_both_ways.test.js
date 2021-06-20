/* eslint-env node */
/* eslint quotes: [2, "single", "avoid-escape"] */
/* global coords_any_to_dec coords_dec_to_deg */

const cc = require('../lib/coordinate_conversions.js');

function test_coords_both_ways(coords) {
    var dec = cc.coords_any_to_dec(coords);
    var dm = cc.coords_dec_to_deg(dec[0], dec[1]);

    expect(coords).toEqual(dm);
}

test('coord conversion both ways (to decimal and back)', function () {
    // Homezone
    test_coords_both_ways("N53°06.083' E008°49.362'"); // Teecachelchen
    test_coords_both_ways("N53°05.743' E008°47.513'"); // Indianer!
    test_coords_both_ways("N53°04.516' E008°48.431'"); // Mitte Bremens
    test_coords_both_ways("N53°06.070' E008°48.636'"); // Gemeinsam stark

    // California
    test_coords_both_ways("N33°58.102' W117°19.035'"); // Top down bottoms up
    test_coords_both_ways("N37°48.153' W122°24.353'"); // http://coord.info/GC136C
    test_coords_both_ways("N35°22.099' W120°51.245'"); // http://coord.info/GC104D9

    // Australia & New Zealand
    test_coords_both_ways("S27°33.304' E135°27.085'"); // http://coord.info/GC2GA51
    test_coords_both_ways("S44°40.070' E167°55.516'"); // http://coord.info/GC1MN52

    // Date border
    test_coords_both_ways("S16°45.272' W179°47.577'"); // http://coord.info/GC2FQXV
    test_coords_both_ways("S23°37.627' W178°53.810'"); // http://coord.info/GC2EA3
    test_coords_both_ways("S21°10.411' W175°18.548'"); // http://coord.info/GC2YWAG
    test_coords_both_ways("N55°44.338' E160°16.797'"); // http://coord.info/GC2DG9N

    // Middle & South America
    test_coords_both_ways("N08°57.535' W079°32.956'"); // http://coord.info/GC1VYFE
    test_coords_both_ways("S34°35.498' W058°23.050'"); // http://coord.info/GCABE7

    // Egypt
    test_coords_both_ways("N26°09.376' E034°14.798'"); // http://coord.info/GC2VGZT
});
