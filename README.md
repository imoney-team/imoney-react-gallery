# imoney-react-gallery

## Browser support

IE9+

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from "imoney-react-gallery";
import "imoney-react-gallery/src/index.css";
```

```js
function onEnd() {
  console.log("end")
}
function onEndItem(i) {
  console.log(i)
}
```

    ReactDOM.render(
      <Gallery interval={5000} autoPlay={true} showNav={true} showPagination={true} paginationHandle={true} onEndItem={onEndItem} onEnd={onEnd} >
        <div>item 1</div>
        <div>item 2</div>
        <div>item 3</div>
      </Gallery>,
      document.getElementById('gallery')
    );