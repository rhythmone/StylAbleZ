(this["webpackJsonpstylablez-demo"]=this["webpackJsonpstylablez-demo"]||[]).push([[0],{102:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(11),o=a.n(c),s=(a(89),a(90),a(74)),l=a(53),i=a(16),d=a(136),b=a(156),p=a(73),u=a(155),j=a(140),g=a(39),h={palettes:[{name:"classic",tone:"light",colors:[{tone:"lit",hex:"#ffffff",usage:"background",palette:"prim"},{tone:"mid",hex:"#CCCCCC",usage:"text",palette:"scnd"},{tone:"drk",hex:"#150A48",usage:"head",palette:"acnt"}]},{name:"warm",tone:"light",colors:[{tone:"lit",hex:"#F5FA9A",usage:"background",palette:"prim"},{tone:"drk",hex:"#0D28F2",usage:"text",palette:"scnd"},{tone:"lit",hex:"#ffffff",usage:"none",palette:"acnt"}]},{name:"helvNue",tone:"dark",colors:[{tone:"drk",hex:"#262626",usage:"background",palette:"prim"},{tone:"lit",hex:"#d9d9d9",usage:"text",palette:"scnd"},{tone:"lit",hex:"#ffffff",usage:"none",palette:"acnt"}]}]},O=a(150),m=a(151),x=a(72),y=a.n(x),f=a(153),v=a(143),C=a(144),E=a(158),k=a(146),w=a(152),N=a(145),F=a(147),I=a(148),A=a(149),S=a(42),B=a(157),D=a(6),L=Object(d.a)((function(e){return Object(b.a)({slider:{width:"100%"},sliderLabel:{fontSize:12}})})),P=function(e){var t=L(),a=e.layerIndex,r=e.dispatch,n=e.brightness,c=e.opacity;return Object(D.jsxs)("div",{children:[Object(D.jsx)(S.a,{id:"brightness-slider",className:t.sliderLabel,children:"Brightness"}),Object(D.jsx)(B.a,{className:t.slider,value:n,min:0,max:100,onChange:function(e,t){return function(e,t,a){e({type:"changeBrightness",layerIndex:t,value:a})}(r,a,t)},"aria-labelledby":"brightness-slider"}),Object(D.jsx)(S.a,{id:"opacity-slider",className:t.sliderLabel,children:"Opacity"}),Object(D.jsx)(B.a,{className:t.slider,value:c,min:0,max:100,onChange:function(e,t){return function(e,t,a){e({type:"changeOpacity",layerIndex:t,value:a})}(r,a,t)},"aria-labelledby":"opacity-slider"})]})},R=Object(d.a)((function(e){return Object(b.a)({listItem:{padding:0,margin:0},backgroundControl:{marginTop:20},drawerContent:{padding:20},shownEditor:{marginBottom:98,backgroundColor:"#EEEEEE",transition:"margin .2s ease-out"},notShownEditor:{marginBottom:0,backgroundColor:"#EEEEEE",transition:"margin .2s ease-out"},notFocused:{backgroundColor:"#FFFFFF"},drawer:{paddingTop:15,paddingLeft:8},layerEditor:{width:235,backgroundColor:"#EEEEEE",position:"absolute",top:35,paddingRight:32,paddingLeft:32},focused:{backgroundColor:"#EEEEEE",borderStyle:"solid",borderWidth:"0 1px 1px 0"}})})),W=function(e){var t=e.compositionState,a=e.dispatch,n=t.layers,c=t.paletteNames,o=t.palette,s=R(),d=Object(r.useState)(-1),b=Object(l.a)(d,2),p=b[0],u=b[1];return Object(D.jsx)(f.a,{anchor:"right",variant:"permanent",className:s.drawer,children:Object(D.jsxs)("div",{className:s.drawerContent,children:[Object(D.jsx)(m.a,{value:o.name,onChange:function(e,t){a({type:"changePaletteName",paletteName:t})},id:"palette-selector",disableClearable:!0,options:c,style:{width:300},renderInput:function(e){return Object(D.jsx)(O.a,Object(i.a)(Object(i.a)({},e),{},{label:"Palette",variant:"outlined"}))}}),Object(D.jsx)("div",{className:s.backgroundControl,children:Object(D.jsxs)(v.a,{component:"fieldset",children:[Object(D.jsx)(C.a,{component:"legend",children:"Background"}),Object(D.jsxs)(E.a,{"aria-label":"background",name:"background",value:t.backgroundColor,onChange:function(e){return a({type:"changeBackgroundColor",backgroundColor:e.target.value})},children:[Object(D.jsx)(k.a,{value:"",control:Object(D.jsx)(w.a,{}),label:"Transparent"}),Object(D.jsx)(k.a,{value:"prim",control:Object(D.jsx)(w.a,{}),label:"Primary"}),Object(D.jsx)(k.a,{value:"scnd",control:Object(D.jsx)(w.a,{}),label:"Secondary"}),Object(D.jsx)(k.a,{value:"acnt",control:Object(D.jsx)(w.a,{}),label:"Accent"})]})]})}),Object(D.jsx)(N.a,{children:n.map((function(e,t){var r=t===p?s.shownEditor:s.notShownEditor,n=t!==p;return Object(D.jsxs)(F.a,{className:"".concat(s.listItem," ").concat(r),onClick:function(){u(t)},children:[Object(D.jsx)(I.a,{children:Object(D.jsx)(y.a,{})}),Object(D.jsx)(A.a,{primary:e.sourceId}),Object(D.jsx)("div",{className:s.layerEditor,style:{opacity:n?0:1},children:Object(D.jsx)(P,{brightness:e.styleMap.brightness||100,opacity:e.styleMap.opacity||100,layerIndex:t,dispatch:a})})]},t)}))})]})})},M=a.p+"static/media/splash.d1c8c6b9.png",T=Object(d.a)((function(e){return Object(b.a)({text:{position:"absolute",left:70},outerWrapper:{position:"absolute",top:100,left:100},compWrapper:{width:800,height:500,position:"relative"},noDragActive:{backgroundColor:"green"},dragActive:{border:"1px solid",padding:"10",boxShadow:"5px 10px #88888850",borderRadius:5,borderColor:"#88888850"},img:{width:400,height:330,top:184,left:264,position:"absolute"},dropZone:{height:150,width:245},wrapper:{height:500,position:"absolute",top:90,bottom:90,left:50,width:850,borderRadius:10,borderColor:"#d6d4d4",borderWidth:10,borderStyle:"dashed"}})})),z=function(e,t){switch(t.type){case"changeBackgroundColor":return Object(i.a)(Object(i.a)({},e),{},{backgroundColor:t.backgroundColor});case"changePaletteName":return Object(i.a)(Object(i.a)({},e),{},{palette:Object(g.getPalette)(h,t.paletteName)});case"changeOpacity":var a=Object(i.a)({},e.layers[t.layerIndex]);a.styleMap.opacity=t.value;var r=Object(i.a)({},e);return r.layers[t.layerIndex]=a,r;case"changeBrightness":var n=Object(i.a)({},e.layers[t.layerIndex]);n.styleMap.brightness=t.value;var c=Object(i.a)({},e);return c.layers[t.layerIndex]=n,c;case"changeLayers":return Object(i.a)(Object(i.a)({},e),{},{layers:t.layers});default:throw new Error}},H={backgroundColor:"prim",palette:h.palettes[0],paletteNames:Object(g.getPaletteNames)(h),layers:[]},J=function(e){var t=Object(r.useReducer)(z,H),a=Object(l.a)(t,2),n=a[0],c=a[1],o=Object(g.getHexForLabel)(n.palette,n.backgroundColor),d=T(),b=Object(r.useCallback)((function(e){var t=Object(g.buildStylizableLayers)(e,!0);c({type:"changeLayers",layers:t})}),[]),h=Object(p.a)({noDragEventsBubbling:!0,onDrop:b,accept:"image/*"}),O=h.getRootProps,m=h.isDragActive,x=h.isDragAccept,y=h.isDragReject,f=Object(r.useMemo)((function(){return m?d.dragActive:d.noDragActive}),[m,y,x,d.dragActive,d.noDragActive]),v=O(),C=v.ref,E=Object(s.a)(v,["ref"]);return Object(D.jsx)(u.a,{rootRef:C,children:Object(D.jsxs)(j.a,Object(i.a)(Object(i.a)({},E),{},{elevation:0,children:[Object(D.jsx)("p",{className:d.text,children:"Drag 'n' drop some image files below"}),n.layers.length>0?Object(D.jsx)("div",{className:d.outerWrapper,children:Object(D.jsx)("div",{className:d.compWrapper,children:Object(D.jsx)(g.Composite,{backgroundColor:o,layers:n.layers,layerHeight:500,layerWidth:800,palette:n.palette})})}):Object(D.jsx)("img",{src:M,className:"".concat(d.img," ").concat(f),alt:""}),Object(D.jsx)("div",{className:"".concat(d.wrapper),children:Object(D.jsx)(W,{compositionState:n,dispatch:c})})]}))})},Z=function(){return Object(D.jsx)("div",{className:"App",children:Object(D.jsx)(J,{})})},q=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,160)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,c=t.getLCP,o=t.getTTFB;a(e),r(e),n(e),c(e),o(e)}))};o.a.render(Object(D.jsx)(n.a.StrictMode,{children:Object(D.jsx)(Z,{})}),document.getElementById("root")),q()},89:function(e,t,a){},90:function(e,t,a){}},[[102,1,2]]]);
//# sourceMappingURL=main.7ca87aa5.chunk.js.map