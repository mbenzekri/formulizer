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
const t$2=globalThis,i$3=t$2.trustedTypes,s$1=i$3?i$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$3="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$3="?"+h,n$1=`<${o$3}>`,r$2=document,l=()=>r$2.createComment(""),c$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u$2=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v$1=/-->/g,_=/>/g,m$1=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p$1=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P$1(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v$1:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m$1):void 0!==u[3]&&(c=m$1):c===m$1?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m$1:'"'===u[3]?g:p$1):c===g||c===p$1?c=m$1:c===v$1||c===_?c=f:(c=m$1,r=void 0);const x=c===m$1&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e$3+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P$1(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$3)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$3?i$3.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$3)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c$1(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}let M$1 = class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}};class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c$1(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u$2(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c$1(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P$1(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M$1(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c$1(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c$1(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const Z$1={I:R},j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.2.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

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
function isString$2(value) {
    return value !== null && typeof value === "string";
}
function isNumber$1(value) {
    return typeof value === "number" && !isNaN(value);
}
function isBoolean(value) {
    return typeof value === "boolean";
}
function isObject$1(value) {
    return value !== null && typeof value === "object" && !isArray(value);
}
function isArray(value) {
    return Array.isArray(value);
}
function isFunction$1(value) {
    return typeof value === "function" && value !== null;
}
const primitiveornulltypes = new Set(['string', 'integer', 'number', 'boolean', 'null']);
function isPrimitive(value, ornull) {
    if (isObject$1(value) && value.target.every(t => primitiveornulltypes.has(t)))
        return true;
    if (typeof value == "string" && primitiveornulltypes.has(value))
        return true;
    return false;
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
 * find in the ancestors of an element a webcomponent matching a given selector
 * @param selector selector to matching the searched element
 * @param el element from which to start searching
 * @returns Element corresponding to selector, null otherwise
 */
function closestAscendantFrom(selector, item) {
    if (item instanceof Element) {
        const elem = item.assignedSlot ?? item;
        const found = elem.closest(selector);
        const parent = elem.getRootNode().host;
        return found ?? closestAscendantFrom(selector, parent);
    }
    return null;
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
function setGlobalHandler(target, event, value) {
    if (value) {
        const fn = window[value]; // Look up the function in the global scope
        if (typeof fn === 'function') {
            target.addEventListener(event, fn);
        }
    }
}

const SCHEMA = Symbol("FZ_FORM_SCHEMA");
const PARENT = Symbol("FZ_FORM_PARENT");
const KEY = Symbol("FZ_FORM_PARENT");
const ROOT = Symbol("FZ_FORM_ROOT");
const IS_VALID = [];
const NOT_TOUCHED = [];

class Base extends r$1 {
    handlers = [];
    static sheets = [];
    static styles = [];
    firstUpdated(_changedProperties) {
        Base.sheets.forEach(sheet => this.shadowRoot?.adoptedStyleSheets.push(sheet));
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
    patternProperties; // IGNORED by formulizer (except for validation)
    additionalProperties; // IGNORED by formulizer (except for validation)
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
    orderBy;
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
    "orderBy",
    "expression",
    "change",
    //"nullable",
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
    if (!isObject$1(value))
        return false;
    if (!isString$2(value.pointer))
        return false;
    if (!isString$2(value.name))
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
        if (isObject$1(this.properties)) {
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
        const POINTER_RE = /\$\`([^`]+)`/g;
        let matches;
        while ((matches = POINTER_RE.exec(expr)) != null) {
            const pointer = matches[1];
            const trackedSchema = this._deref(pointer);
            if (trackedSchema != null && !trackedSchema.trackers.includes(this.pointer)) {
                trackedSchema.trackers.push(this.pointer);
            }
        }
    }
    _toJSON() {
        return JSON.stringify(this, (key, value) => SchemaAnnotation.includes(key) ? undefined : value);
    }
    static wrapSchema(schema) {
        Object.setPrototypeOf(schema, Schema.prototype);
        if (isObject$1(schema.properties))
            Object.values(schema.properties).forEach((child) => Schema.wrapSchema(child));
        if (isArray(schema.items))
            schema.items.forEach((child) => Schema.wrapSchema(child));
        if (isObject$1(schema.items))
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
        if (!isObject$1(schema) || !isPrimitive(schema))
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
    sourceURL(dataProperty) {
        let source = `_FZ_${this.property}_${dataProperty ?? ''}_${CompilationStep.sourceCount++}.js`.replace(/ +/g, "_");
        source = source.replace(/[^a-z0-9_]/ig, "");
        console.log(`builded source :${source}`);
        return `\n    //# sourceURL=${source}\n`;
    }
    set(schema, value, expr) {
        schema[this.property] = value;
        if (expr)
            schema[this.property].expresion = expr;
    }
    compileExpr(schema, expression, body) {
        const arrexpr = isString$2(expression) ? [expression] : expression;
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

const fiedtypes = [
    "fz-array",
    "fz-asset",
    "fz-boolean",
    "fz-constant",
    "fz-date",
    "fz-datetime",
    "fz-document",
    'fz-enum-select',
    'fz-enum-array',
    "fz-geolocation",
    "fz-integer",
    'fz-markdown',
    'fz-enum-check',
    "fz-float",
    "fz-object",
    "fz-range",
    "fz-signature",
    "fz-string",
    "fz-textarea",
    "fz-enum-typeahead",
    "fz-time",
    "fz-uuid",
];
const fieldtypeslist = fiedtypes.join(',');
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
class FzField extends Base {
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
    #touched_accessor_storage = false;
    get touched() { return this.#touched_accessor_storage; }
    set touched(value) { this.#touched_accessor_storage = value; }
    #errors_accessor_storage = NOT_TOUCHED;
    get errors() { return this.#errors_accessor_storage; }
    set errors(value) { this.#errors_accessor_storage = value; }
    //private _initdone = false
    _dofocus = false;
    _form;
    get valid() {
        return this.errors.length === 0 && this.errors != NOT_TOUCHED;
    }
    get invalid() {
        return this.errors.length > 0;
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
        this.errors = [];
        this.form?.check();
    }
    get validationMap() {
        return e$1({ "is-valid": this.valid, "is-invalid": this.invalid });
    }
    /**
     * this method is called for to update this.value (and must be done only here)
     * @param value
     * @returns
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
                f.toField();
                f.requestUpdate();
            });
        }
        // trigger a requestUpdate for this field
        this.toField();
        this.requestUpdate();
        return true;
    }
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
        return (this.isItem ? String(this.index != null ? this.index + 1 : '-') : this.schema.title ?? this.name) ?? "";
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
    get empty() { return this.schema._empty(); }
    get isEmpty() { return isEmptyValue(this.value); }
    // get pointer() { return pointerData(this.data,this.key) }
    /**
     * call for focus on next update for field
     */
    dofocus() { this._dofocus = true; }
    /**
    * preventDefault and stopPropagation on event (helper)
    * @param event
    */
    eventStop(event) {
        if (!event)
            return;
        event.preventDefault();
        event.stopPropagation();
    }
    fields() {
        const fields = [];
        this.shadowRoot?.querySelectorAll(fieldtypeslist).forEach(elem => fields.push(elem));
        return fields;
    }
    get form() {
        if (this._form)
            return this._form;
        this._form = closestAscendantFrom("fz-form", this);
        return this._form;
    }
    static get styles() {
        return [
            ...super.styles,
            i$5 `
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
    }
    /**
     * render method for this field component (calls renderField() abstract rendering method)
     */
    render() {
        return x `
            <div ?hidden="${!this.visible}">
                <div style="padding-top: 5px">${this.renderField()}</div>
                ${this.valid ? x `` : x `<div class="row">${this.renderErrors()}</div>`}
            </div>
        `;
    }
    renderErrors() {
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
    get renderLabel() {
        if (this.schema.title === "")
            return x ``;
        if (this.isItem)
            return x `
            <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
                <div @click="${this.labelClicked}"><span class="badge bg-primary rounded-pill">${this.label}</span></div>
            </label>`;
        return x `
            <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
                <div>${this.label}${this.required ? '*' : ''}</div>
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
            case "fz-asset": return x `<fz-asset .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-asset>`;
            case "fz-signature": return x `<fz-signature .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-signature>`;
            case "fz-boolean": return x `<fz-boolean .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-boolean>`;
            case "fz-float": return x `<fz-float .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-float>`;
            case "fz-integer": return x `<fz-integer .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-integer>`;
            case "fz-range": return x `<fz-range .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-range>`;
            case "fz-geolocation": return x `<fz-geolocation .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-geolocation>`;
            case "fz-array": return x `<fz-array .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-array>`;
            case "fz-object": return x ` <fz-object .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-object>`;
            case "fz-constant": return x ` <fz-constant .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-constant>`;
            case "fz-enum-array": return x ` <fz-enum-array .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-array>`;
            case "fz-document": return x ` <fz-document .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-document>`;
            case "fz-uuid": return x ` <fz-uuid .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-uuid>`;
            case "fz-markdown": return x ` <fz-markdown .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-markdown>`;
            case "fz-enum-typeahead": return x ` <fz-enum-typeahead .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-typeahead>`;
            case 'fz-error':
            default: return x `<div class="alert alert-warning" role="alert">field name=${name} type ${schema.basetype}/${schema.field} not implemented !</div>`;
        }
    }
    // lit overridings 
    // ---------------
    connectedCallback() {
        super.connectedCallback();
        this.form?.addField(this.schema.pointer, this.pointer, this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.form?.removeField(this.schema.pointer, this.pointer);
    }
    /**
     * before each update
     * - set queried focus
     * @param changedProps changed properties
     */
    update(changedProps) {
        if (this.schema.expression)
            this.value = this.evalExpr("expression");
        super.update(changedProps);
        if (this._dofocus) {
            this._dofocus = false;
            this.focus();
        }
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
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
            // TBD with options console.log(`DATA ${this.pointer} update triggering "data-updated" event`)
            this.dispatchEvent(new CustomEvent('data-updated', {
                detail: {
                    trackers: this.schema.trackers,
                    field: this
                },
                bubbles: true,
                composed: true
            }));
        }
        this.requestUpdate();
    }
    /**
     * calculate an abstract string (summary) for this field or a property/item of field
     */
    abstract(key, itemschema) {
        let text;
        if (key === null || key === undefined) {
            if (this.isEmpty)
                return "~";
            text = this.schema.abstract
                ? this.evalExpr("abstract")
                : this.schema._abstract(this.value);
        }
        else if (notNull(itemschema) && isFunction$1(itemschema.from)) {
            const refto = itemschema.from?.(itemschema, this.value[key], this.data, this.key, this.derefFunc, this.form.options.userdata);
            const index = refto.refarray.findIndex((x) => x[refto.refname] === this.value[key]);
            const value = refto.refarray[index];
            const schema = getSchema(value);
            text = isFunction$1(schema.abstract)
                ? schema.abstract(schema, value, refto.refarray, index, this.derefFunc, this.form.options.userdata)
                : schema._abstract(this.value[key]);
        }
        else {
            const schema = (typeof key === 'string') ? this.schema.properties?.[key] : itemschema;
            text = isFunction$1(schema?.abstract)
                ? schema.abstract(schema, this.value[key], this.data, this.key, this.derefFunc, this.form.options.userdata)
                : schema?._abstract(this.value[key]);
        }
        return text.length > 200 ? text.substring(0, 200) + '...' : text;
    }
    evalExpr(attribute, schema, value, parent, key) {
        const exprFunc = this.schema?.[attribute];
        if (!isFunction$1(exprFunc))
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
        if (this.schema.expression) {
            this.value = this.evalExpr("expression");
        }
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
    n$2({ type: Boolean, attribute: false })
], FzField.prototype, "touched", null);
__decorate([
    n$2({ type: Array, attribute: false })
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
    renderField() {
        return x `
            <div class="form-group row">
                ${this.renderLabel}
                <div class="col-sm">${this.renderInput()}</div>
            </div>`;
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
    /**
     * overide focus for all input based fields
     */
    focus() { this.input?.focus(); }
    /**
     * trap F9 key down to log debug Field state
     * @param evt keyboard event to trap key
     */
    debugKey(evt) {
        if (evt.key === 'F9') {
            window._FZ_FORM_FIELD_DEBUG = this;
            console.log(invalidkeys.map((key) => `${key} = ${this.input.validity[key]}`).join('\n'));
            const outlist = [
                ['name', this.name],
                ['valid', this.valid],
                ['visible', this.visible],
                ['required', this.required],
                ['readonly', this.readonly],
                ['check', JSON.stringify(this.input.validity)],
                ['data', JSON.stringify(this.data, (key, value) => typeof key === 'symbol' ? undefined : value, 4)],
                ['input', this.input.value],
                ['value', this.value],
                ['schema', JSON.stringify(this.schema, getCircularReplacer)],
            ];
            console.log(outlist.map(item => item.join(" = ")).join("\n"));
            this.eventStop(evt);
            debugger;
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
        if (!this.schema.nullAllowed)
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
            case isFunction$1(this.schema.from):
                this.enums = this.getFrom();
                break;
            case notNull(this.schema.enumFetch):
                this.fetchEnum()
                    .then((enums) => (this.enums = enums, this.requestUpdate()), (err) => (this.errors = [String(err)]));
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
                    const title = isFunction$1(schema?.abstract) ? schema.abstract(schema, item, target, index, this.derefFunc, this.form.options.userdata) : value;
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
            class="form-control ${this.validationMap}" 
            type="date" 
            ?readonly="${this.readonly}" 
            @input="${this.change}"
            min="${o(this.min)}"
            max="${o(this.max)}"
            ?required="${this.required}"
            autocomplete=off  spellcheck="false"
        />`;
    }
    get min() {
        return this.schema.minimum;
    }
    get max() {
        return this.schema.maximum;
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
            this.input.valueAsDate = redate.test(this.value) ? new Date(this.value.substring(0, 16)) : null;
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
            class="form-control ${this.validationMap}"
            autocomplete=off  spellcheck="false"
        />`;
    }
    get min() {
        return this.schema.minimum;
    }
    get max() {
        return this.schema.maximum;
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
                class="form-control timepicker ${this.validationMap}" 
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
            this.value = notNull(this.input.value) ? this.input.value : undefined;
        }
    }
    renderInput() {
        return x `
            <textarea  
                class="form-control ${this.validationMap}" 
                id="input"
                placeholder="${o(this.label)}"
                .value="${this.value}" 
                ?readonly="${this.readonly}"
                @input="${this.change}"
                @keypress="${this.change}"
                minlength="${o(this.minlength)}"
                maxlength="${o(this.maxlength)}"
                ?required="${this.required}"
                rows="5"
            ></textarea>`;
    }
    get minlength() { return this.schema.minLength; }
    get maxlength() { return this.schema.maxLength; }
    get pattern() { return this.schema.pattern; }
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
            <div class="input-group" >
                <input
                    class="form-control ${this.validationMap}" 
                    type="${this.type}" 
                    id="input"
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    minlength="${o(this.minlength)}"
                    maxlength="${o(this.maxlength)}"
                    pattern="${o(this.pattern)}"
                    ?required="${this.required}"
                    autocomplete=off  spellcheck="false"
                />
                ${this.type === 'color' && this.value != null
            ? x `<span class="input-group-text" style="max-width:5em">${this.value}</span>`
            : ''}
            </div>`;
    }
    get minlength() { return this.schema.minLength; }
    get maxlength() { return this.schema.maxLength; }
    get pattern() { return this.schema.pattern; }
    get type() {
        switch (this.schema.format) {
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
                    class="form-control ${this.validationMap}"
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
        return this.schema.mask ?? "";
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
            <div id="content" class="form-control ${this.validationMap}">
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
    renderInput() {
        return x `
            <div class="form-group row">
                <div class="col-sm-12">
                    <div class="form-check d-flex">
                        <input 
                            id="input"
                            type="checkbox"
                            ?required="${this.required}"
                            @change="${this.tryChange}"
                            @click="${this.tryChange}"
                            class="form-check-input align-self-start ${this.validationMap}"
                            autocomplete=off  spellcheck="false"
                        />
                        <label class="form-check-label ms-2" for="input">${super.label}</label>
                    </div>
                </div>
            </div>
        `;
    }
    tryChange(event) {
        if (this.readonly)
            event.preventDefault();
        else
            this.change();
    }
    get label() { return ""; }
    toField() {
        if (isNull(this.input))
            return;
        switch (true) {
            case this.value === undefined:
                // Always treat undefined as "not set" (indeterminate)
                this.input.indeterminate = true;
                this.input.checked = false;
                break;
            case this.value === null && this.schema.nullAllowed:
                // Only treat null as indeterminate if null is allowed
                this.input.indeterminate = true;
                this.input.checked = false;
                break;
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
    toField() {
        if (notNull(this.input)) {
            if (isNumber$1(this.value)) {
                this.input.valueAsNumber = this.value;
            }
            else {
                this.input.value = "";
            }
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = isNumber$1(this.input.valueAsNumber) ? this.input.valueAsNumber : undefined;
        }
    }
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
    renderInput() {
        return x `
            <div class="input-group">
                <input 
                    class="form-control ${this.validationMap}" 
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
        if (isNumber$1(this.schema.maximum))
            return this.schema.maximum;
        if (isNumber$1(this.schema.exclusiveMaximum))
            return this.schema.exclusiveMaximum;
        return;
    }
    get min() {
        if (isNumber$1(this.schema.minimum))
            return this.schema.minimum;
        if (isNumber$1(this.schema.exclusiveMinimum))
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
            this.input.valueAsNumber = isNumber$1(this.value) ? Math.floor(this.value) : NaN;
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = isNumber$1(this.input.valueAsNumber) ? this.input.valueAsNumber : undefined;
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
                    .value="${this.value}" 
                    ?disabled="${this.readonly}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    min="${o(this.min)}"
                    max="${o(this.max)}"
                    step="1"
                    ?required="${this.required}"
                    class="form-control ${this.validationMap}"
                    autocomplete=off  spellcheck="false"
                />
                <div class="input-group-append" style="max-width:5em" >
                    <span class="input-group-text" >${this.value}</span>
                </div>
            </div>`;
    }
    get max() {
        if (isNumber$1(this.schema.maximum))
            return this.schema.maximum;
        if (isNumber$1(this.schema.exclusiveMaximum))
            return this.schema.exclusiveMaximum;
        return;
    }
    get min() {
        if (isNumber$1(this.schema.minimum))
            return this.schema.minimum;
        if (isNumber$1(this.schema.exclusiveMinimum))
            return this.schema.exclusiveMinimum;
        return;
    }
    keypress() {
        // if (!/[-0123456789]/.test(event.key)) return event.preventDefault();
        // if (this.min >= 0 && event.key === '-') return event.preventDefault();
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
let FzInputGeolocation = class FzInputGeolocation extends FzInputBase {
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
            <div class="input-group ${this.validationMap}">
                <input
                    class="form-control"
                    type="text"
                    id="input"
                    readonly
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}" 
                    autocomplete=off  spellcheck="false"
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
                        class="btn btn-primary btn-sm"
                        @click="${this.geolocate}"
                        aria-label="Geolocate">
                            <i class="bi bi-geo-alt"></i>
                    </button>
                </div>
            </div>`;
    }
    geolocate() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.input.value = `POINT (${position.coords.longitude} ${position.coords.latitude})`;
            this.change();
        });
    }
    remove() {
        this.input.value = "";
        this.change();
    }
};
FzInputGeolocation = __decorate([
    t$4("fz-geolocation")
], FzInputGeolocation);

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
let FzInputInteger = class FzInputInteger extends FzInputBase {
    toField() {
        if (notNull(this.input)) {
            if (isNumber$1(this.value)) {
                this.input.valueAsNumber = this.value;
            }
            else {
                this.input.value = "";
            }
        }
    }
    toValue() {
        if (notNull(this.input)) {
            this.value = isNumber$1(this.input.valueAsNumber) ? Math.floor(this.input.valueAsNumber) : undefined;
        }
    }
    renderInput() {
        return x `
            <div class="input-group">
                <input 
                    class="form-control ${this.validationMap}" 
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
        if (isNumber$1(this.schema.maximum))
            return this.schema.maximum;
        if (isNumber$1(this.schema.exclusiveMaximum))
            return this.schema.exclusiveMaximum;
        return;
    }
    get min() {
        if (isNumber$1(this.schema.minimum))
            return this.schema.minimum;
        if (isNumber$1(this.schema.exclusiveMinimum))
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
        return x `<div class="input-group ${this.validationMap}">${this.value}</div>`;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.value !== this.schema.const)
            this.value = this.schema.const;
    }
};
FzInputConstant = __decorate([
    t$4("fz-constant")
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
                ${(!this.isEmpty && !(this.url && this.hasPreview)) ? x `
                    <div class="input-group-prepend">
                        <span class="input-group-text"  @click="${this.open}"><i class="bi bi-eye"></i></span>
                    </div>` : null}
                <input class="form-control ${this.validationMap}"  type="text" spellcheck="false"
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
                ${(this.isEmpty || this.readonly) ? x `` : x `
                    <button  @click="${this.delete}"  type="button" class="close-right btn-close" aria-label="Close"> </button>`}
                ${(!this.isEmpty || this.readonly) ? x `` : x `
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
                //this.valid = false
                this.errors = ["document not found"];
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
    t$4("fz-document")
], FzInputDoc);

/* eslint-disable no-bitwise */

const decodeCache = {};

function getDecodeCache (exclude) {
  let cache = decodeCache[exclude];
  if (cache) { return cache }

  cache = decodeCache[exclude] = [];

  for (let i = 0; i < 128; i++) {
    const ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (let i = 0; i < exclude.length; i++) {
    const ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache
}

// Decode percent-encoded string.
//
function decode$1 (string, exclude) {
  if (typeof exclude !== 'string') {
    exclude = decode$1.defaultChars;
  }

  const cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function (seq) {
    let result = '';

    for (let i = 0, l = seq.length; i < l; i += 3) {
      const b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          const chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        const b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          const chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        const b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          let chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue
        }
      }

      result += '\ufffd';
    }

    return result
  })
}

decode$1.defaultChars = ';/?:@&=+$,#';
decode$1.componentChars = '';

const encodeCache = {};

// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache (exclude) {
  let cache = encodeCache[exclude];
  if (cache) { return cache }

  cache = encodeCache[exclude] = [];

  for (let i = 0; i < 128; i++) {
    const ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (let i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache
}

// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode$1 (string, exclude, keepEscaped) {
  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped = exclude;
    exclude = encode$1.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  const cache = getEncodeCache(exclude);
  let result = '';

  for (let i = 0, l = string.length; i < l; i++) {
    const code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue
      }
    }

    if (code < 128) {
      result += cache[code];
      continue
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        const nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue
        }
      }
      result += '%EF%BF%BD';
      continue
    }

    result += encodeURIComponent(string[i]);
  }

  return result
}

encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode$1.componentChars = "-_.!~*'()";

function format$2 (url) {
  let result = '';

  result += url.protocol || '';
  result += url.slashes ? '//' : '';
  result += url.auth ? url.auth + '@' : '';

  if (url.hostname && url.hostname.indexOf(':') !== -1) {
    // ipv6 address
    result += '[' + url.hostname + ']';
  } else {
    result += url.hostname || '';
  }

  result += url.port ? ':' + url.port : '';
  result += url.pathname || '';
  result += url.search || '';
  result += url.hash || '';

  return result
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

//
// Changes from joyent/node:
//
// 1. No leading slash in paths,
//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
//
// 2. Backslashes are not replaced with slashes,
//    so `http:\\example.org\` is treated like a relative path
//
// 3. Trailing colon is treated like a part of the path,
//    i.e. in `http://example.org:foo` pathname is `:foo`
//
// 4. Nothing is URL-encoded in the resulting object,
//    (in joyent/node some chars in auth and paths are encoded)
//
// 5. `url.parse()` does not have `parseQueryString` argument
//
// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
//    which can be constructed using other parts of the url.
//

function Url () {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
const protocolPattern = /^([a-z0-9.+-]+:)/i;
const portPattern = /:[0-9]*$/;

// Special case for a simple path URL
/* eslint-disable-next-line no-useless-escape */
const simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;

// RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
const delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'];

// RFC 2396: characters not allowed for various reasons.
const unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims);

// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
const autoEscape = ['\''].concat(unwise);
// Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
const nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape);
const hostEndingChars = ['/', '?', '#'];
const hostnameMaxLen = 255;
const hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
const hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
// protocols that can allow "unsafe" and "unwise" chars.
// protocols that never have a hostname.
const hostlessProtocol = {
  javascript: true,
  'javascript:': true
};
// protocols that always contain a // bit.
const slashedProtocol = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
};

function urlParse (url, slashesDenoteHost) {
  if (url && url instanceof Url) return url

  const u = new Url();
  u.parse(url, slashesDenoteHost);
  return u
}

Url.prototype.parse = function (url, slashesDenoteHost) {
  let lowerProto, hec, slashes;
  let rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    const simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this
    }
  }

  let proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  /* eslint-disable-next-line no-useless-escape */
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    let hostEnd = -1;
    for (let i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    let auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (let i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }

    if (rest[hostEnd - 1] === ':') { hostEnd--; }
    const host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost(host);

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    const ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      const hostparts = this.hostname.split(/\./);
      for (let i = 0, l = hostparts.length; i < l; i++) {
        const part = hostparts[i];
        if (!part) { continue }
        if (!part.match(hostnamePartPattern)) {
          let newpart = '';
          for (let j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            const validParts = hostparts.slice(0, i);
            const notHost = hostparts.slice(i + 1);
            const bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    }

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }

  // chop off from the tail first.
  const hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  const qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '';
  }

  return this
};

Url.prototype.parseHost = function (host) {
  let port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

var mdurl = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decode: decode$1,
    encode: encode$1,
    format: format$2,
    parse: urlParse
});

var Any = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

var Cc = /[\0-\x1F\x7F-\x9F]/;

var regex$1 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

var P = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

var regex = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;

var Z = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

var ucmicro = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Any: Any,
    Cc: Cc,
    Cf: regex$1,
    P: P,
    S: regex,
    Z: Z
});

// Generated using scripts/write-decode-map.ts
var htmlDecodeTree = new Uint16Array(
// prettier-ignore
"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
    .split("")
    .map((c) => c.charCodeAt(0)));

// Generated using scripts/write-decode-map.ts
var xmlDecodeTree = new Uint16Array(
// prettier-ignore
"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
    .split("")
    .map((c) => c.charCodeAt(0)));

// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a;
const decodeMap = new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
/**
 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
 */
const fromCodePoint$1 = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
    let output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
};
/**
 * Replace the given code point with a replacement character if it is a
 * surrogate or is outside the valid range. Otherwise return the code
 * point unchanged.
 */
function replaceCodePoint(codePoint) {
    var _a;
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return 0xfffd;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}

var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 0b100000;
var BinTrieFlags;
(function (BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F));
}
function isAsciiAlphaNumeric(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z) ||
        isNumber(code));
}
/**
 * Checks if the given character is a valid end character for an entity in an attribute.
 *
 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
 */
function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function (EntityDecoderState) {
    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function (DecodingMode) {
    /** Entities in text nodes that can end with any character. */
    DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
    /** Only allow entities terminated with a semicolon. */
    DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
    /** Entities in attributes have limitations on ending characters. */
    DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
 * Token decoder with support of writing partial entities.
 */
class EntityDecoder {
    constructor(
    /** The tree used to decode entities. */
    decodeTree, 
    /**
     * The function that is called when a codepoint is decoded.
     *
     * For multi-byte named entities, this will be called multiple times,
     * with the second codepoint, and the same `consumed` value.
     *
     * @param codepoint The decoded codepoint.
     * @param consumed The number of bytes consumed by the decoder.
     */
    emitCodePoint, 
    /** An object that is used to produce errors. */
    errors) {
        this.decodeTree = decodeTree;
        this.emitCodePoint = emitCodePoint;
        this.errors = errors;
        /** The current state of the decoder. */
        this.state = EntityDecoderState.EntityStart;
        /** Characters that were consumed while parsing an entity. */
        this.consumed = 1;
        /**
         * The result of the entity.
         *
         * Either the result index of a numeric entity, or the codepoint of a
         * numeric entity.
         */
        this.result = 0;
        /** The current index in the decode tree. */
        this.treeIndex = 0;
        /** The number of characters that were consumed in excess. */
        this.excess = 1;
        /** The mode in which the decoder is operating. */
        this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
        this.decodeMode = decodeMode;
        this.state = EntityDecoderState.EntityStart;
        this.result = 0;
        this.treeIndex = 0;
        this.excess = 1;
        this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(str, offset) {
        switch (this.state) {
            case EntityDecoderState.EntityStart: {
                if (str.charCodeAt(offset) === CharCodes.NUM) {
                    this.state = EntityDecoderState.NumericStart;
                    this.consumed += 1;
                    return this.stateNumericStart(str, offset + 1);
                }
                this.state = EntityDecoderState.NamedEntity;
                return this.stateNamedEntity(str, offset);
            }
            case EntityDecoderState.NumericStart: {
                return this.stateNumericStart(str, offset);
            }
            case EntityDecoderState.NumericDecimal: {
                return this.stateNumericDecimal(str, offset);
            }
            case EntityDecoderState.NumericHex: {
                return this.stateNumericHex(str, offset);
            }
            case EntityDecoderState.NamedEntity: {
                return this.stateNamedEntity(str, offset);
            }
        }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(str, offset) {
        if (offset >= str.length) {
            return -1;
        }
        if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(str, offset + 1);
        }
        this.state = EntityDecoderState.NumericDecimal;
        return this.stateNumericDecimal(str, offset);
    }
    addToNumericResult(str, start, end, base) {
        if (start !== end) {
            const digitCount = end - start;
            this.result =
                this.result * Math.pow(base, digitCount) +
                    parseInt(str.substr(start, digitCount), base);
            this.consumed += digitCount;
        }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(str, offset) {
        const startIdx = offset;
        while (offset < str.length) {
            const char = str.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 16);
                return this.emitNumericEntity(char, 3);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 16);
        return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(str, offset) {
        const startIdx = offset;
        while (offset < str.length) {
            const char = str.charCodeAt(offset);
            if (isNumber(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 10);
                return this.emitNumericEntity(char, 2);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 10);
        return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
        var _a;
        // Ensure we consumed at least one digit.
        if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
        }
        // Figure out if this is a legit end of the entity
        if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
        }
        else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
        }
        this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
        if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
                this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
        }
        return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(str, offset) {
        const { decodeTree } = this;
        let current = decodeTree[this.treeIndex];
        // The mask is the number of bytes of the value, including the current byte.
        let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        for (; offset < str.length; offset++, this.excess++) {
            const char = str.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
                return this.result === 0 ||
                    // If we are parsing an attribute
                    (this.decodeMode === DecodingMode.Attribute &&
                        // We shouldn't have consumed any characters after the entity,
                        (valueLength === 0 ||
                            // And there should be no invalid characters.
                            isEntityInAttributeInvalidEnd(char)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            // If the branch is a value, store it and continue
            if (valueLength !== 0) {
                // If the entity is terminated by a semicolon, we are done.
                if (char === CharCodes.SEMI) {
                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                }
                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                if (this.decodeMode !== DecodingMode.Strict) {
                    this.result = this.treeIndex;
                    this.consumed += this.excess;
                    this.excess = 0;
                }
            }
        }
        return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
        var _a;
        const { result, decodeTree } = this;
        const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
        this.emitNamedEntityData(result, valueLength, this.consumed);
        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
        return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
        const { decodeTree } = this;
        this.emitCodePoint(valueLength === 1
            ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
            : decodeTree[result + 1], consumed);
        if (valueLength === 3) {
            // For multi-byte values, we need to emit the second byte.
            this.emitCodePoint(decodeTree[result + 2], consumed);
        }
        return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
        var _a;
        switch (this.state) {
            case EntityDecoderState.NamedEntity: {
                // Emit a named entity if we have one.
                return this.result !== 0 &&
                    (this.decodeMode !== DecodingMode.Attribute ||
                        this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
            }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal: {
                return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
                return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                return 0;
            }
            case EntityDecoderState.EntityStart: {
                // Return 0 if we have no entity.
                return 0;
            }
        }
    }
}
/**
 * Creates a function that decodes entities in a string.
 *
 * @param decodeTree The decode tree.
 * @returns A function that decodes entities in a string.
 */
function getDecoder(decodeTree) {
    let ret = "";
    const decoder = new EntityDecoder(decodeTree, (str) => (ret += fromCodePoint$1(str)));
    return function decodeWithTrie(str, decodeMode) {
        let lastIndex = 0;
        let offset = 0;
        while ((offset = str.indexOf("&", offset)) >= 0) {
            ret += str.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            const len = decoder.write(str, 
            // Skip the "&"
            offset + 1);
            if (len < 0) {
                lastIndex = offset + decoder.end();
                break;
            }
            lastIndex = offset + len;
            // If `len` is 0, skip the current `&` and continue.
            offset = len === 0 ? lastIndex + 1 : lastIndex;
        }
        const result = ret + str.slice(lastIndex);
        // Make sure we don't keep a reference to the final string.
        ret = "";
        return result;
    };
}
/**
 * Determines the branch of the current node that is taken given the current
 * character. This function is used to traverse the trie.
 *
 * @param decodeTree The trie.
 * @param current The current node.
 * @param nodeIdx The index right after the current node and its value.
 * @param char The current character.
 * @returns The index of the next node, or -1 if no branch is taken.
 */
function determineBranch(decodeTree, current, nodeIdx, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        const value = char - jumpOffset;
        return value < 0 || value >= branchCount
            ? -1
            : decodeTree[nodeIdx + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    let lo = nodeIdx;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const midVal = decodeTree[mid];
        if (midVal < char) {
            lo = mid + 1;
        }
        else if (midVal > char) {
            hi = mid - 1;
        }
        else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
const htmlDecoder = getDecoder(htmlDecodeTree);
getDecoder(xmlDecodeTree);
/**
 * Decodes an HTML string.
 *
 * @param str The string to decode.
 * @param mode The decoding mode.
 * @returns The decoded string.
 */
function decodeHTML(str, mode = DecodingMode.Legacy) {
    return htmlDecoder(str, mode);
}

// Utilities
//


function _class$1 (obj) { return Object.prototype.toString.call(obj) }

function isString$1 (obj) { return _class$1(obj) === '[object String]' }

const _hasOwnProperty = Object.prototype.hasOwnProperty;

function has (object, key) {
  return _hasOwnProperty.call(object, key)
}

// Merge objects
//
function assign$1 (obj /* from1, from2, from3, ... */) {
  const sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be object')
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj
}

// Remove element from array and put another array at those position.
// Useful for some operations with tokens
function arrayReplaceAt (src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1))
}

function isValidEntityCode (c) {
  /* eslint no-bitwise:0 */
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) { return false }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) { return false }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false }
  // control codes
  if (c >= 0x00 && c <= 0x08) { return false }
  if (c === 0x0B) { return false }
  if (c >= 0x0E && c <= 0x1F) { return false }
  if (c >= 0x7F && c <= 0x9F) { return false }
  // out of range
  if (c > 0x10FFFF) { return false }
  return true
}

function fromCodePoint (c) {
  /* eslint no-bitwise:0 */
  if (c > 0xffff) {
    c -= 0x10000;
    const surrogate1 = 0xd800 + (c >> 10);
    const surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2)
  }
  return String.fromCharCode(c)
}

const UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
const ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
const UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

const DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;

function replaceEntityPattern (match, name) {
  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    const code = name[1].toLowerCase() === 'x'
      ? parseInt(name.slice(2), 16)
      : parseInt(name.slice(1), 10);

    if (isValidEntityCode(code)) {
      return fromCodePoint(code)
    }

    return match
  }

  const decoded = decodeHTML(match);
  if (decoded !== match) {
    return decoded
  }

  return match
}

/* function replaceEntities(str) {
  if (str.indexOf('&') < 0) { return str; }

  return str.replace(ENTITY_RE, replaceEntityPattern);
} */

function unescapeMd (str) {
  if (str.indexOf('\\') < 0) { return str }
  return str.replace(UNESCAPE_MD_RE, '$1')
}

function unescapeAll (str) {
  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str }

  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
    if (escaped) { return escaped }
    return replaceEntityPattern(match, entity)
  })
}

const HTML_ESCAPE_TEST_RE = /[&<>"]/;
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
const HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar (ch) {
  return HTML_REPLACEMENTS[ch]
}

function escapeHtml (str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar)
  }
  return str
}

const REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

function escapeRE$1 (str) {
  return str.replace(REGEXP_ESCAPE_RE, '\\$&')
}

function isSpace (code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true
  }
  return false
}

// Zs (unicode class) || [\t\f\v\r\n]
function isWhiteSpace (code) {
  if (code >= 0x2000 && code <= 0x200A) { return true }
  switch (code) {
    case 0x09: // \t
    case 0x0A: // \n
    case 0x0B: // \v
    case 0x0C: // \f
    case 0x0D: // \r
    case 0x20:
    case 0xA0:
    case 0x1680:
    case 0x202F:
    case 0x205F:
    case 0x3000:
      return true
  }
  return false
}

/* eslint-disable max-len */

// Currently without astral characters support.
function isPunctChar (ch) {
  return P.test(ch) || regex.test(ch)
}

// Markdown ASCII punctuation characters.
//
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
//
// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
//
function isMdAsciiPunct (ch) {
  switch (ch) {
    case 0x21/* ! */:
    case 0x22/* " */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x27/* ' */:
    case 0x28/* ( */:
    case 0x29/* ) */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2C/* , */:
    case 0x2D/* - */:
    case 0x2E/* . */:
    case 0x2F/* / */:
    case 0x3A/* : */:
    case 0x3B/* ; */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x3F/* ? */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7C/* | */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true
    default:
      return false
  }
}

// Hepler to unify [reference labels].
//
function normalizeReference (str) {
  // Trim and collapse whitespace
  //
  str = str.trim().replace(/\s+/g, ' ');

  // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
  // fixed in v12 (couldn't find any details).
  //
  // So treat this one as a special case
  // (remove this when node v10 is no longer supported).
  //
  if ('ẞ'.toLowerCase() === 'Ṿ') {
    str = str.replace(/ẞ/g, 'ß');
  }

  // .toLowerCase().toUpperCase() should get rid of all differences
  // between letter variants.
  //
  // Simple .toLowerCase() doesn't normalize 125 code points correctly,
  // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
  // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
  // uppercased versions).
  //
  // Here's an example showing how it happens. Lets take greek letter omega:
  // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
  //
  // Unicode entries:
  // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
  // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
  // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
  // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
  //
  // Case-insensitive comparison should treat all of them as equivalent.
  //
  // But .toLowerCase() doesn't change ϑ (it's already lowercase),
  // and .toUpperCase() doesn't change ϴ (already uppercase).
  //
  // Applying first lower then upper case normalizes any character:
  // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
  //
  // Note: this is equivalent to unicode case folding; unicode normalization
  // is a different step that is not required here.
  //
  // Final result should be uppercased, because it's later stored in an object
  // (this avoid a conflict with Object.prototype members,
  // most notably, `__proto__`)
  //
  return str.toLowerCase().toUpperCase()
}

// Re-export libraries commonly used in both markdown-it and its plugins,
// so plugins won't have to depend on them explicitly, which reduces their
// bundled size (e.g. a browser build).
//
const lib = { mdurl, ucmicro };

var utils$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    arrayReplaceAt: arrayReplaceAt,
    assign: assign$1,
    escapeHtml: escapeHtml,
    escapeRE: escapeRE$1,
    fromCodePoint: fromCodePoint,
    has: has,
    isMdAsciiPunct: isMdAsciiPunct,
    isPunctChar: isPunctChar,
    isSpace: isSpace,
    isString: isString$1,
    isValidEntityCode: isValidEntityCode,
    isWhiteSpace: isWhiteSpace,
    lib: lib,
    normalizeReference: normalizeReference,
    unescapeAll: unescapeAll,
    unescapeMd: unescapeMd
});

// Parse link label
//
// this function assumes that first character ("[") already matches;
// returns the end of the label
//

function parseLinkLabel (state, start, disableNested) {
  let level, found, marker, prevPos;

  const max = state.posMax;
  const oldPos = state.pos;

  state.pos = start + 1;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5D /* ] */) {
      level--;
      if (level === 0) {
        found = true;
        break
      }
    }

    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 0x5B /* [ */) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `[`, which is not a part of any token
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1
      }
    }
  }

  let labelEnd = -1;

  if (found) {
    labelEnd = state.pos;
  }

  // restore old state
  state.pos = oldPos;

  return labelEnd
}

// Parse link destination
//


function parseLinkDestination (str, start, max) {
  let code;
  let pos = start;

  const result = {
    ok: false,
    pos: 0,
    str: ''
  };

  if (str.charCodeAt(pos) === 0x3C /* < */) {
    pos++;
    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === 0x0A /* \n */) { return result }
      if (code === 0x3C /* < */) { return result }
      if (code === 0x3E /* > */) {
        result.pos = pos + 1;
        result.str = unescapeAll(str.slice(start + 1, pos));
        result.ok = true;
        return result
      }
      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue
      }

      pos++;
    }

    // no closing '>'
    return result
  }

  // this should be ... } else { ... branch

  let level = 0;
  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === 0x20) { break }

    // ascii control characters
    if (code < 0x20 || code === 0x7F) { break }

    if (code === 0x5C /* \ */ && pos + 1 < max) {
      if (str.charCodeAt(pos + 1) === 0x20) { break }
      pos += 2;
      continue
    }

    if (code === 0x28 /* ( */) {
      level++;
      if (level > 32) { return result }
    }

    if (code === 0x29 /* ) */) {
      if (level === 0) { break }
      level--;
    }

    pos++;
  }

  if (start === pos) { return result }
  if (level !== 0) { return result }

  result.str = unescapeAll(str.slice(start, pos));
  result.pos = pos;
  result.ok = true;
  return result
}

// Parse link title
//


// Parse link title within `str` in [start, max] range,
// or continue previous parsing if `prev_state` is defined (equal to result of last execution).
//
function parseLinkTitle (str, start, max, prev_state) {
  let code;
  let pos = start;

  const state = {
    // if `true`, this is a valid link title
    ok: false,
    // if `true`, this link can be continued on the next line
    can_continue: false,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: '',
    // expected closing marker character code
    marker: 0
  };

  if (prev_state) {
    // this is a continuation of a previous parseLinkTitle call on the next line,
    // used in reference links only
    state.str = prev_state.str;
    state.marker = prev_state.marker;
  } else {
    if (pos >= max) { return state }

    let marker = str.charCodeAt(pos);
    if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return state }

    start++;
    pos++;

    // if opening marker is "(", switch it to closing marker ")"
    if (marker === 0x28) { marker = 0x29; }

    state.marker = marker;
  }

  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === state.marker) {
      state.pos = pos + 1;
      state.str += unescapeAll(str.slice(start, pos));
      state.ok = true;
      return state
    } else if (code === 0x28 /* ( */ && state.marker === 0x29 /* ) */) {
      return state
    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos++;
    }

    pos++;
  }

  // no closing marker found, but this link title may continue on the next line (for references)
  state.can_continue = true;
  state.str += unescapeAll(str.slice(start, pos));
  return state
}

// Just a shortcut for bulk export

var helpers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parseLinkDestination: parseLinkDestination,
    parseLinkLabel: parseLinkLabel,
    parseLinkTitle: parseLinkTitle
});

/**
 * class Renderer
 *
 * Generates HTML from parsed token stream. Each instance has independent
 * copy of rules. Those can be rewritten with ease. Also, you can add new
 * rules if you create plugin and adds new token types.
 **/


const default_rules = {};

default_rules.code_inline = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];

  return  '<code' + slf.renderAttrs(token) + '>' +
          escapeHtml(token.content) +
          '</code>'
};

default_rules.code_block = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];

  return  '<pre' + slf.renderAttrs(token) + '><code>' +
          escapeHtml(tokens[idx].content) +
          '</code></pre>\n'
};

default_rules.fence = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];
  const info = token.info ? unescapeAll(token.info).trim() : '';
  let langName = '';
  let langAttrs = '';

  if (info) {
    const arr = info.split(/(\s+)/g);
    langName = arr[0];
    langAttrs = arr.slice(2).join('');
  }

  let highlighted;
  if (options.highlight) {
    highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n'
  }

  // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .deepClone() for token and simplify this part, but
  // now we prefer to keep things local.
  if (info) {
    const i = token.attrIndex('class');
    const tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push(['class', options.langPrefix + langName]);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice();
      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    }

    // Fake token just to render attributes
    const tmpToken = {
      attrs: tmpAttrs
    };

    return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>\n`
  }

  return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>\n`
};

default_rules.image = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];

  // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] =
    slf.renderInlineAsText(token.children, options, env);

  return slf.renderToken(tokens, idx, options)
};

default_rules.hardbreak = function (tokens, idx, options /*, env */) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n'
};
default_rules.softbreak = function (tokens, idx, options /*, env */) {
  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n'
};

default_rules.text = function (tokens, idx /*, options, env */) {
  return escapeHtml(tokens[idx].content)
};

default_rules.html_block = function (tokens, idx /*, options, env */) {
  return tokens[idx].content
};
default_rules.html_inline = function (tokens, idx /*, options, env */) {
  return tokens[idx].content
};

/**
 * new Renderer()
 *
 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
 **/
function Renderer () {
  /**
   * Renderer#rules -> Object
   *
   * Contains render rules for tokens. Can be updated and extended.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.renderer.rules.strong_open  = function () { return '<b>'; };
   * md.renderer.rules.strong_close = function () { return '</b>'; };
   *
   * var result = md.renderInline(...);
   * ```
   *
   * Each rule is called as independent static function with fixed signature:
   *
   * ```javascript
   * function my_token_render(tokens, idx, options, env, renderer) {
   *   // ...
   *   return renderedHTML;
   * }
   * ```
   *
   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs)
   * for more details and examples.
   **/
  this.rules = assign$1({}, default_rules);
}

/**
 * Renderer.renderAttrs(token) -> String
 *
 * Render token attributes to string.
 **/
Renderer.prototype.renderAttrs = function renderAttrs (token) {
  let i, l, result;

  if (!token.attrs) { return '' }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }

  return result
};

/**
 * Renderer.renderToken(tokens, idx, options) -> String
 * - tokens (Array): list of tokens
 * - idx (Numbed): token index to render
 * - options (Object): params of parser instance
 *
 * Default token renderer. Can be overriden by custom function
 * in [[Renderer#rules]].
 **/
Renderer.prototype.renderToken = function renderToken (tokens, idx, options) {
  const token = tokens[idx];
  let result = '';

  // Tight list paragraphs
  if (token.hidden) {
    return ''
  }

  // Insert a newline between hidden paragraph and subsequent opening
  // block-level tag.
  //
  // For example, here we should insert a newline before blockquote:
  //  - a
  //    >
  //
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }

  // Add token name, e.g. `<img`
  result += (token.nesting === -1 ? '</' : '<') + token.tag;

  // Encode attributes, e.g. `<img src="foo"`
  result += this.renderAttrs(token);

  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }

  // Check if we need to add a newline after this tag
  let needLf = false;
  if (token.block) {
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        const nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          // Block-level tag containing an inline tag.
          //
          needLf = false;
        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
          //
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';

  return result
};

/**
 * Renderer.renderInline(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * The same as [[Renderer.render]], but for single token of `inline` type.
 **/
Renderer.prototype.renderInline = function (tokens, options, env) {
  let result = '';
  const rules = this.rules;

  for (let i = 0, len = tokens.length; i < len; i++) {
    const type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result
};

/** internal
 * Renderer.renderInlineAsText(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Special kludge for image `alt` attributes to conform CommonMark spec.
 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
 * instead of simple escaping.
 **/
Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
  let result = '';

  for (let i = 0, len = tokens.length; i < len; i++) {
    switch (tokens[i].type) {
      case 'text':
        result += tokens[i].content;
        break
      case 'image':
        result += this.renderInlineAsText(tokens[i].children, options, env);
        break
      case 'html_inline':
      case 'html_block':
        result += tokens[i].content;
        break
      case 'softbreak':
      case 'hardbreak':
        result += '\n';
        break
        // all other tokens are skipped
    }
  }

  return result
};

/**
 * Renderer.render(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Takes token stream and generates HTML. Probably, you will never need to call
 * this method directly.
 **/
Renderer.prototype.render = function (tokens, options, env) {
  let result = '';
  const rules = this.rules;

  for (let i = 0, len = tokens.length; i < len; i++) {
    const type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result
};

/**
 * class Ruler
 *
 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - keep rules in defined order
 * - assign the name to each rule
 * - enable/disable rules
 * - add/replace rules
 * - allow assign rules to additional named chains (in the same)
 * - cacheing lists of active rules
 *
 * You will not need use this class directly until write plugins. For simple
 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
 * [[MarkdownIt.use]].
 **/

/**
 * new Ruler()
 **/
function Ruler () {
  // List of added rules. Each element is:
  //
  // {
  //   name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ]
  // }
  //
  this.__rules__ = [];

  // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - diginal anchor for fast filtering by charcodes.
  //
  this.__cache__ = null;
}

// Helper methods, should not be used directly

// Find rule index by name
//
Ruler.prototype.__find__ = function (name) {
  for (let i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i
    }
  }
  return -1
};

// Build rules lookup cache
//
Ruler.prototype.__compile__ = function () {
  const self = this;
  const chains = [''];

  // collect unique names
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) { return }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};

  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return }

      if (chain && rule.alt.indexOf(chain) < 0) { return }

      self.__cache__[chain].push(rule.fn);
    });
  });
};

/**
 * Ruler.at(name, fn [, options])
 * - name (String): rule name to replace.
 * - fn (Function): new rule function.
 * - options (Object): new rule options (not mandatory).
 *
 * Replace rule by name with new function & options. Throws error if name not
 * found.
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * Replace existing typographer replacement rule with new one:
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.at('replacements', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.at = function (name, fn, options) {
  const index = this.__find__(name);
  const opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + name) }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};

/**
 * Ruler.before(beforeName, ruleName, fn [, options])
 * - beforeName (String): new rule will be added before this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain before one with given name. See also
 * [[Ruler.after]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  const index = this.__find__(beforeName);
  const opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName) }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.after(afterName, ruleName, fn [, options])
 * - afterName (String): new rule will be added after this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain after one with given name. See also
 * [[Ruler.before]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  const index = this.__find__(afterName);
  const opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + afterName) }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.push(ruleName, fn [, options])
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Push new rule to the end of chain. See also
 * [[Ruler.before]], [[Ruler.after]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.push('my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.push = function (ruleName, fn, options) {
  const opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.enable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to enable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [list]; }

  const result = [];

  // Search by name and enable
  list.forEach(function (name) {
    const idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return }
      throw new Error('Rules manager: invalid rule name ' + name)
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result
};

/**
 * Ruler.enableOnly(list [, ignoreInvalid])
 * - list (String|Array): list of rule names to enable (whitelist).
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names, and disable everything else. If any rule name
 * not found - throw Error. Errors can be disabled by second param.
 *
 * See also [[Ruler.disable]], [[Ruler.enable]].
 **/
Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [list]; }

  this.__rules__.forEach(function (rule) { rule.enabled = false; });

  this.enable(list, ignoreInvalid);
};

/**
 * Ruler.disable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Disable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.disable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [list]; }

  const result = [];

  // Search by name and disable
  list.forEach(function (name) {
    const idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return }
      throw new Error('Rules manager: invalid rule name ' + name)
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result
};

/**
 * Ruler.getRules(chainName) -> Array
 *
 * Return array of active functions (rules) for given chain name. It analyzes
 * rules configuration, compiles caches if not exists and returns result.
 *
 * Default chain name is `''` (empty string). It can't be skipped. That's
 * done intentionally, to keep signature monomorphic for high speed.
 **/
Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }

  // Chain can be empty, if rules disabled. But we still have to return Array.
  return this.__cache__[chainName] || []
};

// Token class

/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/
function Token (type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type     = type;

  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/
  this.tag      = tag;

  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/
  this.attrs    = null;

  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/
  this.map      = null;

  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/
  this.nesting  = nesting;

  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/
  this.level    = 0;

  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/
  this.children = null;

  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/
  this.content  = '';

  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/
  this.markup   = '';

  /**
   * Token#info -> String
   *
   * Additional information:
   *
   * - Info string for "fence" tokens
   * - The value "auto" for autolink "link_open" and "link_close" tokens
   * - The string value of the item marker for ordered-list "list_item_open" tokens
   **/
  this.info     = '';

  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/
  this.meta     = null;

  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/
  this.block    = false;

  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/
  this.hidden   = false;
}

/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/
Token.prototype.attrIndex = function attrIndex (name) {
  if (!this.attrs) { return -1 }

  const attrs = this.attrs;

  for (let i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i }
  }
  return -1
};

/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/
Token.prototype.attrPush = function attrPush (attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [attrData];
  }
};

/**
 * Token.attrSet(name, value)
 *
 * Set `name` attribute to `value`. Override old value if exists.
 **/
Token.prototype.attrSet = function attrSet (name, value) {
  const idx = this.attrIndex(name);
  const attrData = [name, value];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};

/**
 * Token.attrGet(name)
 *
 * Get the value of attribute `name`, or null if it does not exist.
 **/
Token.prototype.attrGet = function attrGet (name) {
  const idx = this.attrIndex(name);
  let value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value
};

/**
 * Token.attrJoin(name, value)
 *
 * Join value to existing attribute via space. Or create new attribute if not
 * exists. Useful to operate with token classes.
 **/
Token.prototype.attrJoin = function attrJoin (name, value) {
  const idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([name, value]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};

// Core state object
//


function StateCore (src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore.prototype.Token = Token;

// Normalize input string

// https://spec.commonmark.org/0.29/#line-ending
const NEWLINES_RE  = /\r\n?|\n/g;
const NULL_RE      = /\0/g;

function normalize (state) {
  let str;

  // Normalize newlines
  str = state.src.replace(NEWLINES_RE, '\n');

  // Replace NULL characters
  str = str.replace(NULL_RE, '\uFFFD');

  state.src = str;
}

function block (state) {
  let token;

  if (state.inlineMode) {
    token          = new state.Token('inline', '', 0);
    token.content  = state.src;
    token.map      = [0, 1];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
}

function inline (state) {
  const tokens = state.tokens;

  // Parse inlines
  for (let i = 0, l = tokens.length; i < l; i++) {
    const tok = tokens[i];
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
}

// Replace link-like texts with link nodes.
//
// Currently restricted by `md.validateLink()` to http/https/ftp
//


function isLinkOpen$1 (str) {
  return /^<a[>\s]/i.test(str)
}
function isLinkClose$1 (str) {
  return /^<\/a\s*>/i.test(str)
}

function linkify$1 (state) {
  const blockTokens = state.tokens;

  if (!state.md.options.linkify) { return }

  for (let j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline' ||
        !state.md.linkify.pretest(blockTokens[j].content)) {
      continue
    }

    let tokens = blockTokens[j].children;

    let htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (let i = tokens.length - 1; i >= 0; i--) {
      const currentToken = tokens[i];

      // Skip content of markdown links
      if (currentToken.type === 'link_close') {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
          i--;
        }
        continue
      }

      // Skip content of html tag links
      if (currentToken.type === 'html_inline') {
        if (isLinkOpen$1(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose$1(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) { continue }

      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {
        const text = currentToken.content;
        let links = state.md.linkify.match(text);

        // Now split string to nodes
        const nodes = [];
        let level = currentToken.level;
        let lastPos = 0;

        // forbid escape sequence at the start of the string,
        // this avoids http\://example.com/ from being linkified as
        // http:<a href="//example.com/">//example.com/</a>
        if (links.length > 0 &&
            links[0].index === 0 &&
            i > 0 &&
            tokens[i - 1].type === 'text_special') {
          links = links.slice(1);
        }

        for (let ln = 0; ln < links.length; ln++) {
          const url = links[ln].url;
          const fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) { continue }

          let urlText = links[ln].text;

          // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          const pos = links[ln].index;

          if (pos > lastPos) {
            const token   = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level   = level;
            nodes.push(token);
          }

          const token_o   = new state.Token('link_open', 'a', 1);
          token_o.attrs   = [['href', fullUrl]];
          token_o.level   = level++;
          token_o.markup  = 'linkify';
          token_o.info    = 'auto';
          nodes.push(token_o);

          const token_t   = new state.Token('text', '', 0);
          token_t.content = urlText;
          token_t.level   = level;
          nodes.push(token_t);

          const token_c   = new state.Token('link_close', 'a', -1);
          token_c.level   = --level;
          token_c.markup  = 'linkify';
          token_c.info    = 'auto';
          nodes.push(token_c);

          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text.length) {
          const token   = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level   = level;
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
}

// Simple typographic replacements
//
// (c) (C) → ©
// (tm) (TM) → ™
// (r) (R) → ®
// +- → ±
// ... → … (also ?.... → ?.., !.... → !..)
// ???????? → ???, !!!!! → !!!, `,,` → `,`
// -- → &ndash;, --- → &mdash;
//

// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - multiplications 2 x 4 -> 2 × 4

const RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

// Workaround for phantomjs - need regex without /g flag,
// or root check will fail every second time
const SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;

const SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
const SCOPED_ABBR = {
  c: '©',
  r: '®',
  tm: '™'
};

function replaceFn (match, name) {
  return SCOPED_ABBR[name.toLowerCase()]
}

function replace_scoped (inlineTokens) {
  let inside_autolink = 0;

  for (let i = inlineTokens.length - 1; i >= 0; i--) {
    const token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace_rare (inlineTokens) {
  let inside_autolink = 0;

  for (let i = inlineTokens.length - 1; i >= 0; i--) {
    const token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content
          .replace(/\+-/g, '±')
          // .., ..., ....... -> …
          // but ?..... & !..... -> ?.. & !..
          .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
          .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
          // em-dash
          .replace(/(^|[^-])---(?=[^-]|$)/mg, '$1\u2014')
          // en-dash
          .replace(/(^|\s)--(?=\s|$)/mg, '$1\u2013')
          .replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, '$1\u2013');
      }
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace (state) {
  let blkIdx;

  if (!state.md.options.typographer) { return }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== 'inline') { continue }

    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }

    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }
  }
}

// Convert straight quotation marks to typographic ones
//


const QUOTE_TEST_RE = /['"]/;
const QUOTE_RE = /['"]/g;
const APOSTROPHE = '\u2019'; /* ’ */

function replaceAt (str, index, ch) {
  return str.slice(0, index) + ch + str.slice(index + 1)
}

function process_inlines (tokens, state) {
  let j;

  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    const thisLevel = tokens[i].level;

    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) { break }
    }
    stack.length = j + 1;

    if (token.type !== 'text') { continue }

    let text = token.content;
    let pos = 0;
    let max = text.length;

    /* eslint no-labels:0,block-scoped-var:0 */
    OUTER:
    while (pos < max) {
      QUOTE_RE.lastIndex = pos;
      const t = QUOTE_RE.exec(text);
      if (!t) { break }

      let canOpen = true;
      let canClose = true;
      pos = t.index + 1;
      const isSingle = (t[0] === "'");

      // Find previous character,
      // default to space if it's the beginning of the line
      //
      let lastChar = 0x20;

      if (t.index - 1 >= 0) {
        lastChar = text.charCodeAt(t.index - 1);
      } else {
        for (j = i - 1; j >= 0; j--) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break // lastChar defaults to 0x20
          if (!tokens[j].content) continue // should skip all tokens except 'text', 'html_inline' or 'code_inline'

          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
          break
        }
      }

      // Find next character,
      // default to space if it's the end of the line
      //
      let nextChar = 0x20;

      if (pos < max) {
        nextChar = text.charCodeAt(pos);
      } else {
        for (j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break // nextChar defaults to 0x20
          if (!tokens[j].content) continue // should skip all tokens except 'text', 'html_inline' or 'code_inline'

          nextChar = tokens[j].content.charCodeAt(0);
          break
        }
      }

      const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

      const isLastWhiteSpace = isWhiteSpace(lastChar);
      const isNextWhiteSpace = isWhiteSpace(nextChar);

      if (isNextWhiteSpace) {
        canOpen = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          canOpen = false;
        }
      }

      if (isLastWhiteSpace) {
        canClose = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          canClose = false;
        }
      }

      if (nextChar === 0x22 /* " */ && t[0] === '"') {
        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
          // special case: 1"" - count first quote as an inch
          canClose = canOpen = false;
        }
      }

      if (canOpen && canClose) {
        // Replace quotes in the middle of punctuation sequence, but not
        // in the middle of the words, i.e.:
        //
        // 1. foo " bar " baz - not replaced
        // 2. foo-"-bar-"-baz - replaced
        // 3. foo"bar"baz     - not replaced
        //
        canOpen = isLastPunctChar;
        canClose = isNextPunctChar;
      }

      if (!canOpen && !canClose) {
        // middle of word
        if (isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
        continue
      }

      if (canClose) {
        // this could be a closing quote, rewind the stack to get a match
        for (j = stack.length - 1; j >= 0; j--) {
          let item = stack[j];
          if (stack[j].level < thisLevel) { break }
          if (item.single === isSingle && stack[j].level === thisLevel) {
            item = stack[j];

            let openQuote;
            let closeQuote;
            if (isSingle) {
              openQuote = state.md.options.quotes[2];
              closeQuote = state.md.options.quotes[3];
            } else {
              openQuote = state.md.options.quotes[0];
              closeQuote = state.md.options.quotes[1];
            }

            // replace token.content *before* tokens[item.token].content,
            // because, if they are pointing at the same token, replaceAt
            // could mess up indices when quote length != 1
            token.content = replaceAt(token.content, t.index, closeQuote);
            tokens[item.token].content = replaceAt(
              tokens[item.token].content, item.pos, openQuote);

            pos += closeQuote.length - 1;
            if (item.token === i) { pos += openQuote.length - 1; }

            text = token.content;
            max = text.length;

            stack.length = j;
            continue OUTER
          }
        }
      }

      if (canOpen) {
        stack.push({
          token: i,
          pos: t.index,
          single: isSingle,
          level: thisLevel
        });
      } else if (canClose && isSingle) {
        token.content = replaceAt(token.content, t.index, APOSTROPHE);
      }
    }
  }
}

function smartquotes (state) {
  /* eslint max-depth:0 */
  if (!state.md.options.typographer) { return }

  for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== 'inline' ||
        !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue
    }

    process_inlines(state.tokens[blkIdx].children, state);
  }
}

// Join raw text tokens with the rest of the text
//
// This is set as a separate rule to provide an opportunity for plugins
// to run text replacements after text join, but before escape join.
//
// For example, `\:)` shouldn't be replaced with an emoji.
//

function text_join (state) {
  let curr, last;
  const blockTokens = state.tokens;
  const l = blockTokens.length;

  for (let j = 0; j < l; j++) {
    if (blockTokens[j].type !== 'inline') continue

    const tokens = blockTokens[j].children;
    const max = tokens.length;

    for (curr = 0; curr < max; curr++) {
      if (tokens[curr].type === 'text_special') {
        tokens[curr].type = 'text';
      }
    }

    for (curr = last = 0; curr < max; curr++) {
      if (tokens[curr].type === 'text' &&
          curr + 1 < max &&
          tokens[curr + 1].type === 'text') {
        // collapse two adjacent text nodes
        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
      } else {
        if (curr !== last) { tokens[last] = tokens[curr]; }

        last++;
      }
    }

    if (curr !== last) {
      tokens.length = last;
    }
  }
}

/** internal
 * class Core
 *
 * Top-level rules executor. Glues block/inline parsers and does intermediate
 * transformations.
 **/


const _rules$2 = [
  ['normalize',      normalize],
  ['block',          block],
  ['inline',         inline],
  ['linkify',        linkify$1],
  ['replacements',   replace],
  ['smartquotes',    smartquotes],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ['text_join',      text_join]
];

/**
 * new Core()
 **/
function Core () {
  /**
   * Core#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of core rules.
   **/
  this.ruler = new Ruler();

  for (let i = 0; i < _rules$2.length; i++) {
    this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
  }
}

/**
 * Core.process(state)
 *
 * Executes core chain rules.
 **/
Core.prototype.process = function (state) {
  const rules = this.ruler.getRules('');

  for (let i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = StateCore;

// Parser state class


function StateBlock (src, md, env, tokens) {
  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
  this.sCount = [];  // indents for each line (tabs expanded)

  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //
  this.bsCount = [];

  // block parser variables

  // required block content indent (for example, if we are
  // inside a list, it would be positioned after list marker)
  this.blkIndent  = 0;
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  this.parentType = 'root';

  this.level = 0;

  // Create caches
  // Generate markers.
  const s = this.src;

  for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
    const ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);

      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock.prototype.push = function (type, tag, nesting) {
  const token = new Token(type, tag, nesting);
  token.block = true;

  if (nesting < 0) this.level--; // closing tag
  token.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token);
  return token
};

StateBlock.prototype.isEmpty = function isEmpty (line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line]
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines (from) {
  for (let max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break
    }
  }
  return from
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces (pos) {
  for (let max = this.src.length; pos < max; pos++) {
    const ch = this.src.charCodeAt(pos);
    if (!isSpace(ch)) { break }
  }
  return pos
};

// Skip spaces from given position in reverse.
StateBlock.prototype.skipSpacesBack = function skipSpacesBack (pos, min) {
  if (pos <= min) { return pos }

  while (pos > min) {
    if (!isSpace(this.src.charCodeAt(--pos))) { return pos + 1 }
  }
  return pos
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars (pos, code) {
  for (let max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break }
  }
  return pos
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack (pos, code, min) {
  if (pos <= min) { return pos }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1 }
  }
  return pos
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines (begin, end, indent, keepLastLF) {
  if (begin >= end) {
    return ''
  }

  const queue = new Array(end - begin);

  for (let i = 0, line = begin; line < end; line++, i++) {
    let lineIndent = 0;
    const lineStart = this.bMarks[line];
    let first = lineStart;
    let last;

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      const ch = this.src.charCodeAt(first);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('')
};

// re-export Token class to use in block rules
StateBlock.prototype.Token = Token;

// GFM table, https://github.github.com/gfm/#tables-extension-


// Limit the amount of empty autocompleted cells in a table,
// see https://github.com/markdown-it/markdown-it/issues/1000,
//
// Both pulldown-cmark and commonmark-hs limit the number of cells this way to ~200k.
// We set it to 65k, which can expand user input by a factor of x370
// (256x256 square is 1.8kB expanded into 650kB).
const MAX_AUTOCOMPLETED_CELLS = 0x10000;

function getLine (state, line) {
  const pos = state.bMarks[line] + state.tShift[line];
  const max = state.eMarks[line];

  return state.src.slice(pos, max)
}

function escapedSplit (str) {
  const result = [];
  const max = str.length;

  let pos = 0;
  let ch = str.charCodeAt(pos);
  let isEscaped = false;
  let lastPos = 0;
  let current = '';

  while (pos < max) {
    if (ch === 0x7c/* | */) {
      if (!isEscaped) {
        // pipe separating cells, '|'
        result.push(current + str.substring(lastPos, pos));
        current = '';
        lastPos = pos + 1;
      } else {
        // escaped pipe, '\|'
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }

    isEscaped = (ch === 0x5c/* \ */);
    pos++;

    ch = str.charCodeAt(pos);
  }

  result.push(current + str.substring(lastPos));

  return result
}

function table (state, startLine, endLine, silent) {
  // should have at least two lines
  if (startLine + 2 > endLine) { return false }

  let nextLine = startLine + 1;

  if (state.sCount[nextLine] < state.blkIndent) { return false }

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false }

  // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

  let pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) { return false }

  const firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 0x7C/* | */ && firstCh !== 0x2D/* - */ && firstCh !== 0x3A/* : */) { return false }

  if (pos >= state.eMarks[nextLine]) { return false }

  const secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 0x7C/* | */ && secondCh !== 0x2D/* - */ && secondCh !== 0x3A/* : */ && !isSpace(secondCh)) {
    return false
  }

  // if first character is '-', then second character must not be a space
  // (due to parsing ambiguity with list)
  if (firstCh === 0x2D/* - */ && isSpace(secondCh)) { return false }

  while (pos < state.eMarks[nextLine]) {
    const ch = state.src.charCodeAt(pos);

    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace(ch)) { return false }

    pos++;
  }

  let lineText = getLine(state, startLine + 1);
  let columns = lineText.split('|');
  const aligns = [];
  for (let i = 0; i < columns.length; i++) {
    const t = columns[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue
      } else {
        return false
      }
    }

    if (!/^:?-+:?$/.test(t)) { return false }
    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A/* : */) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) { return false }
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === '') columns.shift();
  if (columns.length && columns[columns.length - 1] === '') columns.pop();

  // header row will define an amount of columns in the entire table,
  // and align row should be exactly the same (the rest of the rows can differ)
  const columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) { return false }

  if (silent) { return true }

  const oldParentType = state.parentType;
  state.parentType = 'table';

  // use 'blockquote' lists for termination because it's
  // the most similar to tables
  const terminatorRules = state.md.block.ruler.getRules('blockquote');

  const token_to = state.push('table_open', 'table', 1);
  const tableLines = [startLine, 0];
  token_to.map = tableLines;

  const token_tho = state.push('thead_open', 'thead', 1);
  token_tho.map = [startLine, startLine + 1];

  const token_htro = state.push('tr_open', 'tr', 1);
  token_htro.map = [startLine, startLine + 1];

  for (let i = 0; i < columns.length; i++) {
    const token_ho = state.push('th_open', 'th', 1);
    if (aligns[i]) {
      token_ho.attrs  = [['style', 'text-align:' + aligns[i]]];
    }

    const token_il = state.push('inline', '', 0);
    token_il.content  = columns[i].trim();
    token_il.children = [];

    state.push('th_close', 'th', -1);
  }

  state.push('tr_close', 'tr', -1);
  state.push('thead_close', 'thead', -1);

  let tbodyLines;
  let autocompletedCells = 0;

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) { break }

    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }

    if (terminate) { break }
    lineText = getLine(state, nextLine).trim();
    if (!lineText) { break }
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === '') columns.shift();
    if (columns.length && columns[columns.length - 1] === '') columns.pop();

    // note: autocomplete count can be negative if user specifies more columns than header,
    // but that does not affect intended use (which is limiting expansion)
    autocompletedCells += columnCount - columns.length;
    if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) { break }

    if (nextLine === startLine + 2) {
      const token_tbo = state.push('tbody_open', 'tbody', 1);
      token_tbo.map = tbodyLines = [startLine + 2, 0];
    }

    const token_tro = state.push('tr_open', 'tr', 1);
    token_tro.map = [nextLine, nextLine + 1];

    for (let i = 0; i < columnCount; i++) {
      const token_tdo = state.push('td_open', 'td', 1);
      if (aligns[i]) {
        token_tdo.attrs  = [['style', 'text-align:' + aligns[i]]];
      }

      const token_il = state.push('inline', '', 0);
      token_il.content  = columns[i] ? columns[i].trim() : '';
      token_il.children = [];

      state.push('td_close', 'td', -1);
    }
    state.push('tr_close', 'tr', -1);
  }

  if (tbodyLines) {
    state.push('tbody_close', 'tbody', -1);
    tbodyLines[1] = nextLine;
  }

  state.push('table_close', 'table', -1);
  tableLines[1] = nextLine;

  state.parentType = oldParentType;
  state.line = nextLine;
  return true
}

// Code block (4 spaces padded)

function code$2 (state, startLine, endLine/*, silent */) {
  if (state.sCount[startLine] - state.blkIndent < 4) { return false }

  let nextLine = startLine + 1;
  let last = nextLine;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue
    }
    break
  }

  state.line = last;

  const token   = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + '\n';
  token.map     = [startLine, state.line];

  return true
}

// fences (``` lang, ~~~ lang)

function fence (state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  if (pos + 3 > max) { return false }

  const marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
    return false
  }

  // scan marker length
  let mem = pos;
  pos = state.skipChars(pos, marker);

  let len = pos - mem;

  if (len < 3) { return false }

  const markup = state.src.slice(mem, pos);
  const params = state.src.slice(pos, max);

  if (marker === 0x60 /* ` */) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false
    }
  }

  // Since start is found, we can report success here in validation mode
  if (silent) { return true }

  // search end of block
  let nextLine = startLine;
  let haveEndMarker = false;

  for (;;) {
    nextLine++;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break
    }

    if (state.src.charCodeAt(pos) !== marker) { continue }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue
    }

    pos = state.skipChars(pos, marker);

    // closing code fence must be at least as long as the opening one
    if (pos - mem < len) { continue }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) { continue }

    haveEndMarker = true;
    // found!
    break
  }

  // If a fence has heading spaces, they should be removed from its inner block
  len = state.sCount[startLine];

  state.line = nextLine + (haveEndMarker ? 1 : 0);

  const token   = state.push('fence', 'code', 0);
  token.info    = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup  = markup;
  token.map     = [startLine, state.line];

  return true
}

// Block quotes


function blockquote (state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  const oldLineMax = state.lineMax;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  // check the block quote marker
  if (state.src.charCodeAt(pos) !== 0x3E/* > */) { return false }

  // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode
  if (silent) { return true }

  const oldBMarks  = [];
  const oldBSCount = [];
  const oldSCount  = [];
  const oldTShift  = [];

  const terminatorRules = state.md.block.ruler.getRules('blockquote');

  const oldParentType = state.parentType;
  state.parentType = 'blockquote';
  let lastLineEmpty = false;
  let nextLine;

  // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag:
  //     ```
  //     > test
  //      - - -
  //     ```
  for (nextLine = startLine; nextLine < endLine; nextLine++) {
    // check if it's outdented, i.e. it's inside list item and indented
    // less than said list item:
    //
    // ```
    // 1. anything
    //    > current blockquote
    // 2. checking this line
    // ```
    const isOutdented = state.sCount[nextLine] < state.blkIndent;

    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break
    }

    if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !isOutdented) {
      // This line is inside the blockquote.

      // set offset past spaces and ">"
      let initial = state.sCount[nextLine] + 1;
      let spaceAfterMarker;
      let adjustTab;

      // skip one optional space after '>'
      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
        // ' >   test '
        //     ^ -- position start of line here:
        pos++;
        initial++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
        spaceAfterMarker = true;

        if ((state.bsCount[nextLine] + initial) % 4 === 3) {
          // '  >\t  test '
          //       ^ -- position start of line here (tab has width===1)
          pos++;
          initial++;
          adjustTab = false;
        } else {
          // ' >\t  test '
          //    ^ -- position start of line here + shift bsCount slightly
          //         to make extra space appear
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }

      let offset = initial;
      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;

      while (pos < max) {
        const ch = state.src.charCodeAt(pos);

        if (isSpace(ch)) {
          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break
        }

        pos++;
      }

      lastLineEmpty = pos >= max;

      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;

      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue
    }

    // Case 2: line is not inside the blockquote, and the last line was empty.
    if (lastLineEmpty) { break }

    // Case 3: another tag found.
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }

    if (terminate) {
      // Quirk to enforce "hard termination mode" for paragraphs;
      // normally if you call `tokenize(state, startLine, nextLine)`,
      // paragraphs will look below nextLine for paragraph continuation,
      // but if blockquote is terminated by another tag, they shouldn't
      state.lineMax = nextLine;

      if (state.blkIndent !== 0) {
        // state.blkIndent was non-zero, we now set it to zero,
        // so we need to re-calculate all offsets to appear as
        // if indent wasn't changed
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }

      break
    }

    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);

    // A negative indentation means that this is a paragraph continuation
    //
    state.sCount[nextLine] = -1;
  }

  const oldIndent = state.blkIndent;
  state.blkIndent = 0;

  const token_o  = state.push('blockquote_open', 'blockquote', 1);
  token_o.markup = '>';
  const lines = [startLine, 0];
  token_o.map    = lines;

  state.md.block.tokenize(state, startLine, nextLine);

  const token_c  = state.push('blockquote_close', 'blockquote', -1);
  token_c.markup = '>';

  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;

  // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.
  for (let i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }
  state.blkIndent = oldIndent;

  return true
}

// Horizontal rule


function hr (state, startLine, endLine, silent) {
  const max = state.eMarks[startLine];
  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);

  // Check hr marker
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x5F/* _ */) {
    return false
  }

  // markers can be mixed with spaces, but there should be at least 3 of them

  let cnt = 1;
  while (pos < max) {
    const ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace(ch)) { return false }
    if (ch === marker) { cnt++; }
  }

  if (cnt < 3) { return false }

  if (silent) { return true }

  state.line = startLine + 1;

  const token  = state.push('hr', 'hr', 0);
  token.map    = [startLine, state.line];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

  return true
}

// Lists


// Search `[-+*][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipBulletListMarker (state, startLine) {
  const max = state.eMarks[startLine];
  let pos = state.bMarks[startLine] + state.tShift[startLine];

  const marker = state.src.charCodeAt(pos++);
  // Check bullet
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x2B/* + */) {
    return -1
  }

  if (pos < max) {
    const ch = state.src.charCodeAt(pos);

    if (!isSpace(ch)) {
      // " -test " - is not a list item
      return -1
    }
  }

  return pos
}

// Search `\d+[.)][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipOrderedListMarker (state, startLine) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  let pos = start;

  // List marker should have at least 2 chars (digit + dot)
  if (pos + 1 >= max) { return -1 }

  let ch = state.src.charCodeAt(pos++);

  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1 }

  for (;;) {
    // EOL -> fail
    if (pos >= max) { return -1 }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {
      // List marker should have no more than 9 digits
      // (prevents integer overflow in browsers)
      if (pos - start >= 10) { return -1 }

      continue
    }

    // found valid marker
    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
      break
    }

    return -1
  }

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace(ch)) {
      // " 1.test " - is not a list item
      return -1
    }
  }
  return pos
}

function markTightParagraphs (state, idx) {
  const level = state.level + 2;

  for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}

function list (state, startLine, endLine, silent) {
  let max, pos, start, token;
  let nextLine = startLine;
  let tight = true;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false }

  // Special case:
  //  - item 1
  //   - item 2
  //    - item 3
  //     - item 4
  //      - this one is a paragraph continuation
  if (state.listIndent >= 0 &&
      state.sCount[nextLine] - state.listIndent >= 4 &&
      state.sCount[nextLine] < state.blkIndent) {
    return false
  }

  let isTerminatingParagraph = false;

  // limit conditions when list can interrupt
  // a paragraph (validation mode only)
  if (silent && state.parentType === 'paragraph') {
    // Next list item should still terminate previous list item;
    //
    // This code can fail if plugins use blkIndent as well as lists,
    // but I hope the spec gets fixed long before that happens.
    //
    if (state.sCount[nextLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }

  // Detect list type and position after marker
  let isOrdered;
  let markerValue;
  let posAfterMarker;
  if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[nextLine] + state.tShift[nextLine];
    markerValue = Number(state.src.slice(start, posAfterMarker - 1));

    // If we're starting a new ordered list right after
    // a paragraph, it should start with 1.
    if (isTerminatingParagraph && markerValue !== 1) return false
  } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
    isOrdered = false;
  } else {
    return false
  }

  // If we're starting a new unordered list right after
  // a paragraph, first line should not be empty.
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false
  }

  // For validation mode we can terminate immediately
  if (silent) { return true }

  // We should terminate list on style change. Remember first one to compare.
  const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

  // Start list
  const listTokIdx = state.tokens.length;

  if (isOrdered) {
    token       = state.push('ordered_list_open', 'ol', 1);
    if (markerValue !== 1) {
      token.attrs = [['start', markerValue]];
    }
  } else {
    token       = state.push('bullet_list_open', 'ul', 1);
  }

  const listLines = [nextLine, 0];
  token.map    = listLines;
  token.markup = String.fromCharCode(markerCharCode);

  //
  // Iterate list items
  //

  let prevEmptyEnd = false;
  const terminatorRules = state.md.block.ruler.getRules('list');

  const oldParentType = state.parentType;
  state.parentType = 'list';

  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];

    const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
    let offset = initial;

    while (pos < max) {
      const ch = state.src.charCodeAt(pos);

      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 0x20) {
        offset++;
      } else {
        break
      }

      pos++;
    }

    const contentStart = pos;
    let indentAfterMarker;

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }

    // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)
    if (indentAfterMarker > 4) { indentAfterMarker = 1; }

    // "  -  test"
    //  ^^^^^ - calculating total length of this thing
    const indent = initial + indentAfterMarker;

    // Run subparser & write tokens
    token        = state.push('list_item_open', 'li', 1);
    token.markup = String.fromCharCode(markerCharCode);
    const itemLines = [nextLine, 0];
    token.map    = itemLines;
    if (isOrdered) {
      token.info = state.src.slice(start, posAfterMarker - 1);
    }

    // change current state, then restore it after parser subcall
    const oldTight = state.tight;
    const oldTShift = state.tShift[nextLine];
    const oldSCount = state.sCount[nextLine];

    //  - example list
    // ^ listIndent position will be here
    //   ^ blkIndent position will be here
    //
    const oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;

    state.tight = true;
    state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
    state.sCount[nextLine] = offset;

    if (contentStart >= max && state.isEmpty(nextLine + 1)) {
      // workaround for this case
      // (list item is empty, list terminates before "foo"):
      // ~~~~~~~~
      //   -
      //
      //     foo
      // ~~~~~~~~
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, nextLine, endLine, true);
    }

    // If any of list item is tight, mark list as tight
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish
    prevEmptyEnd = (state.line - nextLine) > 1 && state.isEmpty(state.line - 1);

    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[nextLine] = oldTShift;
    state.sCount[nextLine] = oldSCount;
    state.tight = oldTight;

    token        = state.push('list_item_close', 'li', -1);
    token.markup = String.fromCharCode(markerCharCode);

    nextLine = state.line;
    itemLines[1] = nextLine;

    if (nextLine >= endLine) { break }

    //
    // Try to check if list is terminated or continued.
    //
    if (state.sCount[nextLine] < state.blkIndent) { break }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break }

    // fail if terminating block found
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }
    if (terminate) { break }

    // fail if list has another type
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) { break }
      start = state.bMarks[nextLine] + state.tShift[nextLine];
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) { break }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break }
  }

  // Finalize list
  if (isOrdered) {
    token = state.push('ordered_list_close', 'ol', -1);
  } else {
    token = state.push('bullet_list_close', 'ul', -1);
  }
  token.markup = String.fromCharCode(markerCharCode);

  listLines[1] = nextLine;
  state.line = nextLine;

  state.parentType = oldParentType;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true
}

function reference (state, startLine, _endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  let nextLine = startLine + 1;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false }

  function getNextLine (nextLine) {
    const endLine = state.lineMax;

    if (nextLine >= endLine || state.isEmpty(nextLine)) {
      // empty line or end of input
      return null
    }

    let isContinuation = false;

    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { isContinuation = true; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { isContinuation = true; }

    if (!isContinuation) {
      const terminatorRules = state.md.block.ruler.getRules('reference');
      const oldParentType = state.parentType;
      state.parentType = 'reference';

      // Some tags can terminate paragraph without empty line.
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break
        }
      }

      state.parentType = oldParentType;
      if (terminate) {
        // terminated by another block
        return null
      }
    }

    const pos = state.bMarks[nextLine] + state.tShift[nextLine];
    const max = state.eMarks[nextLine];

    // max + 1 explicitly includes the newline
    return state.src.slice(pos, max + 1)
  }

  let str = state.src.slice(pos, max + 1);

  max = str.length;
  let labelEnd = -1;

  for (pos = 1; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 0x5B /* [ */) {
      return false
    } else if (ch === 0x5D /* ] */) {
      labelEnd = pos;
      break
    } else if (ch === 0x0A /* \n */) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (ch === 0x5C /* \ */) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 0x0A) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      }
    }
  }

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false }

  // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here
  for (pos = labelEnd + 2; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (isSpace(ch)) ; else {
      break
    }
  }

  // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this
  const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!destRes.ok) { return false }

  const href = state.md.normalizeLink(destRes.str);
  if (!state.md.validateLink(href)) { return false }

  pos = destRes.pos;

  // save cursor state, we could require to rollback later
  const destEndPos = pos;
  const destEndLineNo = nextLine;

  // [label]:   destination   'title'
  //                       ^^^ skipping those spaces
  const start = pos;
  for (; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (isSpace(ch)) ; else {
      break
    }
  }

  // [label]:   destination   'title'
  //                          ^^^^^^^ parse this
  let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
  while (titleRes.can_continue) {
    const lineContent = getNextLine(nextLine);
    if (lineContent === null) break
    str += lineContent;
    pos = max;
    max = str.length;
    nextLine++;
    titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
  }
  let title;

  if (pos < max && start !== pos && titleRes.ok) {
    title = titleRes.str;
    pos = titleRes.pos;
  } else {
    title = '';
    pos = destEndPos;
    nextLine = destEndLineNo;
  }

  // skip trailing spaces until the rest of the line
  while (pos < max) {
    const ch = str.charCodeAt(pos);
    if (!isSpace(ch)) { break }
    pos++;
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    if (title) {
      // garbage at the end of the line after title,
      // but it could still be a valid reference if we roll back
      title = '';
      pos = destEndPos;
      nextLine = destEndLineNo;
      while (pos < max) {
        const ch = str.charCodeAt(pos);
        if (!isSpace(ch)) { break }
        pos++;
      }
    }
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    // garbage at the end of the line
    return false
  }

  const label = normalizeReference(str.slice(1, labelEnd));
  if (!label) {
    // CommonMark 0.20 disallows empty labels
    return false
  }

  // Reference can not terminate anything. This check is for safety only.
  /* istanbul ignore if */
  if (silent) { return true }

  if (typeof state.env.references === 'undefined') {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === 'undefined') {
    state.env.references[label] = { title, href };
  }

  state.line = nextLine;
  return true
}

// List of valid html blocks names, according to commonmark spec
// https://spec.commonmark.org/0.30/#html-blocks

var block_names = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'search',
  'section',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

// Regexps to match html elements

const attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

const unquoted      = '[^"\'=<>`\\x00-\\x20]+';
const single_quoted = "'[^']*'";
const double_quoted = '"[^"]*"';

const attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

const attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

const open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

const close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
const comment     = '<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->';
const processing  = '<[?][\\s\\S]*?[?]>';
const declaration = '<![A-Za-z][^>]*>';
const cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

const HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                        '|' + processing + '|' + declaration + '|' + cdata + ')');
const HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

// HTML block


// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
//
const HTML_SEQUENCES = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
  [/^<!--/,        /-->/,   true],
  [/^<\?/,         /\?>/,   true],
  [/^<![A-Z]/,     />/,     true],
  [/^<!\[CDATA\[/, /\]\]>/, true],
  [new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true],
  [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false]
];

function html_block (state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  if (!state.md.options.html) { return false }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false }

  let lineText = state.src.slice(pos, max);

  let i = 0;
  for (; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break }
  }
  if (i === HTML_SEQUENCES.length) { return false }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2]
  }

  let nextLine = startLine + 1;

  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++; }
        break
      }
    }
  }

  state.line = nextLine;

  const token   = state.push('html_block', '', 0);
  token.map     = [startLine, nextLine];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

  return true
}

// heading (#, ##, ...)


function heading (state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  let ch  = state.src.charCodeAt(pos);

  if (ch !== 0x23/* # */ || pos >= max) { return false }

  // count heading level
  let level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && !isSpace(ch))) { return false }

  if (silent) { return true }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipSpacesBack(max, pos);
  const tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;

  const token_o  = state.push('heading_open', 'h' + String(level), 1);
  token_o.markup = '########'.slice(0, level);
  token_o.map    = [startLine, state.line];

  const token_i    = state.push('inline', '', 0);
  token_i.content  = state.src.slice(pos, max).trim();
  token_i.map      = [startLine, state.line];
  token_i.children = [];

  const token_c  = state.push('heading_close', 'h' + String(level), -1);
  token_c.markup = '########'.slice(0, level);

  return true
}

// lheading (---, ===)

function lheading (state, startLine, endLine/*, silent */) {
  const terminatorRules = state.md.block.ruler.getRules('paragraph');

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  const oldParentType = state.parentType;
  state.parentType = 'paragraph'; // use paragraph to match terminatorRules

  // jump line-by-line until empty one or EOF
  let level = 0;
  let marker;
  let nextLine = startLine + 1;

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue }

    //
    // Check for underline in setext header
    //
    if (state.sCount[nextLine] >= state.blkIndent) {
      let pos = state.bMarks[nextLine] + state.tShift[nextLine];
      const max = state.eMarks[nextLine];

      if (pos < max) {
        marker = state.src.charCodeAt(pos);

        if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            level = (marker === 0x3D/* = */ ? 1 : 2);
            break
          }
        }
      }
    }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue }

    // Some tags can terminate paragraph without empty line.
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }
    if (terminate) { break }
  }

  if (!level) {
    // Didn't find valid underline
    return false
  }

  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine + 1;

  const token_o    = state.push('heading_open', 'h' + String(level), 1);
  token_o.markup   = String.fromCharCode(marker);
  token_o.map      = [startLine, state.line];

  const token_i    = state.push('inline', '', 0);
  token_i.content  = content;
  token_i.map      = [startLine, state.line - 1];
  token_i.children = [];

  const token_c    = state.push('heading_close', 'h' + String(level), -1);
  token_c.markup   = String.fromCharCode(marker);

  state.parentType = oldParentType;

  return true
}

// Paragraph

function paragraph (state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRules('paragraph');
  const oldParentType = state.parentType;
  let nextLine = startLine + 1;
  state.parentType = 'paragraph';

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue }

    // Some tags can terminate paragraph without empty line.
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }
    if (terminate) { break }
  }

  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine;

  const token_o    = state.push('paragraph_open', 'p', 1);
  token_o.map      = [startLine, state.line];

  const token_i    = state.push('inline', '', 0);
  token_i.content  = content;
  token_i.map      = [startLine, state.line];
  token_i.children = [];

  state.push('paragraph_close', 'p', -1);

  state.parentType = oldParentType;

  return true
}

/** internal
 * class ParserBlock
 *
 * Block-level tokenizer.
 **/


const _rules$1 = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ['table',      table,      ['paragraph', 'reference']],
  ['code',       code$2],
  ['fence',      fence,      ['paragraph', 'reference', 'blockquote', 'list']],
  ['blockquote', blockquote, ['paragraph', 'reference', 'blockquote', 'list']],
  ['hr',         hr,         ['paragraph', 'reference', 'blockquote', 'list']],
  ['list',       list,       ['paragraph', 'reference', 'blockquote']],
  ['reference',  reference],
  ['html_block', html_block, ['paragraph', 'reference', 'blockquote']],
  ['heading',    heading,    ['paragraph', 'reference', 'blockquote']],
  ['lheading',   lheading],
  ['paragraph',  paragraph]
];

/**
 * new ParserBlock()
 **/
function ParserBlock () {
  /**
   * ParserBlock#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of block rules.
   **/
  this.ruler = new Ruler();

  for (let i = 0; i < _rules$1.length; i++) {
    this.ruler.push(_rules$1[i][0], _rules$1[i][1], { alt: (_rules$1[i][2] || []).slice() });
  }
}

// Generate tokens for input range
//
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  const rules = this.ruler.getRules('');
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  let line = startLine;
  let hasEmptyLines = false;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break }

    // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists
    if (state.sCount[line] < state.blkIndent) { break }

    // If nesting level exceeded - skip tail to the end. That's not ordinary
    // situation and we should not care about content.
    if (state.level >= maxNesting) {
      state.line = endLine;
      break
    }

    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true
    const prevLine = state.line;
    let ok = false;

    for (let i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) {
        if (prevLine >= state.line) {
          throw new Error("block rule didn't increment state.line")
        }
        break
      }
    }

    // this can only happen if user disables paragraph rule
    if (!ok) throw new Error('none of the block rules matched')

    // set state.tight if we had an empty line before current tag
    // i.e. latest empty line should not count
    state.tight = !hasEmptyLines;

    // paragraph might "eat" one newline after it in nested lists
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};

/**
 * ParserBlock.parse(str, md, env, outTokens)
 *
 * Process input string and push block tokens into `outTokens`
 **/
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  if (!src) { return }

  const state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};

ParserBlock.prototype.State = StateBlock;

// Inline parser state


function StateInline (src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  // Stores { start: end } pairs. Useful for backtrack
  // optimization of pairs parse (emphasis, strikes).
  this.cache = {};

  // List of emphasis-like delimiters for current tag
  this.delimiters = [];

  // Stack of delimiter lists for upper level tags
  this._prev_delimiters = [];

  // backtick length => last seen position
  this.backticks = {};
  this.backticksScanned = false;

  // Counter used to disable inline linkify-it execution
  // inside <a> and markdown links
  this.linkLevel = 0;
}

// Flush pending text
//
StateInline.prototype.pushPending = function () {
  const token = new Token('text', '', 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = '';
  return token
};

// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  const token = new Token(type, tag, nesting);
  let token_meta = null;

  if (nesting < 0) {
    // closing tag
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }

  token.level = this.level;

  if (nesting > 0) {
    // opening tag
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }

  this.pendingLevel = this.level;
  this.tokens.push(token);
  this.tokens_meta.push(token_meta);
  return token
};

// Scan a sequence of emphasis-like markers, and determine whether
// it can start an emphasis sequence or end an emphasis sequence.
//
//  - start - position to scan from (it should point at a valid marker);
//  - canSplitWord - determine if these markers can be found inside a word
//
StateInline.prototype.scanDelims = function (start, canSplitWord) {
  const max = this.posMax;
  const marker = this.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

  let pos = start;
  while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

  const count = pos - start;

  // treat end of the line as a whitespace
  const nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

  const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

  const isLastWhiteSpace = isWhiteSpace(lastChar);
  const isNextWhiteSpace = isWhiteSpace(nextChar);

  const left_flanking =
    !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
  const right_flanking =
    !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);

  const can_open  = left_flanking  && (canSplitWord || !right_flanking || isLastPunctChar);
  const can_close = right_flanking && (canSplitWord || !left_flanking  || isNextPunctChar);

  return { can_open, can_close, length: count }
};

// re-export Token class to use in block rules
StateInline.prototype.Token = Token;

// Skip text characters for text token, place those to pending buffer
// and increment current pos

// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions

// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
function isTerminatorChar (ch) {
  switch (ch) {
    case 0x0A/* \n */:
    case 0x21/* ! */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2D/* - */:
    case 0x3A/* : */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true
    default:
      return false
  }
}

function text (state, silent) {
  let pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) { return false }

  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

  state.pos = pos;

  return true
}

// Alternative implementation, for memory.
//
// It costs 10% of performance, but allows extend terminators list, if place it
// to `ParserInline` property. Probably, will switch to it sometime, such
// flexibility required.

/*
var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

module.exports = function text(state, silent) {
  var pos = state.pos,
      idx = state.src.slice(pos).search(TERMINATOR_RE);

  // first char is terminator -> empty text
  if (idx === 0) { return false; }

  // no terminator -> text till end of string
  if (idx < 0) {
    if (!silent) { state.pending += state.src.slice(pos); }
    state.pos = state.src.length;
    return true;
  }

  if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

  state.pos += idx;

  return true;
}; */

// Process links like https://example.org/

// RFC3986: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
const SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;

function linkify (state, silent) {
  if (!state.md.options.linkify) return false
  if (state.linkLevel > 0) return false

  const pos = state.pos;
  const max = state.posMax;

  if (pos + 3 > max) return false
  if (state.src.charCodeAt(pos) !== 0x3A/* : */) return false
  if (state.src.charCodeAt(pos + 1) !== 0x2F/* / */) return false
  if (state.src.charCodeAt(pos + 2) !== 0x2F/* / */) return false

  const match = state.pending.match(SCHEME_RE);
  if (!match) return false

  const proto = match[1];

  const link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
  if (!link) return false

  let url = link.url;

  // invalid link, but still detected by linkify somehow;
  // need to check to prevent infinite loop below
  if (url.length <= proto.length) return false

  // disallow '*' at the end of the link (conflicts with emphasis)
  url = url.replace(/\*+$/, '');

  const fullUrl = state.md.normalizeLink(url);
  if (!state.md.validateLink(fullUrl)) return false

  if (!silent) {
    state.pending = state.pending.slice(0, -proto.length);

    const token_o = state.push('link_open', 'a', 1);
    token_o.attrs = [['href', fullUrl]];
    token_o.markup = 'linkify';
    token_o.info = 'auto';

    const token_t = state.push('text', '', 0);
    token_t.content = state.md.normalizeLinkText(url);

    const token_c = state.push('link_close', 'a', -1);
    token_c.markup = 'linkify';
    token_c.info = 'auto';
  }

  state.pos += url.length - proto.length;
  return true
}

// Proceess '\n'


function newline (state, silent) {
  let pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false }

  const pmax = state.pending.length - 1;
  const max = state.posMax;

  // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        // Find whitespaces tail of pending chars.
        let ws = pmax - 1;
        while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 0x20) ws--;

        state.pending = state.pending.slice(0, ws);
        state.push('hardbreak', 'br', 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push('softbreak', 'br', 0);
      }
    } else {
      state.push('softbreak', 'br', 0);
    }
  }

  pos++;

  // skip heading spaces for next line
  while (pos < max && isSpace(state.src.charCodeAt(pos))) { pos++; }

  state.pos = pos;
  return true
}

// Process escaped chars and hardbreaks


const ESCAPED = [];

for (let i = 0; i < 256; i++) { ESCAPED.push(0); }

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
  .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });

function escape$1 (state, silent) {
  let pos = state.pos;
  const max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) return false
  pos++;

  // '\' at the end of the inline block
  if (pos >= max) return false

  let ch1 = state.src.charCodeAt(pos);

  if (ch1 === 0x0A) {
    if (!silent) {
      state.push('hardbreak', 'br', 0);
    }

    pos++;
    // skip leading whitespaces from next line
    while (pos < max) {
      ch1 = state.src.charCodeAt(pos);
      if (!isSpace(ch1)) break
      pos++;
    }

    state.pos = pos;
    return true
  }

  let escapedStr = state.src[pos];

  if (ch1 >= 0xD800 && ch1 <= 0xDBFF && pos + 1 < max) {
    const ch2 = state.src.charCodeAt(pos + 1);

    if (ch2 >= 0xDC00 && ch2 <= 0xDFFF) {
      escapedStr += state.src[pos + 1];
      pos++;
    }
  }

  const origStr = '\\' + escapedStr;

  if (!silent) {
    const token = state.push('text_special', '', 0);

    if (ch1 < 256 && ESCAPED[ch1] !== 0) {
      token.content = escapedStr;
    } else {
      token.content = origStr;
    }

    token.markup = origStr;
    token.info   = 'escape';
  }

  state.pos = pos + 1;
  return true
}

// Parse backticks

function backtick (state, silent) {
  let pos = state.pos;
  const ch = state.src.charCodeAt(pos);

  if (ch !== 0x60/* ` */) { return false }

  const start = pos;
  pos++;
  const max = state.posMax;

  // scan marker length
  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

  const marker = state.src.slice(start, pos);
  const openerLength = marker.length;

  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true
  }

  let matchEnd = pos;
  let matchStart;

  // Nothing found in the cache, scan until the end of the line (or until marker is found)
  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    // scan marker length
    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

    const closerLength = matchEnd - matchStart;

    if (closerLength === openerLength) {
      // Found matching closer length.
      if (!silent) {
        const token = state.push('code_inline', 'code', 0);
        token.markup = marker;
        token.content = state.src.slice(pos, matchStart)
          .replace(/\n/g, ' ')
          .replace(/^ (.+) $/, '$1');
      }
      state.pos = matchEnd;
      return true
    }

    // Some different length found, put it in cache as upper limit of where closer can be found
    state.backticks[closerLength] = matchStart;
  }

  // Scanned through the end, didn't find anything
  state.backticksScanned = true;

  if (!silent) state.pending += marker;
  state.pos += openerLength;
  return true
}

// ~~strike through~~
//

// Insert each marker as a separate text token, and add it to delimiter list
//
function strikethrough_tokenize (state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);

  if (silent) { return false }

  if (marker !== 0x7E/* ~ */) { return false }

  const scanned = state.scanDelims(state.pos, true);
  let len = scanned.length;
  const ch = String.fromCharCode(marker);

  if (len < 2) { return false }

  let token;

  if (len % 2) {
    token         = state.push('text', '', 0);
    token.content = ch;
    len--;
  }

  for (let i = 0; i < len; i += 2) {
    token         = state.push('text', '', 0);
    token.content = ch + ch;

    state.delimiters.push({
      marker,
      length: 0,     // disable "rule of 3" length checks meant for emphasis
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true
}

function postProcess$1 (state, delimiters) {
  let token;
  const loneMarkers = [];
  const max = delimiters.length;

  for (let i = 0; i < max; i++) {
    const startDelim = delimiters[i];

    if (startDelim.marker !== 0x7E/* ~ */) {
      continue
    }

    if (startDelim.end === -1) {
      continue
    }

    const endDelim = delimiters[startDelim.end];

    token         = state.tokens[startDelim.token];
    token.type    = 's_open';
    token.tag     = 's';
    token.nesting = 1;
    token.markup  = '~~';
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = 's_close';
    token.tag     = 's';
    token.nesting = -1;
    token.markup  = '~~';
    token.content = '';

    if (state.tokens[endDelim.token - 1].type === 'text' &&
        state.tokens[endDelim.token - 1].content === '~') {
      loneMarkers.push(endDelim.token - 1);
    }
  }

  // If a marker sequence has an odd number of characters, it's splitted
  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent s_close tags.
  //
  while (loneMarkers.length) {
    const i = loneMarkers.pop();
    let j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
      j++;
    }

    j--;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
}

// Walk through delimiter list and replace text tokens with tags
//
function strikethrough_postProcess (state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;

  postProcess$1(state, state.delimiters);

  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess$1(state, tokens_meta[curr].delimiters);
    }
  }
}

var r_strikethrough = {
  tokenize: strikethrough_tokenize,
  postProcess: strikethrough_postProcess
};

// Process *this* and _that_
//

// Insert each marker as a separate text token, and add it to delimiter list
//
function emphasis_tokenize (state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);

  if (silent) { return false }

  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false }

  const scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (let i = 0; i < scanned.length; i++) {
    const token = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);

    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker,

      // Total length of these series of delimiters.
      //
      length: scanned.length,

      // A position of the token this delimiter corresponds to.
      //
      token: state.tokens.length - 1,

      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,

      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: scanned.can_open,
      close: scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true
}

function postProcess (state, delimiters) {
  const max = delimiters.length;

  for (let i = max - 1; i >= 0; i--) {
    const startDelim = delimiters[i];

    if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
      continue
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue
    }

    const endDelim = delimiters[startDelim.end];

    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //
    const isStrong = i > 0 &&
               delimiters[i - 1].end === startDelim.end + 1 &&
               // check that first two markers match and adjacent
               delimiters[i - 1].marker === startDelim.marker &&
               delimiters[i - 1].token === startDelim.token - 1 &&
               // check that last two markers are adjacent (we can safely assume they match)
               delimiters[startDelim.end + 1].token === endDelim.token + 1;

    const ch = String.fromCharCode(startDelim.marker);

    const token_o   = state.tokens[startDelim.token];
    token_o.type    = isStrong ? 'strong_open' : 'em_open';
    token_o.tag     = isStrong ? 'strong' : 'em';
    token_o.nesting = 1;
    token_o.markup  = isStrong ? ch + ch : ch;
    token_o.content = '';

    const token_c   = state.tokens[endDelim.token];
    token_c.type    = isStrong ? 'strong_close' : 'em_close';
    token_c.tag     = isStrong ? 'strong' : 'em';
    token_c.nesting = -1;
    token_c.markup  = isStrong ? ch + ch : ch;
    token_c.content = '';

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = '';
      state.tokens[delimiters[startDelim.end + 1].token].content = '';
      i--;
    }
  }
}

// Walk through delimiter list and replace text tokens with tags
//
function emphasis_post_process (state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;

  postProcess(state, state.delimiters);

  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
}

var r_emphasis = {
  tokenize: emphasis_tokenize,
  postProcess: emphasis_post_process
};

// Process [link](<to> "stuff")


function link (state, silent) {
  let code, label, res, ref;
  let href = '';
  let title = '';
  let start = state.pos;
  let parseReference = true;

  if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false }

  const oldPos = state.pos;
  const max = state.posMax;
  const labelStart = state.pos + 1;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false }

  let pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // might have found a valid shortcut link, disable reference parsing
    parseReference = false;

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break }
    }
    if (pos >= max) { return false }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }

      // [link](  <href>  "title"  )
      //                ^^ skipping these spaces
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break }
      }

      // [link](  <href>  "title"  )
      //                  ^^^^^^^ parsing link title
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) { break }
        }
      }
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      // parsing a valid shortcut link failed, fallback to reference
      parseReference = true;
    }
    pos++;
  }

  if (parseReference) {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    const token_o = state.push('link_open', 'a', 1);
    const attrs = [['href', href]];
    token_o.attrs  = attrs;
    if (title) {
      attrs.push(['title', title]);
    }

    state.linkLevel++;
    state.md.inline.tokenize(state);
    state.linkLevel--;

    state.push('link_close', 'a', -1);
  }

  state.pos = pos;
  state.posMax = max;
  return true
}

// Process ![image](<src> "title")


function image (state, silent) {
  let code, content, label, pos, ref, res, title, start;
  let href = '';
  const oldPos = state.pos;
  const max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false }
  if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false }

  const labelStart = state.pos + 2;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break }
    }
    if (pos >= max) { return false }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false
    }
    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);

    const tokens = [];
    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens
    );

    const token = state.push('image', 'img', 0);
    const attrs = [['src', href], ['alt', '']];
    token.attrs = attrs;
    token.children = tokens;
    token.content = content;

    if (title) {
      attrs.push(['title', title]);
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true
}

// Process autolinks '<protocol:...>'

/* eslint max-len:0 */
const EMAIL_RE    = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
/* eslint-disable-next-line no-control-regex */
const AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;

function autolink (state, silent) {
  let pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false }

  const start = state.pos;
  const max = state.posMax;

  for (;;) {
    if (++pos >= max) return false

    const ch = state.src.charCodeAt(pos);

    if (ch === 0x3C /* < */) return false
    if (ch === 0x3E /* > */) break
  }

  const url = state.src.slice(start + 1, pos);

  if (AUTOLINK_RE.test(url)) {
    const fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) { return false }

    if (!silent) {
      const token_o   = state.push('link_open', 'a', 1);
      token_o.attrs   = [['href', fullUrl]];
      token_o.markup  = 'autolink';
      token_o.info    = 'auto';

      const token_t   = state.push('text', '', 0);
      token_t.content = state.md.normalizeLinkText(url);

      const token_c   = state.push('link_close', 'a', -1);
      token_c.markup  = 'autolink';
      token_c.info    = 'auto';
    }

    state.pos += url.length + 2;
    return true
  }

  if (EMAIL_RE.test(url)) {
    const fullUrl = state.md.normalizeLink('mailto:' + url);
    if (!state.md.validateLink(fullUrl)) { return false }

    if (!silent) {
      const token_o   = state.push('link_open', 'a', 1);
      token_o.attrs   = [['href', fullUrl]];
      token_o.markup  = 'autolink';
      token_o.info    = 'auto';

      const token_t   = state.push('text', '', 0);
      token_t.content = state.md.normalizeLinkText(url);

      const token_c   = state.push('link_close', 'a', -1);
      token_c.markup  = 'autolink';
      token_c.info    = 'auto';
    }

    state.pos += url.length + 2;
    return true
  }

  return false
}

// Process html tags


function isLinkOpen (str) {
  return /^<a[>\s]/i.test(str)
}
function isLinkClose (str) {
  return /^<\/a\s*>/i.test(str)
}

function isLetter (ch) {
  /* eslint no-bitwise:0 */
  const lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */)
}

function html_inline (state, silent) {
  if (!state.md.options.html) { return false }

  // Check start
  const max = state.posMax;
  const pos = state.pos;
  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      pos + 2 >= max) {
    return false
  }

  // Quick fail on second char
  const ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21/* ! */ &&
      ch !== 0x3F/* ? */ &&
      ch !== 0x2F/* / */ &&
      !isLetter(ch)) {
    return false
  }

  const match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) { return false }

  if (!silent) {
    const token = state.push('html_inline', '', 0);
    token.content = match[0];

    if (isLinkOpen(token.content))  state.linkLevel++;
    if (isLinkClose(token.content)) state.linkLevel--;
  }
  state.pos += match[0].length;
  return true
}

// Process html entity - &#123;, &#xAF;, &quot;, ...


const DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
const NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;

function entity (state, silent) {
  const pos = state.pos;
  const max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26/* & */) return false

  if (pos + 1 >= max) return false

  const ch = state.src.charCodeAt(pos + 1);

  if (ch === 0x23 /* # */) {
    const match = state.src.slice(pos).match(DIGITAL_RE);
    if (match) {
      if (!silent) {
        const code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);

        const token   = state.push('text_special', '', 0);
        token.content = isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
        token.markup  = match[0];
        token.info    = 'entity';
      }
      state.pos += match[0].length;
      return true
    }
  } else {
    const match = state.src.slice(pos).match(NAMED_RE);
    if (match) {
      const decoded = decodeHTML(match[0]);
      if (decoded !== match[0]) {
        if (!silent) {
          const token   = state.push('text_special', '', 0);
          token.content = decoded;
          token.markup  = match[0];
          token.info    = 'entity';
        }
        state.pos += match[0].length;
        return true
      }
    }
  }

  return false
}

// For each opening emphasis-like marker find a matching closing one
//

function processDelimiters (delimiters) {
  const openersBottom = {};
  const max = delimiters.length;

  if (!max) return

  // headerIdx is the first delimiter of the current (where closer is) delimiter run
  let headerIdx = 0;
  let lastTokenIdx = -2; // needs any value lower than -1
  const jumps = [];

  for (let closerIdx = 0; closerIdx < max; closerIdx++) {
    const closer = delimiters[closerIdx];

    jumps.push(0);

    // markers belong to same delimiter run if:
    //  - they have adjacent tokens
    //  - AND markers are the same
    //
    if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
      headerIdx = closerIdx;
    }

    lastTokenIdx = closer.token;

    // Length is only used for emphasis-specific "rule of 3",
    // if it's not defined (in strikethrough or 3rd party plugins),
    // we can default it to 0 to disable those checks.
    //
    closer.length = closer.length || 0;

    if (!closer.close) continue

    // Previously calculated lower bounds (previous fails)
    // for each marker, each delimiter length modulo 3,
    // and for whether this closer can be an opener;
    // https://github.com/commonmark/cmark/commit/34250e12ccebdc6372b8b49c44fab57c72443460
    /* eslint-disable-next-line no-prototype-builtins */
    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
    }

    const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length % 3)];

    let openerIdx = headerIdx - jumps[headerIdx] - 1;

    let newMinOpenerIdx = openerIdx;

    for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
      const opener = delimiters[openerIdx];

      if (opener.marker !== closer.marker) continue

      if (opener.open && opener.end < 0) {
        let isOddMatch = false;

        // from spec:
        //
        // If one of the delimiters can both open and close emphasis, then the
        // sum of the lengths of the delimiter runs containing the opening and
        // closing delimiters must not be a multiple of 3 unless both lengths
        // are multiples of 3.
        //
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }

        if (!isOddMatch) {
          // If previous delimiter cannot be an opener, we can safely skip
          // the entire sequence in future checks. This is required to make
          // sure algorithm has linear complexity (see *_*_*_*_*_... case).
          //
          const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open
            ? jumps[openerIdx - 1] + 1
            : 0;

          jumps[closerIdx] = closerIdx - openerIdx + lastJump;
          jumps[openerIdx] = lastJump;

          closer.open  = false;
          opener.end   = closerIdx;
          opener.close = false;
          newMinOpenerIdx = -1;
          // treat next token as start of run,
          // it optimizes skips in **<...>**a**<...>** pathological case
          lastTokenIdx = -2;
          break
        }
      }
    }

    if (newMinOpenerIdx !== -1) {
      // If match for this delimiter run failed, we want to set lower bound for
      // future lookups. This is required to make sure algorithm has linear
      // complexity.
      //
      // See details here:
      // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
      //
      openersBottom[closer.marker][(closer.open ? 3 : 0) + ((closer.length || 0) % 3)] = newMinOpenerIdx;
    }
  }
}

function link_pairs (state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;

  processDelimiters(state.delimiters);

  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(tokens_meta[curr].delimiters);
    }
  }
}

// Clean up tokens after emphasis and strikethrough postprocessing:
// merge adjacent text nodes into one and re-calculate all token levels
//
// This is necessary because initially emphasis delimiter markers (*, _, ~)
// are treated as their own separate text tokens. Then emphasis rule either
// leaves them as text (needed to merge with adjacent text) or turns them
// into opening/closing tags (which messes up levels inside).
//

function fragments_join (state) {
  let curr, last;
  let level = 0;
  const tokens = state.tokens;
  const max = state.tokens.length;

  for (curr = last = 0; curr < max; curr++) {
    // re-calculate levels after emphasis/strikethrough turns some text nodes
    // into opening/closing tags
    if (tokens[curr].nesting < 0) level--; // closing tag
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++; // opening tag

    if (tokens[curr].type === 'text' &&
        curr + 1 < max &&
        tokens[curr + 1].type === 'text') {
      // collapse two adjacent text nodes
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) { tokens[last] = tokens[curr]; }

      last++;
    }
  }

  if (curr !== last) {
    tokens.length = last;
  }
}

/** internal
 * class ParserInline
 *
 * Tokenizes paragraph content.
 **/


// Parser rules

const _rules = [
  ['text',            text],
  ['linkify',         linkify],
  ['newline',         newline],
  ['escape',          escape$1],
  ['backticks',       backtick],
  ['strikethrough',   r_strikethrough.tokenize],
  ['emphasis',        r_emphasis.tokenize],
  ['link',            link],
  ['image',           image],
  ['autolink',        autolink],
  ['html_inline',     html_inline],
  ['entity',          entity]
];

// `rule2` ruleset was created specifically for emphasis/strikethrough
// post-processing and may be changed in the future.
//
// Don't use this for anything except pairs (plugins working with `balance_pairs`).
//
const _rules2 = [
  ['balance_pairs',   link_pairs],
  ['strikethrough',   r_strikethrough.postProcess],
  ['emphasis',        r_emphasis.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ['fragments_join',  fragments_join]
];

/**
 * new ParserInline()
 **/
function ParserInline () {
  /**
   * ParserInline#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of inline rules.
   **/
  this.ruler = new Ruler();

  for (let i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }

  /**
   * ParserInline#ruler2 -> Ruler
   *
   * [[Ruler]] instance. Second ruler used for post-processing
   * (e.g. in emphasis-like rules).
   **/
  this.ruler2 = new Ruler();

  for (let i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
}

// Skip single token by running all rules in validation mode;
// returns `true` if any rule reported success
//
ParserInline.prototype.skipToken = function (state) {
  const pos = state.pos;
  const rules = this.ruler.getRules('');
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  const cache = state.cache;

  if (typeof cache[pos] !== 'undefined') {
    state.pos = cache[pos];
    return
  }

  let ok = false;

  if (state.level < maxNesting) {
    for (let i = 0; i < len; i++) {
      // Increment state.level and decrement it later to limit recursion.
      // It's harmless to do here, because no tokens are created. But ideally,
      // we'd need a separate private state variable for this purpose.
      //
      state.level++;
      ok = rules[i](state, true);
      state.level--;

      if (ok) {
        if (pos >= state.pos) { throw new Error("inline rule didn't increment state.pos") }
        break
      }
    }
  } else {
    // Too much nesting, just skip until the end of the paragraph.
    //
    // NOTE: this will cause links to behave incorrectly in the following case,
    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
    //
    //       [[[[[[[[[[[[[[[[[[[[[foo]()
    //
    // TODO: remove this workaround when CM standard will allow nested links
    //       (we can replace it by preventing links from being parsed in
    //       validation mode)
    //
    state.pos = state.posMax;
  }

  if (!ok) { state.pos++; }
  cache[pos] = state.pos;
};

// Generate tokens for input range
//
ParserInline.prototype.tokenize = function (state) {
  const rules = this.ruler.getRules('');
  const len = rules.length;
  const end = state.posMax;
  const maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true
    const prevPos = state.pos;
    let ok = false;

    if (state.level < maxNesting) {
      for (let i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) {
          if (prevPos >= state.pos) { throw new Error("inline rule didn't increment state.pos") }
          break
        }
      }
    }

    if (ok) {
      if (state.pos >= end) { break }
      continue
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};

/**
 * ParserInline.parse(str, md, env, outTokens)
 *
 * Process input string and push inline tokens into `outTokens`
 **/
ParserInline.prototype.parse = function (str, md, env, outTokens) {
  const state = new this.State(str, md, env, outTokens);

  this.tokenize(state);

  const rules = this.ruler2.getRules('');
  const len = rules.length;

  for (let i = 0; i < len; i++) {
    rules[i](state);
  }
};

ParserInline.prototype.State = StateInline;

function reFactory (opts) {
  const re = {};
  opts = opts || {};

  re.src_Any = Any.source;
  re.src_Cc = Cc.source;
  re.src_Z = Z.source;
  re.src_P = P.source;

  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
  re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join('|');

  // \p{\Z\Cc} (white spaces + control)
  re.src_ZCc = [re.src_Z, re.src_Cc].join('|');

  // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text
  const text_separators = '[><\uff5c]';

  // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)
  re.src_pseudo_letter = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
  // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

  re.src_ip4 =

    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
  re.src_auth = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

  re.src_port =

    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

  re.src_host_terminator =

    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')' +
    '(?!' + (opts['---'] ? '-(?!--)|' : '-|') + '_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

  re.src_path =

    '(?:' +
      '[/?#]' +
        '(?:' +
          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-;]).|' +
          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +

          // allow `I'm_king` if no pair found
          "\\'(?=" + re.src_pseudo_letter + '|[-])|' +

          // google has many dots in "google search" links (#66, #81).
          // github has ... in commit range links,
          // Restrict to
          // - english
          // - percent-encoded
          // - parts of file path
          // - params separator
          // until more examples found.
          '\\.{2,}[a-zA-Z0-9%/&]|' +

          '\\.(?!' + re.src_ZCc + '|[.]|$)|' +
          (opts['---']
            ? '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
            : '\\-+|'
          ) +
          // allow `,,,` in paths
          ',(?!' + re.src_ZCc + '|$)|' +

          // allow `;` if not followed by space-like char
          ';(?!' + re.src_ZCc + '|$)|' +

          // allow `!!!` in paths, but not at the end
          '\\!+(?!' + re.src_ZCc + '|[!]|$)|' +

          '\\?(?!' + re.src_ZCc + '|[?]|$)' +
        ')+' +
      '|\\/' +
    ')?';

  // Allow anything in markdown spec, forbid quote (") at the first position
  // because emails enclosed in quotes are far more common
  re.src_email_name =

    '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';

  re.src_xn =

    'xn--[a-z0-9\\-]{1,59}';

  // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root =

    // Allow letters & digits (http://test1)
    '(?:' +
      re.src_xn +
      '|' +
      re.src_pseudo_letter + '{1,63}' +
    ')';

  re.src_domain =

    '(?:' +
      re.src_xn +
      '|' +
      '(?:' + re.src_pseudo_letter + ')' +
      '|' +
      '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
    ')';

  re.src_host =

    '(?:' +
    // Don't need IP check, because digits are already allowed in normal domain names
    //   src_ip4 +
    // '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/* _root */ + ')' +
    ')';

  re.tpl_host_fuzzy =

    '(?:' +
      re.src_ip4 +
    '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
    ')';

  re.tpl_host_no_ip_fuzzy =

    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

  re.src_host_strict =

    re.src_host + re.src_host_terminator;

  re.tpl_host_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_host_terminator;

  re.src_host_port_strict =

    re.src_host + re.src_port + re.src_host_terminator;

  re.tpl_host_port_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

  re.tpl_host_port_no_ip_fuzzy_strict =

    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;

  //
  // Main rules
  //

  // Rude test fuzzy links by host, for quick deny
  re.tpl_host_fuzzy_test =

    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

  re.tpl_email_fuzzy =

      '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' +
      '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

  re.tpl_link_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

  re.tpl_link_no_ip_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

  return re
}

//
// Helpers
//

// Merge objects
//
function assign (obj /* from1, from2, from3, ... */) {
  const sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj
}

function _class (obj) { return Object.prototype.toString.call(obj) }
function isString (obj) { return _class(obj) === '[object String]' }
function isObject (obj) { return _class(obj) === '[object Object]' }
function isRegExp (obj) { return _class(obj) === '[object RegExp]' }
function isFunction (obj) { return _class(obj) === '[object Function]' }

function escapeRE (str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&') }

//

const defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};

function isOptionsObj (obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    /* eslint-disable-next-line no-prototype-builtins */
    return acc || defaultOptions.hasOwnProperty(k)
  }, false)
}

const defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      const tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http = new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length
      }
      return 0
    }
  },
  'https:': 'http:',
  'ftp:': 'http:',
  '//': {
    validate: function (text, pos, self) {
      const tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http = new RegExp(
          '^' +
          self.re.src_auth +
          // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
          self.re.src_port +
          self.re.src_host_terminator +
          self.re.src_path,

          'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0 }
        if (pos >= 3 && text[pos - 3] === '/') { return 0 }
        return tail.match(self.re.no_http)[0].length
      }
      return 0
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      const tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto = new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length
      }
      return 0
    }
  }
};

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
/* eslint-disable-next-line max-len */
const tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
const tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

function resetScanCache (self) {
  self.__index__ = -1;
  self.__text_cache__ = '';
}

function createValidator (re) {
  return function (text, pos) {
    const tail = text.slice(pos);

    if (re.test(tail)) {
      return tail.match(re)[0].length
    }
    return 0
  }
}

function createNormalizer () {
  return function (match, self) {
    self.normalize(match);
  }
}

// Schemas compiler. Build regexps.
//
function compile$1 (self) {
  // Load & clone RE patterns.
  const re = self.re = reFactory(self.__opts__);

  // Define dynamic patterns
  const tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re.src_xn);

  re.src_tlds = tlds.join('|');

  function untpl (tpl) { return tpl.replace('%TLDS%', re.src_tlds) }

  re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), 'i');
  re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), 'i');
  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
  re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  const aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError (name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val)
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    const val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return }

    const compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return
    }

    if (isString(val)) {
      aliases.push(name);
      return
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  const slist = Object.keys(self.__compiled__)
    .filter(function (name) {
      // Filter disabled & fake schemas
      return name.length > 0 && self.__compiled__[name]
    })
    .map(escapeRE)
    .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');
  self.re.schema_at_start = RegExp('^' + self.re.schema_search.source, 'i');

  self.re.pretest = RegExp(
    '(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@',
    'i'
  );

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match (self, shift) {
  const start = self.__index__;
  const end = self.__last_index__;
  const text = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url = text;
}

function createMatch (self, shift) {
  const match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match
}

/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt (schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options)
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__ = assign({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__ = -1;
  this.__last_index__ = -1; // Next scan position
  this.__schema__ = '';
  this.__text_cache__ = '';

  this.__schemas__ = assign({}, defaultSchemas, schemas);
  this.__compiled__ = {};

  this.__tlds__ = tlds_default;
  this.__tlds_replaced__ = false;

  this.re = {};

  compile$1(this);
}

/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add (schema, definition) {
  this.__schemas__[schema] = definition;
  compile$1(this);
  return this
};

/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set (options) {
  this.__opts__ = assign(this.__opts__, options);
  return this
};

/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test (text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__ = -1;

  if (!text.length) { return false }

  let m, ml, me, len, shift, next, re, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re.lastIndex);
      if (len) {
        this.__schema__ = m[2];
        this.__index__ = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__ = '';
            this.__index__ = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {
        shift = me.index + me[1].length;
        next = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__ = 'mailto:';
          this.__index__ = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0
};

/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest (text) {
  return this.re.pretest.test(text)
};

/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt (text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this)
};

/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match (text) {
  const result = [];
  let shift = 0;

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  let tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result
  }

  return null
};

/**
 * LinkifyIt#matchAtStart(text) -> Match|null
 *
 * Returns fully-formed (not fuzzy) link if it starts at the beginning
 * of the string, and null otherwise.
 **/
LinkifyIt.prototype.matchAtStart = function matchAtStart (text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__ = -1;

  if (!text.length) return null

  const m = this.re.schema_at_start.exec(text);
  if (!m) return null

  const len = this.testSchemaAt(text, m[2], m[0].length);
  if (!len) return null

  this.__schema__ = m[2];
  this.__index__ = m.index + m[1].length;
  this.__last_index__ = m.index + m[0].length + len;

  return createMatch(this, 0)
};

/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds (list, keepOld) {
  list = Array.isArray(list) ? list : [list];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile$1(this);
    return this
  }

  this.__tlds__ = this.__tlds__.concat(list)
    .sort()
    .filter(function (el, idx, arr) {
      return el !== arr[idx - 1]
    })
    .reverse();

  compile$1(this);
  return this
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize (match) {
  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};

/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/
LinkifyIt.prototype.onCompile = function onCompile () {
};

/** Highest positive signed 32-bit float value */
const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'

/** Regular expressions */
const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
const errors$1 = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
	throw new RangeError(errors$1[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, callback) {
	const result = [];
	let length = array.length;
	while (length--) {
		result[length] = callback(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {String} A new string of characters returned by the callback
 * function.
 */
function mapDomain(domain, callback) {
	const parts = domain.split('@');
	let result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		domain = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	domain = domain.replace(regexSeparators, '\x2E');
	const labels = domain.split('.');
	const encoded = map(labels, callback).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	const output = [];
	let counter = 0;
	const length = string.length;
	while (counter < length) {
		const value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			const extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
const ucs2encode = codePoints => String.fromCodePoint(...codePoints);

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
const basicToDigit = function(codePoint) {
	if (codePoint >= 0x30 && codePoint < 0x3A) {
		return 26 + (codePoint - 0x30);
	}
	if (codePoint >= 0x41 && codePoint < 0x5B) {
		return codePoint - 0x41;
	}
	if (codePoint >= 0x61 && codePoint < 0x7B) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
const digitToBasic = function(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
const adapt = function(delta, numPoints, firstTime) {
	let k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
const decode = function(input) {
	// Don't use UCS-2.
	const output = [];
	const inputLength = input.length;
	let i = 0;
	let n = initialN;
	let bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	let basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (let j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		const oldi = i;
		for (let w = 1, k = base; /* no condition */; k += base) {

			if (index >= inputLength) {
				error('invalid-input');
			}

			const digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base) {
				error('invalid-input');
			}
			if (digit > floor((maxInt - i) / w)) {
				error('overflow');
			}

			i += digit * w;
			const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

			if (digit < t) {
				break;
			}

			const baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error('overflow');
			}

			w *= baseMinusT;

		}

		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);

	}

	return String.fromCodePoint(...output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
const encode = function(input) {
	const output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	const inputLength = input.length;

	// Initialize the state.
	let n = initialN;
	let delta = 0;
	let bias = initialBias;

	// Handle the basic code points.
	for (const currentValue of input) {
		if (currentValue < 0x80) {
			output.push(stringFromCharCode(currentValue));
		}
	}

	const basicLength = output.length;
	let handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		let m = maxInt;
		for (const currentValue of input) {
			if (currentValue >= n && currentValue < m) {
				m = currentValue;
			}
		}

		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
		// but guard against overflow.
		const handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		for (const currentValue of input) {
			if (currentValue < n && ++delta > maxInt) {
				error('overflow');
			}
			if (currentValue === n) {
				// Represent delta as a generalized variable-length integer.
				let q = delta;
				for (let k = base; /* no condition */; k += base) {
					const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
					if (q < t) {
						break;
					}
					const qMinusT = q - t;
					const baseMinusT = base - t;
					output.push(
						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
					);
					q = floor(qMinusT / baseMinusT);
				}

				output.push(stringFromCharCode(digitToBasic(q, 0)));
				bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
				delta = 0;
				++handledCPCount;
			}
		}

		++delta;
		++n;

	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
const toUnicode = function(input) {
	return mapDomain(input, function(string) {
		return regexPunycode.test(string)
			? decode(string.slice(4).toLowerCase())
			: string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
const toASCII = function(input) {
	return mapDomain(input, function(string) {
		return regexNonASCII.test(string)
			? 'xn--' + encode(string)
			: string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
const punycode = {
	/**
	 * A string representing the current Punycode.js version number.
	 * @memberOf punycode
	 * @type String
	 */
	'version': '2.3.1',
	/**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

// markdown-it default options

var cfg_default = {
  options: {
    // Enable HTML tags in source
    html: false,

    // Use '/' to close single tags (<br />)
    xhtmlOut: false,

    // Convert '\n' in paragraphs into <br>
    breaks: false,

    // CSS language prefix for fenced blocks
    langPrefix: 'language-',

    // autoconvert URL-like texts to links
    linkify: false,

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    // Internal protection, recursion limit
    maxNesting: 100
  },

  components: {
    core: {},
    block: {},
    inline: {}
  }
};

// "Zero" preset, with nothing enabled. Useful for manual configuring of simple
// modes. For example, to parse bold/italic only.

var cfg_zero = {
  options: {
    // Enable HTML tags in source
    html: false,

    // Use '/' to close single tags (<br />)
    xhtmlOut: false,

    // Convert '\n' in paragraphs into <br>
    breaks: false,

    // CSS language prefix for fenced blocks
    langPrefix: 'language-',

    // autoconvert URL-like texts to links
    linkify: false,

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    // Internal protection, recursion limit
    maxNesting: 20
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline',
        'text_join'
      ]
    },

    block: {
      rules: [
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'text'
      ],
      rules2: [
        'balance_pairs',
        'fragments_join'
      ]
    }
  }
};

// Commonmark default options

var cfg_commonmark = {
  options: {
    // Enable HTML tags in source
    html: true,

    // Use '/' to close single tags (<br />)
    xhtmlOut: true,

    // Convert '\n' in paragraphs into <br>
    breaks: false,

    // CSS language prefix for fenced blocks
    langPrefix: 'language-',

    // autoconvert URL-like texts to links
    linkify: false,

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    // Internal protection, recursion limit
    maxNesting: 20
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline',
        'text_join'
      ]
    },

    block: {
      rules: [
        'blockquote',
        'code',
        'fence',
        'heading',
        'hr',
        'html_block',
        'lheading',
        'list',
        'reference',
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'autolink',
        'backticks',
        'emphasis',
        'entity',
        'escape',
        'html_inline',
        'image',
        'link',
        'newline',
        'text'
      ],
      rules2: [
        'balance_pairs',
        'emphasis',
        'fragments_join'
      ]
    }
  }
};

// Main parser class


const config = {
  default: cfg_default,
  zero: cfg_zero,
  commonmark: cfg_commonmark
};

//
// This validator can prohibit more than really needed to prevent XSS. It's a
// tradeoff to keep code simple and to be secure by default.
//
// If you need different setup - override validator method as you wish. Or
// replace it with dummy function and use external sanitizer.
//

const BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink (url) {
  // url should be normalized at this point, and existing entities are decoded
  const str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true
}

const RECODE_HOSTNAME_FOR = ['http:', 'https:', 'mailto:'];

function normalizeLink (url) {
  const parsed = urlParse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toASCII(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return encode$1(format$2(parsed))
}

function normalizeLinkText (url) {
  const parsed = urlParse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toUnicode(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  // add '%' to exclude list because of https://github.com/markdown-it/markdown-it/issues/720
  return decode$1(format$2(parsed), decode$1.defaultChars + '%')
}

/**
 * class MarkdownIt
 *
 * Main parser/renderer class.
 *
 * ##### Usage
 *
 * ```javascript
 * // node.js, "classic" way:
 * var MarkdownIt = require('markdown-it'),
 *     md = new MarkdownIt();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // node.js, the same, but with sugar:
 * var md = require('markdown-it')();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // browser without AMD, added to "window" on script load
 * // Note, there are no dash.
 * var md = window.markdownit();
 * var result = md.render('# markdown-it rulezz!');
 * ```
 *
 * Single line rendering, without paragraph wrap:
 *
 * ```javascript
 * var md = require('markdown-it')();
 * var result = md.renderInline('__markdown-it__ rulezz!');
 * ```
 **/

/**
 * new MarkdownIt([presetName, options])
 * - presetName (String): optional, `commonmark` / `zero`
 * - options (Object)
 *
 * Creates parser instanse with given config. Can be called without `new`.
 *
 * ##### presetName
 *
 * MarkdownIt provides named presets as a convenience to quickly
 * enable/disable active syntax rules and options for common use cases.
 *
 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) -
 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) -
 *   similar to GFM, used when no preset name given. Enables all available rules,
 *   but still without html, typographer & autolinker.
 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) -
 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
 *   For example, when you need only `bold` and `italic` markup and nothing else.
 *
 * ##### options:
 *
 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
 *   That's not safe! You may need external sanitizer to protect output from XSS.
 *   It's better to extend features via plugins, instead of enabling HTML.
 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
 *   world you will need HTML output.
 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
 *   Can be useful for external highlighters.
 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs) +
 *   quotes beautification (smartquotes).
 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
 *   pairs, when typographer enabled and smartquotes on. For example, you can
 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
 *   return empty string if the source was not changed and should be escaped
 *   externaly. If result starts with <pre... internal wrapper is skipped.
 *
 * ##### Example
 *
 * ```javascript
 * // commonmark mode
 * var md = require('markdown-it')('commonmark');
 *
 * // default mode
 * var md = require('markdown-it')();
 *
 * // enable everything
 * var md = require('markdown-it')({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 * ```
 *
 * ##### Syntax highlighting
 *
 * ```js
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
 *       } catch (__) {}
 *     }
 *
 *     return ''; // use external default escaping
 *   }
 * });
 * ```
 *
 * Or with full wrapper override (if you need assign class to `<pre>` or `<code>`):
 *
 * ```javascript
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * // Actual default values
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return '<pre><code class="hljs">' +
 *                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
 *                '</code></pre>';
 *       } catch (__) {}
 *     }
 *
 *     return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
 *   }
 * });
 * ```
 *
 **/
function MarkdownIt (presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options)
  }

  if (!options) {
    if (!isString$1(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }

  /**
   * MarkdownIt#inline -> ParserInline
   *
   * Instance of [[ParserInline]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.inline = new ParserInline();

  /**
   * MarkdownIt#block -> ParserBlock
   *
   * Instance of [[ParserBlock]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.block = new ParserBlock();

  /**
   * MarkdownIt#core -> Core
   *
   * Instance of [[Core]] chain executor. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.core = new Core();

  /**
   * MarkdownIt#renderer -> Renderer
   *
   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
   * rules for new token types, generated by plugins.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * function myToken(tokens, idx, options, env, self) {
   *   //...
   *   return result;
   * };
   *
   * md.renderer.rules['my_token'] = myToken
   * ```
   *
   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs).
   **/
  this.renderer = new Renderer();

  /**
   * MarkdownIt#linkify -> LinkifyIt
   *
   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.mjs)
   * rule.
   **/
  this.linkify = new LinkifyIt();

  /**
   * MarkdownIt#validateLink(url) -> Boolean
   *
   * Link validation function. CommonMark allows too much in links. By default
   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
   * except some embedded image types.
   *
   * You can change this behaviour:
   *
   * ```javascript
   * var md = require('markdown-it')();
   * // enable everything
   * md.validateLink = function () { return true; }
   * ```
   **/
  this.validateLink = validateLink;

  /**
   * MarkdownIt#normalizeLink(url) -> String
   *
   * Function used to encode link url to a machine-readable format,
   * which includes url-encoding, punycode, etc.
   **/
  this.normalizeLink = normalizeLink;

  /**
   * MarkdownIt#normalizeLinkText(url) -> String
   *
   * Function used to decode link url to a human-readable format`
   **/
  this.normalizeLinkText = normalizeLinkText;

  // Expose utils & helpers for easy acces from plugins

  /**
   * MarkdownIt#utils -> utils
   *
   * Assorted utility functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.mjs).
   **/
  this.utils = utils$1;

  /**
   * MarkdownIt#helpers -> helpers
   *
   * Link components parser functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
   **/
  this.helpers = assign$1({}, helpers);

  this.options = {};
  this.configure(presetName);

  if (options) { this.set(options); }
}

/** chainable
 * MarkdownIt.set(options)
 *
 * Set parser options (in the same format as in constructor). Probably, you
 * will never need it, but you can change options after constructor call.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .set({ html: true, breaks: true })
 *             .set({ typographer, true });
 * ```
 *
 * __Note:__ To achieve the best possible performance, don't modify a
 * `markdown-it` instance options on the fly. If you need multiple configurations
 * it's best to create multiple instances and initialize each with separate
 * config.
 **/
MarkdownIt.prototype.set = function (options) {
  assign$1(this.options, options);
  return this
};

/** chainable, internal
 * MarkdownIt.configure(presets)
 *
 * Batch load of all options and compenent settings. This is internal method,
 * and you probably will not need it. But if you will - see available presets
 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
 *
 * We strongly recommend to use presets instead of direct config loads. That
 * will give better compatibility with next versions.
 **/
MarkdownIt.prototype.configure = function (presets) {
  const self = this;

  if (isString$1(presets)) {
    const presetName = presets;
    presets = config[presetName];
    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name') }
  }

  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty') }

  if (presets.options) { self.set(presets.options); }

  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this
};

/** chainable
 * MarkdownIt.enable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to enable
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable list or rules. It will automatically find appropriate components,
 * containing rules with given names. If rule not found, and `ignoreInvalid`
 * not set - throws exception.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .enable(['sub', 'sup'])
 *             .disable('smartquotes');
 * ```
 **/
MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  let result = [];

  if (!Array.isArray(list)) { list = [list]; }

  ['core', 'block', 'inline'].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.enable(list, true));

  const missed = list.filter(function (name) { return result.indexOf(name) < 0 });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed)
  }

  return this
};

/** chainable
 * MarkdownIt.disable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * The same as [[MarkdownIt.enable]], but turn specified rules off.
 **/
MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  let result = [];

  if (!Array.isArray(list)) { list = [list]; }

  ['core', 'block', 'inline'].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.disable(list, true));

  const missed = list.filter(function (name) { return result.indexOf(name) < 0 });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed)
  }
  return this
};

/** chainable
 * MarkdownIt.use(plugin, params)
 *
 * Load specified plugin with given params into current parser instance.
 * It's just a sugar to call `plugin(md, params)` with curring.
 *
 * ##### Example
 *
 * ```javascript
 * var iterator = require('markdown-it-for-inline');
 * var md = require('markdown-it')()
 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
 *             });
 * ```
 **/
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  const args = [this].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this
};

/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and return list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for the renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/
MarkdownIt.prototype.parse = function (src, env) {
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String')
  }

  const state = new this.core.State(src, this, env);

  this.core.process(state);

  return state.tokens
};

/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env)
};

/** internal
 * MarkdownIt.parseInline(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
 * block tokens list with the single `inline` element, containing parsed inline
 * tokens in `children` property. Also updates `env` object.
 **/
MarkdownIt.prototype.parseInline = function (src, env) {
  const state = new this.core.State(src, this, env);

  state.inlineMode = true;
  this.core.process(state);

  return state.tokens
};

/**
 * MarkdownIt.renderInline(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
 * will NOT be wrapped into `<p>` tags.
 **/
MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parseInline(src, env), this.options, env)
};

const md = new MarkdownIt({
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
patchAttr(md, "table", "class", "table table-striped table-responsive");
patchImg(md, 100, 100);
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
    render() {
        const rendered = md.render(this.markdown);
        return x `<div>
            ${o$2(rendered)}
        </div>`;
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
            <div class="form-group row ${this.validationMap}"><markdown-it .markdown="${this.value ?? ''}"></markdown-it></div>
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
        return x `<div class="input-group ${this.validationMap}" >${this.value}</div>`;
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

class FZCollection extends FzField {
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
    //private content?: HTMLElement
    //private validator!: DataValidator
    get nomore() {
        return this.schema.maxItems && this.value && this.value.length >= this.schema.maxItems;
    }
    get noless() {
        return this.schema.minItems && this.value && this.value.length <= this.schema.minItems;
    }
    static get styles() {
        return [
            ...super.styles,
            i$5 `.panel {
                    padding:5px;
                    border: solid 1px lightgray;
                    border-radius:10px; 
                    user-select: none;
                }`
        ];
    }
    toField() {
        // all is done at rendering
    }
    toValue() {
        // items are updated but array reference doesn't change 
    }
    // override check() {
    //     this.content = this.shadowRoot?.getElementById('content') ?? undefined
    //     this.content?.classList.add(this.valid ? 'valid' : 'invalid')
    //     this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    // }
    connectedCallback() {
        super.connectedCallback();
        this.listen(this, 'toggle-item', evt => (this.close(), this.eventStop(evt)));
    }
    requestUpdate(name, oldvalue) {
        if (name !== undefined) {
            this.solveSchemas(true);
            super.requestUpdate(name, oldvalue);
        }
    }
    renderField() {
        this.solveSchemas();
        const lines = (!this.data || !this.value) ? [] : this.value.map((_i, i) => x `${(this.current === i) ? this.renderEditable(i) : this.renderStatic(i)}`);
        return x `
            <div @focusout="${this.focusout}">
                <div class="form-group row">
                ${this.schema.title === "" ? x `` : this.renderLabel}
                    <div class="col-sm">
                        <ul id="content" class="list-group">
                            ${lines}
                            ${this.readonly ? x `` : x `
                                <li class="list-group-item" @click="${this.close}">
                                    <button type="button" @click="${this.add}" ?disabled="${this.nomore}" class="btn btn-primary btn-sm "><b>+</b></button>
                                    ${this.schema.homogeneous ? null : x `
                                        <div class="btn-group" style="float:right" role="group">
                                            <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle btn-sm"
                                                @click="${this.toggleDropdown}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            ${this.currentSchema?.title || "Ajouter"}
                                            </button> 
                                            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                ${this.schema.items?.oneOf?.map((schema, i) => x `<a class="dropdown-item"
                                                    @click="${() => this.selectSchema(i)}" >${schema.title || "Type" + i}</a>`)}
                                            </div>
                                        </div>`}
                                </li>
                            `}
                        </ul>
                    </div>
                </div>
            </div>`;
    }
    renderStatic(index) {
        this.solveOrder();
        this.solveSchemas();
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
            ${this.abstract(index, this.schemas[index])}
            ${this.readonly ? x `` : x `<button ?hidden="${this.noless}" @click="${(evt) => this.del(index, evt)}" type="button" style="float:right" class="btn-close" aria-label="Close"></button>`}
        </li>`;
    }
    renderEditable(index) {
        const schema = this.schemas[index];
        return x `<li class="list-group-item"> ${this.renderItem(schema, index)} </li>`;
    }
    focusout() {
        this.change();
    }
    focus() {
        if (this.fields().length > 0) {
            const first = this.fields()[0];
            first.dofocus();
        }
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
        if (this.noless)
            return;
        this.remItem(index);
        this.eventStop(evt);
    }
    add(evt) {
        if (this.nomore || !this.currentSchema)
            return;
        this.addItem(this.currentSchema);
        this.eventStop(evt);
    }
    remItem(index) {
        this.value.splice(index, 1);
        this.schemas.splice(index, 1);
        this.current = null;
        this.change();
    }
    addItem(schema, edit = true) {
        if (this.value == null)
            this.value = [];
        const value = schema._default(this.data);
        this.value.push(value);
        this.schemas.push(schema);
        if (edit)
            this.open(this.value.length - 1);
        this.change();
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
    solveSchemas(force = false) {
        if (!isObject$1(this.schema.items))
            return;
        if (!force && this.currentSchema && this.schemas)
            return;
        if (!this.currentSchema)
            this.currentSchema = this.schema.homogeneous ? this.schema.items : (this.schema.items.oneOf?.[0] ?? EMPTY_SCHEMA);
        this.schemas = this.value == null ? [] : this.schema.homogeneous
            ? this.value.map(() => this.schema.items)
            : this.value.map((value) => getSchema(value) ?? this.schema.items?.oneOf?.find((schema) => isFunction$1(schema.case) && schema.case(EMPTY_SCHEMA, value, this.data, this.key, this.derefFunc, this.form.options.userdata)));
    }
    solveOrder() {
        if (this.value == null)
            return;
        const current = this.value;
        const orderedidx = current.map((_x, i) => i).sort((ia, ib) => {
            const va = this.evalExpr("orderBy", this.schemas[ia], current[ia], this.value, ia);
            const vb = this.evalExpr("orderBy", this.schemas[ib], current[ib], this.value, ib);
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
    #collapsed_accessor_storage = false;
    get collapsed() { return this.#collapsed_accessor_storage; }
    set collapsed(value) { this.#collapsed_accessor_storage = value; }
    #activegroup_accessor_storage = {};
    get activegroup() { return this.#activegroup_accessor_storage; }
    set activegroup(value) { this.#activegroup_accessor_storage = value; }
    seen;
    static get styles() {
        return [
            ...super.styles,
            i$5 `
                .panel {
                    padding:5px;
                    border: solid 1px lightgray;
                    border-radius:10px; 
                    user-select: none;
                }
                `
        ];
    }
    toField() {
        // all is done at rendering
    }
    toValue() {
        // properties are updated but object reference doesn't change 
    }
    // override check() {
    //     // this.content = this.shadowRoot?.getElementById('content') ?? undefined
    //     // this.content?.classList.add(this.valid ? 'valid' : 'invalid')
    //     // this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    // }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.setCollapsed();
    }
    setCollapsed() {
        // si root on collapse jamais
        this.collapsed = (this.schema.parent == null) ? false : this.evalExpr("collapsed");
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
    get deletable() {
        if (this.schema.parent == null || this.isEmpty)
            return false;
        if (this.schema.nullAllowed && this.nullable)
            return true;
        if (!this.schema.nullAllowed && !this.required)
            return true;
        return false;
    }
    async delete() {
        if (this.collapsed !== null)
            this.collapsed = true;
        this.value = this.empty;
    }
    renderField() {
        if (!this.schema.properties)
            return x ``;
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
        return x `${this.isItem
            ? x `<div>${this.renderLabel}</div>${itemTemplates}`
            : this.schema.title === "" ? x `<div ?hidden="${this.collapsed}" > ${itemTemplates} </div>`
                : x `<div class="panel" id="content" >
                <div class="panel-heading">
                    <div>
                        ${this.renderLabel}
                        ${this.collapsed ? x `${this.abstract()}` : x ``}
                        <button
                            ?hidden="${!this.deletable}"
                            @click="${() => this.delete()}" 
                            type="button" style="float:right" class="btn-close" aria-label="Close">
                        </button>
                    </div>
                </div>
                <hr ?hidden="${this.collapsed}" style="margin: 0 0" >
                <div ?hidden="${this.collapsed}" > ${itemTemplates} </div>
                </div>`}`;
    }
    isRequiredProperty(name) {
        return !!this.schema.required?.includes(name);
    }
    fields() {
        const fields = [];
        const tags = Object.values(this.schema.properties ?? {})
            .map((property) => property.field).join(', ');
        const list = this.shadowRoot?.querySelectorAll(tags);
        list?.forEach((elem) => fields.push(elem));
        return fields;
    }
    focus() {
        const fields = this.fields();
        const first = fields[0];
        first.dofocus();
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
    toggle(evt) {
        if (this.collapsed !== null)
            this.collapsed = !this.collapsed;
        this.eventStop(evt);
        this.requestUpdate();
    }
};
__decorate([
    n$2({ attribute: false })
], FzObject.prototype, "collapsed", null);
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
 */const {I:t}=Z$1,s=()=>document.createComment(""),r=(o,i,n)=>{const e=o._$AA.parentNode,l=void 0===i?o._$AB:i._$AA;if(void 0===n){const i=e.insertBefore(s(),l),c=e.insertBefore(s(),l);n=new t(i,c,o,o.options);}else {const t=n._$AB.nextSibling,i=n._$AM,c=i!==o;if(c){let t;n._$AQ?.(o),n._$AM=o,void 0!==n._$AP&&(t=o._$AU)!==i._$AU&&n._$AP(t);}if(t!==l||c){let o=n._$AA;for(;o!==t;){const t=o.nextSibling;e.insertBefore(o,l),o=t;}}}return n},v=(o,t,i=o)=>(o._$AI(t,i),o),u$1={},m=(o,t=u$1)=>o._$AH=t,p=o=>o._$AH,M=o=>{o._$AP?.(false,true);let t=o._$AA;const i=o._$AB.nextSibling;for(;t!==i;){const o=t.nextSibling;t.remove(),t=o;}};

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
    toField() {
        // all is done at rendering
    }
    toValue() {
        // items are updated but array reference doesn't change 
    }
    renderField() {
        return x `
            <div class="form-group row">
                ${this.renderLabel}
                <div class="col-sm">
                    <ul id="content" class="list-group"   style="max-height: 300px; overflow-y: scroll">
                            ${c(this.getItems(), (item) => item, (item) => x `
                                    <li class="list-group-item">
                                        <div>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                ?disabled="${this.readonly ? true : false}"
                                                ?checked="${this.value?.includes(item.value)}"
                                                @click="${() => this.toggle(item.value)}"
                                                autocomplete=off  spellcheck="false"/>
                                            <label class="form-check-label">${item.label}</label>
                                        </div>
                                    </li>
                                `)}
                    </ul>
                </div>
            </div>`;
    }
    //override check() {
    //     if (!this.validator) return
    //     this.valid = true
    //     this.message = ''
    //     switch (true) {
    //         case (this.required && this.value == undefined):
    //             this.valid = false
    //             this.message = formatMsg('valueMissing')
    //             break
    //         case !this.required && this.value == undefined:
    //             break
    //         default:
    //             this.valid = this.validator.validate(this.value)
    //             const errors = this.validator.errors.filter(e => e.instancePath.match(/\//g)?.length === 1)
    //             if (this.valid == false && errors && errors.length > 0) this.message = this.validator.text
    //     }
    //     this.content = this.shadowRoot?.getElementById('content') ?? undefined
    //     this.content?.classList.add(this.valid ? 'valid' : 'invalid')
    //     this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    //}
    connectedCallback() {
        super.connectedCallback();
    }
    toggle(value) {
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

var $schema$1 = "http://json-schema.org/draft-07/schema#";
var $id$2 = "http://json-schema.org/draft-07/schema-3s#";
var title$1 = "Core schema meta-schema";
var definitions$1 = {
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
var type$2 = [
	"object",
	"boolean"
];
var properties$3 = {
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
	$schema: $schema$1,
	$id: $id$2,
	title: title$1,
	definitions: definitions$1,
	type: type$2,
	properties: properties$3,
	"default": true
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var ajv$1 = {exports: {}};

var core$1 = {};

var validate = {};

var boolSchema = {};

var errors = {};

var codegen = {};

var code$1 = {};

var hasRequiredCode$1;

function requireCode$1 () {
	if (hasRequiredCode$1) return code$1;
	hasRequiredCode$1 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
		// eslint-disable-next-line @typescript-eslint/no-extraneous-class
		class _CodeOrName {
		}
		exports._CodeOrName = _CodeOrName;
		exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
		class Name extends _CodeOrName {
		    constructor(s) {
		        super();
		        if (!exports.IDENTIFIER.test(s))
		            throw new Error("CodeGen: name must be a valid identifier");
		        this.str = s;
		    }
		    toString() {
		        return this.str;
		    }
		    emptyStr() {
		        return false;
		    }
		    get names() {
		        return { [this.str]: 1 };
		    }
		}
		exports.Name = Name;
		class _Code extends _CodeOrName {
		    constructor(code) {
		        super();
		        this._items = typeof code === "string" ? [code] : code;
		    }
		    toString() {
		        return this.str;
		    }
		    emptyStr() {
		        if (this._items.length > 1)
		            return false;
		        const item = this._items[0];
		        return item === "" || item === '""';
		    }
		    get str() {
		        var _a;
		        return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
		    }
		    get names() {
		        var _a;
		        return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
		            if (c instanceof Name)
		                names[c.str] = (names[c.str] || 0) + 1;
		            return names;
		        }, {})));
		    }
		}
		exports._Code = _Code;
		exports.nil = new _Code("");
		function _(strs, ...args) {
		    const code = [strs[0]];
		    let i = 0;
		    while (i < args.length) {
		        addCodeArg(code, args[i]);
		        code.push(strs[++i]);
		    }
		    return new _Code(code);
		}
		exports._ = _;
		const plus = new _Code("+");
		function str(strs, ...args) {
		    const expr = [safeStringify(strs[0])];
		    let i = 0;
		    while (i < args.length) {
		        expr.push(plus);
		        addCodeArg(expr, args[i]);
		        expr.push(plus, safeStringify(strs[++i]));
		    }
		    optimize(expr);
		    return new _Code(expr);
		}
		exports.str = str;
		function addCodeArg(code, arg) {
		    if (arg instanceof _Code)
		        code.push(...arg._items);
		    else if (arg instanceof Name)
		        code.push(arg);
		    else
		        code.push(interpolate(arg));
		}
		exports.addCodeArg = addCodeArg;
		function optimize(expr) {
		    let i = 1;
		    while (i < expr.length - 1) {
		        if (expr[i] === plus) {
		            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
		            if (res !== undefined) {
		                expr.splice(i - 1, 3, res);
		                continue;
		            }
		            expr[i++] = "+";
		        }
		        i++;
		    }
		}
		function mergeExprItems(a, b) {
		    if (b === '""')
		        return a;
		    if (a === '""')
		        return b;
		    if (typeof a == "string") {
		        if (b instanceof Name || a[a.length - 1] !== '"')
		            return;
		        if (typeof b != "string")
		            return `${a.slice(0, -1)}${b}"`;
		        if (b[0] === '"')
		            return a.slice(0, -1) + b.slice(1);
		        return;
		    }
		    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
		        return `"${a}${b.slice(1)}`;
		    return;
		}
		function strConcat(c1, c2) {
		    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
		}
		exports.strConcat = strConcat;
		// TODO do not allow arrays here
		function interpolate(x) {
		    return typeof x == "number" || typeof x == "boolean" || x === null
		        ? x
		        : safeStringify(Array.isArray(x) ? x.join(",") : x);
		}
		function stringify(x) {
		    return new _Code(safeStringify(x));
		}
		exports.stringify = stringify;
		function safeStringify(x) {
		    return JSON.stringify(x)
		        .replace(/\u2028/g, "\\u2028")
		        .replace(/\u2029/g, "\\u2029");
		}
		exports.safeStringify = safeStringify;
		function getProperty(key) {
		    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
		}
		exports.getProperty = getProperty;
		//Does best effort to format the name properly
		function getEsmExportName(key) {
		    if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
		        return new _Code(`${key}`);
		    }
		    throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
		}
		exports.getEsmExportName = getEsmExportName;
		function regexpCode(rx) {
		    return new _Code(rx.toString());
		}
		exports.regexpCode = regexpCode;
		
	} (code$1));
	return code$1;
}

var scope = {};

var hasRequiredScope;

function requireScope () {
	if (hasRequiredScope) return scope;
	hasRequiredScope = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
		const code_1 = requireCode$1();
		class ValueError extends Error {
		    constructor(name) {
		        super(`CodeGen: "code" for ${name} not defined`);
		        this.value = name.value;
		    }
		}
		var UsedValueState;
		(function (UsedValueState) {
		    UsedValueState[UsedValueState["Started"] = 0] = "Started";
		    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
		})(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
		exports.varKinds = {
		    const: new code_1.Name("const"),
		    let: new code_1.Name("let"),
		    var: new code_1.Name("var"),
		};
		class Scope {
		    constructor({ prefixes, parent } = {}) {
		        this._names = {};
		        this._prefixes = prefixes;
		        this._parent = parent;
		    }
		    toName(nameOrPrefix) {
		        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
		    }
		    name(prefix) {
		        return new code_1.Name(this._newName(prefix));
		    }
		    _newName(prefix) {
		        const ng = this._names[prefix] || this._nameGroup(prefix);
		        return `${prefix}${ng.index++}`;
		    }
		    _nameGroup(prefix) {
		        var _a, _b;
		        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
		            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
		        }
		        return (this._names[prefix] = { prefix, index: 0 });
		    }
		}
		exports.Scope = Scope;
		class ValueScopeName extends code_1.Name {
		    constructor(prefix, nameStr) {
		        super(nameStr);
		        this.prefix = prefix;
		    }
		    setValue(value, { property, itemIndex }) {
		        this.value = value;
		        this.scopePath = (0, code_1._) `.${new code_1.Name(property)}[${itemIndex}]`;
		    }
		}
		exports.ValueScopeName = ValueScopeName;
		const line = (0, code_1._) `\n`;
		class ValueScope extends Scope {
		    constructor(opts) {
		        super(opts);
		        this._values = {};
		        this._scope = opts.scope;
		        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
		    }
		    get() {
		        return this._scope;
		    }
		    name(prefix) {
		        return new ValueScopeName(prefix, this._newName(prefix));
		    }
		    value(nameOrPrefix, value) {
		        var _a;
		        if (value.ref === undefined)
		            throw new Error("CodeGen: ref must be passed in value");
		        const name = this.toName(nameOrPrefix);
		        const { prefix } = name;
		        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
		        let vs = this._values[prefix];
		        if (vs) {
		            const _name = vs.get(valueKey);
		            if (_name)
		                return _name;
		        }
		        else {
		            vs = this._values[prefix] = new Map();
		        }
		        vs.set(valueKey, name);
		        const s = this._scope[prefix] || (this._scope[prefix] = []);
		        const itemIndex = s.length;
		        s[itemIndex] = value.ref;
		        name.setValue(value, { property: prefix, itemIndex });
		        return name;
		    }
		    getValue(prefix, keyOrRef) {
		        const vs = this._values[prefix];
		        if (!vs)
		            return;
		        return vs.get(keyOrRef);
		    }
		    scopeRefs(scopeName, values = this._values) {
		        return this._reduceValues(values, (name) => {
		            if (name.scopePath === undefined)
		                throw new Error(`CodeGen: name "${name}" has no value`);
		            return (0, code_1._) `${scopeName}${name.scopePath}`;
		        });
		    }
		    scopeCode(values = this._values, usedValues, getCode) {
		        return this._reduceValues(values, (name) => {
		            if (name.value === undefined)
		                throw new Error(`CodeGen: name "${name}" has no value`);
		            return name.value.code;
		        }, usedValues, getCode);
		    }
		    _reduceValues(values, valueCode, usedValues = {}, getCode) {
		        let code = code_1.nil;
		        for (const prefix in values) {
		            const vs = values[prefix];
		            if (!vs)
		                continue;
		            const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
		            vs.forEach((name) => {
		                if (nameSet.has(name))
		                    return;
		                nameSet.set(name, UsedValueState.Started);
		                let c = valueCode(name);
		                if (c) {
		                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
		                    code = (0, code_1._) `${code}${def} ${name} = ${c};${this.opts._n}`;
		                }
		                else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
		                    code = (0, code_1._) `${code}${c}${this.opts._n}`;
		                }
		                else {
		                    throw new ValueError(name);
		                }
		                nameSet.set(name, UsedValueState.Completed);
		            });
		        }
		        return code;
		    }
		}
		exports.ValueScope = ValueScope;
		
	} (scope));
	return scope;
}

var hasRequiredCodegen;

function requireCodegen () {
	if (hasRequiredCodegen) return codegen;
	hasRequiredCodegen = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
		const code_1 = requireCode$1();
		const scope_1 = requireScope();
		var code_2 = requireCode$1();
		Object.defineProperty(exports, "_", { enumerable: true, get: function () { return code_2._; } });
		Object.defineProperty(exports, "str", { enumerable: true, get: function () { return code_2.str; } });
		Object.defineProperty(exports, "strConcat", { enumerable: true, get: function () { return code_2.strConcat; } });
		Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return code_2.nil; } });
		Object.defineProperty(exports, "getProperty", { enumerable: true, get: function () { return code_2.getProperty; } });
		Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return code_2.stringify; } });
		Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function () { return code_2.regexpCode; } });
		Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return code_2.Name; } });
		var scope_2 = requireScope();
		Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return scope_2.Scope; } });
		Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function () { return scope_2.ValueScope; } });
		Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function () { return scope_2.ValueScopeName; } });
		Object.defineProperty(exports, "varKinds", { enumerable: true, get: function () { return scope_2.varKinds; } });
		exports.operators = {
		    GT: new code_1._Code(">"),
		    GTE: new code_1._Code(">="),
		    LT: new code_1._Code("<"),
		    LTE: new code_1._Code("<="),
		    EQ: new code_1._Code("==="),
		    NEQ: new code_1._Code("!=="),
		    NOT: new code_1._Code("!"),
		    OR: new code_1._Code("||"),
		    AND: new code_1._Code("&&"),
		    ADD: new code_1._Code("+"),
		};
		class Node {
		    optimizeNodes() {
		        return this;
		    }
		    optimizeNames(_names, _constants) {
		        return this;
		    }
		}
		class Def extends Node {
		    constructor(varKind, name, rhs) {
		        super();
		        this.varKind = varKind;
		        this.name = name;
		        this.rhs = rhs;
		    }
		    render({ es5, _n }) {
		        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
		        const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
		        return `${varKind} ${this.name}${rhs};` + _n;
		    }
		    optimizeNames(names, constants) {
		        if (!names[this.name.str])
		            return;
		        if (this.rhs)
		            this.rhs = optimizeExpr(this.rhs, names, constants);
		        return this;
		    }
		    get names() {
		        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
		    }
		}
		class Assign extends Node {
		    constructor(lhs, rhs, sideEffects) {
		        super();
		        this.lhs = lhs;
		        this.rhs = rhs;
		        this.sideEffects = sideEffects;
		    }
		    render({ _n }) {
		        return `${this.lhs} = ${this.rhs};` + _n;
		    }
		    optimizeNames(names, constants) {
		        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
		            return;
		        this.rhs = optimizeExpr(this.rhs, names, constants);
		        return this;
		    }
		    get names() {
		        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
		        return addExprNames(names, this.rhs);
		    }
		}
		class AssignOp extends Assign {
		    constructor(lhs, op, rhs, sideEffects) {
		        super(lhs, rhs, sideEffects);
		        this.op = op;
		    }
		    render({ _n }) {
		        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
		    }
		}
		class Label extends Node {
		    constructor(label) {
		        super();
		        this.label = label;
		        this.names = {};
		    }
		    render({ _n }) {
		        return `${this.label}:` + _n;
		    }
		}
		class Break extends Node {
		    constructor(label) {
		        super();
		        this.label = label;
		        this.names = {};
		    }
		    render({ _n }) {
		        const label = this.label ? ` ${this.label}` : "";
		        return `break${label};` + _n;
		    }
		}
		class Throw extends Node {
		    constructor(error) {
		        super();
		        this.error = error;
		    }
		    render({ _n }) {
		        return `throw ${this.error};` + _n;
		    }
		    get names() {
		        return this.error.names;
		    }
		}
		class AnyCode extends Node {
		    constructor(code) {
		        super();
		        this.code = code;
		    }
		    render({ _n }) {
		        return `${this.code};` + _n;
		    }
		    optimizeNodes() {
		        return `${this.code}` ? this : undefined;
		    }
		    optimizeNames(names, constants) {
		        this.code = optimizeExpr(this.code, names, constants);
		        return this;
		    }
		    get names() {
		        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
		    }
		}
		class ParentNode extends Node {
		    constructor(nodes = []) {
		        super();
		        this.nodes = nodes;
		    }
		    render(opts) {
		        return this.nodes.reduce((code, n) => code + n.render(opts), "");
		    }
		    optimizeNodes() {
		        const { nodes } = this;
		        let i = nodes.length;
		        while (i--) {
		            const n = nodes[i].optimizeNodes();
		            if (Array.isArray(n))
		                nodes.splice(i, 1, ...n);
		            else if (n)
		                nodes[i] = n;
		            else
		                nodes.splice(i, 1);
		        }
		        return nodes.length > 0 ? this : undefined;
		    }
		    optimizeNames(names, constants) {
		        const { nodes } = this;
		        let i = nodes.length;
		        while (i--) {
		            // iterating backwards improves 1-pass optimization
		            const n = nodes[i];
		            if (n.optimizeNames(names, constants))
		                continue;
		            subtractNames(names, n.names);
		            nodes.splice(i, 1);
		        }
		        return nodes.length > 0 ? this : undefined;
		    }
		    get names() {
		        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
		    }
		}
		class BlockNode extends ParentNode {
		    render(opts) {
		        return "{" + opts._n + super.render(opts) + "}" + opts._n;
		    }
		}
		class Root extends ParentNode {
		}
		class Else extends BlockNode {
		}
		Else.kind = "else";
		class If extends BlockNode {
		    constructor(condition, nodes) {
		        super(nodes);
		        this.condition = condition;
		    }
		    render(opts) {
		        let code = `if(${this.condition})` + super.render(opts);
		        if (this.else)
		            code += "else " + this.else.render(opts);
		        return code;
		    }
		    optimizeNodes() {
		        super.optimizeNodes();
		        const cond = this.condition;
		        if (cond === true)
		            return this.nodes; // else is ignored here
		        let e = this.else;
		        if (e) {
		            const ns = e.optimizeNodes();
		            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
		        }
		        if (e) {
		            if (cond === false)
		                return e instanceof If ? e : e.nodes;
		            if (this.nodes.length)
		                return this;
		            return new If(not(cond), e instanceof If ? [e] : e.nodes);
		        }
		        if (cond === false || !this.nodes.length)
		            return undefined;
		        return this;
		    }
		    optimizeNames(names, constants) {
		        var _a;
		        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
		        if (!(super.optimizeNames(names, constants) || this.else))
		            return;
		        this.condition = optimizeExpr(this.condition, names, constants);
		        return this;
		    }
		    get names() {
		        const names = super.names;
		        addExprNames(names, this.condition);
		        if (this.else)
		            addNames(names, this.else.names);
		        return names;
		    }
		}
		If.kind = "if";
		class For extends BlockNode {
		}
		For.kind = "for";
		class ForLoop extends For {
		    constructor(iteration) {
		        super();
		        this.iteration = iteration;
		    }
		    render(opts) {
		        return `for(${this.iteration})` + super.render(opts);
		    }
		    optimizeNames(names, constants) {
		        if (!super.optimizeNames(names, constants))
		            return;
		        this.iteration = optimizeExpr(this.iteration, names, constants);
		        return this;
		    }
		    get names() {
		        return addNames(super.names, this.iteration.names);
		    }
		}
		class ForRange extends For {
		    constructor(varKind, name, from, to) {
		        super();
		        this.varKind = varKind;
		        this.name = name;
		        this.from = from;
		        this.to = to;
		    }
		    render(opts) {
		        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
		        const { name, from, to } = this;
		        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
		    }
		    get names() {
		        const names = addExprNames(super.names, this.from);
		        return addExprNames(names, this.to);
		    }
		}
		class ForIter extends For {
		    constructor(loop, varKind, name, iterable) {
		        super();
		        this.loop = loop;
		        this.varKind = varKind;
		        this.name = name;
		        this.iterable = iterable;
		    }
		    render(opts) {
		        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
		    }
		    optimizeNames(names, constants) {
		        if (!super.optimizeNames(names, constants))
		            return;
		        this.iterable = optimizeExpr(this.iterable, names, constants);
		        return this;
		    }
		    get names() {
		        return addNames(super.names, this.iterable.names);
		    }
		}
		class Func extends BlockNode {
		    constructor(name, args, async) {
		        super();
		        this.name = name;
		        this.args = args;
		        this.async = async;
		    }
		    render(opts) {
		        const _async = this.async ? "async " : "";
		        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
		    }
		}
		Func.kind = "func";
		class Return extends ParentNode {
		    render(opts) {
		        return "return " + super.render(opts);
		    }
		}
		Return.kind = "return";
		class Try extends BlockNode {
		    render(opts) {
		        let code = "try" + super.render(opts);
		        if (this.catch)
		            code += this.catch.render(opts);
		        if (this.finally)
		            code += this.finally.render(opts);
		        return code;
		    }
		    optimizeNodes() {
		        var _a, _b;
		        super.optimizeNodes();
		        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
		        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
		        return this;
		    }
		    optimizeNames(names, constants) {
		        var _a, _b;
		        super.optimizeNames(names, constants);
		        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
		        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
		        return this;
		    }
		    get names() {
		        const names = super.names;
		        if (this.catch)
		            addNames(names, this.catch.names);
		        if (this.finally)
		            addNames(names, this.finally.names);
		        return names;
		    }
		}
		class Catch extends BlockNode {
		    constructor(error) {
		        super();
		        this.error = error;
		    }
		    render(opts) {
		        return `catch(${this.error})` + super.render(opts);
		    }
		}
		Catch.kind = "catch";
		class Finally extends BlockNode {
		    render(opts) {
		        return "finally" + super.render(opts);
		    }
		}
		Finally.kind = "finally";
		class CodeGen {
		    constructor(extScope, opts = {}) {
		        this._values = {};
		        this._blockStarts = [];
		        this._constants = {};
		        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
		        this._extScope = extScope;
		        this._scope = new scope_1.Scope({ parent: extScope });
		        this._nodes = [new Root()];
		    }
		    toString() {
		        return this._root.render(this.opts);
		    }
		    // returns unique name in the internal scope
		    name(prefix) {
		        return this._scope.name(prefix);
		    }
		    // reserves unique name in the external scope
		    scopeName(prefix) {
		        return this._extScope.name(prefix);
		    }
		    // reserves unique name in the external scope and assigns value to it
		    scopeValue(prefixOrName, value) {
		        const name = this._extScope.value(prefixOrName, value);
		        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
		        vs.add(name);
		        return name;
		    }
		    getScopeValue(prefix, keyOrRef) {
		        return this._extScope.getValue(prefix, keyOrRef);
		    }
		    // return code that assigns values in the external scope to the names that are used internally
		    // (same names that were returned by gen.scopeName or gen.scopeValue)
		    scopeRefs(scopeName) {
		        return this._extScope.scopeRefs(scopeName, this._values);
		    }
		    scopeCode() {
		        return this._extScope.scopeCode(this._values);
		    }
		    _def(varKind, nameOrPrefix, rhs, constant) {
		        const name = this._scope.toName(nameOrPrefix);
		        if (rhs !== undefined && constant)
		            this._constants[name.str] = rhs;
		        this._leafNode(new Def(varKind, name, rhs));
		        return name;
		    }
		    // `const` declaration (`var` in es5 mode)
		    const(nameOrPrefix, rhs, _constant) {
		        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
		    }
		    // `let` declaration with optional assignment (`var` in es5 mode)
		    let(nameOrPrefix, rhs, _constant) {
		        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
		    }
		    // `var` declaration with optional assignment
		    var(nameOrPrefix, rhs, _constant) {
		        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
		    }
		    // assignment code
		    assign(lhs, rhs, sideEffects) {
		        return this._leafNode(new Assign(lhs, rhs, sideEffects));
		    }
		    // `+=` code
		    add(lhs, rhs) {
		        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
		    }
		    // appends passed SafeExpr to code or executes Block
		    code(c) {
		        if (typeof c == "function")
		            c();
		        else if (c !== code_1.nil)
		            this._leafNode(new AnyCode(c));
		        return this;
		    }
		    // returns code for object literal for the passed argument list of key-value pairs
		    object(...keyValues) {
		        const code = ["{"];
		        for (const [key, value] of keyValues) {
		            if (code.length > 1)
		                code.push(",");
		            code.push(key);
		            if (key !== value || this.opts.es5) {
		                code.push(":");
		                (0, code_1.addCodeArg)(code, value);
		            }
		        }
		        code.push("}");
		        return new code_1._Code(code);
		    }
		    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
		    if(condition, thenBody, elseBody) {
		        this._blockNode(new If(condition));
		        if (thenBody && elseBody) {
		            this.code(thenBody).else().code(elseBody).endIf();
		        }
		        else if (thenBody) {
		            this.code(thenBody).endIf();
		        }
		        else if (elseBody) {
		            throw new Error('CodeGen: "else" body without "then" body');
		        }
		        return this;
		    }
		    // `else if` clause - invalid without `if` or after `else` clauses
		    elseIf(condition) {
		        return this._elseNode(new If(condition));
		    }
		    // `else` clause - only valid after `if` or `else if` clauses
		    else() {
		        return this._elseNode(new Else());
		    }
		    // end `if` statement (needed if gen.if was used only with condition)
		    endIf() {
		        return this._endBlockNode(If, Else);
		    }
		    _for(node, forBody) {
		        this._blockNode(node);
		        if (forBody)
		            this.code(forBody).endFor();
		        return this;
		    }
		    // a generic `for` clause (or statement if `forBody` is passed)
		    for(iteration, forBody) {
		        return this._for(new ForLoop(iteration), forBody);
		    }
		    // `for` statement for a range of values
		    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
		        const name = this._scope.toName(nameOrPrefix);
		        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
		    }
		    // `for-of` statement (in es5 mode replace with a normal for loop)
		    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
		        const name = this._scope.toName(nameOrPrefix);
		        if (this.opts.es5) {
		            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
		            return this.forRange("_i", 0, (0, code_1._) `${arr}.length`, (i) => {
		                this.var(name, (0, code_1._) `${arr}[${i}]`);
		                forBody(name);
		            });
		        }
		        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
		    }
		    // `for-in` statement.
		    // With option `ownProperties` replaced with a `for-of` loop for object keys
		    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
		        if (this.opts.ownProperties) {
		            return this.forOf(nameOrPrefix, (0, code_1._) `Object.keys(${obj})`, forBody);
		        }
		        const name = this._scope.toName(nameOrPrefix);
		        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
		    }
		    // end `for` loop
		    endFor() {
		        return this._endBlockNode(For);
		    }
		    // `label` statement
		    label(label) {
		        return this._leafNode(new Label(label));
		    }
		    // `break` statement
		    break(label) {
		        return this._leafNode(new Break(label));
		    }
		    // `return` statement
		    return(value) {
		        const node = new Return();
		        this._blockNode(node);
		        this.code(value);
		        if (node.nodes.length !== 1)
		            throw new Error('CodeGen: "return" should have one node');
		        return this._endBlockNode(Return);
		    }
		    // `try` statement
		    try(tryBody, catchCode, finallyCode) {
		        if (!catchCode && !finallyCode)
		            throw new Error('CodeGen: "try" without "catch" and "finally"');
		        const node = new Try();
		        this._blockNode(node);
		        this.code(tryBody);
		        if (catchCode) {
		            const error = this.name("e");
		            this._currNode = node.catch = new Catch(error);
		            catchCode(error);
		        }
		        if (finallyCode) {
		            this._currNode = node.finally = new Finally();
		            this.code(finallyCode);
		        }
		        return this._endBlockNode(Catch, Finally);
		    }
		    // `throw` statement
		    throw(error) {
		        return this._leafNode(new Throw(error));
		    }
		    // start self-balancing block
		    block(body, nodeCount) {
		        this._blockStarts.push(this._nodes.length);
		        if (body)
		            this.code(body).endBlock(nodeCount);
		        return this;
		    }
		    // end the current self-balancing block
		    endBlock(nodeCount) {
		        const len = this._blockStarts.pop();
		        if (len === undefined)
		            throw new Error("CodeGen: not in self-balancing block");
		        const toClose = this._nodes.length - len;
		        if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
		            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
		        }
		        this._nodes.length = len;
		        return this;
		    }
		    // `function` heading (or definition if funcBody is passed)
		    func(name, args = code_1.nil, async, funcBody) {
		        this._blockNode(new Func(name, args, async));
		        if (funcBody)
		            this.code(funcBody).endFunc();
		        return this;
		    }
		    // end function definition
		    endFunc() {
		        return this._endBlockNode(Func);
		    }
		    optimize(n = 1) {
		        while (n-- > 0) {
		            this._root.optimizeNodes();
		            this._root.optimizeNames(this._root.names, this._constants);
		        }
		    }
		    _leafNode(node) {
		        this._currNode.nodes.push(node);
		        return this;
		    }
		    _blockNode(node) {
		        this._currNode.nodes.push(node);
		        this._nodes.push(node);
		    }
		    _endBlockNode(N1, N2) {
		        const n = this._currNode;
		        if (n instanceof N1 || (N2 && n instanceof N2)) {
		            this._nodes.pop();
		            return this;
		        }
		        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
		    }
		    _elseNode(node) {
		        const n = this._currNode;
		        if (!(n instanceof If)) {
		            throw new Error('CodeGen: "else" without "if"');
		        }
		        this._currNode = n.else = node;
		        return this;
		    }
		    get _root() {
		        return this._nodes[0];
		    }
		    get _currNode() {
		        const ns = this._nodes;
		        return ns[ns.length - 1];
		    }
		    set _currNode(node) {
		        const ns = this._nodes;
		        ns[ns.length - 1] = node;
		    }
		}
		exports.CodeGen = CodeGen;
		function addNames(names, from) {
		    for (const n in from)
		        names[n] = (names[n] || 0) + (from[n] || 0);
		    return names;
		}
		function addExprNames(names, from) {
		    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
		}
		function optimizeExpr(expr, names, constants) {
		    if (expr instanceof code_1.Name)
		        return replaceName(expr);
		    if (!canOptimize(expr))
		        return expr;
		    return new code_1._Code(expr._items.reduce((items, c) => {
		        if (c instanceof code_1.Name)
		            c = replaceName(c);
		        if (c instanceof code_1._Code)
		            items.push(...c._items);
		        else
		            items.push(c);
		        return items;
		    }, []));
		    function replaceName(n) {
		        const c = constants[n.str];
		        if (c === undefined || names[n.str] !== 1)
		            return n;
		        delete names[n.str];
		        return c;
		    }
		    function canOptimize(e) {
		        return (e instanceof code_1._Code &&
		            e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
		    }
		}
		function subtractNames(names, from) {
		    for (const n in from)
		        names[n] = (names[n] || 0) - (from[n] || 0);
		}
		function not(x) {
		    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._) `!${par(x)}`;
		}
		exports.not = not;
		const andCode = mappend(exports.operators.AND);
		// boolean AND (&&) expression with the passed arguments
		function and(...args) {
		    return args.reduce(andCode);
		}
		exports.and = and;
		const orCode = mappend(exports.operators.OR);
		// boolean OR (||) expression with the passed arguments
		function or(...args) {
		    return args.reduce(orCode);
		}
		exports.or = or;
		function mappend(op) {
		    return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._) `${par(x)} ${op} ${par(y)}`);
		}
		function par(x) {
		    return x instanceof code_1.Name ? x : (0, code_1._) `(${x})`;
		}
		
	} (codegen));
	return codegen;
}

var util = {};

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	Object.defineProperty(util, "__esModule", { value: true });
	util.checkStrictMode = util.getErrorPath = util.Type = util.useFunc = util.setEvaluated = util.evaluatedPropsToName = util.mergeEvaluated = util.eachItem = util.unescapeJsonPointer = util.escapeJsonPointer = util.escapeFragment = util.unescapeFragment = util.schemaRefOrVal = util.schemaHasRulesButRef = util.schemaHasRules = util.checkUnknownRules = util.alwaysValidSchema = util.toHash = void 0;
	const codegen_1 = requireCodegen();
	const code_1 = requireCode$1();
	// TODO refactor to use Set
	function toHash(arr) {
	    const hash = {};
	    for (const item of arr)
	        hash[item] = true;
	    return hash;
	}
	util.toHash = toHash;
	function alwaysValidSchema(it, schema) {
	    if (typeof schema == "boolean")
	        return schema;
	    if (Object.keys(schema).length === 0)
	        return true;
	    checkUnknownRules(it, schema);
	    return !schemaHasRules(schema, it.self.RULES.all);
	}
	util.alwaysValidSchema = alwaysValidSchema;
	function checkUnknownRules(it, schema = it.schema) {
	    const { opts, self } = it;
	    if (!opts.strictSchema)
	        return;
	    if (typeof schema === "boolean")
	        return;
	    const rules = self.RULES.keywords;
	    for (const key in schema) {
	        if (!rules[key])
	            checkStrictMode(it, `unknown keyword: "${key}"`);
	    }
	}
	util.checkUnknownRules = checkUnknownRules;
	function schemaHasRules(schema, rules) {
	    if (typeof schema == "boolean")
	        return !schema;
	    for (const key in schema)
	        if (rules[key])
	            return true;
	    return false;
	}
	util.schemaHasRules = schemaHasRules;
	function schemaHasRulesButRef(schema, RULES) {
	    if (typeof schema == "boolean")
	        return !schema;
	    for (const key in schema)
	        if (key !== "$ref" && RULES.all[key])
	            return true;
	    return false;
	}
	util.schemaHasRulesButRef = schemaHasRulesButRef;
	function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
	    if (!$data) {
	        if (typeof schema == "number" || typeof schema == "boolean")
	            return schema;
	        if (typeof schema == "string")
	            return (0, codegen_1._) `${schema}`;
	    }
	    return (0, codegen_1._) `${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
	}
	util.schemaRefOrVal = schemaRefOrVal;
	function unescapeFragment(str) {
	    return unescapeJsonPointer(decodeURIComponent(str));
	}
	util.unescapeFragment = unescapeFragment;
	function escapeFragment(str) {
	    return encodeURIComponent(escapeJsonPointer(str));
	}
	util.escapeFragment = escapeFragment;
	function escapeJsonPointer(str) {
	    if (typeof str == "number")
	        return `${str}`;
	    return str.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	util.escapeJsonPointer = escapeJsonPointer;
	function unescapeJsonPointer(str) {
	    return str.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	util.unescapeJsonPointer = unescapeJsonPointer;
	function eachItem(xs, f) {
	    if (Array.isArray(xs)) {
	        for (const x of xs)
	            f(x);
	    }
	    else {
	        f(xs);
	    }
	}
	util.eachItem = eachItem;
	function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
	    return (gen, from, to, toName) => {
	        const res = to === undefined
	            ? from
	            : to instanceof codegen_1.Name
	                ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
	                : from instanceof codegen_1.Name
	                    ? (mergeToName(gen, to, from), from)
	                    : mergeValues(from, to);
	        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
	    };
	}
	util.mergeEvaluated = {
	    props: makeMergeEvaluated({
	        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => {
	            gen.if((0, codegen_1._) `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._) `${to} || {}`).code((0, codegen_1._) `Object.assign(${to}, ${from})`));
	        }),
	        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => {
	            if (from === true) {
	                gen.assign(to, true);
	            }
	            else {
	                gen.assign(to, (0, codegen_1._) `${to} || {}`);
	                setEvaluated(gen, to, from);
	            }
	        }),
	        mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
	        resultToName: evaluatedPropsToName,
	    }),
	    items: makeMergeEvaluated({
	        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._) `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
	        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._) `${to} > ${from} ? ${to} : ${from}`)),
	        mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
	        resultToName: (gen, items) => gen.var("items", items),
	    }),
	};
	function evaluatedPropsToName(gen, ps) {
	    if (ps === true)
	        return gen.var("props", true);
	    const props = gen.var("props", (0, codegen_1._) `{}`);
	    if (ps !== undefined)
	        setEvaluated(gen, props, ps);
	    return props;
	}
	util.evaluatedPropsToName = evaluatedPropsToName;
	function setEvaluated(gen, props, ps) {
	    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._) `${props}${(0, codegen_1.getProperty)(p)}`, true));
	}
	util.setEvaluated = setEvaluated;
	const snippets = {};
	function useFunc(gen, f) {
	    return gen.scopeValue("func", {
	        ref: f,
	        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
	    });
	}
	util.useFunc = useFunc;
	var Type;
	(function (Type) {
	    Type[Type["Num"] = 0] = "Num";
	    Type[Type["Str"] = 1] = "Str";
	})(Type || (util.Type = Type = {}));
	function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
	    // let path
	    if (dataProp instanceof codegen_1.Name) {
	        const isNumber = dataPropType === Type.Num;
	        return jsPropertySyntax
	            ? isNumber
	                ? (0, codegen_1._) `"[" + ${dataProp} + "]"`
	                : (0, codegen_1._) `"['" + ${dataProp} + "']"`
	            : isNumber
	                ? (0, codegen_1._) `"/" + ${dataProp}`
	                : (0, codegen_1._) `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
	    }
	    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
	}
	util.getErrorPath = getErrorPath;
	function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
	    if (!mode)
	        return;
	    msg = `strict mode: ${msg}`;
	    if (mode === true)
	        throw new Error(msg);
	    it.self.logger.warn(msg);
	}
	util.checkStrictMode = checkStrictMode;
	
	return util;
}

var names = {};

var hasRequiredNames;

function requireNames () {
	if (hasRequiredNames) return names;
	hasRequiredNames = 1;
	Object.defineProperty(names, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const names$1 = {
	    // validation function arguments
	    data: new codegen_1.Name("data"), // data passed to validation function
	    // args passed from referencing schema
	    valCxt: new codegen_1.Name("valCxt"), // validation/data context - should not be used directly, it is destructured to the names below
	    instancePath: new codegen_1.Name("instancePath"),
	    parentData: new codegen_1.Name("parentData"),
	    parentDataProperty: new codegen_1.Name("parentDataProperty"),
	    rootData: new codegen_1.Name("rootData"), // root data - same as the data passed to the first/top validation function
	    dynamicAnchors: new codegen_1.Name("dynamicAnchors"), // used to support recursiveRef and dynamicRef
	    // function scoped variables
	    vErrors: new codegen_1.Name("vErrors"), // null or array of validation errors
	    errors: new codegen_1.Name("errors"), // counter of validation errors
	    this: new codegen_1.Name("this"),
	    // "globals"
	    self: new codegen_1.Name("self"),
	    scope: new codegen_1.Name("scope"),
	    // JTD serialize/parse name for JSON string and position
	    json: new codegen_1.Name("json"),
	    jsonPos: new codegen_1.Name("jsonPos"),
	    jsonLen: new codegen_1.Name("jsonLen"),
	    jsonPart: new codegen_1.Name("jsonPart"),
	};
	names.default = names$1;
	
	return names;
}

var hasRequiredErrors;

function requireErrors () {
	if (hasRequiredErrors) return errors;
	hasRequiredErrors = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
		const codegen_1 = requireCodegen();
		const util_1 = requireUtil();
		const names_1 = requireNames();
		exports.keywordError = {
		    message: ({ keyword }) => (0, codegen_1.str) `must pass "${keyword}" keyword validation`,
		};
		exports.keyword$DataError = {
		    message: ({ keyword, schemaType }) => schemaType
		        ? (0, codegen_1.str) `"${keyword}" keyword must be ${schemaType} ($data)`
		        : (0, codegen_1.str) `"${keyword}" keyword is invalid ($data)`,
		};
		function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
		    const { it } = cxt;
		    const { gen, compositeRule, allErrors } = it;
		    const errObj = errorObjectCode(cxt, error, errorPaths);
		    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
		        addError(gen, errObj);
		    }
		    else {
		        returnErrors(it, (0, codegen_1._) `[${errObj}]`);
		    }
		}
		exports.reportError = reportError;
		function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
		    const { it } = cxt;
		    const { gen, compositeRule, allErrors } = it;
		    const errObj = errorObjectCode(cxt, error, errorPaths);
		    addError(gen, errObj);
		    if (!(compositeRule || allErrors)) {
		        returnErrors(it, names_1.default.vErrors);
		    }
		}
		exports.reportExtraError = reportExtraError;
		function resetErrorsCount(gen, errsCount) {
		    gen.assign(names_1.default.errors, errsCount);
		    gen.if((0, codegen_1._) `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._) `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
		}
		exports.resetErrorsCount = resetErrorsCount;
		function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
		    /* istanbul ignore if */
		    if (errsCount === undefined)
		        throw new Error("ajv implementation error");
		    const err = gen.name("err");
		    gen.forRange("i", errsCount, names_1.default.errors, (i) => {
		        gen.const(err, (0, codegen_1._) `${names_1.default.vErrors}[${i}]`);
		        gen.if((0, codegen_1._) `${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._) `${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
		        gen.assign((0, codegen_1._) `${err}.schemaPath`, (0, codegen_1.str) `${it.errSchemaPath}/${keyword}`);
		        if (it.opts.verbose) {
		            gen.assign((0, codegen_1._) `${err}.schema`, schemaValue);
		            gen.assign((0, codegen_1._) `${err}.data`, data);
		        }
		    });
		}
		exports.extendErrors = extendErrors;
		function addError(gen, errObj) {
		    const err = gen.const("err", errObj);
		    gen.if((0, codegen_1._) `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._) `[${err}]`), (0, codegen_1._) `${names_1.default.vErrors}.push(${err})`);
		    gen.code((0, codegen_1._) `${names_1.default.errors}++`);
		}
		function returnErrors(it, errs) {
		    const { gen, validateName, schemaEnv } = it;
		    if (schemaEnv.$async) {
		        gen.throw((0, codegen_1._) `new ${it.ValidationError}(${errs})`);
		    }
		    else {
		        gen.assign((0, codegen_1._) `${validateName}.errors`, errs);
		        gen.return(false);
		    }
		}
		const E = {
		    keyword: new codegen_1.Name("keyword"),
		    schemaPath: new codegen_1.Name("schemaPath"), // also used in JTD errors
		    params: new codegen_1.Name("params"),
		    propertyName: new codegen_1.Name("propertyName"),
		    message: new codegen_1.Name("message"),
		    schema: new codegen_1.Name("schema"),
		    parentSchema: new codegen_1.Name("parentSchema"),
		};
		function errorObjectCode(cxt, error, errorPaths) {
		    const { createErrors } = cxt.it;
		    if (createErrors === false)
		        return (0, codegen_1._) `{}`;
		    return errorObject(cxt, error, errorPaths);
		}
		function errorObject(cxt, error, errorPaths = {}) {
		    const { gen, it } = cxt;
		    const keyValues = [
		        errorInstancePath(it, errorPaths),
		        errorSchemaPath(cxt, errorPaths),
		    ];
		    extraErrorProps(cxt, error, keyValues);
		    return gen.object(...keyValues);
		}
		function errorInstancePath({ errorPath }, { instancePath }) {
		    const instPath = instancePath
		        ? (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}`
		        : errorPath;
		    return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
		}
		function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
		    let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str) `${errSchemaPath}/${keyword}`;
		    if (schemaPath) {
		        schPath = (0, codegen_1.str) `${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
		    }
		    return [E.schemaPath, schPath];
		}
		function extraErrorProps(cxt, { params, message }, keyValues) {
		    const { keyword, data, schemaValue, it } = cxt;
		    const { opts, propertyName, topSchemaRef, schemaPath } = it;
		    keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._) `{}`]);
		    if (opts.messages) {
		        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
		    }
		    if (opts.verbose) {
		        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._) `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
		    }
		    if (propertyName)
		        keyValues.push([E.propertyName, propertyName]);
		}
		
	} (errors));
	return errors;
}

var hasRequiredBoolSchema;

function requireBoolSchema () {
	if (hasRequiredBoolSchema) return boolSchema;
	hasRequiredBoolSchema = 1;
	Object.defineProperty(boolSchema, "__esModule", { value: true });
	boolSchema.boolOrEmptySchema = boolSchema.topBoolOrEmptySchema = void 0;
	const errors_1 = requireErrors();
	const codegen_1 = requireCodegen();
	const names_1 = requireNames();
	const boolError = {
	    message: "boolean schema is false",
	};
	function topBoolOrEmptySchema(it) {
	    const { gen, schema, validateName } = it;
	    if (schema === false) {
	        falseSchemaError(it, false);
	    }
	    else if (typeof schema == "object" && schema.$async === true) {
	        gen.return(names_1.default.data);
	    }
	    else {
	        gen.assign((0, codegen_1._) `${validateName}.errors`, null);
	        gen.return(true);
	    }
	}
	boolSchema.topBoolOrEmptySchema = topBoolOrEmptySchema;
	function boolOrEmptySchema(it, valid) {
	    const { gen, schema } = it;
	    if (schema === false) {
	        gen.var(valid, false); // TODO var
	        falseSchemaError(it);
	    }
	    else {
	        gen.var(valid, true); // TODO var
	    }
	}
	boolSchema.boolOrEmptySchema = boolOrEmptySchema;
	function falseSchemaError(it, overrideAllErrors) {
	    const { gen, data } = it;
	    // TODO maybe some other interface should be used for non-keyword validation errors...
	    const cxt = {
	        gen,
	        keyword: "false schema",
	        data,
	        schema: false,
	        schemaCode: false,
	        schemaValue: false,
	        params: {},
	        it,
	    };
	    (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
	}
	
	return boolSchema;
}

var dataType = {};

var rules = {};

var hasRequiredRules;

function requireRules () {
	if (hasRequiredRules) return rules;
	hasRequiredRules = 1;
	Object.defineProperty(rules, "__esModule", { value: true });
	rules.getRules = rules.isJSONType = void 0;
	const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
	const jsonTypes = new Set(_jsonTypes);
	function isJSONType(x) {
	    return typeof x == "string" && jsonTypes.has(x);
	}
	rules.isJSONType = isJSONType;
	function getRules() {
	    const groups = {
	        number: { type: "number", rules: [] },
	        string: { type: "string", rules: [] },
	        array: { type: "array", rules: [] },
	        object: { type: "object", rules: [] },
	    };
	    return {
	        types: { ...groups, integer: true, boolean: true, null: true },
	        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
	        post: { rules: [] },
	        all: {},
	        keywords: {},
	    };
	}
	rules.getRules = getRules;
	
	return rules;
}

var applicability = {};

var hasRequiredApplicability;

function requireApplicability () {
	if (hasRequiredApplicability) return applicability;
	hasRequiredApplicability = 1;
	Object.defineProperty(applicability, "__esModule", { value: true });
	applicability.shouldUseRule = applicability.shouldUseGroup = applicability.schemaHasRulesForType = void 0;
	function schemaHasRulesForType({ schema, self }, type) {
	    const group = self.RULES.types[type];
	    return group && group !== true && shouldUseGroup(schema, group);
	}
	applicability.schemaHasRulesForType = schemaHasRulesForType;
	function shouldUseGroup(schema, group) {
	    return group.rules.some((rule) => shouldUseRule(schema, rule));
	}
	applicability.shouldUseGroup = shouldUseGroup;
	function shouldUseRule(schema, rule) {
	    var _a;
	    return (schema[rule.keyword] !== undefined ||
	        ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
	}
	applicability.shouldUseRule = shouldUseRule;
	
	return applicability;
}

var hasRequiredDataType;

function requireDataType () {
	if (hasRequiredDataType) return dataType;
	hasRequiredDataType = 1;
	Object.defineProperty(dataType, "__esModule", { value: true });
	dataType.reportTypeError = dataType.checkDataTypes = dataType.checkDataType = dataType.coerceAndCheckDataType = dataType.getJSONTypes = dataType.getSchemaTypes = dataType.DataType = void 0;
	const rules_1 = requireRules();
	const applicability_1 = requireApplicability();
	const errors_1 = requireErrors();
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	var DataType;
	(function (DataType) {
	    DataType[DataType["Correct"] = 0] = "Correct";
	    DataType[DataType["Wrong"] = 1] = "Wrong";
	})(DataType || (dataType.DataType = DataType = {}));
	function getSchemaTypes(schema) {
	    const types = getJSONTypes(schema.type);
	    const hasNull = types.includes("null");
	    if (hasNull) {
	        if (schema.nullable === false)
	            throw new Error("type: null contradicts nullable: false");
	    }
	    else {
	        if (!types.length && schema.nullable !== undefined) {
	            throw new Error('"nullable" cannot be used without "type"');
	        }
	        if (schema.nullable === true)
	            types.push("null");
	    }
	    return types;
	}
	dataType.getSchemaTypes = getSchemaTypes;
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	function getJSONTypes(ts) {
	    const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
	    if (types.every(rules_1.isJSONType))
	        return types;
	    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
	}
	dataType.getJSONTypes = getJSONTypes;
	function coerceAndCheckDataType(it, types) {
	    const { gen, data, opts } = it;
	    const coerceTo = coerceToTypes(types, opts.coerceTypes);
	    const checkTypes = types.length > 0 &&
	        !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
	    if (checkTypes) {
	        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
	        gen.if(wrongType, () => {
	            if (coerceTo.length)
	                coerceData(it, types, coerceTo);
	            else
	                reportTypeError(it);
	        });
	    }
	    return checkTypes;
	}
	dataType.coerceAndCheckDataType = coerceAndCheckDataType;
	const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
	function coerceToTypes(types, coerceTypes) {
	    return coerceTypes
	        ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
	        : [];
	}
	function coerceData(it, types, coerceTo) {
	    const { gen, data, opts } = it;
	    const dataType = gen.let("dataType", (0, codegen_1._) `typeof ${data}`);
	    const coerced = gen.let("coerced", (0, codegen_1._) `undefined`);
	    if (opts.coerceTypes === "array") {
	        gen.if((0, codegen_1._) `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
	            .assign(data, (0, codegen_1._) `${data}[0]`)
	            .assign(dataType, (0, codegen_1._) `typeof ${data}`)
	            .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
	    }
	    gen.if((0, codegen_1._) `${coerced} !== undefined`);
	    for (const t of coerceTo) {
	        if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
	            coerceSpecificType(t);
	        }
	    }
	    gen.else();
	    reportTypeError(it);
	    gen.endIf();
	    gen.if((0, codegen_1._) `${coerced} !== undefined`, () => {
	        gen.assign(data, coerced);
	        assignParentData(it, coerced);
	    });
	    function coerceSpecificType(t) {
	        switch (t) {
	            case "string":
	                gen
	                    .elseIf((0, codegen_1._) `${dataType} == "number" || ${dataType} == "boolean"`)
	                    .assign(coerced, (0, codegen_1._) `"" + ${data}`)
	                    .elseIf((0, codegen_1._) `${data} === null`)
	                    .assign(coerced, (0, codegen_1._) `""`);
	                return;
	            case "number":
	                gen
	                    .elseIf((0, codegen_1._) `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
	                    .assign(coerced, (0, codegen_1._) `+${data}`);
	                return;
	            case "integer":
	                gen
	                    .elseIf((0, codegen_1._) `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
	                    .assign(coerced, (0, codegen_1._) `+${data}`);
	                return;
	            case "boolean":
	                gen
	                    .elseIf((0, codegen_1._) `${data} === "false" || ${data} === 0 || ${data} === null`)
	                    .assign(coerced, false)
	                    .elseIf((0, codegen_1._) `${data} === "true" || ${data} === 1`)
	                    .assign(coerced, true);
	                return;
	            case "null":
	                gen.elseIf((0, codegen_1._) `${data} === "" || ${data} === 0 || ${data} === false`);
	                gen.assign(coerced, null);
	                return;
	            case "array":
	                gen
	                    .elseIf((0, codegen_1._) `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
	                    .assign(coerced, (0, codegen_1._) `[${data}]`);
	        }
	    }
	}
	function assignParentData({ gen, parentData, parentDataProperty }, expr) {
	    // TODO use gen.property
	    gen.if((0, codegen_1._) `${parentData} !== undefined`, () => gen.assign((0, codegen_1._) `${parentData}[${parentDataProperty}]`, expr));
	}
	function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
	    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
	    let cond;
	    switch (dataType) {
	        case "null":
	            return (0, codegen_1._) `${data} ${EQ} null`;
	        case "array":
	            cond = (0, codegen_1._) `Array.isArray(${data})`;
	            break;
	        case "object":
	            cond = (0, codegen_1._) `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
	            break;
	        case "integer":
	            cond = numCond((0, codegen_1._) `!(${data} % 1) && !isNaN(${data})`);
	            break;
	        case "number":
	            cond = numCond();
	            break;
	        default:
	            return (0, codegen_1._) `typeof ${data} ${EQ} ${dataType}`;
	    }
	    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
	    function numCond(_cond = codegen_1.nil) {
	        return (0, codegen_1.and)((0, codegen_1._) `typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._) `isFinite(${data})` : codegen_1.nil);
	    }
	}
	dataType.checkDataType = checkDataType;
	function checkDataTypes(dataTypes, data, strictNums, correct) {
	    if (dataTypes.length === 1) {
	        return checkDataType(dataTypes[0], data, strictNums, correct);
	    }
	    let cond;
	    const types = (0, util_1.toHash)(dataTypes);
	    if (types.array && types.object) {
	        const notObj = (0, codegen_1._) `typeof ${data} != "object"`;
	        cond = types.null ? notObj : (0, codegen_1._) `!${data} || ${notObj}`;
	        delete types.null;
	        delete types.array;
	        delete types.object;
	    }
	    else {
	        cond = codegen_1.nil;
	    }
	    if (types.number)
	        delete types.integer;
	    for (const t in types)
	        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
	    return cond;
	}
	dataType.checkDataTypes = checkDataTypes;
	const typeError = {
	    message: ({ schema }) => `must be ${schema}`,
	    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._) `{type: ${schema}}` : (0, codegen_1._) `{type: ${schemaValue}}`,
	};
	function reportTypeError(it) {
	    const cxt = getTypeErrorContext(it);
	    (0, errors_1.reportError)(cxt, typeError);
	}
	dataType.reportTypeError = reportTypeError;
	function getTypeErrorContext(it) {
	    const { gen, data, schema } = it;
	    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
	    return {
	        gen,
	        keyword: "type",
	        data,
	        schema: schema.type,
	        schemaCode,
	        schemaValue: schemaCode,
	        parentSchema: schema,
	        params: {},
	        it,
	    };
	}
	
	return dataType;
}

var defaults = {};

var hasRequiredDefaults;

function requireDefaults () {
	if (hasRequiredDefaults) return defaults;
	hasRequiredDefaults = 1;
	Object.defineProperty(defaults, "__esModule", { value: true });
	defaults.assignDefaults = void 0;
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	function assignDefaults(it, ty) {
	    const { properties, items } = it.schema;
	    if (ty === "object" && properties) {
	        for (const key in properties) {
	            assignDefault(it, key, properties[key].default);
	        }
	    }
	    else if (ty === "array" && Array.isArray(items)) {
	        items.forEach((sch, i) => assignDefault(it, i, sch.default));
	    }
	}
	defaults.assignDefaults = assignDefaults;
	function assignDefault(it, prop, defaultValue) {
	    const { gen, compositeRule, data, opts } = it;
	    if (defaultValue === undefined)
	        return;
	    const childData = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(prop)}`;
	    if (compositeRule) {
	        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
	        return;
	    }
	    let condition = (0, codegen_1._) `${childData} === undefined`;
	    if (opts.useDefaults === "empty") {
	        condition = (0, codegen_1._) `${condition} || ${childData} === null || ${childData} === ""`;
	    }
	    // `${childData} === undefined` +
	    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
	    gen.if(condition, (0, codegen_1._) `${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
	}
	
	return defaults;
}

var keyword = {};

var code = {};

var hasRequiredCode;

function requireCode () {
	if (hasRequiredCode) return code;
	hasRequiredCode = 1;
	Object.defineProperty(code, "__esModule", { value: true });
	code.validateUnion = code.validateArray = code.usePattern = code.callValidateCode = code.schemaProperties = code.allSchemaProperties = code.noPropertyInData = code.propertyInData = code.isOwnProperty = code.hasPropFunc = code.reportMissingProp = code.checkMissingProp = code.checkReportMissingProp = void 0;
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const names_1 = requireNames();
	const util_2 = requireUtil();
	function checkReportMissingProp(cxt, prop) {
	    const { gen, data, it } = cxt;
	    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
	        cxt.setParams({ missingProperty: (0, codegen_1._) `${prop}` }, true);
	        cxt.error();
	    });
	}
	code.checkReportMissingProp = checkReportMissingProp;
	function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
	    return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._) `${missing} = ${prop}`)));
	}
	code.checkMissingProp = checkMissingProp;
	function reportMissingProp(cxt, missing) {
	    cxt.setParams({ missingProperty: missing }, true);
	    cxt.error();
	}
	code.reportMissingProp = reportMissingProp;
	function hasPropFunc(gen) {
	    return gen.scopeValue("func", {
	        // eslint-disable-next-line @typescript-eslint/unbound-method
	        ref: Object.prototype.hasOwnProperty,
	        code: (0, codegen_1._) `Object.prototype.hasOwnProperty`,
	    });
	}
	code.hasPropFunc = hasPropFunc;
	function isOwnProperty(gen, data, property) {
	    return (0, codegen_1._) `${hasPropFunc(gen)}.call(${data}, ${property})`;
	}
	code.isOwnProperty = isOwnProperty;
	function propertyInData(gen, data, property, ownProperties) {
	    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
	    return ownProperties ? (0, codegen_1._) `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
	}
	code.propertyInData = propertyInData;
	function noPropertyInData(gen, data, property, ownProperties) {
	    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} === undefined`;
	    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
	}
	code.noPropertyInData = noPropertyInData;
	function allSchemaProperties(schemaMap) {
	    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
	}
	code.allSchemaProperties = allSchemaProperties;
	function schemaProperties(it, schemaMap) {
	    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
	}
	code.schemaProperties = schemaProperties;
	function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
	    const dataAndSchema = passSchema ? (0, codegen_1._) `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
	    const valCxt = [
	        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
	        [names_1.default.parentData, it.parentData],
	        [names_1.default.parentDataProperty, it.parentDataProperty],
	        [names_1.default.rootData, names_1.default.rootData],
	    ];
	    if (it.opts.dynamicRef)
	        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
	    const args = (0, codegen_1._) `${dataAndSchema}, ${gen.object(...valCxt)}`;
	    return context !== codegen_1.nil ? (0, codegen_1._) `${func}.call(${context}, ${args})` : (0, codegen_1._) `${func}(${args})`;
	}
	code.callValidateCode = callValidateCode;
	const newRegExp = (0, codegen_1._) `new RegExp`;
	function usePattern({ gen, it: { opts } }, pattern) {
	    const u = opts.unicodeRegExp ? "u" : "";
	    const { regExp } = opts.code;
	    const rx = regExp(pattern, u);
	    return gen.scopeValue("pattern", {
	        key: rx.toString(),
	        ref: rx,
	        code: (0, codegen_1._) `${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`,
	    });
	}
	code.usePattern = usePattern;
	function validateArray(cxt) {
	    const { gen, data, keyword, it } = cxt;
	    const valid = gen.name("valid");
	    if (it.allErrors) {
	        const validArr = gen.let("valid", true);
	        validateItems(() => gen.assign(validArr, false));
	        return validArr;
	    }
	    gen.var(valid, true);
	    validateItems(() => gen.break());
	    return valid;
	    function validateItems(notValid) {
	        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
	        gen.forRange("i", 0, len, (i) => {
	            cxt.subschema({
	                keyword,
	                dataProp: i,
	                dataPropType: util_1.Type.Num,
	            }, valid);
	            gen.if((0, codegen_1.not)(valid), notValid);
	        });
	    }
	}
	code.validateArray = validateArray;
	function validateUnion(cxt) {
	    const { gen, schema, keyword, it } = cxt;
	    /* istanbul ignore if */
	    if (!Array.isArray(schema))
	        throw new Error("ajv implementation error");
	    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
	    if (alwaysValid && !it.opts.unevaluated)
	        return;
	    const valid = gen.let("valid", false);
	    const schValid = gen.name("_valid");
	    gen.block(() => schema.forEach((_sch, i) => {
	        const schCxt = cxt.subschema({
	            keyword,
	            schemaProp: i,
	            compositeRule: true,
	        }, schValid);
	        gen.assign(valid, (0, codegen_1._) `${valid} || ${schValid}`);
	        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
	        // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
	        // or if all properties and items were evaluated (it.props === true && it.items === true)
	        if (!merged)
	            gen.if((0, codegen_1.not)(valid));
	    }));
	    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
	}
	code.validateUnion = validateUnion;
	
	return code;
}

var hasRequiredKeyword;

function requireKeyword () {
	if (hasRequiredKeyword) return keyword;
	hasRequiredKeyword = 1;
	Object.defineProperty(keyword, "__esModule", { value: true });
	keyword.validateKeywordUsage = keyword.validSchemaType = keyword.funcKeywordCode = keyword.macroKeywordCode = void 0;
	const codegen_1 = requireCodegen();
	const names_1 = requireNames();
	const code_1 = requireCode();
	const errors_1 = requireErrors();
	function macroKeywordCode(cxt, def) {
	    const { gen, keyword, schema, parentSchema, it } = cxt;
	    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
	    const schemaRef = useKeyword(gen, keyword, macroSchema);
	    if (it.opts.validateSchema !== false)
	        it.self.validateSchema(macroSchema, true);
	    const valid = gen.name("valid");
	    cxt.subschema({
	        schema: macroSchema,
	        schemaPath: codegen_1.nil,
	        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
	        topSchemaRef: schemaRef,
	        compositeRule: true,
	    }, valid);
	    cxt.pass(valid, () => cxt.error(true));
	}
	keyword.macroKeywordCode = macroKeywordCode;
	function funcKeywordCode(cxt, def) {
	    var _a;
	    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
	    checkAsyncKeyword(it, def);
	    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
	    const validateRef = useKeyword(gen, keyword, validate);
	    const valid = gen.let("valid");
	    cxt.block$data(valid, validateKeyword);
	    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
	    function validateKeyword() {
	        if (def.errors === false) {
	            assignValid();
	            if (def.modifying)
	                modifyData(cxt);
	            reportErrs(() => cxt.error());
	        }
	        else {
	            const ruleErrs = def.async ? validateAsync() : validateSync();
	            if (def.modifying)
	                modifyData(cxt);
	            reportErrs(() => addErrs(cxt, ruleErrs));
	        }
	    }
	    function validateAsync() {
	        const ruleErrs = gen.let("ruleErrs", null);
	        gen.try(() => assignValid((0, codegen_1._) `await `), (e) => gen.assign(valid, false).if((0, codegen_1._) `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._) `${e}.errors`), () => gen.throw(e)));
	        return ruleErrs;
	    }
	    function validateSync() {
	        const validateErrs = (0, codegen_1._) `${validateRef}.errors`;
	        gen.assign(validateErrs, null);
	        assignValid(codegen_1.nil);
	        return validateErrs;
	    }
	    function assignValid(_await = def.async ? (0, codegen_1._) `await ` : codegen_1.nil) {
	        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
	        const passSchema = !(("compile" in def && !$data) || def.schema === false);
	        gen.assign(valid, (0, codegen_1._) `${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
	    }
	    function reportErrs(errors) {
	        var _a;
	        gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
	    }
	}
	keyword.funcKeywordCode = funcKeywordCode;
	function modifyData(cxt) {
	    const { gen, data, it } = cxt;
	    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._) `${it.parentData}[${it.parentDataProperty}]`));
	}
	function addErrs(cxt, errs) {
	    const { gen } = cxt;
	    gen.if((0, codegen_1._) `Array.isArray(${errs})`, () => {
	        gen
	            .assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
	            .assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
	        (0, errors_1.extendErrors)(cxt);
	    }, () => cxt.error());
	}
	function checkAsyncKeyword({ schemaEnv }, def) {
	    if (def.async && !schemaEnv.$async)
	        throw new Error("async keyword in sync schema");
	}
	function useKeyword(gen, keyword, result) {
	    if (result === undefined)
	        throw new Error(`keyword "${keyword}" failed to compile`);
	    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
	}
	function validSchemaType(schema, schemaType, allowUndefined = false) {
	    // TODO add tests
	    return (!schemaType.length ||
	        schemaType.some((st) => st === "array"
	            ? Array.isArray(schema)
	            : st === "object"
	                ? schema && typeof schema == "object" && !Array.isArray(schema)
	                : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
	}
	keyword.validSchemaType = validSchemaType;
	function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
	    /* istanbul ignore if */
	    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
	        throw new Error("ajv implementation error");
	    }
	    const deps = def.dependencies;
	    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
	        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
	    }
	    if (def.validateSchema) {
	        const valid = def.validateSchema(schema[keyword]);
	        if (!valid) {
	            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
	                self.errorsText(def.validateSchema.errors);
	            if (opts.validateSchema === "log")
	                self.logger.error(msg);
	            else
	                throw new Error(msg);
	        }
	    }
	}
	keyword.validateKeywordUsage = validateKeywordUsage;
	
	return keyword;
}

var subschema = {};

var hasRequiredSubschema;

function requireSubschema () {
	if (hasRequiredSubschema) return subschema;
	hasRequiredSubschema = 1;
	Object.defineProperty(subschema, "__esModule", { value: true });
	subschema.extendSubschemaMode = subschema.extendSubschemaData = subschema.getSubschema = void 0;
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
	    if (keyword !== undefined && schema !== undefined) {
	        throw new Error('both "keyword" and "schema" passed, only one allowed');
	    }
	    if (keyword !== undefined) {
	        const sch = it.schema[keyword];
	        return schemaProp === undefined
	            ? {
	                schema: sch,
	                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
	                errSchemaPath: `${it.errSchemaPath}/${keyword}`,
	            }
	            : {
	                schema: sch[schemaProp],
	                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
	                errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`,
	            };
	    }
	    if (schema !== undefined) {
	        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
	            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
	        }
	        return {
	            schema,
	            schemaPath,
	            topSchemaRef,
	            errSchemaPath,
	        };
	    }
	    throw new Error('either "keyword" or "schema" must be passed');
	}
	subschema.getSubschema = getSubschema;
	function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
	    if (data !== undefined && dataProp !== undefined) {
	        throw new Error('both "data" and "dataProp" passed, only one allowed');
	    }
	    const { gen } = it;
	    if (dataProp !== undefined) {
	        const { errorPath, dataPathArr, opts } = it;
	        const nextData = gen.let("data", (0, codegen_1._) `${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
	        dataContextProps(nextData);
	        subschema.errorPath = (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
	        subschema.parentDataProperty = (0, codegen_1._) `${dataProp}`;
	        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
	    }
	    if (data !== undefined) {
	        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
	        dataContextProps(nextData);
	        if (propertyName !== undefined)
	            subschema.propertyName = propertyName;
	        // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
	    }
	    if (dataTypes)
	        subschema.dataTypes = dataTypes;
	    function dataContextProps(_nextData) {
	        subschema.data = _nextData;
	        subschema.dataLevel = it.dataLevel + 1;
	        subschema.dataTypes = [];
	        it.definedProperties = new Set();
	        subschema.parentData = it.data;
	        subschema.dataNames = [...it.dataNames, _nextData];
	    }
	}
	subschema.extendSubschemaData = extendSubschemaData;
	function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
	    if (compositeRule !== undefined)
	        subschema.compositeRule = compositeRule;
	    if (createErrors !== undefined)
	        subschema.createErrors = createErrors;
	    if (allErrors !== undefined)
	        subschema.allErrors = allErrors;
	    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
	    subschema.jtdMetadata = jtdMetadata; // not inherited
	}
	subschema.extendSubschemaMode = extendSubschemaMode;
	
	return subschema;
}

var resolve = {};

var fastDeepEqual;
var hasRequiredFastDeepEqual;

function requireFastDeepEqual () {
	if (hasRequiredFastDeepEqual) return fastDeepEqual;
	hasRequiredFastDeepEqual = 1;

	// do not edit .js files directly - edit src/index.jst



	fastDeepEqual = function equal(a, b) {
	  if (a === b) return true;

	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    if (a.constructor !== b.constructor) return false;

	    var length, i, keys;
	    if (Array.isArray(a)) {
	      length = a.length;
	      if (length != b.length) return false;
	      for (i = length; i-- !== 0;)
	        if (!equal(a[i], b[i])) return false;
	      return true;
	    }



	    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
	    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
	    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

	    keys = Object.keys(a);
	    length = keys.length;
	    if (length !== Object.keys(b).length) return false;

	    for (i = length; i-- !== 0;)
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

	    for (i = length; i-- !== 0;) {
	      var key = keys[i];

	      if (!equal(a[key], b[key])) return false;
	    }

	    return true;
	  }

	  // true if both NaN, false otherwise
	  return a!==a && b!==b;
	};
	return fastDeepEqual;
}

var jsonSchemaTraverse = {exports: {}};

var hasRequiredJsonSchemaTraverse;

function requireJsonSchemaTraverse () {
	if (hasRequiredJsonSchemaTraverse) return jsonSchemaTraverse.exports;
	hasRequiredJsonSchemaTraverse = 1;

	var traverse = jsonSchemaTraverse.exports = function (schema, opts, cb) {
	  // Legacy support for v0.3.1 and earlier.
	  if (typeof opts == 'function') {
	    cb = opts;
	    opts = {};
	  }

	  cb = opts.cb || cb;
	  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
	  var post = cb.post || function() {};

	  _traverse(opts, pre, post, schema, '', schema);
	};


	traverse.keywords = {
	  additionalItems: true,
	  items: true,
	  contains: true,
	  additionalProperties: true,
	  propertyNames: true,
	  not: true,
	  if: true,
	  then: true,
	  else: true
	};

	traverse.arrayKeywords = {
	  items: true,
	  allOf: true,
	  anyOf: true,
	  oneOf: true
	};

	traverse.propsKeywords = {
	  $defs: true,
	  definitions: true,
	  properties: true,
	  patternProperties: true,
	  dependencies: true
	};

	traverse.skipKeywords = {
	  default: true,
	  enum: true,
	  const: true,
	  required: true,
	  maximum: true,
	  minimum: true,
	  exclusiveMaximum: true,
	  exclusiveMinimum: true,
	  multipleOf: true,
	  maxLength: true,
	  minLength: true,
	  pattern: true,
	  format: true,
	  maxItems: true,
	  minItems: true,
	  uniqueItems: true,
	  maxProperties: true,
	  minProperties: true
	};


	function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
	  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
	    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
	    for (var key in schema) {
	      var sch = schema[key];
	      if (Array.isArray(sch)) {
	        if (key in traverse.arrayKeywords) {
	          for (var i=0; i<sch.length; i++)
	            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
	        }
	      } else if (key in traverse.propsKeywords) {
	        if (sch && typeof sch == 'object') {
	          for (var prop in sch)
	            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
	        }
	      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
	        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
	      }
	    }
	    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
	  }
	}


	function escapeJsonPtr(str) {
	  return str.replace(/~/g, '~0').replace(/\//g, '~1');
	}
	return jsonSchemaTraverse.exports;
}

var hasRequiredResolve;

function requireResolve () {
	if (hasRequiredResolve) return resolve;
	hasRequiredResolve = 1;
	Object.defineProperty(resolve, "__esModule", { value: true });
	resolve.getSchemaRefs = resolve.resolveUrl = resolve.normalizeId = resolve._getFullPath = resolve.getFullPath = resolve.inlineRef = void 0;
	const util_1 = requireUtil();
	const equal = requireFastDeepEqual();
	const traverse = requireJsonSchemaTraverse();
	// TODO refactor to use keyword definitions
	const SIMPLE_INLINED = new Set([
	    "type",
	    "format",
	    "pattern",
	    "maxLength",
	    "minLength",
	    "maxProperties",
	    "minProperties",
	    "maxItems",
	    "minItems",
	    "maximum",
	    "minimum",
	    "uniqueItems",
	    "multipleOf",
	    "required",
	    "enum",
	    "const",
	]);
	function inlineRef(schema, limit = true) {
	    if (typeof schema == "boolean")
	        return true;
	    if (limit === true)
	        return !hasRef(schema);
	    if (!limit)
	        return false;
	    return countKeys(schema) <= limit;
	}
	resolve.inlineRef = inlineRef;
	const REF_KEYWORDS = new Set([
	    "$ref",
	    "$recursiveRef",
	    "$recursiveAnchor",
	    "$dynamicRef",
	    "$dynamicAnchor",
	]);
	function hasRef(schema) {
	    for (const key in schema) {
	        if (REF_KEYWORDS.has(key))
	            return true;
	        const sch = schema[key];
	        if (Array.isArray(sch) && sch.some(hasRef))
	            return true;
	        if (typeof sch == "object" && hasRef(sch))
	            return true;
	    }
	    return false;
	}
	function countKeys(schema) {
	    let count = 0;
	    for (const key in schema) {
	        if (key === "$ref")
	            return Infinity;
	        count++;
	        if (SIMPLE_INLINED.has(key))
	            continue;
	        if (typeof schema[key] == "object") {
	            (0, util_1.eachItem)(schema[key], (sch) => (count += countKeys(sch)));
	        }
	        if (count === Infinity)
	            return Infinity;
	    }
	    return count;
	}
	function getFullPath(resolver, id = "", normalize) {
	    if (normalize !== false)
	        id = normalizeId(id);
	    const p = resolver.parse(id);
	    return _getFullPath(resolver, p);
	}
	resolve.getFullPath = getFullPath;
	function _getFullPath(resolver, p) {
	    const serialized = resolver.serialize(p);
	    return serialized.split("#")[0] + "#";
	}
	resolve._getFullPath = _getFullPath;
	const TRAILING_SLASH_HASH = /#\/?$/;
	function normalizeId(id) {
	    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
	}
	resolve.normalizeId = normalizeId;
	function resolveUrl(resolver, baseId, id) {
	    id = normalizeId(id);
	    return resolver.resolve(baseId, id);
	}
	resolve.resolveUrl = resolveUrl;
	const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
	function getSchemaRefs(schema, baseId) {
	    if (typeof schema == "boolean")
	        return {};
	    const { schemaId, uriResolver } = this.opts;
	    const schId = normalizeId(schema[schemaId] || baseId);
	    const baseIds = { "": schId };
	    const pathPrefix = getFullPath(uriResolver, schId, false);
	    const localRefs = {};
	    const schemaRefs = new Set();
	    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
	        if (parentJsonPtr === undefined)
	            return;
	        const fullPath = pathPrefix + jsonPtr;
	        let innerBaseId = baseIds[parentJsonPtr];
	        if (typeof sch[schemaId] == "string")
	            innerBaseId = addRef.call(this, sch[schemaId]);
	        addAnchor.call(this, sch.$anchor);
	        addAnchor.call(this, sch.$dynamicAnchor);
	        baseIds[jsonPtr] = innerBaseId;
	        function addRef(ref) {
	            // eslint-disable-next-line @typescript-eslint/unbound-method
	            const _resolve = this.opts.uriResolver.resolve;
	            ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
	            if (schemaRefs.has(ref))
	                throw ambiguos(ref);
	            schemaRefs.add(ref);
	            let schOrRef = this.refs[ref];
	            if (typeof schOrRef == "string")
	                schOrRef = this.refs[schOrRef];
	            if (typeof schOrRef == "object") {
	                checkAmbiguosRef(sch, schOrRef.schema, ref);
	            }
	            else if (ref !== normalizeId(fullPath)) {
	                if (ref[0] === "#") {
	                    checkAmbiguosRef(sch, localRefs[ref], ref);
	                    localRefs[ref] = sch;
	                }
	                else {
	                    this.refs[ref] = fullPath;
	                }
	            }
	            return ref;
	        }
	        function addAnchor(anchor) {
	            if (typeof anchor == "string") {
	                if (!ANCHOR.test(anchor))
	                    throw new Error(`invalid anchor "${anchor}"`);
	                addRef.call(this, `#${anchor}`);
	            }
	        }
	    });
	    return localRefs;
	    function checkAmbiguosRef(sch1, sch2, ref) {
	        if (sch2 !== undefined && !equal(sch1, sch2))
	            throw ambiguos(ref);
	    }
	    function ambiguos(ref) {
	        return new Error(`reference "${ref}" resolves to more than one schema`);
	    }
	}
	resolve.getSchemaRefs = getSchemaRefs;
	
	return resolve;
}

var hasRequiredValidate;

function requireValidate () {
	if (hasRequiredValidate) return validate;
	hasRequiredValidate = 1;
	Object.defineProperty(validate, "__esModule", { value: true });
	validate.getData = validate.KeywordCxt = validate.validateFunctionCode = void 0;
	const boolSchema_1 = requireBoolSchema();
	const dataType_1 = requireDataType();
	const applicability_1 = requireApplicability();
	const dataType_2 = requireDataType();
	const defaults_1 = requireDefaults();
	const keyword_1 = requireKeyword();
	const subschema_1 = requireSubschema();
	const codegen_1 = requireCodegen();
	const names_1 = requireNames();
	const resolve_1 = requireResolve();
	const util_1 = requireUtil();
	const errors_1 = requireErrors();
	// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
	function validateFunctionCode(it) {
	    if (isSchemaObj(it)) {
	        checkKeywords(it);
	        if (schemaCxtHasRules(it)) {
	            topSchemaObjCode(it);
	            return;
	        }
	    }
	    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
	}
	validate.validateFunctionCode = validateFunctionCode;
	function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
	    if (opts.code.es5) {
	        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
	            gen.code((0, codegen_1._) `"use strict"; ${funcSourceUrl(schema, opts)}`);
	            destructureValCxtES5(gen, opts);
	            gen.code(body);
	        });
	    }
	    else {
	        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
	    }
	}
	function destructureValCxt(opts) {
	    return (0, codegen_1._) `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._) `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
	}
	function destructureValCxtES5(gen, opts) {
	    gen.if(names_1.default.valCxt, () => {
	        gen.var(names_1.default.instancePath, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.instancePath}`);
	        gen.var(names_1.default.parentData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentData}`);
	        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
	        gen.var(names_1.default.rootData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.rootData}`);
	        if (opts.dynamicRef)
	            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
	    }, () => {
	        gen.var(names_1.default.instancePath, (0, codegen_1._) `""`);
	        gen.var(names_1.default.parentData, (0, codegen_1._) `undefined`);
	        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `undefined`);
	        gen.var(names_1.default.rootData, names_1.default.data);
	        if (opts.dynamicRef)
	            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `{}`);
	    });
	}
	function topSchemaObjCode(it) {
	    const { schema, opts, gen } = it;
	    validateFunction(it, () => {
	        if (opts.$comment && schema.$comment)
	            commentKeyword(it);
	        checkNoDefault(it);
	        gen.let(names_1.default.vErrors, null);
	        gen.let(names_1.default.errors, 0);
	        if (opts.unevaluated)
	            resetEvaluated(it);
	        typeAndKeywords(it);
	        returnResults(it);
	    });
	    return;
	}
	function resetEvaluated(it) {
	    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
	    const { gen, validateName } = it;
	    it.evaluated = gen.const("evaluated", (0, codegen_1._) `${validateName}.evaluated`);
	    gen.if((0, codegen_1._) `${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._) `${it.evaluated}.props`, (0, codegen_1._) `undefined`));
	    gen.if((0, codegen_1._) `${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._) `${it.evaluated}.items`, (0, codegen_1._) `undefined`));
	}
	function funcSourceUrl(schema, opts) {
	    const schId = typeof schema == "object" && schema[opts.schemaId];
	    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._) `/*# sourceURL=${schId} */` : codegen_1.nil;
	}
	// schema compilation - this function is used recursively to generate code for sub-schemas
	function subschemaCode(it, valid) {
	    if (isSchemaObj(it)) {
	        checkKeywords(it);
	        if (schemaCxtHasRules(it)) {
	            subSchemaObjCode(it, valid);
	            return;
	        }
	    }
	    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
	}
	function schemaCxtHasRules({ schema, self }) {
	    if (typeof schema == "boolean")
	        return !schema;
	    for (const key in schema)
	        if (self.RULES.all[key])
	            return true;
	    return false;
	}
	function isSchemaObj(it) {
	    return typeof it.schema != "boolean";
	}
	function subSchemaObjCode(it, valid) {
	    const { schema, gen, opts } = it;
	    if (opts.$comment && schema.$comment)
	        commentKeyword(it);
	    updateContext(it);
	    checkAsyncSchema(it);
	    const errsCount = gen.const("_errs", names_1.default.errors);
	    typeAndKeywords(it, errsCount);
	    // TODO var
	    gen.var(valid, (0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
	}
	function checkKeywords(it) {
	    (0, util_1.checkUnknownRules)(it);
	    checkRefsAndKeywords(it);
	}
	function typeAndKeywords(it, errsCount) {
	    if (it.opts.jtd)
	        return schemaKeywords(it, [], false, errsCount);
	    const types = (0, dataType_1.getSchemaTypes)(it.schema);
	    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
	    schemaKeywords(it, types, !checkedTypes, errsCount);
	}
	function checkRefsAndKeywords(it) {
	    const { schema, errSchemaPath, opts, self } = it;
	    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
	        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
	    }
	}
	function checkNoDefault(it) {
	    const { schema, opts } = it;
	    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
	        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
	    }
	}
	function updateContext(it) {
	    const schId = it.schema[it.opts.schemaId];
	    if (schId)
	        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
	}
	function checkAsyncSchema(it) {
	    if (it.schema.$async && !it.schemaEnv.$async)
	        throw new Error("async schema in sync schema");
	}
	function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
	    const msg = schema.$comment;
	    if (opts.$comment === true) {
	        gen.code((0, codegen_1._) `${names_1.default.self}.logger.log(${msg})`);
	    }
	    else if (typeof opts.$comment == "function") {
	        const schemaPath = (0, codegen_1.str) `${errSchemaPath}/$comment`;
	        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
	        gen.code((0, codegen_1._) `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
	    }
	}
	function returnResults(it) {
	    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
	    if (schemaEnv.$async) {
	        // TODO assign unevaluated
	        gen.if((0, codegen_1._) `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._) `new ${ValidationError}(${names_1.default.vErrors})`));
	    }
	    else {
	        gen.assign((0, codegen_1._) `${validateName}.errors`, names_1.default.vErrors);
	        if (opts.unevaluated)
	            assignEvaluated(it);
	        gen.return((0, codegen_1._) `${names_1.default.errors} === 0`);
	    }
	}
	function assignEvaluated({ gen, evaluated, props, items }) {
	    if (props instanceof codegen_1.Name)
	        gen.assign((0, codegen_1._) `${evaluated}.props`, props);
	    if (items instanceof codegen_1.Name)
	        gen.assign((0, codegen_1._) `${evaluated}.items`, items);
	}
	function schemaKeywords(it, types, typeErrors, errsCount) {
	    const { gen, schema, data, allErrors, opts, self } = it;
	    const { RULES } = self;
	    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
	        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
	        return;
	    }
	    if (!opts.jtd)
	        checkStrictTypes(it, types);
	    gen.block(() => {
	        for (const group of RULES.rules)
	            groupKeywords(group);
	        groupKeywords(RULES.post);
	    });
	    function groupKeywords(group) {
	        if (!(0, applicability_1.shouldUseGroup)(schema, group))
	            return;
	        if (group.type) {
	            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
	            iterateKeywords(it, group);
	            if (types.length === 1 && types[0] === group.type && typeErrors) {
	                gen.else();
	                (0, dataType_2.reportTypeError)(it);
	            }
	            gen.endIf();
	        }
	        else {
	            iterateKeywords(it, group);
	        }
	        // TODO make it "ok" call?
	        if (!allErrors)
	            gen.if((0, codegen_1._) `${names_1.default.errors} === ${errsCount || 0}`);
	    }
	}
	function iterateKeywords(it, group) {
	    const { gen, schema, opts: { useDefaults }, } = it;
	    if (useDefaults)
	        (0, defaults_1.assignDefaults)(it, group.type);
	    gen.block(() => {
	        for (const rule of group.rules) {
	            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
	                keywordCode(it, rule.keyword, rule.definition, group.type);
	            }
	        }
	    });
	}
	function checkStrictTypes(it, types) {
	    if (it.schemaEnv.meta || !it.opts.strictTypes)
	        return;
	    checkContextTypes(it, types);
	    if (!it.opts.allowUnionTypes)
	        checkMultipleTypes(it, types);
	    checkKeywordTypes(it, it.dataTypes);
	}
	function checkContextTypes(it, types) {
	    if (!types.length)
	        return;
	    if (!it.dataTypes.length) {
	        it.dataTypes = types;
	        return;
	    }
	    types.forEach((t) => {
	        if (!includesType(it.dataTypes, t)) {
	            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
	        }
	    });
	    narrowSchemaTypes(it, types);
	}
	function checkMultipleTypes(it, ts) {
	    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
	        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
	    }
	}
	function checkKeywordTypes(it, ts) {
	    const rules = it.self.RULES.all;
	    for (const keyword in rules) {
	        const rule = rules[keyword];
	        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
	            const { type } = rule.definition;
	            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
	                strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
	            }
	        }
	    }
	}
	function hasApplicableType(schTs, kwdT) {
	    return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
	}
	function includesType(ts, t) {
	    return ts.includes(t) || (t === "integer" && ts.includes("number"));
	}
	function narrowSchemaTypes(it, withTypes) {
	    const ts = [];
	    for (const t of it.dataTypes) {
	        if (includesType(withTypes, t))
	            ts.push(t);
	        else if (withTypes.includes("integer") && t === "number")
	            ts.push("integer");
	    }
	    it.dataTypes = ts;
	}
	function strictTypesError(it, msg) {
	    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
	    msg += ` at "${schemaPath}" (strictTypes)`;
	    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
	}
	class KeywordCxt {
	    constructor(it, def, keyword) {
	        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
	        this.gen = it.gen;
	        this.allErrors = it.allErrors;
	        this.keyword = keyword;
	        this.data = it.data;
	        this.schema = it.schema[keyword];
	        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
	        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
	        this.schemaType = def.schemaType;
	        this.parentSchema = it.schema;
	        this.params = {};
	        this.it = it;
	        this.def = def;
	        if (this.$data) {
	            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
	        }
	        else {
	            this.schemaCode = this.schemaValue;
	            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
	                throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
	            }
	        }
	        if ("code" in def ? def.trackErrors : def.errors !== false) {
	            this.errsCount = it.gen.const("_errs", names_1.default.errors);
	        }
	    }
	    result(condition, successAction, failAction) {
	        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
	    }
	    failResult(condition, successAction, failAction) {
	        this.gen.if(condition);
	        if (failAction)
	            failAction();
	        else
	            this.error();
	        if (successAction) {
	            this.gen.else();
	            successAction();
	            if (this.allErrors)
	                this.gen.endIf();
	        }
	        else {
	            if (this.allErrors)
	                this.gen.endIf();
	            else
	                this.gen.else();
	        }
	    }
	    pass(condition, failAction) {
	        this.failResult((0, codegen_1.not)(condition), undefined, failAction);
	    }
	    fail(condition) {
	        if (condition === undefined) {
	            this.error();
	            if (!this.allErrors)
	                this.gen.if(false); // this branch will be removed by gen.optimize
	            return;
	        }
	        this.gen.if(condition);
	        this.error();
	        if (this.allErrors)
	            this.gen.endIf();
	        else
	            this.gen.else();
	    }
	    fail$data(condition) {
	        if (!this.$data)
	            return this.fail(condition);
	        const { schemaCode } = this;
	        this.fail((0, codegen_1._) `${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
	    }
	    error(append, errorParams, errorPaths) {
	        if (errorParams) {
	            this.setParams(errorParams);
	            this._error(append, errorPaths);
	            this.setParams({});
	            return;
	        }
	        this._error(append, errorPaths);
	    }
	    _error(append, errorPaths) {
	        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
	    }
	    $dataError() {
	        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
	    }
	    reset() {
	        if (this.errsCount === undefined)
	            throw new Error('add "trackErrors" to keyword definition');
	        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
	    }
	    ok(cond) {
	        if (!this.allErrors)
	            this.gen.if(cond);
	    }
	    setParams(obj, assign) {
	        if (assign)
	            Object.assign(this.params, obj);
	        else
	            this.params = obj;
	    }
	    block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
	        this.gen.block(() => {
	            this.check$data(valid, $dataValid);
	            codeBlock();
	        });
	    }
	    check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
	        if (!this.$data)
	            return;
	        const { gen, schemaCode, schemaType, def } = this;
	        gen.if((0, codegen_1.or)((0, codegen_1._) `${schemaCode} === undefined`, $dataValid));
	        if (valid !== codegen_1.nil)
	            gen.assign(valid, true);
	        if (schemaType.length || def.validateSchema) {
	            gen.elseIf(this.invalid$data());
	            this.$dataError();
	            if (valid !== codegen_1.nil)
	                gen.assign(valid, false);
	        }
	        gen.else();
	    }
	    invalid$data() {
	        const { gen, schemaCode, schemaType, def, it } = this;
	        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
	        function wrong$DataType() {
	            if (schemaType.length) {
	                /* istanbul ignore if */
	                if (!(schemaCode instanceof codegen_1.Name))
	                    throw new Error("ajv implementation error");
	                const st = Array.isArray(schemaType) ? schemaType : [schemaType];
	                return (0, codegen_1._) `${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
	            }
	            return codegen_1.nil;
	        }
	        function invalid$DataSchema() {
	            if (def.validateSchema) {
	                const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
	                return (0, codegen_1._) `!${validateSchemaRef}(${schemaCode})`;
	            }
	            return codegen_1.nil;
	        }
	    }
	    subschema(appl, valid) {
	        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
	        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
	        (0, subschema_1.extendSubschemaMode)(subschema, appl);
	        const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
	        subschemaCode(nextContext, valid);
	        return nextContext;
	    }
	    mergeEvaluated(schemaCxt, toName) {
	        const { it, gen } = this;
	        if (!it.opts.unevaluated)
	            return;
	        if (it.props !== true && schemaCxt.props !== undefined) {
	            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
	        }
	        if (it.items !== true && schemaCxt.items !== undefined) {
	            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
	        }
	    }
	    mergeValidEvaluated(schemaCxt, valid) {
	        const { it, gen } = this;
	        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
	            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
	            return true;
	        }
	    }
	}
	validate.KeywordCxt = KeywordCxt;
	function keywordCode(it, keyword, def, ruleType) {
	    const cxt = new KeywordCxt(it, def, keyword);
	    if ("code" in def) {
	        def.code(cxt, ruleType);
	    }
	    else if (cxt.$data && def.validate) {
	        (0, keyword_1.funcKeywordCode)(cxt, def);
	    }
	    else if ("macro" in def) {
	        (0, keyword_1.macroKeywordCode)(cxt, def);
	    }
	    else if (def.compile || def.validate) {
	        (0, keyword_1.funcKeywordCode)(cxt, def);
	    }
	}
	const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
	const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function getData($data, { dataLevel, dataNames, dataPathArr }) {
	    let jsonPointer;
	    let data;
	    if ($data === "")
	        return names_1.default.rootData;
	    if ($data[0] === "/") {
	        if (!JSON_POINTER.test($data))
	            throw new Error(`Invalid JSON-pointer: ${$data}`);
	        jsonPointer = $data;
	        data = names_1.default.rootData;
	    }
	    else {
	        const matches = RELATIVE_JSON_POINTER.exec($data);
	        if (!matches)
	            throw new Error(`Invalid JSON-pointer: ${$data}`);
	        const up = +matches[1];
	        jsonPointer = matches[2];
	        if (jsonPointer === "#") {
	            if (up >= dataLevel)
	                throw new Error(errorMsg("property/index", up));
	            return dataPathArr[dataLevel - up];
	        }
	        if (up > dataLevel)
	            throw new Error(errorMsg("data", up));
	        data = dataNames[dataLevel - up];
	        if (!jsonPointer)
	            return data;
	    }
	    let expr = data;
	    const segments = jsonPointer.split("/");
	    for (const segment of segments) {
	        if (segment) {
	            data = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
	            expr = (0, codegen_1._) `${expr} && ${data}`;
	        }
	    }
	    return expr;
	    function errorMsg(pointerType, up) {
	        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
	    }
	}
	validate.getData = getData;
	
	return validate;
}

var validation_error = {};

var hasRequiredValidation_error;

function requireValidation_error () {
	if (hasRequiredValidation_error) return validation_error;
	hasRequiredValidation_error = 1;
	Object.defineProperty(validation_error, "__esModule", { value: true });
	class ValidationError extends Error {
	    constructor(errors) {
	        super("validation failed");
	        this.errors = errors;
	        this.ajv = this.validation = true;
	    }
	}
	validation_error.default = ValidationError;
	
	return validation_error;
}

var ref_error = {};

var hasRequiredRef_error;

function requireRef_error () {
	if (hasRequiredRef_error) return ref_error;
	hasRequiredRef_error = 1;
	Object.defineProperty(ref_error, "__esModule", { value: true });
	const resolve_1 = requireResolve();
	class MissingRefError extends Error {
	    constructor(resolver, baseId, ref, msg) {
	        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
	        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
	        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
	    }
	}
	ref_error.default = MissingRefError;
	
	return ref_error;
}

var compile = {};

var hasRequiredCompile;

function requireCompile () {
	if (hasRequiredCompile) return compile;
	hasRequiredCompile = 1;
	Object.defineProperty(compile, "__esModule", { value: true });
	compile.resolveSchema = compile.getCompilingSchema = compile.resolveRef = compile.compileSchema = compile.SchemaEnv = void 0;
	const codegen_1 = requireCodegen();
	const validation_error_1 = requireValidation_error();
	const names_1 = requireNames();
	const resolve_1 = requireResolve();
	const util_1 = requireUtil();
	const validate_1 = requireValidate();
	class SchemaEnv {
	    constructor(env) {
	        var _a;
	        this.refs = {};
	        this.dynamicAnchors = {};
	        let schema;
	        if (typeof env.schema == "object")
	            schema = env.schema;
	        this.schema = env.schema;
	        this.schemaId = env.schemaId;
	        this.root = env.root || this;
	        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
	        this.schemaPath = env.schemaPath;
	        this.localRefs = env.localRefs;
	        this.meta = env.meta;
	        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
	        this.refs = {};
	    }
	}
	compile.SchemaEnv = SchemaEnv;
	// let codeSize = 0
	// let nodeCount = 0
	// Compiles schema in SchemaEnv
	function compileSchema(sch) {
	    // TODO refactor - remove compilations
	    const _sch = getCompilingSchema.call(this, sch);
	    if (_sch)
	        return _sch;
	    const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId); // TODO if getFullPath removed 1 tests fails
	    const { es5, lines } = this.opts.code;
	    const { ownProperties } = this.opts;
	    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
	    let _ValidationError;
	    if (sch.$async) {
	        _ValidationError = gen.scopeValue("Error", {
	            ref: validation_error_1.default,
	            code: (0, codegen_1._) `require("ajv/dist/runtime/validation_error").default`,
	        });
	    }
	    const validateName = gen.scopeName("validate");
	    sch.validateName = validateName;
	    const schemaCxt = {
	        gen,
	        allErrors: this.opts.allErrors,
	        data: names_1.default.data,
	        parentData: names_1.default.parentData,
	        parentDataProperty: names_1.default.parentDataProperty,
	        dataNames: [names_1.default.data],
	        dataPathArr: [codegen_1.nil], // TODO can its length be used as dataLevel if nil is removed?
	        dataLevel: 0,
	        dataTypes: [],
	        definedProperties: new Set(),
	        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
	            ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) }
	            : { ref: sch.schema }),
	        validateName,
	        ValidationError: _ValidationError,
	        schema: sch.schema,
	        schemaEnv: sch,
	        rootId,
	        baseId: sch.baseId || rootId,
	        schemaPath: codegen_1.nil,
	        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
	        errorPath: (0, codegen_1._) `""`,
	        opts: this.opts,
	        self: this,
	    };
	    let sourceCode;
	    try {
	        this._compilations.add(sch);
	        (0, validate_1.validateFunctionCode)(schemaCxt);
	        gen.optimize(this.opts.code.optimize);
	        // gen.optimize(1)
	        const validateCode = gen.toString();
	        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
	        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
	        if (this.opts.code.process)
	            sourceCode = this.opts.code.process(sourceCode, sch);
	        // console.log("\n\n\n *** \n", sourceCode)
	        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
	        const validate = makeValidate(this, this.scope.get());
	        this.scope.value(validateName, { ref: validate });
	        validate.errors = null;
	        validate.schema = sch.schema;
	        validate.schemaEnv = sch;
	        if (sch.$async)
	            validate.$async = true;
	        if (this.opts.code.source === true) {
	            validate.source = { validateName, validateCode, scopeValues: gen._values };
	        }
	        if (this.opts.unevaluated) {
	            const { props, items } = schemaCxt;
	            validate.evaluated = {
	                props: props instanceof codegen_1.Name ? undefined : props,
	                items: items instanceof codegen_1.Name ? undefined : items,
	                dynamicProps: props instanceof codegen_1.Name,
	                dynamicItems: items instanceof codegen_1.Name,
	            };
	            if (validate.source)
	                validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
	        }
	        sch.validate = validate;
	        return sch;
	    }
	    catch (e) {
	        delete sch.validate;
	        delete sch.validateName;
	        if (sourceCode)
	            this.logger.error("Error compiling schema, function code:", sourceCode);
	        // console.log("\n\n\n *** \n", sourceCode, this.opts)
	        throw e;
	    }
	    finally {
	        this._compilations.delete(sch);
	    }
	}
	compile.compileSchema = compileSchema;
	function resolveRef(root, baseId, ref) {
	    var _a;
	    ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
	    const schOrFunc = root.refs[ref];
	    if (schOrFunc)
	        return schOrFunc;
	    let _sch = resolve.call(this, root, ref);
	    if (_sch === undefined) {
	        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
	        const { schemaId } = this.opts;
	        if (schema)
	            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
	    }
	    if (_sch === undefined)
	        return;
	    return (root.refs[ref] = inlineOrCompile.call(this, _sch));
	}
	compile.resolveRef = resolveRef;
	function inlineOrCompile(sch) {
	    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
	        return sch.schema;
	    return sch.validate ? sch : compileSchema.call(this, sch);
	}
	// Index of schema compilation in the currently compiled list
	function getCompilingSchema(schEnv) {
	    for (const sch of this._compilations) {
	        if (sameSchemaEnv(sch, schEnv))
	            return sch;
	    }
	}
	compile.getCompilingSchema = getCompilingSchema;
	function sameSchemaEnv(s1, s2) {
	    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
	}
	// resolve and compile the references ($ref)
	// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
	function resolve(root, // information about the root schema for the current schema
	ref // reference to resolve
	) {
	    let sch;
	    while (typeof (sch = this.refs[ref]) == "string")
	        ref = sch;
	    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
	}
	// Resolve schema, its root and baseId
	function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
	ref // reference to resolve
	) {
	    const p = this.opts.uriResolver.parse(ref);
	    const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
	    let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, undefined);
	    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
	    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
	        return getJsonPointer.call(this, p, root);
	    }
	    const id = (0, resolve_1.normalizeId)(refPath);
	    const schOrRef = this.refs[id] || this.schemas[id];
	    if (typeof schOrRef == "string") {
	        const sch = resolveSchema.call(this, root, schOrRef);
	        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
	            return;
	        return getJsonPointer.call(this, p, sch);
	    }
	    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
	        return;
	    if (!schOrRef.validate)
	        compileSchema.call(this, schOrRef);
	    if (id === (0, resolve_1.normalizeId)(ref)) {
	        const { schema } = schOrRef;
	        const { schemaId } = this.opts;
	        const schId = schema[schemaId];
	        if (schId)
	            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
	        return new SchemaEnv({ schema, schemaId, root, baseId });
	    }
	    return getJsonPointer.call(this, p, schOrRef);
	}
	compile.resolveSchema = resolveSchema;
	const PREVENT_SCOPE_CHANGE = new Set([
	    "properties",
	    "patternProperties",
	    "enum",
	    "dependencies",
	    "definitions",
	]);
	function getJsonPointer(parsedRef, { baseId, schema, root }) {
	    var _a;
	    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
	        return;
	    for (const part of parsedRef.fragment.slice(1).split("/")) {
	        if (typeof schema === "boolean")
	            return;
	        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
	        if (partSchema === undefined)
	            return;
	        schema = partSchema;
	        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
	        const schId = typeof schema === "object" && schema[this.opts.schemaId];
	        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
	            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
	        }
	    }
	    let env;
	    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
	        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
	        env = resolveSchema.call(this, root, $ref);
	    }
	    // even though resolution failed we need to return SchemaEnv to throw exception
	    // so that compileAsync loads missing schema.
	    const { schemaId } = this.opts;
	    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
	    if (env.schema !== env.root.schema)
	        return env;
	    return undefined;
	}
	
	return compile;
}

var $id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
var description = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
var type$1 = "object";
var required$1 = [
	"$data"
];
var properties$2 = {
	$data: {
		type: "string",
		anyOf: [
			{
				format: "relative-json-pointer"
			},
			{
				format: "json-pointer"
			}
		]
	}
};
var additionalProperties$1 = false;
var require$$9 = {
	$id: $id$1,
	description: description,
	type: type$1,
	required: required$1,
	properties: properties$2,
	additionalProperties: additionalProperties$1
};

var uri = {};

var fastUri = {exports: {}};

var scopedChars;
var hasRequiredScopedChars;

function requireScopedChars () {
	if (hasRequiredScopedChars) return scopedChars;
	hasRequiredScopedChars = 1;

	const HEX = {
	  0: 0,
	  1: 1,
	  2: 2,
	  3: 3,
	  4: 4,
	  5: 5,
	  6: 6,
	  7: 7,
	  8: 8,
	  9: 9,
	  a: 10,
	  A: 10,
	  b: 11,
	  B: 11,
	  c: 12,
	  C: 12,
	  d: 13,
	  D: 13,
	  e: 14,
	  E: 14,
	  f: 15,
	  F: 15
	};

	scopedChars = {
	  HEX
	};
	return scopedChars;
}

var utils;
var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;

	const { HEX } = requireScopedChars();

	const IPV4_REG = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;

	function normalizeIPv4 (host) {
	  if (findToken(host, '.') < 3) { return { host, isIPV4: false } }
	  const matches = host.match(IPV4_REG) || [];
	  const [address] = matches;
	  if (address) {
	    return { host: stripLeadingZeros(address, '.'), isIPV4: true }
	  } else {
	    return { host, isIPV4: false }
	  }
	}

	/**
	 * @param {string[]} input
	 * @param {boolean} [keepZero=false]
	 * @returns {string|undefined}
	 */
	function stringArrayToHexStripped (input, keepZero = false) {
	  let acc = '';
	  let strip = true;
	  for (const c of input) {
	    if (HEX[c] === undefined) return undefined
	    if (c !== '0' && strip === true) strip = false;
	    if (!strip) acc += c;
	  }
	  if (keepZero && acc.length === 0) acc = '0';
	  return acc
	}

	function getIPV6 (input) {
	  let tokenCount = 0;
	  const output = { error: false, address: '', zone: '' };
	  const address = [];
	  const buffer = [];
	  let isZone = false;
	  let endipv6Encountered = false;
	  let endIpv6 = false;

	  function consume () {
	    if (buffer.length) {
	      if (isZone === false) {
	        const hex = stringArrayToHexStripped(buffer);
	        if (hex !== undefined) {
	          address.push(hex);
	        } else {
	          output.error = true;
	          return false
	        }
	      }
	      buffer.length = 0;
	    }
	    return true
	  }

	  for (let i = 0; i < input.length; i++) {
	    const cursor = input[i];
	    if (cursor === '[' || cursor === ']') { continue }
	    if (cursor === ':') {
	      if (endipv6Encountered === true) {
	        endIpv6 = true;
	      }
	      if (!consume()) { break }
	      tokenCount++;
	      address.push(':');
	      if (tokenCount > 7) {
	        // not valid
	        output.error = true;
	        break
	      }
	      if (i - 1 >= 0 && input[i - 1] === ':') {
	        endipv6Encountered = true;
	      }
	      continue
	    } else if (cursor === '%') {
	      if (!consume()) { break }
	      // switch to zone detection
	      isZone = true;
	    } else {
	      buffer.push(cursor);
	      continue
	    }
	  }
	  if (buffer.length) {
	    if (isZone) {
	      output.zone = buffer.join('');
	    } else if (endIpv6) {
	      address.push(buffer.join(''));
	    } else {
	      address.push(stringArrayToHexStripped(buffer));
	    }
	  }
	  output.address = address.join('');
	  return output
	}

	function normalizeIPv6 (host) {
	  if (findToken(host, ':') < 2) { return { host, isIPV6: false } }
	  const ipv6 = getIPV6(host);

	  if (!ipv6.error) {
	    let newHost = ipv6.address;
	    let escapedHost = ipv6.address;
	    if (ipv6.zone) {
	      newHost += '%' + ipv6.zone;
	      escapedHost += '%25' + ipv6.zone;
	    }
	    return { host: newHost, escapedHost, isIPV6: true }
	  } else {
	    return { host, isIPV6: false }
	  }
	}

	function stripLeadingZeros (str, token) {
	  let out = '';
	  let skip = true;
	  const l = str.length;
	  for (let i = 0; i < l; i++) {
	    const c = str[i];
	    if (c === '0' && skip) {
	      if ((i + 1 <= l && str[i + 1] === token) || i + 1 === l) {
	        out += c;
	        skip = false;
	      }
	    } else {
	      if (c === token) {
	        skip = true;
	      } else {
	        skip = false;
	      }
	      out += c;
	    }
	  }
	  return out
	}

	function findToken (str, token) {
	  let ind = 0;
	  for (let i = 0; i < str.length; i++) {
	    if (str[i] === token) ind++;
	  }
	  return ind
	}

	const RDS1 = /^\.\.?\//u;
	const RDS2 = /^\/\.(?:\/|$)/u;
	const RDS3 = /^\/\.\.(?:\/|$)/u;
	const RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/u;

	function removeDotSegments (input) {
	  const output = [];

	  while (input.length) {
	    if (input.match(RDS1)) {
	      input = input.replace(RDS1, '');
	    } else if (input.match(RDS2)) {
	      input = input.replace(RDS2, '/');
	    } else if (input.match(RDS3)) {
	      input = input.replace(RDS3, '/');
	      output.pop();
	    } else if (input === '.' || input === '..') {
	      input = '';
	    } else {
	      const im = input.match(RDS5);
	      if (im) {
	        const s = im[0];
	        input = input.slice(s.length);
	        output.push(s);
	      } else {
	        throw new Error('Unexpected dot segment condition')
	      }
	    }
	  }
	  return output.join('')
	}

	function normalizeComponentEncoding (components, esc) {
	  const func = esc !== true ? escape : unescape;
	  if (components.scheme !== undefined) {
	    components.scheme = func(components.scheme);
	  }
	  if (components.userinfo !== undefined) {
	    components.userinfo = func(components.userinfo);
	  }
	  if (components.host !== undefined) {
	    components.host = func(components.host);
	  }
	  if (components.path !== undefined) {
	    components.path = func(components.path);
	  }
	  if (components.query !== undefined) {
	    components.query = func(components.query);
	  }
	  if (components.fragment !== undefined) {
	    components.fragment = func(components.fragment);
	  }
	  return components
	}

	function recomposeAuthority (components) {
	  const uriTokens = [];

	  if (components.userinfo !== undefined) {
	    uriTokens.push(components.userinfo);
	    uriTokens.push('@');
	  }

	  if (components.host !== undefined) {
	    let host = unescape(components.host);
	    const ipV4res = normalizeIPv4(host);

	    if (ipV4res.isIPV4) {
	      host = ipV4res.host;
	    } else {
	      const ipV6res = normalizeIPv6(ipV4res.host);
	      if (ipV6res.isIPV6 === true) {
	        host = `[${ipV6res.escapedHost}]`;
	      } else {
	        host = components.host;
	      }
	    }
	    uriTokens.push(host);
	  }

	  if (typeof components.port === 'number' || typeof components.port === 'string') {
	    uriTokens.push(':');
	    uriTokens.push(String(components.port));
	  }

	  return uriTokens.length ? uriTokens.join('') : undefined
	}
	utils = {
	  recomposeAuthority,
	  normalizeComponentEncoding,
	  removeDotSegments,
	  normalizeIPv4,
	  normalizeIPv6,
	  stringArrayToHexStripped
	};
	return utils;
}

var schemes;
var hasRequiredSchemes;

function requireSchemes () {
	if (hasRequiredSchemes) return schemes;
	hasRequiredSchemes = 1;

	const UUID_REG = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu;
	const URN_REG = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;

	function isSecure (wsComponents) {
	  return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === 'wss'
	}

	function httpParse (components) {
	  if (!components.host) {
	    components.error = components.error || 'HTTP URIs must have a host.';
	  }

	  return components
	}

	function httpSerialize (components) {
	  const secure = String(components.scheme).toLowerCase() === 'https';

	  // normalize the default port
	  if (components.port === (secure ? 443 : 80) || components.port === '') {
	    components.port = undefined;
	  }

	  // normalize the empty path
	  if (!components.path) {
	    components.path = '/';
	  }

	  // NOTE: We do not parse query strings for HTTP URIs
	  // as WWW Form Url Encoded query strings are part of the HTML4+ spec,
	  // and not the HTTP spec.

	  return components
	}

	function wsParse (wsComponents) {
	// indicate if the secure flag is set
	  wsComponents.secure = isSecure(wsComponents);

	  // construct resouce name
	  wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
	  wsComponents.path = undefined;
	  wsComponents.query = undefined;

	  return wsComponents
	}

	function wsSerialize (wsComponents) {
	// normalize the default port
	  if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === '') {
	    wsComponents.port = undefined;
	  }

	  // ensure scheme matches secure flag
	  if (typeof wsComponents.secure === 'boolean') {
	    wsComponents.scheme = (wsComponents.secure ? 'wss' : 'ws');
	    wsComponents.secure = undefined;
	  }

	  // reconstruct path from resource name
	  if (wsComponents.resourceName) {
	    const [path, query] = wsComponents.resourceName.split('?');
	    wsComponents.path = (path && path !== '/' ? path : undefined);
	    wsComponents.query = query;
	    wsComponents.resourceName = undefined;
	  }

	  // forbid fragment component
	  wsComponents.fragment = undefined;

	  return wsComponents
	}

	function urnParse (urnComponents, options) {
	  if (!urnComponents.path) {
	    urnComponents.error = 'URN can not be parsed';
	    return urnComponents
	  }
	  const matches = urnComponents.path.match(URN_REG);
	  if (matches) {
	    const scheme = options.scheme || urnComponents.scheme || 'urn';
	    urnComponents.nid = matches[1].toLowerCase();
	    urnComponents.nss = matches[2];
	    const urnScheme = `${scheme}:${options.nid || urnComponents.nid}`;
	    const schemeHandler = SCHEMES[urnScheme];
	    urnComponents.path = undefined;

	    if (schemeHandler) {
	      urnComponents = schemeHandler.parse(urnComponents, options);
	    }
	  } else {
	    urnComponents.error = urnComponents.error || 'URN can not be parsed.';
	  }

	  return urnComponents
	}

	function urnSerialize (urnComponents, options) {
	  const scheme = options.scheme || urnComponents.scheme || 'urn';
	  const nid = urnComponents.nid.toLowerCase();
	  const urnScheme = `${scheme}:${options.nid || nid}`;
	  const schemeHandler = SCHEMES[urnScheme];

	  if (schemeHandler) {
	    urnComponents = schemeHandler.serialize(urnComponents, options);
	  }

	  const uriComponents = urnComponents;
	  const nss = urnComponents.nss;
	  uriComponents.path = `${nid || options.nid}:${nss}`;

	  options.skipEscape = true;
	  return uriComponents
	}

	function urnuuidParse (urnComponents, options) {
	  const uuidComponents = urnComponents;
	  uuidComponents.uuid = uuidComponents.nss;
	  uuidComponents.nss = undefined;

	  if (!options.tolerant && (!uuidComponents.uuid || !UUID_REG.test(uuidComponents.uuid))) {
	    uuidComponents.error = uuidComponents.error || 'UUID is not valid.';
	  }

	  return uuidComponents
	}

	function urnuuidSerialize (uuidComponents) {
	  const urnComponents = uuidComponents;
	  // normalize UUID
	  urnComponents.nss = (uuidComponents.uuid || '').toLowerCase();
	  return urnComponents
	}

	const http = {
	  scheme: 'http',
	  domainHost: true,
	  parse: httpParse,
	  serialize: httpSerialize
	};

	const https = {
	  scheme: 'https',
	  domainHost: http.domainHost,
	  parse: httpParse,
	  serialize: httpSerialize
	};

	const ws = {
	  scheme: 'ws',
	  domainHost: true,
	  parse: wsParse,
	  serialize: wsSerialize
	};

	const wss = {
	  scheme: 'wss',
	  domainHost: ws.domainHost,
	  parse: ws.parse,
	  serialize: ws.serialize
	};

	const urn = {
	  scheme: 'urn',
	  parse: urnParse,
	  serialize: urnSerialize,
	  skipNormalize: true
	};

	const urnuuid = {
	  scheme: 'urn:uuid',
	  parse: urnuuidParse,
	  serialize: urnuuidSerialize,
	  skipNormalize: true
	};

	const SCHEMES = {
	  http,
	  https,
	  ws,
	  wss,
	  urn,
	  'urn:uuid': urnuuid
	};

	schemes = SCHEMES;
	return schemes;
}

var hasRequiredFastUri;

function requireFastUri () {
	if (hasRequiredFastUri) return fastUri.exports;
	hasRequiredFastUri = 1;

	const { normalizeIPv6, normalizeIPv4, removeDotSegments, recomposeAuthority, normalizeComponentEncoding } = requireUtils();
	const SCHEMES = requireSchemes();

	function normalize (uri, options) {
	  if (typeof uri === 'string') {
	    uri = serialize(parse(uri, options), options);
	  } else if (typeof uri === 'object') {
	    uri = parse(serialize(uri, options), options);
	  }
	  return uri
	}

	function resolve (baseURI, relativeURI, options) {
	  const schemelessOptions = Object.assign({ scheme: 'null' }, options);
	  const resolved = resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true);
	  return serialize(resolved, { ...schemelessOptions, skipEscape: true })
	}

	function resolveComponents (base, relative, options, skipNormalization) {
	  const target = {};
	  if (!skipNormalization) {
	    base = parse(serialize(base, options), options); // normalize base components
	    relative = parse(serialize(relative, options), options); // normalize relative components
	  }
	  options = options || {};

	  if (!options.tolerant && relative.scheme) {
	    target.scheme = relative.scheme;
	    // target.authority = relative.authority;
	    target.userinfo = relative.userinfo;
	    target.host = relative.host;
	    target.port = relative.port;
	    target.path = removeDotSegments(relative.path || '');
	    target.query = relative.query;
	  } else {
	    if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
	      // target.authority = relative.authority;
	      target.userinfo = relative.userinfo;
	      target.host = relative.host;
	      target.port = relative.port;
	      target.path = removeDotSegments(relative.path || '');
	      target.query = relative.query;
	    } else {
	      if (!relative.path) {
	        target.path = base.path;
	        if (relative.query !== undefined) {
	          target.query = relative.query;
	        } else {
	          target.query = base.query;
	        }
	      } else {
	        if (relative.path.charAt(0) === '/') {
	          target.path = removeDotSegments(relative.path);
	        } else {
	          if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
	            target.path = '/' + relative.path;
	          } else if (!base.path) {
	            target.path = relative.path;
	          } else {
	            target.path = base.path.slice(0, base.path.lastIndexOf('/') + 1) + relative.path;
	          }
	          target.path = removeDotSegments(target.path);
	        }
	        target.query = relative.query;
	      }
	      // target.authority = base.authority;
	      target.userinfo = base.userinfo;
	      target.host = base.host;
	      target.port = base.port;
	    }
	    target.scheme = base.scheme;
	  }

	  target.fragment = relative.fragment;

	  return target
	}

	function equal (uriA, uriB, options) {
	  if (typeof uriA === 'string') {
	    uriA = unescape(uriA);
	    uriA = serialize(normalizeComponentEncoding(parse(uriA, options), true), { ...options, skipEscape: true });
	  } else if (typeof uriA === 'object') {
	    uriA = serialize(normalizeComponentEncoding(uriA, true), { ...options, skipEscape: true });
	  }

	  if (typeof uriB === 'string') {
	    uriB = unescape(uriB);
	    uriB = serialize(normalizeComponentEncoding(parse(uriB, options), true), { ...options, skipEscape: true });
	  } else if (typeof uriB === 'object') {
	    uriB = serialize(normalizeComponentEncoding(uriB, true), { ...options, skipEscape: true });
	  }

	  return uriA.toLowerCase() === uriB.toLowerCase()
	}

	function serialize (cmpts, opts) {
	  const components = {
	    host: cmpts.host,
	    scheme: cmpts.scheme,
	    userinfo: cmpts.userinfo,
	    port: cmpts.port,
	    path: cmpts.path,
	    query: cmpts.query,
	    nid: cmpts.nid,
	    nss: cmpts.nss,
	    uuid: cmpts.uuid,
	    fragment: cmpts.fragment,
	    reference: cmpts.reference,
	    resourceName: cmpts.resourceName,
	    secure: cmpts.secure,
	    error: ''
	  };
	  const options = Object.assign({}, opts);
	  const uriTokens = [];

	  // find scheme handler
	  const schemeHandler = SCHEMES[(options.scheme || components.scheme || '').toLowerCase()];

	  // perform scheme specific serialization
	  if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);

	  if (components.path !== undefined) {
	    if (!options.skipEscape) {
	      components.path = escape(components.path);

	      if (components.scheme !== undefined) {
	        components.path = components.path.split('%3A').join(':');
	      }
	    } else {
	      components.path = unescape(components.path);
	    }
	  }

	  if (options.reference !== 'suffix' && components.scheme) {
	    uriTokens.push(components.scheme, ':');
	  }

	  const authority = recomposeAuthority(components);
	  if (authority !== undefined) {
	    if (options.reference !== 'suffix') {
	      uriTokens.push('//');
	    }

	    uriTokens.push(authority);

	    if (components.path && components.path.charAt(0) !== '/') {
	      uriTokens.push('/');
	    }
	  }
	  if (components.path !== undefined) {
	    let s = components.path;

	    if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
	      s = removeDotSegments(s);
	    }

	    if (authority === undefined) {
	      s = s.replace(/^\/\//u, '/%2F'); // don't allow the path to start with "//"
	    }

	    uriTokens.push(s);
	  }

	  if (components.query !== undefined) {
	    uriTokens.push('?', components.query);
	  }

	  if (components.fragment !== undefined) {
	    uriTokens.push('#', components.fragment);
	  }
	  return uriTokens.join('')
	}

	const hexLookUp = Array.from({ length: 127 }, (_v, k) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(k)));

	function nonSimpleDomain (value) {
	  let code = 0;
	  for (let i = 0, len = value.length; i < len; ++i) {
	    code = value.charCodeAt(i);
	    if (code > 126 || hexLookUp[code]) {
	      return true
	    }
	  }
	  return false
	}

	const URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;

	function parse (uri, opts) {
	  const options = Object.assign({}, opts);
	  const parsed = {
	    scheme: undefined,
	    userinfo: undefined,
	    host: '',
	    port: undefined,
	    path: '',
	    query: undefined,
	    fragment: undefined
	  };
	  const gotEncoding = uri.indexOf('%') !== -1;
	  let isIP = false;
	  if (options.reference === 'suffix') uri = (options.scheme ? options.scheme + ':' : '') + '//' + uri;

	  const matches = uri.match(URI_PARSE);

	  if (matches) {
	    // store each component
	    parsed.scheme = matches[1];
	    parsed.userinfo = matches[3];
	    parsed.host = matches[4];
	    parsed.port = parseInt(matches[5], 10);
	    parsed.path = matches[6] || '';
	    parsed.query = matches[7];
	    parsed.fragment = matches[8];

	    // fix port number
	    if (isNaN(parsed.port)) {
	      parsed.port = matches[5];
	    }
	    if (parsed.host) {
	      const ipv4result = normalizeIPv4(parsed.host);
	      if (ipv4result.isIPV4 === false) {
	        const ipv6result = normalizeIPv6(ipv4result.host);
	        parsed.host = ipv6result.host.toLowerCase();
	        isIP = ipv6result.isIPV6;
	      } else {
	        parsed.host = ipv4result.host;
	        isIP = true;
	      }
	    }
	    if (parsed.scheme === undefined && parsed.userinfo === undefined && parsed.host === undefined && parsed.port === undefined && parsed.query === undefined && !parsed.path) {
	      parsed.reference = 'same-document';
	    } else if (parsed.scheme === undefined) {
	      parsed.reference = 'relative';
	    } else if (parsed.fragment === undefined) {
	      parsed.reference = 'absolute';
	    } else {
	      parsed.reference = 'uri';
	    }

	    // check for reference errors
	    if (options.reference && options.reference !== 'suffix' && options.reference !== parsed.reference) {
	      parsed.error = parsed.error || 'URI is not a ' + options.reference + ' reference.';
	    }

	    // find scheme handler
	    const schemeHandler = SCHEMES[(options.scheme || parsed.scheme || '').toLowerCase()];

	    // check if scheme can't handle IRIs
	    if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
	      // if host component is a domain name
	      if (parsed.host && (options.domainHost || (schemeHandler && schemeHandler.domainHost)) && isIP === false && nonSimpleDomain(parsed.host)) {
	        // convert Unicode IDN -> ASCII IDN
	        try {
	          parsed.host = URL.domainToASCII(parsed.host.toLowerCase());
	        } catch (e) {
	          parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
	        }
	      }
	      // convert IRI -> URI
	    }

	    if (!schemeHandler || (schemeHandler && !schemeHandler.skipNormalize)) {
	      if (gotEncoding && parsed.scheme !== undefined) {
	        parsed.scheme = unescape(parsed.scheme);
	      }
	      if (gotEncoding && parsed.host !== undefined) {
	        parsed.host = unescape(parsed.host);
	      }
	      if (parsed.path) {
	        parsed.path = escape(unescape(parsed.path));
	      }
	      if (parsed.fragment) {
	        parsed.fragment = encodeURI(decodeURIComponent(parsed.fragment));
	      }
	    }

	    // perform scheme specific parsing
	    if (schemeHandler && schemeHandler.parse) {
	      schemeHandler.parse(parsed, options);
	    }
	  } else {
	    parsed.error = parsed.error || 'URI can not be parsed.';
	  }
	  return parsed
	}

	const fastUri$1 = {
	  SCHEMES,
	  normalize,
	  resolve,
	  resolveComponents,
	  equal,
	  serialize,
	  parse
	};

	fastUri.exports = fastUri$1;
	fastUri.exports.default = fastUri$1;
	fastUri.exports.fastUri = fastUri$1;
	return fastUri.exports;
}

var hasRequiredUri;

function requireUri () {
	if (hasRequiredUri) return uri;
	hasRequiredUri = 1;
	Object.defineProperty(uri, "__esModule", { value: true });
	const uri$1 = requireFastUri();
	uri$1.code = 'require("ajv/dist/runtime/uri").default';
	uri.default = uri$1;
	
	return uri;
}

var hasRequiredCore$1;

function requireCore$1 () {
	if (hasRequiredCore$1) return core$1;
	hasRequiredCore$1 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
		var validate_1 = requireValidate();
		Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
		var codegen_1 = requireCodegen();
		Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
		Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
		Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
		Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
		Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
		Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });
		const validation_error_1 = requireValidation_error();
		const ref_error_1 = requireRef_error();
		const rules_1 = requireRules();
		const compile_1 = requireCompile();
		const codegen_2 = requireCodegen();
		const resolve_1 = requireResolve();
		const dataType_1 = requireDataType();
		const util_1 = requireUtil();
		const $dataRefSchema = require$$9;
		const uri_1 = requireUri();
		const defaultRegExp = (str, flags) => new RegExp(str, flags);
		defaultRegExp.code = "new RegExp";
		const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
		const EXT_SCOPE_NAMES = new Set([
		    "validate",
		    "serialize",
		    "parse",
		    "wrapper",
		    "root",
		    "schema",
		    "keyword",
		    "pattern",
		    "formats",
		    "validate$data",
		    "func",
		    "obj",
		    "Error",
		]);
		const removedOptions = {
		    errorDataPath: "",
		    format: "`validateFormats: false` can be used instead.",
		    nullable: '"nullable" keyword is supported by default.',
		    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		    sourceCode: "Use option `code: {source: true}`",
		    strictDefaults: "It is default now, see option `strict`.",
		    strictKeywords: "It is default now, see option `strict`.",
		    uniqueItems: '"uniqueItems" keyword is always validated.',
		    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		    cache: "Map is used as cache, schema object as key.",
		    serialize: "Map is used as cache, schema object as key.",
		    ajvErrors: "It is default now.",
		};
		const deprecatedOptions = {
		    ignoreKeywordsWithRef: "",
		    jsPropertySyntax: "",
		    unicode: '"minLength"/"maxLength" account for unicode characters by default.',
		};
		const MAX_EXPRESSION = 200;
		// eslint-disable-next-line complexity
		function requiredOptions(o) {
		    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
		    const s = o.strict;
		    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
		    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
		    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
		    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
		    return {
		        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
		        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
		        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
		        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
		        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
		        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
		        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
		        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
		        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
		        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
		        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
		        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
		        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
		        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
		        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
		        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
		        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
		        uriResolver: uriResolver,
		    };
		}
		class Ajv {
		    constructor(opts = {}) {
		        this.schemas = {};
		        this.refs = {};
		        this.formats = {};
		        this._compilations = new Set();
		        this._loading = {};
		        this._cache = new Map();
		        opts = this.opts = { ...opts, ...requiredOptions(opts) };
		        const { es5, lines } = this.opts.code;
		        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
		        this.logger = getLogger(opts.logger);
		        const formatOpt = opts.validateFormats;
		        opts.validateFormats = false;
		        this.RULES = (0, rules_1.getRules)();
		        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
		        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
		        this._metaOpts = getMetaSchemaOptions.call(this);
		        if (opts.formats)
		            addInitialFormats.call(this);
		        this._addVocabularies();
		        this._addDefaultMetaSchema();
		        if (opts.keywords)
		            addInitialKeywords.call(this, opts.keywords);
		        if (typeof opts.meta == "object")
		            this.addMetaSchema(opts.meta);
		        addInitialSchemas.call(this);
		        opts.validateFormats = formatOpt;
		    }
		    _addVocabularies() {
		        this.addKeyword("$async");
		    }
		    _addDefaultMetaSchema() {
		        const { $data, meta, schemaId } = this.opts;
		        let _dataRefSchema = $dataRefSchema;
		        if (schemaId === "id") {
		            _dataRefSchema = { ...$dataRefSchema };
		            _dataRefSchema.id = _dataRefSchema.$id;
		            delete _dataRefSchema.$id;
		        }
		        if (meta && $data)
		            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
		    }
		    defaultMeta() {
		        const { meta, schemaId } = this.opts;
		        return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
		    }
		    validate(schemaKeyRef, // key, ref or schema object
		    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
		    data // to be validated
		    ) {
		        let v;
		        if (typeof schemaKeyRef == "string") {
		            v = this.getSchema(schemaKeyRef);
		            if (!v)
		                throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
		        }
		        else {
		            v = this.compile(schemaKeyRef);
		        }
		        const valid = v(data);
		        if (!("$async" in v))
		            this.errors = v.errors;
		        return valid;
		    }
		    compile(schema, _meta) {
		        const sch = this._addSchema(schema, _meta);
		        return (sch.validate || this._compileSchemaEnv(sch));
		    }
		    compileAsync(schema, meta) {
		        if (typeof this.opts.loadSchema != "function") {
		            throw new Error("options.loadSchema should be a function");
		        }
		        const { loadSchema } = this.opts;
		        return runCompileAsync.call(this, schema, meta);
		        async function runCompileAsync(_schema, _meta) {
		            await loadMetaSchema.call(this, _schema.$schema);
		            const sch = this._addSchema(_schema, _meta);
		            return sch.validate || _compileAsync.call(this, sch);
		        }
		        async function loadMetaSchema($ref) {
		            if ($ref && !this.getSchema($ref)) {
		                await runCompileAsync.call(this, { $ref }, true);
		            }
		        }
		        async function _compileAsync(sch) {
		            try {
		                return this._compileSchemaEnv(sch);
		            }
		            catch (e) {
		                if (!(e instanceof ref_error_1.default))
		                    throw e;
		                checkLoaded.call(this, e);
		                await loadMissingSchema.call(this, e.missingSchema);
		                return _compileAsync.call(this, sch);
		            }
		        }
		        function checkLoaded({ missingSchema: ref, missingRef }) {
		            if (this.refs[ref]) {
		                throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
		            }
		        }
		        async function loadMissingSchema(ref) {
		            const _schema = await _loadSchema.call(this, ref);
		            if (!this.refs[ref])
		                await loadMetaSchema.call(this, _schema.$schema);
		            if (!this.refs[ref])
		                this.addSchema(_schema, ref, meta);
		        }
		        async function _loadSchema(ref) {
		            const p = this._loading[ref];
		            if (p)
		                return p;
		            try {
		                return await (this._loading[ref] = loadSchema(ref));
		            }
		            finally {
		                delete this._loading[ref];
		            }
		        }
		    }
		    // Adds schema to the instance
		    addSchema(schema, // If array is passed, `key` will be ignored
		    key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
		    _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
		    _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
		    ) {
		        if (Array.isArray(schema)) {
		            for (const sch of schema)
		                this.addSchema(sch, undefined, _meta, _validateSchema);
		            return this;
		        }
		        let id;
		        if (typeof schema === "object") {
		            const { schemaId } = this.opts;
		            id = schema[schemaId];
		            if (id !== undefined && typeof id != "string") {
		                throw new Error(`schema ${schemaId} must be string`);
		            }
		        }
		        key = (0, resolve_1.normalizeId)(key || id);
		        this._checkUnique(key);
		        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
		        return this;
		    }
		    // Add schema that will be used to validate other schemas
		    // options in META_IGNORE_OPTIONS are alway set to false
		    addMetaSchema(schema, key, // schema key
		    _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
		    ) {
		        this.addSchema(schema, key, true, _validateSchema);
		        return this;
		    }
		    //  Validate schema against its meta-schema
		    validateSchema(schema, throwOrLogError) {
		        if (typeof schema == "boolean")
		            return true;
		        let $schema;
		        $schema = schema.$schema;
		        if ($schema !== undefined && typeof $schema != "string") {
		            throw new Error("$schema must be a string");
		        }
		        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
		        if (!$schema) {
		            this.logger.warn("meta-schema not available");
		            this.errors = null;
		            return true;
		        }
		        const valid = this.validate($schema, schema);
		        if (!valid && throwOrLogError) {
		            const message = "schema is invalid: " + this.errorsText();
		            if (this.opts.validateSchema === "log")
		                this.logger.error(message);
		            else
		                throw new Error(message);
		        }
		        return valid;
		    }
		    // Get compiled schema by `key` or `ref`.
		    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
		    getSchema(keyRef) {
		        let sch;
		        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
		            keyRef = sch;
		        if (sch === undefined) {
		            const { schemaId } = this.opts;
		            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
		            sch = compile_1.resolveSchema.call(this, root, keyRef);
		            if (!sch)
		                return;
		            this.refs[keyRef] = sch;
		        }
		        return (sch.validate || this._compileSchemaEnv(sch));
		    }
		    // Remove cached schema(s).
		    // If no parameter is passed all schemas but meta-schemas are removed.
		    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
		    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
		    removeSchema(schemaKeyRef) {
		        if (schemaKeyRef instanceof RegExp) {
		            this._removeAllSchemas(this.schemas, schemaKeyRef);
		            this._removeAllSchemas(this.refs, schemaKeyRef);
		            return this;
		        }
		        switch (typeof schemaKeyRef) {
		            case "undefined":
		                this._removeAllSchemas(this.schemas);
		                this._removeAllSchemas(this.refs);
		                this._cache.clear();
		                return this;
		            case "string": {
		                const sch = getSchEnv.call(this, schemaKeyRef);
		                if (typeof sch == "object")
		                    this._cache.delete(sch.schema);
		                delete this.schemas[schemaKeyRef];
		                delete this.refs[schemaKeyRef];
		                return this;
		            }
		            case "object": {
		                const cacheKey = schemaKeyRef;
		                this._cache.delete(cacheKey);
		                let id = schemaKeyRef[this.opts.schemaId];
		                if (id) {
		                    id = (0, resolve_1.normalizeId)(id);
		                    delete this.schemas[id];
		                    delete this.refs[id];
		                }
		                return this;
		            }
		            default:
		                throw new Error("ajv.removeSchema: invalid parameter");
		        }
		    }
		    // add "vocabulary" - a collection of keywords
		    addVocabulary(definitions) {
		        for (const def of definitions)
		            this.addKeyword(def);
		        return this;
		    }
		    addKeyword(kwdOrDef, def // deprecated
		    ) {
		        let keyword;
		        if (typeof kwdOrDef == "string") {
		            keyword = kwdOrDef;
		            if (typeof def == "object") {
		                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
		                def.keyword = keyword;
		            }
		        }
		        else if (typeof kwdOrDef == "object" && def === undefined) {
		            def = kwdOrDef;
		            keyword = def.keyword;
		            if (Array.isArray(keyword) && !keyword.length) {
		                throw new Error("addKeywords: keyword must be string or non-empty array");
		            }
		        }
		        else {
		            throw new Error("invalid addKeywords parameters");
		        }
		        checkKeyword.call(this, keyword, def);
		        if (!def) {
		            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
		            return this;
		        }
		        keywordMetaschema.call(this, def);
		        const definition = {
		            ...def,
		            type: (0, dataType_1.getJSONTypes)(def.type),
		            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType),
		        };
		        (0, util_1.eachItem)(keyword, definition.type.length === 0
		            ? (k) => addRule.call(this, k, definition)
		            : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
		        return this;
		    }
		    getKeyword(keyword) {
		        const rule = this.RULES.all[keyword];
		        return typeof rule == "object" ? rule.definition : !!rule;
		    }
		    // Remove keyword
		    removeKeyword(keyword) {
		        // TODO return type should be Ajv
		        const { RULES } = this;
		        delete RULES.keywords[keyword];
		        delete RULES.all[keyword];
		        for (const group of RULES.rules) {
		            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
		            if (i >= 0)
		                group.rules.splice(i, 1);
		        }
		        return this;
		    }
		    // Add format
		    addFormat(name, format) {
		        if (typeof format == "string")
		            format = new RegExp(format);
		        this.formats[name] = format;
		        return this;
		    }
		    errorsText(errors = this.errors, // optional array of validation errors
		    { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
		    ) {
		        if (!errors || errors.length === 0)
		            return "No errors";
		        return errors
		            .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
		            .reduce((text, msg) => text + separator + msg);
		    }
		    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
		        const rules = this.RULES.all;
		        metaSchema = JSON.parse(JSON.stringify(metaSchema));
		        for (const jsonPointer of keywordsJsonPointers) {
		            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
		            let keywords = metaSchema;
		            for (const seg of segments)
		                keywords = keywords[seg];
		            for (const key in rules) {
		                const rule = rules[key];
		                if (typeof rule != "object")
		                    continue;
		                const { $data } = rule.definition;
		                const schema = keywords[key];
		                if ($data && schema)
		                    keywords[key] = schemaOrData(schema);
		            }
		        }
		        return metaSchema;
		    }
		    _removeAllSchemas(schemas, regex) {
		        for (const keyRef in schemas) {
		            const sch = schemas[keyRef];
		            if (!regex || regex.test(keyRef)) {
		                if (typeof sch == "string") {
		                    delete schemas[keyRef];
		                }
		                else if (sch && !sch.meta) {
		                    this._cache.delete(sch.schema);
		                    delete schemas[keyRef];
		                }
		            }
		        }
		    }
		    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
		        let id;
		        const { schemaId } = this.opts;
		        if (typeof schema == "object") {
		            id = schema[schemaId];
		        }
		        else {
		            if (this.opts.jtd)
		                throw new Error("schema must be object");
		            else if (typeof schema != "boolean")
		                throw new Error("schema must be object or boolean");
		        }
		        let sch = this._cache.get(schema);
		        if (sch !== undefined)
		            return sch;
		        baseId = (0, resolve_1.normalizeId)(id || baseId);
		        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
		        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
		        this._cache.set(sch.schema, sch);
		        if (addSchema && !baseId.startsWith("#")) {
		            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
		            if (baseId)
		                this._checkUnique(baseId);
		            this.refs[baseId] = sch;
		        }
		        if (validateSchema)
		            this.validateSchema(schema, true);
		        return sch;
		    }
		    _checkUnique(id) {
		        if (this.schemas[id] || this.refs[id]) {
		            throw new Error(`schema with key or id "${id}" already exists`);
		        }
		    }
		    _compileSchemaEnv(sch) {
		        if (sch.meta)
		            this._compileMetaSchema(sch);
		        else
		            compile_1.compileSchema.call(this, sch);
		        /* istanbul ignore if */
		        if (!sch.validate)
		            throw new Error("ajv implementation error");
		        return sch.validate;
		    }
		    _compileMetaSchema(sch) {
		        const currentOpts = this.opts;
		        this.opts = this._metaOpts;
		        try {
		            compile_1.compileSchema.call(this, sch);
		        }
		        finally {
		            this.opts = currentOpts;
		        }
		    }
		}
		Ajv.ValidationError = validation_error_1.default;
		Ajv.MissingRefError = ref_error_1.default;
		exports.default = Ajv;
		function checkOptions(checkOpts, options, msg, log = "error") {
		    for (const key in checkOpts) {
		        const opt = key;
		        if (opt in options)
		            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
		    }
		}
		function getSchEnv(keyRef) {
		    keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
		    return this.schemas[keyRef] || this.refs[keyRef];
		}
		function addInitialSchemas() {
		    const optsSchemas = this.opts.schemas;
		    if (!optsSchemas)
		        return;
		    if (Array.isArray(optsSchemas))
		        this.addSchema(optsSchemas);
		    else
		        for (const key in optsSchemas)
		            this.addSchema(optsSchemas[key], key);
		}
		function addInitialFormats() {
		    for (const name in this.opts.formats) {
		        const format = this.opts.formats[name];
		        if (format)
		            this.addFormat(name, format);
		    }
		}
		function addInitialKeywords(defs) {
		    if (Array.isArray(defs)) {
		        this.addVocabulary(defs);
		        return;
		    }
		    this.logger.warn("keywords option as map is deprecated, pass array");
		    for (const keyword in defs) {
		        const def = defs[keyword];
		        if (!def.keyword)
		            def.keyword = keyword;
		        this.addKeyword(def);
		    }
		}
		function getMetaSchemaOptions() {
		    const metaOpts = { ...this.opts };
		    for (const opt of META_IGNORE_OPTIONS)
		        delete metaOpts[opt];
		    return metaOpts;
		}
		const noLogs = { log() { }, warn() { }, error() { } };
		function getLogger(logger) {
		    if (logger === false)
		        return noLogs;
		    if (logger === undefined)
		        return console;
		    if (logger.log && logger.warn && logger.error)
		        return logger;
		    throw new Error("logger must implement log, warn and error methods");
		}
		const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
		function checkKeyword(keyword, def) {
		    const { RULES } = this;
		    (0, util_1.eachItem)(keyword, (kwd) => {
		        if (RULES.keywords[kwd])
		            throw new Error(`Keyword ${kwd} is already defined`);
		        if (!KEYWORD_NAME.test(kwd))
		            throw new Error(`Keyword ${kwd} has invalid name`);
		    });
		    if (!def)
		        return;
		    if (def.$data && !("code" in def || "validate" in def)) {
		        throw new Error('$data keyword must have "code" or "validate" function');
		    }
		}
		function addRule(keyword, definition, dataType) {
		    var _a;
		    const post = definition === null || definition === void 0 ? void 0 : definition.post;
		    if (dataType && post)
		        throw new Error('keyword with "post" flag cannot have "type"');
		    const { RULES } = this;
		    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
		    if (!ruleGroup) {
		        ruleGroup = { type: dataType, rules: [] };
		        RULES.rules.push(ruleGroup);
		    }
		    RULES.keywords[keyword] = true;
		    if (!definition)
		        return;
		    const rule = {
		        keyword,
		        definition: {
		            ...definition,
		            type: (0, dataType_1.getJSONTypes)(definition.type),
		            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType),
		        },
		    };
		    if (definition.before)
		        addBeforeRule.call(this, ruleGroup, rule, definition.before);
		    else
		        ruleGroup.rules.push(rule);
		    RULES.all[keyword] = rule;
		    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
		}
		function addBeforeRule(ruleGroup, rule, before) {
		    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
		    if (i >= 0) {
		        ruleGroup.rules.splice(i, 0, rule);
		    }
		    else {
		        ruleGroup.rules.push(rule);
		        this.logger.warn(`rule ${before} is not defined`);
		    }
		}
		function keywordMetaschema(def) {
		    let { metaSchema } = def;
		    if (metaSchema === undefined)
		        return;
		    if (def.$data && this.opts.$data)
		        metaSchema = schemaOrData(metaSchema);
		    def.validateSchema = this.compile(metaSchema, true);
		}
		const $dataRef = {
		    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
		};
		function schemaOrData(schema) {
		    return { anyOf: [schema, $dataRef] };
		}
		
	} (core$1));
	return core$1;
}

var draft7 = {};

var core = {};

var id = {};

var hasRequiredId;

function requireId () {
	if (hasRequiredId) return id;
	hasRequiredId = 1;
	Object.defineProperty(id, "__esModule", { value: true });
	const def = {
	    keyword: "id",
	    code() {
	        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
	    },
	};
	id.default = def;
	
	return id;
}

var ref = {};

var hasRequiredRef;

function requireRef () {
	if (hasRequiredRef) return ref;
	hasRequiredRef = 1;
	Object.defineProperty(ref, "__esModule", { value: true });
	ref.callRef = ref.getValidate = void 0;
	const ref_error_1 = requireRef_error();
	const code_1 = requireCode();
	const codegen_1 = requireCodegen();
	const names_1 = requireNames();
	const compile_1 = requireCompile();
	const util_1 = requireUtil();
	const def = {
	    keyword: "$ref",
	    schemaType: "string",
	    code(cxt) {
	        const { gen, schema: $ref, it } = cxt;
	        const { baseId, schemaEnv: env, validateName, opts, self } = it;
	        const { root } = env;
	        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
	            return callRootRef();
	        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
	        if (schOrEnv === undefined)
	            throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
	        if (schOrEnv instanceof compile_1.SchemaEnv)
	            return callValidate(schOrEnv);
	        return inlineRefSchema(schOrEnv);
	        function callRootRef() {
	            if (env === root)
	                return callRef(cxt, validateName, env, env.$async);
	            const rootName = gen.scopeValue("root", { ref: root });
	            return callRef(cxt, (0, codegen_1._) `${rootName}.validate`, root, root.$async);
	        }
	        function callValidate(sch) {
	            const v = getValidate(cxt, sch);
	            callRef(cxt, v, sch, sch.$async);
	        }
	        function inlineRefSchema(sch) {
	            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
	            const valid = gen.name("valid");
	            const schCxt = cxt.subschema({
	                schema: sch,
	                dataTypes: [],
	                schemaPath: codegen_1.nil,
	                topSchemaRef: schName,
	                errSchemaPath: $ref,
	            }, valid);
	            cxt.mergeEvaluated(schCxt);
	            cxt.ok(valid);
	        }
	    },
	};
	function getValidate(cxt, sch) {
	    const { gen } = cxt;
	    return sch.validate
	        ? gen.scopeValue("validate", { ref: sch.validate })
	        : (0, codegen_1._) `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
	}
	ref.getValidate = getValidate;
	function callRef(cxt, v, sch, $async) {
	    const { gen, it } = cxt;
	    const { allErrors, schemaEnv: env, opts } = it;
	    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
	    if ($async)
	        callAsyncRef();
	    else
	        callSyncRef();
	    function callAsyncRef() {
	        if (!env.$async)
	            throw new Error("async schema referenced by sync schema");
	        const valid = gen.let("valid");
	        gen.try(() => {
	            gen.code((0, codegen_1._) `await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
	            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
	            if (!allErrors)
	                gen.assign(valid, true);
	        }, (e) => {
	            gen.if((0, codegen_1._) `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
	            addErrorsFrom(e);
	            if (!allErrors)
	                gen.assign(valid, false);
	        });
	        cxt.ok(valid);
	    }
	    function callSyncRef() {
	        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
	    }
	    function addErrorsFrom(source) {
	        const errs = (0, codegen_1._) `${source}.errors`;
	        gen.assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
	        gen.assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
	    }
	    function addEvaluatedFrom(source) {
	        var _a;
	        if (!it.opts.unevaluated)
	            return;
	        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
	        // TODO refactor
	        if (it.props !== true) {
	            if (schEvaluated && !schEvaluated.dynamicProps) {
	                if (schEvaluated.props !== undefined) {
	                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
	                }
	            }
	            else {
	                const props = gen.var("props", (0, codegen_1._) `${source}.evaluated.props`);
	                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
	            }
	        }
	        if (it.items !== true) {
	            if (schEvaluated && !schEvaluated.dynamicItems) {
	                if (schEvaluated.items !== undefined) {
	                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
	                }
	            }
	            else {
	                const items = gen.var("items", (0, codegen_1._) `${source}.evaluated.items`);
	                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
	            }
	        }
	    }
	}
	ref.callRef = callRef;
	ref.default = def;
	
	return ref;
}

var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core;
	hasRequiredCore = 1;
	Object.defineProperty(core, "__esModule", { value: true });
	const id_1 = requireId();
	const ref_1 = requireRef();
	const core$1 = [
	    "$schema",
	    "$id",
	    "$defs",
	    "$vocabulary",
	    { keyword: "$comment" },
	    "definitions",
	    id_1.default,
	    ref_1.default,
	];
	core.default = core$1;
	
	return core;
}

var validation = {};

var limitNumber = {};

var hasRequiredLimitNumber;

function requireLimitNumber () {
	if (hasRequiredLimitNumber) return limitNumber;
	hasRequiredLimitNumber = 1;
	Object.defineProperty(limitNumber, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const ops = codegen_1.operators;
	const KWDs = {
	    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
	    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
	    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
	    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
	};
	const error = {
	    message: ({ keyword, schemaCode }) => (0, codegen_1.str) `must be ${KWDs[keyword].okStr} ${schemaCode}`,
	    params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
	};
	const def = {
	    keyword: Object.keys(KWDs),
	    type: "number",
	    schemaType: "number",
	    $data: true,
	    error,
	    code(cxt) {
	        const { keyword, data, schemaCode } = cxt;
	        cxt.fail$data((0, codegen_1._) `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
	    },
	};
	limitNumber.default = def;
	
	return limitNumber;
}

var multipleOf = {};

var hasRequiredMultipleOf;

function requireMultipleOf () {
	if (hasRequiredMultipleOf) return multipleOf;
	hasRequiredMultipleOf = 1;
	Object.defineProperty(multipleOf, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const error = {
	    message: ({ schemaCode }) => (0, codegen_1.str) `must be multiple of ${schemaCode}`,
	    params: ({ schemaCode }) => (0, codegen_1._) `{multipleOf: ${schemaCode}}`,
	};
	const def = {
	    keyword: "multipleOf",
	    type: "number",
	    schemaType: "number",
	    $data: true,
	    error,
	    code(cxt) {
	        const { gen, data, schemaCode, it } = cxt;
	        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
	        const prec = it.opts.multipleOfPrecision;
	        const res = gen.let("res");
	        const invalid = prec
	            ? (0, codegen_1._) `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
	            : (0, codegen_1._) `${res} !== parseInt(${res})`;
	        cxt.fail$data((0, codegen_1._) `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
	    },
	};
	multipleOf.default = def;
	
	return multipleOf;
}

var limitLength = {};

var ucs2length = {};

var hasRequiredUcs2length;

function requireUcs2length () {
	if (hasRequiredUcs2length) return ucs2length;
	hasRequiredUcs2length = 1;
	Object.defineProperty(ucs2length, "__esModule", { value: true });
	// https://mathiasbynens.be/notes/javascript-encoding
	// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
	function ucs2length$1(str) {
	    const len = str.length;
	    let length = 0;
	    let pos = 0;
	    let value;
	    while (pos < len) {
	        length++;
	        value = str.charCodeAt(pos++);
	        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
	            // high surrogate, and there is a next character
	            value = str.charCodeAt(pos);
	            if ((value & 0xfc00) === 0xdc00)
	                pos++; // low surrogate
	        }
	    }
	    return length;
	}
	ucs2length.default = ucs2length$1;
	ucs2length$1.code = 'require("ajv/dist/runtime/ucs2length").default';
	
	return ucs2length;
}

var hasRequiredLimitLength;

function requireLimitLength () {
	if (hasRequiredLimitLength) return limitLength;
	hasRequiredLimitLength = 1;
	Object.defineProperty(limitLength, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const ucs2length_1 = requireUcs2length();
	const error = {
	    message({ keyword, schemaCode }) {
	        const comp = keyword === "maxLength" ? "more" : "fewer";
	        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} characters`;
	    },
	    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
	};
	const def = {
	    keyword: ["maxLength", "minLength"],
	    type: "string",
	    schemaType: "number",
	    $data: true,
	    error,
	    code(cxt) {
	        const { keyword, data, schemaCode, it } = cxt;
	        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
	        const len = it.opts.unicode === false ? (0, codegen_1._) `${data}.length` : (0, codegen_1._) `${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
	        cxt.fail$data((0, codegen_1._) `${len} ${op} ${schemaCode}`);
	    },
	};
	limitLength.default = def;
	
	return limitLength;
}

var pattern = {};

var hasRequiredPattern;

function requirePattern () {
	if (hasRequiredPattern) return pattern;
	hasRequiredPattern = 1;
	Object.defineProperty(pattern, "__esModule", { value: true });
	const code_1 = requireCode();
	const codegen_1 = requireCodegen();
	const error = {
	    message: ({ schemaCode }) => (0, codegen_1.str) `must match pattern "${schemaCode}"`,
	    params: ({ schemaCode }) => (0, codegen_1._) `{pattern: ${schemaCode}}`,
	};
	const def = {
	    keyword: "pattern",
	    type: "string",
	    schemaType: "string",
	    $data: true,
	    error,
	    code(cxt) {
	        const { data, $data, schema, schemaCode, it } = cxt;
	        // TODO regexp should be wrapped in try/catchs
	        const u = it.opts.unicodeRegExp ? "u" : "";
	        const regExp = $data ? (0, codegen_1._) `(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
	        cxt.fail$data((0, codegen_1._) `!${regExp}.test(${data})`);
	    },
	};
	pattern.default = def;
	
	return pattern;
}

var limitProperties = {};

var hasRequiredLimitProperties;

function requireLimitProperties () {
	if (hasRequiredLimitProperties) return limitProperties;
	hasRequiredLimitProperties = 1;
	Object.defineProperty(limitProperties, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const error = {
	    message({ keyword, schemaCode }) {
	        const comp = keyword === "maxProperties" ? "more" : "fewer";
	        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} properties`;
	    },
	    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
	};
	const def = {
	    keyword: ["maxProperties", "minProperties"],
	    type: "object",
	    schemaType: "number",
	    $data: true,
	    error,
	    code(cxt) {
	        const { keyword, data, schemaCode } = cxt;
	        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
	        cxt.fail$data((0, codegen_1._) `Object.keys(${data}).length ${op} ${schemaCode}`);
	    },
	};
	limitProperties.default = def;
	
	return limitProperties;
}

var required = {};

var hasRequiredRequired;

function requireRequired () {
	if (hasRequiredRequired) return required;
	hasRequiredRequired = 1;
	Object.defineProperty(required, "__esModule", { value: true });
	const code_1 = requireCode();
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const error = {
	    message: ({ params: { missingProperty } }) => (0, codegen_1.str) `must have required property '${missingProperty}'`,
	    params: ({ params: { missingProperty } }) => (0, codegen_1._) `{missingProperty: ${missingProperty}}`,
	};
	const def = {
	    keyword: "required",
	    type: "object",
	    schemaType: "array",
	    $data: true,
	    error,
	    code(cxt) {
	        const { gen, schema, schemaCode, data, $data, it } = cxt;
	        const { opts } = it;
	        if (!$data && schema.length === 0)
	            return;
	        const useLoop = schema.length >= opts.loopRequired;
	        if (it.allErrors)
	            allErrorsMode();
	        else
	            exitOnErrorMode();
	        if (opts.strictRequired) {
	            const props = cxt.parentSchema.properties;
	            const { definedProperties } = cxt.it;
	            for (const requiredKey of schema) {
	                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
	                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
	                    const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
	                    (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
	                }
	            }
	        }
	        function allErrorsMode() {
	            if (useLoop || $data) {
	                cxt.block$data(codegen_1.nil, loopAllRequired);
	            }
	            else {
	                for (const prop of schema) {
	                    (0, code_1.checkReportMissingProp)(cxt, prop);
	                }
	            }
	        }
	        function exitOnErrorMode() {
	            const missing = gen.let("missing");
	            if (useLoop || $data) {
	                const valid = gen.let("valid", true);
	                cxt.block$data(valid, () => loopUntilMissing(missing, valid));
	                cxt.ok(valid);
	            }
	            else {
	                gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
	                (0, code_1.reportMissingProp)(cxt, missing);
	                gen.else();
	            }
	        }
	        function loopAllRequired() {
	            gen.forOf("prop", schemaCode, (prop) => {
	                cxt.setParams({ missingProperty: prop });
	                gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
	            });
	        }
	        function loopUntilMissing(missing, valid) {
	            cxt.setParams({ missingProperty: missing });
	            gen.forOf(missing, schemaCode, () => {
	                gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
	                gen.if((0, codegen_1.not)(valid), () => {
	                    cxt.error();
	                    gen.break();
	                });
	            }, codegen_1.nil);
	        }
	    },
	};
	required.default = def;
	
	return required;
}

var limitItems = {};

var hasRequiredLimitItems;

function requireLimitItems () {
	if (hasRequiredLimitItems) return limitItems;
	hasRequiredLimitItems = 1;
	Object.defineProperty(limitItems, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const error = {
	    message({ keyword, schemaCode }) {
	        const comp = keyword === "maxItems" ? "more" : "fewer";
	        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
	    },
	    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
	};
	const def = {
	    keyword: ["maxItems", "minItems"],
	    type: "array",
	    schemaType: "number",
	    $data: true,
	    error,
	    code(cxt) {
	        const { keyword, data, schemaCode } = cxt;
	        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
	        cxt.fail$data((0, codegen_1._) `${data}.length ${op} ${schemaCode}`);
	    },
	};
	limitItems.default = def;
	
	return limitItems;
}

var uniqueItems = {};

var equal = {};

var hasRequiredEqual;

function requireEqual () {
	if (hasRequiredEqual) return equal;
	hasRequiredEqual = 1;
	Object.defineProperty(equal, "__esModule", { value: true });
	// https://github.com/ajv-validator/ajv/issues/889
	const equal$1 = requireFastDeepEqual();
	equal$1.code = 'require("ajv/dist/runtime/equal").default';
	equal.default = equal$1;
	
	return equal;
}

var hasRequiredUniqueItems;

function requireUniqueItems () {
	if (hasRequiredUniqueItems) return uniqueItems;
	hasRequiredUniqueItems = 1;
	Object.defineProperty(uniqueItems, "__esModule", { value: true });
	const dataType_1 = requireDataType();
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const equal_1 = requireEqual();
	const error = {
	    message: ({ params: { i, j } }) => (0, codegen_1.str) `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
	    params: ({ params: { i, j } }) => (0, codegen_1._) `{i: ${i}, j: ${j}}`,
	};
	const def = {
	    keyword: "uniqueItems",
	    type: "array",
	    schemaType: "boolean",
	    $data: true,
	    error,
	    code(cxt) {
	        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
	        if (!$data && !schema)
	            return;
	        const valid = gen.let("valid");
	        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
	        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._) `${schemaCode} === false`);
	        cxt.ok(valid);
	        function validateUniqueItems() {
	            const i = gen.let("i", (0, codegen_1._) `${data}.length`);
	            const j = gen.let("j");
	            cxt.setParams({ i, j });
	            gen.assign(valid, true);
	            gen.if((0, codegen_1._) `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
	        }
	        function canOptimize() {
	            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
	        }
	        function loopN(i, j) {
	            const item = gen.name("item");
	            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
	            const indices = gen.const("indices", (0, codegen_1._) `{}`);
	            gen.for((0, codegen_1._) `;${i}--;`, () => {
	                gen.let(item, (0, codegen_1._) `${data}[${i}]`);
	                gen.if(wrongType, (0, codegen_1._) `continue`);
	                if (itemTypes.length > 1)
	                    gen.if((0, codegen_1._) `typeof ${item} == "string"`, (0, codegen_1._) `${item} += "_"`);
	                gen
	                    .if((0, codegen_1._) `typeof ${indices}[${item}] == "number"`, () => {
	                    gen.assign(j, (0, codegen_1._) `${indices}[${item}]`);
	                    cxt.error();
	                    gen.assign(valid, false).break();
	                })
	                    .code((0, codegen_1._) `${indices}[${item}] = ${i}`);
	            });
	        }
	        function loopN2(i, j) {
	            const eql = (0, util_1.useFunc)(gen, equal_1.default);
	            const outer = gen.name("outer");
	            gen.label(outer).for((0, codegen_1._) `;${i}--;`, () => gen.for((0, codegen_1._) `${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._) `${eql}(${data}[${i}], ${data}[${j}])`, () => {
	                cxt.error();
	                gen.assign(valid, false).break(outer);
	            })));
	        }
	    },
	};
	uniqueItems.default = def;
	
	return uniqueItems;
}

var _const = {};

var hasRequired_const;

function require_const () {
	if (hasRequired_const) return _const;
	hasRequired_const = 1;
	Object.defineProperty(_const, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const equal_1 = requireEqual();
	const error = {
	    message: "must be equal to constant",
	    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValue: ${schemaCode}}`,
	};
	const def = {
	    keyword: "const",
	    $data: true,
	    error,
	    code(cxt) {
	        const { gen, data, $data, schemaCode, schema } = cxt;
	        if ($data || (schema && typeof schema == "object")) {
	            cxt.fail$data((0, codegen_1._) `!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
	        }
	        else {
	            cxt.fail((0, codegen_1._) `${schema} !== ${data}`);
	        }
	    },
	};
	_const.default = def;
	
	return _const;
}

var _enum = {};

var hasRequired_enum;

function require_enum () {
	if (hasRequired_enum) return _enum;
	hasRequired_enum = 1;
	Object.defineProperty(_enum, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const equal_1 = requireEqual();
	const error = {
	    message: "must be equal to one of the allowed values",
	    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValues: ${schemaCode}}`,
	};
	const def = {
	    keyword: "enum",
	    schemaType: "array",
	    $data: true,
	    error,
	    code(cxt) {
	        const { gen, data, $data, schema, schemaCode, it } = cxt;
	        if (!$data && schema.length === 0)
	            throw new Error("enum must have non-empty array");
	        const useLoop = schema.length >= it.opts.loopEnum;
	        let eql;
	        const getEql = () => (eql !== null && eql !== void 0 ? eql : (eql = (0, util_1.useFunc)(gen, equal_1.default)));
	        let valid;
	        if (useLoop || $data) {
	            valid = gen.let("valid");
	            cxt.block$data(valid, loopEnum);
	        }
	        else {
	            /* istanbul ignore if */
	            if (!Array.isArray(schema))
	                throw new Error("ajv implementation error");
	            const vSchema = gen.const("vSchema", schemaCode);
	            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
	        }
	        cxt.pass(valid);
	        function loopEnum() {
	            gen.assign(valid, false);
	            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._) `${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
	        }
	        function equalCode(vSchema, i) {
	            const sch = schema[i];
	            return typeof sch === "object" && sch !== null
	                ? (0, codegen_1._) `${getEql()}(${data}, ${vSchema}[${i}])`
	                : (0, codegen_1._) `${data} === ${sch}`;
	        }
	    },
	};
	_enum.default = def;
	
	return _enum;
}

var hasRequiredValidation;

function requireValidation () {
	if (hasRequiredValidation) return validation;
	hasRequiredValidation = 1;
	Object.defineProperty(validation, "__esModule", { value: true });
	const limitNumber_1 = requireLimitNumber();
	const multipleOf_1 = requireMultipleOf();
	const limitLength_1 = requireLimitLength();
	const pattern_1 = requirePattern();
	const limitProperties_1 = requireLimitProperties();
	const required_1 = requireRequired();
	const limitItems_1 = requireLimitItems();
	const uniqueItems_1 = requireUniqueItems();
	const const_1 = require_const();
	const enum_1 = require_enum();
	const validation$1 = [
	    // number
	    limitNumber_1.default,
	    multipleOf_1.default,
	    // string
	    limitLength_1.default,
	    pattern_1.default,
	    // object
	    limitProperties_1.default,
	    required_1.default,
	    // array
	    limitItems_1.default,
	    uniqueItems_1.default,
	    // any
	    { keyword: "type", schemaType: ["string", "array"] },
	    { keyword: "nullable", schemaType: "boolean" },
	    const_1.default,
	    enum_1.default,
	];
	validation.default = validation$1;
	
	return validation;
}

var applicator = {};

var additionalItems = {};

var hasRequiredAdditionalItems;

function requireAdditionalItems () {
	if (hasRequiredAdditionalItems) return additionalItems;
	hasRequiredAdditionalItems = 1;
	Object.defineProperty(additionalItems, "__esModule", { value: true });
	additionalItems.validateAdditionalItems = void 0;
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const error = {
	    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
	    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
	};
	const def = {
	    keyword: "additionalItems",
	    type: "array",
	    schemaType: ["boolean", "object"],
	    before: "uniqueItems",
	    error,
	    code(cxt) {
	        const { parentSchema, it } = cxt;
	        const { items } = parentSchema;
	        if (!Array.isArray(items)) {
	            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
	            return;
	        }
	        validateAdditionalItems(cxt, items);
	    },
	};
	function validateAdditionalItems(cxt, items) {
	    const { gen, schema, data, keyword, it } = cxt;
	    it.items = true;
	    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
	    if (schema === false) {
	        cxt.setParams({ len: items.length });
	        cxt.pass((0, codegen_1._) `${len} <= ${items.length}`);
	    }
	    else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
	        const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items.length}`); // TODO var
	        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
	        cxt.ok(valid);
	    }
	    function validateItems(valid) {
	        gen.forRange("i", items.length, len, (i) => {
	            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
	            if (!it.allErrors)
	                gen.if((0, codegen_1.not)(valid), () => gen.break());
	        });
	    }
	}
	additionalItems.validateAdditionalItems = validateAdditionalItems;
	additionalItems.default = def;
	
	return additionalItems;
}

var prefixItems = {};

var items = {};

var hasRequiredItems;

function requireItems () {
	if (hasRequiredItems) return items;
	hasRequiredItems = 1;
	Object.defineProperty(items, "__esModule", { value: true });
	items.validateTuple = void 0;
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const code_1 = requireCode();
	const def = {
	    keyword: "items",
	    type: "array",
	    schemaType: ["object", "array", "boolean"],
	    before: "uniqueItems",
	    code(cxt) {
	        const { schema, it } = cxt;
	        if (Array.isArray(schema))
	            return validateTuple(cxt, "additionalItems", schema);
	        it.items = true;
	        if ((0, util_1.alwaysValidSchema)(it, schema))
	            return;
	        cxt.ok((0, code_1.validateArray)(cxt));
	    },
	};
	function validateTuple(cxt, extraItems, schArr = cxt.schema) {
	    const { gen, parentSchema, data, keyword, it } = cxt;
	    checkStrictTuple(parentSchema);
	    if (it.opts.unevaluated && schArr.length && it.items !== true) {
	        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
	    }
	    const valid = gen.name("valid");
	    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
	    schArr.forEach((sch, i) => {
	        if ((0, util_1.alwaysValidSchema)(it, sch))
	            return;
	        gen.if((0, codegen_1._) `${len} > ${i}`, () => cxt.subschema({
	            keyword,
	            schemaProp: i,
	            dataProp: i,
	        }, valid));
	        cxt.ok(valid);
	    });
	    function checkStrictTuple(sch) {
	        const { opts, errSchemaPath } = it;
	        const l = schArr.length;
	        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
	        if (opts.strictTuples && !fullTuple) {
	            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
	            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
	        }
	    }
	}
	items.validateTuple = validateTuple;
	items.default = def;
	
	return items;
}

var hasRequiredPrefixItems;

function requirePrefixItems () {
	if (hasRequiredPrefixItems) return prefixItems;
	hasRequiredPrefixItems = 1;
	Object.defineProperty(prefixItems, "__esModule", { value: true });
	const items_1 = requireItems();
	const def = {
	    keyword: "prefixItems",
	    type: "array",
	    schemaType: ["array"],
	    before: "uniqueItems",
	    code: (cxt) => (0, items_1.validateTuple)(cxt, "items"),
	};
	prefixItems.default = def;
	
	return prefixItems;
}

var items2020 = {};

var hasRequiredItems2020;

function requireItems2020 () {
	if (hasRequiredItems2020) return items2020;
	hasRequiredItems2020 = 1;
	Object.defineProperty(items2020, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const code_1 = requireCode();
	const additionalItems_1 = requireAdditionalItems();
	const error = {
	    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
	    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
	};
	const def = {
	    keyword: "items",
	    type: "array",
	    schemaType: ["object", "boolean"],
	    before: "uniqueItems",
	    error,
	    code(cxt) {
	        const { schema, parentSchema, it } = cxt;
	        const { prefixItems } = parentSchema;
	        it.items = true;
	        if ((0, util_1.alwaysValidSchema)(it, schema))
	            return;
	        if (prefixItems)
	            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
	        else
	            cxt.ok((0, code_1.validateArray)(cxt));
	    },
	};
	items2020.default = def;
	
	return items2020;
}

var contains = {};

var hasRequiredContains;

function requireContains () {
	if (hasRequiredContains) return contains;
	hasRequiredContains = 1;
	Object.defineProperty(contains, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const error = {
	    message: ({ params: { min, max } }) => max === undefined
	        ? (0, codegen_1.str) `must contain at least ${min} valid item(s)`
	        : (0, codegen_1.str) `must contain at least ${min} and no more than ${max} valid item(s)`,
	    params: ({ params: { min, max } }) => max === undefined ? (0, codegen_1._) `{minContains: ${min}}` : (0, codegen_1._) `{minContains: ${min}, maxContains: ${max}}`,
	};
	const def = {
	    keyword: "contains",
	    type: "array",
	    schemaType: ["object", "boolean"],
	    before: "uniqueItems",
	    trackErrors: true,
	    error,
	    code(cxt) {
	        const { gen, schema, parentSchema, data, it } = cxt;
	        let min;
	        let max;
	        const { minContains, maxContains } = parentSchema;
	        if (it.opts.next) {
	            min = minContains === undefined ? 1 : minContains;
	            max = maxContains;
	        }
	        else {
	            min = 1;
	        }
	        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
	        cxt.setParams({ min, max });
	        if (max === undefined && min === 0) {
	            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
	            return;
	        }
	        if (max !== undefined && min > max) {
	            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
	            cxt.fail();
	            return;
	        }
	        if ((0, util_1.alwaysValidSchema)(it, schema)) {
	            let cond = (0, codegen_1._) `${len} >= ${min}`;
	            if (max !== undefined)
	                cond = (0, codegen_1._) `${cond} && ${len} <= ${max}`;
	            cxt.pass(cond);
	            return;
	        }
	        it.items = true;
	        const valid = gen.name("valid");
	        if (max === undefined && min === 1) {
	            validateItems(valid, () => gen.if(valid, () => gen.break()));
	        }
	        else if (min === 0) {
	            gen.let(valid, true);
	            if (max !== undefined)
	                gen.if((0, codegen_1._) `${data}.length > 0`, validateItemsWithCount);
	        }
	        else {
	            gen.let(valid, false);
	            validateItemsWithCount();
	        }
	        cxt.result(valid, () => cxt.reset());
	        function validateItemsWithCount() {
	            const schValid = gen.name("_valid");
	            const count = gen.let("count", 0);
	            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
	        }
	        function validateItems(_valid, block) {
	            gen.forRange("i", 0, len, (i) => {
	                cxt.subschema({
	                    keyword: "contains",
	                    dataProp: i,
	                    dataPropType: util_1.Type.Num,
	                    compositeRule: true,
	                }, _valid);
	                block();
	            });
	        }
	        function checkLimits(count) {
	            gen.code((0, codegen_1._) `${count}++`);
	            if (max === undefined) {
	                gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true).break());
	            }
	            else {
	                gen.if((0, codegen_1._) `${count} > ${max}`, () => gen.assign(valid, false).break());
	                if (min === 1)
	                    gen.assign(valid, true);
	                else
	                    gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true));
	            }
	        }
	    },
	};
	contains.default = def;
	
	return contains;
}

var dependencies = {};

var hasRequiredDependencies;

function requireDependencies () {
	if (hasRequiredDependencies) return dependencies;
	hasRequiredDependencies = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
		const codegen_1 = requireCodegen();
		const util_1 = requireUtil();
		const code_1 = requireCode();
		exports.error = {
		    message: ({ params: { property, depsCount, deps } }) => {
		        const property_ies = depsCount === 1 ? "property" : "properties";
		        return (0, codegen_1.str) `must have ${property_ies} ${deps} when property ${property} is present`;
		    },
		    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._) `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
		};
		const def = {
		    keyword: "dependencies",
		    type: "object",
		    schemaType: "object",
		    error: exports.error,
		    code(cxt) {
		        const [propDeps, schDeps] = splitDependencies(cxt);
		        validatePropertyDeps(cxt, propDeps);
		        validateSchemaDeps(cxt, schDeps);
		    },
		};
		function splitDependencies({ schema }) {
		    const propertyDeps = {};
		    const schemaDeps = {};
		    for (const key in schema) {
		        if (key === "__proto__")
		            continue;
		        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
		        deps[key] = schema[key];
		    }
		    return [propertyDeps, schemaDeps];
		}
		function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
		    const { gen, data, it } = cxt;
		    if (Object.keys(propertyDeps).length === 0)
		        return;
		    const missing = gen.let("missing");
		    for (const prop in propertyDeps) {
		        const deps = propertyDeps[prop];
		        if (deps.length === 0)
		            continue;
		        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
		        cxt.setParams({
		            property: prop,
		            depsCount: deps.length,
		            deps: deps.join(", "),
		        });
		        if (it.allErrors) {
		            gen.if(hasProperty, () => {
		                for (const depProp of deps) {
		                    (0, code_1.checkReportMissingProp)(cxt, depProp);
		                }
		            });
		        }
		        else {
		            gen.if((0, codegen_1._) `${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
		            (0, code_1.reportMissingProp)(cxt, missing);
		            gen.else();
		        }
		    }
		}
		exports.validatePropertyDeps = validatePropertyDeps;
		function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
		    const { gen, data, keyword, it } = cxt;
		    const valid = gen.name("valid");
		    for (const prop in schemaDeps) {
		        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
		            continue;
		        gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
		            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
		            cxt.mergeValidEvaluated(schCxt, valid);
		        }, () => gen.var(valid, true) // TODO var
		        );
		        cxt.ok(valid);
		    }
		}
		exports.validateSchemaDeps = validateSchemaDeps;
		exports.default = def;
		
	} (dependencies));
	return dependencies;
}

var propertyNames = {};

var hasRequiredPropertyNames;

function requirePropertyNames () {
	if (hasRequiredPropertyNames) return propertyNames;
	hasRequiredPropertyNames = 1;
	Object.defineProperty(propertyNames, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const error = {
	    message: "property name must be valid",
	    params: ({ params }) => (0, codegen_1._) `{propertyName: ${params.propertyName}}`,
	};
	const def = {
	    keyword: "propertyNames",
	    type: "object",
	    schemaType: ["object", "boolean"],
	    error,
	    code(cxt) {
	        const { gen, schema, data, it } = cxt;
	        if ((0, util_1.alwaysValidSchema)(it, schema))
	            return;
	        const valid = gen.name("valid");
	        gen.forIn("key", data, (key) => {
	            cxt.setParams({ propertyName: key });
	            cxt.subschema({
	                keyword: "propertyNames",
	                data: key,
	                dataTypes: ["string"],
	                propertyName: key,
	                compositeRule: true,
	            }, valid);
	            gen.if((0, codegen_1.not)(valid), () => {
	                cxt.error(true);
	                if (!it.allErrors)
	                    gen.break();
	            });
	        });
	        cxt.ok(valid);
	    },
	};
	propertyNames.default = def;
	
	return propertyNames;
}

var additionalProperties = {};

var hasRequiredAdditionalProperties;

function requireAdditionalProperties () {
	if (hasRequiredAdditionalProperties) return additionalProperties;
	hasRequiredAdditionalProperties = 1;
	Object.defineProperty(additionalProperties, "__esModule", { value: true });
	const code_1 = requireCode();
	const codegen_1 = requireCodegen();
	const names_1 = requireNames();
	const util_1 = requireUtil();
	const error = {
	    message: "must NOT have additional properties",
	    params: ({ params }) => (0, codegen_1._) `{additionalProperty: ${params.additionalProperty}}`,
	};
	const def = {
	    keyword: "additionalProperties",
	    type: ["object"],
	    schemaType: ["boolean", "object"],
	    allowUndefined: true,
	    trackErrors: true,
	    error,
	    code(cxt) {
	        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
	        /* istanbul ignore if */
	        if (!errsCount)
	            throw new Error("ajv implementation error");
	        const { allErrors, opts } = it;
	        it.props = true;
	        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
	            return;
	        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
	        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
	        checkAdditionalProperties();
	        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
	        function checkAdditionalProperties() {
	            gen.forIn("key", data, (key) => {
	                if (!props.length && !patProps.length)
	                    additionalPropertyCode(key);
	                else
	                    gen.if(isAdditional(key), () => additionalPropertyCode(key));
	            });
	        }
	        function isAdditional(key) {
	            let definedProp;
	            if (props.length > 8) {
	                // TODO maybe an option instead of hard-coded 8?
	                const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
	                definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
	            }
	            else if (props.length) {
	                definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._) `${key} === ${p}`));
	            }
	            else {
	                definedProp = codegen_1.nil;
	            }
	            if (patProps.length) {
	                definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._) `${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
	            }
	            return (0, codegen_1.not)(definedProp);
	        }
	        function deleteAdditional(key) {
	            gen.code((0, codegen_1._) `delete ${data}[${key}]`);
	        }
	        function additionalPropertyCode(key) {
	            if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
	                deleteAdditional(key);
	                return;
	            }
	            if (schema === false) {
	                cxt.setParams({ additionalProperty: key });
	                cxt.error();
	                if (!allErrors)
	                    gen.break();
	                return;
	            }
	            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
	                const valid = gen.name("valid");
	                if (opts.removeAdditional === "failing") {
	                    applyAdditionalSchema(key, valid, false);
	                    gen.if((0, codegen_1.not)(valid), () => {
	                        cxt.reset();
	                        deleteAdditional(key);
	                    });
	                }
	                else {
	                    applyAdditionalSchema(key, valid);
	                    if (!allErrors)
	                        gen.if((0, codegen_1.not)(valid), () => gen.break());
	                }
	            }
	        }
	        function applyAdditionalSchema(key, valid, errors) {
	            const subschema = {
	                keyword: "additionalProperties",
	                dataProp: key,
	                dataPropType: util_1.Type.Str,
	            };
	            if (errors === false) {
	                Object.assign(subschema, {
	                    compositeRule: true,
	                    createErrors: false,
	                    allErrors: false,
	                });
	            }
	            cxt.subschema(subschema, valid);
	        }
	    },
	};
	additionalProperties.default = def;
	
	return additionalProperties;
}

var properties$1 = {};

var hasRequiredProperties;

function requireProperties () {
	if (hasRequiredProperties) return properties$1;
	hasRequiredProperties = 1;
	Object.defineProperty(properties$1, "__esModule", { value: true });
	const validate_1 = requireValidate();
	const code_1 = requireCode();
	const util_1 = requireUtil();
	const additionalProperties_1 = requireAdditionalProperties();
	const def = {
	    keyword: "properties",
	    type: "object",
	    schemaType: "object",
	    code(cxt) {
	        const { gen, schema, parentSchema, data, it } = cxt;
	        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
	            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
	        }
	        const allProps = (0, code_1.allSchemaProperties)(schema);
	        for (const prop of allProps) {
	            it.definedProperties.add(prop);
	        }
	        if (it.opts.unevaluated && allProps.length && it.props !== true) {
	            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
	        }
	        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
	        if (properties.length === 0)
	            return;
	        const valid = gen.name("valid");
	        for (const prop of properties) {
	            if (hasDefault(prop)) {
	                applyPropertySchema(prop);
	            }
	            else {
	                gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
	                applyPropertySchema(prop);
	                if (!it.allErrors)
	                    gen.else().var(valid, true);
	                gen.endIf();
	            }
	            cxt.it.definedProperties.add(prop);
	            cxt.ok(valid);
	        }
	        function hasDefault(prop) {
	            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
	        }
	        function applyPropertySchema(prop) {
	            cxt.subschema({
	                keyword: "properties",
	                schemaProp: prop,
	                dataProp: prop,
	            }, valid);
	        }
	    },
	};
	properties$1.default = def;
	
	return properties$1;
}

var patternProperties = {};

var hasRequiredPatternProperties;

function requirePatternProperties () {
	if (hasRequiredPatternProperties) return patternProperties;
	hasRequiredPatternProperties = 1;
	Object.defineProperty(patternProperties, "__esModule", { value: true });
	const code_1 = requireCode();
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const util_2 = requireUtil();
	const def = {
	    keyword: "patternProperties",
	    type: "object",
	    schemaType: "object",
	    code(cxt) {
	        const { gen, schema, data, parentSchema, it } = cxt;
	        const { opts } = it;
	        const patterns = (0, code_1.allSchemaProperties)(schema);
	        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
	        if (patterns.length === 0 ||
	            (alwaysValidPatterns.length === patterns.length &&
	                (!it.opts.unevaluated || it.props === true))) {
	            return;
	        }
	        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
	        const valid = gen.name("valid");
	        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
	            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
	        }
	        const { props } = it;
	        validatePatternProperties();
	        function validatePatternProperties() {
	            for (const pat of patterns) {
	                if (checkProperties)
	                    checkMatchingProperties(pat);
	                if (it.allErrors) {
	                    validateProperties(pat);
	                }
	                else {
	                    gen.var(valid, true); // TODO var
	                    validateProperties(pat);
	                    gen.if(valid);
	                }
	            }
	        }
	        function checkMatchingProperties(pat) {
	            for (const prop in checkProperties) {
	                if (new RegExp(pat).test(prop)) {
	                    (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
	                }
	            }
	        }
	        function validateProperties(pat) {
	            gen.forIn("key", data, (key) => {
	                gen.if((0, codegen_1._) `${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
	                    const alwaysValid = alwaysValidPatterns.includes(pat);
	                    if (!alwaysValid) {
	                        cxt.subschema({
	                            keyword: "patternProperties",
	                            schemaProp: pat,
	                            dataProp: key,
	                            dataPropType: util_2.Type.Str,
	                        }, valid);
	                    }
	                    if (it.opts.unevaluated && props !== true) {
	                        gen.assign((0, codegen_1._) `${props}[${key}]`, true);
	                    }
	                    else if (!alwaysValid && !it.allErrors) {
	                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
	                        // or if all properties were evaluated (props === true)
	                        gen.if((0, codegen_1.not)(valid), () => gen.break());
	                    }
	                });
	            });
	        }
	    },
	};
	patternProperties.default = def;
	
	return patternProperties;
}

var not = {};

var hasRequiredNot;

function requireNot () {
	if (hasRequiredNot) return not;
	hasRequiredNot = 1;
	Object.defineProperty(not, "__esModule", { value: true });
	const util_1 = requireUtil();
	const def = {
	    keyword: "not",
	    schemaType: ["object", "boolean"],
	    trackErrors: true,
	    code(cxt) {
	        const { gen, schema, it } = cxt;
	        if ((0, util_1.alwaysValidSchema)(it, schema)) {
	            cxt.fail();
	            return;
	        }
	        const valid = gen.name("valid");
	        cxt.subschema({
	            keyword: "not",
	            compositeRule: true,
	            createErrors: false,
	            allErrors: false,
	        }, valid);
	        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
	    },
	    error: { message: "must NOT be valid" },
	};
	not.default = def;
	
	return not;
}

var anyOf = {};

var hasRequiredAnyOf;

function requireAnyOf () {
	if (hasRequiredAnyOf) return anyOf;
	hasRequiredAnyOf = 1;
	Object.defineProperty(anyOf, "__esModule", { value: true });
	const code_1 = requireCode();
	const def = {
	    keyword: "anyOf",
	    schemaType: "array",
	    trackErrors: true,
	    code: code_1.validateUnion,
	    error: { message: "must match a schema in anyOf" },
	};
	anyOf.default = def;
	
	return anyOf;
}

var oneOf = {};

var hasRequiredOneOf;

function requireOneOf () {
	if (hasRequiredOneOf) return oneOf;
	hasRequiredOneOf = 1;
	Object.defineProperty(oneOf, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const error = {
	    message: "must match exactly one schema in oneOf",
	    params: ({ params }) => (0, codegen_1._) `{passingSchemas: ${params.passing}}`,
	};
	const def = {
	    keyword: "oneOf",
	    schemaType: "array",
	    trackErrors: true,
	    error,
	    code(cxt) {
	        const { gen, schema, parentSchema, it } = cxt;
	        /* istanbul ignore if */
	        if (!Array.isArray(schema))
	            throw new Error("ajv implementation error");
	        if (it.opts.discriminator && parentSchema.discriminator)
	            return;
	        const schArr = schema;
	        const valid = gen.let("valid", false);
	        const passing = gen.let("passing", null);
	        const schValid = gen.name("_valid");
	        cxt.setParams({ passing });
	        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
	        gen.block(validateOneOf);
	        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
	        function validateOneOf() {
	            schArr.forEach((sch, i) => {
	                let schCxt;
	                if ((0, util_1.alwaysValidSchema)(it, sch)) {
	                    gen.var(schValid, true);
	                }
	                else {
	                    schCxt = cxt.subschema({
	                        keyword: "oneOf",
	                        schemaProp: i,
	                        compositeRule: true,
	                    }, schValid);
	                }
	                if (i > 0) {
	                    gen
	                        .if((0, codegen_1._) `${schValid} && ${valid}`)
	                        .assign(valid, false)
	                        .assign(passing, (0, codegen_1._) `[${passing}, ${i}]`)
	                        .else();
	                }
	                gen.if(schValid, () => {
	                    gen.assign(valid, true);
	                    gen.assign(passing, i);
	                    if (schCxt)
	                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
	                });
	            });
	        }
	    },
	};
	oneOf.default = def;
	
	return oneOf;
}

var allOf = {};

var hasRequiredAllOf;

function requireAllOf () {
	if (hasRequiredAllOf) return allOf;
	hasRequiredAllOf = 1;
	Object.defineProperty(allOf, "__esModule", { value: true });
	const util_1 = requireUtil();
	const def = {
	    keyword: "allOf",
	    schemaType: "array",
	    code(cxt) {
	        const { gen, schema, it } = cxt;
	        /* istanbul ignore if */
	        if (!Array.isArray(schema))
	            throw new Error("ajv implementation error");
	        const valid = gen.name("valid");
	        schema.forEach((sch, i) => {
	            if ((0, util_1.alwaysValidSchema)(it, sch))
	                return;
	            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
	            cxt.ok(valid);
	            cxt.mergeEvaluated(schCxt);
	        });
	    },
	};
	allOf.default = def;
	
	return allOf;
}

var _if = {};

var hasRequired_if;

function require_if () {
	if (hasRequired_if) return _if;
	hasRequired_if = 1;
	Object.defineProperty(_if, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const util_1 = requireUtil();
	const error = {
	    message: ({ params }) => (0, codegen_1.str) `must match "${params.ifClause}" schema`,
	    params: ({ params }) => (0, codegen_1._) `{failingKeyword: ${params.ifClause}}`,
	};
	const def = {
	    keyword: "if",
	    schemaType: ["object", "boolean"],
	    trackErrors: true,
	    error,
	    code(cxt) {
	        const { gen, parentSchema, it } = cxt;
	        if (parentSchema.then === undefined && parentSchema.else === undefined) {
	            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
	        }
	        const hasThen = hasSchema(it, "then");
	        const hasElse = hasSchema(it, "else");
	        if (!hasThen && !hasElse)
	            return;
	        const valid = gen.let("valid", true);
	        const schValid = gen.name("_valid");
	        validateIf();
	        cxt.reset();
	        if (hasThen && hasElse) {
	            const ifClause = gen.let("ifClause");
	            cxt.setParams({ ifClause });
	            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
	        }
	        else if (hasThen) {
	            gen.if(schValid, validateClause("then"));
	        }
	        else {
	            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
	        }
	        cxt.pass(valid, () => cxt.error(true));
	        function validateIf() {
	            const schCxt = cxt.subschema({
	                keyword: "if",
	                compositeRule: true,
	                createErrors: false,
	                allErrors: false,
	            }, schValid);
	            cxt.mergeEvaluated(schCxt);
	        }
	        function validateClause(keyword, ifClause) {
	            return () => {
	                const schCxt = cxt.subschema({ keyword }, schValid);
	                gen.assign(valid, schValid);
	                cxt.mergeValidEvaluated(schCxt, valid);
	                if (ifClause)
	                    gen.assign(ifClause, (0, codegen_1._) `${keyword}`);
	                else
	                    cxt.setParams({ ifClause: keyword });
	            };
	        }
	    },
	};
	function hasSchema(it, keyword) {
	    const schema = it.schema[keyword];
	    return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
	}
	_if.default = def;
	
	return _if;
}

var thenElse = {};

var hasRequiredThenElse;

function requireThenElse () {
	if (hasRequiredThenElse) return thenElse;
	hasRequiredThenElse = 1;
	Object.defineProperty(thenElse, "__esModule", { value: true });
	const util_1 = requireUtil();
	const def = {
	    keyword: ["then", "else"],
	    schemaType: ["object", "boolean"],
	    code({ keyword, parentSchema, it }) {
	        if (parentSchema.if === undefined)
	            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
	    },
	};
	thenElse.default = def;
	
	return thenElse;
}

var hasRequiredApplicator;

function requireApplicator () {
	if (hasRequiredApplicator) return applicator;
	hasRequiredApplicator = 1;
	Object.defineProperty(applicator, "__esModule", { value: true });
	const additionalItems_1 = requireAdditionalItems();
	const prefixItems_1 = requirePrefixItems();
	const items_1 = requireItems();
	const items2020_1 = requireItems2020();
	const contains_1 = requireContains();
	const dependencies_1 = requireDependencies();
	const propertyNames_1 = requirePropertyNames();
	const additionalProperties_1 = requireAdditionalProperties();
	const properties_1 = requireProperties();
	const patternProperties_1 = requirePatternProperties();
	const not_1 = requireNot();
	const anyOf_1 = requireAnyOf();
	const oneOf_1 = requireOneOf();
	const allOf_1 = requireAllOf();
	const if_1 = require_if();
	const thenElse_1 = requireThenElse();
	function getApplicator(draft2020 = false) {
	    const applicator = [
	        // any
	        not_1.default,
	        anyOf_1.default,
	        oneOf_1.default,
	        allOf_1.default,
	        if_1.default,
	        thenElse_1.default,
	        // object
	        propertyNames_1.default,
	        additionalProperties_1.default,
	        dependencies_1.default,
	        properties_1.default,
	        patternProperties_1.default,
	    ];
	    // array
	    if (draft2020)
	        applicator.push(prefixItems_1.default, items2020_1.default);
	    else
	        applicator.push(additionalItems_1.default, items_1.default);
	    applicator.push(contains_1.default);
	    return applicator;
	}
	applicator.default = getApplicator;
	
	return applicator;
}

var format$1 = {};

var format = {};

var hasRequiredFormat$1;

function requireFormat$1 () {
	if (hasRequiredFormat$1) return format;
	hasRequiredFormat$1 = 1;
	Object.defineProperty(format, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const error = {
	    message: ({ schemaCode }) => (0, codegen_1.str) `must match format "${schemaCode}"`,
	    params: ({ schemaCode }) => (0, codegen_1._) `{format: ${schemaCode}}`,
	};
	const def = {
	    keyword: "format",
	    type: ["number", "string"],
	    schemaType: "string",
	    $data: true,
	    error,
	    code(cxt, ruleType) {
	        const { gen, data, $data, schema, schemaCode, it } = cxt;
	        const { opts, errSchemaPath, schemaEnv, self } = it;
	        if (!opts.validateFormats)
	            return;
	        if ($data)
	            validate$DataFormat();
	        else
	            validateFormat();
	        function validate$DataFormat() {
	            const fmts = gen.scopeValue("formats", {
	                ref: self.formats,
	                code: opts.code.formats,
	            });
	            const fDef = gen.const("fDef", (0, codegen_1._) `${fmts}[${schemaCode}]`);
	            const fType = gen.let("fType");
	            const format = gen.let("format");
	            // TODO simplify
	            gen.if((0, codegen_1._) `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._) `${fDef}.type || "string"`).assign(format, (0, codegen_1._) `${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._) `"string"`).assign(format, fDef));
	            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
	            function unknownFmt() {
	                if (opts.strictSchema === false)
	                    return codegen_1.nil;
	                return (0, codegen_1._) `${schemaCode} && !${format}`;
	            }
	            function invalidFmt() {
	                const callFormat = schemaEnv.$async
	                    ? (0, codegen_1._) `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
	                    : (0, codegen_1._) `${format}(${data})`;
	                const validData = (0, codegen_1._) `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
	                return (0, codegen_1._) `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
	            }
	        }
	        function validateFormat() {
	            const formatDef = self.formats[schema];
	            if (!formatDef) {
	                unknownFormat();
	                return;
	            }
	            if (formatDef === true)
	                return;
	            const [fmtType, format, fmtRef] = getFormat(formatDef);
	            if (fmtType === ruleType)
	                cxt.pass(validCondition());
	            function unknownFormat() {
	                if (opts.strictSchema === false) {
	                    self.logger.warn(unknownMsg());
	                    return;
	                }
	                throw new Error(unknownMsg());
	                function unknownMsg() {
	                    return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
	                }
	            }
	            function getFormat(fmtDef) {
	                const code = fmtDef instanceof RegExp
	                    ? (0, codegen_1.regexpCode)(fmtDef)
	                    : opts.code.formats
	                        ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(schema)}`
	                        : undefined;
	                const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
	                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
	                    return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._) `${fmt}.validate`];
	                }
	                return ["string", fmtDef, fmt];
	            }
	            function validCondition() {
	                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
	                    if (!schemaEnv.$async)
	                        throw new Error("async format in sync schema");
	                    return (0, codegen_1._) `await ${fmtRef}(${data})`;
	                }
	                return typeof format == "function" ? (0, codegen_1._) `${fmtRef}(${data})` : (0, codegen_1._) `${fmtRef}.test(${data})`;
	            }
	        }
	    },
	};
	format.default = def;
	
	return format;
}

var hasRequiredFormat;

function requireFormat () {
	if (hasRequiredFormat) return format$1;
	hasRequiredFormat = 1;
	Object.defineProperty(format$1, "__esModule", { value: true });
	const format_1 = requireFormat$1();
	const format = [format_1.default];
	format$1.default = format;
	
	return format$1;
}

var metadata = {};

var hasRequiredMetadata;

function requireMetadata () {
	if (hasRequiredMetadata) return metadata;
	hasRequiredMetadata = 1;
	Object.defineProperty(metadata, "__esModule", { value: true });
	metadata.contentVocabulary = metadata.metadataVocabulary = void 0;
	metadata.metadataVocabulary = [
	    "title",
	    "description",
	    "default",
	    "deprecated",
	    "readOnly",
	    "writeOnly",
	    "examples",
	];
	metadata.contentVocabulary = [
	    "contentMediaType",
	    "contentEncoding",
	    "contentSchema",
	];
	
	return metadata;
}

var hasRequiredDraft7;

function requireDraft7 () {
	if (hasRequiredDraft7) return draft7;
	hasRequiredDraft7 = 1;
	Object.defineProperty(draft7, "__esModule", { value: true });
	const core_1 = requireCore();
	const validation_1 = requireValidation();
	const applicator_1 = requireApplicator();
	const format_1 = requireFormat();
	const metadata_1 = requireMetadata();
	const draft7Vocabularies = [
	    core_1.default,
	    validation_1.default,
	    (0, applicator_1.default)(),
	    format_1.default,
	    metadata_1.metadataVocabulary,
	    metadata_1.contentVocabulary,
	];
	draft7.default = draft7Vocabularies;
	
	return draft7;
}

var discriminator = {};

var types = {};

var hasRequiredTypes;

function requireTypes () {
	if (hasRequiredTypes) return types;
	hasRequiredTypes = 1;
	Object.defineProperty(types, "__esModule", { value: true });
	types.DiscrError = void 0;
	var DiscrError;
	(function (DiscrError) {
	    DiscrError["Tag"] = "tag";
	    DiscrError["Mapping"] = "mapping";
	})(DiscrError || (types.DiscrError = DiscrError = {}));
	
	return types;
}

var hasRequiredDiscriminator;

function requireDiscriminator () {
	if (hasRequiredDiscriminator) return discriminator;
	hasRequiredDiscriminator = 1;
	Object.defineProperty(discriminator, "__esModule", { value: true });
	const codegen_1 = requireCodegen();
	const types_1 = requireTypes();
	const compile_1 = requireCompile();
	const ref_error_1 = requireRef_error();
	const util_1 = requireUtil();
	const error = {
	    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
	        ? `tag "${tagName}" must be string`
	        : `value of tag "${tagName}" must be in oneOf`,
	    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._) `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
	};
	const def = {
	    keyword: "discriminator",
	    type: "object",
	    schemaType: "object",
	    error,
	    code(cxt) {
	        const { gen, data, schema, parentSchema, it } = cxt;
	        const { oneOf } = parentSchema;
	        if (!it.opts.discriminator) {
	            throw new Error("discriminator: requires discriminator option");
	        }
	        const tagName = schema.propertyName;
	        if (typeof tagName != "string")
	            throw new Error("discriminator: requires propertyName");
	        if (schema.mapping)
	            throw new Error("discriminator: mapping is not supported");
	        if (!oneOf)
	            throw new Error("discriminator: requires oneOf keyword");
	        const valid = gen.let("valid", false);
	        const tag = gen.const("tag", (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(tagName)}`);
	        gen.if((0, codegen_1._) `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
	        cxt.ok(valid);
	        function validateMapping() {
	            const mapping = getMapping();
	            gen.if(false);
	            for (const tagValue in mapping) {
	                gen.elseIf((0, codegen_1._) `${tag} === ${tagValue}`);
	                gen.assign(valid, applyTagSchema(mapping[tagValue]));
	            }
	            gen.else();
	            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
	            gen.endIf();
	        }
	        function applyTagSchema(schemaProp) {
	            const _valid = gen.name("valid");
	            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
	            cxt.mergeEvaluated(schCxt, codegen_1.Name);
	            return _valid;
	        }
	        function getMapping() {
	            var _a;
	            const oneOfMapping = {};
	            const topRequired = hasRequired(parentSchema);
	            let tagRequired = true;
	            for (let i = 0; i < oneOf.length; i++) {
	                let sch = oneOf[i];
	                if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
	                    const ref = sch.$ref;
	                    sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
	                    if (sch instanceof compile_1.SchemaEnv)
	                        sch = sch.schema;
	                    if (sch === undefined)
	                        throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
	                }
	                const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
	                if (typeof propSch != "object") {
	                    throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
	                }
	                tagRequired = tagRequired && (topRequired || hasRequired(sch));
	                addMappings(propSch, i);
	            }
	            if (!tagRequired)
	                throw new Error(`discriminator: "${tagName}" must be required`);
	            return oneOfMapping;
	            function hasRequired({ required }) {
	                return Array.isArray(required) && required.includes(tagName);
	            }
	            function addMappings(sch, i) {
	                if (sch.const) {
	                    addMapping(sch.const, i);
	                }
	                else if (sch.enum) {
	                    for (const tagValue of sch.enum) {
	                        addMapping(tagValue, i);
	                    }
	                }
	                else {
	                    throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
	                }
	            }
	            function addMapping(tagValue, i) {
	                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
	                    throw new Error(`discriminator: "${tagName}" values must be unique strings`);
	                }
	                oneOfMapping[tagValue] = i;
	            }
	        }
	    },
	};
	discriminator.default = def;
	
	return discriminator;
}

var $schema = "http://json-schema.org/draft-07/schema#";
var $id = "http://json-schema.org/draft-07/schema#";
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
var require$$3 = {
	$schema: $schema,
	$id: $id,
	title: title,
	definitions: definitions,
	type: type,
	properties: properties,
	"default": true
};

var hasRequiredAjv;

function requireAjv () {
	if (hasRequiredAjv) return ajv$1.exports;
	hasRequiredAjv = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
		const core_1 = requireCore$1();
		const draft7_1 = requireDraft7();
		const discriminator_1 = requireDiscriminator();
		const draft7MetaSchema = require$$3;
		const META_SUPPORT_DATA = ["/properties"];
		const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
		class Ajv extends core_1.default {
		    _addVocabularies() {
		        super._addVocabularies();
		        draft7_1.default.forEach((v) => this.addVocabulary(v));
		        if (this.opts.discriminator)
		            this.addKeyword(discriminator_1.default);
		    }
		    _addDefaultMetaSchema() {
		        super._addDefaultMetaSchema();
		        if (!this.opts.meta)
		            return;
		        const metaSchema = this.opts.$data
		            ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA)
		            : draft7MetaSchema;
		        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
		        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
		    }
		    defaultMeta() {
		        return (this.opts.defaultMeta =
		            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
		    }
		}
		exports.Ajv = Ajv;
		module.exports = exports = Ajv;
		module.exports.Ajv = Ajv;
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = Ajv;
		var validate_1 = requireValidate();
		Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function () { return validate_1.KeywordCxt; } });
		var codegen_1 = requireCodegen();
		Object.defineProperty(exports, "_", { enumerable: true, get: function () { return codegen_1._; } });
		Object.defineProperty(exports, "str", { enumerable: true, get: function () { return codegen_1.str; } });
		Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return codegen_1.stringify; } });
		Object.defineProperty(exports, "nil", { enumerable: true, get: function () { return codegen_1.nil; } });
		Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return codegen_1.Name; } });
		Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return codegen_1.CodeGen; } });
		var validation_error_1 = requireValidation_error();
		Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return validation_error_1.default; } });
		var ref_error_1 = requireRef_error();
		Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function () { return ref_error_1.default; } });
		
	} (ajv$1, ajv$1.exports));
	return ajv$1.exports;
}

var ajvExports = requireAjv();
var Ajv = /*@__PURE__*/getDefaultExportFromCjs(ajvExports);

var en;
var hasRequiredEn;

function requireEn () {
	if (hasRequiredEn) return en;
	hasRequiredEn = 1;
	en = function localize_en(errors) {
	  if (!(errors && errors.length)) return
	  for (const e of errors) {
	    let out;
	    switch (e.keyword) {
	      case "additionalItems":
	      case "items":
	        out = "";
	        var n = e.params.limit;
	        out += "must NOT have more than " + n + " item";
	        if (n != 1) {
	          out += "s";
	        }
	        break
	      case "additionalProperties":
	        out = "must NOT have additional properties";
	        break
	      case "anyOf":
	        out = 'must match a schema in "anyOf"';
	        break
	      case "const":
	        out = "must be equal to constant";
	        break
	      case "contains":
	        out = "must contain a valid item";
	        break
	      case "dependencies":
	      case "dependentRequired":
	        out = "";
	        var n = e.params.depsCount;
	        out += "must have propert";
	        if (n == 1) {
	          out += "y";
	        } else {
	          out += "ies";
	        }
	        out +=
	          " " +
	          e.params.deps +
	          " when property " +
	          e.params.property +
	          " is present";
	        break
	      case "discriminator":
	        switch (e.params.error) {
	          case "tag":
	            out = 'tag "' + e.params.tag + '" must be string';
	            break
	          case "mapping":
	            out = 'value of tag "' + e.params.tag + '" must be in oneOf';
	            break
	          default:
	            out = 'must pass "' + e.keyword + '" keyword validation';
	        }
	        break
	      case "enum":
	        out = "must be equal to one of the allowed values";
	        break
	      case "false schema":
	        out = "boolean schema is false";
	        break
	      case "format":
	        out = 'must match format "' + e.params.format + '"';
	        break
	      case "formatMaximum":
	      case "formatExclusiveMaximum":
	        out = "";
	        var cond = e.params.comparison + " " + e.params.limit;
	        out += "must be " + cond;
	        break
	      case "formatMinimum":
	      case "formatExclusiveMinimum":
	        out = "";
	        var cond = e.params.comparison + " " + e.params.limit;
	        out += "must be " + cond;
	        break
	      case "if":
	        out = 'must match "' + e.params.failingKeyword + '" schema';
	        break
	      case "maximum":
	      case "exclusiveMaximum":
	        out = "";
	        var cond = e.params.comparison + " " + e.params.limit;
	        out += "must be " + cond;
	        break
	      case "maxItems":
	        out = "";
	        var n = e.params.limit;
	        out += "must NOT have more than " + n + " item";
	        if (n != 1) {
	          out += "s";
	        }
	        break
	      case "maxLength":
	        out = "";
	        var n = e.params.limit;
	        out += "must NOT be longer than " + n + " character";
	        if (n != 1) {
	          out += "s";
	        }
	        break
	      case "maxProperties":
	        out = "";
	        var n = e.params.limit;
	        out += "must NOT have more than " + n + " propert";
	        if (n == 1) {
	          out += "y";
	        } else {
	          out += "ies";
	        }
	        break
	      case "minimum":
	      case "exclusiveMinimum":
	        out = "";
	        var cond = e.params.comparison + " " + e.params.limit;
	        out += "must be " + cond;
	        break
	      case "minItems":
	        out = "";
	        var n = e.params.limit;
	        out += "must NOT have less than " + n + " item";
	        if (n != 1) {
	          out += "s";
	        }
	        break
	      case "minLength":
	        out = "";
	        var n = e.params.limit;
	        out += "must NOT be shorter than " + n + " character";
	        if (n != 1) {
	          out += "s";
	        }
	        break
	      case "minProperties":
	        out = "";
	        var n = e.params.limit;
	        out += "must NOT have less than " + n + " propert";
	        if (n == 1) {
	          out += "y";
	        } else {
	          out += "ies";
	        }
	        break
	      case "multipleOf":
	        out = "must be a multiple of " + e.params.multipleOf;
	        break
	      case "not":
	        out = 'must NOT be valid according to schema in "not"';
	        break
	      case "oneOf":
	        out = 'must match exactly one schema in "oneOf"';
	        break
	      case "pattern":
	        out = 'must match pattern "' + e.params.pattern + '"';
	        break
	      case "patternRequired":
	        out =
	          'must have property matching pattern "' +
	          e.params.missingPattern +
	          '"';
	        break
	      case "propertyNames":
	        out = "property name is invalid";
	        break
	      case "required":
	        out = "must have required property " + e.params.missingProperty;
	        break
	      case "type":
	        out = "must be " + e.params.type;
	        break
	      case "unevaluatedItems":
	        out = "";
	        var n = e.params.len;
	        out += "must NOT have more than " + n + " item";
	        if (n != 1) {
	          out += "s";
	        }
	        break
	      case "unevaluatedProperties":
	        out = "must NOT have unevaluated properties";
	        break
	      case "uniqueItems":
	        out =
	          "must NOT have duplicate items (items ## " +
	          e.params.j +
	          " and " +
	          e.params.i +
	          " are identical)";
	        break
	      default:
	        out = 'must pass "' + e.keyword + '" keyword validation';
	    }
	    e.message = out;
	  }
	};
	return en;
}

var enExports = requireEn();
var Ajvi18n = /*@__PURE__*/getDefaultExportFromCjs(enExports);

var dist = {exports: {}};

var formats = {};

var hasRequiredFormats;

function requireFormats () {
	if (hasRequiredFormats) return formats;
	hasRequiredFormats = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
		function fmtDef(validate, compare) {
		    return { validate, compare };
		}
		exports.fullFormats = {
		    // date: http://tools.ietf.org/html/rfc3339#section-5.6
		    date: fmtDef(date, compareDate),
		    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
		    time: fmtDef(getTime(true), compareTime),
		    "date-time": fmtDef(getDateTime(true), compareDateTime),
		    "iso-time": fmtDef(getTime(), compareIsoTime),
		    "iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
		    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
		    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
		    uri,
		    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
		    // uri-template: https://tools.ietf.org/html/rfc6570
		    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
		    // For the source: https://gist.github.com/dperini/729294
		    // For test cases: https://mathiasbynens.be/demo/url-regex
		    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
		    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
		    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
		    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
		    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
		    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
		    regex,
		    // uuid: http://tools.ietf.org/html/rfc4122
		    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
		    // JSON-pointer: https://tools.ietf.org/html/rfc6901
		    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
		    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
		    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
		    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
		    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
		    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
		    // byte: https://github.com/miguelmota/is-base64
		    byte,
		    // signed 32 bit integer
		    int32: { type: "number", validate: validateInt32 },
		    // signed 64 bit integer
		    int64: { type: "number", validate: validateInt64 },
		    // C-type float
		    float: { type: "number", validate: validateNumber },
		    // C-type double
		    double: { type: "number", validate: validateNumber },
		    // hint to the UI to hide input strings
		    password: true,
		    // unchecked string payload
		    binary: true,
		};
		exports.fastFormats = {
		    ...exports.fullFormats,
		    date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
		    time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
		    "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
		    "iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
		    "iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
		    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
		    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
		    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
		    // email (sources from jsen validator):
		    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
		    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
		    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
		};
		exports.formatNames = Object.keys(exports.fullFormats);
		function isLeapYear(year) {
		    // https://tools.ietf.org/html/rfc3339#appendix-C
		    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
		}
		const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
		const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		function date(str) {
		    // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
		    const matches = DATE.exec(str);
		    if (!matches)
		        return false;
		    const year = +matches[1];
		    const month = +matches[2];
		    const day = +matches[3];
		    return (month >= 1 &&
		        month <= 12 &&
		        day >= 1 &&
		        day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]));
		}
		function compareDate(d1, d2) {
		    if (!(d1 && d2))
		        return undefined;
		    if (d1 > d2)
		        return 1;
		    if (d1 < d2)
		        return -1;
		    return 0;
		}
		const TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
		function getTime(strictTimeZone) {
		    return function time(str) {
		        const matches = TIME.exec(str);
		        if (!matches)
		            return false;
		        const hr = +matches[1];
		        const min = +matches[2];
		        const sec = +matches[3];
		        const tz = matches[4];
		        const tzSign = matches[5] === "-" ? -1 : 1;
		        const tzH = +(matches[6] || 0);
		        const tzM = +(matches[7] || 0);
		        if (tzH > 23 || tzM > 59 || (strictTimeZone && !tz))
		            return false;
		        if (hr <= 23 && min <= 59 && sec < 60)
		            return true;
		        // leap second
		        const utcMin = min - tzM * tzSign;
		        const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
		        return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
		    };
		}
		function compareTime(s1, s2) {
		    if (!(s1 && s2))
		        return undefined;
		    const t1 = new Date("2020-01-01T" + s1).valueOf();
		    const t2 = new Date("2020-01-01T" + s2).valueOf();
		    if (!(t1 && t2))
		        return undefined;
		    return t1 - t2;
		}
		function compareIsoTime(t1, t2) {
		    if (!(t1 && t2))
		        return undefined;
		    const a1 = TIME.exec(t1);
		    const a2 = TIME.exec(t2);
		    if (!(a1 && a2))
		        return undefined;
		    t1 = a1[1] + a1[2] + a1[3];
		    t2 = a2[1] + a2[2] + a2[3];
		    if (t1 > t2)
		        return 1;
		    if (t1 < t2)
		        return -1;
		    return 0;
		}
		const DATE_TIME_SEPARATOR = /t|\s/i;
		function getDateTime(strictTimeZone) {
		    const time = getTime(strictTimeZone);
		    return function date_time(str) {
		        // http://tools.ietf.org/html/rfc3339#section-5.6
		        const dateTime = str.split(DATE_TIME_SEPARATOR);
		        return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
		    };
		}
		function compareDateTime(dt1, dt2) {
		    if (!(dt1 && dt2))
		        return undefined;
		    const d1 = new Date(dt1).valueOf();
		    const d2 = new Date(dt2).valueOf();
		    if (!(d1 && d2))
		        return undefined;
		    return d1 - d2;
		}
		function compareIsoDateTime(dt1, dt2) {
		    if (!(dt1 && dt2))
		        return undefined;
		    const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
		    const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
		    const res = compareDate(d1, d2);
		    if (res === undefined)
		        return undefined;
		    return res || compareTime(t1, t2);
		}
		const NOT_URI_FRAGMENT = /\/|:/;
		const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
		function uri(str) {
		    // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
		    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
		}
		const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
		function byte(str) {
		    BYTE.lastIndex = 0;
		    return BYTE.test(str);
		}
		const MIN_INT32 = -2147483648;
		const MAX_INT32 = 2 ** 31 - 1;
		function validateInt32(value) {
		    return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
		}
		function validateInt64(value) {
		    // JSON and javascript max Int is 2**53, so any int that passes isInteger is valid for Int64
		    return Number.isInteger(value);
		}
		function validateNumber() {
		    return true;
		}
		const Z_ANCHOR = /[^\\]\\Z/;
		function regex(str) {
		    if (Z_ANCHOR.test(str))
		        return false;
		    try {
		        new RegExp(str);
		        return true;
		    }
		    catch (e) {
		        return false;
		    }
		}
		
	} (formats));
	return formats;
}

var limit = {};

var hasRequiredLimit;

function requireLimit () {
	if (hasRequiredLimit) return limit;
	hasRequiredLimit = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.formatLimitDefinition = void 0;
		const ajv_1 = requireAjv();
		const codegen_1 = requireCodegen();
		const ops = codegen_1.operators;
		const KWDs = {
		    formatMaximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
		    formatMinimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
		    formatExclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
		    formatExclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
		};
		const error = {
		    message: ({ keyword, schemaCode }) => (0, codegen_1.str) `should be ${KWDs[keyword].okStr} ${schemaCode}`,
		    params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
		};
		exports.formatLimitDefinition = {
		    keyword: Object.keys(KWDs),
		    type: "string",
		    schemaType: "string",
		    $data: true,
		    error,
		    code(cxt) {
		        const { gen, data, schemaCode, keyword, it } = cxt;
		        const { opts, self } = it;
		        if (!opts.validateFormats)
		            return;
		        const fCxt = new ajv_1.KeywordCxt(it, self.RULES.all.format.definition, "format");
		        if (fCxt.$data)
		            validate$DataFormat();
		        else
		            validateFormat();
		        function validate$DataFormat() {
		            const fmts = gen.scopeValue("formats", {
		                ref: self.formats,
		                code: opts.code.formats,
		            });
		            const fmt = gen.const("fmt", (0, codegen_1._) `${fmts}[${fCxt.schemaCode}]`);
		            cxt.fail$data((0, codegen_1.or)((0, codegen_1._) `typeof ${fmt} != "object"`, (0, codegen_1._) `${fmt} instanceof RegExp`, (0, codegen_1._) `typeof ${fmt}.compare != "function"`, compareCode(fmt)));
		        }
		        function validateFormat() {
		            const format = fCxt.schema;
		            const fmtDef = self.formats[format];
		            if (!fmtDef || fmtDef === true)
		                return;
		            if (typeof fmtDef != "object" ||
		                fmtDef instanceof RegExp ||
		                typeof fmtDef.compare != "function") {
		                throw new Error(`"${keyword}": format "${format}" does not define "compare" function`);
		            }
		            const fmt = gen.scopeValue("formats", {
		                key: format,
		                ref: fmtDef,
		                code: opts.code.formats ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(format)}` : undefined,
		            });
		            cxt.fail$data(compareCode(fmt));
		        }
		        function compareCode(fmt) {
		            return (0, codegen_1._) `${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
		        }
		    },
		    dependencies: ["format"],
		};
		const formatLimitPlugin = (ajv) => {
		    ajv.addKeyword(exports.formatLimitDefinition);
		    return ajv;
		};
		exports.default = formatLimitPlugin;
		
	} (limit));
	return limit;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist.exports;
	hasRequiredDist = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		const formats_1 = requireFormats();
		const limit_1 = requireLimit();
		const codegen_1 = requireCodegen();
		const fullName = new codegen_1.Name("fullFormats");
		const fastName = new codegen_1.Name("fastFormats");
		const formatsPlugin = (ajv, opts = { keywords: true }) => {
		    if (Array.isArray(opts)) {
		        addFormats(ajv, opts, formats_1.fullFormats, fullName);
		        return ajv;
		    }
		    const [formats, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
		    const list = opts.formats || formats_1.formatNames;
		    addFormats(ajv, list, formats, exportName);
		    if (opts.keywords)
		        (0, limit_1.default)(ajv);
		    return ajv;
		};
		formatsPlugin.get = (name, mode = "full") => {
		    const formats = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
		    const f = formats[name];
		    if (!f)
		        throw new Error(`Unknown format "${name}"`);
		    return f;
		};
		function addFormats(ajv, list, fs, exportName) {
		    var _a;
		    var _b;
		    (_a = (_b = ajv.opts.code).formats) !== null && _a !== void 0 ? _a : (_b.formats = (0, codegen_1._) `require("ajv-formats/dist/formats").${exportName}`);
		    for (const f of list)
		        ajv.addFormat(f, fs[f]);
		}
		module.exports = exports = formatsPlugin;
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.default = formatsPlugin;
		
	} (dist, dist.exports));
	return dist.exports;
}

var distExports = requireDist();
var addFormats = /*@__PURE__*/getDefaultExportFromCjs(distExports);

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
// type: "string",              // optional: applies to schemas of this type
// schemaType: "boolean",       // or "object" | "string" | etc.
// metaSchema: { type: "boolean" }, // to validate the value of the keyword
const schemaValidate = ajv.compile(JsonSchemaDraft);
//const schemaValidate = ajv.getSchema("http://json-schema.org/draft-07/schema#")
function validateSchema(data) {
    return schemaValidate ? schemaValidate(data) : false;
}
function validateErrors() {
    Ajvi18n(schemaValidate?.errors);
    return schemaValidate?.errors ?? [];
}
class Validator {
    parser;
    errors = [];
    text = "";
    constructor(schema) {
        this.parser = ajv.compile(schema);
    }
    validate(value) {
        const result = this.parser(value);
        this.errors = this.parser.errors ?? [];
        Ajvi18n(this.errors);
        this.text = ajv.errorsText(this.errors);
        if (typeof result === 'boolean')
            return result;
        throw (`Schema validation result not boolean (not expected) ${result}`);
    }
    static getText(errors) {
        Ajvi18n(errors);
        return ajv.errorsText(errors);
    }
}

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
            new CSInsideRef(this.root, data),
            new CSTemplate(this.root, 'abstract', Schema._abstractFunc()),
            new CSBool(this.root, 'case', () => false),
            new CSBool(this.root, 'visible', () => true),
            new CSBool(this.root, 'readonly', () => false),
            new CSBool(this.root, 'requiredIf', () => false),
            new CSBool(this.root, 'collapsed', () => false),
            new CSBool(this.root, 'filter', () => true),
            new CSAny(this.root, 'orderBy', () => true),
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
        for (const pass of Object.values(this.passes)) {
            //pass.forEach(step => console.log(step.constructor.name))
            this.walkSchema(pass, this.root);
        }
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
        const properties = schema.properties;
        properties && Object.entries(properties).forEach(([pname, pschema]) => pschema.$ref && (properties[pname] = this.definition(pschema)));
        schema.items && schema.items.$ref && (schema.items = this.definition(schema.items));
        schema.items && schema.items.oneOf && (schema.items.oneOf = schema.items.oneOf.map((schema) => schema.$ref ? this.definition(schema) : schema));
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
        schema.pointer = parent ? `${parent.pointer}/${name}` : `/`;
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
            return schema.field = 'fz-constant';
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
                    case "uuid": return schema.field = 'fz-uuid';
                    case "uuid": return schema.field = 'fz-uuid';
                    case "signature": return schema.field = 'fz-signature';
                    case "date": return schema.field = 'fz-date';
                    case "time": return schema.field = 'fz-time';
                    case "date-time": return schema.field = 'fz-datetime';
                    case "geo": return schema.field = 'fz-geolocation';
                    case "doc": return schema.field = 'fz-document';
                    case "markdown": return schema.field = 'fz-markdown';
                    case "asset": return schema.field = 'fz-asset';
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
class CSInsideRef extends CompilationStep {
    data;
    constructor(root, data) {
        super(root, "from", "post", ["pointer", "trackers"]);
        this.data = data;
    }
    appliable(schema) {
        return notNull(schema.from) && !isFunction$1(schema.from);
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
        if (isString$2(expression)) {
            const body = `
                ${this.sourceURL(name)}
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
        return this.property in schema && typeof schema[this.property] == "boolean";
    }
    apply(schema, _parent, name) {
        const expression = schema[this.property];
        this.set(schema, this.defaultFunc);
        if (isNull(expression) || isBoolean(expression))
            return this.set(schema, () => expression);
        if (!isString$2(expression))
            return this.set(schema, () => !!(expression));
        const body = `
            ${this.sourceURL(name)}
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
        if (!isString$2(expression) && !isArray(expression))
            return this.set(schema, () => expression);
        let code = `return null`;
        code = isString$2(expression) ? `return ${expression}` : this.buildCode(expression);
        const body = `
            ${this.sourceURL(name)}
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
                if (isObject$1(data) || isArray(data)) {
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
        if (isObject$1(data) && schema.properties) {
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

const BOOTSTRAP_URL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
const ICONS_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
const WOFF_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/fonts/bootstrap-icons.woff2?1fa40e8900654d2863d011707b9fb6f2";
/**
 * @prop schema
 * @prop data
 */
let FzForm = class FzForm extends Base {
    static get styles() {
        return [...super.styles];
    }
    obj = { content: {} };
    #i_options_accessor_storage = {};
    get i_options() { return this.#i_options_accessor_storage; }
    set i_options(value) { this.#i_options_accessor_storage = value; }
    store = new BlobMemory();
    asset;
    fieldMap = new Map();
    schemaMap = new Map();
    #i_schema_accessor_storage = DEFAULT_SCHEMA;
    get i_schema() { return this.#i_schema_accessor_storage; }
    set i_schema(value) { this.#i_schema_accessor_storage = value; }
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
    schemaErrors = [];
    dataErrors = [];
    validator;
    message = "";
    constructor() {
        super();
        ["oninit", "onready", "onvaliddata", "oninvaliddata", "onvalidate", "ondismiss"].forEach(event => {
            this.constructor.elementProperties.get(event).converter =
                (value) => { setGlobalHandler(this, event.substring(2), value); return value; };
        });
    }
    get root() { return this.obj.content; }
    get valid() {
        return this.validator?.validate(this.root) ?? false;
    }
    get schema() { return this.i_schema; }
    set schema(value) {
        this.i_schema = validateSchema(value) ? new Schema(JSON.parse(JSON.stringify(value))) : DEFAULT_SCHEMA;
        this.i_schema.collapsed = false;
        this.schemaErrors = validateErrors();
        this.validator = new Validator(this.i_schema);
        this.compile();
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
        // dont accept data before having a valid JSON
        if (this.schemaErrors.length > 0)
            return;
        // data must be valid (if checkin option is true)
        this.dataErrors = this.checkIn && this.validator.validate(value) ? this.validator?.errors ?? [] : [];
        this.obj.content = this.dataErrors.length == 0 ? value : {};
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
        const failed = this.schemaErrors.length > 0 || this.dataErrors.length > 0;
        return failed ? this.renderError() : this.renderForm();
    }
    renderForm() {
        return x `
            ${Array.isArray(this.root)
            ? x `<fz-array pointer="" name="content"  .data="${this.obj}" .schema="${this.schema}"></fz-array>`
            : x `<fz-object  pointer="" name="content" .data="${this.obj}" .schema="${this.schema}"></fz-object>`}
            ${this.renderButtons()}`;
    }
    renderButtons() {
        if (!this.actions)
            return null;
        return x `
            <hr>
            <div class="d-grid gap-2 d-sm-block justify-content-md-end">
                <button class="btn btn-primary" type="button" @click=${this.confirm}>Ok</button>
                <button class="btn btn-danger" type="button" @click=${this.cancel} >Cancel</button>
            </div>`;
    }
    renderError() {
        const formatError = (e) => x `<li>property : ${(e.dataPath == undefined) ? e.instancePath : e.dataPath} : ${e.keyword} ➜ ${e.message}</li>`;
        return [
            x `<hr>`,
            this.schemaErrors.length ? x `<pre><ol> Schema errors : ${this.schemaErrors.map(formatError)} </ol></pre>` : x ``,
            this.dataErrors.length ? x `<pre><ol> Data errors : ${this.dataErrors.map(formatError)} </ol></pre>` : x ``
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this.listen(this, 'data-updated', (e) => this.handleDataUpdate(e));
        this.dispatchEvent(new CustomEvent('init'));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('data-updated', (e) => this.handleDataUpdate(e));
    }
    firstUpdated(changedProperties) {
        // this is an unused callback actually (needed only for breakpoints)
        super.firstUpdated(changedProperties);
    }
    check() {
        // collect errors and dispatch error on fields (registered in this.fieldMap)
        const errorMap = new Map();
        const valid = this.validator?.validate(this.root);
        if (isBoolean(valid) && !valid) {
            for (const error of this.validator.errors) {
                let { instancePath, message, params, keyword } = error;
                instancePath = `/${instancePath}`;
                // required applies to object must down the error to child
                if (keyword === "required") {
                    instancePath = `${instancePath === '/' ? '' : ''}/${params.missingProperty}`;
                    message = "required";
                }
                if (!errorMap.has(instancePath))
                    errorMap.set(instancePath, []);
                //const detail =Object.entries(params).map(([s,v]) => v == null ? null : `${s}: ${v}`).filter(v => v).join(',')
                errorMap.get(instancePath)?.push(message ?? "unidentified error");
            }
        }
        // dispatch all errors over the fields 
        for (const [pointer, field] of this.fieldMap.entries()) {
            // if field is not touched (not manually updated) valid/invalid not displayed
            if (field.errors != NOT_TOUCHED) {
                field.errors = errorMap.get(pointer) ?? IS_VALID;
                // console.log(`VALIDATION: ${field.pointer} -> ${field.errors === IS_VALID ? "Y" : "N" }`)
            }
        }
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
            // TBD with options => console.log(`TRACKER ${field?.pointer} refreshed`)
            field?.trackedValueChange();
        });
    }
    confirm(evt) {
        evt.preventDefault();
        evt.stopPropagation();
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
        const schema_compiler = new SchemaCompiler(this.schema, this.options, this.obj.content);
        const schema_errors = schema_compiler.compile();
        if (schema_errors.length > 0) {
            this.message = `Schema compilation failed: \n    - ${schema_errors.join('\n    - ')}`;
            console.error(this.message);
            return;
        }
        // Data compilation never fail otherwise it's a bug to fix
        const data_compiler = new DataCompiler(this.obj.content, this.schema);
        const data_errors = data_compiler.compile();
        if (data_errors.length > 0) {
            this.message = `Data compilation failed: \n    - ${data_errors.join('\n    - ')}`;
            console.error(this.message);
        }
        this.dispatchEvent(new CustomEvent('ready'));
    }
    debug(pointer) {
        const field = this.fieldMap.get(pointer);
        if (!field)
            throw new Error(`No field found for pointer: ${pointer}`);
        if (!field.data || !field.key)
            throw new Error(`Field at ${pointer} has no parent/key`);
        const obj = field.data;
        const key = field.key;
        let value = obj[key];
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            set(newValue) {
                console.debug(`Formulizer watchPointer: ${pointer} (${key}) changed from`, value, "to", newValue);
                debugger;
                value = newValue;
            },
            configurable: true,
            enumerable: true
        });
    }
    // ------------------------------------------------------------------
    // user API to load external Bootstrap and Bootstap Icons (mandatory)
    // ------------------------------------------------------------------
    static async registerBootstrap(bootstrap_url = BOOTSTRAP_URL, icons_url = ICONS_URL, woff_url = WOFF_URL) {
        let bootstrap_sheet;
        if (isString$2(bootstrap_url)) {
            const bootstrapcss_text = await fetch(bootstrap_url)
                .then(resp => resp.ok ? resp.text() : (console.error(`unable to load boootstrap css: ${String(resp.statusText)}`), ""))
                .catch(e => (console.error(`unable to load boootstrap css: ${String(e)}`), ''));
            bootstrap_sheet = new CSSStyleSheet();
            bootstrap_sheet.replaceSync(bootstrapcss_text.replaceAll(':root', ':host, :root'));
        }
        else {
            bootstrap_sheet = bootstrap_url;
        }
        let icons_sheet;
        if (isString$2(icons_url)) {
            const iconscss_text = await fetch(icons_url)
                .then(resp => resp.ok ? resp.text() : (console.error(`unable to load boootstrap css: ${String(resp.statusText)}`), ""))
                .catch(e => (console.error(`unable to load icons css: ${String(e)}`), ''));
            icons_sheet = new CSSStyleSheet();
            icons_sheet.replaceSync(iconscss_text.replaceAll(':root', ':host, :root'));
        }
        else {
            icons_sheet = icons_url;
        }
        let font_face;
        if (isString$2(woff_url)) {
            font_face = new FontFace("bootstrap-icons", `url("${woff_url}")`);
        }
        else {
            font_face = woff_url;
        }
        const loaded = await font_face.load();
        document.fonts.add(loaded);
        Base.sheets = [bootstrap_sheet, icons_sheet];
    }
};
__decorate([
    n$2({ type: Object, attribute: "schema", converter: schemaAttrConverter })
], FzForm.prototype, "i_schema", null);
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
FzForm = __decorate([
    t$4("fz-form")
], FzForm);
// Optional: expose globally
window.FzForm = FzForm;

export { FzForm, FzMarkdownIt };
//# sourceMappingURL=formulizer.js.map
