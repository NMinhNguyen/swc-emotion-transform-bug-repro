# swc-emotion-transform-bug-repro

There appears to be a bug in `swc/plugin-emotion` where in some cases it generates a `label` of `[local]` resulting in wrong CSS (e.g., `.css-195ipmu-[local]{background-color:red;}`).

Given the following input code

```js
function myStyled(Component) {
  return styled(Component)`
    background-color: red;
  `;
}

function myCss(color) {
  return css`
    background-color: ${color};
  `;
}

const myStyles = myCss("red");

const Div = myStyled("div");

function App() {
  return (
    <>
      <Div>one</Div>
      <div css={myStyles}>two</div>
    </>
  );
}
```

`swc/plugin-emotion` outputs the following

```js
function myStyled(Component) {
  return /*#__PURE__*/ styled(Component, {
    target: "e1kc42610",
    label: "[local]",
  })(
    "background-color:red;",
    "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL21pbmhuZ3V5ZW4vZGV2L3N3Yy1lbW90aW9uLXRyYW5zZm9ybS1idWctcmVwcm8vc3JjL0FwcC50c3giLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5obmd1eWVuL2Rldi9zd2MtZW1vdGlvbi10cmFuc2Zvcm0tYnVnLXJlcHJvL3NyYy9BcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuXG5mdW5jdGlvbiBteVN0eWxlZChDb21wb25lbnQ6IGtleW9mIEpTWC5JbnRyaW5zaWNFbGVtZW50cykge1xuICByZXR1cm4gc3R5bGVkKENvbXBvbmVudClgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICBgO1xufVxuXG5mdW5jdGlvbiBteUNzcyhjb2xvcjogXCJyZWRcIikge1xuICByZXR1cm4gY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICBgO1xufVxuXG5jb25zdCBteVN0eWxlcyA9IG15Q3NzKFwicmVkXCIpO1xuXG5jb25zdCBEaXYgPSBteVN0eWxlZChcImRpdlwiKTtcblxuZnVuY3Rpb24gQXBwKCkge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8RGl2Pm9uZTwvRGl2PlxuICAgICAgPGRpdiBjc3M9e215U3R5bGVzfT50d288L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtTIn0= */"
  );
}
function myCss(color) {
  return /*#__PURE__*/ css(
    "background-color:",
    color,
    ";",
    "[local]",
    "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL21pbmhuZ3V5ZW4vZGV2L3N3Yy1lbW90aW9uLXRyYW5zZm9ybS1idWctcmVwcm8vc3JjL0FwcC50c3giLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5obmd1eWVuL2Rldi9zd2MtZW1vdGlvbi10cmFuc2Zvcm0tYnVnLXJlcHJvL3NyYy9BcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuXG5mdW5jdGlvbiBteVN0eWxlZChDb21wb25lbnQ6IGtleW9mIEpTWC5JbnRyaW5zaWNFbGVtZW50cykge1xuICByZXR1cm4gc3R5bGVkKENvbXBvbmVudClgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICBgO1xufVxuXG5mdW5jdGlvbiBteUNzcyhjb2xvcjogXCJyZWRcIikge1xuICByZXR1cm4gY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICBgO1xufVxuXG5jb25zdCBteVN0eWxlcyA9IG15Q3NzKFwicmVkXCIpO1xuXG5jb25zdCBEaXYgPSBteVN0eWxlZChcImRpdlwiKTtcblxuZnVuY3Rpb24gQXBwKCkge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8RGl2Pm9uZTwvRGl2PlxuICAgICAgPGRpdiBjc3M9e215U3R5bGVzfT50d288L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdTIn0= */"
  );
}

/*
    <div class="css-195ipmu-[local] e1kc42610">one</div>
    <div class="css-4tbayf-App">two</div>
*/
```

```html
<div class="css-195ipmu-[local] e1kc42610">one</div>
<div class="css-4tbayf-App">two</div>
```

whereas `@emotion/babel-plugin` generates the following

```js
function myStyled(Component) {
  return /* @__PURE__ */ _styled(
    Component,
    "development" === "production"
      ? {
          target: "e1nvm22b0",
        }
      : {
          target: "e1nvm22b0",
          label: "myStyled",
        }
  )(
    "development" === "production"
      ? {
          name: "1n3rzf3",
          styles: "background-color:red",
        }
      : {
          name: "1n3rzf3",
          styles: "background-color:red",
          map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5obmd1eWVuL2Rldi9zd2MtZW1vdGlvbi10cmFuc2Zvcm0tYnVnLXJlcHJvL3NyYy9BcHAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUswQiIsImZpbGUiOiIvVXNlcnMvbWluaG5ndXllbi9kZXYvc3djLWVtb3Rpb24tdHJhbnNmb3JtLWJ1Zy1yZXByby9zcmMvQXBwLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuXG5mdW5jdGlvbiBteVN0eWxlZChDb21wb25lbnQ6IGtleW9mIEpTWC5JbnRyaW5zaWNFbGVtZW50cykge1xuICByZXR1cm4gc3R5bGVkKENvbXBvbmVudClgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICBgO1xufVxuXG5mdW5jdGlvbiBteUNzcyhjb2xvcjogXCJyZWRcIikge1xuICByZXR1cm4gY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICBgO1xufVxuXG5jb25zdCBteVN0eWxlcyA9IG15Q3NzKFwicmVkXCIpO1xuXG5jb25zdCBEaXYgPSBteVN0eWxlZChcImRpdlwiKTtcblxuZnVuY3Rpb24gQXBwKCkge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8RGl2Pm9uZTwvRGl2PlxuICAgICAgPGRpdiBjc3M9e215U3R5bGVzfT50d288L2Rpdj5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl19 */",
          toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
        }
  );
}
function myCss(color) {
  return /* @__PURE__ */ css(
    "background-color:",
    color,
    ";" + ("development" === "production" ? "" : ";label:myCss;"),
    "development" === "production"
      ? ""
      : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5obmd1eWVuL2Rldi9zd2MtZW1vdGlvbi10cmFuc2Zvcm0tYnVnLXJlcHJvL3NyYy9BcHAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdZIiwiZmlsZSI6Ii9Vc2Vycy9taW5obmd1eWVuL2Rldi9zd2MtZW1vdGlvbi10cmFuc2Zvcm0tYnVnLXJlcHJvL3NyYy9BcHAudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5cbmZ1bmN0aW9uIG15U3R5bGVkKENvbXBvbmVudDoga2V5b2YgSlNYLkludHJpbnNpY0VsZW1lbnRzKSB7XG4gIHJldHVybiBzdHlsZWQoQ29tcG9uZW50KWBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIGA7XG59XG5cbmZ1bmN0aW9uIG15Q3NzKGNvbG9yOiBcInJlZFwiKSB7XG4gIHJldHVybiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gIGA7XG59XG5cbmNvbnN0IG15U3R5bGVzID0gbXlDc3MoXCJyZWRcIik7XG5cbmNvbnN0IERpdiA9IG15U3R5bGVkKFwiZGl2XCIpO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxEaXY+b25lPC9EaXY+XG4gICAgICA8ZGl2IGNzcz17bXlTdHlsZXN9PnR3bzwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0= */"
  );
}
```

```html
<div class="css-1agzgcs-myStyled e1nvm22b0">one</div>
<div class="css-3xpn7s-myCss">two</div>
```
