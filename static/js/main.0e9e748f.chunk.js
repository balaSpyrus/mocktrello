(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{207:function(e,t,a){e.exports=a(481)},212:function(e,t,a){},231:function(e,t,a){},268:function(e,t,a){},269:function(e,t,a){},279:function(e,t,a){},280:function(e,t,a){},481:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(75),o=a.n(s),i=(a(212),a(46)),c=a(7),l=a(127),d=a.n(l),u=a(201),m=a(4),p=a(5),h=a(21),v=a(20),b=a(22),g=a(61),f=(a(231),a(76)),E=a(206),C=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(h.a)(this,Object(v.a)(t).call(this,e))).toggleBtn=function(){a.setState(function(e){return{isAddingOne:!e.isAddingOne}}),a.props.onToggle&&a.props.onToggle(!a.state.isAddingOne)},a.onTitleChange=function(e){a.setState({title:e.target.value})},a.onSave=function(){a.props.onSave(a.state.title),a.props.onToggle&&a.props.onToggle(!1),a.setState({title:"",isAddingOne:!1})},a.onEnterPress=function(e){"Enter"===e.key&&a.state.title&&a.onSave()},a.state={isAddingOne:!1,title:""},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.props.isAddingOne!==e.isAddingOne&&this.setState({isAddingOne:e.isAddingOne})}},{key:"render",value:function(){return this.state.isAddingOne?r.a.createElement("div",{className:"add-one-mini"},r.a.createElement("input",{type:"text",placeholder:this.props.addingFor,autoFocus:!0,value:this.state.title,onChange:this.onTitleChange,onKeyPress:this.onEnterPress}),r.a.createElement("div",null,r.a.createElement("button",{className:"btn-c blue",onClick:this.state.title?this.onSave:null},"\u2714"),r.a.createElement("button",{className:"btn-c red",onClick:this.toggleBtn},"\u2716"))):r.a.createElement("a",{href:"/#",className:"add-one-element",onClick:this.toggleBtn},this.props.addingFor)}}]),t}(r.a.Component),O=a(204),j=a.n(O),k=(a(268),{hover:function(e,t,a){e.onHoverList(e.listID);var n=t.getItem().index,r=e.index;if(n!==r){var o=Object(s.findDOMNode)(a).getBoundingClientRect(),i=(o.bottom-o.top)/2,c=t.getClientOffset().y-o.top;n<r&&c<i||n>r&&c>i||(e.moveCard(n,r,e.listID),t.getItem().index=r)}}}),y=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(h.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).getTitleColor=function(e){var t=["card-title"];switch(e+""){case"1":t.push("investigate");break;case"2":t.push("in-progress");break;case"3":t.push("done");break;case"4":t.push("critical");break;case"5":t.push("hold");break;default:t.push("new")}return t.join(" ")},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.card,n=t.isDragging,s=t.connectDragSource,o=t.connectDropTarget;return s&&o&&s(o(a?r.a.createElement("div",{className:n?"card card-drag":"card",onClick:this.props.expandCard},r.a.createElement("div",{className:this.getTitleColor(a.priority)},r.a.createElement("span",null," ",a.title,"  "),r.a.createElement("span",{onClick:function(){return e.props.deleteCard(a.id)}},"\u2716")),r.a.createElement("div",{className:"card-comment-count",title:a.description},a.comments.length?r.a.createElement("i",null,"".concat(a.comments.length," comment(s)")):r.a.createElement("i",null,"Be the first to comment"))):r.a.createElement("div",{className:"no-card",onMouseDown:function(e){return e.preventDefault()}},r.a.createElement("i",null,"No Card(s) available"))))}}]),t}(r.a.Component);y.defaultProps={card:null};var D=j()(Object(f.c)("card",{beginDrag:function(e){return{id:e.id,listID:e.listID,index:e.index}},endDrag:function(e,t){if(t.didDrop()&&e.card)return e.handleDrop(e.card.id,e.listID)}},function(e,t){return{connectDragSource:e.dragSource(),connectDragPreview:e.dragPreview(),isDragging:t.isDragging()}}),Object(f.d)("card",k,function(e,t){return{connectDropTarget:e.dropTarget(),hovered:t.isOver(),item:t.getItem()}}))(y),N=(a(269),a(47)),S=a(205),B=a.n(S),I=(a(279),function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(h.a)(this,Object(v.a)(t).call(this,e))).deleteComment=function(e){var t=Object(c.a)({},a.state).card;t.comments.splice(e,1),a.setState({card:t})},a.onInputChange=function(e){a.setState({comment:e.target.value})},a.addComment=function(e){if("Enter"===e.key&&a.state.comment){var t=Object(c.a)({},a.state).card;t.comments.push(a.state.comment),a.setState({card:t,comment:""})}},a.onEditClose=function(e){a.setState(function(t){return Object(N.a)({},e+"IsOpen",!t[e+"IsOpen"])})},a.onSave=function(){a.props.onClose&&a.props.onClose(a.state.card)},a.onChange=function(e){var t=e.target.name,n=e.target.value;a.setState(function(e){var a=Object(c.a)({},e.card);return a[t]=n,{card:a}})},a.state={card:JSON.parse(JSON.stringify(e.card)),comment:"",titleIsOpen:!1,descriptionIsOpen:!1},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=Object(c.a)({},this.state).card;return r.a.createElement(B.a,{isOpen:!0,onRequestClose:this.props.onClose,className:"Modal",overlayClassName:"Overlay",appElement:document.getElementById("root")},r.a.createElement("div",{className:"edit-modal-title"},this.state.titleIsOpen?r.a.createElement("input",{type:"text",className:"on-edit-modal-title",name:"title",onChange:this.onChange,value:t.title}):r.a.createElement("h2",null,t.title),r.a.createElement("span",{className:this.state.titleIsOpen?"close":"edit",onClick:function(){return e.onEditClose("title")}})),r.a.createElement("div",null,r.a.createElement("label",{className:"model-label"},"description"),r.a.createElement("div",{className:"card-desc"},this.state.descriptionIsOpen?r.a.createElement("textarea",{value:t.description,onChange:this.onChange,name:"description",className:"edit-text-area"}):r.a.createElement("i",null,t.description),r.a.createElement("span",{className:this.state.descriptionIsOpen?"close":"edit",onClick:function(){return e.onEditClose("description")}}))),r.a.createElement("div",null,r.a.createElement("label",{className:"model-label"},"status"),r.a.createElement("select",{value:t.priority,name:"priority",onChange:this.onChange,className:"select-list status-list"},r.a.createElement("option",{value:0},"new"),r.a.createElement("option",{value:1},"investigate"),r.a.createElement("option",{value:2},"in-progress"),r.a.createElement("option",{value:3},"done"),r.a.createElement("option",{value:4},"critical"),r.a.createElement("option",{value:5},"hold"))),r.a.createElement("div",null,r.a.createElement("label",{className:"model-label"},"comments"),r.a.createElement("div",{className:"card-comment-container"},r.a.createElement(g.Scrollbars,{className:"scroll",autoHeight:!0,autoHeightMin:0,autoHeightMax:200,renderThumbVertical:function(e){var t=e.style,a=Object(i.a)(e,["style"]);return r.a.createElement("div",Object.assign({},a,{style:Object(c.a)({},t,{backgroundColor:"rgba(49, 49, 49, 0.4)",borderRadius:"3px"})}))}},t.comments.map(function(t,a){return r.a.createElement("span",{className:"comment",key:a},r.a.createElement("i",null,t),r.a.createElement("span",{className:"comment-delete",onClick:function(){return e.deleteComment(a)}},"\u2716"))})),r.a.createElement("input",{type:"text",value:this.state.comment,className:"add-comment",placeholder:"type and press enter to add comment",onChange:this.onInputChange,onKeyPress:this.addComment}))),r.a.createElement("div",null,r.a.createElement("button",{className:"btn-c blue",onClick:this.onSave},"\u2714"),r.a.createElement("button",{className:"btn-c red",onClick:this.props.onClose},"\u2716")))}}]),t}(r.a.Component)),x=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(h.a)(this,Object(v.a)(t).call(this,e))).addCard=function(e){var t=Object(c.a)({},a.state.list);t.cards.push({id:(new Date).getTime(),title:e,priority:0,description:"",comments:[]}),a.props.updateDashBoard(t)},a.expandCard=function(e){a.setState({expandedCard:e})},a.closeModal=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=Object(c.a)({},a.state.list);e&&(t.cards=t.cards.map(function(t){return t.id===e.id?e:t})),a.setState({expandedCard:null}),a.props.updateDashBoard(t)},a.moveCard=function(e,t){var n=Object(c.a)({},a.state.list),r=n.cards[e];n.cards.splice(e,1),n.cards.splice(t,0,r),a.props.updateDashBoard(n)},a.deleteCard=function(e){var t=Object(c.a)({},a.state.list);t.cards=t.cards.filter(function(t){return t.id!==e}),a.props.updateDashBoard(t)},a.onToggle=function(){return a.setState(function(e){return{isAddingCard:!e.isAddingCard}})},a.state={list:e.list,isAddingCard:!1,expandedCard:null},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.list&&e.list!==this.props.list&&this.setState({list:e.list})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"list"},r.a.createElement("div",{className:"title-container"},r.a.createElement("span",null,this.state.list.title),r.a.createElement("span",{className:"btn-c red",onClick:function(){return e.props.onDelete(e.state.list.id)}},"\u2716")),r.a.createElement("div",{className:"card-container"},r.a.createElement(g.Scrollbars,{className:"scroll",autoHeight:!0,autoHeightMin:0,autoHeightMax:this.state.isAddingCard?"calc(100vh - 220px)":"calc(100vh - 165px)",renderThumbVertical:function(e){var t=e.style,a=Object(i.a)(e,["style"]);return r.a.createElement("div",Object.assign({},a,{style:Object(c.a)({},t,{backgroundColor:"rgba(49, 49, 49, 0.4)",borderRadius:"3px"})}))}},this.state.list.cards.length?this.state.list.cards.map(function(t,a){return r.a.createElement(D,{index:a,listID:e.state.list.id,deleteCard:e.deleteCard,expandCard:function(){return e.expandCard(t)},onHoverList:e.props.onHoverList,moveCard:e.moveCard,handleDrop:e.props.handleDrop,card:t,key:a})}):r.a.createElement(D,{moveCard:this.moveCard,onHoverList:this.props.onHoverList,handleDrop:this.props.handleDrop}))),r.a.createElement("div",{className:"btn-container"},r.a.createElement(C,{addingFor:"add a card...",onSave:this.addCard,onToggle:this.onToggle})),this.state.expandedCard&&r.a.createElement(I,{card:this.state.expandedCard,onClose:this.closeModal}))}}]),t}(r.a.Component);x.defaultProps={list:null};var w=x,T=(a(280),function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(h.a)(this,Object(v.a)(t).call(this,e))).getTitleAndVersion=function(){var e="Trello",t="2.0";return a.props.titleInfo&&(e=a.props.titleInfo.title,t=a.props.titleInfo.version),r.a.createElement("div",{className:"nav-title"},r.a.createElement("span",null,e),t&&r.a.createElement("span",null,t))},a.onClickAdd=function(){a.setState(function(e){return{showAddInput:!e.showAddInput,title:""}})},a.onTitleChange=function(e){a.setState({title:e.target.value})},a.onEnterPress=function(e){"Enter"===e.key&&a.state.title&&(a.props.onEnter&&a.props.onEnter(a.state.title),a.onClickAdd())},a.state={showAddInput:!1,title:""},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"navbar"},this.getTitleAndVersion(),r.a.createElement("div",{className:"nav-right"},this.state.showAddInput?r.a.createElement("div",{className:"add-board"},r.a.createElement("input",{type:"text",placeholder:"type and press to add dashboard",value:this.state.title,onChange:this.onTitleChange,onKeyPress:this.onEnterPress}),r.a.createElement("button",{className:"btn-c red",onClick:this.onClickAdd},"\u2716")):r.a.createElement("button",{className:"btn-c add",onClick:this.onClickAdd},r.a.createElement("span",null,"add  dashboard")),this.props.dashboardList.length?r.a.createElement("select",{onChange:this.props.onDashboardChange,className:"select-list dashboard-list",value:this.props.selectedBoard},this.props.dashboardList.map(function(e,t){return r.a.createElement("option",{key:t,value:e},e+" dashboard")})):null))}}]),t}(n.Component)),A=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(h.a)(this,Object(v.a)(t).call(this,e))).getMockData=Object(u.a)(d.a.mark(function e(){var t;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/mocktrellomock-data.json").then(function(e){return e.json()});case 2:t=e.sent,a.setState(function(e){return{dashboard:t,selectedBoard:Object.keys(t)[0]}});case 4:case"end":return e.stop()}},e)})),a.addList=function(e){a.setState(function(t){var a=Object(c.a)({},t.dashboard),n=t.selectedBoard?t.selectedBoard:"default";return a[n]||(a[n="default"]=[]),a[n].push({id:(new Date).getTime(),title:e,cards:[]}),{dashboard:a,selectedBoard:n}})},a.deleteList=function(e){a.setState(function(t){var a=Object(c.a)({},t.dashboard);return a[t.selectedBoard]=a[t.selectedBoard].filter(function(t){return t.id!==e}),{dashboard:a}})},a.handleDrop=function(e,t){if(a.state.currentHoverListID&&a.state.currentHoverListID!==t){var n=JSON.parse(JSON.stringify(a.state.dashboard)),r=n[a.state.selectedBoard],s=r.filter(function(e){return e.id===t})[0],o=r.filter(function(e){return e.id===a.state.currentHoverListID})[0],i=s.cards.splice(s.cards.filter(function(e){return e}).map(function(e){return e.id}).indexOf(e),1)[0];o.cards.push(i),o.cards=o.cards.filter(function(e){return e}),s.cards=s.cards.filter(function(e){return e}),n[a.state.selectedBoard]=r,a.setState({dashboard:n})}},a.onHoverList=function(e){e&&e!==a.state.currentHoverListID&&a.setState({currentHoverListID:e})},a.onDashboardChange=function(e){a.setState({selectedBoard:e.target.value})},a.updateDashBoard=function(e){var t=JSON.parse(JSON.stringify(a.state.dashboard)),n=t[a.state.selectedBoard].map(function(t){return t.id===e.id?e:t});t[a.state.selectedBoard]=n,a.setState({dashboard:t})},a.onDashBoardTitleSave=function(e){var t=Object(c.a)({},a.state.dashboard);t[e]=[],a.setState({dashboard:t,selectedBoard:e})},a.deleteBoard=function(){var e=Object(c.a)({},a.state.dashboard);delete e[a.state.selectedBoard],a.setState({dashboard:e,selectedBoard:Object.keys(e)[0]})},a.state={titleInfo:{title:"Trello",version:"2.0"},selectedBoard:"",dashboard:{},currentHoverListID:null},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getMockData()}},{key:"render",value:function(){var e=this;return 0===Object.keys(this.state.dashboard).length?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",{className:"App"},r.a.createElement(T,{titleInfo:this.state.titleInfo,dashboardList:Object.keys(this.state.dashboard),onDashboardChange:this.onDashboardChange,selectedBoard:this.state.selectedBoard,onEnter:this.onDashBoardTitleSave}),r.a.createElement(f.b,{backend:E.a},r.a.createElement("div",{className:"list-section"},Object.keys(this.state.dashboard).length>1&&r.a.createElement("div",{className:"dashboard-delete"},r.a.createElement("h2",null,"delete dashboard"),r.a.createElement("button",{className:"btn-c red",onClick:this.deleteBoard},"\u2716")),r.a.createElement(g.Scrollbars,{className:"scroll",renderThumbHorizontal:function(e){var t=e.style,a=Object(i.a)(e,["style"]);return r.a.createElement("div",Object.assign({},a,{style:Object(c.a)({},t,{backgroundColor:"rgb(48, 129, 176)",borderRadius:"3px"})}))}},r.a.createElement("div",{className:"list-container"},this.state.dashboard[this.state.selectedBoard]&&this.state.dashboard[this.state.selectedBoard].map(function(t,a){return r.a.createElement(w,{key:a,list:t,onHoverList:e.onHoverList,handleDrop:e.handleDrop,updateDashBoard:e.updateDashBoard,onDelete:e.deleteList})}),r.a.createElement(C,{addingFor:"add a new list...",onSave:this.addList}))))))}}]),t}(r.a.Component);a(281),a(290),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[207,1,2]]]);
//# sourceMappingURL=main.0e9e748f.chunk.js.map