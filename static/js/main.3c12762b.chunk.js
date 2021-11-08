(this["webpackJsonppixel-to-svg"]=this["webpackJsonppixel-to-svg"]||[]).push([[0],{19:function(e,t,c){"use strict";c.r(t);var n=c(2),a=c.n(n),i=c(10),r=c.n(i),s=(c(9),c(6)),o=c(5),h=c(3),l=c(11),d=c.n(l),j=c(1),u=c(0);function b(e){var t=e.data,c=e.dimensions;return Object(u.jsxs)("svg",{className:"svg",viewBox:"0 0 ".concat(c.width," ").concat(c.height),children:[Object(u.jsx)(O,Object(s.a)({},c)),Object(j.map)(t,(function(e,t){return Object(u.jsx)("path",{fill:t,d:e.path},t)}))]})}function O(e){var t=e.height,c=e.width,n=c/100;return Object(u.jsxs)("svg",{x:"0",y:"0",height:"100%",width:"100%",viewBox:"0 0 ".concat(c," ").concat(t),children:[Object(u.jsx)("defs",{children:Object(u.jsxs)("pattern",{id:"alpha-bg",x:"0",y:"0",width:2*n,height:2*n,patternUnits:"userSpaceOnUse",patternContentUnits:"userSpaceOnUse",children:[Object(u.jsx)("rect",{width:n,height:n,fill:"#eee",x:"0",y:"0"}),Object(u.jsx)("rect",{width:n,height:n,fill:"#eee",x:n,y:n})]})}),Object(u.jsx)("rect",{fill:"url(#alpha-bg)",width:"100%",height:"100%"})]})}function g(e){var t=e.data,c=void 0===t?[]:t,n=e.scanlineIndex,a=Object(j.chunk)(c,4),i=[];return Object(j.forEach)(a,(function(e,t){var c=Object(h.a)(e,4),a=c[0],r=c[1],s=c[2],o=c[3];o>0&&i.push({r:a,g:r,b:s,a:o/255,x:t,y:n,width:1,height:1})})),i}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=Object(j.orderBy)(e,["x","y"],["asc","asc"]),c="";return Object(j.forEach)(t,(function(e,t){var n=e.x,a=e.y,i=e.width,r=e.height,s="M".concat(n,",").concat(a," l").concat(i,",0 l0,").concat(r," l").concat(-i,",0Z");c+=s})),c}function x(){var e=Object(n.useState)(!1),t=Object(h.a)(e,2),c=t[0],a=t[1],i=Object(n.useState)(!1),r=Object(h.a)(i,2),l=r[0],O=r[1],x=Object(n.useState)(null),v=Object(h.a)(x,2),p=v[0],m=v[1],w=Object(n.useState)({width:1,height:1}),y=Object(h.a)(w,2),S=y[0],N=y[1],C=function(){return m(null)},I=Object(n.useRef)(null);Object(n.useEffect)((function(){if(I.current){var e=S.width,t=S.height;O(!!(c&&e<3&&t<3))}}),[I.current,S,c]);var P=!!I.current&&c&&!l;return Object(u.jsxs)("div",{className:"container",children:[Object(u.jsx)("h1",{children:"Pixel to SVG"}),Object(u.jsx)("p",{children:"A tool for converting simple sprite sheets and pixel art to SVG."}),Object(u.jsxs)("form",{className:"form",onSubmit:function(e){var t,c;e.preventDefault(),C(),t=I.current,c=m,t&&function(){for(var e=t.width,n=t.height,a=t.getContext("2d"),i=0,r={};i<n;){var s=a.getImageData(0,i,e,1),h=g({data:null===s||void 0===s?void 0:s.data,scanlineIndex:i}),l=Object(j.groupBy)(h,(function(e){var t=e.r,c=e.g,n=e.b,a=e.a;return"rgba(".concat(t,", ").concat(c,", ").concat(n,", ").concat(a,")")}));Object(j.forEach)(l,(function(e,t){r[t]?(r[t].pixels=[r[t].pixels].concat(Object(o.a)(e)),r[t].path=r[t].path+f(e)):r[t]={pixels:e,path:f(e)}})),c(r),i+=1}}()},children:[Object(u.jsx)("label",{className:"label",children:"Upload an image (PNG recommended)"}),Object(u.jsx)("input",{className:"input",onChange:function(e){C(),O(!1);var t=e.target.files[0],c=new FileReader;c.onload=function(e){var t=new Image;t.onload=function(){var e;N({width:(e=t).width,height:e.height}),I.current.getContext("2d").drawImage(e,0,0,e.width,e.height)},t.src=e.target.result},t?(a(!0),c.readAsDataURL(t)):a(!1)},type:"file"}),Object(u.jsx)("div",{className:d()("feedback",{"feedback--invalid":l}),children:"An error has occurred. Please ensure file is a valid PNG image and try again."}),Object(u.jsx)("div",{className:"label",children:"Image Preview:"}),Object(u.jsx)("canvas",Object(s.a)(Object(s.a)({className:"canvas"},S),{},{ref:I})),Object(u.jsx)("button",{disabled:!P,type:"submit",children:"Convert to SVG"})]}),Object(u.jsx)("h2",{children:"SVG Output"}),Object(u.jsx)(b,{data:p,dimensions:S})]})}var v=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,20)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;c(e),n(e),a(e),i(e),r(e)}))};r.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(x,{})}),document.getElementById("root")),v()},9:function(e,t,c){}},[[19,1,2]]]);
//# sourceMappingURL=main.3c12762b.chunk.js.map