import{bg as N,cl as c,bP as f,r as g,bz as k,ci as B,bI as b,l,j as x,aA as E,aV as M,ck as U}from"./index-DrgqF6h7.js";const z=e=>{const{classes:s,inset:r,primary:a,secondary:y,dense:d}=e;return M({root:["root",r&&"inset",d&&"dense",a&&y&&"multiline"],primary:["primary"],secondary:["secondary"]},U,s)},A=N("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:r}=e;return[{[`& .${c.primary}`]:s.primary},{[`& .${c.secondary}`]:s.secondary},s.root,r.inset&&s.inset,r.primary&&r.secondary&&s.multiline,r.dense&&s.dense]}})({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4,[`.${f.root}:where(& .${c.primary})`]:{display:"block"},[`.${f.root}:where(& .${c.secondary})`]:{display:"block"},variants:[{props:({ownerState:e})=>e.primary&&e.secondary,style:{marginTop:6,marginBottom:6}},{props:({ownerState:e})=>e.inset,style:{paddingLeft:56}}]}),F=g.forwardRef(function(s,r){const a=k({props:s,name:"MuiListItemText"}),{children:y,className:d,disableTypography:n=!1,inset:P=!1,primary:u,primaryTypographyProps:L,secondary:I,secondaryTypographyProps:v,slots:C={},slotProps:S={},...$}=a,{dense:T}=g.useContext(B);let o=u??y,t=I;const i={...a,disableTypography:n,inset:P,primary:!!o,secondary:!!t,dense:T},m=z(i),h={slots:C,slotProps:{primary:L,secondary:v,...S}},[j,p]=b("primary",{className:m.primary,elementType:l,externalForwardedProps:h,ownerState:i}),[w,R]=b("secondary",{className:m.secondary,elementType:l,externalForwardedProps:h,ownerState:i});return o!=null&&o.type!==l&&!n&&(o=x.jsx(j,{variant:T?"body2":"body1",component:p!=null&&p.variant?void 0:"span",...p,children:o})),t!=null&&t.type!==l&&!n&&(t=x.jsx(w,{variant:"body2",color:"textSecondary",...R,children:t})),x.jsxs(A,{className:E(m.root,d),ownerState:i,ref:r,...$,children:[o,t]})});export{F as L};
