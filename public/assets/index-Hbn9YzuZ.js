import{ev as se,eE as ie}from"./index-DrgqF6h7.js";var O={exports:{}},le=O.exports,K;function ae(){return K||(K=1,function(Q,de){(function(B,j){Q.exports=j(se())})(typeof self<"u"?self:le,function(B){return function(){var j={155:function(e){e.exports=B}},V={};function E(e){var t=V[e];if(t!==void 0)return t.exports;var r=V[e]={exports:{}};return j[e](r,r.exports,E),r.exports}E.d=function(e,t){for(var r in t)E.o(t,r)&&!E.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},E.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},E.r=function(e){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var H={};E.r(H),E.d(H,{useReactToPrint:function(){return te}});var X=E(155);function c({level:e="error",messages:t,suppressErrors:r=!1}){r||(e==="error"?console.error(t):e==="warning"?console.warn(t):console.debug(t))}function M(e,t){if(t||!e){const r=document.getElementById("printWindow");r&&document.body.removeChild(r)}}function W(e){return e instanceof Error?e:new Error("Unknown Error")}function Y(e,t){const{documentTitle:r,onAfterPrint:l,onPrintError:f,preserveAfterPrint:d,print:w,suppressErrors:u}=t;setTimeout(()=>{var p,b;if(e.contentWindow)if(e.contentWindow.focus(),w)w(e).then(()=>{l==null||l(),M(d)}).catch(v=>{f?f("print",W(v)):c({messages:["An error was thrown by the specified `print` function"],suppressErrors:u})});else{if(e.contentWindow.print){const v=(b=(p=e.contentDocument)===null||p===void 0?void 0:p.title)!==null&&b!==void 0?b:"",T=e.ownerDocument.title;r&&(e.ownerDocument.title=r,e.contentDocument&&(e.contentDocument.title=r)),e.contentWindow.print(),r&&(e.ownerDocument.title=T,e.contentDocument&&(e.contentDocument.title=v))}else c({messages:["Printing for this browser is not currently possible: the browser does not have a `print` method available for iframes."],suppressErrors:u});window.addEventListener("focus",()=>{l==null||l(),M(d)},{once:!0})}else c({messages:["Printing failed because the `contentWindow` of the print iframe did not load. This is possibly an error with `react-to-print`. Please file an issue: https://github.com/MatthewHerbst/react-to-print/issues/"],suppressErrors:u})},500)}function _(e){const t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,null);let l=r.nextNode();for(;l;)t.push(l),l=r.nextNode();return t}function z(e,t,r){const l=_(e),f=_(t);if(l.length===f.length)for(let d=0;d<l.length;d++){const w=l[d],u=f[d],p=w.shadowRoot;if(p!==null){const b=u.attachShadow({mode:p.mode});b.innerHTML=p.innerHTML,z(p,b,r)}}else c({messages:["When cloning shadow root content, source and target elements have different size. `onBeforePrint` likely resolved too early.",e,t],suppressErrors:r})}const Z=`
    @page {
        /* Remove browser default header (title) and footer (url) */
        margin: 0;
    }
    @media print {
        body {
            /* Tell browsers to print background colors */
            color-adjust: exact; /* Firefox. This is an older version of "print-color-adjust" */
            print-color-adjust: exact; /* Firefox/Safari */
            -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
        }
    }
`;function ee(e,t,r,l){var f,d,w,u,p;const{contentNode:b,clonedContentNode:v,clonedImgNodes:T,clonedVideoNodes:L,numResourcesToLoad:D,originalCanvasNodes:N}=r,{bodyClass:F,fonts:S,ignoreGlobalStyles:P,pageStyle:R,nonce:y,suppressErrors:C,copyShadowRoots:q}=l;e.onload=null;const o=(f=e.contentDocument)!==null&&f!==void 0?f:(d=e.contentWindow)===null||d===void 0?void 0:d.document;if(o){const A=o.body.appendChild(v);q&&z(b,A,!!C),S&&(!((w=e.contentDocument)===null||w===void 0)&&w.fonts&&(!((u=e.contentWindow)===null||u===void 0)&&u.FontFace)?S.forEach(s=>{const n=new FontFace(s.family,s.source,{weight:s.weight,style:s.style});e.contentDocument.fonts.add(n),n.loaded.then(()=>{t(n)}).catch(h=>{t(n,["Failed loading the font:",n,"Load error:",W(h)])})}):(S.forEach(s=>{t(s)}),c({messages:['"react-to-print" is not able to load custom fonts because the browser does not support the FontFace API but will continue attempting to print the page'],suppressErrors:C})));const I=R??Z,$=o.createElement("style");y&&($.setAttribute("nonce",y),o.head.setAttribute("nonce",y)),$.appendChild(o.createTextNode(I)),o.head.appendChild($),F&&o.body.classList.add(...F.split(" "));const ne=o.querySelectorAll("canvas");for(let s=0;s<N.length;++s){const n=N[s],h=ne[s];if(h===void 0){c({messages:["A canvas element could not be copied for printing, has it loaded? `onBeforePrint` likely resolved too early.",n],suppressErrors:C});continue}const i=h.getContext("2d");i&&i.drawImage(n,0,0)}for(let s=0;s<T.length;s++){const n=T[s],h=n.getAttribute("src");if(h){const i=new Image;i.onload=()=>{t(n)},i.onerror=(a,g,k,m,x)=>{t(n,["Error loading <img>",n,"Error",x])},i.src=h}else t(n,['Found an <img> tag with an empty "src" attribute. This prevents pre-loading it.',n])}for(let s=0;s<L.length;s++){const n=L[s];n.preload="auto";const h=n.getAttribute("poster");if(h){const i=new Image;i.onload=()=>{t(n)},i.onerror=(a,g,k,m,x)=>{t(n,["Error loading video poster",h,"for video",n,"Error:",x])},i.src=h}else n.readyState>=2?t(n):n.src?(n.onloadeddata=()=>{t(n)},n.onerror=(i,a,g,k,m)=>{t(n,["Error loading video",n,"Error",m])},n.onstalled=()=>{t(n,["Loading video stalled, skipping",n])}):t(n,["Error loading video, `src` is empty",n])}const U="select",J=b.querySelectorAll(U),oe=o.querySelectorAll(U);for(let s=0;s<J.length;s++)oe[s].value=J[s].value;if(!P){const s=document.querySelectorAll("style, link[rel~='stylesheet'], link[as='style']");for(let n=0,h=s.length;n<h;++n){const i=s[n];if(i.tagName.toLowerCase()==="style"){const a=o.createElement(i.tagName),g=i.sheet;if(g){let k="";try{const m=g.cssRules.length;for(let x=0;x<m;++x)typeof g.cssRules[x].cssText=="string"&&(k+=`${g.cssRules[x].cssText}\r
`)}catch(m){c({messages:["A stylesheet could not be accessed. This is likely due to the stylesheet having cross-origin imports, and many browsers block script access to cross-origin stylesheets. See https://github.com/MatthewHerbst/react-to-print/issues/429 for details. You may be able to load the sheet by both marking the stylesheet with the cross `crossorigin` attribute, and setting the `Access-Control-Allow-Origin` header on the server serving the stylesheet. Alternatively, host the stylesheet on your domain to avoid this issue entirely.",i,`Original error: ${W(m).message}`],level:"warning"})}a.setAttribute("id",`react-to-print-${n}`),y&&a.setAttribute("nonce",y),a.appendChild(o.createTextNode(k)),o.head.appendChild(a)}}else if(i.getAttribute("href"))if(i.hasAttribute("disabled"))c({messages:["`react-to-print` encountered a <link> tag with a `disabled` attribute and will ignore it. Note that the `disabled` attribute is deprecated, and some browsers ignore it. You should stop using it. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled. The <link> is:",i],level:"warning"}),t(i);else{const a=o.createElement(i.tagName);for(let g=0,k=i.attributes.length;g<k;++g){const m=i.attributes[g];m&&a.setAttribute(m.nodeName,(p=m.nodeValue)!==null&&p!==void 0?p:"")}a.onload=()=>{t(a)},a.onerror=(g,k,m,x,re)=>{t(a,["Failed to load",a,"Error:",re])},y&&a.setAttribute("nonce",y),o.head.appendChild(a)}else c({messages:["`react-to-print` encountered a <link> tag with an empty `href` attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:",i],level:"warning"}),t(i)}}}D===0&&Y(e,l)}function G(e,t,r,l){e.onload=()=>{ee(e,t,r,l)},document.body.appendChild(e)}function te(e){const{contentRef:t,fonts:r,ignoreGlobalStyles:l,onBeforePrint:f,onPrintError:d,preserveAfterPrint:w,suppressErrors:u}=e;return(0,X.useCallback)(b=>{M(w,!0);const v=function({contentRef:o,optionalContent:A,suppressErrors:I}){return A&&(o&&c({level:"warning",messages:['"react-to-print" received a `contentRef` option and a optional-content param passed to its callback. The `contentRef` option will be ignored.']}),typeof A=="function")?A():o?o.current:void c({messages:['"react-to-print" did not receive a `contentRef` option or a optional-content param pass to its callback.'],suppressErrors:I})}({contentRef:t,optionalContent:b,suppressErrors:u});if(!v)return void c({messages:["There is nothing to print"],suppressErrors:u});const T=v.cloneNode(!0),L=document.querySelectorAll("link[rel~='stylesheet'], link[as='style']"),D=T.querySelectorAll("img"),N=T.querySelectorAll("video"),F=r?r.length:0,S=(l?0:L.length)+D.length+N.length+F,P=[],R=[],y=function(){const o=document.createElement("iframe");return o.width=`${document.documentElement.clientWidth}px`,o.height=`${document.documentElement.clientHeight}px`,o.style.position="absolute",o.style.top=`-${document.documentElement.clientHeight+100}px`,o.style.left=`-${document.documentElement.clientWidth+100}px`,o.id="printWindow",o.srcdoc="<!DOCTYPE html>",o}(),C=(o,A)=>{P.includes(o)?c({level:"debug",messages:["Tried to mark a resource that has already been handled",o],suppressErrors:u}):(A?(c({messages:['"react-to-print" was unable to load a resource but will continue attempting to print the page',...A],suppressErrors:u}),R.push(o)):P.push(o),P.length+R.length===S&&Y(y,e))},q={contentNode:v,clonedContentNode:T,clonedImgNodes:D,clonedVideoNodes:N,numResourcesToLoad:S,originalCanvasNodes:v.querySelectorAll("canvas")};f?f().then(()=>{G(y,C,q,e)}).catch(o=>{d==null||d("onBeforePrint",W(o))}):G(y,C,q,e)},[e])}return H}()})}(O)),O.exports}var ce=ae();const pe=ie(ce);export{pe as R};
