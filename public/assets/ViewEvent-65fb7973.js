import{g as y,a1 as u,G as x,v as h,j as r,C as g,J as c,T as j,A as b,h as T}from"./index-bb65b4bf.js";import{E as w}from"./images-0c291668.js";import{a as C}from"./eventAPI-b5f64315.js";import{B as E}from"./Back-0ebcc4f3.js";import{L}from"./ListItemText-33ae0292.js";import"./score_ico-e1082ac1.js";import"./ArrowBackRounded-54858719.js";import"./listItemTextClasses-35ff90f6.js";function D(){var e,o,i,n,l,p,d;const f=y(),[m]=u(),{id:t}=x(),a=h({queryKey:["event",t],queryFn:()=>C(t),initialData:(e=f.getQueryData(["events",t]))==null?void 0:e.find(s=>(s==null?void 0:s._id)===t),enabled:!!t});return r.jsxs(g,{children:[r.jsxs(c,{sx:{background:`linear-gradient(to bottom,rgba(1, 46, 84,0.95),rgba(1, 46, 84,0.9)),url(${((o=a==null?void 0:a.data)==null?void 0:o.album)||((i=w)==null?void 0:i.level)})`,width:"100%",height:150,p:4,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",mb:8},children:[r.jsx(j,{variant:"h3",color:"#fff",paragraph:!0,children:(n=a==null?void 0:a.data)==null?void 0:n.title}),r.jsxs(c,{spacing:2,display:"flex",justifyContent:"flex-end",alignItems:"center",gap:2,pr:8,width:"100%",children:[r.jsx("div",{style:{flexGrow:1},children:r.jsx(E,{to:m.get("redirect_to")||"/",color:"#fff"})}),r.jsx(b,{}),r.jsx(L,{primary:"Hello",secondary:`${(p=T((l=a==null?void 0:a.data)==null?void 0:l.createdAt))==null?void 0:p.format("LLL")}`,primaryTypographyProps:{color:"#fff"},secondaryTypographyProps:{color:"#fff",whiteSpace:"nowrap"}})]})]}),r.jsx("div",{style:{padding:"16px"},dangerouslySetInnerHTML:{__html:(d=a==null?void 0:a.data)==null?void 0:d.description}})]})}export{D as default};
