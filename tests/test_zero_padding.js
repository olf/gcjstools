test( "zero_padding", function() {
    deepEqual(zero_padding(  10, 3), "010");
    deepEqual(zero_padding(  10, 5), "00010");
    deepEqual(zero_padding(  10, 2), "10");
    deepEqual(zero_padding(1000, 2), "1000");
});
