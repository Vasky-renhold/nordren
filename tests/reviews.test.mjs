import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

test("reviews preserve the five owner-supplied Norwegian quotes and source details", () => {
  const loaded = { exports: {} };
  const source = ts.transpileModule(readFileSync("content/reviews.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(source, { module: loaded, exports: loaded.exports });
  const { customerReviews, reviewSummary } = loaded.exports;
  const approved = [
    ["Unnur", "2026-09-11", "Rengjøringstjenester – 140 m²", "Veldig fornøyd med jobben. Marta hjalp til med både vasking og litt rydding, og gjorde akkurat det vi hadde avtalt. Pålitelig og effektiv. Jeg hadde gjerne valgt henne igjen og kan absolutt anbefale henne."],
    ["James", "2026-09-02", "Flyttevask – 30 m²", "Det ble vasket veldig godt. Kommunikasjonen var god. Punktlig og presist."],
    ["Bjørn Aron", "2026-08-31", "Flyttevask – 60 m²", "Utførte god vask, som ble godkjent av utleier på første forsøk. Fleksibel og god kommunikasjon om både overlevering av nøkler og hva som måtte vaskes. Anbefales til andre"],
    ["Tord", "2026-08-06", "Rengjøringstjenester – 103 m²", "Hyggelig, hjelpsom og godt vasket!"],
    ["Bjørn Olav", "2026-07-27", "Rengjøringstjenester – 120 m²", "Enkel å kommunisere med, bra kvalitet på arbeid, og fleksibel. Tusen takk!"],
  ];
  assert.equal(customerReviews.length, approved.length);
  assert.equal(new Set(customerReviews.map(review => review.id)).size, approved.length);
  customerReviews.forEach((review, index) => {
    assert.deepEqual([review.reviewer, review.date, review.service.nb, review.text], approved[index]);
    assert.equal(review.rating, 5);
    assert.equal(review.language, "nb");
    assert.equal(review.sourceUrl, "https://mittanbud.no/bedrift/9727626");
    assert.ok(review.translation.length > 0 && review.translation !== review.text);
    assert.ok(review.service.en.length > 0);
  });
  assert.equal(reviewSummary.count, 5);
  assert.equal(reviewSummary.rating, 5);
});
