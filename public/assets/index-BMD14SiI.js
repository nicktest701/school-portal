import{f8 as b,r as s,W as C,f9 as K,fa as L,fb as B,fc as T}from"./index-DrgqF6h7.js";const R="label";function m(t,e){typeof t=="function"?t(e):t&&(t.current=e)}function j(t,e){const n=t.options;n&&e&&Object.assign(n,e)}function y(t,e){t.labels=e}function E(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:R;const o=[];t.datasets=e.map(a=>{const u=t.datasets.find(l=>l[n]===a[n]);return!u||!a.data||o.includes(u)?{...a}:(o.push(u),Object.assign(u,a),u)})}function v(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:R;const n={labels:[],datasets:[]};return y(n,t.labels),E(n,t.datasets,e),n}function O(t,e){const{height:n=150,width:o=300,redraw:a=!1,datasetIdKey:u,type:l,data:c,options:f,plugins:w=[],fallbackContent:D,updateMode:p,...I}=t,i=s.useRef(null),r=s.useRef(null),g=()=>{i.current&&(r.current=new b(i.current,{type:l,data:v(c,u),options:f&&{...f},plugins:w}),m(e,r.current))},h=()=>{m(e,null),r.current&&(r.current.destroy(),r.current=null)};return s.useEffect(()=>{!a&&r.current&&f&&j(r.current,f)},[a,f]),s.useEffect(()=>{!a&&r.current&&y(r.current.config.data,c.labels)},[a,c.labels]),s.useEffect(()=>{!a&&r.current&&c.datasets&&E(r.current.config.data,c.datasets,u)},[a,c.datasets]),s.useEffect(()=>{r.current&&(a?(h(),setTimeout(g)):r.current.update(p))},[a,f,c.labels,c.datasets,p]),s.useEffect(()=>{r.current&&(h(),setTimeout(g))},[l]),s.useEffect(()=>(g(),()=>h()),[]),C.createElement("canvas",{ref:i,role:"img",height:n,width:o,...I},D)}const k=s.forwardRef(O);function d(t,e){return b.register(e),s.forwardRef((n,o)=>C.createElement(k,{...n,ref:o,type:t}))}const P=d("line",K),W=d("bar",L),$=d("radar",B),q=d("doughnut",T);export{W as B,q as D,P as L,$ as R};