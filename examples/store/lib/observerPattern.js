"use strict";

const Subject = () => {
  let state = 0;
  const observers = [];

  const setState = value => {
    state = value;
    observers.forEach(observer => observer(state));
  };

  const getState = () => state;

  const subscribe = observer => {
    observers.push(observer);
  };

  return {
    setState,
    getState,
    subscribe
  };
};

const observer1 = state => {
  console.log('observer1', state);
};

const observer2 = state => {
  console.log('observer2', state);
};

const subject = Subject();
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.setState(10);