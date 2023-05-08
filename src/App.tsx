/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

function myStyled(Component: keyof JSX.IntrinsicElements) {
  return styled(Component)`
    background-color: red;
  `;
}

function myCss(color: "red") {
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

export default App;
