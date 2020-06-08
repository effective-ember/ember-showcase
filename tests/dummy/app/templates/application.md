<div class="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 sm:py-4 sm:items-baseline">
  <div class="flex items-center justify-between w-full">
    <div>
      <h1
        title="ember-showcase"
        class="flex items-baseline text-base font-semibold leading-6 font-regular md:text-lg"
      >
        <span class="mr-1">{{svg-jar "ember"}}</span>showcase
      </h1>
      <div class="flex-shrink-0 text-xs text-gray-500 sm:text-sm">
        Primitives to showcase interactive code samples
      </div>
    </div>
    <a
      class="text-black cursor-pointer sm:text-gray-500 hover:text-black"
      href="https://github.com/effective-ember/ember-showcase"
    >
      {{svg-jar "github" width="32px" height="32px" class="fill-current"}}
    </a>
  </div>
</div>

<div class="p-4 md-docs">

## What is this?

`ember-showcase` allows you to showcase the usage of your components by
rendering the component with accompanying code snippets to show how the
component is configured. Say you have a `<Greeting @name="..." />` component
and want to showcase its usage by demonstrating the possible arguments.
`ember-showcase` allows you do that with an output like the following:

<!-- BEGIN-SNIPPET intro-usage -->
<Demo data-test-first-demo as |demo|>
  <!-- BEGIN-SNIPPET greeting-usage -->
  <div class="mb-2">
    The <code class="font-bold">&lt;Greeting @name /&gt;</code> component renders a
    greeting (optionally uppercase) for the passed in <code class="font-bold">@name</code> argument.
  </div>

  <div>
    <label>
      <Input @type="checkbox" @checked={{this.uppercase}} />
      uppercase?
    </label>
  </div>
  <div class="mb-4">
    <label>
      Name:
      <Input @placeholder="Enter your name" @value={{this.name}} class="border border-black" />
    </label>
  </div>

  <div class="border p-4">
    <Greeting @uppercase={{this.uppercase}} @name={{this.name}} />
  </div>
  <!-- END-SNIPPET -->

  <demo.ui.useSnippet @name="greeting-usage.md" @title="greeting-usage.hbs" @language="html" />
  <demo.ui.useSnippet @name="greeting-template.hbs" @title="components/greeting.hbs" @language="html" />
  <demo.ui.useSnippet @name="greeting-component.js" @title="components/greeting.js" @language="js" />
  <demo.ui.useSnippet @name="intro-usage.md" @title="&nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; template for this showcase" @language="html" />
</Demo>
<!-- END-SNIPPET -->

## How to install

To install `ember-showcase` use the regular `ember-cli`-command to install an addon:

<Snippet @name="install-ember-showcase.sh" @language="shell-session"/>

## How to use

`ember-showcase` is an addon that provides you with <span class="underline">component abstractions
that you can build upon</span> to showcase interactive code-samples in your
applications.

This can be useful for <span class="underline">documenting an addon, a styleguide or when writing
a blog</span>.

`ember-showcase` comes with <span class="underline font-bold">no styling</span> - the
components it provides are not meant to to be used as they come. The bundled
components of `ember-showcase` are primitives that you will use to build your
own component abstraction for displaying interactive code samples that you
style to your liking.

The following guide walks you through the existing components in `ember-showcase`
and how you can use it to  create your own component abstraction on top of it.

## Components

### Showcase

The `Showcase`-component is a provider component that yields out everything you
need to build your own interactive code sample component.

`Showcase` - yields a nested hash that holds the following properties:

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

### Snippet
The `Snippet`-component is a component that you can use to render code-snippets registered via
[ember-code-snippets](https://github.com/ef4/ember-code-snippet).

Highlighting code snippets is done via [ember-prism](https://github.com/shipshapecode/ember-prism).
## Example

In this example we will walk you through creating your own `Demo`-component
that is based on `ember-showcase`. `Demo` will be able to show an interactive
code sample - i.e. an ui that shows the code to demo in action. You will also
be able to attach an optional set of code-snippets (based on
[ember-code-snippet](https://github.com/ef4/ember-code-snippet)) that you can
toggle between to show other developers how the component you are demoing will
be used in code. Code highlighting is based on
[ember-prism](https://github.com/shipshapecode/ember-prism) if you want to customize the theme used in code snippets please configure `ember-prism` accordingly.

This guide is customizing `ember-prism` in the following way for example:

<Demo @onlySnippets={{true}} as |demo|>
  <demo.ui.useSnippet @name="prism.js" @title="ember-cli-build.js" />
</Demo>

### Implementing `Demo`
And here's how you would use `ember-showcase` to implement `Demo` - you don't
need to do more than create your own component wrapper that uses `Showcase`
internally - the example uses [tailwindcss](https://tailwindcss.com/) for
styling but you can use whatever CSS authoring method you are comfortable with:

<Demo @onlySnippets={{true}} as |demo|>
  <demo.ui.useSnippet @name="demo.hbs" @title="<your-app>/app/components/demo.hbs" @language="html" />
</Demo>

### `Demo`-Usage

Here's how you will be able to use the `Demo` component:

<!-- BEGIN-SNIPPET demo-usage -->
<Demo as |demo|>
  <!-- BEGIN-SNIPPET code-snippet -->
  <div>
    Hello world!
  </div>
  <!-- END-SNIPPET -->
  <demo.ui.useSnippet @name="demo-usage.md" @title="template.hbs" @language="html" />
  <demo.ui.useSnippet @name="code-snippet.md" @title="snippet-usage" @language="html" />
</Demo>
<!-- END-SNIPPET -->

</div>
<div
  class="px-4 py-8 pt-8 mt-12 border-t border-gray-200 lg:py-16"
>
  <div class="text-base text-gray-500 leading-6 xl:text-center">
    © 2020 <a href="https://www.effective-ember.com" class="underline">Effective-Ember</a>.
  </div>
</div>
