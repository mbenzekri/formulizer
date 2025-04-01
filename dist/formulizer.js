/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4=t=>(e,o)=>{ void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$8=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$6=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$8&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$6.set(s,t));}return t}toString(){return this.cssText}};const r$7=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$5=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$8)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$3=e$8?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$7(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$4,defineProperty:e$7,getOwnPropertyDescriptor:r$6,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$1=globalThis,c$2=a$1.trustedTypes,l$1=c$2?c$2.emptyScript:"",p$2=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$3={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$4(t,s),y$1={attribute:true,type:String,converter:u$3,reflect:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=false),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$7(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$6(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$5(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$3(s));}else void 0!==s&&i.push(c$3(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$3).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$3;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),true===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t) true!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=false,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$2?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$4={attribute:true,type:String,converter:u$3,reflect:false,hasChanged:f$1},r$5=(t=o$4,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n$2(t){return (e,o)=>"object"==typeof o?r$5(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:true}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r$4(r){return n$2({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$6=(e,t,c)=>(c.configurable=true,c.enumerable=true,c);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e$5(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;return e$6(n,s,{get(){return o(this)}})}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let e$4;function r$3(r){return (n,o)=>e$6(n,o,{get(){return (this.renderRoot??(e$4??=document.createDocumentFragment())).querySelectorAll(r)}})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$3=t$2.trustedTypes,s$1=i$3?i$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$3="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$3="?"+h,n$1=`<${o$3}>`,r$2=document,l=()=>r$2.createComment(""),c$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u$2=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v$1=/-->/g,_=/>/g,m$1=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p$1=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v$1:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m$1):void 0!==u[3]&&(c=m$1):c===m$1?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m$1:'"'===u[3]?g:p$1):c===g||c===p$1?c=m$1:c===v$1||c===_?c=f:(c=m$1,r=void 0);const x=c===m$1&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e$3+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$3)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$3?i$3.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$3)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c$1(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}let M$1 = class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}};class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c$1(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u$2(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c$1(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M$1(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c$1(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c$1(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const Z={I:R},j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.2.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let r$1 = class r extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}};r$1._$litElement$=true,r$1["finalized"]=true,globalThis.litElementHydrateSupport?.({LitElement:r$1});const i$2=globalThis.litElementPolyfillSupport;i$2?.({LitElement:r$1});(globalThis.litElementVersions??=[]).push("4.1.1");

function notNull(value) {
    return value != null;
}
function isNull(value) {
    return value == null;
}
function isString(value, and_notempty = false) {
    if (typeof value !== "string")
        return false;
    if (and_notempty)
        value.length > 0;
    return true;
}
function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
}
function isBoolean(value) {
    return typeof value === "boolean";
}
function isObject(value, and_notempty = false) {
    if (value == null || typeof value !== "object" || Array.isArray(value))
        return false;
    if (and_notempty)
        Object.values(value).some(v => v !== undefined);
    return true;
}
function isArray(value, and_notempty = false) {
    if (!Array.isArray(value))
        return false;
    if (and_notempty)
        return value.length > 0;
    return true;
}
function isFunction(value) {
    return typeof value === "function";
}
const primitiveornulltypes = new Set(['string', 'integer', 'number', 'boolean', 'null']);
function isPrimitive(value, ornull) {
    if (isObject(value) && value.target.every(t => primitiveornulltypes.has(t)))
        return true;
    if (typeof value == "string" && primitiveornulltypes.has(value))
        return true;
    return false;
}
function when(test, value) {
    if (!!test)
        return value;
    return '';
}
function intersect(sets) {
    return sets.reduce((acc, set) => new Set([...acc].filter(x => set.has(x))), sets[0]);
}
function complement(set, full) {
    if (set == null)
        return new Set();
    return new Set([...full].filter(x => !set.has(x)));
}
function union(sets) {
    return sets.reduce((acc, set) => new Set([...acc, ...set]), new Set());
}
/**
 * get the data corresponding to a jsonpointer (absolute or relative)
 * @param root root data for absolute pointer
 * @param parent current data for relative pointer
 * @param pointer pointer to dereference
 * @returns
 */
function derefPointerData(root, parent, key, pointer) {
    const tokens = pointer.split(/\//);
    const relative = /^\d+$/.test(tokens[0]);
    let base = relative ? parent : root;
    if (relative) {
        const count = parseInt(tokens[0]);
        if (count === 0) {
            base = base[key];
        }
        else {
            for (let i = 1; i < count; i++)
                base = getParent(base);
        }
        if (!base) {
            console.error(`enable to dereference pointer ${pointer} (no more parents)`);
            return null;
        }
    }
    tokens.shift();
    for (const token of tokens) {
        if (base == null || !["array", "object"].includes(typeof base))
            return undefined;
        const key = /^\d+$/.test(token) ? parseInt(token) : token;
        base = base[key];
    }
    return base;
}
function pointerSchema(parent, property, prev = "") {
    if (!parent)
        return (property ? property : "");
    if (!property)
        return "";
    const root = parent.root;
    prev = property + ((prev === "") ? "" : "/" + prev);
    if (root == parent)
        return "/" + prev;
    return pointerSchema(parent.parent, prev);
}
const SCHEMASYM = Symbol("FZ_FORM_SCHEMA");
const PARENTSYM = Symbol("FZ_FORM_PARENT");
const ROOTSYM = Symbol("FZ_FORM_ROOT");
function setHiddenProperty(data, property, value) {
    if (data && typeof data === "object" && value) {
        Object.defineProperty(data, property, {
            enumerable: false,
            value: value,
            writable: true,
        });
    }
    return data;
}
function newValue(value, parent, schema) {
    setSchema(value, schema);
    setParent(value, parent);
    setRoot(value, getRoot(parent));
    return value;
}
function setSchema(data, schema) {
    return setHiddenProperty(data, SCHEMASYM, schema);
}
function getSchema(data) {
    return data?.[SCHEMASYM];
}
function setParent(data, parent) {
    return setHiddenProperty(data, PARENTSYM, parent);
}
function getParent(data) {
    return data[PARENTSYM];
}
function setRoot(data, root) {
    return setHiddenProperty(data, ROOTSYM, root);
}
function getRoot(data) {
    return data[ROOTSYM];
}
/**
    * stringify method to remove circular references in JSON object
    * @param key key of the attribute to find
    * @param value value of the attribute to replace
    *
*/
function getCircularReplacer(key, value) {
    if (key === 'root')
        return undefined;
    if (key === 'parent')
        return undefined;
    return value;
}
function isEmptyValue(value) {
    if (value === undefined)
        return true;
    if (value === null)
        return true;
    if (value === "")
        return true;
    if (typeof value === 'object')
        return Object.keys(value).every(key => value[key] === undefined);
    if (Array.isArray(value))
        return value.length === 0;
    return false;
}
window.nvl = function nvl(templates, ...values) {
    const cleaned = values.map(v => v ?? '');
    return String.raw(templates, cleaned);
};

const BOOTSTRAP_URL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
const ICONS_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
const WOFF_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/fonts/bootstrap-icons.woff2?1fa40e8900654d2863d011707b9fb6f2";
class Base extends r$1 {
    static loaded = false;
    static sheets = [];
    static styles = [
        i$5 `:host {
                font-family: Arial, sans-serif;
            }
            .space-before {
                padding-top:10px; 
            }
            .space-after {
                padding-bottom:5px
            }
            .line-after {
                border-bottom: 1px solid gray;
            }
            .line-before {
                border-top: 1px solid gray;
            }
            .invalid {
                border: 1px solid rgba(220,53,69) !important;
            }
            .invalid:focus, input:out-of-range:focus {
                box-shadow:0 0 0 .25rem rgba(220,53,69,.25);
                border: 1px solid red !important;
            }
            .valid {
                border: 1px solid rgba(25,135,84) !important;
            }
            .valid:focus {
                box-shadow:0 0 0 .25rem rgba(25,135,84,.25) !important;
                border: 1px solid green !important;
            }
            .error-message {
                margin:0;
                text-align: right;
                font-size:small;
                font-style: italic;
                color: rgba(220,53,69);
                float: right;
            }
            .error-truncated {
                white-space: nowrap;
                overflow:hidden !important;
                text-overflow: ellipsis;
            } 
        `
    ];
    handlers = [];
    badge(value) {
        return x `<span class="badge bg-primary badge-pill">${value}</span>`;
    }
    firstUpdated(_changedProperties) {
        this.adoptBootStrap();
        super.firstUpdated(_changedProperties);
    }
    listen(target, event, handler, options) {
        const i = this.handlers.findIndex(item => item.target === target && item.event === event && item.handler === handler);
        if (i < 0) {
            this.handlers.push({ target, event, handler });
            target.addEventListener(event, handler, options);
        }
    }
    unlisten(target, event, handler, options) {
        const i = this.handlers.findIndex(item => item.target === target && item.event === event && item.handler === handler);
        if (i >= 0) {
            this.handlers.splice(i, 1);
            target.removeEventListener(event, handler, options);
        }
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        for (const item of this.handlers) {
            item.target.removeEventListener(item.event, item.handler);
        }
        this.handlers = [];
    }
    /**
     * preventDefault and stopPropagation on event (helper)
     */
    eventStop(event) {
        if (!event)
            return;
        event.preventDefault();
        event.stopPropagation();
    }
    // ------------------------------------------------------------------
    // user API to load external Bootstrap and Bootstap Icons (mandatory)
    // ------------------------------------------------------------------
    static async loadBootstrap(bootstrap_url = BOOTSTRAP_URL, icons_url = ICONS_URL, woff_url = WOFF_URL) {
        if (Base.isBootStrapLoaded())
            return;
        const logger = FzLogger.get("lazy");
        logger.info(">>> registerBootstrap()");
        let bootstrap_sheet;
        if (isString(bootstrap_url)) {
            logger.info("Bootstrap CSS to be load from url: %s ", bootstrap_url);
            const bootstrapcss_text = await fetch(bootstrap_url)
                .then(resp => resp.ok ? resp.text() : (console.error(`unable to load bootstrap css: ${String(resp.statusText)}`), ""))
                .catch(e => (console.error(`unable to load boootstrap css: ${String(e)}`), ''));
            bootstrap_sheet = new CSSStyleSheet();
            bootstrap_sheet.replaceSync(bootstrapcss_text.replaceAll(':root', ':host, :root'));
            logger.info("Bootstrap CSS loaded");
        }
        else {
            logger.info("Bootstrap CSS provided by user");
            bootstrap_sheet = bootstrap_url;
        }
        let icons_sheet;
        if (isString(icons_url)) {
            logger.info("Bootstrap icons CSS to be load from url: %s ", bootstrap_url);
            const iconscss_text = await fetch(icons_url)
                .then(resp => resp.ok ? resp.text() : (console.error(`unable to load boootstrap css: ${String(resp.statusText)}`), ""))
                .catch(e => (console.error(`unable to load icons css: ${String(e)}`), ''));
            icons_sheet = new CSSStyleSheet();
            icons_sheet.replaceSync(iconscss_text.replaceAll(':root', ':host, :root'));
            logger.info("Bootstrap icons CSS loaded");
        }
        else {
            logger.info("Bootstrap icons CSS provided by user");
            icons_sheet = icons_url;
        }
        let font_face;
        if (isString(woff_url)) {
            logger.info("Bootstrap icons fonts to be load from url: %s ", bootstrap_url);
            font_face = new FontFace("bootstrap-icons", `url("${woff_url}")`);
        }
        else {
            logger.info("Bootstrap icons fonts provided by user");
            font_face = woff_url;
        }
        const loaded = await font_face.load();
        document.fonts.add(loaded);
        logger.info("Bootstrap fonts loaded");
        Base.sheets = [bootstrap_sheet, icons_sheet];
        //await new Promise((resolve,_) => setTimeout(() => resolve(null),10000))
        Base.loaded = true;
        // bootstrap loading is async FzForm already inserted in dom must adopt and refresh
        for (const item of document.getElementsByTagName("fz-form")) {
            logger.info("Adopting bootstrap to fz-form Element");
            item.adoptBootStrap();
        }
        logger.info("<<< registerBootstrap()");
    }
    static isBootStrapLoaded() {
        return Base.loaded;
    }
    /**
     * called in firstUpdated to adopt Bootstrap style
     * called also in all FzForm element found in document because loading may
     * arrive later due to async
     */
    adoptBootStrap() {
        Base.sheets
            .filter(sheet => !this.shadowRoot?.adoptedStyleSheets.includes(sheet))
            .forEach(sheet => this.shadowRoot?.adoptedStyleSheets.push(sheet));
        this.requestUpdate();
    }
    /**
     * find in the ancestors of an element a webcomponent matching a given selector
     *  IMPORTANT: traverse Shadow DOM
     * @param selector selector to matching the searched element
     * @param el element from which to start searching
     * @returns Element corresponding to selector, null otherwise
     */
    queryClosest(selector, item = this) {
        if (item instanceof Element) {
            const elem = item.assignedSlot ?? item;
            const found = elem.closest(selector);
            const parent = elem.getRootNode().host;
            return found ?? this.queryClosest(selector, parent);
        }
        return null;
    }
}

const SchemaAnnotation = ["parent", "root",];
class JSONSchemaDraft07 {
    $id;
    $schema;
    $ref;
    $comment;
    type;
    enum;
    const;
    multipleOf;
    maximum;
    exclusiveMaximum;
    minimum;
    exclusiveMinimum;
    maxLength;
    minLength;
    pattern;
    items; //  | Schema[];                      // tuple case NOT IMPLEMENTED : TO BE FIXED LATER
    additionalItems;
    maxItems;
    minItems;
    uniqueItems;
    contains;
    maxProperties;
    minProperties;
    required;
    properties;
    patternProperties; // IGNORED by FzForm (except for validation)
    additionalProperties; // IGNORED by FzForm (except for validation)
    dependencies;
    propertyNames;
    if;
    then;
    else;
    allOf;
    anyOf;
    oneOf;
    not;
    definitions;
    title;
    description;
    default;
    examples;
    format;
    // Fz Annotations
    root;
    parent;
    basetype;
    empty;
    pointer;
    nullAllowed;
    transient;
    trackers;
    target;
    enumFetch;
    isenum;
    filter;
    isenumarray;
    homogeneous;
    requiredIf;
    field;
    from;
    order;
    abstract;
    case;
    visible;
    readonly;
    collapsed;
    rank;
    expression;
    change;
    nullable;
    assets;
    preview;
    mimetype;
    mask;
    tab;
    group;
}
const FZ_FORMATS = ["color", "signature", "password", "doc", "uuid", "geo", "markdown", "asset", "date", "time", "date-time", "email", "barcode"];
const FZ_KEYWORDS = [
    "root",
    "parent",
    "basetype",
    "pointer",
    "nullAllowed",
    "transient",
    "trackers",
    "target",
    "enumFetch",
    "isenum",
    "filter",
    "isenumarray",
    "homogeneous",
    "requiredIf",
    "field",
    "from",
    "order",
    "abstract",
    "case",
    "visible",
    "readonly",
    "collapsed",
    "rank",
    "expression",
    "change",
    "_nullable",
    "assets",
    "preview",
    "mimetype",
    "mask",
    "tab",
    "group",
];
function isSchema(value) {
    return notNull(value) && value instanceof Schema;
}
function isFrom(value) {
    if (!isObject(value))
        return false;
    if (!isString(value.pointer))
        return false;
    if (!isString(value.name))
        return false;
    if (!isArray(value.target))
        return false;
    if (!isSchema(value.schema))
        return false;
    return true;
}
// Define the prototype separately with explicit type annotation
class Schema extends JSONSchemaDraft07 {
    constructor(schema) {
        super();
        return Schema.wrapSchema(schema);
    }
    /**
     * default abstract calculation
     */
    _abstract(value) {
        if (isEmptyValue(value) || value == null)
            return '~';
        if (isArray(value) && this.items instanceof Schema && this.items != null) {
            const items = this.items;
            return (value)
                .map((item) => items._abstract(item))
                .filter((v) => v)
                .join(',');
        }
        if (isArray(value) && isArray(this.items)) {
            //const items = this.items
            return '';
        }
        if (isObject(this.properties)) {
            const properties = this.properties;
            return this.properties ? Object.keys(this.properties)
                .filter((property) => value[property] != null)
                .map((property) => properties[property]._abstract(value[property]))
                .join(',') : "";
        }
        return String(value);
    }
    static _abstractFunc() {
        return (schema, value) => schema._abstract(value);
    }
    _default(parent) {
        switch (true) {
            case ("const" in this):
                return this.const;
            case isPrimitive(this) && 'default' in this:
                return this.default;
            case this.basetype === 'object': {
                return this.properties ? Object.entries(this.properties).reduce((object, [key, property]) => {
                    if (property.default)
                        object[key] = newValue(JSON.parse(JSON.stringify(property.default)), object, property);
                    else
                        object[key] = object.required?.includes[key] ? property._default(object) : newValue(property._empty(), object, property);
                    return object;
                }, newValue({}, parent, this)) : {};
            }
            case this.basetype === 'array':
                return newValue([], parent, this);
            default: return newValue(this._empty(), parent, this);
        }
    }
    /**
     * get the schema corresponding to a jsonpointer (absolute or relative)
     * @param root root schema for absolute pointer
     * @param current current schema for relative pointer
     * @param pointer pointer to dereference
     * @returns
     */
    _deref(pointer) {
        const tokens = pointer.split(/\//);
        const relative = /^\d+$/.test(tokens[0]);
        let base = relative ? this : this.root;
        if (relative) {
            const count = parseInt(tokens[0]);
            for (let i = 0; i < count; i++)
                base = base?.parent;
            if (!base) {
                console.error(`in context ${this.pointer} enable to dereference pointer ${pointer} (not enough ascendant')`);
                return;
            }
        }
        tokens.shift();
        for (const token of tokens) {
            const prev = base;
            base = (token === '*') ? base.items : base.properties?.[token];
            if (!base) {
                console.error(`in context ${this.pointer} enable to dereference pointer ${pointer}(property '${token}' not found in ${prev.pointer})`);
                return;
            }
        }
        return base;
    }
    /**
     * trackers function parse expression to extract watched values and set trackers
     * array in corresponding schema.
     * a value is watched by using the pointer dereference operation in expresions: $`/a/b/c`
     * the tracker is the Object desribed by the schema and the objserved value is the value
     * pointed by $`...`
     * @param root schema for absolute pointers in expr
     * @param current schema for relative pointer in expr
     * @param expr function body or arrow function body to parse
     */
    _track(expr) {
        const logger = FzLogger.get("tracker");
        const POINTER_RE = /\$\`([^`]+)`/g;
        let matches;
        while ((matches = POINTER_RE.exec(expr)) != null) {
            const pointer = matches[1];
            const trackedSchema = this._deref(pointer);
            if (trackedSchema != null && !trackedSchema.trackers.includes(this.pointer)) {
                logger.info("tracking set between %s -> %s", this.pointer, trackedSchema.pointer);
                trackedSchema.trackers.push(this.pointer);
            }
        }
    }
    _toJSON() {
        return JSON.stringify(this, (key, value) => SchemaAnnotation.includes(key) ? undefined : value);
    }
    static wrapSchema(schema) {
        Object.setPrototypeOf(schema, Schema.prototype);
        if (isObject(schema.properties))
            Object.values(schema.properties).forEach((child) => Schema.wrapSchema(child));
        if (isArray(schema.items))
            schema.items.forEach((child) => Schema.wrapSchema(child));
        if (isObject(schema.items))
            Schema.wrapSchema(schema.items);
        if (isArray(schema.oneOf))
            schema.oneOf.forEach((child) => Schema.wrapSchema(child));
        if (isArray(schema.anyOf))
            schema.anyOf.forEach((child) => Schema.wrapSchema(child));
        if (isArray(schema.allOf))
            schema.allOf.forEach((child) => Schema.wrapSchema(child));
        if (schema.not)
            Schema.wrapSchema(schema.not);
        return schema;
    }
    static inferEnums(schema) {
        // Exclude nullish schema, "array" and "object" from being enums
        if (!isObject(schema) || !isPrimitive(schema))
            return;
        // Direct "enum" keyword
        if (isArray(schema.enum)) {
            return schema.enum.map(value => ({ value, title: String(value) }));
        }
        // "const" keyword (supports primitives, objects, and arrays)
        if (schema.const !== undefined) {
            const value = schema.const;
            const title = String(schema.title ?? schema.const);
            return [{ value, title }];
        }
        // "oneOf" / "anyOf" with `const` values
        if (Array.isArray(schema.oneOf)) {
            return schema.oneOf.flatMap(item => Schema.inferEnums(item) ?? []);
        }
        if (Array.isArray(schema.anyOf)) {
            return schema.anyOf.flatMap(item => Schema.inferEnums(item) || []);
        }
        // "allOf": If one of the subschemas defines an enum, use that
        if (Array.isArray(schema.allOf)) {
            for (const subschema of schema.allOf) {
                const values = Schema.inferEnums(subschema);
                if (values)
                    return values;
            }
        }
        // Exclude values from `not` (Negation)
        if (schema.not) {
            const excluded = Schema.inferEnums(schema.not) ?? [];
            return Schema.inferEnums(schema)?.filter(item => !excluded.some(e => e.value === item.value));
        }
        return;
    }
    _empty() {
        if (this.basetype == 'array')
            return [];
        if (this.basetype == 'object')
            return {};
        // const is a special case (emptyValue is same as not empty)
        if (this.const)
            return this.const;
        return this.nullAllowed ? null : undefined;
    }
}
class CompilationStep {
    root;
    property;
    phase;
    after;
    static sourceCount = 1;
    constructor(root, property, phase, after) {
        this.root = root;
        this.property = property;
        this.phase = phase;
        this.after = after;
        // only properties to init
    }
    appliable(_schema, _parent, _name) {
        // default applied on all schemas
        return true;
    }
    sourceURL(schema, dataProperty) {
        const logger = FzLogger.get("compilation", { schema, property: this.property });
        let source = `_FZ_${this.property}_${dataProperty ?? ''}_${CompilationStep.sourceCount++}.js`.replace(/ +/g, "_");
        source = source.replace(/[^a-z0-9_]/ig, "");
        logger.info("compiled expression to function %s", source);
        return `\n    //# sourceURL=${source}\n`;
    }
    set(schema, value, expr) {
        schema[this.property] = value;
        if (expr)
            schema[this.property].expresion = expr;
    }
    compileExpr(schema, expression, body) {
        const arrexpr = isString(expression) ? [expression] : expression;
        try {
            arrexpr.forEach(expr => schema._track(expr));
            this.set(schema, new Function("schema", "value", "parent", "property", "$", "userdata", body), expression);
        }
        catch (e) {
            throw Error(`compilation for keyword ${this.property} failed schema:${schema.pointer}\n    - ${String(e)}`);
        }
    }
    buildCode(expression) {
        const lines = expression.map((expr, i) => `    const cst${i} = \`${expr}\n\``);
        lines.push(`    return ( ${expression.map((_e, i) => `cst${i}`).join(' + ')} ) `);
        return lines.join(';\n');
    }
    error(message) {
        return Error(`Compilation step ${this.property}: ${message} `);
    }
}
function isenumarray(schema) {
    if (schema.basetype === 'array' && schema.uniqueItems) {
        if (schema.items?.oneOf)
            return !!schema.items.oneOf.every((sch) => 'const' in sch);
        else if (schema.items?.anyOf)
            return !!schema.items?.anyOf.every((sch) => 'const' in sch);
    }
    return false;
}
const schemaAttrConverter = {
    fromAttribute(value) {
        try {
            return value != null ? new Schema(JSON.parse(value)) : DEFAULT_SCHEMA;
        }
        catch (error) {
            console.error('fromAttribute:JSON parsing error:', error);
        }
        return DEFAULT_SCHEMA;
    },
    toAttribute(value) {
        try {
            return value != null ? value._toJSON() : null;
        }
        catch (error) {
            console.error('toAttribute: JSON stringifycation failure:', error);
            return null;
        }
    }
};
const DEFAULT_SCHEMA = new Schema({ type: "object", properties: {}, collapsed: false });
const EMPTY_SCHEMA = new Schema({});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1={ATTRIBUTE:1,CHILD:2},e$2=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$1=e$2(class extends i$1{constructor(t){if(super(t),t.type!==t$1.ATTRIBUTE||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((s=>t[s])).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return T}});

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
class FzField extends Base {
    form;
    localError;
    _dofocus = false;
    #pointer_accessor_storage = '/';
    get pointer() { return this.#pointer_accessor_storage; }
    set pointer(value) { this.#pointer_accessor_storage = value; }
    #schema_accessor_storage = EMPTY_SCHEMA;
    get schema() { return this.#schema_accessor_storage; }
    set schema(value) { this.#schema_accessor_storage = value; }
    #data_accessor_storage = {};
    get data() { return this.#data_accessor_storage; }
    set data(value) { this.#data_accessor_storage = value; }
    #name_accessor_storage = null;
    get name() { return this.#name_accessor_storage; }
    set name(value) { this.#name_accessor_storage = value; }
    #index_accessor_storage = null;
    get index() { return this.#index_accessor_storage; }
    set index(value) { this.#index_accessor_storage = value; }
    #dirty_accessor_storage = false;
    get dirty() { return this.#dirty_accessor_storage; }
    set dirty(value) { this.#dirty_accessor_storage = value; }
    #i_collapsed_accessor_storage = false;
    get i_collapsed() { return this.#i_collapsed_accessor_storage; }
    set i_collapsed(value) { this.#i_collapsed_accessor_storage = value; }
    get errors() {
        return this.localError ? [this.localError, ...this.form?.errors(this.pointer)] : this.form?.errors(this.pointer);
    }
    get valid() {
        return this.errors.length === 0 && isNull(this.localError);
    }
    get invalid() {
        return this.errors.length > 0 || notNull(this.localError);
    }
    get collapsed() {
        if (this.schema.collapsed == "never")
            return false;
        if (this.schema.collapsed == "allways")
            return true;
        return this.i_collapsed;
    }
    /** A field is touched if really modified (dirty) or submission by user done */
    get touched() {
        return this.dirty || this.form?.submitted;
    }
    get validation() {
        return e$1({
            "is-valid": this.touched && this.valid,
            "is-invalid": this.touched && this.invalid
        });
    }
    get isroot() {
        return this.schema.parent == null;
    }
    get value() {
        // Warning side effects is prohibited in this method, never update this.data 
        if (this.data == null)
            return undefined;
        // this is a known exception on side efect prohibition 
        // We need to initialise properties to 'undefined' if they are not present
        if (this.name && !(this.name in this.data))
            this.data[this.name] = undefined;
        return this.data[this.key];
    }
    set value(value) {
        if (value === this.value)
            return;
        this.cascadeValue(value);
        this.dirty = true;
        this.form?.check();
    }
    get empty() { return this.schema._empty(); }
    get isempty() { return isEmptyValue(this.value); }
    /*
    * check if field is nullable
    */
    get nullable() {
        if (this.schema.type === "null")
            return true;
        if (isArray(this.schema.type) && this.schema.type.includes("null"))
            return true;
        return this.schema.nullAllowed;
    }
    get key() {
        return this.name ?? this.index ?? -1;
    }
    /**
     * calculate label for this field
     */
    get label() {
        // user may decide to remove label (title == "")
        if (this.schema?.title === "")
            return "";
        // label for array items is an index poistion (one based)
        if (this.isItem)
            return String(this.index != null ? this.index + 1 : '-');
        // label for properties is title or default to property name
        return this.schema?.title ?? this.name ?? "";
    }
    /**
     * return true if this field is item of array, false otherwise
     */
    get isItem() {
        return (this.index != null);
    }
    /**
     * return true if this field is property of object, false otherwise
     */
    get isProperty() {
        return (this.name != null);
    }
    /**
     * calculate a visible boolean state for this field
     */
    get visible() {
        return this.data && this.schema.visible ? !!this.evalExpr("visible") : true;
    }
    /**
     * calculate a required boolean state for this field
     */
    get required() {
        let required = false;
        if (this.isProperty && this.schema.requiredIf) {
            required = this.evalExpr("requiredIf") ?? false;
        }
        return required;
    }
    /**
     * calculate a readonly boolean state for this field
     */
    get readonly() {
        if (!this.form)
            return true;
        if (this.form.readonly)
            return true;
        return (this.data && this.schema.readonly) ? this.evalExpr("readonly") : false;
    }
    /**
     * this method is called for to update this.value (and must be done only here)
     */
    cascadeValue(value) {
        const schema = this.schema;
        const form = this.form;
        // this.data has a value (not undefined or null)
        // ---------------------------------------------
        // we simple set new value (newValue func ensure well constructed values , chaining , default, ..)
        if (this.data) {
            this.data[this.key] = newValue(value, this.data, this.schema);
        }
        else {
            // this.data is nullish
            // --------------------
            // we need to set this value and all the nullish ascendant found (cascading sets)
            // imagine if current pointer is '/a/b/c/d/e' 
            // we must check if d,c,b, and a are nullish (suppose d,c,b are nullish)
            // we will set new newValue() for b,c,d first 
            if (!this.pointer.startsWith("/")) {
                console.error(`cascadeValue pointer not absolute => ${this.pointer}`);
                return false;
            }
            if (this.pointer === "/") {
                console.error(`newValue cant change root => ${this.pointer}`);
                return false;
            }
            // we split pointer to obtain the path as an array of properties or indexes
            // ex '/a/b/c/d/e => ['',a,b,c,d,e]
            const keys = this.pointer.split('/').map(name => /^\d+$/.test(name) ? parseInt(name, 10) : name);
            // for each properties in path we calculate a corresponding schema
            // because heterogeneous types in arrays we are not allways able to do it
            const schemas = [];
            for (let ischema = schema; ischema; ischema = ischema.parent) {
                schemas.unshift(ischema);
            }
            if (keys.length !== schemas.length) {
                // not sure this is possible to happen because if we are ther choices had be done then intermidiary schema/values exists
                console.error(`cascadeValue fail not all schema found on path `);
                return false;
            }
            // we calculate a newValue for each missing property/index  in path in descending order until this target 
            const fields = [];
            let ipointer = '';
            let parent = form.root;
            for (let i = 0; i < keys.length && parent; i++) {
                const key = keys[i];
                const schema = schemas[i];
                ipointer = i ? `${ipointer}/${key}` : `${key}`;
                const field = form.getField(ipointer);
                if (field)
                    fields.push(field);
                const type = schema.basetype;
                switch (true) {
                    // root nothing to do
                    case key === '':
                        break;
                    // last property empty => affecting
                    case i === keys.length - 1:
                        {
                            const v = newValue(value, parent, schema);
                            if (field && !field.data)
                                field.data = parent;
                            parent = parent[key] = v;
                        }
                        break;
                    // property "array" typed empty => initialising
                    case parent[key] == null && type == 'array':
                        {
                            const v = newValue([], parent, schema);
                            if (field && !field.data)
                                field.data = parent;
                            parent = parent[key] = v;
                        }
                        break;
                    // property "object" typed empty => initialising
                    case parent[key] == null && type == 'object':
                        {
                            const v = newValue({}, parent, schema);
                            if (field && !field.data)
                                field.data = parent;
                            parent = parent[key] = v;
                        }
                        break;
                    default:
                        parent = (type == 'object' || type == 'array') ? parent[key] : null;
                }
            }
            // trigger a requestUpdate for each field
            fields.forEach(f => {
                //f.toField()
                f.requestUpdate();
            });
        }
        // trigger a requestUpdate for this field
        //this.toField()
        this.requestUpdate();
        return true;
    }
    /**
     * call for focus on next update for field
     */
    dofocus() { this._dofocus = true; }
    /**
     * render method for this field component (calls renderField() abstract rendering method)
     */
    render() {
        if (!this.visible)
            return '';
        this.toField();
        return x `<div class="space-before">${this.renderField()}</div>`;
    }
    renderErrors() {
        if (!this.touched || this.valid)
            return '';
        return x `
            <span id="error" class="error-message error-truncated" @click="${this.toggleError}">
                ${this.errors.join(', ')}
            </span>`;
    }
    toggleError() {
        this.shadowRoot?.getElementById("error")?.classList.toggle("error-truncated");
    }
    /**
     * render method for label
     */
    renderLabel() {
        // the user may choose not to show label  
        if (this.label === "")
            return x ``;
        const label = `${this.label}${this.required ? '*' : ''}`;
        // for array items => badge index / for object property => label
        return x `
            <label for="input" class="${this.isItem ? 'col-sm-1' : 'col-sm-3'} col-form-label" @click="${this.labelClicked}">
                <div>${this.isItem ? this.badge(label) : label} </div>
            </label>`;
    }
    toggle(evt) {
        if (["never", "allways"].includes(this.schema.collapsed))
            return;
        if (this.isroot) {
            this.i_collapsed = false;
        }
        else
            this.i_collapsed = !this.i_collapsed;
        this.eventStop(evt);
        this.requestUpdate();
    }
    chevron() {
        if (["allways", "never"].includes(this.schema.collapsed))
            return '';
        if (this.collapsed)
            return x `<i class="bi bi-chevron-down"></i>`;
        return x `<i class="bi bi-chevron-up"></i>`;
    }
    // lit overridings 
    // ---------------
    connectedCallback() {
        super.connectedCallback();
        this.form = this.queryClosest("fz-form");
        this.form?.addField(this.schema.pointer, this.pointer, this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.form?.removeField(this.schema.pointer, this.pointer);
        this.pointer = undefined;
        this.schema = undefined;
        this.data = undefined;
        this.name = undefined;
        this.index = undefined;
        this.dirty = undefined;
        this._dofocus = undefined;
    }
    /**
     * before each update
     * - set queried focus
     * @param changedProps changed properties
     */
    update(changedProps) {
        if (this.schema?.expression)
            this.value = this.evalExpr("expression");
        super.update(changedProps);
        if (this._dofocus) {
            this._dofocus = false;
            this.focus();
        }
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.i_collapsed = ['allways', 'true'].includes(this.schema.collapsed) ? true : false;
        this.toField();
        this.form?.check();
    }
    /**
     * 'click' handler when click occurs on field label element
     * may be specialized by subclasses to ac on label clicked event
     * @param changedProps changed properties
     */
    labelClicked(evt) {
        this.eventStop(evt);
    }
    /**
     *  'change' handler when changes occurs on inputed value
     * - update the model value from the field
     * - eval 'change' keyword
     * - process a validation
     * - triggers needed cha,ge events for update and trackers
     */
    change() {
        // changed occurs evaluate change keyword extension
        this.toValue();
        this.evalExpr("change");
        // signal field update for ascendant
        const event = new CustomEvent('update', {
            detail: {
                data: this.data,
                schema: this.schema,
                field: this
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
        // signal field update for trackers
        if (this.schema.trackers.length) {
            this.dispatchEvent(new CustomEvent('data-updated', {
                detail: {
                    trackers: this.schema.trackers,
                    field: this
                },
                bubbles: true,
                composed: true
            }));
            const logger = FzLogger.get("data-update", { field: this, schema: this.schema });
            logger.info(`event "data-updated" triggered`);
        }
        this.requestUpdate();
    }
    /**
     * calculate an abstract string (summary) for this field or a property/item of field
     */
    abstract(key, itemschema) {
        let text;
        if (key === null || key === undefined) {
            if (this.isempty)
                return "~";
            text = this.schema.abstract
                ? this.evalExpr("abstract")
                : this.schema._abstract(this.value);
        }
        else if (notNull(itemschema) && isFunction(itemschema.from)) {
            const refto = itemschema.from?.(itemschema, this.value[key], this.data, this.key, this.derefFunc, this.form.options.userdata);
            const index = refto.refarray.findIndex((x) => x[refto.refname] === this.value[key]);
            const value = refto.refarray[index];
            const schema = getSchema(value);
            text = isFunction(schema.abstract)
                ? schema.abstract(schema, value, refto.refarray, index, this.derefFunc, this.form.options.userdata)
                : schema._abstract(this.value[key]);
        }
        else {
            const schema = (typeof key === 'string') ? this.schema.properties?.[key] : itemschema;
            text = isFunction(schema?.abstract)
                ? schema.abstract(schema, this.value[key], this.data, this.key, this.derefFunc, this.form.options.userdata)
                : schema?._abstract(this.value[key]);
        }
        return text.length > 200 ? text.substring(0, 200) + '...' : text;
    }
    evalExpr(attribute, schema, value, parent, key) {
        const exprFunc = this.schema?.[attribute];
        if (!isFunction(exprFunc))
            return null;
        return schema != null
            ? exprFunc(schema, value, parent, key, this.derefFunc, this.form?.options.userdata)
            : exprFunc(this.schema, this.value, this.data, this.key, this.derefFunc, this.form?.options.userdata);
    }
    /**
     * return tagged template '$' for pointer derefencing in expression or code used in schema
     * the pointer derefencing is done relativatly to this.data
     *  @example $`/a/b/c` // absolute dereferencing
     *  @example $`1/b/c`   // relative dereferencing
     */
    get derefFunc() {
        return (template, ...substitutions) => {
            const pointer = String.raw(template, substitutions);
            return derefPointerData(this.form.root, this.data, this.key, pointer);
        };
    }
    /**
     * this method must be call when global context detect form detects a
     * tracked data had been change
     */
    trackedValueChange() {
        // actually only expression update directly the value ofther extension
        // keywords are called on demand
        if (this.schema?.expression) {
            this.value = this.evalExpr("expression");
        }
        this.requestUpdate();
    }
}
__decorate([
    n$2({ type: String })
], FzField.prototype, "pointer", null);
__decorate([
    n$2({ type: Object })
], FzField.prototype, "schema", null);
__decorate([
    n$2({ type: Object })
], FzField.prototype, "data", null);
__decorate([
    n$2({ type: String })
], FzField.prototype, "name", null);
__decorate([
    n$2({ type: Number })
], FzField.prototype, "index", null);
__decorate([
    n$2({ attribute: false })
], FzField.prototype, "dirty", null);
__decorate([
    n$2({ attribute: false })
], FzField.prototype, "i_collapsed", null);
__decorate([
    n$2({ attribute: false })
], FzField.prototype, "errors", null);

/* eslint-disable @typescript-eslint/no-explicit-any */
const invalidkeys = [
    'valueMissing',
    'badInput',
    'patternMismatch',
    'tooLong',
    'tooShort',
    'rangeOverflow',
    'rangeUnderflow',
    'stepMismatch',
    'customError',
    'typeMismatch'
];
class FzInputBase extends FzField {
    /**
     * return HTMLInputElement used to edit field value
     * pay attention may not always exit, some fields dont use HTML inputs (ex: signature)
     */
    get input() {
        return this.shadowRoot?.getElementById('input');
    }
    /**
     * overide focus for all input based fields
     */
    focus() { this.input?.focus(); }
    renderField() {
        return x `
            <div class="form-group row">
                ${this.renderLabel()}
                <div class="col-sm">${this.renderInput()}</div>
            </div>
            <div class="row">${this.renderErrors()}</div>
            `;
    }
    /**
     * on first updated set listeners
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        // for debug 'F9' output state of field
        if (this.input)
            this.listen(this.input, 'keydown', (evt) => this.debugKey(evt));
    }
    disconnectedCallback() {
        this.input && (this.input.value = "");
        super.disconnectedCallback();
    }
    /**
     * trap F9 key down to log debug Field state
     * @param evt keyboard event to trap key
     */
    debugKey(evt) {
        const logger = FzLogger.get("input", { field: this });
        if (evt.key === 'F9') {
            window._FZ_FORM_FIELD_DEBUG = this;
            const mapping = invalidkeys.map((key) => `${key} = ${this.input.validity[key]}`).join('\n');
            logger.info("invalid mapping \n%s", mapping);
            const outlist = [
                ['schema', JSON.stringify(this.schema, getCircularReplacer).substring(0, 100)],
                ['data', JSON.stringify(this.data, (key, value) => typeof key === 'symbol' ? undefined : value).substring(1, 100)],
                ['pointer', this.pointer],
                ['name', this.name],
                ['valid', this.valid],
                ['visible', this.visible],
                ['required', this.required],
                ['readonly', this.readonly],
                ['check', JSON.stringify(this.input.validity)],
                ['input', this.input.value],
                ['value', this.value],
            ].map(item => item.join(" = ")).join("\n");
            logger.info("Field info", outlist);
            this.eventStop(evt);
        }
    }
}

const FETCHING = [];
const EMPTY = [];
const DEFAULT_FETCH_TIMEOUT = 10000; // 10sec 
class FzEnumBase extends FzInputBase {
    modal;
    enums = [];
    refenum;
    get extend() {
        return !!this.refenum?.extend;
    }
    get showNullChoice() {
        if (!this.schema?.nullAllowed)
            return false;
        const show = this.schema.nullAllowed && (!this.schema.enum?.includes(null) ||
            !this.schema.oneOf?.some((item) => item.const === null) ||
            !this.schema.anyOf?.some((item) => item.const === null));
        return show;
    }
    renderInput() {
        this.evalEnums();
        return x `
            ${this.extend ? x `<fz-item-dlg  @click="${this.eventStop}" .reference="${this.refenum}" @close="${this.close}"></fz-item-dlg>` : ""}
            ${this.renderEnum()}`;
    }
    close(evt) {
        if (evt.detail.dismissed) {
            this.refenum?.target.pop();
        }
        else {
            if (this.input && this.input instanceof HTMLSelectElement) {
                const option = document.createElement("option");
                option.value = evt.detail.value;
                option.text = evt.detail.abstract;
                this.input.add(option);
                option.selected = true;
            }
        }
        if (this.refenum?.pointer)
            this.form?.updateField(this.refenum?.pointer);
        super.change();
        this.requestUpdate();
    }
    change(_evt) {
        if (this.input?.value == "~~ADD~~" && this.modal) {
            this.modal.open();
            this.modal.reference = this.refenum;
            this.modal.requestUpdate();
        }
        else {
            super.change();
        }
    }
    isSelected(value) { return this.value === value; }
    evalEnums() {
        // if fetching is on going just wait result 
        if (this.enums == FETCHING || this.enums == EMPTY)
            return;
        switch (true) {
            case isFunction(this.schema?.from):
                this.enums = this.getFrom();
                break;
            case notNull(this.schema?.enumFetch):
                this.fetchEnum()
                    .then((enums) => (this.enums = enums, this.requestUpdate()), (err) => (this.localError = String(err)));
                break;
            default:
                this.enums = this.getEnum();
                if (this.enums.length == 0)
                    this.enums = EMPTY;
        }
        // result is empty enum , or fetching , or no empty enum list
        if (this.enums != FETCHING && this.enums?.length == 0)
            this.enums = EMPTY;
    }
    getEnum() {
        const unfiltered = Schema.inferEnums(this.schema);
        if (isNull(unfiltered))
            return [];
        return unfiltered?.reduce((list, item) => {
            const ok = this.evalExpr('filter', this.schema, item.value, this.data, this.key);
            if (ok)
                list.push(item);
            return list;
        }, []);
    }
    async fetchEnum() {
        return new Promise((resolve, reject) => {
            const name = this.schema.enumFetch;
            let resolved = false;
            const event = new CustomEvent("enum", {
                detail: {
                    name,
                    success: (data) => {
                        clearTimeout(timeout);
                        if (!resolved) {
                            resolved = true;
                            resolve(data);
                        }
                    },
                    failure: (message) => {
                        clearTimeout(timeout);
                        if (!resolved) {
                            resolved = true;
                            reject(new Error(`EnumFetch "${name}" failed: ${message}`));
                        }
                    },
                    timeout: DEFAULT_FETCH_TIMEOUT
                },
                bubbles: true,
                cancelable: false,
                composed: true
            });
            this.dispatchEvent(event);
            const timeout = setTimeout(() => {
                if (!resolved)
                    reject(new Error(`Timeout when fetching enumeration"${name}"`));
            }, event.detail.timeout ?? DEFAULT_FETCH_TIMEOUT);
        });
    }
    getFrom() {
        const obj = this.evalExpr("from");
        if (isFrom(obj)) {
            this.refenum = obj;
            const name = this.refenum.name;
            const target = this.refenum.target;
            return target.reduce((list, item, index) => {
                const schema = getSchema(item);
                const ok = this.evalExpr('filter', schema, item, target, index);
                if (ok) {
                    const value = item[name];
                    const title = isFunction(schema?.abstract) ? schema.abstract(schema, item, target, index, this.derefFunc, this.form.options.userdata) : value;
                    list.push({ title, value });
                }
                return list;
            }, []);
        }
        return [];
    }
}
__decorate([
    e$5('fz-item-dlg')
], FzEnumBase.prototype, "modal", void 0);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzEnumSelect = class FzEnumSelect extends FzEnumBase {
    #selected_accessor_storage = -1;
    get selected() { return this.#selected_accessor_storage; }
    set selected(value) { this.#selected_accessor_storage = value; }
    #options_accessor_storage = [];
    get options() { return this.#options_accessor_storage; }
    set options(value) { this.#options_accessor_storage = value; }
    toField() {
        this.options.forEach(r => r.selected = false);
        if (isNull(this.value) || isNull(this.enums)) {
            this.selected = -1;
        }
        else {
            this.selected = this.enums.findIndex(item => item.value == this.value);
            if (this.selected >= 0)
                this.options[this.selected].selected = true;
        }
    }
    toValue() {
        if (notNull(this.enums) && this.selected >= 0) {
            this.value = this.enums[this.selected].value;
        }
    }
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            .readonly {
                background-color: #ececec
            }`
        ];
    }
    renderEnum() {
        if (this.enums == FETCHING) {
            return x `
                <div class="form-control d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-secondary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading...
                </div>`;
        }
        return x `
            <select 
                id="input" 
                @change="${this.select}" 
                ?required="${this.required}"
                class="${e$1({ 'form-select': true, 'readonly': this.readonly })}"
            >
                ${this.extend ? x `<option style="color:red;text-align:center" ?disabled="${this.readonly}" ?selected="${false}" .value="${'~~ADD~~'}">Add ...</option>` : ''}
                ${this.showNullChoice ? x `<option style="color:red;text-align:center" ?disabled="${this.readonly}" ?selected="${this.isSelected(null)}" .value="${'~~EMPTY~~'}"> ${this.required ? 'Choose a value...' : '<vide>'}</option>` : ''}
                ${this.enums?.map((item, i) => x `
                    <option id="option" ?disabled="${this.readonly}"  ?selected="${this.selected === i}">
                        <b>${item.title}</b>
                    </option>`)}
            </select>`;
    }
    select() {
        this.options.forEach((o, i) => o.selected ? (this.selected = i) : null);
        this.change();
    }
};
__decorate([
    n$2({ type: Number, attribute: false })
], FzEnumSelect.prototype, "selected", null);
__decorate([
    r$3("option")
], FzEnumSelect.prototype, "options", null);
FzEnumSelect = __decorate([
    t$4("fz-enum-select")
], FzEnumSelect);

let FzEnumCheck = class FzEnumCheck extends FzEnumBase {
    #selected_accessor_storage = -1;
    get selected() { return this.#selected_accessor_storage; }
    set selected(value) { this.#selected_accessor_storage = value; }
    #radios_accessor_storage = [];
    get radios() { return this.#radios_accessor_storage; }
    set radios(value) { this.#radios_accessor_storage = value; }
    toField() {
        if (isNull(this.radios))
            return;
        this.radios.forEach(r => { r.checked = false; r.removeAttribute("checked"); });
        if (this.value === undefined || isNull(this.enums)) {
            this.selected = -1;
        }
        else {
            this.selected = this.enums.findIndex(item => item.value === this.value);
            if (this.selected >= 0)
                this.radios[this.selected].checked = true;
        }
    }
    toValue() {
        if (this.selected >= 0 && notNull(this.enums)) {
            this.value = this.enums[this.selected].value;
        }
    }
    renderEnum() {
        if (this.enums == FETCHING) {
            return x `
                <div class="form-control d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-secondary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading...
                </div>`;
        }
        // ?checked="${this.selected == i}"
        return x `
            ${this.enums?.map((item, i) => x `
                <div class="form-check form-check-inline">
                    <input 
                        type="radio"
                        name="group" 
                        .value=${item.value} 
                        ?disabled=${this.readonly}
                        @click="${() => this.select(i)}"
                        ?required=${this.required}
                        class="form-check-input"
                        autocomplete=off  spellcheck="false" tabindex=${i + 1} 
                    />
                    <label class="form-check-label" for="${i}-input">${item.title}</label>
                </div>`)}`;
    }
    select(index) {
        if (this.readonly)
            return;
        this.selected = index;
        this.radios[this.selected].checked = true;
        this.change();
    }
};
__decorate([
    n$2({ type: Number, attribute: false })
], FzEnumCheck.prototype, "selected", null);
__decorate([
    r$3("input")
], FzEnumCheck.prototype, "radios", null);
FzEnumCheck = __decorate([
    t$4("fz-enum-check")
], FzEnumCheck);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i$1{constructor(i){if(super(i),this.it=E,i.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===E||null==r)return this._t=void 0,this.it=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o$2=e$2(e);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i=" !"+n,o$1=e$2(class extends i$1{constructor(t){if(super(t),t.type!==t$1.ATTRIBUTE||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return T}});

/**
 * an input for long enumeration with typeahead behavior
 */
let FzEnumTypeahead = class FzEnumTypeahead extends FzEnumBase {
    #isopen_accessor_storage = false;
    get isopen() { return this.#isopen_accessor_storage; }
    set isopen(value) { this.#isopen_accessor_storage = value; }
    #selected_accessor_storage = -1;
    get selected() { return this.#selected_accessor_storage; }
    set selected(value) { this.#selected_accessor_storage = value; }
    filtered = [];
    toField() {
        if (!this.queryElem) {
            this.selected = -1;
        }
        else if (isNull(this.value) || isNull(this.enums)) {
            this.queryElem.value = "";
            this.selected = -1;
        }
        else {
            const item = this.enums.find(item => item.value == this.value);
            this.queryElem.value = item ? item.title : "";
            this.selected = item ? 0 : -1;
        }
    }
    toValue() {
        if (this.selected >= 0) {
            this.value = this.filtered[this.selected].value;
        }
    }
    renderEnum() {
        if (this.enums == FETCHING) {
            return x `
                <div class="form-control d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-secondary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading...
                </div>`;
        }
        const styles = { display: this.isopen ? "block" : "none" };
        return x `
            <div class="dropdown">
                <input  
                    id="query"
                    type="text" 
                    placeholder=${this.label ?? ""}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    @input=${this.filter}
                    @change=${this.filter}
                    @focus=${this.show}
                    class="form-control" 
                    autocomplete=off  spellcheck="false"
                />
                <div id="list" style="${o$1(styles)}" class="dropdown-menu w-100">
                    ${this.filtered?.length == 0 ? x `<a data-testid="nomatch-item" class="dropdown-item disabled"  style="font-style: italic">No match...</a>` : ''}
                    ${this.filtered?.map((item, i) => x `<a data-testid="selected-item" class="dropdown-item" @click="${() => this.select(i)}" >${this.boldPrefix(item.title)}</a>`)}
                </div>
            </div>`;
    }
    // get the  inputed query string
    get query() {
        return this.queryElem?.value ?? "";
    }
    // return the given label with query part bolded 
    boldPrefix(label) {
        if (this.query == null || this.query.length == 0)
            return label;
        const parts = label.split(new RegExp(this.query, "i"));
        const bolded = parts.join(`<b><u>${this.query}</u></b>`);
        return o$2(bolded);
    }
    show() {
        this.isopen = true;
        this.queryElem.select();
        this.filter();
    }
    select(index) {
        this.selected = index;
        this.isopen = false;
        this.queryElem.value = this.filtered[this.selected].title;
        this.change();
    }
    // get the enum list to display filter by query string (first 10 items)
    filter() {
        super.evalEnums();
        const upper = this.query.toUpperCase();
        const matching = (item) => item.title.toUpperCase().includes(upper);
        this.filtered = this.showNullChoice ? [{ title: '~ empty', value: this.empty }] : [];
        this.filtered.push(...this.enums?.filter(matching).slice(0, 10) ?? []);
        this.selected = -1;
        this.requestUpdate();
    }
};
__decorate([
    n$2({ type: Boolean, attribute: false })
], FzEnumTypeahead.prototype, "isopen", null);
__decorate([
    n$2({ type: Number, attribute: false })
], FzEnumTypeahead.prototype, "selected", null);
__decorate([
    e$5('#query')
], FzEnumTypeahead.prototype, "queryElem", void 0);
FzEnumTypeahead = __decorate([
    t$4("fz-enum-typeahead")
], FzEnumTypeahead);

const RGBA_RE = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputString$1 = class FzInputString extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            if (!isString(this.value))
                this.input.value = "#000000";
            else if (this.value.match(RGBA_RE))
                this.input.value = this.rgbaToHex(this.value);
            else
                this.input.value = this.value;
        }
    }
    toValue() {
        if (notNull(this.input)) {
            if (!isString(this.input.value, true))
                this.value = this.empty;
            else if (this.input.value.match(RGBA_RE))
                this.value = this.rgbaToHex(this.input.value);
            else
                this.value = this.input.value;
        }
    }
    renderInput() {
        return x `
            <div class="input-group ${this.validation}" >
                <input
                    id="input"
                    type="color" 
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    ?required="${this.required}"
                    autocomplete=off  spellcheck="false"
                    class="form-control form-control-color" 
                />
                <span class="input-group-text" style="max-width:5em">${isNull(this.value) ? '~' : this.value}</span>
            </div>`;
    }
    rgbaToHex(rgba) {
        // Regular expression to extract the RGBA components
        const match = rgba.match(RGBA_RE);
        if (!match)
            throw new Error("Invalid RGBA format");
        const [, r, g, b, _a] = match.map(Number);
        // Convert RGB components to hexadecimal
        const toHex = (component) => {
            const hex = component.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        const hex = `${toHex(r)}${toHex(g)}${toHex(b)}`;
        return `#${hex}`;
    }
};
FzInputString$1 = __decorate([
    t$4("fz-color")
], FzInputString$1);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=o=>o??E;

function iso$2(date = new Date()) {
    return date.toISOString().substring(0, 10);
}
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputDate = class FzInputDate extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            const redate = /\d\d\d\d-\d\d-\d\d/;
            this.input.valueAsDate = redate.test(this.value) ? new Date(this.value) : null;
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.valueAsDate) ? iso$2(this.input.valueAsDate) : undefined;
        }
    }
    renderInput() {
        return x `<input
            id="input" 
            type="date" 
            @input="${this.change}"
            ?readonly="${this.readonly}" 
            ?required="${this.required}"
            min="${o(this.min)}"
            max="${o(this.max)}"
            autocomplete=off  spellcheck="false"
            class="form-control ${this.validation}" 
        />`;
    }
    get min() {
        return this.schema?.minimum;
    }
    get max() {
        return this.schema?.maximum;
    }
};
FzInputDate = __decorate([
    t$4("fz-date")
], FzInputDate);

function iso$1(date = new Date()) {
    return date.toISOString().slice(0, -5) + "Z";
}
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputDatetime = class FzInputDatetime extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            const redate = /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ?/;
            if (this.input.valueAsDate) {
                this.input.valueAsDate = redate.test(this.value) ? new Date(this.value.substring(0, 16)) : null;
            }
            else {
                this.input.value = redate.test(this.value) ? this.value.substring(0, 16) : '';
            }
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.valueAsDate) ? iso$1(this.input.valueAsDate) : undefined;
        }
    }
    renderInput() {
        return x `<input 
            id="input" 
            type="datetime-local" 
            @input="${this.change}"
            min="${o(this.min)}"
            max="${o(this.max)}"
            ?readonly="${this.readonly}" 
            ?required="${this.required}"
            class="form-control ${this.validation}"
            autocomplete=off  spellcheck="false"
        />`;
    }
    get min() {
        return this.schema?.minimum;
    }
    get max() {
        return this.schema?.maximum;
    }
};
FzInputDatetime = __decorate([
    t$4("fz-datetime")
], FzInputDatetime);

function iso(date = new Date()) {
    return date.toISOString().substring(11, 19);
}
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputTime = class FzInputTime extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            this.input.valueAsDate = new Date(this.value);
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.valueAsDate) ? iso(this.input.valueAsDate) : undefined;
        }
    }
    renderInput() {
        return x `
            <input 
                class="form-control timepicker ${this.validation}" 
                type="time" 
                id="input" 
                step="1"
                .value="${this.value}"
                ?readonly="${this.readonly}"
                @input="${this.change}"
                ?required="${this.required}"
                autocomplete=off  spellcheck="false"
            />`;
    }
};
FzInputTime = __decorate([
    t$4("fz-time")
], FzInputTime);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputTextarea = class FzInputTextarea extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "");
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = isString(this.input.value, true) ? this.input.value : undefined;
        }
    }
    renderInput() {
        return x `
            <textarea  
                id="input"
                ?readonly="${this.readonly}"
                ?required="${this.required}"
                placeholder="${o(this.label)}"
                minlength="${o(this.minlength)}"
                maxlength="${o(this.maxlength)}"
                @input="${this.change}"
                @keypress="${this.change}"
                rows="5"
                class="form-control ${this.validation}" 
            ></textarea>`;
    }
    get minlength() { return this.schema?.minLength; }
    get maxlength() { return this.schema?.maxLength; }
    get pattern() { return this.schema?.pattern; }
};
FzInputTextarea = __decorate([
    t$4("fz-textarea")
], FzInputTextarea);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputString = class FzInputString extends FzInputBase {
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            input[type="color"] {
                height: 38px
            }`
        ];
    }
    toField() {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "");
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) && this.input.value != "" ? this.input.value : this.empty;
        }
    }
    renderInput() {
        return x `
            <div class="input-group" >
                <input
                    id="input"
                    type="${this.type}" 
                    @input="${this.change}"
                    ?readonly="${this.readonly}"
                    ?required="${this.required}"
                    placeholder="${this.label}"
                    minlength="${o(this.minlength)}"
                    maxlength="${o(this.maxlength)}"
                    pattern="${o(this.pattern)}"
                    autocomplete=off  spellcheck="false"
                    class="form-control ${this.validation}" 
                />
            </div>`;
    }
    get minlength() { return this.schema?.minLength; }
    get maxlength() { return this.schema?.maxLength; }
    get pattern() { return this.schema?.pattern; }
    get type() {
        switch (this.schema?.format) {
            case 'color': return 'color';
            case 'email': return 'email';
            case 'password': return 'password';
            case 'uri': return 'url';
            default: return 'text';
        }
    }
};
FzInputString = __decorate([
    t$4("fz-string")
], FzInputString);

/**
 * FzInputMask: Input field with masked formatting
 * - Stored value is **exactly what is displayed**
 * - Auto-inserts static characters (e.g., dashes, spaces, parentheses)
 * - Handles backspace, delete, and caret position properly
 */
let FzInputMask = class FzInputMask extends FzInputBase {
    toField() {
        if (this.input) {
            this.input.value = this.value ?? "";
        }
    }
    toValue() {
        if (this.input) {
            this.value = this.input.value; // Store exactly what the user sees
        }
    }
    renderInput() {
        return x `
            <div class="input-group">
                <input
                    class="form-control ${this.validation}"
                    type="text"
                    id="input"
                    placeholder="${this.mask}"
                    ?readonly="${this.readonly}"
                    @keydown="${this.handleKeydown}"
                    @input="${this.handleInput}"
                    ?required="${this.required}"
                    autocomplete=off  spellcheck="false"
                />
            </div>`;
    }
    get mask() {
        return this.schema?.mask ?? "";
    }
    // Handle user input (apply mask and store formatted value)
    handleInput(event) {
        const input = event.target;
        const formatted = this.applyMask(input.value); // Apply mask formatting
        const oldCaretPosition = input.selectionStart || 0;
        this.value = formatted; // Store the formatted value
        this.requestUpdate();
        // Restore caret position
        this.restoreCaretPosition(input, oldCaretPosition);
    }
    // Handle backspace, delete, and caret movement
    handleKeydown(event) {
        const input = event.target;
        const key = event.key;
        const caretPos = input.selectionStart || 0;
        if (key === "ArrowLeft" || key === "ArrowRight")
            return; // Allow navigation keys
        if (key === "Backspace") {
            this.handleBackspace(input, caretPos);
            event.preventDefault();
        }
        else if (key === "Delete") {
            this.handleDelete(input, caretPos);
            event.preventDefault();
        }
        else {
            // Auto-insert static characters (e.g., `-`, `(`, `)`)
            const nextChar = this.mask[caretPos];
            if (nextChar && /[-()\s]/.test(nextChar)) {
                input.value += nextChar;
            }
        }
    }
    // Applies mask to input value
    applyMask(value) {
        let formatted = "";
        let valueIndex = 0;
        for (const char of this.mask) {
            if (char === "#") {
                formatted += value[valueIndex] || "";
                valueIndex++;
            }
            else {
                formatted += char; // Keep static characters
            }
        }
        return formatted;
    }
    // Handle backspace (remove previous character while preserving mask)
    handleBackspace(input, caretPos) {
        const mask = this.mask;
        let newCaretPos = caretPos;
        if (caretPos > 0) {
            do {
                newCaretPos--;
            } while (newCaretPos > 0 && !/[\dA-Za-z]/.test(mask[newCaretPos])); // Skip static characters
        }
        input.value = input.value.substring(0, newCaretPos) + input.value.substring(caretPos);
        this.restoreCaretPosition(input, newCaretPos);
    }
    // Handle delete (remove next character while preserving mask)
    handleDelete(input, caretPos) {
        const mask = this.mask;
        let newCaretPos = caretPos;
        if (caretPos < input.value.length) {
            do {
                newCaretPos++;
            } while (newCaretPos < input.value.length && !/[\dA-Za-z]/.test(mask[newCaretPos])); // Skip static characters
        }
        input.value = input.value.substring(0, caretPos) + input.value.substring(newCaretPos);
        this.restoreCaretPosition(input, caretPos);
    }
    // Restore caret position after formatting
    restoreCaretPosition(input, caretPos) {
        this.requestUpdate();
        setTimeout(() => input.setSelectionRange(caretPos, caretPos), 0);
    }
};
FzInputMask = __decorate([
    t$4("fz-mask")
], FzInputMask);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputSignature = class FzInputSignature extends FzInputBase {
    #disabled_accessor_storage = false;
    get disabled() { return this.#disabled_accessor_storage; }
    set disabled(value) { this.#disabled_accessor_storage = value; }
    #state_accessor_storage = 'read';
    get state() { return this.#state_accessor_storage; }
    set state(value) { this.#state_accessor_storage = value; }
    get isblank() {
        if (!this.context || !this.canvas)
            return false;
        const pixelBuffer = new Uint32Array(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data.buffer);
        let white = 0, black = 0;
        pixelBuffer.forEach(color => color !== 0 ? black++ : white++);
        const percent = black * 100 / (black + white);
        return (percent < 0.5);
    }
    content;
    image;
    canvas;
    context;
    observer;
    offsetX = 0;
    offsetY = 0;
    currentX = 0;
    currentY = 0;
    drawing = false;
    toField() {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "");
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : undefined;
        }
    }
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            img {border: 0}
            .readonly {background-color: rgb(235,235,228)}
            `
        ];
    }
    renderInput() {
        return x `
            <div id="content" class="form-control ${this.validation}">
                <button ?hidden="${!this.value || this.required || this.readonly}" @click="${this.del}" type="button" style="float:right" class="btn-close" aria-label="Close"></button>
                <canvas id="canvas" ?hidden="${this.state === 'read'}" height="300" width="300"></canvas>
                <img   id="image" draggable=false ?hidden="${this.state === 'edit' || !this.value}" >
                <div ?hidden="${!!this.value || this.state === 'edit'}" >Aucune</div>
            </div>
            <div>
                <button ?hidden="${this.readonly}" ?disabled="${this.state !== 'read'}" type="button" class="col-sm-3 btn btn-primary btn-sm" @click="${this.edit}">Signer</button>
                <button ?hidden="${this.state === 'read'}" ?disabled="${this.isblank}" type="button" class="col-sm-3 btn btn-primary btn-sm" @click="${this.validate}">Valider</button>
                <button ?hidden="${this.state === 'read'}" ?disabled="${this.isblank}" type="button" class="col-sm-3 btn btn-primary btn-sm" @click="${this.clear}">Effacer</button>
            </div>`;
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.canvas = this.shadowRoot?.getElementById('canvas') ?? undefined;
        // Gestion des événements
        if (this.canvas) {
            this.context = this.canvas.getContext('2d') ?? undefined;
            this.listen(this.canvas, 'mousedown', evt => this.onDown(evt));
            this.listen(this.canvas, 'mousemove', evt => this.onMove(evt));
            this.listen(this.canvas, 'mouseup', evt => this.onUp(evt));
            this.listen(this.canvas, 'touchstart', evt => this.onDown(evt), { passive: false });
            this.listen(this.canvas, 'touchmove', evt => this.onMove(evt), { passive: false });
            this.listen(this.canvas, 'touchend', evt => this.onUp(evt));
        }
        this.content = this.shadowRoot?.getElementById('content') ?? undefined;
        if (this.content) {
            this.observer = new ResizeObserver(_entries => this.resize());
            this.observer.observe(this.content);
        }
        this.image = this.shadowRoot?.getElementById('image') ?? undefined;
        this.load();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.content = undefined;
        this.image = undefined;
        this.canvas = undefined;
        this.context = undefined;
        this.observer?.disconnect();
        this.observer = undefined;
    }
    resize() {
        if (this.content) {
            const width = this.content.offsetWidth;
            const height = Math.floor(this.content.offsetWidth / 2);
            if (this.canvas && this.state === 'read' &&
                (this.canvas.width !== width || this.canvas.height !== height)) {
                this.canvas.width = width;
                this.canvas.height = height;
            }
            if (this.image && this.state === 'read' &&
                (this.image.width !== width || this.image.height !== height)) {
                this.image.width = width;
                this.image.height = height;
            }
        }
    }
    getPos(event) {
        if (event.touches && event.touches[0]) {
            this.currentX = event.touches[0].clientX - this.offsetX;
            this.currentY = event.touches[0].clientY - this.offsetY;
        }
        else if (event.originalEvent && event.originalEvent.touches && event.originalEvent.touches[0]) {
            this.currentX = event.originalEvent.touches[0].clientX - this.offsetX;
            this.currentY = event.originalEvent.touches[0].clientY - this.offsetY;
        }
        else if (event.offsetX !== undefined) {
            this.currentX = event.offsetX;
            this.currentY = event.offsetY;
        }
        else { // Firefox compatibility
            this.currentX = event.layerX - event.currentTarget.offsetLeft;
            this.currentY = event.layerY - event.currentTarget.offsetTop;
        }
    }
    getOffset(event) {
        // calculate offsets for touch devices
        if (event.touches || event.originalEvent && event.originalEvent.touches) {
            this.offsetX = 0;
            this.offsetY = 0;
            let elt = null;
            // originalEvent is present on PC 
            if (event.originalEvent)
                elt = event.originalEvent.srcElement;
            else {
                // ORiginal Event absent from touch devices
                if (event.touches.length > 0)
                    elt = event.touches[0].target;
            }
            if (elt) {
                while (elt) {
                    this.offsetX += elt.offsetLeft - elt.scrollLeft;
                    this.offsetY += elt.offsetTop - elt.scrollTop;
                    elt = elt.offsetParent;
                }
            }
        }
    }
    onDown(event) {
        this.drawing = !this.readonly;
        this.getOffset(event);
        this.getPos(event);
        // start a new line
        if (this.context && this.currentX) {
            this.context.beginPath();
            this.context.moveTo(this.currentX, this.currentY);
            this.context.strokeStyle = "#4bf";
            this.context.lineWidth = 5;
            this.context.lineJoin = 'round';
        }
        this.eventStop(event);
        return false;
    }
    onMove(event) {
        if (!this.drawing)
            return;
        this.getPos(event);
        if (this.context) {
            this.context.lineTo(this.currentX, this.currentY);
            this.context.stroke();
        }
        this.eventStop(event);
        return false;
    }
    onUp(event) {
        // On arrête le dessin
        this.drawing = false;
        this.eventStop(event);
        if (!this.isblank)
            this.save();
        return false;
    }
    //override check() {
    // this.valid = true
    // this.message = ''
    // if (this.required && this.value == null) {
    //     this.valid = false
    //     this.message = formatMsg('valueMissing')
    // }
    // this.content?.classList.add(this.valid ? 'valid' : 'invalid')
    // this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    // if (this.readonly) {
    //     this.content?.classList.add('readonly')
    // } else {
    //     this.content?.classList.remove('readonly')
    // }
    //}
    load() {
        if (this.context && this.image && this.value) {
            this.image.src = this.value;
        }
    }
    edit() {
        this.canvas && this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.value = null;
        this.state = 'edit';
    }
    validate() {
        this.save();
        this.state = 'read';
    }
    save() {
        if (this.canvas) {
            const dataurl = this.canvas.toDataURL("image/gif");
            this.value = dataurl;
            if (this.image)
                this.image.src = dataurl;
            this.change();
        }
    }
    clear() {
        if (this.canvas)
            this.canvas.width = this.canvas.width;
        this.value = '';
        this.requestUpdate();
    }
    del() {
        this.clear();
        this.state = 'read';
    }
};
__decorate([
    n$2({ attribute: false })
], FzInputSignature.prototype, "disabled", null);
__decorate([
    n$2({ attribute: false })
], FzInputSignature.prototype, "state", null);
FzInputSignature = __decorate([
    t$4("fz-signature")
], FzInputSignature);

let FzInputBoolean = class FzInputBoolean extends FzInputBase {
    /**
     * bor check box no leading label
     */
    renderLabel() {
        return x `
        <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
            <div>&nbsp</div>
        </label>`;
    }
    renderInput() {
        return x `
            <div class="form-control">
                <input 
                    id="input"
                    type="checkbox"
                    ?required="${this.required}"
                    @change="${this.tryChange}"
                    @click="${this.tryChange}"
                    autocomplete=off  spellcheck="false"
                    class="form-check-input align-self-start ${this.validation}"
                />
                <label class="form-check-label ms-2" for="input">${super.label}</label>
            </div>
        `;
    }
    tryChange(event) {
        this.readonly ? event.preventDefault() : this.change();
    }
    toField() {
        if (isNull(this.input))
            return;
        switch (true) {
            case isBoolean(this.value):
                // Standard true/false 
                this.input.indeterminate = false;
                this.input.checked = this.value;
                break;
            default:
                // other not boolean/not nullish
                this.input.indeterminate = true;
                this.input.checked = false;
        }
    }
    toValue() {
        if (isNull(this.input))
            return;
        if (this.input.indeterminate) {
            this.value = this.schema.nullAllowed ? null : undefined;
        }
        else {
            this.value = !!this.input.checked;
        }
    }
};
FzInputBoolean = __decorate([
    t$4("fz-boolean")
], FzInputBoolean);

const DECIMAL_SEPARATOR = (1.1).toLocaleString().substring(1, 2);
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputFloat = class FzInputFloat extends FzInputBase {
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            /* Chrome, Safari, Edge, Opera */
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            /* Firefox */
            input[type=number] {
                -moz-appearance: textfield;
            }`
        ];
    }
    toField() {
        if (notNull(this.input)) {
            if (isNumber(this.value)) {
                this.input.valueAsNumber = this.value;
            }
            else {
                this.input.value = "";
            }
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = isNumber(this.input.valueAsNumber) ? this.input.valueAsNumber : undefined;
        }
    }
    renderInput() {
        return x `
            <div class="input-group">
                <input 
                    class="form-control ${this.validation}" 
                    type="number" 
                    id="input"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    min="${o(this.min)}"
                    max="${o(this.max)}"
                    step="1e-12"
                    ?required="${this.required}"
                    @keypress="${this.keypress}"
                    autocomplete=off  spellcheck="false"
                />
            </div>`;
    }
    get max() {
        if (isNumber(this.schema?.maximum))
            return this.schema.maximum;
        if (isNumber(this.schema?.exclusiveMaximum))
            return this.schema.exclusiveMaximum;
        return;
    }
    get min() {
        if (isNumber(this.schema?.minimum))
            return this.schema.minimum;
        if (isNumber(this.schema?.exclusiveMinimum))
            return this.schema.exclusiveMinimum;
        return;
    }
    keypress(event) {
        // browser issue on "input type=number' we reject decimal sep not in current locale
        if (/[.,]/.test(event.key) && DECIMAL_SEPARATOR !== event.key) {
            event.preventDefault();
        }
    }
};
FzInputFloat = __decorate([
    t$4("fz-float")
], FzInputFloat);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzRange = class FzRange extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            this.input.valueAsNumber = isNumber(this.value) ? Math.floor(this.value) : NaN;
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = isNumber(this.input.valueAsNumber) ? this.input.valueAsNumber : undefined;
        }
    }
    static get styles() {
        return [
            ...super.styles,
            i$5 `
          input[type=range]::-webkit-slider-runnable-track {
            background: lightgray;
            border: 0.2px solid rgba(1, 1, 1, 0.3);
            border-radius: 25px;
            width: 100%;
            height: 8px;
            cursor: pointer;
          }
          input[type=range]::-webkit-slider-thumb {
            margin-top: -6px;
            width: 20px;
            height: 20px;
            background: rgb(13, 110, 253);
            border: 0.2px solid rgba(1, 1, 1, 0.3);
            border-radius: 10px;
            cursor: pointer;
            -webkit-appearance: none;
          }
          input[type=range]::-moz-range-track {
            background: rgb(13, 110, 253);
            border: 0.2px solid rgba(1, 1, 1, 0.3);
            border-radius: 25px;
            width: 100%;
            height: 15.6px;
            cursor: pointer;
          }
          input[type=range]::-moz-range-thumb {
            width: 16px;
            height: 36px;
            background: #00ffff;
            border: 1px solid #000000;
            border-radius: 3px;
            cursor: pointer;
          }
          input[type=range]::-ms-track {
            background: transparent;
            border-color: transparent;
            border-width: 11.2px 0;
            color: transparent;
            width: 100%;
            height: 15.6px;
            cursor: pointer;
          }
          `
        ];
    }
    renderInput() {
        return x `
            <div class="input-group">
                <input 
                    id="input" 
                    type="range"  
                    ?disabled="${this.readonly}"
                    ?readonly="${this.readonly}"
                    ?required="${this.required}"
                    @input="${this.change}"
                    min="${o(this.min)}"
                    max="${o(this.max)}"
                    step="1"
                    autocomplete=off  spellcheck="false"
                    class="form-control ${this.validation}"
                />
                <div class="input-group-append" style="max-width:5em" >
                    <span class="input-group-text" >${this.value}</span>
                </div>
            </div>`;
    }
    get max() {
        if (isNumber(this.schema?.maximum))
            return this.schema.maximum;
        if (isNumber(this.schema?.exclusiveMaximum))
            return this.schema.exclusiveMaximum;
        return;
    }
    get min() {
        if (isNumber(this.schema?.minimum))
            return this.schema.minimum;
        if (isNumber(this.schema?.exclusiveMinimum))
            return this.schema.exclusiveMinimum;
        return;
    }
};
FzRange = __decorate([
    t$4("fz-range")
], FzRange);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputLocation = class FzInputLocation extends FzInputBase {
    watchId;
    toField() {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "");
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : undefined;
        }
    }
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            input[type="color"] {
                height: 38px
            }`
        ];
    }
    renderInput() {
        return x `
            <div class="input-group ${this.validation}">
                <input
                    id="input"
                    type="text"
                    readonly
                    placeholder="POINT(x y)"
                    ?readonly="${this.readonly}" 
                    autocomplete=off  spellcheck="false"
                    class="form-control"
                />
                <div class="btn-group">
                    <button 
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="${this.remove}"
                        aria-label="delete">
                            <i class="bi bi-x"></i>
                    </button>
                    <button 
                        type="button"
                        ?disabled=${!navigator.geolocation}
                        @click="${this.geolocate}"
                        aria-label="Geolocate"
                        class="btn btn-primary btn-sm"
                    >
                            <i class="bi bi-geo-alt"></i>
                    </button>
                </div>
            </div>`;
    }
    geolocate() {
        this.watchId = navigator.geolocation.watchPosition(position => {
            if (!this.isConnected)
                return;
            if (this.watchId !== undefined)
                navigator.geolocation.clearWatch(this.watchId);
            this.value = this.input.value = `POINT (${position.coords.longitude} ${position.coords.latitude})`;
            this.change();
        }, err => {
            if (this.watchId !== undefined)
                navigator.geolocation.clearWatch(this.watchId);
            console.warn("Geolocation error:", err);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }
    remove() {
        this.input.value = "";
        this.change();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.watchId !== undefined) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = undefined;
        }
    }
};
FzInputLocation = __decorate([
    t$4("fz-location")
], FzInputLocation);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputInteger = class FzInputInteger extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            if (isNumber(this.value)) {
                this.input.valueAsNumber = this.value;
            }
            else {
                this.input.value = "";
            }
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = isNumber(this.input.valueAsNumber) ? Math.floor(this.input.valueAsNumber) : undefined;
        }
    }
    renderInput() {
        return x `
            <div class="input-group">
                <input 
                    class="form-control ${this.validation}" 
                    type="number"  
                    id="input"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    @keypress="${this.keypress}"
                    min="${o(this.min)}"
                    max="${o(this.max)}"
                    step="1"
                    ?required="${this.required}"
                    autocomplete=off  spellcheck="false"
                />
            </div>`;
    }
    get max() {
        if (isNumber(this.schema?.maximum))
            return this.schema.maximum;
        if (isNumber(this.schema?.exclusiveMaximum))
            return this.schema.exclusiveMaximum;
        return;
    }
    get min() {
        if (isNumber(this.schema?.minimum))
            return this.schema.minimum;
        if (isNumber(this.schema?.exclusiveMinimum))
            return this.schema.exclusiveMinimum;
        return;
    }
    keypress(_event) {
        // if (!/[-0123456789]/.test(event.key)) return event.preventDefault();
        // if (this.min >= 0 && event.key === '-') return event.preventDefault();
        return;
    }
};
FzInputInteger = __decorate([
    t$4("fz-integer")
], FzInputInteger);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputConstant = class FzInputConstant extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            this.input.value = String(this.schema.const ?? "");
        }
    }
    toValue() {
        this.value = this.schema.const;
    }
    renderInput() {
        return x `<div class="input-group ${this.validation}">${this.value}</div>`;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.value !== this.schema.const)
            this.value = this.schema.const;
    }
};
FzInputConstant = __decorate([
    t$4("fz-const")
], FzInputConstant);

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}

let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}

const _state = {};
function v1(options, buf, offset) {
    let bytes;
    {
        const now = Date.now();
        const rnds = rng();
        updateV1State(_state, now, rnds);
        bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, _state.clockseq, _state.node, buf, offset);
    }
    return buf ?? unsafeStringify(bytes);
}
function updateV1State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.nsecs ??= 0;
    if (now === state.msecs) {
        state.nsecs++;
        if (state.nsecs >= 10000) {
            state.node = undefined;
            state.nsecs = 0;
        }
    }
    else if (now > state.msecs) {
        state.nsecs = 0;
    }
    else if (now < state.msecs) {
        state.node = undefined;
    }
    if (!state.node) {
        state.node = rnds.slice(10, 16);
        state.node[0] |= 0x01;
        state.clockseq = ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    }
    state.msecs = now;
    return state;
}
function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    nsecs ??= 0;
    clockseq ??= ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    node ??= rnds.slice(10, 16);
    msecs += 12219292800000;
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    buf[offset++] = (tl >>> 24) & 0xff;
    buf[offset++] = (tl >>> 16) & 0xff;
    buf[offset++] = (tl >>> 8) & 0xff;
    buf[offset++] = tl & 0xff;
    const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    buf[offset++] = (tmh >>> 8) & 0xff;
    buf[offset++] = tmh & 0xff;
    buf[offset++] = ((tmh >>> 24) & 0xf) | 0x10;
    buf[offset++] = (tmh >>> 16) & 0xff;
    buf[offset++] = (clockseq >>> 8) | 0x80;
    buf[offset++] = clockseq & 0xff;
    for (let n = 0; n < 6; ++n) {
        buf[offset++] = node[n];
    }
    return buf;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
var FzInputDoc_1;
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop options
 */
let FzInputDoc = class FzInputDoc extends FzInputBase {
    static { FzInputDoc_1 = this; }
    toField() {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "");
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : undefined;
        }
    }
    static docTypes = [
        // Documents images
        "image/png",
        "image/jpeg",
        "image/gif"
        // Documents texte
        ,
        "text/plain"
        // Documents PDF
        ,
        "application/pdf"
        // Documents Office Microsoft
        ,
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        // Documents Open Office
        ,
        "application/vnd.oasis.opendocument.text",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/vnd.oasis.opendocument.presentation",
        "application/vnd.oasis.opendocument.graphics"
    ];
    photoModal;
    url = '';
    filename;
    get hasPreview() {
        return !!this.schema.preview;
    }
    get mimetype() {
        return (this.schema.mimetype) ? this.schema.mimetype : FzInputDoc_1.docTypes.join(', ');
    }
    get store() {
        return this.form.store;
    }
    static get styles() {
        return [
            ...super.styles,
            i$5 `
                .fileUpload {
                    position: relative;
                    overflow: hidden;
                    margin: 0px;
                }
                .fileUpload input {
                    position: absolute !important;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: 0;
                    padding: 0;
                    cursor: pointer;
                    opacity: 0 !important;
                    filter: alpha(opacity=0) !important;
                }
                .img-preview {
                    width:100px;
                    height:auto;
                }
                .close-right {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    z-index: 10;
                    display: block;
                    padding: 0.25rem 0.5rem;
                    color: #818a91;
                    cursor: pointer;
                    background-color: transparent;
                    border: 0;
                    border-radius: 0.25rem;
                }
                `
        ];
    }
    renderInput() {
        return x `
            <fz-photo-dlg id=modal ></fz-photo-dlg>
            <div class="input-group">
                ${(this.url && this.hasPreview) ? x `
                    <div class="input-group-prepend" >
                        <img class="input-group-text img-preview" src="${this.url}" @click="${this.open}"/>
                    </div>` : null}
                ${(!this.isempty && !(this.url && this.hasPreview)) ? x `
                    <div class="input-group-prepend">
                        <span class="input-group-text"  @click="${this.open}"><i class="bi bi-eye"></i></span>
                    </div>` : null}
                <input class="form-control ${this.validation}"  type="text" spellcheck="false"
                    placeholder="photo, document, ..."
                    .value="${this.filename ?? ''}"
                    ?readonly="${this.readonly}" 
                    @mousedown="${(e) => e.preventDefault()}"
                    @paste="${(e) => e.preventDefault()}"
                    @input="${(e) => e.preventDefault()}"
                    @keypress="${(e) => e.preventDefault()}"
                    ?required="${this.required}"
                    autocomplete=off  spellcheck="false"
                />
                ${(this.isempty || this.readonly) ? x `` : x `
                    <button  @click="${this.delete}"  type="button" class="close-right btn-close" aria-label="Close"> </button>`}
                ${(!this.isempty || this.readonly) ? x `` : x `
                    <span class="input-group-text btn btn-primary" @click="${() => this.photoModal?.open()}" ><i class=" bi bi-camera"></i></span>
                    <span class="input-group-text fileUpload btn btn-primary">
                        <input type="file"
                            @change="${this.save}"
                            ?disabled="${this.readonly}" 
                            accept="${this.mimetype}"
                            class="btn-block"
                            autocomplete=off  spellcheck="false"/>
                        <i class="bi bi-file-earmark-richtext"></i>
                    </span>`}
            </div>`;
    }
    change() {
        super.change();
        this.requestUpdate();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    async firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.photoModal = this.shadowRoot?.querySelector('fz-photo-dlg') ?? undefined;
        this.listen(this.photoModal, 'close', evt => this.set(v1(), evt.detail.blob, "photo.png"));
        if (this.value != null) {
            const doc = await this.store.get(this.value);
            if (doc) {
                this.set(this.value, doc.blob, doc.filename);
            }
            else {
                this.dirty = true;
                this.localError = "document not found";
            }
        }
    }
    async open() {
        if (this.value == null)
            return;
        const doc = await this.store.get(this.value);
        let fileURL;
        if (doc) {
            fileURL = URL.createObjectURL(doc.blob);
        }
        else {
            const blob = new Blob([`FzForm ERROR: Couldn't open document uuid=${this.value}`], { type: "text/plain" });
            fileURL = URL.createObjectURL(blob);
        }
        window.open(fileURL);
    }
    setUrl(blob) {
        this.url = '';
        if (blob.type.startsWith('image')) {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (event) => {
                this.url = event.target?.result;
                this.requestUpdate();
            };
        }
    }
    async set(id, blob, filename) {
        if (!blob || !filename)
            return;
        if (this.value)
            await this.store.remove(this.value);
        this.filename = filename;
        this.value = id;
        this.setUrl(blob);
        if (this.value)
            await this.store.put(this.value, blob, this.filename, this.pointer);
        this.change();
    }
    async save(event) {
        await this.set(v1(), event.target.files[0], event.target.files[0].name);
    }
    async delete() {
        if (this.value)
            await this.store.remove(this.value);
        this.value = this.empty;
        this.url = "";
        this.filename = "";
        this.change();
    }
};
FzInputDoc = FzInputDoc_1 = __decorate([
    t$4("fz-doc")
], FzInputDoc);

let MD = null;
async function ensureMarkdownIt(usemarkdown) {
    const logger = FzLogger.get('lazy');
    if (isNull(MD) && usemarkdown) {
        logger.info('MarkdownIt loading');
        const mod = await import('./markdown-dynamic.js');
        MD = new mod.default({
            html: true, // Enable HTML tags in source
            xhtmlOut: false, // Use '/' to close single tags (<br />). This is only for full CommonMark compatibility.
            breaks: false, // Convert '\n' in paragraphs into <br>
            langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be useful for external highlighters.
            linkify: true, // Autoconvert URL-like text to links
            // Enable some language-neutral replacement + quotes beautification
            // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
            typographer: true,
            // Double + single quotes replacement pairs, when typographer enabled,
            // and smartquotes on. Could be either a String or an Array.
            //
            // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
            // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
            quotes: '""\'\'',
            // Highlighter function. Should return escaped HTML,
            // or '' if the source string is not changed and should be escaped externally.
            // If result starts with <pre... internal wrapper is skipped.
            highlight: function (_str, _lang) { return ''; }
        });
        patchAttr(MD, "table", "class", "table table-striped table-responsive");
        patchImg(MD, 100, 100);
        logger.info('MarkdownIt loaded');
    }
    if (!usemarkdown) {
        logger.info('MarkdownIt not required');
    }
}
function patchAttr(md, tagname, attrname, content) {
    // Save the original rendering rule for table_open (if any)
    const defaultRender = md.renderer.rules.table_open || function defRender(tokens, idx, options, _env, self) {
        return self.renderToken(tokens, idx, options);
    };
    md.renderer.rules[`${tagname}_open`] = (tokens, idx, options, env, self) => {
        // Get the current token for the <table> opening tag.
        const token = tokens[idx];
        // Check if there's already a class attribute, and append or create as necessary.
        const classIndex = token.attrIndex(attrname);
        if (classIndex < 0) {
            token.attrPush([attrname, content]); // add new attribute
        }
        else {
            if (token.attrs)
                token.attrs[classIndex][1] += ` ${content}`; // append new class
        }
        // Proceed with default rendering.
        return defaultRender(tokens, idx, options, env, self);
    };
}
function patchImg(md, width, height) {
    const defaultImageRender = md.renderer.rules.image ||
        function (tokens, idx, options, _env, self) {
            return self.renderToken(tokens, idx, options);
        };
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        // If no width/height is set, add defaults.
        if (!token.attrGet('width'))
            token.attrSet('width', `${width}`); // set default width
        if (!token.attrGet('height'))
            token.attrSet('height', `${height}`); // set default height
        return defaultImageRender(tokens, idx, options, env, self);
    };
}
let FzMarkdownIt = class FzMarkdownIt extends Base {
    markdown = "";
    static styles = [
        ...super.styles,
        i$5 `
            blockquote {
                padding: 10px 20px;
                margin: 0 0 20px;
                font-size: 17.5px;
                border-left: 5px solid #eee;
            }
            pre {
                display: block;
                padding: 9.5px;
                margin: 0 0 10px;
                font-size: 13px;
                line-height: 1.42857143;
                color: #333;
                word-break: break-all;
                word-wrap: break-word;
                background-color: #f5f5f5;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            pre code {
                padding: 0;
                font-size: inherit;
                color: inherit;
                white-space: pre-wrap;
                background-color: transparent;
                border-radius: 0;
            }
            code {
                padding: 2px 4px;
                font-size: 90%;
                color: #c7254e;
                background-color: #f9f2f4;
                border-radius: 4px;
            }
            h1,h2,h3,h4,h5,h6 {
                text-decoration: underline;
            }
        `
    ];
    async firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
    }
    render() {
        if (MD) {
            const rendered = MD.render(this.markdown);
            return x `${o$2(rendered)}`;
        }
        else {
            return x `<div> Loading ...</div>`;
        }
    }
    static async loadMarkdownIt(usemarkdown) {
        await ensureMarkdownIt(usemarkdown);
    }
};
__decorate([
    n$2({ attribute: "markdown", type: String, reflect: true })
], FzMarkdownIt.prototype, "markdown", void 0);
FzMarkdownIt = __decorate([
    t$4("markdown-it")
], FzMarkdownIt);

let FzInputMarkdown = class FzInputMarkdown extends FzInputBase {
    toField() {
        // markdown format doesnt affect field
        return;
    }
    toValue() {
        // markdown format doesnt affect value
        return;
    }
    renderInput() {
        return x ``;
    }
    renderField() {
        return x `
            <div class="form-group row ${this.validation}"><markdown-it .markdown="${this.value ?? ''}"></markdown-it></div>
        `;
    }
};
FzInputMarkdown = __decorate([
    t$4("fz-markdown")
], FzInputMarkdown);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputUuid = class FzInputUuid extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "");
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : this.empty;
        }
    }
    renderInput() {
        return x `
            <div class="input-group">
                <div class="form-control">${this.value}</div>
            </div>`;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.value == null)
            this.value = v1();
    }
};
FzInputUuid = __decorate([
    t$4("fz-uuid")
], FzInputUuid);

const fiedtypes = [
    "fz-array",
    'fz-enum-array',
    "fz-object",
    'fz-enum-check',
    'fz-enum-select',
    "fz-enum-typeahead",
    "fz-picker",
    "fz-boolean",
    "fz-color",
    "fz-const",
    "fz-date",
    "fz-datetime",
    "fz-doc",
    "fz-float",
    "fz-integer",
    "fz-location",
    "fz-location",
    "fz-mask",
    'fz-markdown',
    "fz-range",
    "fz-signature",
    "fz-string",
    "fz-textarea",
    "fz-time",
    "fz-uuid",
];
const fieldtypeslist = fiedtypes.join(',');
class FZCollection extends FzField {
    get fields() {
        const fields = [...this.shadowRoot?.querySelectorAll(fieldtypeslist) ?? []];
        return fields;
    }
    renderLabel() {
        const required = this.required ? '*' : '';
        const label = `${this.label}${required}`;
        // labels for object/array properties have collapse chevron
        return x `
            <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
                <div>${label}</div>
            </label>`;
    }
    /**
     * render an item of this field
     * - item may be property of object (property name found in this.name)
     * - item may be element of array (array index found in this.index)
     *
     * only one of them (this.name or this.index is valued).
     * this method is used by composed fields (fz-array and fz-object)
     * @param key
     */
    renderItem(schema, key) {
        let name = null;
        let index = null;
        if (!this.schema)
            return x ``;
        if (typeof key === 'string')
            name = key;
        if (typeof key === 'number')
            index = key;
        const data = (this.data == null) ? null : this.data[this.key];
        switch (schema.field) {
            case 'fz-enum-select': return x `<fz-enum-select .pointer="${this.pointer}/${key}" .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-select>`;
            case 'fz-enum-check': return x `<fz-enum-check .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-check>`;
            case "fz-date": return x `<fz-date .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-date>`;
            case "fz-time": return x `<fz-time .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-time>`;
            case "fz-datetime": return x `<fz-datetime .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-datetime>`;
            case "fz-textarea": return x `<fz-textarea .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-textarea>`;
            case "fz-string": return x `<fz-string .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-string>`;
            case "fz-mask": return x `<fz-mask .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-mask>`;
            case "fz-picker": return x `<fz-picker .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-picker>`;
            case "fz-signature": return x `<fz-signature .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-signature>`;
            case "fz-boolean": return x `<fz-boolean .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-boolean>`;
            case "fz-float": return x `<fz-float .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-float>`;
            case "fz-integer": return x `<fz-integer .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-integer>`;
            case "fz-range": return x `<fz-range .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-range>`;
            case "fz-location": return x `<fz-location .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-location>`;
            case "fz-array": return x `<fz-array .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-array>`;
            case "fz-object": return x ` <fz-object .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-object>`;
            case "fz-const": return x ` <fz-const .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-const>`;
            case "fz-enum-array": return x ` <fz-enum-array .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-array>`;
            case "fz-doc": return x ` <fz-doc .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-doc>`;
            case "fz-uuid": return x ` <fz-uuid .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-uuid>`;
            case "fz-markdown": return x ` <fz-markdown .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-markdown>`;
            case "fz-enum-typeahead": return x ` <fz-enum-typeahead .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-typeahead>`;
            case "fz-color": return x ` <fz-color .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-color>`;
            case 'fz-error':
            default: return x `<div class="alert alert-warning" role="alert">field name=${name} type ${schema.basetype}/${schema.field} not implemented !</div>`;
        }
    }
    renderItemErrors(index) {
        const errors = this.form.errors(`${this.pointer}/${index}`);
        return x `
            <span id="error" class="error-message error-truncated">
                ${errors.join(', ')}
            </span>`;
    }
    /**
     * when asked for focus , set focus to first field of the collection
     */
    focus() {
        if (this.fields.length > 0) {
            const first = this.fields[0];
            first.dofocus();
        }
    }
    delete() {
        this.value = this.empty;
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
    }
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzArray$1 = class FzArray extends FZCollection {
    #current_accessor_storage = null;
    get current() { return this.#current_accessor_storage; }
    set current(value) { this.#current_accessor_storage = value; }
    schemas = [];
    currentSchema;
    toField() {
        // all is done at rendering
    }
    toValue() {
        // items are updated but array reference doesn't change 
    }
    connectedCallback() {
        super.connectedCallback();
        this.listen(this, 'toggle-item', evt => (this.close(), this.eventStop(evt)));
    }
    requestUpdate(name, oldvalue) {
        super.requestUpdate(name, oldvalue);
    }
    get collapsed() {
        return !isArray(this.value, true) || super.collapsed;
    }
    /**
    * render collapsed Object
    */
    renderCollapsed() {
        return x `
            <div class="form-group row space-before" @click=${this.labelClicked}>
                ${this.renderLabel()}
                <div class="col-sm-9">
                    <div class="input-group ${this.validation}" @click="${this.toggle}" >
                        <div class="form-control">
                            ${isArray(this.value, true) ? x `${this.chevron()} ${this.abstract()}` : this.actionBtns()}
                        </div>
                    </div>
                </div>
            </div>
            ${this.renderErrors()}
        `;
    }
    labelClicked(evt) {
        this.toggle(evt);
    }
    renderField() {
        // always process order and schemas before rendering
        this.order();
        this.solveSchemas();
        if (this.collapsed)
            return this.renderCollapsed();
        const lines = this.value?.map((_i, i) => (this.current === i) ? this.editableItem(i) : this.staticItem(i)) ?? [];
        const hidelabel = this.isroot || this.label === '';
        return x `
            <div class="space-before">
                <div class="form-group row ${when(hidelabel, 'd-none')}">
                    ${this.renderLabel()}
                    <div class="col-sm-1 d-none d-sm-block">
                        <div class="input-group ${this.validation}" @click="${this.toggle}" >
                            <div class="form-control border-0">${this.chevron()}</i></div>
                        </div>
                    </div>
                </div>
                <div class="space-after ${when(!hidelabel, 'line-after line-before')}"> 
                    <ul id="content" class="list-group">${lines}</ul>
                </div>
                ${this.renderErrors()}
                <div class="form-group row space-before " @click="${this.close}">
                    ${this.actionBtns()}
                </div>
            </div>
        `;
    }
    /**
     * render the array action buttion (add / type select)
     */
    actionBtns() {
        if (this.readonly)
            return '';
        const addBtn = x `
            <button 
                type="button" 
                @click="${this.add}" 
                class="btn btn-primary btn-sm col-sm-1"
                >
                <b>+</b>
            </button>`;
        const typeSelect = this.schema.homogeneous ? '' : x `
            <div class="btn-group" style="float:right" role="group">
                <button 
                    id="btnGroupDrop1" 
                    type="button"
                    @click="${this.toggleDropdown}" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                    class="btn btn-primary dropdown-toggle btn-sm"
                >${this.currentSchema?.title || "Ajouter"}</button> 
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    ${this.schema.items?.oneOf?.map((schema, i) => x `
                        <a class="dropdown-item" @click="${() => this.selectSchema(i)}" >${schema.title || "Type" + i}</a>
                    `)}
                </div>
            </div>`;
        return [addBtn, typeSelect];
    }
    /**
     * render the static flavour of an array item(abstracted)
     */
    staticItem(index) {
        return x `
        <li 
                id="${index}"
                draggable="true" 
                @dragstart="${(evt) => this.drag(index, evt)}"
                @dragover="${this.allowDrop}"
                @drop="${this.drop}"   
                @click="${(evt) => this.open(index, evt)}"              
                class="list-group-item"
            >
            ${this.badge(index)}
            ${this.abstract(index, this.schemas[index])}            
            ${this.delBtn(index)}
            <div>${this.renderItemErrors(index)}</div>
        </li>`;
    }
    /**
     * render the editable flavour of an array item(abstracted)
     */
    editableItem(index) {
        return x `
            <li class="list-group-item">
                ${this.renderItem(this.schemas[index], index)} 
            </li>`;
    }
    /**
     * render the delete button for item
     */
    delBtn(index) {
        if (this.readonly)
            return '';
        return x `<div 
            @click="${(evt) => this.del(index, evt)}" 
            style="float:right;cursor: pointer;:" 
            aria-label="Close">
                <i class="bi bi-trash"></i>
            </div>`;
    }
    focusout() {
        this.close();
    }
    open(index, evt) {
        if (this.current === index) {
            this.close();
        }
        else {
            this.current = index;
            this.dofocus();
        }
        this.eventStop(evt);
    }
    close(evt) {
        this.eventStop(evt);
        this.current = null;
        this.change();
    }
    drag(index, ev) {
        if (ev.dataTransfer) {
            ev.dataTransfer.setData('text', index.toString());
        }
        else if (ev.originalEvent.dataTransfer) {
            ev.originalEvent.dataTransfer.setData('text', index.toString());
        }
        this.current = null;
        this.requestUpdate();
    }
    drop(ev) {
        if (ev.dataTransfer) {
            const from = parseInt(ev.dataTransfer.getData("text"), 10);
            const to = parseInt(ev.target.id);
            this.value.splice(to, 0, this.value.splice(from, 1)[0]);
            this.schemas.splice(to, 0, this.schemas.splice(from, 1)[0]);
            this.requestUpdate();
        }
        this.eventStop(ev);
    }
    allowDrop(ev) {
        ev.preventDefault();
    }
    del(index, evt) {
        this.value.splice(index, 1);
        this.schemas.splice(index, 1);
        this.current = null;
        this.change();
        this.eventStop(evt);
    }
    add(evt) {
        if (!this.currentSchema)
            return;
        if (!isArray(this.value))
            this.value = [];
        const value = this.currentSchema._default(this.data);
        this.value.push(value);
        this.schemas.push(this.currentSchema);
        this.open(this.value.length - 1);
        this.change();
        this.eventStop(evt);
    }
    toggleDropdown() {
        const display = this.shadowRoot?.querySelector(".dropdown-menu")?.style.display;
        display == "block" ? this.closeDropdown() : this.openDropdown();
    }
    closeDropdown() {
        const elem = this.shadowRoot?.querySelector(".dropdown-menu");
        if (elem != null) {
            elem.style.display = "none";
        }
    }
    openDropdown() {
        const elem = this.shadowRoot?.querySelector(".dropdown-menu");
        if (elem != null) {
            elem.style.display = "block";
        }
    }
    selectSchema(index) {
        this.currentSchema = this.schema.items?.oneOf?.[index];
        this.closeDropdown();
        this.requestUpdate();
    }
    /**
     * calculate schema for each item
     */
    solveSchemas(force = false) {
        if (!isObject(this.schema?.items))
            return;
        if (!force && this.currentSchema && this.schemas)
            return;
        if (!this.currentSchema)
            this.currentSchema = this.schema.homogeneous ? this.schema.items : (this.schema.items.oneOf?.[0] ?? EMPTY_SCHEMA);
        this.schemas = this.value == null ? [] : this.schema.homogeneous
            ? this.value.map(() => this.schema.items)
            : this.value.map((value) => getSchema(value) ?? this.schema.items?.oneOf?.find((schema) => isFunction(schema.case) && schema.case(EMPTY_SCHEMA, value, this.data, this.key, this.derefFunc, this.form.options.userdata)));
    }
    /**
     * calculate ordering of the items
     */
    order() {
        if (!isArray(this.value))
            return;
        const current = this.value;
        const orderedidx = current.map((_x, i) => i).sort((ia, ib) => {
            const va = this.evalExpr("rank", this.schemas[ia], current[ia], this.value, ia);
            const vb = this.evalExpr("rank", this.schemas[ib], current[ib], this.value, ib);
            switch (true) {
                case (va === vb): return 0;
                case (va == null): return -1;
                case (vb == null): return 1;
                case (va > vb): return 1;
                case (va < vb): return -1;
                default: return 0;
            }
        });
        const schemas = this.schemas.map(x => x);
        const values = current.map(x => x);
        for (let i = 0; i < orderedidx.length; i++) {
            this.schemas[i] = schemas[orderedidx[i]];
            this.value[i] = values[orderedidx[i]];
        }
    }
};
__decorate([
    n$2({ attribute: false })
], FzArray$1.prototype, "current", null);
FzArray$1 = __decorate([
    t$4("fz-array")
], FzArray$1);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzObject = class FzObject extends FZCollection {
    #activegroup_accessor_storage = {};
    get activegroup() { return this.#activegroup_accessor_storage; }
    set activegroup(value) { this.#activegroup_accessor_storage = value; }
    seen;
    toField() {
        // all is done at rendering
    }
    toValue() {
        // properties are updated but object reference doesn't change 
    }
    /**
     * render collapsed Object
     */
    renderCollapsed() {
        return x `
            <div class="form-group row space-before">
                ${this.renderLabel()}
                <div class="col-sm-9">
                    <div class="input-group ${this.validation}" @click="${this.toggle}" >
                        <div class="form-control">${this.chevron()} ${this.abstract()}</div>
                    </div>
                </div>
            </div>
            ${this.renderErrors()}
        `;
    }
    renderSingle(itemTemplates, fields, fieldpos) {
        // render single item
        const fieldname = fields[fieldpos].fieldname;
        const schema = this.schema.properties?.[fieldname];
        itemTemplates.push(schema ? this.renderItem(schema, fieldname) : x ``);
        fieldpos += 1;
        return fieldpos;
    }
    renderGroup(itemTemplates, fields, fieldpos) {
        const group = [];
        const groupnum = fields[fieldpos].groupnum;
        const groupname = fields[fieldpos].groupname;
        // render group items
        for (; fieldpos < fields.length && groupnum === fields[fieldpos].groupnum; fieldpos++) {
            const fieldname = fields[fieldpos].fieldname;
            const schema = this.schema.properties?.[fieldname];
            group.push(schema ? this.renderItem(schema, fieldname) : x ``);
        }
        // render group
        itemTemplates.push(x `
                <div class="card shadow" style="margin-bottom:5px">
                    <div class="card-header d-flex justify-content-between align-items-center">${groupname}</div>
                    <div class="card-body">${group}</div>
                </div>`);
        return fieldpos;
    }
    renderTabGroup(itemTemplates, fields, fieldpos) {
        const group = [];
        const groupnum = fields[fieldpos].groupnum;
        const groupname = fields[fieldpos].groupname;
        const tabname = fields[fieldpos].tabname;
        // render group items
        for (; fieldpos < fields.length && groupnum === fields[fieldpos].groupnum; fieldpos++) {
            const fieldname = fields[fieldpos].fieldname;
            const schema = this.schema.properties?.[fieldname];
            const hidden = this.activegroup[tabname] !== groupname;
            group.push(x `<div 
                        class="tab-pane active container" 
                        style="margin:0;max-width:100%"  
                        id="content" 
                        ?hidden="${hidden}" 
                        data-tabname="${tabname}" 
                        data-groupname="${groupname}">
                        ${schema ? this.renderItem(schema, fieldname) : ''}
                    </div>`);
        }
        // render group
        itemTemplates.push(x `${group}`);
        return fieldpos;
    }
    renderTab(itemTemplates, fields, fieldpos) {
        const tab = [];
        const tabnum = fields[fieldpos].tabnum;
        const tabname = fields[fieldpos].tabname;
        const firstpos = fieldpos;
        this.activegroup[tabname] = fields[fieldpos].groupname;
        while (fieldpos < fields.length && tabnum === fields[fieldpos].tabnum) {
            fieldpos = this.renderTabGroup(tab, fields, fieldpos);
        }
        const mapgroup = {};
        for (let i = firstpos; i < fieldpos; i++) {
            const groupname = fields[i].groupname;
            mapgroup[groupname] = 1;
        }
        const groupnames = Object.keys(mapgroup);
        // render tab headers
        itemTemplates.push(x `<ul class="nav nav-tabs" id="content">
                ${groupnames.map(groupname => x `<li class="nav-item">
                        <a class="nav-link" data-tabname="${tabname}" data-groupname="${groupname}" @click="${this.toggleTab}" aria-current="page" href="#" data-toggle="tab" href="#${groupname}">${groupname}</a>
                    </li>`)}
            </ul>`);
        // render tab contents
        itemTemplates.push(x `<div class="tab-content border border-top-0" id="content" style="padding-bottom:5px;margin-bottom:5px">${tab}</div>`);
        return fieldpos;
    }
    renderField() {
        if (!this.schema?.properties)
            return x ``;
        if (this.collapsed)
            return this.renderCollapsed();
        const itemTemplates = [];
        const fields = this.schema.order;
        let fieldpos = 0;
        while (fields && fieldpos < fields.length) {
            const current = fields[fieldpos];
            if (current.tabname && current.groupname) {
                fieldpos = this.renderTab(itemTemplates, fields, fieldpos);
            }
            else if (current.groupname) {
                fieldpos = this.renderGroup(itemTemplates, fields, fieldpos);
            }
            else {
                fieldpos = this.renderSingle(itemTemplates, fields, fieldpos);
            }
        }
        // item case (this field is item of an array)
        if (this.isItem) {
            return (this.label === "")
                ? x `<div>${this.renderLabel()}</div>${itemTemplates}`
                : x `<div ?hidden="${this.collapsed}" > ${itemTemplates} </div>`;
        }
        // property case (this field is part of object.values())
        const hidelabel = this.isroot || this.label === '';
        return x `
            <div class="space-before">
                <div class="form-group row ${when(hidelabel, 'd-none')}">
                    ${this.renderLabel()}
                    <div class="col-sm-1 d-none d-sm-block">
                        <div class="input-group ${this.validation}" @click="${this.toggle}" >
                            <div class="form-control border-0">${this.chevron()}</div>
                        </div>
                    </div>
                </div>
                <div ?hidden="${this.collapsed}" class="space-after ${when(!hidelabel, 'line-after line-before')}"> 
                    ${itemTemplates} 
                </div>
                ${this.renderErrors()}
            </div>
        `;
    }
    isRequiredProperty(name) {
        return !!this.schema.required?.includes(name);
    }
    labelClicked(evt) {
        if (this.isItem) {
            this.dispatchEvent(new CustomEvent('toggle-item', {
                detail: {
                    field: this
                },
                bubbles: true,
                composed: true
            }));
        }
        else {
            this.toggle(evt);
        }
        super.labelClicked(evt);
    }
    toggleTab(evt) {
        const elem = evt.target;
        const tabname = elem.getAttribute("data-tabname");
        const groupname = elem.getAttribute("data-groupname");
        const tabs = elem.parentElement?.parentElement;
        const childs = tabs?.querySelectorAll('a') ?? [];
        for (const item of childs)
            item.classList.remove("active");
        elem.classList.add("active");
        this.activegroup[tabname] = groupname;
        const content = tabs.nextElementSibling;
        const panes = content?.querySelectorAll('.tab-pane') ?? [];
        if (panes) {
            for (const item of panes) {
                item.hidden = item.getAttribute("data-groupname") !== groupname ? true : false;
            }
        }
        this.eventStop(evt);
    }
};
__decorate([
    n$2({ attribute: false })
], FzObject.prototype, "activegroup", null);
FzObject = __decorate([
    t$4("fz-object")
], FzObject);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {I:t}=Z,s=()=>document.createComment(""),r=(o,i,n)=>{const e=o._$AA.parentNode,l=void 0===i?o._$AB:i._$AA;if(void 0===n){const i=e.insertBefore(s(),l),c=e.insertBefore(s(),l);n=new t(i,c,o,o.options);}else {const t=n._$AB.nextSibling,i=n._$AM,c=i!==o;if(c){let t;n._$AQ?.(o),n._$AM=o,void 0!==n._$AP&&(t=o._$AU)!==i._$AU&&n._$AP(t);}if(t!==l||c){let o=n._$AA;for(;o!==t;){const t=o.nextSibling;e.insertBefore(o,l),o=t;}}}return n},v=(o,t,i=o)=>(o._$AI(t,i),o),u$1={},m=(o,t=u$1)=>o._$AH=t,p=o=>o._$AH,M=o=>{o._$AP?.(false,true);let t=o._$AA;const i=o._$AB.nextSibling;for(;t!==i;){const o=t.nextSibling;t.remove(),t=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c=e$2(class extends i$1{constructor(e){if(super(e),e.type!==t$1.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.dt(e,s,t).values}update(s,[t,r$1,c]){const d=p(s),{values:p$1,keys:a}=this.dt(t,r$1,c);if(!Array.isArray(d))return this.ut=a,p$1;const h=this.ut??=[],v$1=[];let m$1,y,x=0,j=d.length-1,k=0,w=p$1.length-1;for(;x<=j&&k<=w;)if(null===d[x])x++;else if(null===d[j])j--;else if(h[x]===a[k])v$1[k]=v(d[x],p$1[k]),x++,k++;else if(h[j]===a[w])v$1[w]=v(d[j],p$1[w]),j--,w--;else if(h[x]===a[w])v$1[w]=v(d[x],p$1[w]),r(s,v$1[w+1],d[x]),x++,w--;else if(h[j]===a[k])v$1[k]=v(d[j],p$1[k]),r(s,d[x],d[j]),j--,k++;else if(void 0===m$1&&(m$1=u(a,k,w),y=u(h,x,j)),m$1.has(h[x]))if(m$1.has(h[j])){const e=y.get(a[k]),t=void 0!==e?d[e]:null;if(null===t){const e=r(s,d[x]);v(e,p$1[k]),v$1[k]=e;}else v$1[k]=v(t,p$1[k]),r(s,d[x],t),d[e]=null;k++;}else M(d[j]),j--;else M(d[x]),x++;for(;k<=w;){const e=r(s,v$1[w+1]);v(e,p$1[k]),v$1[k++]=e;}for(;x<=j;){const e=d[x++];null!==e&&M(e);}return this.ut=a,m(s,v$1),T}});

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzArray = class FzArray extends FZCollection {
    static get styles() {
        return [
            ...super.styles,
            i$5 `
                ul {
                    max-height: 300px; 
                    overflow-y: scroll
                }
            `
        ];
    }
    toField() {
        // all is done at rendering
    }
    toValue() {
        // items are updated but array reference doesn't change 
    }
    renderCollapsed() {
        return this.renderField();
    }
    renderField() {
        return x `
            <div class="form-group row">
                ${this.renderLabel()}
                <div class="col-sm">
                    <ul id="content" class="list-group" >
                        ${c(this.getItems(), (item) => item, (item) => x `
                                <li class="list-group-item">
                                    <div>
                                        <input
                                            type="checkbox"
                                            ?disabled="${this.readonly}"
                                            ?checked="${this.value?.includes(item.value)}"
                                            @click="${() => this.toggleItem(item.value)}"
                                            class="form-check-input"
                                            autocomplete=off  spellcheck="false"
                                        />
                                        <label class="form-check-label">${item.label}</label>
                                    </div>
                                </li>`)}
                    </ul>
                </div>
            </div>`;
    }
    toggleItem(value) {
        if (this.value == null)
            this.value = [];
        if (this.value.includes(value)) {
            const pos = this.value.indexOf(value);
            if (pos >= 0)
                this.value.splice(pos, 1);
        }
        else {
            this.value.push(value);
        }
    }
    getItems() {
        const enums = this.schema.items?.enum;
        const data = this.data;
        if (enums) {
            return enums.reduce((list, value) => {
                const ok = this.evalExpr('filter', this.schema.items, value, data[this.key], -1);
                if (ok)
                    list.push({ label: String(value), value });
                return list;
            }, []);
        }
        const consts = this.schema.items?.oneOf;
        if (consts)
            return consts.reduce((list, type) => {
                const ok = this.evalExpr('filter', type, type.const, this.data[this.key], -1);
                if (ok)
                    list.push({ label: type.title ?? type.description ?? type.const, value: type.const });
                return list;
            }, []);
        return [];
    }
};
FzArray = __decorate([
    t$4("fz-enum-array")
], FzArray);

let FzDialog = class FzDialog extends Base {
    modal;
    backdrop;
    validable = false;
    #modalTitle_accessor_storage = "Dialogue";
    get modalTitle() { return this.#modalTitle_accessor_storage; }
    set modalTitle(value) { this.#modalTitle_accessor_storage = value; }
    #okLabel_accessor_storage = "Valider";
    get okLabel() { return this.#okLabel_accessor_storage; }
    set okLabel(value) { this.#okLabel_accessor_storage = value; }
    #dismissLabel_accessor_storage = "Annuler";
    get dismissLabel() { return this.#dismissLabel_accessor_storage; }
    set dismissLabel(value) { this.#dismissLabel_accessor_storage = value; }
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            .modal-body {
                max-height: 75vh; min-height: 50vh; overflow-y: auto;
            }`
        ];
    }
    render() {
        return x `
            <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" >${this.modalTitle}</h5>
                            <button type="button" class="btn btn-secondary " aria-label="Close"  @click="${this.dismiss}">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                        <div class="modal-footer">
                            <button ?disabled="${!this.validable}" type="button" class="btn btn-primary" @click="${this.validate}">${this.okLabel}</button>
                            <button type="button" class="btn btn-danger" @click="${this.dismiss}" >${this.dismissLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="backdrop"  style="display: none;" @click="${this.dismiss}"></div>`;
    }
    get isOpen() {
        return this.modal?.classList.contains("show");
    }
    firstUpdated() {
        this.modal = this.shadowRoot?.getElementById('modal');
        this.backdrop = this.shadowRoot?.getElementById('backdrop');
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.modal = undefined;
        this.backdrop = undefined;
        this.validable = undefined;
        this.modalTitle = undefined;
        this.okLabel = undefined;
        this.dismissLabel = undefined;
    }
    open() {
        if (this.backdrop)
            this.backdrop.style.display = "block";
        if (this.modal) {
            this.modal.style.display = "block";
            this.modal.classList.add("show");
        }
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('fz-dialog-open', { detail: {} }));
    }
    close() {
        if (this.backdrop)
            this.backdrop.style.display = "none";
        if (this.modal) {
            this.modal.style.display = "none";
            this.modal.classList.remove("show");
        }
    }
    validate(evt) {
        this.close();
        evt.preventDefault();
        evt.stopPropagation();
        this.dispatchEvent(new CustomEvent('close', { detail: { dismissed: false } }));
    }
    dismiss(evt) {
        this.close();
        evt.preventDefault();
        evt.stopPropagation();
        this.dispatchEvent(new CustomEvent('close', { detail: { dismissed: true } }));
    }
    valid(validable = true) {
        this.validable = validable;
        this.requestUpdate();
    }
};
__decorate([
    n$2({ attribute: 'modal-title' })
], FzDialog.prototype, "modalTitle", null);
__decorate([
    n$2({ attribute: 'ok-label' })
], FzDialog.prototype, "okLabel", null);
__decorate([
    n$2({ attribute: 'dismiss-label' })
], FzDialog.prototype, "dismissLabel", null);
FzDialog = __decorate([
    t$4("fz-dialog")
], FzDialog);

var ModalState;
(function (ModalState) {
    ModalState[ModalState["notready"] = 0] = "notready";
    ModalState[ModalState["scanning"] = 1] = "scanning";
    ModalState[ModalState["done"] = 2] = "done";
    ModalState[ModalState["fail"] = 3] = "fail";
})(ModalState || (ModalState = {}));
const Barcodes = [
    'code_128', 'code_39', 'code_93', 'codabar', 'ean_13', 'ean_8',
    'itf', 'pdf417', 'upc_a', 'upc_e', 'aztec', 'data_matrix', 'qr_code'
];
let FzBarcodeDialog = class FzBarcodeDialog extends Base {
    detector;
    code;
    #state_accessor_storage = ModalState.notready;
    get state() { return this.#state_accessor_storage; }
    set state(value) { this.#state_accessor_storage = value; }
    modal;
    video;
    status = "Initializing";
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            div {
                color: black
            }
            `
        ];
    }
    render() {
        return x `
            <fz-dialog modal-title="Scanner un codebar" @click="${this.stopEvent}" @close="${this.close}" > 
                <div class="row">
                    <video  class=col autoplay style="display:block" .title="${this.status}">Chargement en cours ...</video>
                </div>
                <div class="btn-toolbar m-3 row" role="toolbar">
                    <button class="btn btn-primary col m-1" ?disabled="${!this.code}" @click="${this.scan}"><i class="bi bi-upc-scan"></i></button>
                </div>
                <div>${this.status}</div>
            </fz-dialog>
            `;
    }
    stopEvent(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }
    close(evt) {
        if (this.video) {
            this.video?.pause();
            this.video.srcObject = null;
        }
        const detail = evt.detail;
        if (!evt.detail.dismissed)
            evt.detail.code = this.code;
        this.dispatchEvent(new CustomEvent("close", { detail }));
        this.modal?.valid(false);
    }
    firstUpdated() {
        // create new detector
        if (BarcodeDetector) {
            this.detector = new BarcodeDetector({ formats: Barcodes });
        }
        this.modal = this.shadowRoot?.querySelector('fz-dialog');
        this.video = this.shadowRoot?.querySelector('video');
        if (this.video)
            this.listen(this.video, "play", _ => this.scan());
    }
    async initCamera() {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { exact: "environment" } }
            });
            if (this.video) {
                this.video.srcObject = mediaStream;
            }
        }
        catch (err) {
            this.status = `Unable to initialize Camera : ${String(err)}`;
        }
    }
    scan() {
        this.setState(ModalState.scanning);
        const render = async () => {
            try {
                const barcodes = await this.detector.detect(this.video);
                barcodes.filter((bc) => bc.rawValue).forEach((bc) => {
                    this.code = bc.rawValue;
                    this.setState(ModalState.done);
                });
            }
            catch (e) {
                console.error(String(e));
            }
        };
        const renderLoop = () => {
            if (this.state !== ModalState.scanning)
                return;
            requestAnimationFrame(renderLoop);
            render();
        };
        renderLoop();
    }
    async open() {
        this.setState(ModalState.notready);
        if (this.modal)
            this.modal.open();
        await this.initCamera();
    }
    setState(state) {
        this.state = state;
        this.modal?.valid(false);
        switch (state) {
            case ModalState.fail:
                this.status = `${this.state} ⇨ Pas de flux video`;
                break;
            case ModalState.notready:
                this.status = `${this.state} ⇨ En initialisation`;
                break;
            case ModalState.scanning:
                this.status = `${this.state} ⇨ Scannez`;
                break;
            case ModalState.done:
                this.status = `${this.state} ⇨ Resultat: ${this.code}`;
                this.modal?.valid(true);
                break;
        }
    }
};
__decorate([
    r$4()
], FzBarcodeDialog.prototype, "state", null);
FzBarcodeDialog = __decorate([
    t$4("fz-barcode-dlg")
], FzBarcodeDialog);

var PhotoState;
(function (PhotoState) {
    PhotoState[PhotoState["notready"] = 0] = "notready";
    PhotoState[PhotoState["video"] = 1] = "video";
    PhotoState[PhotoState["lowres"] = 2] = "lowres";
    PhotoState[PhotoState["hires"] = 3] = "hires";
})(PhotoState || (PhotoState = {}));
let FzPhotoDlg = class FzPhotoDlg extends Base {
    #state_accessor_storage = PhotoState.video;
    get state() { return this.#state_accessor_storage; }
    set state(value) { this.#state_accessor_storage = value; }
    modal;
    video;
    canvas;
    imageCapture;
    imageBitmap;
    status = "Initializing";
    get isVideo() { return this.state === PhotoState.video; }
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            div {
                color: black
            }
            `
        ];
    }
    render() {
        return x `
            <fz-dialog modal-title="Prendre une photo ..." @click="${this.stopEvent}" @close="${this.close}" > 
                <div class="row">
                    <video  class=col autoplay style="display:block" .title="${this.status}">Chargement en cours ...</video>
                </div>
                <div class="row">
                    <canvas class=col id='canvas' style="display:none" ></canvas>
                </div>
                <div class="btn-toolbar m-3 row" role="toolbar">
                        <button class="btn btn-primary col m-1" ?disabled="${this.isVideo}" @click="${this.retry}"><i class="bi bi-arrow-counterclockwise"></i></button>
                        <button class="btn btn-primary col m-1" ?disabled="${!this.isVideo}" @click="${this.takePhotoLowres}"><i class="bi bi-camera"></i><sup> - </sup></button>
                        <button class="btn btn-primary col m-1" ?disabled="${!this.isVideo}" @click="${this.takePhotoHires}"><i class="bi bi-camera"></i><sup> + </sup></button>
               </div>
            </fz-dialog>
            `;
    }
    stopEvent(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }
    close(evt) {
        if (this.video) {
            this.video?.pause();
            this.video.srcObject = null;
            this.imageCapture?.track.stop();
        }
        const detail = evt.detail;
        this.canvas?.toBlob((blob) => {
            if (!blob)
                return;
            const url = URL.createObjectURL(blob);
            if (!evt.detail.dismissed) {
                evt.detail.imageBitmap = this.imageBitmap;
                evt.detail.url = url;
                evt.detail.blob = blob;
            }
            this.dispatchEvent(new CustomEvent("close", { detail }));
            this.imageBitmap = undefined;
            this.modal?.valid(false);
        }, "image/png", 0.80);
    }
    firstUpdated() {
        this.modal = this.shadowRoot?.querySelector('fz-dialog');
        this.video = this.shadowRoot?.querySelector('video');
        this.canvas = this.shadowRoot?.querySelector('canvas');
    }
    getUserMedia() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(mediaStream => {
            if (this.video) {
                this.video.srcObject = mediaStream;
                const track = mediaStream.getVideoTracks()[0];
                this.imageCapture = new ImageCapture(track);
                this.setState(PhotoState.video);
            }
        })
            .catch(error => this.status = `Unable to initialize Camera : ${String(error)}`);
    }
    retry(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.imageBitmap = undefined;
        this.modal?.valid(false);
        this.setState(PhotoState.video);
    }
    takePhotoLowres(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.imageCapture) {
            this.imageCapture.grabFrame()
                .then((imageBitmap) => {
                this.imageBitmap = imageBitmap;
                this.modal?.valid(true);
                this.drawCanvas();
                this.setState(PhotoState.lowres);
            })
                .catch((error) => this.status = `Unable to grab Lowres photo : ${String(error)}`);
        }
    }
    takePhotoHires(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.imageCapture) {
            this.imageCapture.takePhoto()
                .then((blob) => createImageBitmap(blob))
                .then((imageBitmap) => {
                this.imageBitmap = imageBitmap;
                this.modal?.valid(true);
                this.drawCanvas();
                this.setState(PhotoState.hires);
            })
                .catch((error) => this.status = `Unable to grab Hires photo : ${String(error)}`);
        }
    }
    drawCanvas() {
        if (!this.canvas || !this.video || !this.imageBitmap)
            return;
        this.canvas.width = this.video.offsetWidth;
        this.canvas.height = this.video.offsetHeight;
        const ratio = Math.min(this.canvas.width / this.imageBitmap.width, this.canvas.height / this.imageBitmap.height);
        const x = (this.canvas.width - this.imageBitmap.width * ratio) / 2;
        const y = (this.canvas.height - this.imageBitmap.height * ratio) / 2;
        this.canvas.getContext('2d')?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.getContext('2d')?.drawImage(this.imageBitmap, 0, 0, this.imageBitmap.width, this.imageBitmap.height, x, y, this.imageBitmap.width * ratio, this.imageBitmap.height * ratio);
    }
    open() {
        this.setState(PhotoState.notready);
        if (this.modal)
            this.modal.open();
        this.getUserMedia();
    }
    setState(state) {
        if (this.video && this.canvas) {
            switch (state) {
                case PhotoState.notready:
                    this.video.style.display = 'block';
                    this.canvas.style.display = 'none';
                    this.status = 'NOTREADY';
                    break;
                case PhotoState.video:
                    this.video.style.display = 'block';
                    this.canvas.style.display = 'none';
                    this.status = 'VIDEO';
                    break;
                case PhotoState.lowres:
                    this.video.style.display = 'none';
                    this.canvas.style.display = 'block';
                    this.status = `IMAGE LOWRES : ${this.imageBitmap?.width} x ${this.imageBitmap?.height} px`;
                    break;
                case PhotoState.hires:
                    this.video.style.display = 'none';
                    this.canvas.style.display = 'block';
                    this.status = `IMAGE HIRES : ${this.imageBitmap?.width} x ${this.imageBitmap?.height} px`;
                    break;
            }
        }
        this.state = state;
    }
};
__decorate([
    r$4()
], FzPhotoDlg.prototype, "state", null);
FzPhotoDlg = __decorate([
    t$4("fz-photo-dlg")
], FzPhotoDlg);

let FzItemDlg = class FzItemDlg extends Base {
    #reference_accessor_storage;
    get reference() { return this.#reference_accessor_storage; }
    set reference(value) { this.#reference_accessor_storage = value; }
    modal;
    arraySchema;
    itemSchema;
    array;
    index;
    pointer;
    refname;
    static get styles() {
        return [
            ...super.styles,
            i$5 `
            div {
                color: black
            }
            `
        ];
    }
    render() {
        return x `
            <fz-dialog modal-title="Ajouter un element ..." @click="${this.stopEvent}" @close="${this.close}" > 
                ${(this.itemSchema != null || this.arraySchema?.items?.oneOf == null) ? '' :
            x `<div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle btn-sm"
                        @click="${this.toggleDropdown}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${"Choose type"}
                    </button> 
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        ${this.arraySchema?.items.oneOf.map((schema, i) => x `<a class="dropdown-item"
                        @click="${() => this.addItem(schema)}" >${schema.title || "Type" + i}</a>`)}
                    </div>
                </div>`}
                ${this.itemSchema == null
            ? '' :
            x `<fz-object id="form-object" .pointer="${this.pointer}/${this.index}"  .schema="${this.itemSchema}" .name="${undefined}" .index="${this.index}" .data="${this.array}"></fz-object>`}
            </fz-dialog>`;
    }
    updated(_changedProperties) {
        if (this.reference) {
            this.pointer = this.reference?.pointer;
            this.array = this.reference?.target;
            this.refname = this.reference?.name;
            this.arraySchema = getSchema(this.array);
        }
        else {
            this.pointer = undefined;
            this.array = undefined;
            this.refname = undefined;
            this.arraySchema = undefined;
            this.itemSchema = undefined;
        }
    }
    toggleDropdown() {
        const menu = this.shadowRoot?.querySelector(".dropdown-menu");
        menu?.style.setProperty("display", menu?.style.display == "block" ? "none" : "block");
    }
    addItem(schema) {
        this.itemSchema = schema;
        const value = this.itemSchema._default(this.array);
        this.index = this.array?.length;
        this.array?.push(value);
        this.modal?.valid();
        this.requestUpdate();
    }
    stopEvent(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }
    close(evt) {
        const detail = evt.detail;
        if (!evt.detail.dismissed) {
            const field = this.shadowRoot?.getElementById("form-object");
            evt.detail.value = field.value[this.refname ?? "id"];
            evt.detail.abstract = field.abstract();
        }
        this.reference = undefined;
        this.stopEvent(evt);
        this.dispatchEvent(new CustomEvent("close", { detail }));
        this.modal?.valid(false);
    }
    firstUpdated() {
        this.modal = this.shadowRoot?.querySelector('fz-dialog');
    }
    open() {
        if (this.modal)
            this.modal.open();
        if (this.arraySchema?.homogeneous && this.index === undefined) {
            this.arraySchema?.items && this.addItem(this.arraySchema?.items);
        }
    }
};
__decorate([
    n$2({ type: Object })
], FzItemDlg.prototype, "reference", null);
FzItemDlg = __decorate([
    t$4("fz-item-dlg")
], FzItemDlg);

class _FzLogger {
    static levels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        NONE: 4
    };
    static registry = new Map();
    /** Set global log level per domain */
    static set(...args) {
        let level = "NONE";
        for (const item of args) {
            if (['DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'].includes(item)) {
                level = item;
            }
            else {
                FzLogger.registry.set(item, level);
            }
        }
    }
    /** Returns a logger for a domain, optionally scoped with context */
    static get(domain, context) {
        function isA(obj, name) {
            let proto = Object.getPrototypeOf(obj ?? {});
            while (proto) {
                if (proto.constructor?.name === name)
                    return true;
                proto = Object.getPrototypeOf(proto);
            }
            return false;
        }
        const ctxstrings = [];
        for (const property in context) {
            if (isA(context[property], "FzField") || isA(context[property], "Schema"))
                ctxstrings.push(`${property}: ${context[property].pointer}`);
        }
        const shouldLog = (lvl) => {
            const level = FzLogger.registry.get(domain);
            return (level == null) ? false : FzLogger.levels[lvl] >= FzLogger.levels[level];
        };
        const format = (msg, ...args) => {
            return [`[${domain}][${ctxstrings.join(" ")}] ${msg}`, ...args];
        };
        const log = (lvl, ...args) => {
            if (!shouldLog(lvl))
                return;
            const pattern = args.shift();
            const msg = format(pattern, ...args);
            switch (lvl) {
                case 'DEBUG':
                    console.debug(...msg);
                    break;
                case 'INFO':
                    console.info(...msg);
                    break;
                case 'WARN':
                    console.warn(...msg);
                    break;
                case 'ERROR':
                    console.error(...msg);
                    break;
            }
        };
        return {
            debug: (...a) => log('DEBUG', ...a),
            info: (...a) => log('INFO', ...a),
            warn: (...a) => log('WARN', ...a),
            error: (...a) => log('ERROR', ...a),
            if: {
                debug: (c, ...a) => c && log('DEBUG', ...a),
                info: (c, ...a) => c && log('INFO', ...a),
                warn: (c, ...a) => c && log('WARN', ...a),
                error: (c, ...a) => c && log('ERROR', ...a),
            }
        };
    }
}
// Attach to global
globalThis.FzLogger = _FzLogger;

var $schema = "http://json-schema.org/draft-07/schema#";
var $id = "http://json-schema.org/draft-07/schema-3s#";
var title = "Core schema meta-schema";
var definitions = {
	schemaArray: {
		type: "array",
		minItems: 1,
		items: {
			$ref: "#"
		}
	},
	nonNegativeInteger: {
		type: "integer",
		minimum: 0
	},
	nonNegativeIntegerDefault0: {
		allOf: [
			{
				$ref: "#/definitions/nonNegativeInteger"
			},
			{
				"default": 0
			}
		]
	},
	simpleTypes: {
		"enum": [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		]
	},
	stringArray: {
		type: "array",
		items: {
			type: "string"
		},
		uniqueItems: true,
		"default": [
		]
	}
};
var type = [
	"object",
	"boolean"
];
var properties = {
	$id: {
		type: "string",
		format: "uri-reference"
	},
	$schema: {
		type: "string",
		format: "uri"
	},
	$ref: {
		type: "string",
		format: "uri-reference"
	},
	$comment: {
		type: "string"
	},
	title: {
		type: "string"
	},
	description: {
		type: "string"
	},
	"default": true,
	readOnly: {
		type: "boolean",
		"default": false
	},
	examples: {
		type: "array",
		items: true
	},
	multipleOf: {
		type: "number",
		exclusiveMinimum: 0
	},
	maximum: {
		type: "number"
	},
	exclusiveMaximum: {
		type: "number"
	},
	minimum: {
		type: "number"
	},
	exclusiveMinimum: {
		type: "number"
	},
	maxLength: {
		$ref: "#/definitions/nonNegativeInteger"
	},
	minLength: {
		$ref: "#/definitions/nonNegativeIntegerDefault0"
	},
	pattern: {
		type: "string",
		format: "regex"
	},
	additionalItems: {
		$ref: "#"
	},
	items: {
		anyOf: [
			{
				$ref: "#"
			},
			{
				$ref: "#/definitions/schemaArray"
			}
		],
		"default": true
	},
	maxItems: {
		$ref: "#/definitions/nonNegativeInteger"
	},
	minItems: {
		$ref: "#/definitions/nonNegativeIntegerDefault0"
	},
	uniqueItems: {
		type: "boolean",
		"default": false
	},
	contains: {
		$ref: "#"
	},
	maxProperties: {
		$ref: "#/definitions/nonNegativeInteger"
	},
	minProperties: {
		$ref: "#/definitions/nonNegativeIntegerDefault0"
	},
	required: {
		$ref: "#/definitions/stringArray"
	},
	additionalProperties: {
		$ref: "#"
	},
	definitions: {
		type: "object",
		additionalProperties: {
			$ref: "#"
		},
		"default": {
		}
	},
	properties: {
		type: "object",
		additionalProperties: {
			$ref: "#"
		},
		"default": {
		}
	},
	patternProperties: {
		type: "object",
		additionalProperties: {
			$ref: "#"
		},
		propertyNames: {
			format: "regex"
		},
		"default": {
		}
	},
	dependencies: {
		type: "object",
		additionalProperties: {
			anyOf: [
				{
					$ref: "#"
				},
				{
					$ref: "#/definitions/stringArray"
				}
			]
		}
	},
	propertyNames: {
		$ref: "#"
	},
	"const": true,
	"enum": {
		type: "array",
		items: true,
		minItems: 1,
		uniqueItems: true
	},
	type: {
		anyOf: [
			{
				$ref: "#/definitions/simpleTypes"
			},
			{
				type: "array",
				items: {
					$ref: "#/definitions/simpleTypes"
				},
				minItems: 1,
				uniqueItems: true
			}
		]
	},
	format: {
		type: "string"
	},
	contentMediaType: {
		type: "string"
	},
	contentEncoding: {
		type: "string"
	},
	"if": {
		$ref: "#"
	},
	then: {
		$ref: "#"
	},
	"else": {
		$ref: "#"
	},
	allOf: {
		$ref: "#/definitions/schemaArray"
	},
	anyOf: {
		$ref: "#/definitions/schemaArray"
	},
	oneOf: {
		$ref: "#/definitions/schemaArray"
	},
	not: {
		$ref: "#"
	}
};
var JsonSchemaDraft = {
	$schema: $schema,
	$id: $id,
	title: title,
	definitions: definitions,
	type: type,
	properties: properties,
	"default": true
};

//import Ajv from "ajv";
//import Ajvi18n from "ajv-i18n/localize/en"
//import { ValidateFunction, ValidationError } from "./types";
//import addFormats from 'ajv-formats'
let Ajv;
let Ajvi18n;
let addFormats;
async function loadValidator(useAjv) {
    const logger = FzLogger.get("lazy");
    if (useAjv && isNull(Ajv)) {
        logger.info('AJV loading');
        [Ajv, Ajvi18n, addFormats] = await Promise.all([
            (await import('./ajv-dynamic.js').then(function (n) { return n.a; })).default,
            (await import('./ajv-dynamic.js').then(function (n) { return n.i; })).default,
            (await import('./ajv-dynamic.js').then(function (n) { return n.b; })).default
        ]);
        logger.info('AJV loaded');
    }
    if (!useAjv) {
        logger.info(`AJV not required`);
    }
}
class Validator {
    get schemaValid() { return true; }
    get schemaErrors() { return []; }
    get valid() { return true; }
    validate(_data) { }
    get errors() { return []; }
    get map() {
        const logger = FzLogger.get("validation");
        const map = new Map();
        for (const error of this.errors) {
            let { instancePath, message, params, keyword } = error;
            // required applies to object must down the error to child
            if (keyword === "required") {
                instancePath = `${instancePath === '/' ? '' : ''}/${params.missingProperty}`;
                message = "required";
            }
            if (!map.has(instancePath))
                map.set(instancePath, []);
            //const detail =Object.entries(params).map(([s,v]) => v == null ? null : `${s}: ${v}`).filter(v => v).join(',')
            map.get(instancePath)?.push(message ?? "unidentified error");
            logger.debug('% -> %s', instancePath, message);
        }
        return map;
    }
    // AJV library loader 
    static get loaded() {
        return Ajv != null;
    }
    static getValidator(schema) {
        if (Ajv == null)
            return new DefaultValidator(schema);
        const ajv = new Ajv({
            allErrors: true,
            //strict: true,
            allowUnionTypes: true,
            strictSchema: true,
            strictNumbers: false,
            coerceTypes: false
        });
        addFormats(ajv);
        // register FzForm added formats 
        FZ_FORMATS.forEach(format => ajv.addFormat(format, /./));
        // register FzForm specific keywords
        FZ_KEYWORDS.forEach(keyword => ajv.addKeyword({ keyword, valid: true }));
        return new AjvValidator(ajv, schema);
    }
    static async loadValidator(useAjv = false) {
        if (useAjv && !Validator.loaded) {
            await loadValidator(useAjv);
        }
    }
}
class DefaultValidator extends Validator {
    constructor(_schema) {
        super();
    }
}
class AjvValidator extends Validator {
    ajv;
    dataParser;
    schemaParser;
    constructor(ajv, schema) {
        super();
        this.ajv = ajv;
        this.schemaParser = this.ajv.compile(JsonSchemaDraft);
        this.schemaParser(schema);
        Ajvi18n(this.schemaParser.errors);
        this.dataParser = this.ajv.compile(schema);
    }
    get schemaValid() { return (this.schemaParser.errors?.length ?? 0) == 0; }
    get schemaErrors() { return this.schemaParser.errors ?? []; }
    get valid() { return (this.dataParser.errors?.length ?? 0) == 0; }
    validate(value) {
        this.dataParser(value);
        Ajvi18n(this.dataParser.errors);
    }
    get errors() { return this.dataParser.errors ?? []; }
}
// class SimpleJSONSchemaValidator {
//     private schema: JSONSchema;
//     constructor(schema: JSONSchema) {
//         this.schema = schema;
//     }
//     validate(instance: any): string[] {
//         return this.validateInstance(this.schema, instance);
//     }
//     private validateInstance(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (schema.type) {
//             switch (schema.type) {
//                 case 'object':
//                     errors.push(...this.validateObject(schema, instance));
//                     break;
//                 case 'array':
//                     errors.push(...this.validateArray(schema, instance));
//                     break;
//                 case 'string':
//                     errors.push(...this.validateString(schema, instance));
//                     break;
//                 case 'number':
//                     errors.push(...this.validateNumber(schema, instance));
//                     break;
//                 case 'boolean':
//                     errors.push(...this.validateBoolean(schema, instance));
//                     break;
//                 case 'null':
//                     errors.push(...this.validateNull(schema, instance));
//                     break;
//                 default:
//                     errors.push(`Unknown type: ${schema.type}`);
//             }
//         }
//         if (schema.required) {
//             errors.push(...this.validateRequired(schema, instance));
//         }
//         return errors;
//     }
//     private validateObject(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'object' || instance === null || Array.isArray(instance)) {
//             errors.push("Expected an object");
//             return errors;
//         }
//         const properties = schema.properties || {};
//         for (const prop in properties) {
//             if (instance.hasOwnProperty(prop)) {
//                 errors.push(...this.validateInstance(properties[prop], instance[prop]));
//             }
//         }
//         return errors;
//     }
//     private validateArray(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (!Array.isArray(instance)) {
//             errors.push("Expected an array");
//             return errors;
//         }
//         const itemsSchema = schema.items || {};
//         for (const item of instance) {
//             errors.push(...this.validateInstance(itemsSchema, item));
//         }
//         if (schema.minItems !== undefined && instance.length < schema.minItems) {
//             errors.push(`Expected at least ${schema.minItems} items`);
//         }
//         if (schema.maxItems !== undefined && instance.length > schema.maxItems) {
//             errors.push(`Expected no more than ${schema.maxItems} items`);
//         }
//         return errors;
//     }
//     private validateString(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'string') {
//             errors.push("Expected a string");
//             return errors;
//         }
//         if (schema.minLength !== undefined && instance.length < schema.minLength) {
//             errors.push(`Expected at least ${schema.minLength} characters`);
//         }
//         if (schema.maxLength !== undefined && instance.length > schema.maxLength) {
//             errors.push(`Expected no more than ${schema.maxLength} characters`);
//         }
//         if (schema.pattern) {
//             const regex = new RegExp(schema.pattern);
//             if (!regex.test(instance)) {
//                 errors.push(`String does not match pattern: ${schema.pattern}`);
//             }
//         }
//         if (schema.format) {
//             errors.push(...this.validateFormat(schema.format, instance));
//         }
//         return errors;
//     }
//     private validateNumber(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'number') {
//             errors.push("Expected a number");
//             return errors;
//         }
//         if (schema.minimum !== undefined && instance < schema.minimum) {
//             errors.push(`Expected value to be at least ${schema.minimum}`);
//         }
//         if (schema.maximum !== undefined && instance > schema.maximum) {
//             errors.push(`Expected value to be at most ${schema.maximum}`);
//         }
//         return errors;
//     }
//     private validateBoolean(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'boolean') {
//             errors.push("Expected a boolean");
//         }
//         return errors;
//     }
//     private validateNull(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (instance !== null) {
//             errors.push("Expected null");
//         }
//         return errors;
//     }
//     private validateRequired(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'object' || instance === null || Array.isArray(instance)) {
//             return errors;
//         }
//         const requiredProperties = schema.required || [];
//         for (const prop of requiredProperties) {
//             if (!instance.hasOwnProperty(prop)) {
//                 errors.push(`Missing required property: ${prop}`);
//             }
//         }
//         return errors;
//     }
//     private validateFormat(format: string, instance: string): string[] {
//         const errors: string[] = [];
//         switch (format) {
//             case 'email':
//                 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 if (!emailRegex.test(instance)) {
//                     errors.push("Invalid email format");
//                 }
//                 break;
//             case 'date':
//                 const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//                 if (!dateRegex.test(instance)) {
//                     errors.push("Invalid date format (YYYY-MM-DD)");
//                 }
//                 break;
//             case 'date-time':
//                 const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/;
//                 if (!dateTimeRegex.test(instance)) {
//                     errors.push("Invalid date-time format (YYYY-MM-DDTHH:MM:SSZ)");
//                 }
//                 break;
//             case 'time':
//                 const timeRegex = /^\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/;
//                 if (!timeRegex.test(instance)) {
//                     errors.push("Invalid time format (HH:MM:SSZ)");
//                 }
//                 break;
//             case 'uri':
//                 const uriRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
//                 if (!uriRegex.test(instance)) {
//                     errors.push("Invalid URI format");
//                 }
//                 break;
//             // Add more format validations as needed
//             default:
//                 errors.push(`Unknown format: ${format}`);
//         }
//         return errors;
//     }
// }

const SCHEMA = Symbol("FZ_FORM_SCHEMA");
const PARENT = Symbol("FZ_FORM_PARENT");
const KEY = Symbol("FZ_FORM_KEY");
const ROOT = Symbol("FZ_FORM_ROOT");

class CSUpgradeNullable extends CompilationStep {
    constructor(root) {
        super(root, "nullable", "upgrade", []);
    }
    appliable(schema) {
        return this.property in schema;
    }
    apply(schema) {
        if (schema.nullable) {
            if (schema.type === undefined) {
                schema.type = ["null"];
            }
            else if (Array.isArray(schema.type)) {
                schema.type = [...schema.type, "null"];
            }
            else {
                schema.type = [schema.type, "null"];
            }
        }
        schema[this.property] = undefined;
    }
}
class CSUpgradeId extends CompilationStep {
    constructor(root) {
        super(root, "$id", "upgrade", []);
    }
    appliable(schema) {
        return this.property in schema && schema.$id.includes("#");
    }
    apply(schema) {
        const [base, anchor] = schema.$id.split("#");
        schema.$id = base;
        schema.$anchor = anchor;
    }
}
class CSUpgradeDependencies extends CompilationStep {
    constructor(root) {
        super(root, "dependencies", "upgrade", []);
    }
    appliable(schema) {
        return this.property in schema;
    }
    apply(schema) {
        schema.dependentRequired = { ...schema[this.property] };
        schema.dependencies = undefined;
    }
}
class CSUpgradeItems extends CompilationStep {
    constructor(root) {
        super(root, "items", "upgrade", []);
    }
    appliable(schema) {
        return Array.isArray(schema[this.property]);
    }
    apply(schema) {
        schema.prefixItems = schema[this.property];
        schema.items = undefined;
    }
}
class CSUpgradeAdditionalProperties extends CompilationStep {
    constructor(root) {
        super(root, "additionalProperties", "upgrade", []);
    }
    appliable(schema) {
        return schema.additionalProperties === false;
    }
    apply(schema) {
        schema.unevaluatedProperties = false;
        schema.additionalProperties = undefined;
    }
}
class CSUpgradeRef extends CompilationStep {
    constructor(root) {
        super(root, "$ref", "upgrade", []);
    }
    appliable(schema) {
        return this.property in schema;
    }
    apply(schema) {
        schema.$dynamicRef = schema[this.property];
        schema.$ref = undefined;
    }
}

/**
 * class to compile schema for fz-form
 * compilation process is a in-depth walkthrough schema applying in order all
 * the compile time actions
 *  !!! be carefull action order is primordial
 */
class SchemaCompiler {
    static implemented = ["draft-07", "2019-09", "2020-12"];
    static unimplemented = ["draft-06", "draft-05", "draft-04", "draft-03", "draft-02"];
    static DIALECT_DRAF_07 = "http://json-schema.org/draft-07/schema";
    static DIALECT_2019_09 = "https://json-schema.org/draft/2019-09/schema";
    static DIALECT_2020_12 = "https://json-schema.org/draft/2020-12/schema";
    root;
    dialect;
    steps;
    passes = {
        upgrade: [],
        pre: [],
        post: []
    };
    errors = [];
    constructor(root, options, data) {
        this.root = root;
        this.dialect = this.extractDialect(options, root.$schema);
        if (SchemaCompiler.unimplemented.includes(this.dialect))
            throw Error(`schema dialect '${this.dialect}' not implemented (implmented are draft-07,2019-09 and 2020-12)`);
        // upgrade from Draft07 and 2019-09 to 2020-12
        this.steps = [
            new CSUpgradeRef(this.root),
            new CSUpgradeAdditionalProperties(this.root),
            new CSUpgradeDependencies(this.root),
            new CSUpgradeId(this.root),
            new CSUpgradeItems(this.root),
            new CSUpgradeNullable(this.root),
            new CSDefinition(this.root),
            new CSParent(this.root),
            new CSPointer(this.root),
            new CSRoot(this.root),
            new CSTargetType(this.root),
            new CSEmpty(this.root, options),
            new CSEnum(this.root),
            new CSEnumArray(this.root),
            new CSUniform(this.root),
            new CSTrackers(this.root),
            new CSRequiredIf(this.root),
            new CSField(this.root),
            new CSOrder(this.root),
            new CSCollapsed(this.root),
            new CSInsideRef(this.root, data),
            new CSTemplate(this.root, 'abstract', Schema._abstractFunc()),
            new CSBool(this.root, 'case', () => false),
            new CSBool(this.root, 'visible', () => true),
            new CSBool(this.root, 'readonly', () => false),
            new CSBool(this.root, 'requiredIf', () => false),
            new CSBool(this.root, 'filter', () => true),
            new CSAny(this.root, 'rank', () => true),
            new CSAny(this.root, 'expression', () => ''),
            new CSAny(this.root, 'change', () => ''),
        ];
        for (const step of this.steps) {
            this.passes[step.phase].push(step);
        }
        // Sort each phase topologically
        this.passes.upgrade = this.topologicalSort(this.passes.upgrade);
        this.passes.pre = this.topologicalSort(this.passes.pre);
        this.passes.post = this.topologicalSort(this.passes.post);
    }
    extractDialect(options, schemaUri) {
        switch (true) {
            case SchemaCompiler.unimplemented.some(draft => schemaUri?.startsWith(`http://json-schema.org/${draft}/schema`)):
                return SchemaCompiler.unimplemented.find(draft => schemaUri?.includes(draft)) ?? "draft-06";
            case schemaUri?.startsWith(SchemaCompiler.DIALECT_DRAF_07):
                return "draft-07";
            case schemaUri?.startsWith(SchemaCompiler.DIALECT_2019_09):
                return "2019-09";
            case schemaUri?.startsWith(SchemaCompiler.DIALECT_2020_12):
                return "2020-12";
            case options.dialect && SchemaCompiler.implemented.includes(options.dialect):
                return options.dialect;
            default:
                return "2020-12";
        }
    }
    compile() {
        this.errors = [];
        //this.walkSchema(this.passes.upgrade, this.root)
        this.walkSchema(this.passes.pre, this.root);
        this.walkSchema(this.passes.post, this.root);
        // this is a special use case when all dependencies between pointers is setted
        // we need to break potential cycle to avoid infinite loop
        CSTrackers.breakCycles();
        return this.errors;
    }
    walkSchema(steps, schema, parent, name) {
        for (const step of steps) {
            try {
                if (step.appliable(schema, parent, name)) {
                    step.apply(schema, parent, name);
                }
            }
            catch (e) {
                this.errors.push(String(e));
            }
        }
        if (schema.properties)
            return Object.entries(schema.properties).forEach(([name, child]) => this.walkSchema(steps, child, schema, name));
        if (schema.items) {
            if (schema.items.oneOf)
                return this.walkSchema(steps, schema.items, schema, '*');
            if (schema.items.allOf)
                return this.walkSchema(steps, schema.items, schema, '*');
            if (schema.items.anyOf)
                return this.walkSchema(steps, schema.items, schema, '*');
            return this.walkSchema(steps, schema.items, schema, '*');
        }
        if (schema.oneOf)
            return schema.oneOf.forEach((child) => this.walkSchema(steps, child, parent, name));
        if (schema.allOf)
            return schema.allOf.forEach((child) => this.walkSchema(steps, child, parent, name));
        if (schema.anyOf)
            return schema.anyOf.forEach((child) => this.walkSchema(steps, child, parent, name));
    }
    topologicalSort(steps) {
        function visit(s, stack) {
            if (visited.has(s.property))
                return;
            if (stack.has(s.property))
                throw new Error(`Cycle in step dependencies: ${s.property}`);
            stack.add(s.property);
            for (const dep of s.after) {
                const match = steps.find(step => step.property === dep);
                if (match)
                    visit(match, stack);
            }
            stack.delete(s.property);
            visited.add(s.property);
            sorted.push(s);
        }
        const sorted = [];
        const visited = new Set();
        for (const step of steps) {
            visit(step, new Set());
        }
        return sorted;
    }
}
/**
 * Replace schemas defined by reference ($ref) by their real
 * definition (by copy)).
 */
class CSDefinition extends CompilationStep {
    constructor(root) {
        super(root, "$ref", "pre", []);
    }
    apply(schema) {
        const batch = [];
        for (const [property, child] of Object.entries(schema.properties ?? {})) {
            if (child.$ref)
                batch.push({ parent: schema.properties ?? {}, property });
        }
        for (const [i, child] of (schema.oneOf ?? []).entries()) {
            if (child.$ref)
                batch.push({ parent: schema.oneOf ?? [], property: i });
        }
        for (const [i, child] of (schema.anyOf ?? []).entries()) {
            if (child.$ref)
                batch.push({ parent: schema.anyOf ?? [], property: i });
        }
        for (const [i, child] of (schema.allOf ?? []).entries()) {
            if (child.$ref)
                batch.push({ parent: schema.allOf ?? [], property: i });
        }
        // process collected $ref schemas
        for (const item of batch) {
            item.parent[item.property] = this.definition(item.parent[item.property]);
        }
    }
    definition(schema) {
        const ref = schema.$ref;
        if (!ref.startsWith("#/definitions/"))
            throw this.error(`only '/definitions/<name>' allowed => ${ref}]`);
        if (this.root.definitions == null)
            throw this.error(`No "definitions" property in root schema`);
        const defname = ref.split("/")[2];
        if (this.root.definitions[defname] == null)
            throw this.error(`No definitions found in schema for ${ref}`);
        const deforig = this.root.definitions[defname];
        const defcopy = Object.assign({}, deforig);
        Object.entries(schema).forEach(([n, v]) => (n !== '$ref') && (defcopy[n] = v));
        return Schema.wrapSchema(defcopy);
    }
}
/**
 * adds a 'parent' property to each schema
 * it store the parent schema of the currently processed schema
 */
class CSParent extends CompilationStep {
    constructor(root) {
        super(root, "parent", "pre", []);
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema, parent) {
        schema.parent = parent;
    }
}
/**
 * Adds a 'pointer' property to each schema
 * this porperty store the schema pointer of currently processed schema
 */
class CSPointer extends CompilationStep {
    constructor(root) {
        super(root, "pointer", "pre", []);
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema, parent, name) {
        schema.pointer = parent ? `${parent.pointer}/${name}` : ``;
    }
}
/**
 * Adds a 'root' property to each schema
 * this property store the root schema
 */
class CSRoot extends CompilationStep {
    constructor(root) {
        super(root, "root", "pre", []);
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema) {
        schema.root = this.root;
    }
}
/**
 * Adds a string property 'basetype' wich identify basetype (not null)
 * @param schema shema to comp base type
 */
class CSTargetType extends CompilationStep {
    static STRINGKW = ["minLength", "maxLength", "pattern", "format"];
    static NUMBERKW = ["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "multipleOf"];
    static ARRAYKW = ["items", "additionalItems", "minItems", "maxItems", "uniqueItems"];
    static OBJECTKW = ["required", "properties", "additionalProperties", "patternProperties", "minProperties", "maxProperties", "dependencies"];
    static ALL = new Set(["string", "integer", "number", "object", "array", "boolean", "null"]);
    constructor(root) {
        super(root, "basetype", "pre", []);
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema, parent, name) {
        schema.target = [...(this.infer(schema) ?? [])];
        switch (schema.target.length) {
            case 2:
                if (!schema.target.includes("null")) {
                    throw Error(`Second type must be "null" : ${pointerSchema(parent, name)}`);
                }
                schema.basetype = schema.target.find((t) => t !== "null") ?? schema.target[0];
                schema.nullAllowed = true;
                break;
            case 1:
                schema.basetype = schema.target[0];
                schema.nullAllowed = schema.target[0] == "null";
                break;
            case 0:
                schema.basetype = "null";
                schema.nullAllowed = false;
                break;
            default:
                throw Error(`multiple types not implemented : ${pointerSchema(parent, name)}`);
        }
    }
    infer(schema) {
        const possibles = [];
        // we call all the helpers that infer types for each keyword
        possibles.push(CSTargetType.ALL);
        possibles.push(this.constKW(schema));
        possibles.push(this.typeKW(schema));
        possibles.push(this.enumKW(schema));
        possibles.push(this.numberKW(schema));
        possibles.push(this.stringKW(schema));
        possibles.push(this.arrayKW(schema));
        possibles.push(this.objectKW(schema));
        possibles.push(this.notKW(schema));
        // Handling "allOf" → intersection of types
        if (schema.allOf) {
            const allOfTypes = schema.allOf.map((s) => this.infer(s)).filter(x => x != null);
            possibles.push(intersect(allOfTypes));
        }
        // Handling "anyOf" → union of types
        if (schema.anyOf) {
            const anyOfTypes = schema.anyOf.map((s) => this.infer(s)).map(x => x == null ? CSTargetType.ALL : x);
            possibles.push(union(anyOfTypes));
        }
        // Handling "oneOf" → union of types (similar to anyOf)
        if (schema.oneOf) {
            const oneOfTypes = schema.oneOf.map((s) => this.infer(s)).map(x => x == null ? CSTargetType.ALL : x);
            possibles.push(union(oneOfTypes));
        }
        const filtered = possibles.filter(value => value != null);
        return intersect(filtered);
    }
    notKW(schema) {
        //  "not" → Compute the complementary set of types
        return schema.not ? complement(this.infer(schema.not), CSTargetType.ALL) : null;
    }
    enumKW(schema) {
        // infering type from "enum" keyword correspond to a set of all enums value types
        if ("enum" in schema && Array.isArray(schema.enum)) {
            const types = schema.enum.map(value => value == null ? "null" : Array.isArray(value) ? "array" : typeof value);
            return new Set(types);
        }
        return null;
    }
    typeKW(schema) {
        if ("type" in schema) {
            return new Set(Array.isArray(schema.type) ? schema.type : [schema.type]);
        }
        return null;
    }
    constKW(schema) {
        if ("const" in schema) {
            if (schema.const == null)
                return new Set(["null"]);
            if (Array.isArray(schema.const))
                return new Set(["array"]);
            const constType = Number.isInteger(schema.const) ? "integer" : typeof schema.const;
            return new Set([constType]);
        }
        return null;
    }
    arrayKW(schema) {
        // if one of this keywords is present then type is contrained to "array"
        return CSTargetType.ARRAYKW.some(kw => kw in schema)
            ? new Set(["array"])
            : null;
    }
    numberKW(schema) {
        // if one of this keywords is present then type is contrained to "number"
        return CSTargetType.NUMBERKW.some(kw => kw in schema)
            ? new Set(["number"])
            : null;
    }
    objectKW(schema) {
        // if one of this keywords is present then type is contrained to "object"
        return CSTargetType.OBJECTKW.some(kw => kw in schema)
            ? new Set(["object"])
            : null;
    }
    stringKW(schema) {
        // if one of this keywords is present then type is contrained to "string"
        return CSTargetType.STRINGKW.some(kw => kw in schema)
            ? new Set(["string"])
            : null;
    }
}
class CSEmpty extends CompilationStep {
    preferNull;
    constructor(root, options) {
        super(root, "empty", "pre", ["basetype"]);
        this.preferNull = options?.preferNull ?? false;
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema) {
        schema.empty = !schema.nullAllowed ? undefined : this.preferNull ? null : undefined;
    }
}
/**
 * Adds a boolean property 'isenum' true if enumeration detected
 * and only primitive types may be enums
 * 3 flavors :
 *      (a) having an "enums" property
 *      (b) having an "oneOf" property containing an array of constants
 *      (c) having an "anyOf" property containing an array of constants
 */
class CSEnum extends CompilationStep {
    constructor(root) {
        super(root, "isenum", "pre", []);
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema) {
        schema.isenum = false;
        switch (true) {
            // allow only primitive types to be enums
            case !isPrimitive(schema): break;
            // it is an enumeration only for one of this cases
            case !!schema.enum:
            case schema.oneOf && schema.oneOf.every((sch) => 'const' in sch):
            case schema.anyOf && schema.anyOf.every((sch) => 'const' in sch):
                if (!schema.filter)
                    schema.filter = () => true;
                schema.isenum = true;
                break;
        }
    }
}
/**
 * Adds a boolean property 'isenumarray' true if arry detected
 * and array items is an enum. Only primitive types may be enums
 */
class CSEnumArray extends CompilationStep {
    constructor(root) {
        super(root, "isenumarray", "pre", []);
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema) {
        schema.isenumarray = isPrimitive(schema) && isenumarray(schema);
    }
}
/**
 * Adds a boolean property 'homogeneous' true if  schema is
 * array and items are of homegeneous type
 */
class CSUniform extends CompilationStep {
    constructor(root) {
        super(root, "homogeneous", "pre", ["basetype"]);
    }
    appliable(schema) {
        return !(this.property in schema) && schema.basetype === "array";
    }
    apply(schema) {
        schema.homogeneous = schema.items?.oneOf ? false : true;
    }
}
/**
 * adds an empty array property 'trackers' to each schema
 * this property will contain pointers to the tracked values
 * trackers receive 'data-updated' events when data changes occurs
 * to the pointed data (warning by schema pointer)
 */
class CSTrackers extends CompilationStep {
    static ALL = new Map();
    constructor(root) {
        super(root, "trackers", "pre", ["pointer"]);
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema) {
        schema.trackers = [];
        CSTrackers.ALL?.set(schema.pointer, schema.trackers);
    }
    static breakCycles() {
        if (CSTrackers.ALL == null)
            return;
        const trackMap = CSTrackers.ALL;
        const visited = new Set(); // Nodes that have been fully processed
        const stack = new Set(); // Nodes currently in the recursion stack
        const parentMap = new Map(); // To track back the cycle path
        for (const [key, trackers] of trackMap) {
            if (trackers.length === 0) {
                trackMap.delete(key);
            }
            function dfs(pointer) {
                if (stack.has(pointer)) {
                    // Find the full cycle path
                    let current = pointer;
                    const cycleNodes = new Set();
                    while (parentMap.has(current) && !cycleNodes.has(current)) {
                        cycleNodes.add(current);
                        current = parentMap.get(current);
                    }
                    // Remove all cycle links
                    for (const node of cycleNodes) {
                        const parent = parentMap.get(node);
                        if (parent && trackMap.has(parent)) {
                            const trackers = trackMap.get(parent);
                            const index = trackers.indexOf(node);
                            if (index !== -1) {
                                console.warn(`Cycle detected: Removing track link from ${parent} → ${node}`);
                                trackers.splice(index, 1); // ✅ Modify array in place
                            }
                        }
                    }
                    return;
                }
                if (visited.has(pointer))
                    return;
                visited.add(pointer);
                stack.add(pointer);
                for (const tracker of trackMap.get(pointer) || []) {
                    parentMap.set(tracker, pointer);
                    dfs(tracker); // Continue DFS
                }
                stack.delete(pointer);
            }
            // Run DFS on all nodes
            for (const pointer of trackMap.keys()) {
                if (!visited.has(pointer)) {
                    dfs(pointer);
                }
            }
            CSTrackers.ALL = undefined;
        }
    }
}
/**
 * Adds a string property 'requiredIf' to each schema which is a required field
 * this field will be compiled to getter to manage conditional mandatory values
 */
class CSRequiredIf extends CompilationStep {
    constructor(root) {
        super(root, "requiredIf", "pre", ["basetype"]);
    }
    appliable(schema) {
        return schema.basetype === "object" && schema.properties != null && schema.required != null;
    }
    apply(schema) {
        schema.required?.forEach((name) => {
            if (schema.properties && name in schema.properties)
                schema.properties[name].requiredIf = "true";
        });
    }
}
/**
 * Adds a property 'field' with the web component name to be displayed for this schema
 * depending on 'basetype', 'format', 'const', 'isenum', enum values count, ...
 */
class CSField extends CompilationStep {
    constructor(root) {
        super(root, "field", "pre", ["basetype", "isenum", "isenumarray"]);
    }
    appliable(schema) {
        return !(this.property in schema);
    }
    apply(schema) {
        if ("const" in schema)
            return schema.field = 'fz-const';
        if (schema.from && isPrimitive(schema)) {
            if (!schema.filter)
                schema.filter = () => true;
            return schema.field = 'fz-enum-select';
        }
        if (schema.isenum) {
            if (!schema.filter)
                schema.filter = () => true;
            switch (true) {
                case schema.enum && schema.enum?.length <= 3: return schema.field = 'fz-enum-check';
                case schema.oneOf && schema.oneOf?.length <= 3: return schema.field = 'fz-enum-check';
                case schema.anyOf && schema.anyOf?.length <= 3: return schema.field = 'fz-enum-check';
                case schema.enum && schema.enum?.length <= 20: return schema.field = 'fz-enum-select';
                case schema.oneOf && schema.oneOf?.length <= 20: return schema.field = 'fz-enum-select';
                case schema.anyOf && schema.anyOf?.length <= 20: return schema.field = 'fz-enum-select';
                default: return schema.field = 'fz-enum-typeahead';
            }
        }
        switch (schema.basetype) {
            case 'object': return schema.field = 'fz-object';
            case 'array': {
                if (schema.isenumarray) {
                    if (!schema.filter)
                        schema.filter = () => true;
                    return schema.field = 'fz-enum-array';
                }
                return schema.field = 'fz-array';
            }
            case 'integer':
                return (schema.minimum && schema.maximum && (schema.maximum - schema.minimum) <= 10)
                    ? schema.field = 'fz-range'
                    : schema.field = 'fz-integer';
            case 'number': return schema.field = 'fz-float';
            case 'boolean': return schema.field = 'fz-boolean';
            case 'string':
                if (schema.mask)
                    return schema.field = "fz-mask";
                switch (schema.format) {
                    case "color": return schema.field = 'fz-color';
                    case "uuid": return schema.field = 'fz-uuid';
                    case "uuid": return schema.field = 'fz-uuid';
                    case "signature": return schema.field = 'fz-signature';
                    case "date": return schema.field = 'fz-date';
                    case "time": return schema.field = 'fz-time';
                    case "date-time": return schema.field = 'fz-datetime';
                    case "geo": return schema.field = 'fz-location';
                    case "doc": return schema.field = 'fz-doc';
                    case "markdown": return schema.field = 'fz-markdown';
                    case "asset": return schema.field = 'fz-picker';
                }
                if (!schema.format && schema.maxLength && schema.maxLength > 256)
                    return schema.field = 'fz-textarea';
                return schema.field = 'fz-string';
        }
        return schema.field = 'fz-error';
    }
}
/**
 * Adds a property 'order' for each schema containing the display order rank
 */
class CSOrder extends CompilationStep {
    constructor(root) {
        super(root, "order", "pre", ["basetype"]);
    }
    appliable(schema) {
        return !(this.property in schema) && schema.basetype === 'object' && schema.properties != null;
    }
    apply(schema) {
        const properties = schema.properties;
        if (!properties)
            return;
        const groupmap = new Map();
        const tabmap = new Map();
        // order properties with tab and grouping
        let fieldnum = 0;
        const fields = Object.entries(properties).map(([fieldname, schema]) => {
            // get or affect tab number
            if (schema.tab && !tabmap.has(schema.tab))
                tabmap.set(schema.tab, fieldnum);
            const tabnum = schema.tab ? tabmap.get(schema.tab) : fieldnum;
            // get or affect group number
            if (schema.group && !groupmap.has(schema.group))
                groupmap.set(schema.group, fieldnum);
            const groupnum = schema.group ? groupmap.get(schema.group) : fieldnum;
            return { tabnum, groupnum, fieldnum: fieldnum++, fieldname, schema, tabname: schema.tab ?? "", groupname: schema.group ?? "" };
        });
        fields.sort((fa, fb) => {
            const diff = Math.min(fa.tabnum, fa.groupnum, fa.fieldnum) - Math.min(fb.tabnum, fb.groupnum, fb.fieldnum);
            return (diff === 0) ? fa.fieldnum - fb.fieldnum : diff;
        });
        schema.order = fields;
    }
}
class CSCollapsed extends CompilationStep {
    constructor(root) {
        super(root, "collapsed", "pre", ["pointer"]);
    }
    appliable(_schema) {
        return true;
    }
    apply(schema) {
        if (isNull(schema.collapsed)) {
            schema.collapsed = "false";
        }
        else {
            const domain = ["never", "allways", "true", "false"];
            if (!(domain.includes(schema.collapsed))) {
                throw this.error(`${schema.pointer} : collapsed must be one of [${domain.join(', ')}]`);
            }
        }
    }
}
class CSInsideRef extends CompilationStep {
    data;
    constructor(root, data) {
        super(root, "from", "post", ["pointer", "trackers"]);
        this.data = data;
    }
    appliable(schema) {
        return notNull(schema.from) && !isFunction(schema.from);
    }
    apply(schema) {
        const from = schema.from;
        schema.from = () => null;
        const pointer = from.pointer.replace(/\/[^/]+$/, '');
        const name = from.pointer.substr(pointer.length + 1);
        schema._track(`$\`${pointer}\``);
        schema.from = (_schema, _value, parent, property, _userdata) => {
            const target = derefPointerData(this.data, parent, property, pointer);
            if (!target)
                return null;
            if (!isArray(target)) {
                console.error(`reference list must be an array ${pointer}`);
                return [];
            }
            return { pointer, name, target, schema: getSchema(target), extend: !!from.extend };
        };
    }
}
/**
 * compile a given property written as template literal
 */
class CSTemplate extends CompilationStep {
    defunc;
    constructor(root, property, defunc) {
        super(root, property, "post", []);
        this.defunc = defunc;
    }
    appliable(schema) {
        return this.property in schema && typeof schema[this.property] == "string";
    }
    apply(schema, _parent, name) {
        const expression = schema[this.property];
        this.set(schema, this.defunc);
        if (isString(expression)) {
            const body = `
                ${this.sourceURL(schema, name)}
                try { 
                    return nvl\`${expression}\`
                } catch(e) {  
                    console.error(
                        \` eval for keyword "${this.property}" failed field:\${parent?.pointer ?? ""} -> \${property ?? ""}\n\`,
                        \`    => \${String(e)}\`) 
                }
                return ''
            `;
            this.compileExpr(schema, expression, body);
        }
    }
}
/**
 * compile a given property written as a function returning boolean
 */
class CSBool extends CompilationStep {
    defaultFunc;
    constructor(root, property, defunc) {
        super(root, property, "post", []);
        this.defaultFunc = defunc;
    }
    appliable(schema) {
        return this.property in schema && !isFunction(schema[this.property]);
    }
    apply(schema, _parent, name) {
        const expression = schema[this.property];
        this.set(schema, this.defaultFunc);
        if (isNull(expression) || isBoolean(expression))
            return this.set(schema, () => expression);
        if (!isString(expression))
            return this.set(schema, () => !!(expression));
        const body = `
            ${this.sourceURL(schema, name)}
            try {  
                const result = (${expression}) 
                return result === null ? result : !!result
            } catch(e) {  
                console.error(
                    \` eval for keyword "${this.property}" failed field:\${parent?.pointer ?? ""} -> \${property ?? ""}\n\`,
                    \`    => \${String(e)}\`) 
            }
            return true
        `;
        this.compileExpr(schema, expression, body);
    }
}
class CSAny extends CompilationStep {
    defaultFunc;
    constructor(root, property, defunc) {
        super(root, property, "post", []);
        this.defaultFunc = defunc;
    }
    appliable(schema) {
        return this.property in schema && typeof schema[this.property] !== "function";
    }
    apply(schema, _parent, name) {
        const expression = schema[this.property];
        this.set(schema, this.defaultFunc);
        if (!isString(expression) && !isArray(expression))
            return this.set(schema, () => expression);
        let code = `return null`;
        code = isString(expression) ? `return ${expression}` : this.buildCode(expression);
        const body = `
            ${this.sourceURL(schema, name)}
            try {
                ${code} 
            } catch(e) {  
                console.error(
                    \` eval for keyword "${this.property}" failed field:\${parent?.pointer ?? ""} -> \${property ?? ""}\n\`,
                    \`    => \${String(e)}\`) }
            return null
        `;
        this.compileExpr(schema, expression, body);
    }
}
/**
 * class to compile data for fz-form
 * compilation process is a in-depth walkthrough schema applying in order compile time actions
 * be carefull action order is primordial
 */
class DataCompiler {
    data;
    schema;
    steps;
    errors = [];
    constructor(data, schema) {
        this.data = data;
        this.schema = schema;
        this.steps = [
            (schema, data, parent, key) => {
                if (isObject(data) || isArray(data)) {
                    data[SCHEMA] = schema;
                    data[PARENT] = parent;
                    data[KEY] = key;
                    data[ROOT] = data;
                }
            }
        ];
    }
    compile() {
        this.errors = [];
        this.walkData(this.schema, this.data);
        return this.errors;
    }
    walkData(schema, data, parent, key) {
        if (schema == null || data == null)
            return;
        try {
            this.steps.forEach(action => action(schema, data, parent, key));
        }
        catch (e) {
            this.errors.push(String(e));
        }
        if (isArray(data)) {
            if (schema.homogeneous) {
                data.forEach((item, i) => this.walkData(schema.items, item, data, i));
            }
            else {
                data.forEach((item, i) => {
                    schema.items?.oneOf?.forEach((schema) => {
                        const isofthistype = schema.case && schema.case(null, item, data, i, () => null);
                        if (isofthistype)
                            this.walkData(schema, item, data, i);
                    });
                });
            }
            return;
        }
        if (isObject(data) && schema.properties) {
            for (const property in data) {
                const child_schema = schema.properties[property];
                const child_data = data[property];
                this.walkData(child_schema, child_data, data, property);
            }
            return;
        }
    }
}

class BlobStoreWrapper {
    store;
    constructor(store) {
        this.store = store;
    }
    async put(uuid, blob, filename, pointer) {
        try {
            return this.store.put?.(uuid, blob, filename, pointer);
        }
        catch (e) {
            console.error(`storage: unable to put blob for uuid=${uuid} ptr=${pointer}\n    - ${String(e)}`);
        }
    }
    async remove(uuid) {
        try {
            return this.store.remove?.(uuid);
        }
        catch (e) {
            console.error(`storage: unable to remove blob for uuid=${uuid}\n    - ${String(e)}`);
        }
    }
    async get(uuid) {
        try {
            return this.store.get?.(uuid) ?? null;
        }
        catch (e) {
            console.error(`storage: unable to get blob for uuid=${uuid}\n    - ${String(e)}`);
            return;
        }
    }
}
class BlobMemory {
    store = new Map();
    async put(uuid, blob, filename, _pointer) {
        this.store.set(uuid, { uuid, blob, filename });
    }
    async remove(uuid) {
        await this.store.delete(uuid);
    }
    async get(uuid) {
        return this.store.get(uuid);
    }
}

var FzForm_1;
/**
 * @prop schema
 * @prop data
 */
let FzForm = FzForm_1 = class FzForm extends Base {
    static get styles() {
        return [...super.styles];
    }
    i_root = { content: {} };
    #i_options_accessor_storage = {};
    get i_options() { return this.#i_options_accessor_storage; }
    set i_options(value) { this.#i_options_accessor_storage = value; }
    store = new BlobMemory();
    asset;
    fieldMap = new Map();
    schemaMap = new Map();
    errorMap = new Map();
    submitted = false;
    bootstrap = false;
    useAjv = false;
    useMarkdown = false;
    #sourceSchema_accessor_storage = DEFAULT_SCHEMA;
    get sourceSchema() { return this.#sourceSchema_accessor_storage; }
    set sourceSchema(value) { this.#sourceSchema_accessor_storage = value; }
    #actions_accessor_storage = false;
    get actions() { return this.#actions_accessor_storage; }
    set actions(value) { this.#actions_accessor_storage = value; }
    #readonly_accessor_storage = false;
    get readonly() { return this.#readonly_accessor_storage; }
    set readonly(value) { this.#readonly_accessor_storage = value; }
    #checkIn_accessor_storage = false;
    get checkIn() { return this.#checkIn_accessor_storage; }
    set checkIn(value) { this.#checkIn_accessor_storage = value; }
    #checkOut_accessor_storage = false;
    get checkOut() { return this.#checkOut_accessor_storage; }
    set checkOut(value) { this.#checkOut_accessor_storage = value; }
    oninit = null;
    onready = null;
    onvaliddata = null;
    oninvaliddata = null;
    onvalidate = null;
    ondismiss = null;
    compiledSchema = DEFAULT_SCHEMA;
    validator = new DefaultValidator(DEFAULT_SCHEMA);
    message = "";
    constructor() {
        super();
        // this is a workaround to convert string with global function name into a handler
        // into corresponding event handler (quite deprecated)
        // ex: HTML: oninit="myFunc" became: this.addEventListener(myFunc)
        // because this cant be used in @property(...) declaration
        // ;["oninit", "onready", "onvaliddata", "oninvaliddata", "onvalidate", "ondismiss"].forEach(event => {
        //     (this.constructor as any).elementProperties.get(event).converter =
        //         (value: string) => { setGlobalHandler(this, event.substring(2), value); return value }
        // })
    }
    get root() { return this.i_root.content; }
    get valid() {
        this.validator.validate(this.root);
        this.errorMap = this.validator.map;
        return this.validator.valid;
    }
    get schema() { return this.compiledSchema; }
    set schema(value) {
        this.validator = Validator.getValidator(value);
        if (this.validator.schemaValid) {
            this.sourceSchema = new Schema(JSON.parse(JSON.stringify(value)));
            this.compiledSchema = new Schema(JSON.parse(JSON.stringify(value)));
        }
        else {
            this.sourceSchema = new Schema(JSON.parse(JSON.stringify(DEFAULT_SCHEMA)));
            this.compiledSchema = new Schema(JSON.parse(JSON.stringify(DEFAULT_SCHEMA)));
            this.validator = Validator.getValidator(this.sourceSchema);
        }
        this.compile();
        this.compiledSchema.collapsed = "never";
        this.fieldMap.clear();
        this.schemaMap.clear();
        this.requestUpdate();
    }
    get options() { return this.i_options; }
    set options(value) {
        this.i_options = value;
        if (this.i_options?.storage) {
            this.store = new BlobStoreWrapper(this.i_options.storage);
        }
        if (this.i_options?.asset) {
            this.asset = this.i_options.asset;
        }
    }
    get data() { return JSON.parse(JSON.stringify(this.root)); }
    set data(value) {
        // dont accept data before having a valid Schema
        if (!this.validator.schemaValid)
            return;
        const valid = this.valid;
        if (!valid && this.checkIn) ;
        this.i_root.content = value;
        this.compile();
        this.requestUpdate();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === 'schema') {
            // Utilise le converter instance-spécifique pour convertir l'attribut
            const converted = schemaAttrConverter.fromAttribute(newValue);
            this.schema = converted;
        }
        if (name === 'bootstrap') {
            FzForm_1.loadBootstrap();
        }
        if (name === 'useajv') {
            Validator.loadValidator(this.useAjv)
                .then(() => {
                // reset the validator to replace by new loaded one
                this.validator = Validator.getValidator(this.sourceSchema);
                this.check();
            })
                .catch((e) => console.error(`VALIDATION: Validator loading fails due to ${e}`));
        }
        if (name === 'usemarkdown') {
            FzMarkdownIt.loadMarkdownIt(this.useMarkdown)
                .then(() => null)
                .catch((e) => console.error(`MARKDOWN: MarkdownIt loading fails due to ${e}`));
        }
    }
    getField(pointer) {
        return this.fieldMap.get(pointer);
    }
    addField(schemaPointer, dataPointer, field) {
        this.schemaMap.set(schemaPointer, field);
        this.fieldMap.set(dataPointer, field);
    }
    removeField(schemaPointer, dataPointer) {
        this.schemaMap.delete(schemaPointer);
        this.fieldMap.delete(dataPointer);
    }
    getfieldFromSchema(pointer) {
        return this.schemaMap.get(pointer);
    }
    updateField(pointer) {
        this.getField(pointer)?.requestUpdate();
    }
    render() {
        if (!Base.isBootStrapLoaded())
            return 'Bootstrap not loaded...';
        return this.validator.schemaValid ? this.renderForm() : this.renderError();
    }
    renderForm() {
        return x `
            ${this.schema.basetype == "array"
            ? x `<fz-array pointer="" name="content"  .data="${this.i_root}" .schema="${this.schema}"></fz-array>`
            : x `<fz-object  pointer="" name="content" .data="${this.i_root}" .schema="${this.schema}"></fz-object>`}
            ${this.renderButtons()}`;
    }
    renderButtons() {
        if (!this.actions)
            return null;
        return x `
            <div class="d-flex justify-content-end gap-2" style="margin-top: 1em">
                <button class="btn btn-primary" type="button" @click=${this.confirm}>Ok</button>
                <button class="btn btn-danger" type="button" @click=${this.cancel} >Cancel</button>
            </div>`;
    }
    renderError() {
        if (this.validator.schemaValid && this.validator?.valid)
            return x ``;
        const formatError = (e) => x `<li>property : ${(e.dataPath == undefined) ? e.instancePath : e.dataPath} : ${e.keyword} ➜ ${e.message}</li>`;
        return [
            x `<hr>`,
            !this.validator.schemaValid ? x `<pre><ol> Schema errors : ${this.validator.schemaErrors.map(formatError)} </ol></pre>` : x ``,
            !this.validator.valid ? x `<pre><ol> Data errors : ${this.validator.errors.map(formatError)} </ol></pre>` : x ``
        ];
    }
    errors(pointer) {
        return this.errorMap.get(pointer) ?? [];
    }
    connectedCallback() {
        super.connectedCallback();
        this.listen(this, 'data-updated', (e) => this.handleDataUpdate(e));
        this.dispatchEvent(new CustomEvent('init'));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        // this.i_root = {}
        this.i_options = undefined;
        this.store = undefined;
        this.asset = undefined;
        this.fieldMap.clear();
        this.schemaMap.clear();
        this.useAjv = undefined;
        this.useMarkdown = undefined;
        this.sourceSchema = DEFAULT_SCHEMA;
        this.actions = undefined;
        this.readonly = undefined;
        this.checkIn = undefined;
        this.checkOut = undefined;
        this.oninit = undefined;
        this.onready = undefined;
        this.onvaliddata = undefined;
        this.oninvaliddata = undefined;
        this.onvalidate = undefined;
        this.ondismiss = undefined;
        this.compiledSchema = undefined;
        this.validator = undefined;
        this.message = undefined;
    }
    async firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.check();
    }
    check() {
        // collect errors and trigger valid/invalid event 
        const validated = this.valid;
        const event = new CustomEvent(validated ? "data-valid" : "data-invalid");
        this.dispatchEvent(event);
    }
    /**
     * 'data-updated' event handler for data change.
     * It applies a field.requestUpdate() on each traker associated FzField
     */
    handleDataUpdate(evt) {
        if (this === evt.composedPath()[0])
            return;
        const trackers = evt.detail.trackers;
        trackers.forEach(pointer => {
            const field = this.getfieldFromSchema(pointer);
            const logger = FzLogger.get("tracker", { field, schema: field?.schema });
            logger.info(`refreshed by %s`, evt.detail.field.pointer);
            field?.trackedValueChange();
        });
    }
    confirm(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.submitted = true;
        this.check();
        for (const field of this.fieldMap.values()) {
            field.requestUpdate();
        }
        const event = new CustomEvent('validate');
        this.dispatchEvent(event);
    }
    cancel(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const event = new CustomEvent('dismiss');
        this.dispatchEvent(event);
    }
    compile() {
        // All schema compilation are fatal (unable to build the form)
        const schema_compiler = new SchemaCompiler(this.compiledSchema, this.options, this.i_root.content);
        const schema_errors = schema_compiler.compile();
        if (schema_errors.length > 0) {
            this.message = `Schema compilation failed: \n    - ${schema_errors.join('\n    - ')}`;
            console.error(this.message);
            return;
        }
        // Data compilation never fail otherwise it's a bug to fix
        const data_compiler = new DataCompiler(this.i_root.content, this.schema);
        const data_errors = data_compiler.compile();
        if (data_errors.length > 0) {
            this.message = `Data compilation failed: \n    - ${data_errors.join('\n    - ')}`;
            console.error(this.message);
        }
        this.dispatchEvent(new CustomEvent('ready'));
    }
    // debug(pointer: string) {
    //     const field = this.fieldMap.get(pointer);
    //     if (!field) throw new Error(`No field found for pointer: ${pointer}`);
    //     if (!field.data || !field.key) throw new Error(`Field at ${pointer} has no parent/key`);
    //     const obj = field.data;
    //     const key = field.key;
    //     let value = obj[key];
    //     Object.defineProperty(obj, key, {
    //         get() {
    //             return value;
    //         },
    //         set(newValue) {
    //             console.debug(`FzForm watchPointer: ${pointer} (${key}) changed from`, value, "to", newValue);
    //             debugger;
    //             value = newValue;
    //         },
    //         configurable: true,
    //         enumerable: true
    //     });
    // }
    trace(pointer) {
        if (!isString(pointer, true) || !pointer.startsWith("/")) {
            console.error(`Unable to trace: ${pointer}`, this.root);
            return;
        }
        const splitted = pointer.split("/");
        const key = splitted.pop() ?? "~";
        splitted.shift();
        const path = splitted.map(x => /^\d+$/.test(x) ? parseInt(x, 10) : x);
        const obj = path.reduce((current, name) => isNull(current) ? current : current[name], this.root);
        if (isNull(obj)) {
            console.error(`Unable to trace (null ascendant): ${pointer}`, this.root);
            return;
        }
        let value = obj[key];
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            set(newValue) {
                const logger = FzLogger.get("trace");
                logger.info('%s : %s --> %s\n    %s', pointer, value, newValue, Error().stack);
                value = newValue;
            },
            configurable: true,
            enumerable: true
        });
    }
};
__decorate([
    n$2({ type: Boolean, attribute: "bootstrap" })
], FzForm.prototype, "bootstrap", void 0);
__decorate([
    n$2({ type: Boolean, attribute: "useajv" })
], FzForm.prototype, "useAjv", void 0);
__decorate([
    n$2({ type: Boolean, attribute: "usemarkdown" })
], FzForm.prototype, "useMarkdown", void 0);
__decorate([
    n$2({ type: Object, attribute: "schema", converter: schemaAttrConverter })
], FzForm.prototype, "sourceSchema", null);
__decorate([
    n$2({ type: Boolean, attribute: "actions" })
], FzForm.prototype, "actions", null);
__decorate([
    n$2({ type: Boolean, attribute: "readonly" })
], FzForm.prototype, "readonly", null);
__decorate([
    n$2({ type: Boolean, attribute: "checkin" })
], FzForm.prototype, "checkIn", null);
__decorate([
    n$2({ type: Boolean, attribute: "checkout" })
], FzForm.prototype, "checkOut", null);
__decorate([
    n$2({ type: String, attribute: 'oninit', converter: (v) => v })
], FzForm.prototype, "oninit", void 0);
__decorate([
    n$2({ type: String, attribute: 'onready', converter: (v) => v })
], FzForm.prototype, "onready", void 0);
__decorate([
    n$2({ type: String, attribute: 'onvaliddata', converter: (v) => v })
], FzForm.prototype, "onvaliddata", void 0);
__decorate([
    n$2({ type: String, attribute: 'oninvaliddata', converter: (v) => v })
], FzForm.prototype, "oninvaliddata", void 0);
__decorate([
    n$2({ type: String, attribute: 'onvalidate', converter: (v) => v })
], FzForm.prototype, "onvalidate", void 0);
__decorate([
    n$2({ type: String, attribute: 'ondismiss', converter: (v) => v })
], FzForm.prototype, "ondismiss", void 0);
FzForm = FzForm_1 = __decorate([
    t$4("fz-form")
], FzForm);
// Optional: expose globally
window.FzForm = FzForm;

export { FzForm, FzMarkdownIt };
//# sourceMappingURL=formulizer.js.map
