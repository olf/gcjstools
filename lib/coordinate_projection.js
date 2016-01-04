// Projection routine of http://www.zwanziger.de/gc_tools_projwp.html

function projection(lat, lng, angle, distance) {
    while (angle > 360) {
        angle = angle - 360;
    }

    while (angle < 0) {
        angle = angle + 360;
    }

    c = (distance / 1000) / 6371.0;

    if (lat >= 0) {
        a = (90 - lat) * Math.PI / 180;
    } else {
        a = lat * Math.PI / 180;
    }

    q = (360 - angle) * Math.PI / 180;
    b = Math.acos(Math.cos(q) * Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c));

    target_lat = 90 - (b * 180 / Math.PI);

    if (target_lat > 90) {
        target_lat = target_lat - 180; // southern hemisphere
    }

    if ((a + b) === 0) {
        g = 0.0; // infinite denominator
    } else {
        g = (Math.cos(c) - Math.cos(a) * Math.cos(b)) / (Math.sin(a) * Math.sin(b));
        if (g > 1.0) g = 1.0; // in some rare cases, this may happen due to rounding errors
        g = Math.acos(g);
    }

    if (angle <= 180) {
        g = (-1.0) * g;
    }

    target_lng = (lng - ((g * 180.0) / Math.PI));

    return [target_lat, target_lng];
}