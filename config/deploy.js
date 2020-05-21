/* eslint-env node */
"use strict";

module.exports = function (deployTarget) {
  const ENV = {
    build: {},
    git: {
      commitMessage: "chore: deploy %@",
    },
  };

  return ENV;
};
