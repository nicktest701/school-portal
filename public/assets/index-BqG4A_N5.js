import{eE as h,c7 as p,r as m,c8 as E,ex as Q,b1 as S}from"./index-B8PQHtjc.js";function g(n,r,e,s,o){const[t,f]=m.useState(()=>o&&e?e(n).matches:s?s(n).matches:r);return E(()=>{if(!e)return;const u=e(n),a=()=>{f(u.matches)};return a(),u.addEventListener("change",a),()=>{u.removeEventListener("change",a)}},[n,e]),t}const v={...Q},l=v.useSyncExternalStore;function w(n,r,e,s,o){const t=m.useCallback(()=>r,[r]),f=m.useMemo(()=>{if(o&&e)return()=>e(n).matches;if(s!==null){const{matches:c}=s(n);return()=>c}return t},[t,n,s,o,e]),[u,a]=m.useMemo(()=>{if(e===null)return[t,()=>()=>{}];const c=e(n);return[()=>c.matches,i=>(c.addEventListener("change",i),()=>{c.removeEventListener("change",i)})]},[t,e,n]);return l(a,u,f)}function y(n={}){const{themeId:r}=n;return function(s,o={}){let t=h();t&&r&&(t=t[r]||t);const f=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:u=!1,matchMedia:a=f?window.matchMedia:null,ssrMatchMedia:d=null,noSsr:c=!1}=p({name:"MuiUseMediaQuery",props:o,theme:t});let i=typeof s=="function"?s(t):s;return i=i.replace(/^@media( ?)/m,""),(l!==void 0?w:g)(i,u,a,d,c)}}const x=y({themeId:S});export{x as u};
