/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    // Add options here
    snippetPaths: ['tests/dummy/app/snippets'],
    snippetSearchPaths: ['tests/dummy'],
    'markdown-it-templates': {
      options: {
        linkify: true,
        html: true,
        typographer: true,
      },
      format(content) {
        return `
          <div class="container mx-auto">
            ${content.html}
          </div>
          `;
      },
    },
    postcssOptions: {
      compile: {
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./tailwind.config.js'),
        ],
      },
    },

    'ember-prism': {
      theme: 'tomorrow',
      components: ['markup', 'bash', 'shell-session'],
      plugins: ['line-numbers'],
    },

    prember: {
      urls: ['/'],
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
