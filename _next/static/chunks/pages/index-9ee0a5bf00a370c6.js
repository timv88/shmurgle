(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(t,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(5670)}])},5670:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return At}});var n,a,c,s=r(5893),o=r(9008),u=r.n(o),i=r(7294);!function(t){t.INPUT_CHAR="INPUT_CHAR",t.REMOVE_CHAR="REMOVE_CHAR",t.GUESS_SECRET="GUESS_SECRET",t.NEW_GAME="NEW_GAME",t.SET_RANDOM_BACKGROUND_CHAR="SET_RANDOM_BACKGROUND_CHAR"}(n||(n={})),function(t){t.PLAYING="PLAYING",t.WON="WON",t.LOST="LOST"}(a||(a={})),function(t){t.PRESENT="O",t.ABSENT="_",t.CORRECT="X"}(c||(c={}));var l=["\ud83c\udf89","\ud83c\udfc6","\ud83d\ude0a","\ud83d\ude4c","\u2764"],p=["\ud83d\udc80","\ud83d\udca9","\ud83d\ude14","\ud83d\ude20","\ud83e\udd2c"],d=a.WON,h=a.LOST;var _=function(t){var e=t.gameState,r=t.currentAttemptIdx,n=t.secretWord,a="turn ".concat(r+1,"/").concat(6);return e===d?a="You won!!":e===h?a="You lost. The correct answer is ".concat(n):5===r&&(a="Last attempt"),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("h1",{children:"Shmurgle"}),(0,s.jsx)("p",{children:a})]})},m=r(1322),f=r(9885),v=r.n(f);var g=function(t){var e=t.color,r=t.offsetY;return(0,s.jsxs)("div",{className:v().background_waves,children:[(0,s.jsxs)("svg",{className:v().waves,xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",viewBox:"0 24 150 28",preserveAspectRatio:"none",shapeRendering:"auto",children:[(0,s.jsx)("defs",{children:(0,s.jsx)("path",{id:"gentle-wave",d:"M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"})}),(0,s.jsxs)("g",{className:v().parallax,children:[(0,s.jsx)("use",{xlinkHref:"#gentle-wave",x:"48",y:"0",fill:e,style:{opacity:.6}}),(0,s.jsx)("use",{xlinkHref:"#gentle-wave",x:"48",y:"3",fill:e,style:{opacity:.4}}),(0,s.jsx)("use",{xlinkHref:"#gentle-wave",x:"48",y:"5",fill:e,style:{opacity:.2}}),(0,s.jsx)("use",{xlinkHref:"#gentle-wave",x:"48",y:"8",fill:e,style:{opacity:1}})]})]}),(0,s.jsx)("div",{className:v().grower,style:{height:r,backgroundColor:e}})]})},b=r(9221),A=r.n(b),x=r(4184),E=r.n(x);var y=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=(0,i.useRef)((function(){}));(0,i.useEffect)((function(){r.current=t}),[t]),(0,i.useEffect)((function(){if(null!==e){var t=setInterval((function(){r.current()}),e);return function(){return clearInterval(t)}}}),[e])};function w(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var k=a.PLAYING,N=a.WON,C=c.PRESENT,S=c.CORRECT;function j(t){return t===N?l[Math.floor(Math.random()*l.length)]:p[Math.floor(Math.random()*p.length)]}var R=function(t){var e=t.characters,r=t.gameState,a=t.currentAttemptValue,c=t.previousAttempts,o=(0,i.useContext)(ft),u=(0,i.useState)([]),d=u[0],h=u[1],_=(0,i.useState)([]),m=_[0],f=_[1];return(0,i.useEffect)((function(){var t=[],e=[];c.forEach((function(r){var n=r.input,a=r.result;n.split("").forEach((function(r,n){a[n]===S||a[n]===C?t.push(r):e.push(r)}))})),h(t),f(e)}),[c]),y((function(){o({type:n.SET_RANDOM_BACKGROUND_CHAR,payload:j(r)})}),r!==k?30:null),(0,s.jsx)("div",{className:A().background_chars,children:e.map((function(t,e){var r,n=E()(A().background_char,(w(r={},A().present,d.includes(t)),w(r,A().absent,m.includes(t)),w(r,A().pulsate,l.includes(t)||p.includes(t)),w(r,A().highlight,a.includes(t)&&Math.random()>.25),r));return(0,s.jsx)("span",{className:n,children:t},e)}))})},O=r(8716),T=r.n(O),I=a.LOST,M=a.WON;var W=function(t){var e=t.gameState,r=t.currentAttemptIdx,n=t.currentAttemptValue,a=t.previousAttempts,c=t.backgroundChars,o=e===I||e===M?"100vh":"".concat(12*r+30,"vh"),u=function(t,e){var r="rgb(211, 47, 47)",n=(0,m.CD)("rgb(21,177,239)",r,1-e/6)({});return t===M?n="rgb(0,192,118)":t===I&&(n=r),n}(e,r);return(0,s.jsxs)("div",{className:T().background_container,children:[(0,s.jsx)(g,{color:u,offsetY:o}),(0,s.jsx)(R,{characters:c,gameState:e,currentAttemptIdx:r,currentAttemptValue:n,previousAttempts:a})]})},P=r(8856),B=r.n(P);var G=function(t){var e=t.input,r=t.current,n=[];for(e.length>0&&(n=e.split(""));n.length<5;)n.push("");var a,c,o,u=E()(B().attempt_char,(a={},c=B().current,o=r,c in a?Object.defineProperty(a,c,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[c]=o,a));return(0,s.jsx)(s.Fragment,{children:n.map((function(t,e){return(0,s.jsx)("span",{className:u,children:t},"".concat(e,"_").concat(t))}))})};function H(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var V=c.CORRECT,L=c.PRESENT,U=c.ABSENT;var D=function(t){var e=t.attemptInput,r=void 0===e?"":e,n=t.attemptResult,a=void 0===n?"":n,c=[];if(0===r.length&&0===a.length)c.push((0,s.jsx)(G,{input:r},"smth"));else for(var o=0;o<5;o++){var u,i=r.charAt(o),l=a.charAt(o),p=E()(B().attempt_char,(H(u={},B().attempt_char__correct,l===V),H(u,B().attempt_char__present,l===L),H(u,B().attempt_char__absent,l===U),u));c.push((0,s.jsx)("span",{className:p,children:i},o))}return(0,s.jsx)("div",{className:B().attempt,children:c})};var Y=function(t){var e=t.previousAttempts,r=t.currentAttemptIdx,n=t.currentAttemptValue,c=t.gameState,o=[];e.forEach((function(t,e){o.push((0,s.jsx)(D,{attemptInput:t.input,attemptResult:t.result},"prev_".concat(e)))})),c===a.PLAYING&&o.push((0,s.jsx)("div",{className:B().attempt,children:(0,s.jsx)(G,{input:n,current:!0})},"currentAttempt"));for(var u=r;u<5;u++)o.push((0,s.jsx)(D,{},"".concat(r,"_").concat(u)));return(0,s.jsx)("div",{className:B().attempts_container,children:o})},z=c.PRESENT,K=c.ABSENT,X=c.CORRECT;function F(){var t=Math.floor(Math.random()*Q.length);return Q[t]}function Z(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:650,e="ABCDEFGHIJKLMNOPQRSTUVWXYZ",r=[],n=0;n<t;n++){var a=e[Math.floor(Math.random()*e.length)];r.push(a)}return r}var Q=["anise","apple","aspic","bacon","bagel","basil","beans","berry","bland","bread","broil","candy","cater","chard","chili","chips","cream","crepe","crisp","crust","curds","curry","dairy","dates","diner","dough","dried","drink","feast","flour","fried","fruit","grain","grape","gravy","guava","herbs","honey","icing","jelly","juice","kebab","knife","ladle","lemon","liver","lunch","maize","mango","melon","mints","mochi","munch","olive","onion","order","pasta","patty","peach","pecan","pilaf","pizza","plate","prune","punch","roast","salad","salsa","sauce","seeds","slice","snack","spicy","spoon","spork","spuds","squid","steak","stove","straw","sugar","sushi","sweet","syrup","thyme","toast","torte","tuber","wafer","water","wheat","yeast"];function q(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function J(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function $(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})))),n.forEach((function(e){J(t,e,r[e])}))}return t}function tt(t){return function(t){if(Array.isArray(t))return q(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"===typeof t)return q(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return q(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var et=a.PLAYING,rt=a.WON,nt=a.LOST,at=n.INPUT_CHAR,ct=n.REMOVE_CHAR,st=n.GUESS_SECRET,ot=n.NEW_GAME,ut=n.SET_RANDOM_BACKGROUND_CHAR;function it(t){var e=t.secretWord,r=t.backgroundChars;return console.log("secretWord",e),{gameState:et,currentAttemptIdx:0,currentAttemptValue:"",previousAttempts:[],secretWord:e.toUpperCase(),backgroundChars:r}}var lt=function(t,e){var r=e.type,n=e.payload,a=t.currentAttemptValue,s=t.secretWord,o=t.gameState,u=t.currentAttemptIdx,i=t.backgroundChars;switch(r){case at:return a.length<5&&o===et&&1===(null===n||void 0===n?void 0:n.length)?$({},t,{currentAttemptValue:a+n.toUpperCase()}):t;case ct:return a.length>0?$({},t,{currentAttemptValue:a.slice(0,-1)}):t;case st:if(5===a.length&&u<=5){var l=function(t,e){if(5!==t.length)throw new Error("Expected secret word to have length of ".concat(5));if(5!==e.length)throw new Error("Expected value to have length of ".concat(5));for(var r="",n=t,a=0;a<e.length;a++){var c=e[a],s=K;t[a]===c?s=X:t.indexOf(c)>-1&&n.indexOf(c)>-1&&(s=z),n=n.replace(c,""),r+=s}return r}(s,a),p=o,d=u;return l.split("").every((function(t){return t===c.CORRECT}))?p=rt:5===u?p=nt:d+=1,$({},t,{gameState:p,currentAttemptIdx:d,currentAttemptValue:"",previousAttempts:tt(t.previousAttempts).concat([{input:a,result:l}])})}return t;case ut:if(1===(null===n||void 0===n?void 0:n.length)||2===(null===n||void 0===n?void 0:n.length)){var h=tt(i);return h[Math.floor(Math.random()*i.length)]=n,$({},t,{backgroundChars:h})}return t;case ot:return it({secretWord:F(),backgroundChars:Z()});default:throw new Error("Action type not recognized: ".concat(e.type))}},pt=n.INPUT_CHAR,dt=n.GUESS_SECRET,ht=n.NEW_GAME,_t=n.REMOVE_CHAR,mt=a.PLAYING,ft=(0,i.createContext)({});var vt=function(){var t=(0,i.useReducer)(lt,{secretWord:"abcde",backgroundChars:["a","b","c","d","e"]},it),e=t[0],r=t[1],n=e.currentAttemptIdx,a=e.currentAttemptValue,c=e.secretWord,o=e.gameState,u=e.previousAttempts,l=e.backgroundChars,p=(0,i.useCallback)((function(t){var e=t.key;switch(e){case"Enter":r(o===mt?{type:dt}:{type:ht});break;case"Backspace":r({type:_t});break;default:1===e.length&&e.match(/[a-z]/i)&&r({type:pt,payload:e})}}),[o]);return(0,i.useEffect)((function(){r({type:ht})}),[]),(0,i.useEffect)((function(){return document.addEventListener("keydown",p),function(){document.removeEventListener("keydown",p)}}),[p]),(0,s.jsxs)(ft.Provider,{value:r,children:[(0,s.jsxs)("div",{className:T().shmurgle_container,children:[(0,s.jsx)(_,{gameState:o,currentAttemptIdx:n,secretWord:c}),(0,s.jsx)(Y,{gameState:o,currentAttemptIdx:n,currentAttemptValue:a,previousAttempts:u}),(0,s.jsx)("button",{className:T().reset_button,onClick:function(){return r({type:ht})},disabled:0===n&&o===mt,children:"New Game"})]}),(0,s.jsx)(W,{backgroundChars:l,gameState:o,currentAttemptIdx:n,currentAttemptValue:a,previousAttempts:u})]})},gt=r(7160),bt=r.n(gt),At=function(){return(0,s.jsxs)("div",{children:[(0,s.jsxs)(u(),{children:[(0,s.jsx)("title",{children:"Shmurgle"}),(0,s.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,s.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,s.jsx)("main",{className:bt().main,children:(0,s.jsx)(vt,{})})]})}},8856:function(t){t.exports={attempts_container:"Attempts_attempts_container__K2Se7",attempt:"Attempts_attempt__SMFc8",attempt_char:"Attempts_attempt_char__Z8Iz9",current:"Attempts_current__9oge2",width_animation:"Attempts_width_animation__741lu",attempt_char__correct:"Attempts_attempt_char__correct__MWGti",attempt_char__present:"Attempts_attempt_char__present__d7oMB",attempt_char__absent:"Attempts_attempt_char__absent__8vH3r"}},9221:function(t){t.exports={background_chars:"BackgroundChars_background_chars__XaVML",background_char:"BackgroundChars_background_char__syS33",present:"BackgroundChars_present__Ofys3",absent:"BackgroundChars_absent__vVOwR",highlight:"BackgroundChars_highlight__ZMKuM",pulsate:"BackgroundChars_pulsate__fv979"}},9885:function(t){t.exports={background_waves:"BackgroundWaves_background_waves__4EMsy",waves:"BackgroundWaves_waves__yNdm1",grower:"BackgroundWaves_grower__egVIv",parallax:"BackgroundWaves_parallax__AGmbB","move-forever":"BackgroundWaves_move-forever__WTE1U"}},7160:function(t){t.exports={main:"Home_main__nLjiQ"}},8716:function(t){t.exports={shmurgle_container:"Shmurgle_shmurgle_container__eHIBC",background_container:"Shmurgle_background_container__31ptI",reset_button:"Shmurgle_reset_button__nbdhN"}}},function(t){t.O(0,[562,774,888,179],(function(){return e=8312,t(t.s=e);var e}));var e=t.O();_N_E=e}]);