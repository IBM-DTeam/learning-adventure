# How to make Changes to state

## Dispatching actions
To actually change the current state, you must `dispatch` an action that the reducer understands how to use.
```js
// store.js
import { createStore } from 'redux';

// a simple reducer that understands INCREMENT and DECREMENT actions
function incrDecrReducer(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// The api of createStore is createStore(reducer, initialState);
const store = createStore(incrDecrReducer,0);

// lets just check the state when we start
const state1 = store.getState();
console.log(state1); // 0

// to change the state, we need to **dispatch** an action
// redux requires action objects to have a type
store.dispatch({ type: 'INCREMENT' });

// lets check the state after dispatching the action
const state2 = store.getState();
console.log(state2); // 1
```

## Action Creators
For more complicated actions, we can make a function that **creates** them:

```js
function increment() {
  return { type: 'INCREMENT' };
}
function decrement() {
  return { type: 'DECREMENT' };
}
// using the store from above
store.dispatch(increment());
store.dispatch(decrement());

// more complicated action
function add(num) {
  return { type: 'ADD', num: num };
}
// the store from earlier would ignore this action, so lets say we have a new hypothetical store
// that understands how to use ADD actions
addStore.dispatch(add(5));
```

These functions are called **action creators**.

## Middleware

### The problem
Sometimes, you may want to implement asyncronous action creators.

For example, an action creator that has a callback function inside it such as `setTimeout`
```js
function addAsync(num) {
  setTimeout( function () {
    // this returns to the inner function, not the addAsync function
    return { type: 'ADD', num: num };
  }, 1000);
  // since the return above is to the inner function, addAsync returns undefined
}
```
When `redux` gets any object that does not have a `type` key, it complains. Especially if it gets an `undefined` or `null` action.

Here's another example with sockets.
```js
// assume we have socket.js that uses "socket.io-client" defined somewhere
import socket from './socket.js'

function getGraphData(listener) {
  socket.once(listener, (data) => {
    // again, this returns to the inner function
    return { type: 'GRAPH_DATA', data: data };
  });
  socket.emit(listener);
  // since the return above is to the inner function, addAsync returns undefined
}
```

Similarly, if you return a promise from an action creator, `redux` will complain that promises don't have a `type`
key.

### The solution
Since this is a common problem, `redux` has this idea of middleware: A function that checks the action it gets,
and converts it (somehow) to a valid action.

#### `redux-thunk`
If you dispatch a function (eg. `store.dispatch(function actionFn() { ... })`) then `redux-thunk` calls that function like this:
`actionFn(store.dispatch, store.getState)`

#### `redux-promise`
If you dispatch a promise (eg. `store.dispatch(new Promise( ... ))`) then `redux-promise` automatically calls `.then` on it to dispatch the action: `promise.then(action => store.dispatch(action))`

By now you should get the core idea of middleware, so lets see how to use it. Lets make some asynchronous `ADD` actions.

```js
// actions.js

// redux-thunk middleware
function asyncAdd(num) {
  return (dispatch) => {
    // lets delay the action by 1 second
    setTimeout( () => {
      dispatch({ type: 'ADD', num: num });
    }, 1000);
    
    // since we have access to the dispatch function, we could also dispatch other actions
    // but that's not needed for this example
  };
}

// redux-promise middleware
// if you don't understand promises yet, just skip this
function promiseAdd(num) {
  return new Promise((resolve, reject) => {
    // delaying by action by 1 second
    setTimeout( () => {
      resolve({ type: 'ADD', num: num });
    }, 1000);
  });
}

```

Now, lets see how to add this middleware to your store.
```js
// configureStore.js

import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

// a simple reducer that understands ADD actions
function addReducer(state = 0, action) {
  switch(action.type) {
    case 'ADD':
      return state + action.num;
    default:
      return state;
  }
}

const addStore = createStore(
  addReducer,
  0,
  // you can add as much middleware in this applyMiddleware function as you need.
  applyMiddleware(promiseMiddleware, thunkMiddleware)
);

// we can now asnychronously dispatch ADD actions
addStore.dispatch(asyncAdd(5));
addStore.dispatch(promiseAdd(4));
// when the actions are complete, getState() will return 9
```

## Summary
1. Actions must be `dispatch`ed.
2. Function that return action objects are called Action Creators.
3. We can add middleware to the store to handle more kinds of action objects. (eg functions and promises)

This covers the basics that you need to understand for `redux` :). While this may all seem very difficult,
thinking with `redux` can greatly improve your projects stability. Ironing out the kinks with your state
and actions before connecting to `react` ensures a smooth ride when you connect it to `react`.


Now, lets see how to [connect it all to react](../react/Part1.md)
