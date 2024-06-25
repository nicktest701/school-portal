import{r as d,_ as u,j as e,$ as o,R as P,aP as x,bl as f,bm as j,P as R,Q as _,X as M,aN as l,U as w,g as D,E as N,a4 as S,aS as h,bn as p,p as A,bo as B,L as C,a as c,d as I,G as $,J as q}from"./index-5b8f5a53.js";import{R as F}from"./studentColumns-2ede27bc.js";import{d as O}from"./BarChartRounded-dd306543.js";import{B as L,D as H}from"./index-4958be49.js";import{g as z}from"./studentAPI-52d9bd23.js";import{D as g}from"./DashboardCard-a8472d98.js";const U=({data:a})=>{const[t,s]=d.useState([]),[n,i]=d.useState([]);return d.useEffect(()=>{a&&(s(u.map(a,"term")),i(u.map(a,"student")))},[a]),e.jsx(o,{sx:{minWidth:100,height:100},children:e.jsx(L,{data:{labels:t,datasets:[{label:"No of Students",data:n,backgroundColor:[" rgb(1, 46, 84)","rgb(255, 192, 159)"]}]},options:{responsive:!0,maintainAspectRatio:!1,layout:{padding:2,autoPadding:!0},scales:{x:{ticks:{display:!1},grid:{display:!1}},y:{ticks:{display:!1},grid:{display:!1}}},plugins:{legend:{}}}})})},T=({data:a})=>{var t;return e.jsxs(x,{elevation:1,children:[e.jsx(f,{avatar:e.jsx(O,{}),title:`Students for ${a&&((t=a[0])==null?void 0:t.academicYear)}`}),e.jsx(j,{children:e.jsx(U,{data:a})})]})};T.propTypes={data:P.array};var m={},K=_;Object.defineProperty(m,"__esModule",{value:!0});var k=m.default=void 0,V=K(R()),W=e;k=m.default=(0,V.default)((0,W.jsx)("path",{d:"M21 5c0-1.1-.9-2-2-2h-9v5h11zM3 19c0 1.1.9 2 2 2h3V10H3zM3 5v3h5V3H5c-1.1 0-2 .9-2 2m14.65 4.35-2.79 2.79c-.32.32-.1.86.35.86H17v2c0 1.1-.9 2-2 2h-2v-1.79c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.31.31.85.09.85-.35V19h2c2.21 0 4-1.79 4-4v-2h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01"}),"PivotTableChartRounded");const Y=({females:a,males:t})=>{const{palette:s}=M();return e.jsxs(x,{elevation:1,children:[e.jsx(f,{avatar:e.jsx(k,{}),title:"Males & Females"}),e.jsx(j,{children:e.jsx(H,{datasetIdKey:"id",style:{height:120},data:{labels:["Males","Females"],datasets:[{data:[t,a],backgroundColor:[s.primary.main,s.secondary.main]}]},options:{responsive:!0,maintainAspectRatio:!1,layout:{padding:2},scales:{x:{ticks:{display:!1},grid:{display:!1}},y:{ticks:{display:!1},grid:{display:!1}}},plugins:{legend:{position:"bottom"}}}})})]})};var v={},G=_;Object.defineProperty(v,"__esModule",{value:!0});var E=v.default=void 0,Q=G(R()),J=e;E=v.default=(0,Q.default)((0,J.jsx)("path",{d:"M11 3.18v17.64c0 .64-.59 1.12-1.21.98C5.32 20.8 2 16.79 2 12s3.32-8.8 7.79-9.8c.62-.14 1.21.34 1.21.98m2.03 0v6.81c0 .55.45 1 1 1h6.79c.64 0 1.12-.59.98-1.22-.85-3.76-3.8-6.72-7.55-7.57-.63-.14-1.22.34-1.22.98m0 10.83v6.81c0 .64.59 1.12 1.22.98 3.76-.85 6.71-3.82 7.56-7.58.14-.62-.35-1.22-.98-1.22h-6.79c-.56.01-1.01.46-1.01 1.01"}),"PieChartRounded");const X=({data:a})=>{const[t,s]=d.useState([]),[n,i]=d.useState([]);return d.useEffect(()=>{a&&(s(u.map(a,"level")),i(u.map(a,"students")))},[a]),e.jsxs(x,{elevation:1,children:[e.jsx(f,{avatar:e.jsx(E,{}),title:"Students"}),e.jsx(j,{children:e.jsx(o,{children:e.jsx(L,{datasetIdKey:"id",style:{minWidth:100,height:100},data:{labels:t,datasets:[{label:"Levels",data:n,backgroundColor:["#32D583","#ffc09f","#012E54"]}]},options:{responsive:!0,maintainAspectRatio:!1,layout:{padding:2},scales:{x:{ticks:{display:!1},grid:{display:!1}},y:{ticks:{display:!1},grid:{display:!1}}},plugins:{legend:{}}}})})})]})},Z=()=>e.jsxs(o,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",backgroundColor:"transparent",gap:3,paddingY:4},children:[e.jsx(l,{variant:"rounded",height:200}),e.jsx(l,{variant:"rounded",height:200}),e.jsx(l,{variant:"rounded",height:200}),e.jsx(l,{variant:"rounded",height:200})]}),ne=()=>{var s,n,i,y,b;const{userState:{session:a}}=d.useContext(w),t=D({queryKey:["student-details",a==null?void 0:a.sessionId,a==null?void 0:a.termId],queryFn:()=>z({sessionId:a.sessionId,termId:a.termId}),enabled:!!a.sessionId&&!!a.termId});return e.jsxs(e.Fragment,{children:[e.jsx(N,{title:"Student Portal",subtitle:"Track,manage and control student information",img:S,color:"primary.main"}),e.jsxs(o,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:2,pt:2},children:[e.jsx(g,{title:"Students",value:108,icon:e.jsx(h,{sx:{bgcolor:"secondary.lighter"},children:e.jsx(p,{sx:{width:20,height:20,color:"secondary.darker"}})})}),e.jsx(g,{title:"Males",value:60,icon:e.jsx(h,{sx:{bgcolor:"warning.lighter"},children:e.jsx(p,{sx:{width:20,height:20,color:"warning.darker"}})})}),e.jsx(g,{title:"Females",value:48,icon:e.jsx(h,{sx:{bgcolor:"info.lighter"},children:e.jsx(p,{sx:{width:20,height:20,color:"info.darker"}})})})]}),t.isLoading&&e.jsx(Z,{}),t.data&&e.jsxs(o,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:2,pt:2},children:[e.jsx(T,{data:(s=t==null?void 0:t.data)==null?void 0:s.noOfStudentsForEachTerm}),e.jsx(X,{data:(n=t==null?void 0:t.data)==null?void 0:n.noOfStudentsInEachLevel}),e.jsx(Y,{...t==null?void 0:t.data})]}),e.jsxs(o,{sx:{display:"flex",width:"100%",flexDirection:{xs:"column",lg:"row"},justifyContent:"space-between",pt:3,gap:2},children:[e.jsx(x,{sx:{borderRadius:"8px",overflow:"hidden",flex:1,minWidth:200},children:e.jsxs(A,{subheader:e.jsx(B,{title:"Number of Students",children:"Number of Students"}),children:[e.jsxs(C,{divider:!0,children:[e.jsx(c,{children:"Students"}),e.jsx(I,{children:e.jsx(c,{children:"Number"})})]}),(y=(i=t==null?void 0:t.data)==null?void 0:i.noOfStudentsInEachLevel)==null?void 0:y.map(r=>e.jsxs(C,{divider:!0,children:[e.jsx(c,{children:r==null?void 0:r.level}),e.jsx(I,{children:e.jsx(c,{children:r==null?void 0:r.students})})]},r==null?void 0:r.level))]})}),e.jsx($,{title:"Recently Added Students",icon:S,isLoading:t.isLoading,columns:F,options:{paginationPosition:"bottom",pageSize:3,selection:!1},data:((b=t.data)==null?void 0:b.recentStudents)??[],actions:[],handleRefresh:t.refetch,addButtonImg:q.student,addButtonMessage:"😑 No Students recently added !!!!",style:{border:"none",boxShadow:"0px 1px 5px rgba(0,0,0,0.07)"}})]})]})};export{ne as default};