function test_coords_dec_to_deg(ns, ew, expected) {
	var coords = coords_dec_to_deg(ns, ew);

	deepEqual(coords, expected, ns + "," + ew + " = " + expected);
}

test( "coords_dec_to_deg - geocaching.com tests", function() {
	// Homezone
	test_coords_dec_to_deg(53.10138, 8.8227, "N53°06.083' E008°49.362'"); // Teecachelchen
	test_coords_dec_to_deg(53.09572, 8.79188, "N53°05.743' E008°47.513'"); // Indianer!
	test_coords_dec_to_deg(53.07527, 8.80718, "N53°04.516' E008°48.431'"); // Mitte Bremens
	test_coords_dec_to_deg(53.10117, 8.8106, "N53°06.070' E008°48.636'"); // Gemeinsam stark

    // California
	test_coords_dec_to_deg(33.96837, -117.31725, "N33°58.102' W117°19.035'"); // Top down bottoms up
	test_coords_dec_to_deg(37.80255, -122.40588, "N37°48.153' W122°24.353'"); // http://coord.info/GC136C
	test_coords_dec_to_deg(35.36832, -120.85408, "N35°22.099' W120°51.245'"); // http://coord.info/GC104D9

    // Australia & New Zealand
	test_coords_dec_to_deg(-27.55507, 135.45142, "S27°33.304' E135°27.085'"); // http://coord.info/GC2GA51
	test_coords_dec_to_deg(-44.66783, 167.92527, "S44°40.070' E167°55.516'"); // http://coord.info/GC1MN52

    // Date border
	test_coords_dec_to_deg(-16.75453, -179.79295, "S16°45.272' W179°47.577'"); // http://coord.info/GC2FQXV
	test_coords_dec_to_deg(-23.62712, -178.89683, "S23°37.627' W178°53.810'"); // http://coord.info/GC2EA3
	test_coords_dec_to_deg(-21.17352, -175.30913, "S21°10.411' W175°18.548'"); // http://coord.info/GC2YWAG
	test_coords_dec_to_deg(55.73897, 160.27995, "N55°44.338' E160°16.797'"); // http://coord.info/GC2DG9N

    // Middle & South America
	test_coords_dec_to_deg(8.95892, -79.54927, "N08°57.535' W079°32.956'"); // http://coord.info/GC1VYFE
	test_coords_dec_to_deg(-34.59163, -58.38417, "S34°35.498' W058°23.050'"); // http://coord.info/GCABE7

    // Egypt
	test_coords_dec_to_deg(26.15627, 34.24663, "N26°09.376' E034°14.798'"); // http://coord.info/GC2VGZT
});