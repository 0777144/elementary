# Elementary
Elementary is simple js lib to work with dom classes.
<a href="http://0777144.github.io/elementary/">View project page</a>

#Short docs
```javascript
Elementary( selector ); // return elemets
E( selector ); // short syntax

E( selector ).addClass( classNames );// add one or more classes to elements
E( selector ).removeClass( classNames );// and remove
E( selector ).toggleClass( classNames );// and toggle
E( selector ).hasClass( classNames, useStrictMode = false )//if useStrictMode = true that all elements must have classNames
E( selector ).html( classNames );// set innerHTML of elements that match selector
E( selector ).html(  );//return content of first element that match selector

//And you can do somthing like this
E( selector ).addClass( classNames ).html( text );
```
