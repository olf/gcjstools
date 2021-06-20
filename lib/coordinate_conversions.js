/* exported groundspeak_round, decimals_padding, coords_any_to_dec, coords_dec_to_deg */

// TODO: Check for wrong angles (EW>180, NS>?)

function groundspeak_round(coords) {
    // round to 5 decimals, like gc.com
    coords[0] = Math.round(coords[0] * 100000) / 100000;
    coords[1] = Math.round(coords[1] * 100000) / 100000;

    return coords;
}

// Source: http://stackoverflow.com/a/2221210
function decimals_padding(x, zeros) {
    var s = x.toString();
    if (s.indexOf('.') == -1) s += '.';
    while (s.length < s.indexOf('.') + zeros + 1) s += '0';
    return s;
}

function zero_padding(x, length) {
    var k = x.toString();
    if (length < k.length) return k;

    k = '0000000000' + x.toString();

    return k.substr(k.length - length, length);
}

function coords_any_to_dec(coords) {
    // trim whitespace first
    coords = coords.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');

    var matches = coords.match(/^(([NSns]) ?(\d+)[° ]+([0-5]\d|\d)\.(\d{3})\'? +([EWew]) ?(\d+)[° ]+([0-5]\d|\d)\.(\d{3})\'? *|(-?\d+\.?\d+)[, ]+(-?\d+\.?\d+) *)$/);

    if (matches === null) return false;

    var ns = 0;
    var ew = 0;

    if (matches[10] !== undefined && matches[11] !== undefined) {
        ns = parseFloat(matches[10]);
        ew = parseFloat(matches[11]);
    } else {
        ns = (+matches[3]) + (+matches[4]) / 60 + ((+matches[5]) / 60 / 1000);
        if (matches[2] == 'S') ns = -ns;

        ew = (+matches[7]) + (+matches[8]) / 60 + ((+matches[9]) / 60 / 1000);
        if (matches[6] == 'W') ew = -ew;
    }

    return [ns, ew];
}

function coords_dec_to_deg(ns, ew) {
    var ns_txt, ns_fac, ew_txt, ew_fac;

    if (ns > 0) {
        ns_txt = 'N';
        ns_fac = 1;
    } else {
        ns_txt = 'S';
        ns_fac = -1;
    }

    if (ew > 0) {
        ew_txt = 'E';
        ew_fac = 1;
    } else {
        ew_txt = 'W';
        ew_fac = -1;
    }

    var ns_deg = Math.floor(Math.abs(ns));
    var ns_min = Math.abs(Math.round((ns - (ns_deg * ns_fac)) * 60 * 1000) / 1000);

    var ns_frac = Math.round((ns_min - Math.floor(ns_min)) * 1000);
    ns_min = Math.floor(ns_min);

    var ew_deg = Math.floor(Math.abs(ew));
    var ew_min = Math.abs(Math.round((ew - (ew_deg * ew_fac)) * 60 * 1000) / 1000);

    var ew_frac = Math.round((ew_min - Math.floor(ew_min)) * 1000);
    ew_min = Math.floor(ew_min);

    return ns_txt + zero_padding(Math.abs(ns_deg), 2) + '°' + zero_padding(ns_min, 2) + '.' + zero_padding(ns_frac, 3) + '\' ' +
        ew_txt + zero_padding(Math.abs(ew_deg), 3) + '°' + zero_padding(ew_min, 2) + '.' + zero_padding(ew_frac, 3) + '\'';
}

module.exports = { zero_padding, coords_any_to_dec, coords_dec_to_deg, decimals_padding, groundspeak_round }
