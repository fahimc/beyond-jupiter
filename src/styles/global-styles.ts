import { createGlobalStyle } from 'styled-components';
import { starView } from './star-view';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100vh;
    width: 100vw;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: ${p => p.theme.background};
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  #root {
    width:100%;
    height:100%;
  }
  #game {
    width:100%;
    height:100%;
  }
  canvas {
    margin-top: 0px !important;
  }
  .play-button {
    border: 2px solid white;
    background: #130a2c;
    color:white;
    padding: 10px;
    min-width: 50vw;
    /* margin-left: 50vw; */
    /* transform: translateX(-75%); */
    font-size: 1.1rem;
    pointer-events:none;
  }
  .detail-title{
    display: block;
    width: 100%;
    text-align: center;
  }

  .prod-bar {
  color:#fff;
  font-size:2rem;
  font-family:'Arial';
  /* background-color: rgba(29,41,59,0.8); */
  background-color: rgba(71,77,86,0.8);
  width:100%;
  position:absolute;
  padding:0.5rem;
  margin:0;
  top:0;
  display:flex;
  font-size:1rem;
  text-shadow: 1px 1px #000000;
}
.prod-bar .credits {
  flex:1;
}
`;
