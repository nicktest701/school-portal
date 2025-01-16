import{eu as it,ev as st,eE as ot,U as K,r as ut,j as _,d1 as lt,d2 as ft,l as Q}from"./index-DrgqF6h7.js";var L={},H=function(){return H=Object.assign||function(s){for(var i,u=1,l=arguments.length;u<l;u++)for(var n in i=arguments[u])Object.prototype.hasOwnProperty.call(i,n)&&(s[n]=i[n]);return s},H.apply(this,arguments)},ct=function(){function s(i,u,l){var n=this;this.endVal=u,this.options=l,this.version="2.8.0",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(c){n.startTime||(n.startTime=c);var g=c-n.startTime;n.remaining=n.duration-g,n.useEasing?n.countDown?n.frameVal=n.startVal-n.easingFn(g,0,n.startVal-n.endVal,n.duration):n.frameVal=n.easingFn(g,n.startVal,n.endVal-n.startVal,n.duration):n.frameVal=n.startVal+(n.endVal-n.startVal)*(g/n.duration);var p=n.countDown?n.frameVal<n.endVal:n.frameVal>n.endVal;n.frameVal=p?n.endVal:n.frameVal,n.frameVal=Number(n.frameVal.toFixed(n.options.decimalPlaces)),n.printValue(n.frameVal),g<n.duration?n.rAF=requestAnimationFrame(n.count):n.finalEndVal!==null?n.update(n.finalEndVal):n.options.onCompleteCallback&&n.options.onCompleteCallback()},this.formatNumber=function(c){var g,p,V,j,Y=c<0?"-":"";g=Math.abs(c).toFixed(n.options.decimalPlaces);var I=(g+="").split(".");if(p=I[0],V=I.length>1?n.options.decimal+I[1]:"",n.options.useGrouping){j="";for(var $=3,N=0,C=0,k=p.length;C<k;++C)n.options.useIndianSeparators&&C===4&&($=2,N=1),C!==0&&N%$==0&&(j=n.options.separator+j),N++,j=p[k-C-1]+j;p=j}return n.options.numerals&&n.options.numerals.length&&(p=p.replace(/[0-9]/g,function(M){return n.options.numerals[+M]}),V=V.replace(/[0-9]/g,function(M){return n.options.numerals[+M]})),Y+n.options.prefix+p+V+n.options.suffix},this.easeOutExpo=function(c,g,p,V){return p*(1-Math.pow(2,-10*c/V))*1024/1023+g},this.options=H(H({},this.defaults),l),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(u),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,this.options.separator===""&&(this.options.useGrouping=!1),this.el=typeof i=="string"?document.getElementById(i):i,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined",typeof window<"u"&&this.options.enableScrollSpy&&(this.error?console.error(this.error,i):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push(function(){return n.handleScroll(n)}),window.onscroll=function(){window.onScrollFns.forEach(function(c){return c()})},this.handleScroll(this)))}return s.prototype.handleScroll=function(i){if(i&&window&&!i.once){var u=window.innerHeight+window.scrollY,l=i.el.getBoundingClientRect(),n=l.top+window.pageYOffset,c=l.top+l.height+window.pageYOffset;c<u&&c>window.scrollY&&i.paused?(i.paused=!1,setTimeout(function(){return i.start()},i.options.scrollSpyDelay),i.options.scrollSpyOnce&&(i.once=!0)):(window.scrollY>c||n>u)&&!i.paused&&i.reset()}},s.prototype.determineDirectionAndSmartEasing=function(){var i=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>i;var u=i-this.startVal;if(Math.abs(u)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=i;var l=this.countDown?1:-1;this.endVal=i+l*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=i,this.finalEndVal=null;this.finalEndVal!==null?this.useEasing=!1:this.useEasing=this.options.useEasing},s.prototype.start=function(i){this.error||(this.options.onStartCallback&&this.options.onStartCallback(),i&&(this.options.onCompleteCallback=i),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},s.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},s.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},s.prototype.update=function(i){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(i),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal==null&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},s.prototype.printValue=function(i){var u;if(this.el){var l=this.formattingFn(i);!((u=this.options.plugin)===null||u===void 0)&&u.render?this.options.plugin.render(this.el,l):this.el.tagName==="INPUT"?this.el.value=l:this.el.tagName==="text"||this.el.tagName==="tspan"?this.el.textContent=l:this.el.innerHTML=l}},s.prototype.ensureNumber=function(i){return typeof i=="number"&&!isNaN(i)},s.prototype.validateValue=function(i){var u=Number(i);return this.ensureNumber(u)?u:(this.error="[CountUp] invalid start or end value: ".concat(i),null)},s.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},s}();const dt=Object.freeze(Object.defineProperty({__proto__:null,CountUp:ct},Symbol.toStringTag,{value:"Module"})),pt=it(dt);var X;function ht(){if(X)return L;X=1,Object.defineProperty(L,"__esModule",{value:!0});var s=st(),i=pt;function u(r,t){var e=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(e!=null){var a,o,f,E,y=[],d=!0,h=!1;try{if(f=(e=e.call(r)).next,t!==0)for(;!(d=(a=f.call(e)).done)&&(y.push(a.value),y.length!==t);d=!0);}catch(m){h=!0,o=m}finally{try{if(!d&&e.return!=null&&(E=e.return(),Object(E)!==E))return}finally{if(h)throw o}}return y}}function l(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);t&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(r,o).enumerable})),e.push.apply(e,a)}return e}function n(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?l(Object(e),!0).forEach(function(a){p(r,a,e[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):l(Object(e)).forEach(function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(e,a))})}return r}function c(r,t){if(typeof r!="object"||!r)return r;var e=r[Symbol.toPrimitive];if(e!==void 0){var a=e.call(r,t||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(r)}function g(r){var t=c(r,"string");return typeof t=="symbol"?t:String(t)}function p(r,t,e){return t=g(t),t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}function V(){return V=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a])}return r},V.apply(this,arguments)}function j(r,t){if(r==null)return{};var e={},a=Object.keys(r),o,f;for(f=0;f<a.length;f++)o=a[f],!(t.indexOf(o)>=0)&&(e[o]=r[o]);return e}function Y(r,t){if(r==null)return{};var e=j(r,t),a,o;if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(r);for(o=0;o<f.length;o++)a=f[o],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(r,a)&&(e[a]=r[a])}return e}function I(r,t){return $(r)||u(r,t)||N(r,t)||k()}function $(r){if(Array.isArray(r))return r}function N(r,t){if(r){if(typeof r=="string")return C(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);if(e==="Object"&&r.constructor&&(e=r.constructor.name),e==="Map"||e==="Set")return Array.from(r);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return C(r,t)}}function C(r,t){(t==null||t>r.length)&&(t=r.length);for(var e=0,a=new Array(t);e<t;e++)a[e]=r[e];return a}function k(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var M=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"?s.useLayoutEffect:s.useEffect;function v(r){var t=s.useRef(r);return M(function(){t.current=r}),s.useCallback(function(){for(var e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o];return t.current.apply(void 0,a)},[])}var tt=function(t,e){var a=e.decimal,o=e.decimals,f=e.duration,E=e.easingFn,y=e.end,d=e.formattingFn,h=e.numerals,m=e.prefix,F=e.separator,P=e.start,A=e.suffix,U=e.useEasing,O=e.useGrouping,w=e.useIndianSeparators,D=e.enableScrollSpy,b=e.scrollSpyDelay,T=e.scrollSpyOnce,x=e.plugin;return new i.CountUp(t,y,{startVal:P,duration:f,decimal:a,decimalPlaces:o,easingFn:E,formattingFn:d,numerals:h,separator:F,prefix:m,suffix:A,plugin:x,useEasing:U,useIndianSeparators:w,useGrouping:O,enableScrollSpy:D,scrollSpyDelay:b,scrollSpyOnce:T})},et=["ref","startOnMount","enableReinitialize","delay","onEnd","onStart","onPauseResume","onReset","onUpdate"],nt={decimal:".",separator:",",delay:null,prefix:"",suffix:"",duration:2,start:0,decimals:0,startOnMount:!0,enableReinitialize:!0,useEasing:!0,useGrouping:!0,useIndianSeparators:!1},J=function(t){var e=Object.fromEntries(Object.entries(t).filter(function(S){var G=I(S,2),B=G[1];return B!==void 0})),a=s.useMemo(function(){return n(n({},nt),e)},[t]),o=a.ref,f=a.startOnMount,E=a.enableReinitialize,y=a.delay,d=a.onEnd,h=a.onStart,m=a.onPauseResume,F=a.onReset,P=a.onUpdate,A=Y(a,et),U=s.useRef(),O=s.useRef(),w=s.useRef(!1),D=v(function(){return tt(typeof o=="string"?o:o.current,A)}),b=v(function(S){var G=U.current;if(G&&!S)return G;var B=D();return U.current=B,B}),T=v(function(){var S=function(){return b(!0).start(function(){d==null||d({pauseResume:x,reset:R,start:q,update:z})})};y&&y>0?O.current=setTimeout(S,y*1e3):S(),h==null||h({pauseResume:x,reset:R,update:z})}),x=v(function(){b().pauseResume(),m==null||m({reset:R,start:q,update:z})}),R=v(function(){b().el&&(O.current&&clearTimeout(O.current),b().reset(),F==null||F({pauseResume:x,start:q,update:z}))}),z=v(function(S){b().update(S),P==null||P({pauseResume:x,reset:R,start:q})}),q=v(function(){R(),T()}),W=v(function(S){f&&(S&&R(),T())});return s.useEffect(function(){w.current?E&&W(!0):(w.current=!0,W())},[E,w,W,y,t.start,t.suffix,t.prefix,t.duration,t.separator,t.decimals,t.decimal,t.formattingFn]),s.useEffect(function(){return function(){R()}},[R]),{start:q,pauseResume:x,reset:R,update:z,getCountUp:b}},rt=["className","redraw","containerProps","children","style"],at=function(t){var e=t.className,a=t.redraw,o=t.containerProps,f=t.children,E=t.style,y=Y(t,rt),d=s.useRef(null),h=s.useRef(!1),m=J(n(n({},y),{},{ref:d,startOnMount:typeof f!="function"||t.delay===0,enableReinitialize:!1})),F=m.start,P=m.reset,A=m.update,U=m.pauseResume,O=m.getCountUp,w=v(function(){F()}),D=v(function(x){t.preserveValue||P(),A(x)}),b=v(function(){if(typeof t.children=="function"&&!(d.current instanceof Element)){console.error(`Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an Element, eg. <span ref={containerRef} />.`);return}O()});s.useEffect(function(){b()},[b]),s.useEffect(function(){h.current&&D(t.end)},[t.end,D]);var T=a&&t;return s.useEffect(function(){a&&h.current&&w()},[w,a,T]),s.useEffect(function(){!a&&h.current&&w()},[w,a,t.start,t.suffix,t.prefix,t.duration,t.separator,t.decimals,t.decimal,t.className,t.formattingFn]),s.useEffect(function(){h.current=!0},[]),typeof f=="function"?f({countUpRef:d,start:F,reset:P,update:A,pauseResume:U,getCountUp:O}):s.createElement("span",V({className:e,ref:d,style:E},o),typeof t.start<"u"?O().formattingFn(t.start):"")};return L.default=at,L.useCountUp=J,L}var mt=ht();const gt=ot(mt),Z=({title:s,value:i,icon:u})=>_.jsx(lt,{sx:{position:"relative",borderRadius:2,boxShadow:"20px 20px 60px #d9d9d9"},elevation:1,children:_.jsxs(ft,{children:[_.jsx(Q,{variant:"h5",textAlign:"center",sx:{paddingY:1},children:_.jsx(gt,{duration:5,end:i,enableScrollSpy:!0})}),_.jsx("div",{style:{position:"absolute",right:10,bottom:5},children:u}),_.jsx(Q,{color:"primary",children:s})]})});Z.propTypes={title:K.string,value:K.number,icon:K.node};const vt=ut.memo(Z);export{vt as D};