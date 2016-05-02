# Previous lessons
Please read the [functions as components](../functions-as-components/README.md)
lesson before you start this one.

# Higher Order React Components
If you haven't come across it already, take a look at the [MDN documentation on
the map function for arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

`map` is known as a *higher order function* because it takes a function as an
input.

eg.
```js
// ES2015
const inc = x => x + 1;
// ES5
function inc(x) { return x + 1 };

[1,2,3].map(inc)
// [2,3,4]
```

Since you already know that we can use functions as react components, we can
also have higher order react components as the title of this lesson suggests.

Now, lets get some practice writing some higher order components :)
TODO
