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
  .edit-btn {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #85b287;
    width: 70px;
    border: none;
    border-radius: 10px;
    padding: 5px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  .edit-btn:hover{
       background: #59a05d;
  }
  /* UserEditForm */
  .edit-cancel-btn{
    outline: 0;
    background: gray;
    width: 70px;
    border: none;
    border-radius: 10px;
    padding: 5px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  .edit-cancel-btn:hover{
      background: rgb(89, 89, 89);
  }
  .award-mvp,.certi-mvp,.edu-mvp,.project-mvp{
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  /* Review*/
  .search-name{
    border-radius: 10px;
    width: 250px;
    padding-left: 10px;
    border-color:#83b493;
  }
  .table-header{
      background-color: #83b493;
  }
  .network-table{
      text-align: center;
  }
  .triangle-btn-asc:hover{
      cursor: pointer;
      color: #bad9ed;
  }
  .triangle-btn-asc:focus{
      border: 2px white;
    
  }
  .triangle-btn-desc:hover{
      cursor: pointer;
      color: #bad9ed;
  }
  .Text{
      width: 100%;
      font-weight: bold;
      font-size: 15px;
      line-height: 18px;
      color: #151618;
      box-shadow: inset 0px -1px 0px #aaacaa;
      padding: 12px 0;
      margin-bottom: 12px;
  }
`;

export default GlobalStyle;
