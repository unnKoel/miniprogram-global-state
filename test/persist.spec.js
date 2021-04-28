import persist from '../src/persist';
import createStore from '../src/index';

describe('persist', () => {
  const createPersistStore = persist(createStore);
  const { dispatch } = createPersistStore(['works'])({
    count: 1,
    account: { name: 'zzr' },
    works: [{ type: 'component' }],
  });

  it('it should persist `works` values into localstorage when works are changed', () => {
    dispatch((state) => {
      const { works } = state;
      const work0 = works[0];

      return { ...state, works: [{ ...work0, type: 'page0' }] };
    });
  });
});
