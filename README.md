# react-gallery

## Browser support

IE9+

## Usage

```js
import Gallery from "react-gallery";
```

```js
function onEnd() {
  console.log("end")
}
function onEndItem(i) {
  console.log(i)
}
```

```js
ReactDOM.render(
  <Gallery interval={5000} autoPlay={true} showNav={true} showPagination={true} paginationHandle={true} onEndItem={onEndItem} onEnd={onEnd} >
    <div>item 1</div>
    <div>item 2</div>
    <div>item 3</div>
  </Gallery>,
  document.getElementById('gallery')
);
```