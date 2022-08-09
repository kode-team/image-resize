const b=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}};b();const y={quality:.75,format:"jpg",outputType:"base64",width:320,height:null,reSample:2,bgColor:"#ffffff"};function u(r=320,e=240,t="#ffffff"){this.el=document.createElement("canvas"),this.ctx=this.el.getContext("2d"),this.el.width=r,this.el.height=e,this.ctx.fillStyle=t,this.ctx.fillRect(0,0,r,e)}const p={canvas:null,reSample:2,width:320,height:240,cx:0,cy:0,cw:0,ch:0,dx:0,dy:0,dw:0,dh:0,bgColor:"#ffffff"};function S(r,e,t){return new Promise(n=>{function a(i,l){const c=Math.pow(2,i);let f=new u(r.width*c,r.height*c,r.bgColor);f.ctx.drawImage(l,0,0,l.width*.5,l.height*.5),i>0?a(i-1,f.el):n(f.el)}a(e-1,t)})}function x(r){r=Object.assign({},p,r),r.reSample=Math.min(4,r.reSample),r.reSample=Math.max(0,r.reSample);const e=Math.pow(2,r.reSample);return new Promise(function(t,n){try{const a=new u(r.width*e,r.height*e,r.bgColor);a.ctx.drawImage(r.canvas,r.cx,r.cy,r.cw,r.ch,r.dx*e,r.dy*e,r.dw*e,r.dh*e),r.reSample>0?S(r,r.reSample,a.el).then(t):t(a.el)}catch(a){n(a)}})}function C(r,e="image/jpeg",t=.75){return e=m(e),new Promise(function(n,a){try{const i=r.toDataURL(e,t);n(i)}catch(i){a(i)}})}function R(r,e="image/jpeg",t=.75){return e=m(e),new Promise(function(n,a){try{const i=r.toDataURL(e,t),l=z(i);n(l)}catch(i){a(i)}})}function m(r){let e;switch(r){case"jpg":case"jpeg":e="image/jpeg";break;case"png":e="image/png";break;case"webp":e="image/webp";break;default:e=r;break}return e}function z(r){const e=atob(r.split(",")[1]),t=r.split(",")[0].split(":")[1].split(";")[0],n=new ArrayBuffer(e.length);let a=new Uint8Array(n);for(let c=0;c<e.length;c++)a[c]=e.charCodeAt(c);const i=new DataView(n);return new Blob([i],{type:t})}function I(r){return new Promise((e,t)=>{const n=new FileReader;n.onload=a=>{var i;return e((i=a.target)==null?void 0:i.result)},n.onerror=t,n.readAsDataURL(r)})}function w(r){return new Promise((e,t)=>{const n=new Image;n.onload=()=>e(n),n.onerror=t,n.src=r,n.crossOrigin="anonymous",n.alt=""})}function s(r={},e={}){let t={};return Object.keys(r).forEach(n=>{t[n]=e[n]||r[n]}),t.width=Number(t.width),t.height=Number(t.height),t.quality=Number(t.quality),t.reSample=Number(t.reSample),t}async function L(r,e){let t;const n=await w(r);return t=new u(n.width,n.height,e.bgColor),t.ctx.drawImage(n,0,0),t.el}async function h(r,e){const t=await I(r),n=await w(t);let a=new u(n.width,n.height,e.bgColor);return a.ctx.drawImage(n,0,0),a.el}function N(r,e,t,n){let a=r,i=e;return t&&n&&(t>n?n=void 0:t=void 0),t?(a=t,i=e*(t/r)):n&&(a=r*(n/e),i=n),{width:Number(a),height:Number(i)}}class O{constructor(e={}){this.options=s(y,e)}async play(e){let t=await this.get(e);return t=await this.resize(t),t=await this.resize(t),t=await this.output(t),t}async get(e,t=void 0){var n;if(t=t?s(this.options,t):this.options,typeof e=="string")return await L(e,t);if(e instanceof File||e instanceof Blob)return await h(e,t);if(((n=e.tagName)==null?void 0:n.toLowerCase())==="input"&&e.type==="file")return await h(e.files[0],t);throw new Error("Not found source")}async resize(e,t=void 0){t=t?s(this.options,t):this.options;let n=N(e.width,e.height,t.width,t.height);return await x({canvas:e,reSample:t.reSample,width:n.width,height:n.height,cx:0,cy:0,cw:e.width,ch:e.height,dx:0,dy:0,dw:n.width,dh:n.height,bgColor:t.bgColor})}async output(e,t=void 0){switch(t=t?s(this.options,t):this.options,t.outputType){case"base64":return await C(e,t.format,t.quality);case"blob":return await R(e,t.format,t.quality);case"canvas":default:return e}}updateOptions(e){return this.options=s(this.options,e),this}}const g=new O,E=document.getElementById("form"),d=document.getElementById("result"),o=new Proxy({},{get:(r,e)=>r[e],set:(r,e,t)=>{switch(e){case"width":case"height":case"quality":case"reSample":t=Number(t);break}return r[e]=t,!0}});async function q(r){r.preventDefault();const e=r.target,t=e.querySelectorAll("[name]");for(const a of t)o[a.name]=a.value;let n;if(o.upload)n=e.querySelector("[name=upload]"),n=n.files[0],n=new Blob([n],{type:n.type});else if(o.url)n=o.url;else return alert("not found source"),!1;d.innerHTML="";try{let a=await g.updateOptions(o).play(n);P(a)}catch(a){j(a)}}function P(r){switch(g.options.outputType){case"base64":const e=new Image;e.src=r,d.appendChild(e);break;case"canvas":d.appendChild(r);break;case"blob":default:console.log("RESULT:",r);break}}function j(r){console.error("ERROR EVENT",r),alert(`Error resize: ${r.message}`)}E.addEventListener("submit",q);
