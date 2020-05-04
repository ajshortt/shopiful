module.exports.defaultErrors = [{message: 'an unknown error has occurred.'}];

module.exports.defaultResolver = function(path) {
  const keys = path.split('.');

  return function({model, errors}) {
    return new Promise((resolve, reject) => {
      try {
        const result = keys.reduce((ref, key) => {
          return ref[key];
        }, model);

        resolve(result);
      } catch (_) {
        if (errors) {
          reject(errors);
        } else {
          reject(defaultErrors);
        }
      }
    });
  };
}
