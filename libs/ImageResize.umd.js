(function(f,l){typeof exports=="object"&&typeof module!="undefined"?module.exports=l():typeof define=="function"&&define.amd?define(l):(f=typeof globalThis!="undefined"?globalThis:f||self,f.ImageResize=l())})(this,function(){"use strict";var f={quality:.75,format:"jpg",outputType:"base64",width:320,height:null,reSample:2,bgColor:"#ffffff"};function l(a=320,t=240,e="#ffffff"){this.el=document.createElement("canvas"),this.ctx=this.el.getContext("2d"),this.el.width=a,this.el.height=t,this.ctx.fillStyle=e,this.ctx.fillRect(0,0,a,t)}const m={canvas:null,reSample:2,width:320,height:240,cx:0,cy:0,cw:0,ch:0,dx:0,dy:0,dw:0,dh:0,bgColor:"#ffffff"};function g(a,t,e){return new Promise(i=>{function n(r,c){const u=Math.pow(2,r);let s=new l(a.width*u,a.height*u,a.bgColor);s.ctx.drawImage(c,0,0,c.width*.5,c.height*.5),r>0?n(r-1,s.el):i(s.el)}n(t-1,e)})}function b(a){a=Object.assign({},m,a),a.reSample=Math.min(4,a.reSample),a.reSample=Math.max(0,a.reSample);const t=Math.pow(2,a.reSample);return new Promise(function(e,i){try{const n=new l(a.width*t,a.height*t,a.bgColor);n.ctx.drawImage(a.canvas,a.cx,a.cy,a.cw,a.ch,a.dx*t,a.dy*t,a.dw*t,a.dh*t),a.reSample>0?g(a,a.reSample,n.el).then(e):e(n.el)}catch(n){i(n)}})}function y(a,t="image/jpeg",e=.75){return t=w(t),new Promise(function(i,n){try{const r=a.toDataURL(t,e);i(r)}catch(r){n(r)}})}function S(a,t="image/jpeg",e=.75){return t=w(t),new Promise(function(i,n){try{const r=a.toDataURL(t,e),c=p(r);i(c)}catch(r){n(r)}})}function w(a){let t;switch(a){case"jpg":case"jpeg":t="image/jpeg";break;case"png":t="image/png";break;default:t=a;break}return t}function p(a){const t=atob(a.split(",")[1]),e=a.split(",")[0].split(":")[1].split(";")[0],i=new ArrayBuffer(t.length);let n=new Uint8Array(i);for(let u=0;u<t.length;u++)n[u]=t.charCodeAt(u);const r=new DataView(i);return new Blob([r],{type:e})}function x(a){return new Promise((t,e)=>{const i=new FileReader;i.onload=n=>{var r;return t((r=n.target)==null?void 0:r.result)},i.onerror=e,i.readAsDataURL(a)})}function d(a){return new Promise((t,e)=>{const i=new Image;i.onload=()=>t(i),i.onerror=e,i.src=a,i.crossOrigin="anonymous",i.alt=""})}function h(a={},t={}){let e={};return Object.keys(a).forEach(i=>{e[i]=t[i]||a[i]}),e.width=Number(e.width),e.height=Number(e.height),e.quality=Number(e.quality),e.reSample=Number(e.reSample),e}async function C(a,t){let e;const i=await d(a);return e=new l(i.width,i.height,t.bgColor),e.ctx.drawImage(i,0,0),e.el}async function o(a,t){const e=await x(a),i=await d(e);let n=new l(i.width,i.height,t.bgColor);return n.ctx.drawImage(i,0,0),n.el}function z(a,t,e,i){let n=a,r=t;return e&&i&&(e>i?i=void 0:e=void 0),e?(n=e,r=t*(e/a)):i&&(n=a*(i/t),r=i),{width:Number(n),height:Number(r)}}class j{constructor(t={}){this.options=h(f,t)}async play(t){let e=await this.get(t);return e=await this.resize(e),e=await this.resize(e),e=await this.output(e),e}async get(t,e=void 0){var i;if(e=e?h(this.options,e):this.options,typeof t=="string")return await C(t,e);if(t instanceof File||t instanceof Blob)return await o(t,e);if(((i=t.tagName)==null?void 0:i.toLowerCase())==="input"&&t.type==="file")return await o(t.files[0],e);throw new Error("Not found source")}async resize(t,e=void 0){e=e?h(this.options,e):this.options;let i=z(t.width,t.height,e.width,e.height);return await b({canvas:t,reSample:e.reSample,width:i.width,height:i.height,cx:0,cy:0,cw:t.width,ch:t.height,dx:0,dy:0,dw:i.width,dh:i.height,bgColor:e.bgColor})}async output(t,e=void 0){switch(e=e?h(this.options,e):this.options,e.outputType){case"base64":return await y(t,e.format,e.quality);case"blob":return await S(t,e.format,e.quality);case"canvas":default:return t}}updateOptions(t){return this.options=h(this.options,t),this}}return j});
