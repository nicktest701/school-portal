import{co as b,r as n,W as C,cp as v,cq as I,cr as K,cs as L}from"./index-5b8f5a53.js";const R="label";function m(t,e){typeof t=="function"?t(e):t&&(t.current=e)}function O(t,e){const a=t.options;a&&e&&Object.assign(a,e)}function y(t,e){t.labels=e}function E(t,e){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:R;const u=[];t.datasets=e.map(s=>{const c=t.datasets.find(i=>i[a]===s[a]);return!c||!s.data||u.includes(c)?{...s}:(u.push(c),Object.assign(c,s),c)})}function B(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R;const a={labels:[],datasets:[]};return y(a,t.labels),E(a,t.datasets,e),a}function T(t,e){const{height:a=150,width:u=300,redraw:s=!1,datasetIdKey:c,type:i,data:o,options:f,plugins:w=[],fallbackContent:D,updateMode:p,...j}=t,d=n.useRef(null),r=n.useRef(),g=()=>{d.current&&(r.current=new b(d.current,{type:i,data:B(o,c),options:f&&{...f},plugins:w}),m(e,r.current))},h=()=>{m(e,null),r.current&&(r.current.destroy(),r.current=null)};return n.useEffect(()=>{!s&&r.current&&f&&O(r.current,f)},[s,f]),n.useEffect(()=>{!s&&r.current&&y(r.current.config.data,o.labels)},[s,o.labels]),n.useEffect(()=>{!s&&r.current&&o.datasets&&E(r.current.config.data,o.datasets,c)},[s,o.datasets]),n.useEffect(()=>{r.current&&(s?(h(),setTimeout(g)):r.current.update(p))},[s,f,o.labels,o.datasets,p]),n.useEffect(()=>{r.current&&(h(),setTimeout(g))},[i]),n.useEffect(()=>(g(),()=>h()),[]),C.createElement("canvas",Object.assign({ref:d,role:"img",height:a,width:u},j),D)}const k=n.forwardRef(T);function l(t,e){return b.register(e),n.forwardRef((a,u)=>C.createElement(k,Object.assign({},a,{ref:u,type:t})))}const M=l("line",v),P=l("bar",I),W=l("radar",K),$=l("doughnut",L);export{P as B,$ as D,M as L,W as R};
