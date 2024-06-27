import{j as e,m,q as x,b as h,r as j,U as b,g as p,E as F,$ as C,G as T,a as v,a0 as u,J as P}from"./index-6e32062a.js";import{d as A}from"./BarChartRounded-a38b08e2.js";import{a as I,b as L}from"./currentFeeAPI-faf7eec7.js";import{t as y}from"./teacher_ico-786b69d1.js";const r=({text:s,value:a})=>e.jsxs(m,{spacing:1,sx:{backgroundColor:"#fff",padding:2,borderRadius:"8px",boxShadow:"0px 1px 20px 10px rgba(84,84,84,0.10)"},children:[e.jsxs(m,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(x,{children:s}),e.jsx(A,{color:"secondary"})]}),e.jsx(x,{variant:"h5",children:h(a??0)})]}),w=()=>{var n,d,i,l;const{userState:{session:{sessionId:s,termId:a,from:f,to:g}}}=j.useContext(b),t=p({queryKey:["current-fees-summary"],queryFn:()=>I({session:s,term:a,from:f,to:g}),enabled:!!s&&!!a}),o=p({queryKey:["recent-fees"],queryFn:()=>L({session:s,term:a}),enabled:!!s&&!!a});return e.jsxs(e.Fragment,{children:[e.jsx(F,{title:"Fees Payment",subtitle:"Access,manage and control payment of school fees",img:y,color:"primary.main"}),e.jsxs(C,{sx:{display:{xs:"none",md:"grid"},gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:2,py:3},children:[e.jsx(r,{text:"Today",value:(n=t==null?void 0:t.data)==null?void 0:n.today}),e.jsx(r,{text:"Month",value:(d=t==null?void 0:t.data)==null?void 0:d.month}),e.jsx(r,{text:"Term",value:(i=t==null?void 0:t.data)==null?void 0:i.term}),e.jsx(r,{text:"Year",value:(l=t==null?void 0:t.data)==null?void 0:l.year})]}),e.jsx(T,{isLoading:o.isLoading,title:"Recent Fee Payment",icon:y,columns:[{title:"Date of Payment",field:"date",type:"date",render:({date:c})=>e.jsx(v,{primary:u(c).format("ddd,LL"),secondary:u(c).format("hh:mm a"),secondaryTypographyProps:{color:"secondary.main"}})},{title:"Student",field:"student"},{title:"Level",field:"level"},{title:"Amount Paid",field:"paid"},{title:"Outstanding",field:"outstanding"}],data:o.data,actions:[],showAddButton:!1,addButtonImg:P.level,addButtonMessage:" No recent fee payment !",handleRefresh:o.refetch})]})};export{w as default};