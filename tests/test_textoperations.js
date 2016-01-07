test("TextOps - Text Cleanup", function() {
    deepEqual(textToValues("A").text, "A");

    deepEqual(textToValues("ä").text, "AE");
    deepEqual(textToValues("Ä").text, "AE");
    deepEqual(textToValues("ß").text, "SS");
    deepEqual(textToValues("Üßä").text, "UESSAE");
});

test("TextOps - Basic Sums", function() {
    deepEqual(textToValues("A").sum, 1);
    deepEqual(textToValues("B").sum, 2);
    deepEqual(textToValues("C").sum, 3);
    deepEqual(textToValues("D").sum, 4);
    deepEqual(textToValues("E").sum, 5);
    deepEqual(textToValues("F").sum, 6);
    deepEqual(textToValues("G").sum, 7);
    deepEqual(textToValues("H").sum, 8);
    deepEqual(textToValues("I").sum, 9);
    deepEqual(textToValues("J").sum, 10);
    deepEqual(textToValues("K").sum, 11);
    deepEqual(textToValues("L").sum, 12);
    deepEqual(textToValues("M").sum, 13);
    deepEqual(textToValues("N").sum, 14);
    deepEqual(textToValues("O").sum, 15);
    deepEqual(textToValues("P").sum, 16);
    deepEqual(textToValues("Q").sum, 17);
    deepEqual(textToValues("R").sum, 18);
    deepEqual(textToValues("S").sum, 19);
    deepEqual(textToValues("T").sum, 20);
    deepEqual(textToValues("U").sum, 21);
    deepEqual(textToValues("V").sum, 22);
    deepEqual(textToValues("W").sum, 23);
    deepEqual(textToValues("X").sum, 24);
    deepEqual(textToValues("Y").sum, 25);
    deepEqual(textToValues("Z").sum, 26);

    deepEqual(textToValues("AZ").sum, 1+26);
    deepEqual(textToValues("ZZ").sum, 26+26);
    deepEqual(textToValues("AA").sum, 1+1);

    deepEqual(textToValues("ZZZZ").sum, 4*26); // 104
    deepEqual(textToValues("ZZZZZZZ").sum, 7*26); // 182
});

test("TextOps - Hello World", function() {
    deepEqual(textToValues("HELLO WORLD").sum, 124);
    deepEqual(textToValues("HELLO WORLD").sum, textToValues("Hello World").sum);
    deepEqual(textToValues("Hello World").sum, textToValues("!!!HeLlO WoRlD???").sum);

    deepEqual(textToValues("HELLO WORLD").cross_sum, textToValues("Hello World").cross_sum);
    deepEqual(textToValues("HELLO WORLD").cross_sum, textToValues("Hello World").cross_sum);
    deepEqual(textToValues("!!!HeLlO WoRlD???").cross_sum, textToValues("HELLO WORLD").cross_sum);

    deepEqual(textToValues("HELLO WORLD").cross_sum_iterated, textToValues("Hello World").cross_sum_iterated);
    deepEqual(textToValues("Hello World").cross_sum_iterated, textToValues("!!!HeLlO WoRlD???").cross_sum_iterated);
    deepEqual(textToValues("!!!HeLlO WoRlD???").cross_sum_iterated, textToValues("HELLO WORLD").cross_sum_iterated);
});

test("TextOps - Sanitized Sums", function() {
   deepEqual(textToValues("Ä").sum, textToValues("A").sum + textToValues("E").sum);
   deepEqual(textToValues("Ö").sum, textToValues("O").sum + textToValues("E").sum);
   deepEqual(textToValues("Ü").sum, textToValues("U").sum + textToValues("E").sum);
   deepEqual(textToValues("ß").sum, 2*textToValues("S").sum);
   deepEqual(textToValues("ä").sum, textToValues("a").sum + textToValues("e").sum);
   deepEqual(textToValues("ö").sum, textToValues("o").sum + textToValues("e").sum);
   deepEqual(textToValues("ü").sum, textToValues("u").sum + textToValues("e").sum);

   deepEqual(textToValues("A-+()").sum, 1);
   deepEqual(textToValues("-+()").sum, 0);
   deepEqual(textToValues("?*-+(){|}[]^\\").sum, 0);
});

test("TextOps - Cross Sums", function() {
    deepEqual(textToValues("A").cross_sum, 1);
    deepEqual(textToValues("Z").cross_sum, 8);

    deepEqual(textToValues("AZ").cross_sum, 2+7);
    deepEqual(textToValues("ZZ").cross_sum, 5+2);
    deepEqual(textToValues("AA").cross_sum, 2);

    deepEqual(textToValues("ZZZZ").cross_sum, 1+0+4);
    deepEqual(textToValues("ZZZZZZZ").cross_sum, 1+8+2);
});

test("TextOps - Iterated Cross Sums", function() {
    deepEqual(textToValues("A").cross_sum_iterated, 1);
    deepEqual(textToValues("Z").cross_sum_iterated, 8);

    deepEqual(textToValues("AZ").cross_sum_iterated, 9);
    deepEqual(textToValues("ZZ").cross_sum_iterated, 7);
    deepEqual(textToValues("AA").cross_sum_iterated, 2);

    deepEqual(textToValues("ZZZZZZZ").cross_sum_iterated, 2);
});

test("TextOps - Values", function() {
    deepEqual(textToValues("A").values, [1]);
    deepEqual(textToValues("A A").values, [1,1]);
    deepEqual(textToValues("Ä-A").values, [1,5,1]);
    deepEqual(textToValues("ä+a").values, [1,5,1]);
});
