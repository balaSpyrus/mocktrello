(this.webpackJsonpmocktrello=this.webpackJsonpmocktrello||[]).push([[0],{461:function(n,e,t){},475:function(n,e,t){},476:function(n,e,t){},480:function(n,e,t){"use strict";t.r(e);t(247),t(265);var o,i,a,c,r,l,d,s,p,u,b,x,j,f,h,g,O,m,v,w=t(68),y=t.n(w),k=t(8),C=t(69),E=t(13),N=t(159),S=t(240),R=t(23),D=t(16),I=t(39),z=t(0),T=t(59),B=(t(461),t(2)),M=Object(B.jsx)(B.Fragment,{children:"\u2714"}),$=Object(B.jsx)(B.Fragment,{children:"\u2716"}),A=k.c.select(o||(o=Object(D.a)(["\n  outline: none;\n  min-height: 24px;\n  padding: 8px;\n  border-radius: 4px;\n  font-size: 16px;\n  font-weight: 700;\n  background: ",";\n  background-position: calc(100% - 0.75rem) center !important;\n  -moz-appearance: none !important;\n  -webkit-appearance: none !important;\n  appearance: none !important;\n  padding-right: 2rem !important;\n  text-transform: capitalize;\n\n  & > option {\n    font-weight: 700;\n  }\n"])),(function(n){var e=n.$caratColor;return"url(\"data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='".concat(void 0===e?"black":e,"' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>\") no-repeat")})),W=k.c.button(i||(i=Object(D.a)(["\n  border-radius: 16px;\n  padding: 4px 6px;\n  border: none;\n  color: ",";\n  font-size: 12px;\n  cursor: pointer;\n  text-align: center;\n  background: ",";\n"])),(function(n){var e=n.$color,t=n.theme;return e||t.pallete.WHITE}),(function(n){return n.$bgcolor||void 0})),U=k.c.div(a||(a=Object(D.a)(["\n  background: #dfdfdf;\n  width: 214px;\n  min-width: 214px;\n  border-radius: 4px;\n  cursor: pointer;\n  padding: 12px;\n"]))),H=Object(k.c)(U)(c||(c=Object(D.a)(["\n  text-decoration: none;\n  color: #444242;\n  align-self: flex-start;\n  font-size: 14px;\n\n  &:hover {\n    background: #c6c6c6;\n  }\n"]))),L=Object(k.c)(U)(r||(r=Object(D.a)(["\n  display: flex;\n  align-self: flex-start;\n  flex-direction: column;\n  gap: 8px;\n\n  & > input {\n    width: calc(100% - 16px);\n    height: 32px;\n    border-radius: 4px;\n    padding: 4px 8px;\n  }\n\n  & > div {\n    display: flex;\n    align-self: flex-end;\n    gap: 8px;\n  }\n"]))),F=function(n){var e=n.onSave,t=n.infoText,o=Object(k.d)(),i=Object(z.useState)(!1),a=Object(R.a)(i,2),c=a[0],r=a[1],l=Object(z.useState)(""),d=Object(R.a)(l,2),s=d[0],p=d[1],u=function(){r((function(n){return!n}))},b=function(){null===e||void 0===e||e(s),p(""),r(!1)};return c?Object(B.jsxs)(L,{children:[Object(B.jsx)("input",{type:"text",placeholder:t,autoFocus:!0,value:s,onChange:function(n){return p(n.target.value)},onKeyDown:function(n){"Enter"===n.key&&s&&b()}}),Object(B.jsxs)("div",{children:[Object(B.jsx)(W,{$bgcolor:o.pallete.SUCCESS,onClick:s?b:void 0,children:M}),Object(B.jsx)(W,{$bgcolor:o.pallete.ERROR,onClick:u,children:$})]})]}):Object(B.jsx)(H,{onClick:u,children:t})},P=t(245),G=t(243),K=t.n(G),Y=(t(475),Object(k.c)(A)(l||(l=Object(D.a)(["\n  width: 100%;\n  color: #474747;\n"])))),J=function(n){var e=n.card,t=n.onClose,o=Object(k.d)(),i=Object(z.useState)(Object(I.cloneDeep)(e)),a=Object(R.a)(i,2),c=a[0],r=a[1],l=Object(z.useState)(!1),d=Object(R.a)(l,2),s=d[0],p=d[1],u=Object(z.useState)(""),b=Object(R.a)(u,2),x=b[0],j=b[1],f=Object(z.useState)(!1),h=Object(R.a)(f,2),g=h[0],O=h[1],m=function(n){var e=n.target.name,t=n.target.value;r((function(n){return Object(E.a)(Object(E.a)({},n),{},Object(C.a)({},e,t))}))};return Object(B.jsxs)(K.a,{isOpen:!0,onRequestClose:function(){return t()},className:"Modal",overlayClassName:"Overlay",appElement:document.getElementById("root"),children:[Object(B.jsxs)("div",{className:"edit-modal-title",children:[s?Object(B.jsx)("input",{type:"text",className:"on-edit-modal-title",name:"title",onChange:m,value:c.title}):Object(B.jsx)("h2",{children:c.title}),Object(B.jsx)("span",{className:s?"close":"edit",onClick:function(){return p((function(n){return!n}))}})]}),Object(B.jsxs)("div",{children:[Object(B.jsx)("label",{className:"model-label",children:"description"}),Object(B.jsxs)("div",{className:"card-desc",children:[g?Object(B.jsx)("textarea",{value:c.description,onChange:m,name:"description",className:"edit-text-area"}):Object(B.jsx)("i",{children:c.description}),Object(B.jsx)("span",{className:g?"close":"edit",onClick:function(){return O((function(n){return!n}))}})]})]}),Object(B.jsxs)("div",{children:[Object(B.jsx)("label",{className:"model-label",children:"status"}),Object(B.jsxs)(Y,{value:c.priority,name:"priority",onChange:m,children:[Object(B.jsx)("option",{value:0,children:"new"}),Object(B.jsx)("option",{value:1,children:"investigate"}),Object(B.jsx)("option",{value:2,children:"in-progress"}),Object(B.jsx)("option",{value:3,children:"done"}),Object(B.jsx)("option",{value:4,children:"critical"}),Object(B.jsx)("option",{value:5,children:"hold"})]})]}),Object(B.jsxs)("div",{children:[Object(B.jsx)("label",{className:"model-label",children:"comments"}),Object(B.jsxs)("div",{className:"card-comment-container",children:[Object(B.jsx)("div",{children:c.comments.map((function(n,e){return Object(B.jsxs)("span",{className:"comment",children:[Object(B.jsx)("i",{children:n}),Object(B.jsx)("span",{className:"comment-delete",onClick:function(){return n=e,r((function(e){return Object(E.a)(Object(E.a)({},e),{},{comments:e.comments.splice(n,1)})}));var n},children:$})]},e)}))}),Object(B.jsx)("input",{type:"text",value:x,className:"add-comment",placeholder:"type and press enter to add comment",onChange:function(n){return j(n.target.value)},onKeyDown:function(n){"Enter"===n.key&&x&&(r((function(n){return Object(E.a)(Object(E.a)({},n),{},{comment:n.comments.push(x)})})),j(""))}})]})]}),Object(B.jsxs)("div",{children:[Object(B.jsx)(W,{$bgcolor:o.pallete.SUCCESS,onClick:function(){return null===t||void 0===t?void 0:t(c)},children:M}),Object(B.jsx)(W,{$bgcolor:o.pallete.ERROR,onClick:function(){return null===t||void 0===t?void 0:t()},children:$})]})]})},q=(t(476),function(n){var e=n.card,t=n.deleteCard,o=n.expandCard,i=n.index,a=function(n){var e=["card-title"];switch("".concat(n)){case"1":e.push("investigate");break;case"2":e.push("in-progress");break;case"3":e.push("done");break;case"4":e.push("critical");break;case"5":e.push("hold");break;default:e.push("new")}return e.join(" ")};return Object(B.jsx)(T.b,{draggableId:"".concat(e.id),index:i,children:function(n,i){var c=n.dragHandleProps,r=n.draggableProps,l=n.innerRef,d=i.isDragging;return Object(B.jsxs)("div",Object(E.a)(Object(E.a)(Object(E.a)({ref:l,className:d?"card card-drag":"card",onClick:o},c),r),{},{children:[Object(B.jsxs)("div",{className:a(e.priority),children:[Object(B.jsxs)("span",{children:[" ",e.title," "]}),Object(B.jsx)("span",{onClick:function(){return t(e.id)},children:$})]}),Object(B.jsx)("div",{className:"card-comment-count",title:e.description,children:e.comments.length?Object(B.jsx)("i",{children:"".concat(e.comments.length," comment(s)")}):Object(B.jsx)("i",{children:"Be the first to comment"})})]}))}},"".concat(e.id))}),V=k.c.div(d||(d=Object(D.a)(["\n  padding: 0px 12px 12px 12px;\n\n  & > * {\n    padding: 8px !important;\n    width: 198px !important;\n    min-width: 198px !important;\n  }\n"]))),_=k.c.div(s||(s=Object(D.a)(["\n  min-width: 240px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background: ",";\n  border: 1px solid #b3b3b3;\n  box-shadow: ",";\n  color: #3b3b3b;\n  border-radius: 4px;\n  max-height: calc(100% - 12px);\n  transition: 200ms all ease-in-out;\n"])),(function(n){return n.$isDraggingOver?"white":"#dfdfdf"}),(function(n){return n.$isDraggingOver?"2px 6px 10px 10px #cfc8c8":" 2px 6px 5px 1px #cfc8c8"})),Q=k.c.div(p||(p=Object(D.a)(["\n  padding: 12px;\n  font-weight: 900;\n  text-transform: capitalize;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]))),X=k.c.div(u||(u=Object(D.a)(["\n  display: flex;\n  flex-direction: column;\n  padding: 0px 12px 12px 12px;\n  overflow: auto;\n  gap: 16px;\n\n  .no-card {\n    padding: 10px 0px;\n    text-align: center;\n    width: calc(100% - 10px);\n    border-radius: 4px;\n    background: #f6f6f6;\n  }\n"]))),Z=function(n){var e=n.list,t=n.updateDashBoard,o=n.onDelete,i=n.index,a=Object(k.d)(),c=Object(z.useState)(e),r=Object(R.a)(c,2),l=r[0],d=r[1],s=Object(z.useState)(null),p=Object(R.a)(s,2),u=p[0],b=p[1];Object(z.useEffect)((function(){e&&d(e)}),[e]);var x=function(n){d((function(e){return Object(E.a)(Object(E.a)({},e),{},{cards:[].concat(Object(P.a)(e.cards),[{id:(new Date).getTime(),title:n,priority:0,description:"",comments:[]}])})})),t(l)},j=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=Object(I.cloneDeep)(l);n&&(e.cards=e.cards.map((function(e){return e.id===n.id?n:e}))),b(null),t(e)},f=function(n,e){var o=Object(I.cloneDeep)(l),i=o.cards[n];o.cards.splice(n,1),o.cards.splice(e,0,i),t(o)},h=function(n){var e=Object(I.cloneDeep)(l);e.cards=e.cards.filter((function(e){return e.id!==n})),t(e)};return Object(B.jsx)(T.b,{draggableId:"".concat(l.id),index:i,children:function(n){var e=n.dragHandleProps,t=n.draggableProps,i=n.innerRef;return Object(B.jsx)(T.c,{droppableId:"".concat(l.id),type:"card",children:function(n,c){var r=n.innerRef,d=n.droppableProps,s=n.placeholder,p=c.isDraggingOver;return Object(B.jsxs)(_,Object(E.a)(Object(E.a)({},t),{},{$isDraggingOver:p,ref:i,children:[Object(B.jsxs)(Q,Object(E.a)(Object(E.a)({},e),{},{children:[Object(B.jsx)("span",{children:l.title}),Object(B.jsx)(W,{$bgcolor:a.pallete.ERROR,onClick:function(){return o(l.id)},children:$})]})),Object(B.jsxs)(X,Object(E.a)(Object(E.a)({ref:r},d),{},{children:[!l.cards.length&&Object(B.jsx)("div",{className:"no-card",onMouseDown:function(n){return n.preventDefault()},children:Object(B.jsx)("i",{children:"No Card(s) available"})}),l.cards.map((function(n,e){return Object(B.jsx)(q,{index:e,listId:l.id,deleteCard:h,expandCard:function(){return b(n)},moveCard:f,card:n},e)})),s]})),Object(B.jsx)(V,{children:Object(B.jsx)(F,{infoText:"add a card...",onSave:x})}),u&&Object(B.jsx)(J,{card:u,onClose:j})]}))}},"".concat(l.id))}},"".concat(l.id))},nn=Object(k.c)(A)(b||(b=Object(D.a)(["\n  color: ",";\n  border-color: ",";\n"])),(function(n){return n.theme.pallete.WHITE}),(function(n){return n.theme.pallete.WHITE})),en=Object(k.c)(W)(x||(x=Object(D.a)(["\n  font-size: 14px;\n  font-weight: 700;\n  padding: 4px 8px;\n\n  &:before {\n    content: '+';\n    padding-right: 8px;\n    font-size: 18px;\n    line-height: 16px;\n  }\n"]))),tn=k.c.nav(j||(j=Object(D.a)(["\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: ",";\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: calc(100% - 32px);\n  max-height: 32px;\n  min-height: 32px;\n  padding: 8px 16px;\n  box-shadow: ",";\n  z-index: 100;\n"])),(function(n){return n.theme.pallete.BLUE}),(function(n){var e=n.theme;return"0px 4px 6px 0px ".concat(e.pallete.BLACK,"4d")})),on=k.c.div(f||(f=Object(D.a)(["\n  display: flex;\n  align-items: center;\n  gap: 4px;\n\n  & > span {\n    font-weight: 900;\n    &:first-child {\n      color: ",";\n    }\n\n    &:nth-child(2) {\n      font-size: 12px;\n      padding: 2px 4px;\n      border-radius: 16px;\n      background: ",";\n      color: ",";\n    }\n  }\n"])),(function(n){return n.theme.pallete.WHITE}),(function(n){return n.theme.pallete.WHITE}),(function(n){return n.theme.pallete.BLUE})),an=k.c.div(h||(h=Object(D.a)(["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n\n  & > div {\n    position: relative;\n\n    & > input {\n      height: 32px;\n      border-radius: 4px;\n      color: ",";\n      padding: 2px 36px 2px 8px;\n      font-weight: 700;\n      font-size: 16px;\n\n      &::placeholder {\n        font-size: 12px;\n        font-weight: initial;\n      }\n    }\n\n    & > button {\n      position: absolute;\n      right: 0%;\n      top: 50%;\n      transform: translate(-50%, -50%);\n    }\n  }\n"])),(function(n){return n.theme.pallete.BLUE})),cn=function(n){var e=n.titleInfo,t=n.onEnter,o=n.dashboardList,i=n.onDashboardChange,a=n.selectedBoard,c=Object(k.d)(),r=Object(z.useState)(!1),l=Object(R.a)(r,2),d=l[0],s=l[1],p=Object(z.useState)(""),u=Object(R.a)(p,2),b=u[0],x=u[1],j=Object(z.useMemo)((function(){var n="Trello",t="2.0";return e&&(n=e.title,t=e.version),Object(B.jsxs)(on,{children:[Object(B.jsx)("span",{children:n}),t&&Object(B.jsx)("span",{children:t})]})}),[e]),f=function(){s((function(n){return!n})),x("")};return Object(B.jsxs)(tn,{children:[j,Object(B.jsxs)(an,{children:[d?Object(B.jsxs)("div",{children:[Object(B.jsx)("input",{type:"text",placeholder:"type and press to add dashboard",value:b,onChange:function(n){return x(n.target.value)},onKeyDown:function(n){"Enter"===n.key&&b&&(null===t||void 0===t||t(b),f())}}),Object(B.jsx)(W,{$bgcolor:c.pallete.ERROR,onClick:f,children:$})]}):Object(B.jsx)(en,{$bgcolor:c.pallete.WHITE,$color:c.pallete.BLUE,onClick:f,children:"Add New Dashboard"}),o.length?Object(B.jsx)(nn,{onChange:i,value:a,$caratColor:"white",children:o.map((function(n,e){return Object(B.jsx)("option",{value:n,children:"".concat(n," dashboard")},e)}))}):null]})]})},rn=k.c.div(g||(g=Object(D.a)(["\n  margin-top: 48px;\n  height: calc(100% - 80px);\n  width: calc(100% - 32px);\n  padding: 16px;\n  display: flex;\n  overflow: hidden;\n  position: relative;\n"]))),ln=k.c.div(O||(O=Object(D.a)(["\n  position: absolute;\n  bottom: 24px;\n  right: 32px;\n  z-index: 999;\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  border-radius: 16px;\n\n  & > button {\n    box-shadow: 4px 6px 6px 0px #787878;\n    font-size: 22px;\n    padding: 8px 14px;\n  }\n\n  & > h2 {\n    width: 140px;\n    font-size: 15px;\n    text-transform: capitalize;\n    color: #3b3b3b;\n    background: rgba(0, 0, 0, 0.206);\n    border-radius: 8px;\n    padding: 2px 6px;\n    transition: all 0.1s ease-in-out;\n    overflow: hidden;\n    opacity: 0;\n  }\n\n  &:hover > h2 {\n    opacity: 1;\n    transition: all 0.1s ease-in-out;\n  }\n"]))),dn=k.c.div(m||(m=Object(D.a)(["\n  display: flex;\n  gap: 16px;\n  overflow: auto;\n  align-items: flex-start;\n"]))),sn=function(){var n=Object(k.d)(),e=Object(z.useState)({title:"Trello",version:"2.0"}),t=Object(R.a)(e,1)[0],o=Object(z.useState)({}),i=Object(R.a)(o,2),a=i[0],c=i[1],r=Object(z.useState)(""),l=Object(R.a)(r,2),d=l[0],s=l[1],p=function(){var n=Object(S.a)(Object(N.a)().mark((function n(){var e;return Object(N.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat("/mocktrello","/mock-data.json")).then((function(n){return n.json()}));case 2:e=n.sent,c(e),s(Object.keys(e)[0]);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),u=function(n){var e=Object(I.cloneDeep)(a),t=null!==d&&void 0!==d?d:"default";e[t]||(e[t="default"]=[]),e[t].push({id:(new Date).getTime(),title:n,cards:[]}),c(e),s(t)},b=function(n){return c((function(e){return Object(E.a)(Object(E.a)({},e),{},Object(C.a)({},d,e[d].filter((function(e){return e.id!==n}))))}))},x=function(n){var e=Object(I.cloneDeep)(a),t=e[d].map((function(e){return e.id===n.id?n:e}));e[d]=t,c(e)},j=Object(z.useCallback)((function(n){var e=n.destination,t=n.source,o=n.draggableId;c((function(n){var i,a,c,r=n[d].find((function(n){return n.id===Number(t.droppableId)})),l=null===r||void 0===r?void 0:r.cards.find((function(n){return n.id===Number(o)}));(null===r||void 0===r||r.cards.splice(t.index,1),(null===e||void 0===e?void 0:e.droppableId)===t.droppableId)?null===r||void 0===r||r.cards.splice(e.index,0,l):null===(a=i=n[d].find((function(n){return n.id===Number(null===e||void 0===e?void 0:e.droppableId)})))||void 0===a||a.cards.splice(null!==(c=null===e||void 0===e?void 0:e.index)&&void 0!==c?c:0,0,l);return Object(E.a)(Object(E.a)({},n),{},Object(C.a)({},d,n[d].map((function(n){var e;return n.id===(null===r||void 0===r?void 0:r.id)?r:(null===(e=i)||void 0===e?void 0:e.id)===n.id?i:n}))))}))}),[d]),f=Object(z.useCallback)((function(n){var e=n.destination,t=n.source,o=n.type;e&&(e.droppableId===t.droppableId&&e.index===t.index||"card"===o&&j(n))}),[j]);return Object(z.useEffect)((function(){p()}),[]),0!==Object.keys(a).length||d?Object(B.jsxs)("div",{className:"App",children:[Object(B.jsx)(cn,{titleInfo:t,dashboardList:Object.keys(a),onDashboardChange:function(n){return s(n.target.value)},selectedBoard:d,onEnter:function(n){var e=Object(I.cloneDeep)(a);e[n]=[],c(e),s(n)}}),Object(B.jsxs)(rn,{children:[Object.keys(a).length>1&&Object(B.jsxs)(ln,{children:[Object(B.jsx)("h2",{children:"Delete Dashboard"}),Object(B.jsx)(W,{$bgcolor:n.pallete.ERROR,onClick:function(){var n=Object(I.cloneDeep)(a);delete n[d],c(n),s(Object.keys(n)[0])},children:$})]}),Object(B.jsx)(T.a,{onDragEnd:f,children:Object(B.jsx)(T.c,{droppableId:"container",direction:"horizontal",type:"list",children:function(n){var e,t=n.droppableProps,o=n.placeholder,i=n.innerRef;return Object(B.jsxs)(dn,Object(E.a)(Object(E.a)({ref:i},t),{},{children:[null===(e=a[d])||void 0===e?void 0:e.map((function(n,e){return Object(B.jsx)(Z,{index:e,list:n,updateDashBoard:x,onDelete:b},e)})),o,Object(B.jsx)(F,{infoText:"add a new list...",onSave:u})]}))}})})]})]}):Object(B.jsx)(B.Fragment,{})},pn=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function un(n,e){navigator.serviceWorker.register(n).then((function(n){n.onupdatefound=function(){var t=n.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(n)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}})).catch((function(n){console.error("Error during service worker registration:",n)}))}var bn=Object(k.b)(v||(v=Object(D.a)(['\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",\n    monospace;\n}\n\nhtml, #root, .App,body {\n  height: 100%;\n}\n\n.App{\n  overflow: hidden;\n}\n\n.Modal {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  right: auto;\n  bottom: auto;\n  background: ',";\n  overflow: auto;\n  border-radius: 4px;\n  outline: none;\n  padding: 20px;\n  margin-right: -50%;\n  transform: translate(-50%, -50%);\nmax-width: 400px;\nwidth: 80%;\n  box-shadow:  ",";\n  display: flex;\n  flex-direction: column;\n  gap:16px\n}\n\ninput {\n  outline: none;\n  border: none;\n}\n\ninput[type=text]::placeholder {\n  font-style: italic;\n}\n\n.Overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: ","\n}\n\n.Modal label{\n  margin-bottom: 5px;\n  display: block;\n  text-transform: capitalize;\n  font-weight: 500;\n}\n\n.Modal>div:last-child{\ndisplay: flex;\nalign-items: center;\njustify-content: flex-end;\ngap: 8px;\n}\n\n.Modal button {\n  font-size: 18px;\n  border-radius: 20px;\n  padding: 8px 12px;\n}\n\n.close{\n  &:after {\n  content: '\\2716';\n  font-size: 16px;\n  cursor: pointer;\n  padding: 8px;\n}\n}\n\n.edit{\n  transform: rotate(108deg);\n  &:after {\n  content: '\\270E';\n  font-size: 16px;\n  cursor: pointer;\n}\n}\n"],['\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",\n    monospace;\n}\n\nhtml, #root, .App,body {\n  height: 100%;\n}\n\n.App{\n  overflow: hidden;\n}\n\n.Modal {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  right: auto;\n  bottom: auto;\n  background: ',";\n  overflow: auto;\n  border-radius: 4px;\n  outline: none;\n  padding: 20px;\n  margin-right: -50%;\n  transform: translate(-50%, -50%);\nmax-width: 400px;\nwidth: 80%;\n  box-shadow:  ",";\n  display: flex;\n  flex-direction: column;\n  gap:16px\n}\n\ninput {\n  outline: none;\n  border: none;\n}\n\ninput[type=text]::placeholder {\n  font-style: italic;\n}\n\n.Overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: ","\n}\n\n.Modal label{\n  margin-bottom: 5px;\n  display: block;\n  text-transform: capitalize;\n  font-weight: 500;\n}\n\n.Modal>div:last-child{\ndisplay: flex;\nalign-items: center;\njustify-content: flex-end;\ngap: 8px;\n}\n\n.Modal button {\n  font-size: 18px;\n  border-radius: 20px;\n  padding: 8px 12px;\n}\n\n.close{\n  &:after {\n  content: '\\\\2716';\n  font-size: 16px;\n  cursor: pointer;\n  padding: 8px;\n}\n}\n\n.edit{\n  transform: rotate(108deg);\n  &:after {\n  content: '\\\\270E';\n  font-size: 16px;\n  cursor: pointer;\n}\n}\n"])),(function(n){return n.theme.pallete.WHITE}),(function(n){var e=n.theme;return"0px 0px 20px 0px ".concat(e.pallete.GREY)}),(function(n){var e=n.theme;return"".concat(e.pallete.GREY,"99")})),xn={pallete:Object.freeze({BLUE:"#3081b0",GREY:"#3b3b3b",WHITE:"#ffffff",BLACK:"#000000",LIGHT_GREEN:"#759d90",ORANGE:"#a16a05",SUCCESS:"#3a8b5e",ERROR:"#9f3939",INACTIVE:"grey",WARNING:"#a39e04"})};y.a.render(Object(B.jsxs)(k.a,{theme:xn,children:[Object(B.jsx)(sn,{}),Object(B.jsx)(bn,{})]}),document.getElementById("root")),function(n){if("serviceWorker"in navigator){if(new URL("/mocktrello",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/mocktrello","/service-worker.js");pn?(!function(n,e){fetch(n).then((function(t){var o=t.headers.get("content-type");404===t.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(n){n.unregister().then((function(){window.location.reload()}))})):un(n,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,n),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):un(e,n)}))}}()}},[[480,1,2]]]);
//# sourceMappingURL=main.946e6e85.chunk.js.map