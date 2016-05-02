# Redux

## History
Facebook realized that React for a large enough application needs architecture to handle state.
For a small enough application, React's lifecycle methods `componentDidMount`, `componentWillUnmount`
and `this.setState` are strong enough. However, when you start needing state outside of a component,
for example a page progress bar for many smaller loading graphs, it becomes a mess really fast.

To solve this problem of multiple components in your application relying on the same state, Facebook
came up with the idea of [flux](https://facebook.github.io/flux/). Redux is a particular implementation
of Flux, so this workshop will explain to you how to add Redux to your React application.

## Tutorial 
Redux has an official tutorial on their [website](http://redux.js.org/). This workshop will hopefully
make it easier to use this tutorial as a reference document.

## Topics

### [Basics of Redux](basics/Part1.md)
This covers three main topics: the state tree, actions, and reducers.

### [How to make changes to state](changes/Part1.md)
This covers dispatching actions, action creators and middleware.

### [Connecting to React](react/Part1.md)
This covers components & containers, `react-redux`, and `react-router-redux`.

### [Best Practices](practices/Part1.md)
This will cover the folder structure and anything else that you will want to know.

## Folder Structure
Here is an example folder structure for a `redux` and `react` application
```
.
+-- actions
|   +-- index.js
+-- api
|   +-- socket.js
|   +-- tracking.js
+-- components
|   +-- App.js
|   +-- Card.js
+-- containers
|   +-- Root.js
|   +-- Root.dev.js
|   +-- Root.prod.js
|   +-- DevTools.js
|   +-- TrackingCardContainer.js
|   +-- GraphCardContainer.js
+-- reducers
|   +-- index.js
|   +-- user.js
+-- store
|   +-- configureStore.js
|   +-- configureStore.dev.js
|   +-- configureStore.prod.js
+-- index.js
```
Each topic will cover a couple folders in the structure here. Note, the folder structure is only
a convention, it is not required. However, many `redux` apps use this structure, so we'll explain
what they mean.
