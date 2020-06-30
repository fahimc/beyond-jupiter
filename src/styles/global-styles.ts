import { createGlobalStyle } from 'styled-components';
import { starView } from './star-view';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Poiret One';
  src: url(fonts/Poiret_One/PoiretOne-Regular.ttf);
}
@font-face {
  font-family: 'Open Sans';
  src: url(fonts/Open_Sans/OpenSans-Regular.ttf);
}
@font-face {
  font-family: 'Open Sans';
  font-weight: 'bold';
  src: url(fonts/Open_Sans/OpenSans-Bold.ttf);
}
:root{
  --green-color:#56b05a;
  --red-color:#ce4b40;
  --black-color:#1d1d1d;
  --grey-color:rgb(59,62,77);
}
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
    justify-content: space-between;
  color:#fff;
  font-size:2rem;
  font-family:'Arial';
  /* background-color: rgba(29,41,59,0.8); */
  /* background-color: rgba(71,77,86,0.8); */
  width:100%;
  position:absolute;
  padding:0.5rem;
  margin:0;
  top:0;
  display:flex;
  font-size:1rem;
  text-shadow: 1px 1px #000000;
}
.prod-bar .credits, .prod-bar .time {
  font-weight:bold;
  background:rgba(59,62,77,0.84);
  padding:0.5rem;
  display: flex;
    align-items: center;
}
.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  margin-right:10px;
}
.icon::before {
  position: absolute;
  margin-left:0;
  transform: translateX(25%);
}
.green {
  background-color:var(--green-color);
}
.red {
  background-color:var(--red-color);
}
.start-button {
  width:250px;
  height:45px;
  border: 1px solid white;
  background:rgba(59,62,77,0.84);
  color:white;
  padding: 10px;
  font-size: 1.1rem;
  font-family:'Open Sans', cursive;
}
.star-details-view {
  background: var(--black-color);
    height: calc(100% - 160px);
    width: 90%;
}
.star-title{
  background: var(--grey-color);
  display: flex;
  color: #FFFFFF;
  align-items: center;
}
.planet-name {
  font-size: 1.5rem;
  font-family:'Open Sans', cursive;
}
.owner {

}
.star-title > div{
  display:flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  padding: 10px;
}
.star-details-view .close-button{
  margin-right: 20px;
}
.star-details-header {
  height:100px;
  width: 100%;
  background: url(images/star-details.png) no-repeat;
  background-size: cover;
  background-position-y: center;

}
`;
