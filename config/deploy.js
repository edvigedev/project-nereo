'use strict';

module.exports = function (deployTarget) {
  let ENV = {
    build: {
      environment: 'production',
    },
    git: {
      repo: 'https://github.com/edvigedev/project-nereo.git', // 🔁 CHANGE THIS
      branch: 'gh-pages',
      worktreePath: '/tmp/project-nereo-gh-pages',
      commitMessage: 'Deploy project-nereo 🚀',
    },
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // git deploy settings are already included above
  }

  return ENV;
};
