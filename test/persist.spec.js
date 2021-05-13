import persist from '../src/persist';
import createStore from '../src/index';

describe('persist', () => {
  const initialState = {
    count: 1,
    account: {},
    works: [],
  };

  const reducer = (state = initialState, action) => {
    if (action.type === 'updateWorksAndCount') {
      const { works } = state;
      const work0 = works[0];

      return { ...state, works: [{ ...work0, type: 'page0' }], count: 2 };
    }

    return state;
  };

  const createPersistStore = persist(createStore);
  const { dispatch } = createPersistStore(['works', 'count'])(reducer);

  jest.useFakeTimers();

  it('it should persist `works` and `count` values into localstorage when works are changed', () => {
    dispatch({ type: 'updateWorksAndCount' });

    jest.runAllTimers();

    const persistantState = JSON.parse(wx.getStorageSync('_global_state'));
    expect(persistantState).toEqual({ works: [{ type: 'page0' }], count: 2 });
  });

  it('state should be initialized when initially launch', () => {
    // eslint-disable-next-line no-shadow
    const { getState } = createPersistStore(['works'])((state = {
      count: 1,
      account: {},
      works: [],
    }) => state);

    const state = getState();
    expect(state.works).toEqual([{ type: 'page0' }]);
    expect(state.count).toEqual(2);
  });

  describe('persisit deep values', () => {
    // eslint-disable-next-line no-shadow
    const initialState = {
      a: { b: 1, c: { d: 4, t: 3 } },
    };

    // eslint-disable-next-line no-shadow
    const reducer = (state = initialState, action) => {
      if (action.type === 'updateACD') {
        const { a } = state;
        return { ...state, a: { b: a.b, c: { d: 5, t: a.c.t } } };
      }

      return state;
    };
    // eslint-disable-next-line no-shadow
    const createPersistStore = persist(createStore);
    // eslint-disable-next-line no-shadow
    const { dispatch, getState } = createPersistStore(['a.c.d'])(reducer);

    jest.useFakeTimers();

    it('It should persist deep values when values have be changed', () => {
      dispatch({ type: 'updateACD' });

      jest.runAllTimers();

      const persistantState = JSON.parse(wx.getStorageSync('_global_state'));
      const state = getState();
      expect(persistantState).toEqual({ 'a.c.d': 5 });
      expect(state).toEqual({ a: { b: 1, c: { d: 5, t: 3 } } });
    });

    it('deep values state should be initialized when initially launch', () => {
      // eslint-disable-next-line no-shadow
      const { getState } = createPersistStore(['a.c.d'])((state = { a: { b: 1, c: { d: -1, t: 3 } } }) => state);

      const state = getState();
      expect(state).toEqual({ a: { b: 1, c: { d: 5, t: 3 } } });
    });
  });
});
