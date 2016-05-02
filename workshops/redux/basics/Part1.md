# Part1
This section will cover the three main ideas of redux: the single state tree, actions, and reducers.

## Single State Tree
You entire application can be represented by a single app tree. While this seems like it would be very difficult to manage,
`redux`'s reducers help very well.

An example state tree:
```js
const state = {
  user: {
    id: -1,
    email: '',
    groups: ['PUBLIC']
  },
  graphs: {
    'ONPREM-VERSION': {
      name: 'ONPREM-VERSION',
      loading: true,
      data: [],
      title: 'Breakdown of DB2 onprem installs by versions'
    },
    'ONPREM-CPU': {
      name: 'ONPREM-CPU',
      loading: false,
      data: [ ... ],
      title: 'Breakdown of DB2 onprem installs by cpu'
    }
  },
  multiGraphs: {
    'ONPREM-SLIDER': {
      complete: false,
      graphs: [
        { complete: true, name: 'ONPREM-CPU' },
        { complete: false, name: 'ONPREM-VERSION' }
      ]
    }
  }
}
```

## Actions
To handle changes to the state, there are `actions` that represent new state to add, change, or remove. Here are some example actions:
```js
{ type: 'LOGIN', payload: { id: 1, email: 'ndujay05@ca.ibm.com', groups: ['PUBLIC', 'ADMIN'] }, error: false }
{ type: 'LOGOUT', payload: {}, error: false }
{ type: 'LOAD_GRAPH', payload: { name: 'ONPREM-OSTYPE', data: [...], title: '...' }, error: false }
```
The keys `type`, `payload`, and `error` are all conventions. You can define actions in any way, but using `type` will help you
determine how to get the next state, as you will see down below.

## Reducers
A reducer is a function of the following form: `(state, action) => nextState`.

For example,
```js

const state = {
  user: null
};

// (state, action) => nextAction
function userReducer(state, action) {

  switch(action.type) {
    // an action like this: { type: 'LOGIN', payload: { id: 1, email: 'ndujay05@ca.ibm.' } }
    case 'LOGIN':
      state.user = action.payload;
      return state;
    
    // an action like this: { type: 'LOGOUT' }
    case 'LOGOUT':
      state.user = null;
      return state;
    
    // any other action we ignore :)
    // this reducer only cares about state.user
    default:
      return state;
  }

}

// we apply the reducer to the current state to get the next state
const nextState = userReducer(state, { type: 'LOGIN', payload: { id: 1, email: 'ndujay05@ca.ibm.' } });
console.log(nextState);
// { user: { id: 1, email: 'ndujay05@ca.ibm.' } }

// again, we apply the reducer to get the next state given the action
const finalState = userReducer(state, { type: 'LOGOUT' });
console.log(finalState);
// { user: null }
```

## Store
You may be wondering, is `redux` just a concept now? Well, it isn't. Redux gives you a helper object called a `store` that 
keeps the current state and automatically applies the reducer you give it to get the next state.

```js
import { createStore } from 'redux';

function userReducer(state, action) {
... // see previous code block :)
}

// this creates the storeObject, which (conceptually) has the following:
// store.reducer = userReducer;
// store.currentState = { user: null };
const store = createStore( userReducer, { user: null } );

const currentState = store.getState();
console.log(currentState);
// { user: null }

// now, we can "dispatch" actions to the store, which automatically runs the reducer on the
// current state and the action you dispatched.
store.dispatch({ type: 'LOGIN', payload: { id: 1, email: 'ndujay05@ca.ibm.' } });
// this does something like the following:
// store.currentState = store.reducer(store.currentState, { type: 'LOGIN', payload: { id: 1, email: 'ndujay05@ca.ibm.' } });
const currentState = store.getState();
console.log(currentState);
// { user: { id: 1, email: 'ndujay05@ca.ibm.' } }
```

When you are done, move onto [Part 2](Part2.md).
