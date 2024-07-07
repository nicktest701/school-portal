import{j as e,S as r,T as n,r as g,u as h,_ as c,N as y,C as m,B as v,A as b,a as R,h as w,D as j}from"./index-a08c4904.js";import{R as C}from"./index-aa1164af.js";import{c as u}from"./currencyFormatter-1910a788.js";import{B as S}from"./Back-26c0fe57.js";import{P as F}from"./PrintRounded-a567cc73.js";import{C as B}from"./Chip-a33d5899.js";import"./ArrowBackRounded-b2e199d9.js";const a=({title:s,value:o})=>e.jsxs(r,{direction:"row",columnGap:2,children:[e.jsx(n,{variant:"caption",children:s}),e.jsx(n,{variant:"caption",flex:1,sx:{borderBottom:"1px dashed #333"},fontWeight:"bold",children:o})]});function A(){var d,l,p,x;const s=JSON.parse(localStorage.getItem("@school_info")),o=g.useRef(),{state:i}=h();if(console.log(s),c.isEmpty(i==null?void 0:i.feePrintData))return e.jsx(y,{to:"/fee/payment"});const t=i==null?void 0:i.feePrintData;return e.jsxs(e.Fragment,{children:[e.jsx(S,{to:"/fee/payment",color:"primary.main"}),e.jsxs(m,{maxWidth:"xs",sx:{padding:2},children:[e.jsx(C,{trigger:()=>e.jsx(v,{size:"small",variant:"outlined",startIcon:e.jsx(F,{}),children:"Print Receipt"}),content:()=>o.current,documentTitle:"Fee Receipt"}),e.jsxs(m,{ref:o,maxWidth:"xs",sx:{padding:2,bgcolor:"#fff",marginY:2,boxShadow:"0px 1px 2px rgba(0,0,0,0.1)",border:"1px solid lightgray"},children:[e.jsx(r,{columnGap:2,padding:1,children:e.jsxs(r,{direction:"row",justifyContent:"center",alignItems:"center",columnGap:2,children:[s!=null&&s.badge?e.jsx(b,{alt:"school logo",loading:"lazy",srcSet:`/images/users/${s==null?void 0:s.badge}`,sx:{width:40,height:40}}):e.jsx(R,{sx:{width:30,height:30}}),e.jsxs(r,{justifyContent:"center",alignItems:"center",children:[e.jsx(n,{variant:"h6",children:c.startCase(s==null?void 0:s.name)}),e.jsx(n,{variant:"caption",children:s==null?void 0:s.address}),e.jsx(n,{variant:"caption",children:s==null?void 0:s.location}),e.jsx(n,{variant:"caption",fontStyle:"italic",children:s==null?void 0:s.motto})]})]})}),e.jsx(n,{textAlign:"center",sx:{bgcolor:"primary.main",color:"#fff",marginY:2},children:"Fee Receipt"}),e.jsxs(r,{direction:"row",justifyContent:"space-between",paddingY:2,children:[e.jsxs(n,{variant:"caption",children:["Receipt No.: ",t==null?void 0:t._id]}),e.jsxs(n,{variant:"caption",children:["Date:"," ",t!=null&&t.payment?w((d=t==null?void 0:t.payment)==null?void 0:d.date).format("L"):""]})]}),e.jsx(j,{children:e.jsx(B,{label:"Details",size:"small"})}),e.jsxs(r,{rowGap:2,paddingY:2,children:[e.jsx(a,{title:"Received From",value:t==null?void 0:t.fullName}),e.jsx(a,{title:"Level",value:t==null?void 0:t.levelType}),e.jsxs(r,{direction:"row",justifyContent:"space-between",children:[e.jsx(a,{title:"The sum of",value:u(t!=null&&t.payment?(l=t==null?void 0:t.payment)==null?void 0:l.paid:0)}),e.jsx(a,{title:"Outstanding",value:u(t!=null&&t.payment?(p=t==null?void 0:t.payment)==null?void 0:p.outstanding:0)})]}),e.jsx(a,{title:"Being payment of",value:"School Fees"}),e.jsx(a,{title:"Received by",value:t!=null&&t.payment?c.startCase((x=t==null?void 0:t.payment)==null?void 0:x.issuer):""})]}),e.jsx(j,{})]})]})]})}export{A as default};