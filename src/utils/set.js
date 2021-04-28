const set = (obj, path, value) => {
  if (Object(obj) !== obj) return obj;
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  // eslint-disable-next-line no-return-assign
  path.slice(0, -1).reduce((a, c, i) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    (Object(a[c]) === a[c] // Does the key exist and is its value an object?
      ? a[c]
      // eslint-disable-next-line no-bitwise
      : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
        ? []
        : {}),
  obj)[path[path.length - 1]] = value;

  return obj;
};

export default set;
