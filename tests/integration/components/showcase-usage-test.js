import { render, click } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | showcase usage', function (hooks) {
  setupRenderingTest(hooks);

  module('`Showcase` is a functional component that', function () {
    test('renders the block it is passed', async function (assert) {
      await render(hbs`
        <Showcase>
          <div data-test-example></div>
        </Showcase>
      `);

      assert.dom('[data-test-example]').exists('example block is rendered');
    });

    module('yields', function () {
      module('ui.', function () {
        module(
          '`useSnippet`- a component that can be used to register snippets on a `Showcase`',
          function () {
            test('the first snippet will be the active by default', async function (assert) {
              await render(hbs`
              <Showcase
                as |showcase|
              >
                {{#if showcase.state.activeSnippet}}
                  <div
                    data-test-snippet={{showcase.state.activeSnippet.name}}
                  >
                  </div>
                {{/if}}
                <showcase.ui.useSnippet @name="snippet-a.js" @language="javascript" />
                <showcase.ui.useSnippet @name="snippet-b.js" @language="javascript" />
              </Showcase>
            `);

              assert
                .dom('[data-test-snippet="snippet-a.js"]')
                .exists('Snippet a is active');

              assert
                .dom('[data-test-snippet="snippet-b.js"]')
                .doesNotExist('Snippet b is not active');
            });
          }
        );

        module(
          '`snippet` - a component that can be used to display a code sample',
          function () {
            test('expects a name to be passed', async function (assert) {
              await render(hbs`
              <Showcase as |showcase|>
                <showcase.ui.snippet @name="snippet-a.js" />
              </Showcase>
            `);

              assert.dom('code').exists('a code block is rendered');

              assert.dom('code').hasText(`const a = "a"; console.log(a);`);

              assert
                .dom('code')
                .hasClass(
                  'language-javascript',
                  'snippet autodetects a snippets language'
                );
            });

            test('language can be overriden', async function (assert) {
              await render(hbs`
              <Showcase as |showcase|>
                <showcase.ui.snippet @name="snippet-a.js" @language="html" />
              </Showcase>
            `);

              assert.dom('code').exists('a code block is rendered');
              assert.dom('code').hasClass('language-html');
            });
          }
        );
      });

      module('actions.', function () {
        test('`activateSnippet` can be used to activate a snippet', async function (assert) {
          await render(hbs`
            <Showcase
              as |showcase|
            >
              {{#each showcase.state.snippets as |snippet|}}
                <button
                  type="button"
                  data-test-snippet-button={{snippet.name}}
                  {{on "click" (fn showcase.actions.activateSnippet snippet)}}
                >
                  {{snippet.name}}
                </button>
              {{/each}}

              {{#if showcase.state.activeSnippet}}
                <div
                  data-test-snippet={{showcase.state.activeSnippet.name}}
                >
                </div>
              {{/if}}

              <showcase.ui.useSnippet @name="snippet-a.js" @language="javascript" />
              <showcase.ui.useSnippet @name="snippet-b.js" @language="javascript" />
            </Showcase>
          `);

          assert
            .dom('[data-test-snippet="snippet-a.js"]')
            .exists('Snippet a is active');

          await click('[data-test-snippet-button="snippet-b.js"]');

          assert
            .dom('[data-test-snippet="snippet-b.js"]')
            .exists('Snippet b is active now');
        });

        test('`registerSnippet` can be used to register a snippet', async function (assert) {
          await render(hbs`
            <Showcase
              as |showcase|
            >
              {{#each showcase.state.snippets as |snippet|}}
                <div data-test-snippet={{snippet.name}}></div>
              {{/each}}

              <button
                type="button"
                data-test-register-snippet-button
                {{on "click" (fn showcase.actions.registerSnippet (hash name="snippet-a.js"))}}
              >
                Register snippet A
              </button>
            </Showcase>
          `);

          assert
            .dom('[data-test-snippet]')
            .doesNotExist(
              'no snippet is rendered without registering a snippet'
            );

          await click('[data-test-register-snippet-button]');

          assert
            .dom('[data-test-snippet]')
            .exists(
              'after registering snippets are accessible via `state.snippets`'
            );
        });
      });
    });
  });
});
