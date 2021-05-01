/* eslint-disable max-classes-per-file */
import createStore from '../src/store';

describe('createStore', () => {
  const { connect, dispatch } = createStore({
    count: 1,
    account: { name: 'zzr' },
    works: [{ type: 'component' }],
  });

  describe('connect with component', () => {
    class Component {
      constructor(define) {
        // eslint-disable-next-line no-return-assign
        Object.keys(define).forEach((key) => this[key] = define[key]);
        // eslint-disable-next-line no-unused-expressions
        this.lifetimes && this.lifetimes.attached && this.lifetimes.attached.bind(this)();
      }

      setData(data) {
        this.data = { ...this.data, ...data };
      }
    }

    it('it should attach slice state on data property', () => {
      const componentA = new Component(connect((state) => ({ count: state.count }))({}));
      expect(componentA.data.count).toBe(1);
      expect(componentA.data.account).toBe(undefined);
    });

    it('it should attach whole state on data property if no `mapstate` function pass to connect', () => {
      const componentB = new Component(connect()({}));
      expect(componentB.data.count).toBe(1);
      expect(componentB.data.account).toEqual({ name: 'zzr' });
    });

    it('it should attach a lifecycle method names `attached`', () => {
      const componentA = new Component(connect()({}));
      expect(componentA.lifetimes.attached).toBeDefined();
    });

    it('component\'s data should reflect the change when dispatch', () => {
      const componentA = new Component(connect((state) => ({ count: state.count }))({}));
      const componentB = new Component(connect((state) => ({ count: state.count }))({}));

      dispatch((state) => ({ ...state, count: 2 }));
      expect(componentA.data.count).toBe(2);
      expect(componentB.data.count).toBe(2);
    });

    it('derived data should reflect the change when dispatch', () => {
      const componentA = new Component(connect((state) => ({ works: state.works }))({
        data: { work: {} },

        derived() {
          const { works } = this.data;
          return { work: works[0] };
        },
      }));

      dispatch((state) => {
        const { works } = state;
        const work0 = works[0];

        return { ...state, works: [{ ...work0, type: 'component0' }] };
      });

      expect(componentA.data.work.type).toBe('component0');
    });
  });

  describe('connect with page', () => {
    class Page {
      constructor(define) {
        // eslint-disable-next-line no-return-assign
        Object.keys(define).forEach((key) => this[key] = define[key]);
        // eslint-disable-next-line no-unused-expressions
        this.onLoad.bind(this)();
      }

      setData(data) {
        this.data = { ...this.data, ...data };
      }
    }

    it('it should attach slice state on data property', () => {
      const pageA = new Page(connect((state) => ({ count: state.count }))({}));
      expect(pageA.data.count).toBe(2);
      expect(pageA.data.account).toBe(undefined);
    });

    it('it should attach whole state on data property if no `mapstate` function pass to connect', () => {
      const pageB = new Page(connect()({}));
      expect(pageB.data.count).toBe(2);
      expect(pageB.data.account).toEqual({ name: 'zzr' });
    });

    it('it should attach a lifecycle method names `onLoad`', () => {
      const pageA = new Page(connect()({}));
      expect(pageA.onLoad).toBeDefined();
    });

    it('component\'s data should reflect the change when dispatch', () => {
      const pageA = new Page(connect((state) => ({ count: state.count }))({}));
      const pageB = new Page(connect((state) => ({ count: state.count }))({}));

      dispatch((state) => ({ ...state, count: 3 }));
      expect(pageA.data.count).toBe(3);
      expect(pageB.data.count).toBe(3);
    });

    it('derived data should reflect the change when dispatch', () => {
      const pageA = new Page(connect((state) => ({ works: state.works }))({
        data: { work: {} },

        derived() {
          const { works } = this.data;
          return { work: works[0] };
        },
      }));

      dispatch((state) => {
        const { works } = state;
        const work0 = works[0];

        return { ...state, works: [{ ...work0, type: 'page0' }] };
      });

      expect(pageA.data.work.type).toBe('page0');
    });
  });
});
