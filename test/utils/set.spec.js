import set from '../../src/utils/set';

describe('set', () => {
  it('it should return that value directly if non-object is passed', () => {
    const res = set('obj');
    expect(res).toBe('obj');
  });

  it('path parameter supports array and string to refer modified path', () => {
    const obj = { a: { b: { c: 3 } } };
    const res = set(obj, ['a', 'b', 'c'], 5);
    expect(res).toEqual({ a: { b: { c: 5 } } });
    const res2 = set(obj, 'a.b.c', 6);
    expect(res2).toEqual({ a: { b: { c: 6 } } });
  });

  it('it supports modifying array value', () => {
    const obj = { p: [{ n: 'addy' }] };
    const res = set(obj, 'p.[0].n', 'addy3');
    expect(res).toEqual({ p: [{ n: 'addy3' }] });
  });

  it('it supports the key doesn\'t exist', () => {
    const obj = { p: [{ n: 'addy' }] };
    const res = set(obj, 'p.[1].n', 'addy3');
    expect(res).toEqual({ p: [{ n: 'addy' }, { n: 'addy3' }] });
  });
});
