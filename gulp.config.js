module.exports = function () {
  const config = {
    temp: './.tmp/',
    build: './build',

    alljs: [
      './src/**/*.js',
      './*.js',
    ],
    index: './src/app/index.html',
    htmltemplates: './src/app/**/*.html',
    scss: './src/**/*.scss',

    templateCache: {
      file: 'templates.js',
      options: {
        module: 'app.core',
        standAlone: false,
        root: './',
      },
    },
  };

  return config;
};
