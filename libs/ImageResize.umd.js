(function(h,o){typeof exports=="object"&&typeof module!="undefined"?module.exports=o():typeof define=="function"&&define.amd?define(o):(h=typeof globalThis!="undefined"?globalThis:h||self,h.ImageResize=o())})(this,function(){"use strict";function h(e=320,i=240,a="#ffffff"){this.el=document.createElement("canvas"),this.ctx=this.el.getContext("2d"),this.el.width=e,this.el.height=i,this.ctx.fillStyle=a,this.ctx.fillRect(0,0,e,i)}function o(e){return new Promise((i,a)=>{if(e){let c=new Image;c.onload=function(n){i(c)},c.onerror=function(n){a(n)},c.setAttribute("crossOrigin","anonymous"),c.src=e}else a(new Error("no src"))})}const g={quality:.75,format:"jpg",outputType:"base64",width:320,height:null,reSample:2,bgColor:"#ffffff",saveExif:!1},b={canvas:null,reSample:2,width:320,height:240,cx:0,cy:0,cw:0,ch:0,dx:0,dy:0,dw:0,dh:0,bgColor:"#ffffff"};function y(e,i,a){return new Promise(c=>{function n(t,r){const l=Math.pow(2,t);let u=new h(e.width*l,e.height*l,e.bgColor);u.ctx.drawImage(r,0,0,r.width*.5,r.height*.5),t>0?n(t-1,u.el):c(u.el)}n(i-1,a)})}function p(e){e=Object.assign({},b,e),e.reSample=Math.min(4,e.reSample),e.reSample=Math.max(0,e.reSample);const i=Math.pow(2,e.reSample);return new Promise(function(a,c){try{const n=new h(e.width*i,e.height*i,e.bgColor);n.ctx.drawImage(e.canvas,e.cx,e.cy,e.cw,e.ch,e.dx*i,e.dy*i,e.dw*i,e.dh*i),e.reSample>0?y(e,e.reSample,n.el).then(a):a(n.el)}catch(n){c(n)}})}function x(e,i="image/jpeg",a=.75){return i=d(i),new Promise(function(c,n){try{const t=e.toDataURL(i,a);c(t)}catch(t){n(t)}})}function S(e,i="image/jpeg",a=.75){return i=d(i),new Promise(function(c,n){try{const t=e.toDataURL(i,a),r=C(t);c(r)}catch(t){n(t)}})}function d(e){let i=null;switch(e){case"jpg":case"jpeg":i="image/jpeg";break;case"png":i="image/png";break;default:i=e;break}return i}function C(e){const i=atob(e.split(",")[1]),a=e.split(",")[0].split(":")[1].split(";")[0],c=new ArrayBuffer(i.length);let n=new Uint8Array(c);for(let l=0;l<i.length;l++)n[l]=i.charCodeAt(l);const t=new DataView(c);return new Blob([t],{type:a})}function I(e={}){this.options=i(g,e);function i(n={},t={}){let r={};return Object.keys(n).forEach(function(l){r[l]=t[l]||n[l]}),r.width=Number(r.width),r.height=Number(r.height),r.quality=Number(r.quality),r.reSample=Number(r.reSample),r}function a(n,t){let r=null;return new Promise(function(l,u){o(n).then(function(f){r=new h(f.width,f.height,t.bgColor),r.ctx.drawImage(f,0,0),l(r.el)},function(f){u(f)})})}function c(n,t){let r=null;return new Promise(function(l,u){function f(m){u(m)}const w=new FileReader;w.onload=function(m){const s=new Image;s.onload=function(){r=new h(s.width,s.height,t.bgColor),r.ctx.drawImage(s,0,0),l(r.el)},s.onerror=f,s.src=m.target.result},w.onerror=f,w.readAsDataURL(n.files[0])})}this.play=function(n){return new Promise((t,r)=>{this.get(n).then(l=>this.resize(l)).then(l=>this.output(l)).then(l=>t(l)).catch(l=>r(l))})},this.get=function(n,t=null){return t=t?i(this.options,t):this.options,new Promise((r,l)=>{typeof n=="string"?r(a(n,t)):typeof n=="object"?r(c(n,t)):l(new Error("Not found source"))})},this.resize=function(n,t=null){return t=t?i(this.options,t):this.options,new Promise((r,l)=>{let u=P(n.width,n.height,t.width,t.height);p({canvas:n,reSample:t.reSample,width:u.width,height:u.height,cx:0,cy:0,cw:n.width,ch:n.height,dx:0,dy:0,dw:u.width,dh:u.height,bgColor:t.bgColor}).then(r).catch(l)})},this.output=function(n,t=null){return t=t?i(this.options,t):this.options,new Promise((r,l)=>{switch(t.outputType){case"base64":x(n,t.format,t.quality).then(r).catch(l);break;case"blob":S(n,t.format,t.quality).then(r).catch(l);break;case"canvas":default:r(n);break}})},this.updateOptions=function(n){return this.options=i(this.options,n),this}}function P(e,i,a,c){let n=e,t=i;return a&&c&&(a>c?c=null:a=null),a?(n=a,t=i*(a/e)):c&&(n=e*(c/i),t=c),{width:parseInt(n),height:parseInt(t)}}return I});
