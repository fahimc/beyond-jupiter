import { createGlobalStyle } from 'styled-components';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Poiret One';
  src: url(fonts/Poiret_One/PoiretOne-Regular.ttf);
}
@font-face {
  font-family: 'Open Sans';
  font-weight: 300;
  src: url(fonts/Open_Sans/OpenSans-Light.ttf);
}
@font-face {
  font-family: 'Open Sans';
  font-weight: 400;
  src: url(fonts/Open_Sans/OpenSans-Regular.ttf);
}
@font-face {
  font-family: 'Open Sans';
  font-weight: bold;
  src: url(fonts/Open_Sans/OpenSans-Bold.ttf);
}
:root{
  --green-color:#56b05a;
  --red-color:#ce4b40;
  --black-color:#1d1d1d;
  --grey-color:rgb(59,62,77);
  --lightblue-color:#a4ebff;
  --darkblack-color:#101415;
}
  html,
  body {
    height: 100vh;
    width: 100vw;
    line-height: 1.5;
    overflow: hidden;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: black;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  #root {
    width:100%;
    height:100%;
    overflow: hidden;
  }
  #game {
    width:100%;
    height:100%;
    overflow: hidden;
  }
  canvas {
    margin-top: 0px !important;
  }
  .play-button {
    border: 2px solid var(--lightblue-color);
    background: #130a2c;
    color:white;
    padding: 10px;
    min-width: 50vw;
    /* margin-left: 50vw; */
    /* transform: translateX(-75%); */
    font-size: 1.1rem;
    pointer-events:none;
    border-radius: 10px;
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
  padding: 1rem;
  margin:0;
  top:0;
  display:flex;
  font-size:1rem;
  text-shadow: 1px 1px #000000;
}
.prod-bar .credits, .prod-bar .time {
  font-weight:bold;
  /* background:rgba(59,62,77,0.84); */
  padding:0.5rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--lightblue-color);
  background:rgba(27, 35, 37,0.7);
}
.icon {
  width: 20px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  margin-right:10px;
  background-color: transparent;
  color: var(--lightblue-color);
}
.icon::before {
  position: absolute;
  margin-left:0;
  transform: translateX(25%);
}

.start-button {
  width:250px;
  height:45px;
  border: 1px solid var(--lightblue-color);
  background:rgba(27, 35, 37,0.7);
  padding: 10px;
  font-size: 1rem;
  font-family:'Open Sans', cursive;
  border-radius: 10px;
  font-weight: 400;
  text-transform: uppercase;
  color:var(--lightblue-color);
}
button {
  width:250px;
  height:45px;
  border: 1px solid var(--lightblue-color);
  background:rgba(27, 35, 37,0.7);
  padding: 10px;
  font-size: 1.1rem;
  font-family:'Open Sans', cursive;
  border-radius: 10px;
  color:var(--lightblue-color);
  text-transform:uppercase;
}
.star-details-view {
  background: var(--darkblack-color);
    height: calc(100% - 160px);
    width: 90%;
    border-radius: 10px;
    border: 1px solid var(--lightblue-color);
    box-sizing: border-box;
    overflow: hidden;
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
  color:var(--lightblue-color);
  font-size: 0.8rem;
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
  position: absolute;
  right: 10px;
}
.star-details-header {
  height:100px;
  width: 100%;
  background: url(images/star-details.jpg) no-repeat;
  background-size: cover;
  background-position-y: center;

}
.planet-resources {
  list-style: none;
  padding-left: 0;
  padding: 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-top: 0;
}
.planet-resources li {
  color: #fff;
  display: flex;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
}
.planet-resources li:nth-child(odd)
 {
  background: var(--grey-color);
 }
.resource-label {
  flex:1;
}
.upgrades{
  text-align:center;
  overflow-y: auto;
  height: 183px;
  display: flex;
  width: 100%;
  overflow-x: hidden;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.upgrades button {
  font-weight: 300;
  text-transform: uppercase;
  color:var(--lightblue-color);
  margin-bottom: 10px;
  height:auto;
  font-size: 0.9rem;
  width:100px;
}
.upgrades button span{
  font-size: 0.8rem;
    color: #b8b48f;
}
.money {
  color:#b8b48f;
}
/* 
loading
 */
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
/* end loading */
`;
