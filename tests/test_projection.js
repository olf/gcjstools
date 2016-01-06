function test_deg_projection(start, angle, distance, expected) {
	var src = coords_any_to_dec(start);

	var dst = projection(src[0], src[1], angle, distance);
	dst = coords_dec_to_deg(dst[0], dst[1]);

	deepEqual(dst, expected, start + " (" + angle + "°, " + distance + "m) --> " + dst + " (tobe: " + expected + ")");
}

test("coord projection", function() {
	test_deg_projection("N53°06.083' E008°49.362'", 0, 0, "N53°06.083' E008°49.362'");

	// too high degrees
	test_deg_projection("N53°06.083' E008°49.362'", 372, 0, "N53°06.083' E008°49.362'");

	// too low degrees
	test_deg_projection("S53°06.083' E008°49.362'", -50, 0, "N53°06.083' E008°49.362'");
	test_deg_projection("N53°06.083' E008°49.362'", -400, 0, "N53°06.083' E008°49.362'");

	// Real tests
	test_deg_projection("N53°06.097' E008°49.788'", 265, 1982, "N53°06.004' E008°48.014'");
	test_deg_projection("N53°02.891' E008°58.702'",  98,  433, "N53°02.858' E008°59.087'");
	test_deg_projection("N53°05.510' E008°49.786'", 333, 2398, "N53°06.663' E008°48.807'");
	test_deg_projection("N53°06.880' E008°47.792'", 148, 1771, "N53°06.070' E008°48.635'");

	// BB-Issue #2 Cases:
	test_deg_projection("N53°05.920' E008°48.675'",   0, 200, "N53°06.028' E008°48.675'");
	test_deg_projection("N53°05.920' E008°48.675'", 180, 200, "N53°05.812' E008°48.675'");
	test_deg_projection("N53°05.920' E008°48.675'",   0, 300, "N53°06.082' E008°48.675'");
	test_deg_projection("N53°05.920' E008°48.675'", 180, 300, "N53°05.758' E008°48.675'");
	test_deg_projection("N53°05.920' E008°48.675'",   0, 400, "N53°06.136' E008°48.675'");
	test_deg_projection("N53°05.920' E008°48.675'", 180, 400, "N53°05.704' E008°48.675'");
});
