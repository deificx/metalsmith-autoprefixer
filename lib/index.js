var postcss = require("postcss");

function plugin(opts) {
  var opts = opts || {};
  var css = postcss([require("autoprefixer-core")(opts)]);
  return function (files, _metalsmith, done) {
    setImmediate(done);
    Object.keys(files)
      .filter((file) => /\.css$/.test(file))
      .forEach(function (file) {
        files[file].contents = Buffer.from(
          css.process(files[file].contents.toString()).css
        );
      });
  };
}

module.exports = plugin;
