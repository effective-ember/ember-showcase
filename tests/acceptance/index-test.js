import { click, visit } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | index", function (hooks) {
  setupApplicationTest(hooks);

  // basic regression test until prism.js supports updating line numbers
  test("updates line numbers when changing snippets", async function (assert) {
    await visit("/");

    assert
      .dom("[data-test-first-demo] .code-block .line-numbers-rows span")
      .exists({ count: 21 }, "shows the 21 line numbers for the snippet");

    await click('[data-test-activate-snippet="greeting-template.hbs"]');

    assert
      .dom("[data-test-first-demo] .code-block .line-numbers-rows span")
      .exists({ count: 1 }, "shows the 1 line number for the snippet");
  });
});
