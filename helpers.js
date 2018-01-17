const compose = (...fns) => fns.reduce((f1, f2) => composeB(f1)(f2), x => x)

const composeB = f1 => f2 => x => f1(f2(x))

const filter = fn => arr => arr
  .reduce((memo, num) => {
    if (fn(num)) return memo.concat(num)
    return memo
  }, [])

const invoke = (fn, ...args) => obj => obj[fn] ? obj[fn](...args) : obj

const map = fn => arr => {
  if (arr instanceof Array) return arr.map(fn)
  return Object.keys(arr).map(key => fn(arr[key]))
}

const nth = n => arr => arr[n]

const sort = fn => arr => arr.sort(fn)

const toPairs = obj => Object.keys(obj)
  .map(key => [key, obj[key]])

const reject = fn => arr => filter((...args) => !fn(...args))(arr)

const tap = fn => input => {
  fn(input)
  return input
}

module.exports = {
  compose,
  filter,
  invoke,
  map,
  nth,
  reject,
  sort,
  tap,
  toPairs
}
