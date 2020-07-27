module.exports.partial = function (func) {
  const args = Array.prototype.slice.call(arguments, 1)
  return function () {
    const allArguments = args.concat(Array.prototype.slice.call(arguments))
    return func.apply(this, allArguments)
  }
}
