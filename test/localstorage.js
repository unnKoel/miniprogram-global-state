const localStorageMock = (() => {
  let store = {};
  return {
    getStorageSync(key) {
      return store[key];
    },
    setStorageSync(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();

// eslint-disable-next-line no-undef
Object.defineProperty(window, 'wx', { value: localStorageMock });
