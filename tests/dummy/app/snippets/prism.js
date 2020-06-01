module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    // ...
    "ember-prism": {
      theme: "tomorrow",
      components: ["markup", "bash", "shell-session"],
      plugins: ["line-numbers"],
    },
    // ...
  });
};
