import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .emailbox{
    font-size: 13px;
    margin-right: 10px;
    text-align: right;
  }
  .locationbox{
    font-size: 11px;
    margin: 10px;
  }
  .contentbox{
    margin: 20px;
  }
  .inputWarning{
    font-size :8px;
    color :#E68080;
  }
  .RegisterDiv{
  background-color: rgba(1, 1, 1, 0.5);
  width: 100%;
  height: 80px;
  z-index:-1;
  }
  .Container{
    margin: auto;
  }

`

export default GlobalStyle;