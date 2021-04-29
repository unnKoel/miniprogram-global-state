import persist from '../src/persist';
import createStore from '../src/index';

describe('persist', () => {
  const createPersistStore = persist(createStore);
  const { dispatch } = createPersistStore(['works'])({
    count: 1,
    account: {},
    works: [],
  });

  jest.useFakeTimers();

  it('it should persist `works` values into localstorage when works are changed', () => {
    dispatch((state) => {
      const { works } = state;
      const work0 = works[0];

      return { ...state, works: [{ ...work0, type: 'page0' }] };
    });

    jest.runAllTimers();

    const persistantState = JSON.parse(wx.getStorageSync('_global_state'));
    expect(persistantState).toEqual({ works: [{ type: 'page0' }] });
  });

  it('state should be initialized when initially launch', () => {
    // eslint-disable-next-line no-shadow
    const { getState } = createPersistStore(['works'])({
      count: 1,
      account: {},
      works: [],
    });

    const state = getState();
    expect(state.works).toEqual([{ type: 'page0' }]);
  });
});
