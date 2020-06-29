import { createGlobalStyle } from 'styled-components';
/* istanbul ignore next */
export const starView = createGlobalStyle`
.prod-bar {
  color:#fff;
  font-size:2rem;
  font-family:'Arial';
  background-color: rgba(29,41,59,0.8);
  width:100%;
  left:calc(50%);
  top:16px;
  height:32px;
  padding:0.2rem 0.5rem;
  margin:0;
  border: 0px solid #fff;
  display:flex;
  font-size:1rem;
}
.prod-bar .credits {
  flex:1;
}
`;
