(function(h,o){typeof exports=="object"&&typeof module!="undefined"?module.exports=o():typeof define=="function"&&define.amd?define(o):(h=typeof globalThis!="undefined"?globalThis:h||self,h.ImageResize=o())})(this,function(){"use strict";function h(e=320,i=240,u="#ffffff"){this.el=document.createElement("canvas"),this.ctx=this.el.getContext("2d"),this.el.width=e,this.el.height=i,this.ctx.fillStyle=u,this.ctx.fillRect(0,0,e,i)}function o(e){return new Promise((i,u)=>{if(e){let c=new Image;c.onload=function(n){i(c)},c.onerror=function(n){u(n)},c.setAttribute("crossOrigin","anonymous"),c.src=e}else u(new Error("no src"))})}const b={quality:.75,format:"jpg",outputType:"base64",width:320,height:null,reSample:2,bgColor:"#ffffff",saveExif:!1},y={canvas:null,reSample:2,width:320,height:240,cx:0,cy:0,cw:0,ch:0,dx:0,dy:0,dw:0,dh:0,bgColor:"#ffffff"};function p(e,i,u){return new Promise(c=>{function n(t,r){const l=Math.pow(2,t);let a=new h(e.width*l,e.height*l,e.bgColor);a.ctx.drawImage(r,0,0,r.width*.5,r.height*.5),t>0?n(t-1,a.el):c(a.el)}n(i-1,u)})}function x(e){e=Object.assign({},y,e),e.reSample=Math.min(4,e.reSample),e.reSample=Math.max(0,e.reSample);const i=Math.pow(2,e.reSample);return new Promise(function(u,c){try{const n=new h(e.width*i,e.height*i,e.bgColor);n.ctx.drawImage(e.canvas,e.cx,e.cy,e.cw,e.ch,e.dx*i,e.dy*i,e.dw*i,e.dh*i),e.reSample>0?p(e,e.reSample,n.el).then(u):u(n.el)}catch(n){c(n)}})}function S(e,i="image/jpeg",u=.75){return i=d(i),new Promise(function(c,n){try{const t=e.toDataURL(i,u);c(t)}catch(t){n(t)}})}function C(e,i="image/jpeg",u=.75){return i=d(i),new Promise(function(c,n){try{const t=e.toDataURL(i,u),r=I(t);c(r)}catch(t){n(t)}})}function d(e){let i=null;switch(e){case"jpg":case"jpeg":i="image/jpeg";break;case"png":i="image/png";break;default:i=e;break}return i}function I(e){const i=atob(e.split(",")[1]),u=e.split(",")[0].split(":")[1].split(";")[0],c=new ArrayBuffer(i.length);let n=new Uint8Array(c);for(let l=0;l<i.length;l++)n[l]=i.charCodeAt(l);const t=new DataView(c);return new Blob([t],{type:u})}function g(e={}){this.options=i(b,e);function i(n={},t={}){let r={};return Object.keys(n).forEach(function(l){r[l]=t[l]||n[l]}),r.width=Number(r.width),r.height=Number(r.height),r.quality=Number(r.quality),r.reSample=Number(r.reSample),r}function u(n,t){let r=null;return new Promise(function(l,a){o(n).then(function(f){r=new h(f.width,f.height,t.bgColor),r.ctx.drawImage(f,0,0),l(r.el)},function(f){a(f)})})}function c(n,t){let r=null;return new Promise(function(l,a){function f(w){a(w)}const m=new FileReader;m.onload=function(w){const s=new Image;s.onload=function(){r=new h(s.width,s.height,t.bgColor),r.ctx.drawImage(s,0,0),l(r.el)},s.onerror=f,s.src=w.target.result},m.onerror=f,m.readAsDataURL(n.files[0])})}this.play=function(n){return new Promise((t,r)=>{this.get(n).then(l=>this.resize(l)).then(l=>this.output(l)).then(l=>t(l)).catch(l=>r(l))})},this.get=function(n,t=null){return t=t?i(this.options,t):this.options,new Promise((r,l)=>{typeof n=="string"?r(u(n,t)):typeof n=="object"?r(c(n,t)):l(new Error("Not found source"))})},this.resize=function(n,t=null){return t=t?i(this.options,t):this.options,new Promise((r,l)=>{let a=P(n.width,n.height,t.width,t.height);x({canvas:n,reSample:t.reSample,width:a.width,height:a.height,cx:0,cy:0,cw:n.width,ch:n.height,dx:0,dy:0,dw:a.width,dh:a.height,bgColor:t.bgColor}).then(r).catch(l)})},this.output=function(n,t=null){return t=t?i(this.options,t):this.options,new Promise((r,l)=>{switch(t.outputType){case"base64":S(n,t.format,t.quality).then(r).catch(l);break;case"blob":C(n,t.format,t.quality).then(r).catch(l);break;case"canvas":default:r(n);break}})},this.updateOptions=function(n){return this.options=i(this.options,n),this}}function P(e,i,u,c){let n=e,t=i;return u&&c&&(u>c?c=null:u=null),u?(n=u,t=i*(u/e)):c&&(n=e*(c/i),t=c),{width:parseInt(n),height:parseInt(t)}}return module.export=g,g});
