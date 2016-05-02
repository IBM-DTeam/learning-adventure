# Connecting to React
This section covers components, containers & `react-redux`.

## The problem
Often when building a react application, you use `this.setState` for many things. For example, a component that loads data
may look like this:

I am using ES2015 style components, so if you are confused please take a look
[here](https://babeljs.io/blog/2015/06/07/react-on-es6-plus).

```jsx
import { Component } from 'react';

// lets keep it simple, it will just show an image if its loading
// if not it will show the data
class LoadingCard extends Component {

  // new way of doing getInitialState()
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      data: []
    };
  }
  
  // just make fake asnyc data
  componentDidMount() {
    setTimeout( () => {
      this.setState({
        loading: false,
        // just pretend theres new data
        data: [ ... ]
      });
    }, Math.random() * 6000);
  }

  render() {
    const {
      loading,
      data
    } = this.state;
    
    // show a loader gif if we're loading, else show the raw data
    return (
      <div>
        { loading ? <img src='loading.gif' /> : <div>{ JSON.stringify(data) }</div> }
      </div>
    );
  }
}
```
Thats a lot of code in one place, as more and more features get added, it becomes harder to split out certain features
such as the loader gif, or how to represent the data. Two core ideas are coupled: `state` and `view`. When you split these
ideas up, by putting state into `redux` and `view` into `react`, it becomes a lot easier to deal with.

## The solution
Separate those two core ideas into **presentational** components (the `view`) and **container** components (the `state`).

### Presentational Components
These components are purely visual. They take props for 99% of their work, and only in rare cases do you
need local state.

Lets split out the presentational stuff of the `Card` component above:
```jsx
// LoadingCard.js
import { Component } from 'react';

class LoadingCard extends Component {
  render() {
    const {
      loading,
      data
    } = this.props;
    
    return (
      <div>
        { loading ? <img src='loading.gif' /> : <div>{ JSON.stringify(data) }</div> }
      </div>
    );
  }
}
```
It becomes a much smaller component, and only takes props. You can make the `LoadingCard` component much more
complex when you know it only needs to take props. You can add flair and animations easier this way.

### Container Components
These components are components that deal with state, and forward them onto presentational components to deal
with the view.

Lets see how to split `Card` into the container part.

```jsx
import { Component } from 'react';
import LoadingCard from './LoadingCard.js';

class LoadingCardContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      data: []
    };
  }
  
  // just make fake asnyc data
  componentDidMount() {
    setTimeout( () => {
      this.setState({
        loading: false,
        // just pretend theres new data
        data: [ ... ]
      });
    }, Math.random() * 6000);
  }
  
  render() {
    const { loading, data } = this.state;
    return <LoadingCard loading={loading} data={data} />;
  }
}
```
Again, we can add more to this component and we have a clear idea that the container only deals with state,
presentational component only deals with view. W

### react-redux
The `react-redux` package helps you connect your `react` components to your `redux` store. It provides a root
container component: `Provider` which works kinda like the `LoadingCardContainer` component above, and the
`connect` function which is a very simple wrapper around a presentational component to add state to it. 
Making the `LoadingCardContainer` component for every single component becomes very tedious very fast, so
the `connect` function makes it very simple.

#### Provider
The `Provider` keeps track of the store, and updates your `react` components whenever an action gets dispatched.
It allows you to create a store and not think about how to update your `App` component because that is very
tedious work.

```jsx
// index.js
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './components/App';

// lets say we have already created a store

// this is the initial react setup
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
Any component inside the provider can `connect` to the store using the `connect` function. 

#### connect(mapStateToProps, mapDispatchToProps)(Component)
The `connect` function takes two functions `mapStateToProps` and `mapDispatchToProps`, and returns a function
that will connect your `redux` store to the first argument (a component).

`mapStateToProps` gets your stores current state as its argument, and returns an object of props that will be
passed to the component.

`mapDispatchToProps` gets your dispatch function, and allows you to pass action creators as props to the component
that you can then immediately dispatch.

Lets see an example.

```js
// containers/GraphCardContainer.js

// This GraphCard component is very very similar to the LoadingCard presentational component above
import GraphCard from '../components/GraphCard';

// The form of mapStateToProps is this:
// (storeState, containerProps) => componentProps
// storeState is the current state of the store passed to Provider
// containerProps are props that are on the container component
// componentProps will be passed to the sub component
const mapStateToProps = ({ graphs }, { name }) => ({ graph: graphs[name], name: name });

// loadGraph is an action creator that takes a graphName to load
// you use it like this: dispatch(loadGraph('ONPREM-VERSION'))
import { loadGraph } from '../actions';

// bindActionCreators automatically dispatches the action creator. If you are still confused, let me know.
import { bindActionCreators } from 'redux'
const mapDispatchToProps = dispatch => bindActionCreators({ loadGraph }, dispatch);

import { connect } from 'react-redux';
// connect has this form: (mapStateToProps, mapDispatchToProps) => Component => ContainerComponent
export default connect(mapStateToProps, mapDispatchToProps)(GraphCard);
```
