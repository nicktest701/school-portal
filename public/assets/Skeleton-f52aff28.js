import{aH as w,aG as I,aI as k,aA as c,r as m,aL as A,aM as y,cq as N,j as $,aP as L,aQ as R,bA as S,bo as j,bq as g}from"./index-a08c4904.js";function D(t){return String(parseFloat(t)).length===String(t).length}function M(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function i(t){return parseFloat(t)}function J(t){return(e,a)=>{const s=M(e);if(s===a)return e;let n=i(e);s!=="px"&&(s==="em"||s==="rem")&&(n=i(e)*i(t));let r=n;if(a!=="px")if(a==="em")r=n/i(t);else if(a==="rem")r=n/i(t);else return e;return parseFloat(r.toFixed(5))+a}}function Y({size:t,grid:e}){const a=t-t%e,s=a+e;return t-a<s-t?a:s}function Z({lineHeight:t,pixels:e,htmlFontSize:a}){return e/(t*a)}function z({cssProperty:t,min:e,max:a,unit:s="rem",breakpoints:n=[600,900,1200],transform:r=null}){const o={[t]:`${e}${s}`},l=(a-e)/n[n.length-1];return n.forEach(u=>{let d=e+l*u;r!==null&&(d=r(d)),o[`@media (min-width:${u}px)`]={[t]:`${Math.round(d*1e4)/1e4}${s}`}}),o}function F(t){return w("MuiListItemAvatar",t)}const P=I("MuiListItemAvatar",["root","alignItemsFlexStart"]),tt=P,X=["className"],B=t=>{const{alignItems:e,classes:a}=t;return R({root:["root",e==="flex-start"&&"alignItemsFlexStart"]},F,a)},E=k("div",{name:"MuiListItemAvatar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,a.alignItems==="flex-start"&&e.alignItemsFlexStart]}})(({ownerState:t})=>c({minWidth:56,flexShrink:0},t.alignItems==="flex-start"&&{marginTop:8})),T=m.forwardRef(function(e,a){const s=A({props:e,name:"MuiListItemAvatar"}),{className:n}=s,r=y(s,X),o=m.useContext(N),l=c({},s,{alignItems:o.alignItems}),u=B(l);return $.jsx(E,c({className:L(u.root,n),ownerState:l,ref:a},r))}),et=T;function W(t){return w("MuiSkeleton",t)}const at=I("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]),q=["animation","className","component","height","style","variant","width"];let h=t=>t,v,x,C,b;const G=t=>{const{classes:e,variant:a,animation:s,hasChildren:n,width:r,height:o}=t;return R({root:["root",a,s,n&&"withChildren",n&&!r&&"fitContent",n&&!o&&"heightAuto"]},W,e)},K=S(v||(v=h`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),H=S(x||(x=h`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),O=k("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const a=M(t.shape.borderRadius)||"px",s=i(t.shape.borderRadius);return c({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:j(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${s}${a}/${Math.round(s/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&g(C||(C=h`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),K),({ownerState:t,theme:e})=>t.animation==="wave"&&g(b||(b=h`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),H,(e.vars||e).palette.action.hover)),Q=m.forwardRef(function(e,a){const s=A({props:e,name:"MuiSkeleton"}),{animation:n="pulse",className:r,component:o="span",height:l,style:u,variant:d="text",width:_}=s,f=y(s,q),p=c({},s,{animation:n,component:o,variant:d,hasChildren:!!f.children}),U=G(p);return $.jsx(O,c({as:o,ref:a,className:L(U.root,r),ownerState:p},f,{style:c({width:_,height:l},u)}))}),st=Q;export{et as L,st as S,Y as a,F as b,J as c,W as d,Z as f,M as g,D as i,tt as l,z as r,at as s,i as t};
