# Part 2

Now that you understand reducers, you might think that you can put all of your reducers in one huge reducer.
But, if you have a really big state like below:
```js
const state = {
  user: { ... },
  graphs: { ... },
  multiGraphs: { ... },
  admin: { ... },
  tweetDashboard: { ... }
};
```
It might get very difficult:
```js
function reducer(state, action) {
  switch(action.type) {
    // all the user actions
    case 'USER_LOGIN':
      ...
      break;
    case 'USER_LOGOUT':
      ...
      break;
    
    // all the graphs actions
    case 'GRAPHS_LOAD':
      ...
      break;
    case 'GRAPHS_UNLOAD':
      ...
      break;
    
    // all the multigraphs actions
    case 'MULTIGRAPHS_CREATE':
      ...
      break;
    case 'MULTIGRAPHS_DELETE':
      ...
      break;
    
    // all the admin actions
    ...
    
    // all the tweetDashboard actions
    ...
  }
  
  return state;
}
```
If we filled out all the code for these actions, this file will get very big and very unmaintainable. You could split it up by putting each group of actions into their own file right? How about we make each group of actions their very own reducer? Redux provides this function  called `combineReducers` that combines a collection of smaller reducers that focus on a smaller part of state.

Eg. The `userReducer` focuses on `state.user`, the `graphsReducer` focuses on `state.graphs`, etc.

```js

// userReducer.js
export default function userReducer(user, action) {

  // user actions
  switch(action.type) {
    case 'USER_LOGIN':
      ...
      break;
    case 'USER_LOGOUT':
      ..
      break;
  }

  return user;
}

// graphsReducer.js
export default function graphReducer(graph, action) {

  // all the graphs actions
  switch(action.type) {
    case 'GRAPHS_LOAD':
      ...
      break;
    case 'GRAPHS_UNLOAD':
      ...
      break;
  }

  return graph;
}

// multiGraphsReducer.js
export default function graphReducer(graph, action) {

  // all the multigraphs actions
  switch(action.type) {
    case 'MULTIGRAPHS_CREATE':
      ...
      break;
    case 'MULTIGRAPHS_DELETE':
      ...
      break;
  }

  return graph;
}

// reducer.js
import { combineReducers, createStore } from 'redux';
import userReducer from './userReducer';
import graphsReducer from './graphsReducer';
import multiGraphsReducer from './multiGraphsReducer';

// the initial state looks like this
const state = {
  user: { },
  graphs: { },
  multiGraphs: { }
};

const fullReducer = combineReducers({
  user: userReducer,
  graphs: graphsReducer,
  multiGraphs: multiGraphsReducer
});

// remember, a store takes a reducer and an initial state
const store = createStore(fullReducer, state);
```
Remember, `fullReducer` is a function that works like this: `(state, action) => nextState`.

Internally, `fullReducer` works something like this:
```js
function fullReducer(fullState, action) {
  // the userReducer gets applied to the original fullState's user to get the next user
  const nextUser = userReducer(fullState.user, action);
  fullState.user = nextUser;
  
  // again, the graphsReducer gets applied to the original fullState's graphs to get the next graphs
  const nextGraphs = graphsReducer(fullState.graphs, action);
  fullState.graphs = nextGraphs;
  
  // similarly, multiGraphs reducer gets applied to the original fullState's multiGraphs object
  const nextMultiGraphs = multiGraphsReducer(fullState.multiGraphs, action);
  fullState.multiGraphs = nextMultiGraphs;
  
  return fullState;
}
```

Now that we're done with the basics, lets move on to [how to change state](../changes/Part1.md)
