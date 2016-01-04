function textToValues(text) {
    function crossSum(value) {
        return value
            .toString()
            .split('')
            .map(function(v) {return parseInt(v);})
            .reduce(function(p, v) {return p+v;});
    }

    text = text.toUpperCase();

    text = text.replace(/Ä/g, "AE");
    text = text.replace(/Ö/g, "OE");
    text = text.replace(/Ü/g, "UE");
    text = text.replace(/ß/g, "SS");

    var values = text.split('').map(function(v) {
        var code = v.charCodeAt();
        return (code >= 65 && code <= 90 ? code-64 : 0);
    });

    var sum = values.reduce(function(p, v) {return p+v;});
    var iterated_cross_sum = crossSum(sum);

    while (iterated_cross_sum.toString().length > 1) {
        iterated_cross_sum = crossSum(iterated_cross_sum);
    }

    return {
        text: text,
        sum: sum,
        values: values,
        cross_sum: crossSum(sum),
        cross_sum_iterated: iterated_cross_sum,
    };
}
