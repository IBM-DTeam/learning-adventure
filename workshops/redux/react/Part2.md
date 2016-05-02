# Part 2
This part covers useful `react` libraries that we want to connect to redux, such as `react-router-redux`,
and also useful `redux` libraries that I have found to become an integral part of my workflow.

## redux-form
`redux-form` is a very very useful library for inputs. Take a look at the getting started page
[here](http://redux-form.com/4.2.0/#/getting-started?_k=qsf53i).
That floats my boat.

Explore this website to find more documentation and see more usage examples of `redux-form`.

If you ever dealt with forms in `react`, you'll know you usually have to do an `onChange`, `value`
and `this.setState` with input fields. This goes against the ideas of `redux`, so `redux-form` gives 
a very useful way to keep letting us do this.

## react-router-redux
This connects `react-router` to redux store. There are a couple valid uses of this.

In DB2 Analytics, whenever the `LOCATION_CHANGE` action occurs, we'd like to clear out our dynamic notifications.
Check the notifications reducer (`client/src/reducers/notifications.js`) to see how this works.
