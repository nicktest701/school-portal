import{ex as p,cg as h,r as m,bS as S,ey as w}from"./index-a08c4904.js";function Q(t,u,e,s,o){const[r,i]=m.useState(()=>o&&e?e(t).matches:s?s(t).matches:u);return S(()=>{let a=!0;if(!e)return;const n=e(t),f=()=>{a&&i(n.matches)};return f(),n.addListener(f),()=>{a=!1,n.removeListener(f)}},[t,e]),r}const d=w["useSyncExternalStore"];function y(t,u,e,s,o){const r=m.useCallback(()=>u,[u]),i=m.useMemo(()=>{if(o&&e)return()=>e(t).matches;if(s!==null){const{matches:c}=s(t);return()=>c}return r},[r,t,s,o,e]),[a,n]=m.useMemo(()=>{if(e===null)return[r,()=>()=>{}];const c=e(t);return[()=>c.matches,l=>(c.addListener(l),()=>{c.removeListener(l)})]},[r,e,t]);return d(n,a,i)}function b(t,u={}){const e=p(),s=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:o=!1,matchMedia:r=s?window.matchMedia:null,ssrMatchMedia:i=null,noSsr:a=!1}=h({name:"MuiUseMediaQuery",props:u,theme:e});let n=typeof t=="function"?t(e):t;return n=n.replace(/^@media( ?)/m,""),(d!==void 0?y:Q)(n,o,r,i,a)}export{b as u};
