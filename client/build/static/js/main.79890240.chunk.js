(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t){},11:function(e,t,a){},122:function(e,t,a){},123:function(e,t,a){},124:function(e,t,a){},125:function(e,t,a){},126:function(e,t,a){},127:function(e,t,a){},128:function(e,t,a){},130:function(e,t,a){},131:function(e,t,a){},132:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(22),l=a.n(c),o=a(136),s=a(137),u=a(138),i=a(2),m=a(55),d=a.n(m),p=null;function f(e){(p=d()("localhost:3000",{reconnection:!1})).on("connect",function(){console.log("Socket connected")}),p.on("connect_error",function(){p=null,console.log("Failed to connect")}),p.on("update",function(t,a){e(h(t)),e(g(a))}),p.on("backendError",function(e){console.log(e)})}function h(e){return{type:"gameInfo",payload:e}}function g(e){return{type:"userInfo",payload:e}}function v(e){return{type:"error",payload:e}}var E=a(3);function b(){var e=Object(i.c)(function(e){return e.userInfo}),t=[];for(var a in e)t.push(Object(E.a)({userName:a},e[a]));return t}function N(){return b().map(O)}function O(e){return r.a.createElement("div",{className:"player",key:e.userName,id:e.userName},r.a.createElement("img",{src:e.avatar,alt:"".concat(e.userName,"'s Avatar"),className:"playerAvatar lvl1"}),r.a.createElement("h3",{className:"playerName"},e.userName),r.a.createElement("p",{className:"playerScore lvl2"},e.currentScore))}a(11);function j(){var e=Object(i.c)(function(e){return console.log("state:",e),e.gameInfo}),t=Object(i.b)();function a(a){var n;a.preventDefault(),console.log(e),t((n=e.gameID,function(e){p.emit("startRound",n),p.on("notEnoughUsers",function(t){e(v("Insufficient Players"))})}))}return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Game Code: ",e.gameID),r.a.createElement("h2",null,"Number of Players: ",e.users)),r.a.createElement("div",{className:"responseArea"}),r.a.createElement("div",{className:"playerArea"},N()),r.a.createElement("div",{className:"actions"},r.a.createElement("button",{onClick:function(e){return a(e)}},"Start Game!")))}var y=a(7),I=a(56),A=a(57),k=a(60),S=a(58),w=a(61),C=a(5),D=a(14),P=a.n(D),U=Object(n.createContext)(),G=function(e){function t(e){var a;return Object(I.a)(this,t),(a=Object(k.a)(this,Object(S.a)(t).call(this,e))).state={token:localStorage.getItem("thingsAuthToken")||null,isAuthenticated:!!localStorage.getItem("thingsAuthToken"),userId:localStorage.getItem("thingsUserId")||"",userName:"Set Your Username!",userWins:0,userAvatar:""},a.changeUserName=a.changeUserName.bind(Object(C.a)(Object(C.a)(a))),a.changeAvatar=a.changeAvatar.bind(Object(C.a)(Object(C.a)(a))),a.changeWins=a.changeWins.bind(Object(C.a)(Object(C.a)(a))),a.changeAuthenticated=a.changeAuthenticated.bind(Object(C.a)(Object(C.a)(a))),a.changeUserId=a.changeUserId.bind(Object(C.a)(Object(C.a)(a))),a.changeToken=a.changeToken.bind(Object(C.a)(Object(C.a)(a))),a.getUser=a.getUser.bind(Object(C.a)(Object(C.a)(a))),a.updateUser=a.updateUser.bind(Object(C.a)(Object(C.a)(a))),a}return Object(w.a)(t,e),Object(A.a)(t,[{key:"changeUserName",value:function(e){this.setState(Object(E.a)({},this.state,{userName:e}))}},{key:"changeAvatar",value:function(e){this.setState(Object(E.a)({},this.state,{userAvatar:e})),this.updateUser(Object(E.a)({},this.state,{userAvatar:e}),this.state.userId,this.state.token)}},{key:"changeWins",value:function(e){this.setState(Object(E.a)({},this.state,{userWins:this.state.userWins+e})),this.updateUser(Object(E.a)({},this.state,{wins:this.state.userWins+e}),this.state.userId,this.state.token)}},{key:"changeAuthenticated",value:function(e,t){!0===this.state.isAuthenticated?(localStorage.removeItem("thingsAuthToken"),this.setState(Object(E.a)({},this.state,{userName:"",token:"",userId:"",userWins:0,userAvatar:"",isAuthenticated:!1}))):(localStorage.setItem("thingsAuthToken",e),this.changeUserId(t),this.setState(Object(E.a)({},this.state,{isAuthenticated:!0,token:e})),this.getUser(e,t))}},{key:"changeToken",value:function(e){this.setState(Object(E.a)({},this.state,{token:e})),localStorage.setItem("thingsAuthToken",e)}},{key:"changeUserId",value:function(e){this.setState(Object(E.a)({},this.state,{userId:e})),localStorage.setItem("thingsUserId",e)}},{key:"getUser",value:function(e,t){var a=this;P.a.get("/user/".concat(t),{headers:{"Content-type":"application/json","x-auth-token":e}}).then(function(e){var t=e.data,n=t.wins,r=t.userName,c=t.avatar;a.changeUserName(r),a.changeWins(n),a.changeAvatar(c)}).catch(function(e){return console.log(e)})}},{key:"updateUser",value:function(e,t,a){var n={userName:e.userName,wins:e.userWins,avatar:e.userAvatar};P.a.put("/user/".concat(t),n,{headers:{"Content-type":"application/json","x-auth-token":a}}).then(function(){})}},{key:"componentDidMount",value:function(){this.state.userId&&this.state.token&&this.getUser(this.state.token,this.state.userId)}},{key:"render",value:function(){return r.a.createElement(U.Provider,{value:Object(E.a)({},this.state,{changeAuthenticated:this.changeAuthenticated,changeToken:this.changeToken,changeUserId:this.changeUserId,changeAvatar:this.changeAvatar,getUser:this.getUser})},this.props.children)}}]),t}(n.Component);function R(){var e=Object(i.c)(function(e){return e.gameInfo}),t=Object(i.c)(function(e){return e.userInfo}),a=Object(i.b)(),c=Object(n.useContext)(U).userName,l=Object(n.useState)(""),o=Object(y.a)(l,2),s=o[0],u=o[1];function m(t){var n,r;t.preventDefault(),a((n=e.gameID,r=s,function(e){p.emit("submittedPrompt",n,r)})),u("")}function d(e){u(e.target.value)}return r.a.createElement("div",null,function(){switch(t[c].state){case"prompt":return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("form",{onSubmit:function(e){m(e)}},r.a.createElement("fieldset",null,r.a.createElement("input",{type:"input",id:"promptInput",value:s,onChange:d}),r.a.createElement("label",{htmlFor:"prompt"},"Prompt")),r.a.createElement("button",{type:"submit"},"Submit Prompt"))),r.a.createElement("div",{className:"playerArea"},N()));case"waiting":return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("p",null,"Waiting for prompt...")),r.a.createElement("div",{className:"playerArea"},N()));default:return r.a.createElement("p",null,"Something bad happened with userInfo.state")}}())}function x(){var e=Object(i.c)(function(e){return e.gameInfo}),t=Object(i.c)(function(e){return e.userInfo}),a=Object(i.b)(),c=Object(n.useContext)(U).userName,l=Object(n.useState)(""),o=Object(y.a)(l,2),s=o[0],u=o[1];function m(t){t.preventDefault(),a(function(e,t,a){return function(n){p.emit("submittedResponse",e,t,a)}}(e.gameID,c,s)),u("")}function d(e){u(e.target.value)}return r.a.createElement("div",null,function(){switch(t[c].state){case"noResponse":return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("form",{onSubmit:function(e){m(e)}},r.a.createElement("fieldset",null,r.a.createElement("input",{type:"input",id:"responseInput",value:s,onChange:d}),r.a.createElement("label",{htmlFor:"response"},"Response")),r.a.createElement("button",{type:"submit"},"Submit Response"))),r.a.createElement("div",{className:"playerArea"},N()));case"responded":return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("p",null,"Waiting for all players to submit responses...")),r.a.createElement("div",{className:"playerArea"},N()));default:return r.a.createElement("p",null,"Something bad happened with userInfo.state")}}())}var M=a(121);function T(){var e=Object(i.c)(function(e){return e.gameInfo}),t=Object(i.c)(function(e){return e.userInfo}),a=Object(i.b)(),c=Object(n.useContext)(U).userName;function l(t,n,r){var l={name:n,response:r};t.preventDefault(),a(function(e,t,a){return function(n){p.emit("matched",e,t,a)}}(e.gameID,c,l))}function o(){return b.map(s)}function s(e){var t="player",a={onDragOver:function(e){return(t=e).preventDefault(),void t.target.parentNode.children[0].classList.add("dragHover");var t},onDragEnter:function(e){return t=e,void console.log(t.target.parentNode.children);var t},onDragLeave:function(e){e.target.parentNode.children[0].classList.remove("dragHover")},onDrop:function(e){return function(e,t){var a=t.dataTransfer.getData("id"),n=t.target.parentNode.id;t.target.parentNode.children[0].classList.remove("class","dragHover"),l(e,n,a)}(e)}};return"eliminated"===e.state&&(t="player eliminated",a={}),r.a.createElement("div",Object.assign({className:t,key:e.userName,id:e.userName},a),r.a.createElement("img",{src:e.avatar,alt:"".concat(e.userName,"'s Avatar"),className:"playerAvatar lvl1"}),r.a.createElement("h3",{className:"playerName"},e.userName),r.a.createElement("p",{className:"playerScore lvl2"},e.currentScore))}function u(){var e=[];return b.map(function(t){return e.push(t.response)}),M(e),e.map(function(e){return r.a.createElement("p",{className:"response",key:e,draggable:!0,onDragStart:function(t){return a=t,n=e,console.log("dragstart: ",n),void a.dataTransfer.setData("id",n);var a,n}},e)})}return r.a.createElement("div",null,function(){switch(t[c].state){case"matching":return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("p",null,"Your turn to match!"),u()),r.a.createElement("div",{className:"playerArea"},o()));case"inline":return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("p",null,"Waiting for your turn to match..."),u()),r.a.createElement("div",{className:"playerArea"},o()));case"eliminated":return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("p",null,"Sorry, you have been eliminated.")),r.a.createElement("div",{className:"playerArea"},o()));default:return r.a.createElement("p",null,"Something bad happened with userInfo.state")}}())}function W(){var e=Object(i.c)(function(e){return e.gameInfo}),t=Object(i.b)();function a(a){var n;a.preventDefault(),t((n=e.gameID,function(e){p.emit("nextRound",n)}))}function n(a){var n;a.preventDefault(),t((n=e.gameID,function(e){p.emit("gameEnd",n)}))}return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("p",null,"Round has ended!")),r.a.createElement("div",{className:"playerArea"},N()),r.a.createElement("div",{className:"actions"},r.a.createElement("button",{onClick:function(e){return a(e)}},"Next Round!"),r.a.createElement("button",{onClick:function(e){return n(e)}},"End Game!")))}function B(){var e=Object(i.c)(function(e){return e.gameInfo}),t=Object(i.b)();function a(a){var n;a.preventDefault(),t((n=e.gameID,function(e){p.emit("returnToLobby",n)}))}return r.a.createElement("div",{className:"gameBoard"},r.a.createElement("div",{className:"headerArea"},r.a.createElement("h1",null,"Round: ",e.round),r.a.createElement("h2",null,"PromptMaster: ",e.promptMaster),r.a.createElement("h2",null,"Prompt: ",e.prompt)),r.a.createElement("div",{className:"responseArea"},r.a.createElement("p",null,"Game over!"),r.a.createElement("p",null,"Congratulations to the user who won!")),r.a.createElement("div",{className:"playerArea"},N()),r.a.createElement("div",{className:"actions"},r.a.createElement("button",{onClick:function(e){return a(e)}},"Return To Lobby!")))}function L(){var e=Object(i.c)(function(e){return e.gameInfo});return r.a.createElement("div",null,function(){switch(e.gameState){case"lobby":return r.a.createElement(j,null);case"prompt":return r.a.createElement(R,null);case"responding":return r.a.createElement(x,null);case"matching":return r.a.createElement(T,null);case"roundResults":return r.a.createElement(W,null);case"finalResults":return r.a.createElement(B,null);default:return r.a.createElement(j,null)}}())}var F=a(15);a(122),a(123);a(124);a(125);a(126);function Y(){var e=Object(n.useState)(""),t=Object(y.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(""),o=Object(y.a)(l,2),s=(o[0],o[1],Object(n.useState)({})),u=Object(y.a)(s,2),i=u[0],m=u[1],d=Object(n.useState)({round:1,promptmaster:{},matcher:{},players:[],roundQuestion:""}),p=Object(y.a)(d,2),f=p[0];p[1];return Object(n.useEffect)(function(){m({gameId:5564,participants:[]})},[]),r.a.createElement("div",{className:"registration"},r.a.createElement("form",null,r.a.createElement("fieldset",null,r.a.createElement("input",{type:"name",id:"participantName",value:a,onChange:function(e){return c(e.target.value)}}),r.a.createElement("label",{for:"participantName"},"Enter your name")),r.a.createElement("button",{type:"submit",id:"createParticipant",onClick:function(e){e.preventDefault(),function(e){var t=Object(E.a)({},i).participants,a=Object(F.a)(t),n={name:e,avatar:"images/avatars/woman1.svg",score:0,position:0,response:"",isEliminated:!1,matcher:!1,promptmaster:!1};a.push(n),m(Object(E.a)({},i,{participants:a})),console.log(i)}(a)}},"Create Player")),r.a.createElement("button",{onClick:function(){console.log("start game")}},"Start Game"),r.a.createElement("button",{onClick:function(){return console.log("GS ",i),void console.log("RS ",f)}},"See State"))}var q=a(134),H=a(135);a(127),a(128);var J=function(e){return r.a.createElement("img",{className:"SelectAvatar-avatarOption",onClick:function(){return e.onClick(e.imgPath)},src:e.imgPath,alt:"Select avatar ".concat(e.imgPath.substring(e.imgPath.lastIndexOf("/")+1,e.imgPath.indexOf(".")))})};function _(){var e=Object(n.useContext)(U),t=e.userName,a=(e.userWins,e.userAvatar),c=e.changeAvatar,l=e.isAuthenticated,o=e.changeAuthenticated,s=(e.getUser,Object(n.useState)("password")),u=Object(y.a)(s,2),m=u[0],d=u[1],E=Object(n.useState)(null),b=Object(y.a)(E,2),N=b[0],O=b[1],j=Object(n.useState)(null),I=Object(y.a)(j,2),A=I[0],k=I[1],S=Object(n.useState)(!1),w=Object(y.a)(S,2),C=w[0],D=w[1],G=Object(n.useRef)(null),R=Object(n.useRef)(null),x=Object(n.useState)(""),M=Object(y.a)(x,2),T=M[0],W=M[1],B=Object(i.b)(),L=Object(i.c)(function(e){return e.gameInfo});Object(i.c)(function(e){return e.userInfo});function F(e){var t={email:R.current.value,userName:R.current.value.substring(0,R.current.value.indexOf("@")),password:G.current.value};"register"===e?(console.log("you clicked register"),P.a.post("/user/signup",t).then(function(e){console.log("success!"),k('Success! You can now click "Log In" with those credentials.')}).catch(function(e){k("User already exists with that email.")})):"login"===e&&P.a.post("/user/login",t).then(function(e){o(e.data.token,e.data.user._id)}).catch(function(e){console.log(e),O("We found no user with those credentials.")})}function Y(){if(L.gameID)return r.a.createElement("div",null,r.a.createElement("input",{id:"gameID",value:L.gameID,readOnly:!0}),r.a.createElement("button",{onClick:function(){return function(){var e=document.querySelector("#gameID");e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),alert("Copied game id ".concat(e.value," to your clipboard. Invite your friends!"))}()}},"Copy to clipboard"))}function _(){d("password"===m?"text":"password")}function Q(e){W(e.target.value)}return console.log("gameInfo",L),r.a.createElement("section",{className:"titleScreen"},function(){if(l)return r.a.createElement("div",null,r.a.createElement("h1",null,"Welcome, ",t,"!"),r.a.createElement("p",null,"Current game:"),Y(),r.a.createElement("img",{className:"userAvatar",src:a}),r.a.createElement("div",null,["man1","woman1","man2","woman2","man3","woman3","man4","woman4"].map(function(e,t){return r.a.createElement(J,{key:t,onClick:c,imgPath:"images/avatars/".concat(e,".svg")})})),r.a.createElement("button",{id:"signout",onClick:function(){return o("","")}},"Not You? Switch Users"),r.a.createElement("button",{id:"createOnlineGame",onClick:function(e){return function(e){e.preventDefault(),console.log(t),B(function(e,t){return function(a){f(a),p.emit("newGame",e,t),p.on("addedToGame",function(e,t){console.log(e),a(h(e)),a(g(t)),a(v("")),console.log("creating game")}),p.on("backendError",function(e){a(v("Error with gameID"))})}}(t,a)),window.location.assign("localhost:3000/onlinegame")}(e)}},"Create New Game"),r.a.createElement("form",null,r.a.createElement("fieldset",null,r.a.createElement("input",{type:"input",value:T,onChange:Q}),r.a.createElement("label",{htmlFor:"joinGameID"},"GameID"))),r.a.createElement("button",{id:"joinOnlineGame",onClick:function(e){return function(e){e.preventDefault(),console.log(T),""!==T?(B(function(e,t,a){return function(a){f(a),p.emit("joinGame",e,t),p.on("addedToGame",function(e,t){a(h(e)),a(g(t)),a(v("")),console.log("added to game"),console.log(e,t)}),p.on("noGameFound",function(e){a(v("Could not find the game"))}),p.on("gameInProgress",function(e){a(v("Game is already in progress"))})}}(T,t)),D(!0)):B(v("Game code can not be blank"))}(e)}},"Join Existing Game"),function(){if(L.gameID)return r.a.createElement(q.a,{to:"/onlineGame"},r.a.createElement("button",null,"Enter Game"))}())}(),function(){if(!l)return r.a.createElement("div",null,r.a.createElement("div",{id:"errors"},N||A),r.a.createElement("form",null,r.a.createElement("fieldset",null,r.a.createElement("input",{type:"name",onChange:function(){O(null),k(null)},id:"username",ref:R,required:!0}),r.a.createElement("label",{htmlFor:"username"},"Email")),r.a.createElement("fieldset",null,r.a.createElement("input",{type:m,onChange:function(){O(null),k(null)},id:"password",ref:G,required:!0}),r.a.createElement("label",{htmlFor:"password"},"Password")),r.a.createElement("label",{"aria-hidden":"true",className:"pwToggle"},r.a.createElement("input",{type:"checkbox",onClick:_})," Show Password")),r.a.createElement("div",{id:"msgArea"}),r.a.createElement("button",{id:"loginSubmit",onClick:function(){return F("login")}},"Log In"),r.a.createElement("button",{id:"signup",onClick:function(){return F("register")}},"Sign Up"))}(),C&&r.a.createElement(H.a,{to:"/onlineGame"}),r.a.createElement("a",{id:"offlineGameInit",href:"/offlinegame"},"Start Local Game"))}a(130);function Q(){return r.a.createElement("div",{className:"colorBox"},r.a.createElement("span",{className:"color color1"}),r.a.createElement("span",{className:"color color2"}),r.a.createElement("span",{className:"color color3"}),r.a.createElement("span",{className:"color color4"}),r.a.createElement("span",{className:"color color5"}))}var z=a(12);var K={};var V=Object(z.c)({gameInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"gameInfo":return t.payload;default:return e}},userInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"userInfo":return t.payload;default:return e}},error:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"error":return t.payload;default:return e}}}),X=a(59),Z=Object(z.d)(V,Object(z.a)(X.a));var $=function(){return r.a.createElement(i.a,{store:Z},r.a.createElement(G,null,r.a.createElement(o.a,null,r.a.createElement(s.a,null,r.a.createElement(u.a,{exact:!0,path:"/",component:_}),localStorage.getItem("thingsAuthToken")&&r.a.createElement(u.a,{exact:!0,path:"/onlineGame",component:L}),r.a.createElement(u.a,{exact:!0,path:"/offlinegame",component:Y}))),r.a.createElement(Q,null)))};a(131);l.a.render(r.a.createElement($,null),document.getElementById("root"))},63:function(e,t,a){e.exports=a(132)}},[[63,1,2]]]);
//# sourceMappingURL=main.79890240.chunk.js.map