(this["webpackJsonpstylablez-demo"]=this["webpackJsonpstylablez-demo"]||[]).push([[0],{102:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(11),o=t.n(c),s=(t(89),t(90),t(74)),l=t(52),i=t(16),d=t(136),b=t(156),j=t(73),p=t(155),u=t(140),h={palettes:[{name:"Classic",colors:[{hex:"#ffffff",class:"prim"},{hex:"#CCCCCC",class:"scnd"},{hex:"#150A48",class:"acnt"}]},{name:"Warm",colors:[{hex:"#F5FA9A",class:"prim"},{hex:"#0D28F2",class:"scnd"},{hex:"#ffffff",class:"acnt"}]},{name:"Neuv",colors:[{hex:"#262626",class:"prim"},{hex:"#d9d9d9",class:"scnd"},{hex:"#ffffff",class:"acnt"}]},{name:"Hot Dog",colors:[{hex:"#FFFFFF",class:"primary"},{hex:"#FF0000",class:"secondary"},{hex:"#00FF00",class:"accent"}]}]},g=t(150),m=t(151),x=t(72),O=t.n(x),y=t(153),f=t(143),v=t(144),C=t(158),E=t(146),w=t(152),F=t(145),k=t(147),N=t(148),I=t(149),S=t(41),A=t(157),L=t(6),B=Object(d.a)((function(e){return Object(b.a)({slider:{width:"100%"},sliderLabel:{fontSize:12}})})),D=function(e){var a=B(),t=e.layerIndex,r=e.dispatch,n=e.brightness,c=e.opacity;return Object(L.jsxs)("div",{children:[Object(L.jsx)(S.a,{id:"brightness-slider",className:a.sliderLabel,children:"Brightness"}),Object(L.jsx)(A.a,{className:a.slider,value:n,min:0,max:100,onChange:function(e,a){return function(e,a,t){e({type:"changeBrightness",layerIndex:a,value:t})}(r,t,a)},"aria-labelledby":"brightness-slider"}),Object(L.jsx)(S.a,{id:"opacity-slider",className:a.sliderLabel,children:"Opacity"}),Object(L.jsx)(A.a,{className:a.slider,value:c,min:0,max:100,onChange:function(e,a){return function(e,a,t){e({type:"changeOpacity",layerIndex:a,value:t})}(r,t,a)},"aria-labelledby":"opacity-slider"})]})},P=Object(d.a)((function(e){return Object(b.a)({listItem:{padding:0,margin:0},backgroundControl:{marginTop:20},drawerContent:{padding:20},shownEditor:{marginBottom:98,backgroundColor:"#EEEEEE",transition:"margin .2s ease-out"},notShownEditor:{marginBottom:0,backgroundColor:"#EEEEEE",transition:"margin .2s ease-out"},notFocused:{backgroundColor:"#FFFFFF"},drawer:{paddingTop:15,paddingLeft:8},layerEditor:{width:235,backgroundColor:"#EEEEEE",position:"absolute",top:35,paddingRight:32,paddingLeft:32},focused:{backgroundColor:"#EEEEEE",borderStyle:"solid",borderWidth:"0 1px 1px 0"}})})),W=function(e){var a=e.compositionState,t=e.dispatch,n=a.layers,c=a.paletteNames,o=a.palette,s=P(),d=Object(r.useState)(-1),b=Object(l.a)(d,2),j=b[0],p=b[1];return Object(L.jsx)(y.a,{anchor:"right",variant:"permanent",className:s.drawer,children:Object(L.jsxs)("div",{className:s.drawerContent,children:[Object(L.jsx)(m.a,{value:o.name,onChange:function(e,a){t({type:"changePaletteName",paletteName:a})},id:"palette-selector",disableClearable:!0,options:c,style:{width:300},renderInput:function(e){return Object(L.jsx)(g.a,Object(i.a)(Object(i.a)({},e),{},{label:"Palette",variant:"outlined"}))}}),Object(L.jsx)("div",{className:s.backgroundControl,children:Object(L.jsxs)(f.a,{component:"fieldset",children:[Object(L.jsx)(v.a,{component:"legend",children:"Background"}),Object(L.jsxs)(C.a,{"aria-label":"background",name:"background",value:a.backgroundColor,onChange:function(e){return t({type:"changeBackgroundColor",backgroundColor:e.target.value})},children:[Object(L.jsx)(E.a,{value:"",control:Object(L.jsx)(w.a,{}),label:"Transparent"}),Object(L.jsx)(E.a,{value:"prim",control:Object(L.jsx)(w.a,{}),label:"Primary"}),Object(L.jsx)(E.a,{value:"scnd",control:Object(L.jsx)(w.a,{}),label:"Secondary"}),Object(L.jsx)(E.a,{value:"acnt",control:Object(L.jsx)(w.a,{}),label:"Accent"})]})]})}),Object(L.jsx)(F.a,{children:n.map((function(e,a){var r=a===j?s.shownEditor:s.notShownEditor,n=a!==j;return Object(L.jsxs)(k.a,{className:"".concat(s.listItem," ").concat(r),onClick:function(){p(a)},children:[Object(L.jsx)(N.a,{children:Object(L.jsx)(O.a,{})}),Object(L.jsx)(I.a,{primary:e.sourceId}),Object(L.jsx)("div",{className:s.layerEditor,style:{opacity:n?0:1},children:Object(L.jsx)(D,{brightness:e.styleMap.brightness||100,opacity:e.styleMap.opacity||100,layerIndex:a,dispatch:t})})]},a)}))})]})})},T=t.p+"static/media/splash.d1c8c6b9.png",M=t(54),R=Object(d.a)((function(e){return Object(b.a)({text:{position:"absolute",left:70},outerWrapper:{position:"absolute",top:100,left:60},compWrapper:{width:850,height:500,position:"relative"},noDragActive:{backgroundColor:"green"},dragActive:{border:"1px solid",padding:"10",boxShadow:"5px 10px #88888850",borderRadius:5,borderColor:"#88888850"},img:{width:400,height:330,top:184,left:264,position:"absolute"},dropZone:{height:150,width:245},wrapper:{height:500,position:"absolute",top:90,bottom:90,left:50,width:850,borderRadius:10,borderColor:"#d6d4d4",borderWidth:10,borderStyle:"dashed"}})})),z=new M.PaletteTool,H=new M.LayerTool,J=function(e,a){switch(a.type){case"changeBackgroundColor":return Object(i.a)(Object(i.a)({},e),{},{backgroundColor:a.backgroundColor});case"changePaletteName":return Object(i.a)(Object(i.a)({},e),{},{palette:z.getPalette(h,a.paletteName)});case"changeOpacity":var t=Object(i.a)({},e.layers[a.layerIndex]);t.styleMap.opacity=a.value;var r=Object(i.a)({},e);return r.layers[a.layerIndex]=t,r;case"changeBrightness":var n=Object(i.a)({},e.layers[a.layerIndex]);n.styleMap.brightness=a.value;var c=Object(i.a)({},e);return c.layers[a.layerIndex]=n,c;case"changeLayers":return Object(i.a)(Object(i.a)({},e),{},{layers:a.layers});default:throw new Error}},Z={backgroundColor:"prim",palette:h.palettes[0],paletteNames:z.getPaletteNames(h),layers:[]},q=function(e){var a=Object(r.useReducer)(J,Z),t=Object(l.a)(a,2),n=t[0],c=t[1],o=z.getHexForLabel(n.palette,n.backgroundColor),d=R(),b=Object(r.useCallback)((function(e){var a=H.buildStylizableLayers(e,!0);c({type:"changeLayers",layers:a})}),[]),h=Object(j.a)({noDragEventsBubbling:!0,onDrop:b,accept:"image/*"}),g=h.getRootProps,m=h.isDragActive,x=Object(r.useMemo)((function(){return m?d.dragActive:d.noDragActive}),[m,d.dragActive,d.noDragActive]),O=g(),y=O.ref,f=Object(s.a)(O,["ref"]);return Object(L.jsx)(p.a,{rootRef:y,children:Object(L.jsxs)(u.a,Object(i.a)(Object(i.a)({},f),{},{elevation:0,children:[Object(L.jsx)("p",{className:d.text,children:"Drag 'n' drop some image files below"}),n.layers.length>0?Object(L.jsx)("div",{className:d.outerWrapper,children:Object(L.jsx)("div",{className:d.compWrapper,children:Object(L.jsx)(M.Composite,{backgroundColor:o,layers:n.layers,layerHeight:500,layerWidth:800,palette:n.palette})})}):Object(L.jsx)("img",{src:T,className:"".concat(d.img," ").concat(x),alt:""}),Object(L.jsx)("div",{className:"".concat(d.wrapper),children:Object(L.jsx)(W,{compositionState:n,dispatch:c})})]}))})},G=function(){return Object(L.jsx)("div",{className:"App",children:Object(L.jsx)(q,{})})},K=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,160)).then((function(a){var t=a.getCLS,r=a.getFID,n=a.getFCP,c=a.getLCP,o=a.getTTFB;t(e),r(e),n(e),c(e),o(e)}))};o.a.render(Object(L.jsx)(n.a.StrictMode,{children:Object(L.jsx)(G,{})}),document.getElementById("root")),K()},89:function(e,a,t){},90:function(e,a,t){}},[[102,1,2]]]);
//# sourceMappingURL=main.209cd7be.chunk.js.map