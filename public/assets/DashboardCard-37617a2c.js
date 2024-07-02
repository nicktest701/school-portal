import{bM as Y,r as z,a7 as D,j as x,aX as $,bg as k,q as I}from"./index-97ebb758.js";var _={},P=function(){return P=Object.assign||function(r){for(var t,e=1,a=arguments.length;e<a;e++)for(var n in t=arguments[e])Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r},P.apply(this,arguments)},H=function(){function r(t,e,a){var n=this;this.endVal=e,this.options=a,this.version="2.8.0",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(i){n.startTime||(n.startTime=i);var u=i-n.startTime;n.remaining=n.duration-u,n.useEasing?n.countDown?n.frameVal=n.startVal-n.easingFn(u,0,n.startVal-n.endVal,n.duration):n.frameVal=n.easingFn(u,n.startVal,n.endVal-n.startVal,n.duration):n.frameVal=n.startVal+(n.endVal-n.startVal)*(u/n.duration);var s=n.countDown?n.frameVal<n.endVal:n.frameVal>n.endVal;n.frameVal=s?n.endVal:n.frameVal,n.frameVal=Number(n.frameVal.toFixed(n.options.decimalPlaces)),n.printValue(n.frameVal),u<n.duration?n.rAF=requestAnimationFrame(n.count):n.finalEndVal!==null?n.update(n.finalEndVal):n.options.onCompleteCallback&&n.options.onCompleteCallback()},this.formatNumber=function(i){var u,s,o,l,f=i<0?"-":"";u=Math.abs(i).toFixed(n.options.decimalPlaces);var p=(u+="").split(".");if(s=p[0],o=p.length>1?n.options.decimal+p[1]:"",n.options.useGrouping){l="";for(var g=3,b=0,h=0,m=s.length;h<m;++h)n.options.useIndianSeparators&&h===4&&(g=2,b=1),h!==0&&b%g==0&&(l=n.options.separator+l),b++,l=s[m-h-1]+l;s=l}return n.options.numerals&&n.options.numerals.length&&(s=s.replace(/[0-9]/g,function(d){return n.options.numerals[+d]}),o=o.replace(/[0-9]/g,function(d){return n.options.numerals[+d]})),f+n.options.prefix+s+o+n.options.suffix},this.easeOutExpo=function(i,u,s,o){return s*(1-Math.pow(2,-10*i/o))*1024/1023+u},this.options=P(P({},this.defaults),a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(e),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,this.options.separator===""&&(this.options.useGrouping=!1),this.el=typeof t=="string"?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined",typeof window<"u"&&this.options.enableScrollSpy&&(this.error?console.error(this.error,t):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push(function(){return n.handleScroll(n)}),window.onscroll=function(){window.onScrollFns.forEach(function(i){return i()})},this.handleScroll(this)))}return r.prototype.handleScroll=function(t){if(t&&window&&!t.once){var e=window.innerHeight+window.scrollY,a=t.el.getBoundingClientRect(),n=a.top+window.pageYOffset,i=a.top+a.height+window.pageYOffset;i<e&&i>window.scrollY&&t.paused?(t.paused=!1,setTimeout(function(){return t.start()},t.options.scrollSpyDelay),t.options.scrollSpyOnce&&(t.once=!0)):(window.scrollY>i||n>e)&&!t.paused&&t.reset()}},r.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var e=t-this.startVal;if(Math.abs(e)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=t;var a=this.countDown?1:-1;this.endVal=t+a*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;this.finalEndVal!==null?this.useEasing=!1:this.useEasing=this.options.useEasing},r.prototype.start=function(t){this.error||(this.options.onStartCallback&&this.options.onStartCallback(),t&&(this.options.onCompleteCallback=t),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},r.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},r.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},r.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal==null&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},r.prototype.printValue=function(t){var e;if(this.el){var a=this.formattingFn(t);!((e=this.options.plugin)===null||e===void 0)&&e.render?this.options.plugin.render(this.el,a):this.el.tagName==="INPUT"?this.el.value=a:this.el.tagName==="text"||this.el.tagName==="tspan"?this.el.textContent=a:this.el.innerHTML=a}},r.prototype.ensureNumber=function(t){return typeof t=="number"&&!isNaN(t)},r.prototype.validateValue=function(t){var e=Number(t);return this.ensureNumber(e)?e:(this.error="[CountUp] invalid start or end value: ".concat(t),null)},r.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},r}();const W=Object.freeze(Object.defineProperty({__proto__:null,CountUp:H},Symbol.toStringTag,{value:"Module"})),B=Y(W);Object.defineProperty(_,"__esModule",{value:!0});var c=z,K=B;function X(r,t){var e=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(e!=null){var a,n,i,u,s=[],o=!0,l=!1;try{if(i=(e=e.call(r)).next,t===0){if(Object(e)!==e)return;o=!1}else for(;!(o=(a=i.call(e)).done)&&(s.push(a.value),s.length!==t);o=!0);}catch(f){l=!0,n=f}finally{try{if(!o&&e.return!=null&&(u=e.return(),Object(u)!==u))return}finally{if(l)throw n}}return s}}function N(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);t&&(a=a.filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})),e.push.apply(e,a)}return e}function A(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?N(Object(e),!0).forEach(function(a){Z(r,a,e[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):N(Object(e)).forEach(function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(e,a))})}return r}function J(r,t){if(typeof r!="object"||!r)return r;var e=r[Symbol.toPrimitive];if(e!==void 0){var a=e.call(r,t||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(r)}function Q(r){var t=J(r,"string");return typeof t=="symbol"?t:String(t)}function Z(r,t,e){return t=Q(t),t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}function T(){return T=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a])}return r},T.apply(this,arguments)}function tt(r,t){if(r==null)return{};var e={},a=Object.keys(r),n,i;for(i=0;i<a.length;i++)n=a[i],!(t.indexOf(n)>=0)&&(e[n]=r[n]);return e}function G(r,t){if(r==null)return{};var e=tt(r,t),a,n;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);for(n=0;n<i.length;n++)a=i[n],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(r,a)&&(e[a]=r[a])}return e}function et(r,t){return nt(r)||X(r,t)||rt(r,t)||at()}function nt(r){if(Array.isArray(r))return r}function rt(r,t){if(r){if(typeof r=="string")return M(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);if(e==="Object"&&r.constructor&&(e=r.constructor.name),e==="Map"||e==="Set")return Array.from(r);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return M(r,t)}}function M(r,t){(t==null||t>r.length)&&(t=r.length);for(var e=0,a=new Array(t);e<t;e++)a[e]=r[e];return a}function at(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var it=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"?c.useLayoutEffect:c.useEffect;function v(r){var t=c.useRef(r);return it(function(){t.current=r}),c.useCallback(function(){for(var e=arguments.length,a=new Array(e),n=0;n<e;n++)a[n]=arguments[n];return t.current.apply(void 0,a)},[])}var st=function(t,e){var a=e.decimal,n=e.decimals,i=e.duration,u=e.easingFn,s=e.end,o=e.formattingFn,l=e.numerals,f=e.prefix,p=e.separator,g=e.start,b=e.suffix,h=e.useEasing,m=e.useGrouping,d=e.useIndianSeparators,S=e.enableScrollSpy,y=e.scrollSpyDelay,O=e.scrollSpyOnce,w=e.plugin;return new K.CountUp(t,s,{startVal:g,duration:i,decimal:a,decimalPlaces:n,easingFn:u,formattingFn:o,numerals:l,separator:p,prefix:f,suffix:b,plugin:w,useEasing:h,useIndianSeparators:d,useGrouping:m,enableScrollSpy:S,scrollSpyDelay:y,scrollSpyOnce:O})},ot=["ref","startOnMount","enableReinitialize","delay","onEnd","onStart","onPauseResume","onReset","onUpdate"],ut={decimal:".",separator:",",delay:null,prefix:"",suffix:"",duration:2,start:0,decimals:0,startOnMount:!0,enableReinitialize:!0,useEasing:!0,useGrouping:!0,useIndianSeparators:!1},q=function(t){var e=Object.fromEntries(Object.entries(t).filter(function(V){var C=et(V,2),F=C[1];return F!==void 0})),a=c.useMemo(function(){return A(A({},ut),e)},[t]),n=a.ref,i=a.startOnMount,u=a.enableReinitialize,s=a.delay,o=a.onEnd,l=a.onStart,f=a.onPauseResume,p=a.onReset,g=a.onUpdate,b=G(a,ot),h=c.useRef(),m=c.useRef(),d=c.useRef(!1),S=v(function(){return st(typeof n=="string"?n:n.current,b)}),y=v(function(V){var C=h.current;if(C&&!V)return C;var F=S();return h.current=F,F}),O=v(function(){var V=function(){return y(!0).start(function(){o==null||o({pauseResume:w,reset:E,start:R,update:j})})};s&&s>0?m.current=setTimeout(V,s*1e3):V(),l==null||l({pauseResume:w,reset:E,update:j})}),w=v(function(){y().pauseResume(),f==null||f({reset:E,start:R,update:j})}),E=v(function(){y().el&&(m.current&&clearTimeout(m.current),y().reset(),p==null||p({pauseResume:w,start:R,update:j}))}),j=v(function(V){y().update(V),g==null||g({pauseResume:w,reset:E,start:R})}),R=v(function(){E(),O()}),U=v(function(V){i&&(V&&E(),O())});return c.useEffect(function(){d.current?u&&U(!0):(d.current=!0,U())},[u,d,U,s,t.start,t.suffix,t.prefix,t.duration,t.separator,t.decimals,t.decimal,t.formattingFn]),c.useEffect(function(){return function(){E()}},[E]),{start:R,pauseResume:w,reset:E,update:j,getCountUp:y}},lt=["className","redraw","containerProps","children","style"],ct=function(t){var e=t.className,a=t.redraw,n=t.containerProps,i=t.children,u=t.style,s=G(t,lt),o=c.useRef(null),l=c.useRef(!1),f=q(A(A({},s),{},{ref:o,startOnMount:typeof i!="function"||t.delay===0,enableReinitialize:!1})),p=f.start,g=f.reset,b=f.update,h=f.pauseResume,m=f.getCountUp,d=v(function(){p()}),S=v(function(w){t.preserveValue||g(),b(w)}),y=v(function(){if(typeof t.children=="function"&&!(o.current instanceof Element)){console.error(`Couldn't find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an Element, eg. <span ref={containerRef} />.`);return}m()});c.useEffect(function(){y()},[y]),c.useEffect(function(){l.current&&S(t.end)},[t.end,S]);var O=a&&t;return c.useEffect(function(){a&&l.current&&d()},[d,a,O]),c.useEffect(function(){!a&&l.current&&d()},[d,a,t.start,t.suffix,t.prefix,t.duration,t.separator,t.decimals,t.decimal,t.className,t.formattingFn]),c.useEffect(function(){l.current=!0},[]),typeof i=="function"?i({countUpRef:o,start:p,reset:g,update:b,pauseResume:h,getCountUp:m}):c.createElement("span",T({className:e,ref:o,style:u},n),typeof t.start<"u"?m().formattingFn(t.start):"")},ft=_.default=ct;_.useCountUp=q;const L=({title:r,value:t,icon:e})=>x.jsx($,{sx:{position:"relative",borderRadius:2,boxShadow:"20px 20px 60px #d9d9d9,-20px -20px 60px #ffffff"},elevation:1,children:x.jsxs(k,{children:[x.jsx(I,{variant:"h5",textAlign:"center",sx:{paddingY:1},children:x.jsx(ft,{duration:5,end:t,enableScrollSpy:!0})}),x.jsx("div",{style:{position:"absolute",right:10,bottom:5},children:e}),x.jsx(I,{color:"primary",children:r})]})});L.propTypes={title:D.string,value:D.number,icon:D.node};const pt=z.memo(L);export{pt as D};
