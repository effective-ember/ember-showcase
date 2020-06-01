ember-showcase [![Build Status](https://travis-ci.org/effective-ember/ember-showcase.svg?branch=master)](https://travis-ci.org/effective-ember/ember-showcase)
==============================================================================

A set of primitives to showcase interactive code examples


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-showcase
```


Usage
------------------------------------------------------------------------------

`ember-showcase` is an addon that provides you with component abstractions
that you can build upon to showcase interactive code-samples in your
applications.

This can be useful for documenting an addon, a styleguide or when writing
a blog.

`ember-showcase` comes with no styling. As it is meant as a base for your own
abstraction on top of it you can style it as you see fit. The follwing guide
walks you through the existing components in `ember-showcase` and how you could
create your own component abstraction on top of it.

### Components

#### Showcase

The `Showcase`-component is a provider component that yields out everything you
need to build your own interactive code sample component.

`Showcase` yields a nested hash that holds the following properties:

* `ui` - a set of declarative components
  * `useSnippet` - a component that you use to register snippets to the `Showcase`
  * `snippet` - a component that renders a code snippet
* `state` - state of the `Showcase` you can use to build your own code sample
  abstraction
  * `activeSnippet` - the currently active code snippet of all all the registered
    snippets. By default this will be the first registered snippet
  * `snippets` - all the registered snippets on the `Showcase`
* `actions` - a set of actions you can trigger on the `Showcase`
  * `registerSnippet` - an action to register a code snippet on the `Showcase`
  * `activateSnippet` - an action to switch out the currently active snippet

### Example

In this example we will walk you through creating your own `Demo`-component
that is based on `ember-showcase`. `Demo` will be able to show an interactive
code sample - i.e. an ui that shows the code to demo in action. You will also
be able to attach an optional set of code-snippets (based on
[ember-code-snippet](https://github.com/ef4/ember-code-snippet)) that you can
toggle between to show other developers how the component you are demoing will
be used in code.

Here's how you will be able to use it:

```hbs
<Demo as |demo|>
  <div>
    Hello world!
  </div>
  <demo.ui.useSnippet @name="demo-usage.md" @title="template.hbs" @language="html" />
</Demo>
```

And here's how you would use `ember-showcase` to implement `Demo`:

```hbs
<Showcase as |showcase|>
  <div>
    {{#each showcase.state.snippets as |snippet|}}
      <button
        type="button"
        {{on "click" (fn showcase.actions.activateSnippet snippet)}}
      >
        {{snippet.title}}
      </button>
    {{/each}}
  </div>
  <div>
    {{yield (hash
      ui=(hash
        useSnippet=showcase.ui.useSnippet
      )
    )}}
  </div>
  {{#if showcase.state.activeSnippet}}
    <showcase.ui.snippet
      @name={{showcase.state.activeSnippet.name}}
      @language={{showcase.state.activeSnippet.language}}
    />
  {{/if}}
</Showcase>
```

Bundled addons
------------------------------------------------------------------------------

`ember-showcase` bundles some addons to provide its functionality.

* [ember-code-snippet](https://github.com/ef4/ember-code-snippet) - for providing code snippet functionality
* [ember-prism](https://github.com/shipshapecode/ember-prism) - for highlighting code snippets

If you need to customize code-snippet or code-highlighting functionality please
have a look at the documentation of both addons.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------
This project is developed by [effective-ember](https://www.effective-ember.com/) and [contributors](https://github.com/LevelbossMike/ember-showcase/graphs/contributors). It is licensed under the [MIT License](LICENSE.md).
