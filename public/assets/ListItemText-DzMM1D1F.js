import{bd as N,ch as y,bO as f,r as g,by as k,eA as B,bH as b,l as c,j as x,aF as E,bC as F,cg as M}from"./index-B8PQHtjc.js";const U=e=>{const{classes:s,inset:r,primary:a,secondary:l,dense:d}=e;return F({root:["root",r&&"inset",d&&"dense",a&&l&&"multiline"],primary:["primary"],secondary:["secondary"]},M,s)},A=N("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:r}=e;return[{[`& .${y.primary}`]:s.primary},{[`& .${y.secondary}`]:s.secondary},s.root,r.inset&&s.inset,r.primary&&r.secondary&&s.multiline,r.dense&&s.dense]}})({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4,[`.${f.root}:where(& .${y.primary})`]:{display:"block"},[`.${f.root}:where(& .${y.secondary})`]:{display:"block"},variants:[{props:({ownerState:e})=>e.primary&&e.secondary,style:{marginTop:6,marginBottom:6}},{props:({ownerState:e})=>e.inset,style:{paddingLeft:56}}]}),H=g.forwardRef(function(s,r){const a=k({props:s,name:"MuiListItemText"}),{children:l,className:d,disableTypography:n=!1,inset:L=!1,primary:u,primaryTypographyProps:P,secondary:C,secondaryTypographyProps:v,slots:I={},slotProps:S={},...$}=a,{dense:T}=g.useContext(B);let o=u??l,t=C;const i={...a,disableTypography:n,inset:L,primary:!!o,secondary:!!t,dense:T},m=U(i),h={slots:I,slotProps:{primary:P,secondary:v,...S}},[j,p]=b("primary",{className:m.primary,elementType:c,externalForwardedProps:h,ownerState:i}),[w,R]=b("secondary",{className:m.secondary,elementType:c,externalForwardedProps:h,ownerState:i});return o!=null&&o.type!==c&&!n&&(o=x.jsx(j,{variant:T?"body2":"body1",component:p!=null&&p.variant?void 0:"span",...p,children:o})),t!=null&&t.type!==c&&!n&&(t=x.jsx(w,{variant:"body2",color:"textSecondary",...R,children:t})),x.jsxs(A,{className:E(m.root,d),ownerState:i,ref:r,...$,children:[o,t]})});export{H as L};
