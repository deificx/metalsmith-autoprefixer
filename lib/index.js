function plugin(opts = {}) {
  const postcss = require("postcss")([require("autoprefixer-core")(opts)]);
  return function (files, _metalsmith, done) {
    setImmediate(done);
    Object.keys(files)
      .filter((file) => /\.css$/.test(file))
      .forEach((file) => {
        files[file].contents = Buffer.from(
          postcss.process(files[file].contents.toString()).css
        );
      });
  };
}

module.exports = plugin;
